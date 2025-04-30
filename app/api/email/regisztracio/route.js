import { Resend } from "resend";
import { NextResponse } from "next/server";
import { RegisztracioAdmin } from "../../../components/EmailTemplates/RegisztracioAdmin"

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(request) {
  const { name, email, keresztnev, vezeteknev } = await request.json();

  try {

    const adminEmail = await resend.emails.send({
      from: 'EmlékQR <hello@emlek-qr.hu>',
      to: 'info@emlek-qr.hu',
      subject: `Új regisztráció történt`,
      react: RegisztracioAdmin({ name, email }),
    });

    return NextResponse.json({ message: 'Emails sent successfully' }, { status: 200 });
  } catch (error) {
    console.error('Failed to send email:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
