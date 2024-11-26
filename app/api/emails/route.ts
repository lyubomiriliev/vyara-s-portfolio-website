import Welcome from "@/app/emails/Welcome";
import { m } from "framer-motion";
import { NextResponse } from "next/server";
import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(req: Request) {
  try {
    const body = await req.json(); // Parse request body
    const { email, firstName, lastName, message } = body;

    if (!email || !firstName || !lastName || !message) {
      return NextResponse.json(
        { message: "Missing required fields" },
        { status: 400 }
      );
    }

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
    console.error(error);
    return NextResponse.json(
      { message: "Failed to send your email", error },
      { status: 500 }
    );
  }
}
