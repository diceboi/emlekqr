import connect from "../../Utils/db";
import Emlekadatlap from "../../(models)/Emlekadatlap";
import { NextResponse } from "next/server";

export const dynamic = "force-dynamic";

export async function GET() {
    await connect();

    const emlekadatlapok = await Emlekadatlap.find();
    return NextResponse.json({ data: { Emlekadatlap: emlekadatlapok } });
}