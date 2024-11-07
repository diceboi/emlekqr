import User from "../../../(models)/User";
import connect from "../../../Utils/db";
import { NextResponse } from "next/server"; 
import crypto from "crypto";
import { Resend } from "resend";
import { ElfelejtettJelszo } from "../../../components/EmailTemplates/ElfelejtettJelszo";

export const POST = async (request) => {
  const { email } = await request.json();

  await connect();

  try {
    // Find the user by email
    const existingUser = await User.findOne({ email });
    if (!existingUser) {
      return new NextResponse("Email does not exist.", { status: 400 });
    }

    // Generate reset token and hash it
    const resetToken = crypto.randomBytes(20).toString("hex");
    const passwordResetToken = crypto.createHash("sha256").update(resetToken).digest("hex");
    const passwordResetExpires = Date.now() + 3600000; // 1 hour from now

    // Update user with reset token and expiry
    existingUser.resetToken = passwordResetToken;
    existingUser.resetTokenExpiry = passwordResetExpires;

    // Generate reset URL
    const resetUrl = `${process.env.NEXT_PUBLIC_URL}/jelszo-visszaallitas/${resetToken}`;

    // Set up Resend and send email
    const resend = new Resend(process.env.RESEND_API_KEY);
    await resend.emails.send({
      from: "EmlékQR <hello@emlek-qr.hu>",
      to: email,
      subject: `Jelszó visszaállítás - EmlékQR`,
      react: ElfelejtettJelszo({ resetUrl }),
    });

    // Save the user with updated reset information
    await existingUser.save();

    return NextResponse.json({ message: "Email sent successfully for password reset" }, { status: 200 });

  } catch (error) {
    console.error("Error processing password reset request:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
};
