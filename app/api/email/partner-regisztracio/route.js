import { Resend } from "resend";
import { NextResponse } from "next/server";
import { UjPartnerRegisztracioAdmin } from "../../../components/EmailTemplates/UjPartnerRegisztracioAdmin";

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(request) {
  const { name, email, couponcode, uzletnev } = await request.json();

  try {
    // Send admin email
    await resend.emails.send({
      from: 'info@emlek-qr.hu',
      to: 'hello@emlek-qr.hu',
      subject: `Egy új partner regisztrált`,
      react: UjPartnerRegisztracioAdmin({ name, email, couponcode, uzletnev }),
    });
    
    return NextResponse.json({ message: 'Emails sent successfully' }, { status: 200 });
    } catch (error) {
    console.error('Failed to send email:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
    }
}
