import User from "../../../(models)/User";
import connect from "../../../Utils/db";
import { NextResponse } from "next/server";
import bcrypt from "bcrypt"

export const POST = async (request) => {
  const { password, email  } = await request.json();

  await connect();

  const existingUser = await User.findOne({email})

  const hashedPassword = await bcrypt.hash(password, 5);
  existingUser.password = hashedPassword

  existingUser.resetToken = undefined
  existingUser.resetTokenExpiry = undefined

  try {
    await existingUser.save()
    return new NextResponse("Users password is updated", { status: 200 })
  } catch (error) {
    return new NextResponse(error, { status: 500 })
  }
};
