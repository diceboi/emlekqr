import { Resend } from "resend";
import { NextResponse } from "next/server";
import { VasarlasAdmin } from "../../../components/EmailTemplates/VasarlasAdmin";
import { VasarlasUgyfel } from "../../../components/EmailTemplates/VasarlasUgyfel";

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(request) {
  const { name, address, payment, type, secret, phone, email } = await request.json();
  let adminEmailSent = false;
  let ugyfelEmailSent = false;

  try {
    // Send admin email
    await resend.emails.send({
      from: 'EmlékQR <info@emlek-qr.hu>',
      to: 'hello@emlek-qr.hu',
      subject: `Új érme vásárlás`,
      react: VasarlasAdmin({ nev: name, address, payment, type, phone, email }),
    });
    adminEmailSent = true;
  } catch (error) {
    console.error('Failed to send admin email:', error);
  }

  try {
    // Send customer email
    await resend.emails.send({
      from: 'EmlékQR <hello@emlek-qr.hu>',
      to: email,
      subject: `Sikeres vásárlás`,
      react: VasarlasUgyfel({ nev: name, secret, payment, type }),
    });
    ugyfelEmailSent = true;
  } catch (error) {
    console.error('Failed to send customer email:', error);
  }

  if (adminEmailSent && ugyfelEmailSent) {
    return NextResponse.json({ message: 'Emails sent successfully' }, { status: 200 });
  } else if (adminEmailSent || ugyfelEmailSent) {
    return NextResponse.json({ message: 'One of the emails was sent successfully' }, { status: 207 });
  } else {
    return NextResponse.json({ error: 'Failed to send emails' }, { status: 500 });
  }
}
