import { NextRequest, NextResponse } from "next/server";
import OpenAI from "openai";

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY!, // Ensure you have set your OpenAI API key in environment variables
});

// Rate limiting storage (in production, use Redis or database)
const rateLimitMap = new Map<string, { count: number; resetTime: number }>();

function getClientId(request: NextRequest): string {
  // Use IP address for rate limiting
  const forwarded = request.headers.get("x-forwarded-for");
  const realIp = request.headers.get("x-real-ip");
  const ip = forwarded ? forwarded.split(",")[0] : realIp || "unknown";
  return ip;
}

function isRateLimited(clientId: string): boolean {
  const now = Date.now();
  const clientData = rateLimitMap.get(clientId);

  if (!clientData) {
    rateLimitMap.set(clientId, { count: 1, resetTime: now + 5 * 60 * 1000 }); // 5 minutes
    return false;
  }

  if (now > clientData.resetTime) {
    // Reset the counter
    rateLimitMap.set(clientId, { count: 1, resetTime: now + 5 * 60 * 1000 });
    return false;
  }

  if (clientData.count >= 3) {
    return true;
  }

  clientData.count++;
  return false;
}

function sanitizeInput(input: string): string {
  // Remove potentially harmful characters and trim
  return input
    .replace(/<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi, "")
    .replace(/<[^>]*>/g, "")
    .trim();
}

export async function POST(request: NextRequest) {
  try {
    const clientId = getClientId(request);

    // Check rate limiting
    if (isRateLimited(clientId)) {
      return NextResponse.json(
        {
          error:
            "Rate limit exceeded. Please wait a few minutes before asking another question.",
        },
        { status: 429 }
      );
    }

    const body = await request.json();
    const { question } = body;

    // Validate input
    if (!question || typeof question !== "string") {
      return NextResponse.json(
        { error: "Question is required and must be a string." },
        { status: 400 }
      );
    }

    const sanitizedQuestion = sanitizeInput(question);

    // Check length constraints
    if (sanitizedQuestion.length < 10 || sanitizedQuestion.length > 500) {
      return NextResponse.json(
        { error: "Question must be between 10 and 500 characters." },
        { status: 400 }
      );
    }

    // OpenAI prompt for FaceFrame Beauty FAQ assistant
    const systemPrompt = `You are answering as IGGY — the founder and lead beauty specialist at FaceFrame Beauty, a luxury beauty studio in London.

You specialize in:
- Semi-permanent makeup (microblading, ombré brows, combination brows)
- Lash and brow treatments (extensions, lifts, tinting)
- Luxury facials (Million Dollar Facial, dermaplaning, microneedling)
- Professional beauty services

Your voice is bubbly, sweet, confident, and caring. You are always kind and attentive, and you speak to clients as if you were right there in the studio with them. You never sound robotic or generic.

When answering:
- Be warm and welcoming, but also clear and direct with things you know well.
- Keep responses practical and concise (2–4 sentences max).
- Provide helpful guidance on services, aftercare, or booking.
- Never mention pricing — kindly suggest they contact the salon for that.
- For medical-related concerns, always advise seeing a licensed healthcare professional.
- If the question isn’t related to beauty or FaceFrame Beauty, gently redirect with something like:  
  “That’s a great question, but I don’t have an answer to that one right now. Let me help you with something else if I can!”

Do **not** refer to yourself as an AI or assistant. You are IGGY — a passionate beauty expert with high standards and a caring heart.

Answer the following question:`;

    const completion = await openai.chat.completions.create({
      model: "gpt-5-nano-2025-08-07",
      messages: [
        {
          role: "system",
          content: systemPrompt,
        },
        {
          role: "user",
          content: sanitizedQuestion,
        },
      ],
      max_tokens: 200,
      temperature: 0.7,
    });

    const answer = completion.choices[0]?.message?.content?.trim();

    if (!answer) {
      throw new Error("No response from OpenAI");
    }

    return NextResponse.json({ answer });
  } catch (error) {
    console.error("FAQ Answer API Error:", error);

    // Return branded error message
    return NextResponse.json(
      {
        error:
          "Oops! It looks like our beauty brushes are being cleaned right now 💅✨ Please try again in a moment or refresh the page.",
      },
      { status: 500 }
    );
  }
}
