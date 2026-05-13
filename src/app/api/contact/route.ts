import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";

// Rate limiting storage (in production, use Redis or database)
const rateLimitMap = new Map<string, { count: number; resetTime: number }>();

// Module-private. Next.js App Router rejects non-handler exports from
// route.ts at build time. If end-to-end type safety with the client form
// is needed later, lift this to src/lib/contact-schema.ts and import in
// both places.
const contactSchema = z.object({
  firstName: z.string().min(1, "First name is required").max(60),
  lastName: z.string().min(1, "Last name is required").max(60),
  email: z.string().email("Please enter a valid email address").max(120),
  phone: z.string().max(30).optional().or(z.literal("")),
  service: z.string().min(1, "Please select a service"),
  message: z.string().max(500).optional().or(z.literal("")),
});


function getClientId(request: NextRequest): string {
  const forwarded = request.headers.get("x-forwarded-for");
  const realIp = request.headers.get("x-real-ip");
  const ip = forwarded ? forwarded.split(",")[0] : realIp || "unknown";
  return ip;
}

function isRateLimited(clientId: string): boolean {
  const now = Date.now();
  const clientData = rateLimitMap.get(clientId);

  if (!clientData) {
    rateLimitMap.set(clientId, { count: 1, resetTime: now + 60 * 60 * 1000 }); // 1 hour
    return false;
  }

  if (now > clientData.resetTime) {
    rateLimitMap.set(clientId, { count: 1, resetTime: now + 60 * 60 * 1000 });
    return false;
  }

  if (clientData.count >= 5) {
    return true;
  }

  clientData.count++;
  return false;
}

// Defence-in-depth: strip script blocks and any HTML tags before the value
// reaches a templated email body. Schema validation handles everything else.
function stripHtml(input: string): string {
  return input
    .replace(/<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi, "")
    .replace(/<[^>]*>/g, "")
    .trim();
}

export async function POST(request: NextRequest) {
  try {
    const clientId = getClientId(request);

    if (isRateLimited(clientId)) {
      return NextResponse.json(
        {
          error:
            "You've reached the maximum number of submissions. Please try again later or contact us directly via email.",
        },
        { status: 429 }
      );
    }

    const body = await request.json().catch(() => null);
    const result = contactSchema.safeParse(body);

    if (!result.success) {
      return NextResponse.json(
        {
          error: "Invalid form submission",
          issues: result.error.flatten().fieldErrors,
        },
        { status: 400 }
      );
    }

    const data = {
      ...result.data,
      message: result.data.message ? stripHtml(result.data.message) : "",
    };

    // TODO: In production, integrate with an email service like Resend, SendGrid, or Nodemailer
    // For now, we'll log the data and return success
    console.log("Contact Form Submission:", {
      ...data,
      timestamp: new Date().toISOString(),
    });

    // Here you would typically send an email notification
    // Example with Resend:
    /*
    const resend = new Resend(process.env.RESEND_API_KEY);

    await resend.emails.send({
      from: 'FaceFrame Beauty <noreply@faceframebeauty.com>',
      to: 'faceframe.byvil@gmail.com',
      subject: `New Contact Form Submission from ${data.firstName} ${data.lastName}`,
      html: `
        <h2>New Contact Form Submission</h2>
        <p><strong>Name:</strong> ${data.firstName} ${data.lastName}</p>
        <p><strong>Email:</strong> ${data.email}</p>
        <p><strong>Phone:</strong> ${data.phone || 'Not provided'}</p>
        <p><strong>Service Interest:</strong> ${data.service}</p>
        <p><strong>Message:</strong></p>
        <p>${data.message || 'No message provided'}</p>
      `,
    });
    */

    return NextResponse.json({
      success: true,
      message: "Thank you for reaching out! I'll respond to your inquiry within 24 hours.",
    });
  } catch (error) {
    console.error("Contact Form API Error:", error);

    return NextResponse.json(
      {
        error:
          "We're experiencing technical difficulties. Please try again or contact us directly at faceframe.byvil@gmail.com",
      },
      { status: 500 }
    );
  }
}
