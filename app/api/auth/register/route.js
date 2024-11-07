import User from "../../../(models)/User";
import connect from "../../../Utils/db";
import bcrypt from "bcrypt"
import { NextResponse } from "next/server";

export const POST = async (request) => {
  const { name, vezeteknev, keresztnev, email, password } = await request.json();

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
  });

  try {
    await newUser.save();
    return new NextResponse("user is registered", { status: 200 });
  } catch (err) {
    return new NextResponse(err, {
      status: 500,
    });
  }
};