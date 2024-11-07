import connect from "*/../../utils/db";
import Tributes from "../../(models)/Tributes";
import { NextResponse } from "next/server";

export async function POST(req) {
  await connect();

  const { formData } = await req.json(); // Extract formData directly

  try {
    const tribute = await Tributes.create(formData); // No need to wrap formData in another object
    console.log('Tribute created:', tribute);
    return NextResponse.json({ data: tribute });
  } catch (error) {
    console.error('Error adding tribute:', error);
    return NextResponse.json({ message: "Nem sikerült a hozzászólást elmenteni", error }, { status: 500 });
  }
}