// api/auth/secret/route.js
import User from '../../../(models)/User'
import connect from "../../../utils/db";
import { NextResponse } from "next/server";

export const POST = async (request) => {
  const { email, secret } = await request.json();

  await connect();

  try {
    const existingUser = await User.findOne({ email });

    if (!existingUser) {
      return NextResponse.json({ message: "User not found" }, { status: 404 });
    }

    existingUser.secret = secret;
    await existingUser.save();

    // Return a JSON response
    return NextResponse.json({ message: "Secret added to user" }, { status: 200 });
  } catch (err) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
};



export const PUT = async (request) => {
  const { email } = await request.json();

  await connect();

  try {
    const existingUser = await User.findOne({ email });

    if (!existingUser) {
      return NextResponse.json({ message: "User not found" }, { status: 404 });
    }

    existingUser.secret = "";
    existingUser.stripeSubscription = "";
    await existingUser.save();

    // Return a JSON response
    return NextResponse.json({ message: "Secret added to user" }, { status: 200 });
  } catch (err) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
};
