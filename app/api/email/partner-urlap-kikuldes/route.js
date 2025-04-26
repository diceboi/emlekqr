import { Resend } from "resend";
import { NextResponse } from "next/server";
import { PartnerRegisztraciosUrlapUgyfel } from "../../../components/EmailTemplates/PartnerRegisztraciosUrlapUgyfel";

const resend = new Resend(process.env.RESEND_API_KEY);

export async function GET(request) {
  const { searchParams } = new URL(request.url);
  const email = searchParams.get("email");

  if (!email) {
    return NextResponse.json({ error: "Missing email parameter" }, { status: 400 });
  }

  try {
    await resend.emails.send({
      from: 'info@emlek-qr.hu',
      to: email,
      subject: `Partner regisztrációs űrlap`,
      react: PartnerRegisztraciosUrlapUgyfel({ email }),
    });

    return NextResponse.redirect("https://emlek-qr.hu/koszonjuk-partner-regisztracio");
  } catch (error) {
    console.error("Failed to send email:", error);
    return NextResponse.redirect("https://emlek-qr.hu/hiba-partner-regisztracio");
  }
}
