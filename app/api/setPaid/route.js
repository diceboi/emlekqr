import connect from "../../Utils/db";
import Emlekadatlap from "../../(models)/Emlekadatlap";
import { NextResponse } from "next/server";

export const dynamic = "force-dynamic";

export async function POST(req) {
  try {
    await connect();
    const { uri } = await req.json();

    if (!uri) {
      return NextResponse.json({ success: false, error: "Hiányzó uri." }, { status: 400 });
    }

    const updated = await Emlekadatlap.findOneAndUpdate(
      { uri },
      { $set: { paymentMethod: "paid", paymentStatus: "paid" } },
      { new: true }
    );

    if (!updated) {
      return NextResponse.json({ success: false, error: "Adatlap nem található." }, { status: 404 });
    }

    return NextResponse.json({ success: true, id: updated._id });
  } catch (e) {
    console.error("setPaid error:", e);
    return NextResponse.json({ success: false, error: "Szerver hiba." }, { status: 500 });
  }
}
