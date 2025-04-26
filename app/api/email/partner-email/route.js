import { Resend } from "resend";
import { NextResponse } from "next/server";
import { EmailPartnerAdmin } from "../../../components/EmailTemplates/EmailPartnerAdmin";

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(request) {
  const { email } = await request.json();

  try {
    // Send admin email
    await resend.emails.send({
      from: 'info@emlek-qr.hu',
      to: 'hello@emlek-qr.hu',
      subject: `Új Partner szeretne regisztálni`,
      react: EmailPartnerAdmin({ email }),
    });
    
    return NextResponse.json({ message: 'Emails sent successfully' }, { status: 200 });
    } catch (error) {
    console.error('Failed to send email:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
    }
}
