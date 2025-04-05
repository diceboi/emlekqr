import connect from "../../Utils/db";
import Emlekadatlap from "../../(models)/Emlekadatlap";
import { NextResponse } from "next/server";

export async function GET(req) {
  await connect();
  const { searchParams } = new URL(req.url);
  const email = searchParams.get('email');

  if (!email) {
    return NextResponse.json({ error: "Hiányzó email paraméter" }, { status: 400 });
  }

  const emlekadatlapok = await Emlekadatlap.find({
    uri: { $regex: `^${email}` }, // minden uri, ami ezzel az email címmel kezdődik
  });

  return NextResponse.json({ data: emlekadatlapok });
}
