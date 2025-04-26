import { Resend } from "resend";
import { NextResponse } from "next/server";
import { VasarlasAdmin } from "../../../components/EmailTemplates/VasarlasAdmin";
import { VasarlasUgyfel } from "../../../components/EmailTemplates/VasarlasUgyfel";
import connect from "../../../Utils/db"; // <<< fontos, hogy legyen DB connect
import User from "../../../(models)/User"; // <<< az User model is kell

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(request) {
  const { name, address, payment, type, secret, phone, email, couponCode } = await request.json();
  let adminEmailSent = false;
  let ugyfelEmailSent = false;

  let partnerName = null;

  try {
    await connect(); // <<< először DB connect

    if (couponCode) {
      const partner = await User.findOne({ couponcode: couponCode.toUpperCase() });
      if (partner) {
        partnerName = partner.name;
      }
    }
  } catch (error) {
    console.error('Database lookup error:', error);
  }

  try {
    // Send admin email
    await resend.emails.send({
      from: 'info@emlek-qr.hu',
      to: 'hello@emlek-qr.hu',
      subject: `Új érme vásárlás`,
      react: VasarlasAdmin({
        nev: name,
        address,
        payment,
        type,
        phone,
        email,
        couponCode: couponCode || null,
        partnerName: partnerName || null, // <<< partner neve
      }),
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
