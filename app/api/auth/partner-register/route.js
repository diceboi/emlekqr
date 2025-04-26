import User from "../../../(models)/User";
import connect from "../../../Utils/db";
import bcrypt from "bcrypt";
import { NextResponse } from "next/server";
import { sign } from "jsonwebtoken";
import Stripe from "stripe";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

export const POST = async (request) => {
  const { name, vezeteknev, uzletnev, bankszamlaszam, keresztnev, email, password, aszf, marketing, type, couponcode } = await request.json();

  await connect();

  const existingUser = await User.findOne({ email });

  if (existingUser) {
    return new NextResponse("Email is already in use", { status: 400 });
  }

  const hashedPassword = await bcrypt.hash(password, 5);
  const newUser = new User({
    name,
    vezeteknev,
    keresztnev,
    uzletnev,
    bankszamlaszam,
    email,
    password: hashedPassword,
    aszf,
    marketing,
    type,
    couponcode,
  });

  try {
    await newUser.save();

    // Külön Price ID-kre alkalmazandó kuponok
    const couponPartner = await stripe.coupons.create({
      percent_off: 5,
    });

    const promoPartner = await stripe.promotionCodes.create({
      coupon: couponPartner.id,
      code: couponcode,
    });

    const token = sign(
      { email, name, id: newUser._id },
      process.env.NEXTAUTH_SECRET,
      { expiresIn: "1h" }
    );

    return new NextResponse(JSON.stringify({
      token,
      promoPartner: promoPartner.id,
    }), { status: 200 });
  } catch (err) {
    console.error("Regisztráció vagy Stripe hiba:", err);
    return new NextResponse("Szerverhiba", {
      status: 500,
    });
  }
};
