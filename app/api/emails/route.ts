import Welcome from "@/app/emails/Welcome";
import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(req: Request) {
  try {
    const result = await resend.emails.send({
      from: "Vyara Digital <onboarding@resend.dev>",
      to: "iliev.lyubomir98@gmail.com",
      subject: "Contact Inquiry",
      react: Welcome(),
    });

    return new Response(JSON.stringify({ success: true, result }), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  } catch (error) {
    console.error("Error sending email:", error);
    return new Response(JSON.stringify({ success: false, error }), {
      status: 500,
      headers: { "Content-Type": "application/json" },
    });
  }
}
