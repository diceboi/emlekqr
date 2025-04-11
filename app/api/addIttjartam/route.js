'use server'

import connect from "../../Utils/db";
import Ittjartam from "../../(models)/Ittjartam";
import { NextResponse } from "next/server";

export async function POST(req) {
  await connect();

  const { formData } = await req.json(); // Extract formData directly

  try {
    const ittjartam = await Ittjartam.create(formData); // No need to wrap formData in another object
    console.log('Ittjartam created:', ittjartam);
    return NextResponse.json({ data: ittjartam });
  } catch (error) {
    console.error('Error adding ittjartam:', error);
    return NextResponse.json({ message: "Nem sikerült a hozzászólást elmenteni", error }, { status: 500 });
  }
}