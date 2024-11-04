import connect from "../../utils/db";
import Emlekadatlap from "../../(models)/Emlekadatlap";
import { NextResponse } from "next/server";

export const dynamic = "force-dynamic";

export async function GET(req) {
    await connect();
    const { searchParams } = new URL(req.url);
    const uri = searchParams.get('uri');

    if (uri) {
        const emlekadatlap = await Emlekadatlap.findOne({ uri: uri });
        return NextResponse.json({ data: { Emlekadatlap: emlekadatlap } });
    }

    const emlekadatlapok = await Emlekadatlap.find();
    return NextResponse.json({ data: { Emlekadatlap: emlekadatlapok } });
}

export async function POST(req) {
    await connect();
    const { updatedData } = await req.json();
    const emlekadatlapok = await Emlekadatlap.create(updatedData);
    return NextResponse.json(emlekadatlapok);
}