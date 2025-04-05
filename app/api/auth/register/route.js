import User from "../../../(models)/User";
import connect from "../../../Utils/db";
import bcrypt from "bcrypt"
import { NextResponse } from "next/server";
import { sign } from "jsonwebtoken";

export const POST = async (request) => {
  const { name, vezeteknev, keresztnev, email, password, aszf, marketing } = await request.json();

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
    email,
    password: hashedPassword,
    aszf,
    marketing
  });

  try {
    await newUser.save();
    // JWT generálása NextAuth számára
    const token = sign(
      { email, name, id: newUser._id },
      process.env.NEXTAUTH_SECRET, // A NextAuth `NEXTAUTH_SECRET` változóját használjuk
      { expiresIn: "1h" }
    );

    return new NextResponse(JSON.stringify({ token }), { status: 200 });
  } catch (err) {
    return new NextResponse(err, {
      status: 500,
    });
  }
};