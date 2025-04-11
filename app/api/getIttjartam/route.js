import connect from "../../Utils/db";
import Ittjartam from "../../(models)/Ittjartam";
import { NextResponse } from "next/server";

export const dynamic = "force-dynamic";

export async function GET(req) {
  await connect();

  try {
    const { searchParams } = new URL(req.url);

    const adatlap = searchParams.get("adatlap");

    if (adatlap) {
      const ittjartam = await Ittjartam.find({ adatlap });

      // ⬇️ fontos: mindig visszatérünk, még ha üres is
      return NextResponse.json({ data: { ittjartam } });
    }

    const allittjartam = await Ittjartam.find();
    return NextResponse.json({ data: { ittjartam: allittjartam } });
  } catch (error) {
    console.error("Hiba az Ittjartam lekérdezésnél:", error);
    return NextResponse.json(
      { error: "Szerverhiba történt az Ittjartam lekérdezésnél" },
      { status: 500 }
    );
  }
}
