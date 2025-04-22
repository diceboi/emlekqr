import { Resend } from "resend";
import { NextResponse } from "next/server";
import { IngyenesAdatlapAdmin } from "../../../components/EmailTemplates/IngyenesAdatlapAdmin";

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(request) {
  const { name, email, url, date, isFree } = await request.json();

  try {
    // Send admin email
    await resend.emails.send({
      from: 'info@emlek-qr.hu',
      to: 'hello@emlek-qr.hu',
      subject: `Új Ingyenes Emlékadatlap készült`,
      react: IngyenesAdatlapAdmin({ name, email, url, date, isFree  }),
    });
    
    return NextResponse.json({ message: 'Emails sent successfully' }, { status: 200 });
    } catch (error) {
    console.error('Failed to send email:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
    }
}
