import { NextRequest, NextResponse } from "next/server";

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
    rateLimitMap.set(clientId, { count: 1, resetTime: now + 60 * 60 * 1000 }); // 1 hour
    return false;
  }

  if (now > clientData.resetTime) {
    // Reset the counter
    rateLimitMap.set(clientId, { count: 1, resetTime: now + 60 * 60 * 1000 });
    return false;
  }

  if (clientData.count >= 5) {
    // Allow 5 submissions per hour
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

function validateEmail(email: string): boolean {
  const emailRegex = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i;
  return emailRegex.test(email);
}

export async function POST(request: NextRequest) {
  try {
    const clientId = getClientId(request);

    // Check rate limiting
    if (isRateLimited(clientId)) {
      return NextResponse.json(
        {
          error:
            "You've reached the maximum number of submissions. Please try again later or contact us directly via email.",
        },
        { status: 429 }
      );
    }

    const body = await request.json();
    const { firstName, lastName, email, phone, service, message } = body;

    // Validate required fields
    if (!firstName || !lastName || !email || !service) {
      return NextResponse.json(
        { error: "Please fill in all required fields (First Name, Last Name, Email, and Service)." },
        { status: 400 }
      );
    }

    // Sanitize inputs
    const sanitizedData = {
      firstName: sanitizeInput(firstName),
      lastName: sanitizeInput(lastName),
      email: sanitizeInput(email),
      phone: phone ? sanitizeInput(phone) : "",
      service: sanitizeInput(service),
      message: message ? sanitizeInput(message) : "",
    };

    // Validate email format
    if (!validateEmail(sanitizedData.email)) {
      return NextResponse.json(
        { error: "Please enter a valid email address." },
        { status: 400 }
      );
    }

    // Validate field lengths
    if (sanitizedData.firstName.length < 2 || sanitizedData.firstName.length > 50) {
      return NextResponse.json(
        { error: "First name must be between 2 and 50 characters." },
        { status: 400 }
      );
    }

    if (sanitizedData.lastName.length < 2 || sanitizedData.lastName.length > 50) {
      return NextResponse.json(
        { error: "Last name must be between 2 and 50 characters." },
        { status: 400 }
      );
    }

    if (sanitizedData.message && sanitizedData.message.length > 1000) {
      return NextResponse.json(
        { error: "Message must be less than 1000 characters." },
        { status: 400 }
      );
    }

    // TODO: In production, integrate with an email service like Resend, SendGrid, or Nodemailer
    // For now, we'll log the data and return success
    console.log("Contact Form Submission:", {
      ...sanitizedData,
      timestamp: new Date().toISOString(),
    });

    // Here you would typically send an email notification
    // Example with Resend:
    /*
    const resend = new Resend(process.env.RESEND_API_KEY);

    await resend.emails.send({
      from: 'FaceFrame Beauty <noreply@faceframebeauty.com>',
      to: 'faceframe.byvil@gmail.com',
      subject: `New Contact Form Submission from ${sanitizedData.firstName} ${sanitizedData.lastName}`,
      html: `
        <h2>New Contact Form Submission</h2>
        <p><strong>Name:</strong> ${sanitizedData.firstName} ${sanitizedData.lastName}</p>
        <p><strong>Email:</strong> ${sanitizedData.email}</p>
        <p><strong>Phone:</strong> ${sanitizedData.phone || 'Not provided'}</p>
        <p><strong>Service Interest:</strong> ${sanitizedData.service}</p>
        <p><strong>Message:</strong></p>
        <p>${sanitizedData.message || 'No message provided'}</p>
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
