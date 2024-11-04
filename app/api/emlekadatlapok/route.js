import connect from "../../utils/db";
import Emlekadatlap from "../../(models)/Emlekadatlap";
import { NextResponse } from "next/server";

export const dynamic = "force-dynamic";

export async function GET(req) {
    await connect();

    const { searchParams } = new URL(req.url);
    const owner = searchParams.get('owner'); // Get the 'owner' from query params

    if (owner) {
        const emlekadatlap = await Emlekadatlap.find({ owner: owner });
        return NextResponse.json({ data: { Emlekadatlap: emlekadatlap } });
    }

    const emlekadatlapok = await Emlekadatlap.find();
    return NextResponse.json({ data: { Emlekadatlap: emlekadatlapok } });
}
