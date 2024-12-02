import { z } from "zod";
import Welcome from "@/app/emails/Welcome";
import { NextResponse } from "next/server";
import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

// Define schema for validation
const contactSchema = z.object({
  email: z.string().email(),
  firstName: z.string().min(1, "First name is required"),
  lastName: z.string().min(1, "Last name is required"),
  message: z.string().min(1, "Message is required"),
});

export async function POST(req: Request) {
  try {
    const body = await req.json(); // Parse request body

    // Validate request data
    const validatedData = contactSchema.parse(body);

    // Destructure validated data
    const { email, firstName, lastName, message } = validatedData;

    // Send email
    const result = await resend.emails.send({
      from: "Vyara Digital <onboarding@resend.dev>",
      replyTo: email,
      to: "iliev.lyubomir98@gmail.com",
      subject: `New message from ${firstName} ${lastName}`,
      react: Welcome({ firstName, lastName, message }),
    });

    return NextResponse.json(
      { message: "Email sent successfully!", result },
      { status: 200 }
    );
  } catch (error) {
    // Handle validation errors
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { message: "Validation failed", errors: error.errors },
        { status: 400 }
      );
    }

    console.error("Email sending error:", error);
    return NextResponse.json(
      { message: "Failed to send your email", error },
      { status: 500 }
    );
  }
}
