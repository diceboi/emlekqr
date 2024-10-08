import connect from "../../Utils/db";
import Tribute from "../../(models)/Tributes";
import { NextResponse } from "next/server";

export const dynamic = "force-dynamic";

export async function GET(req) {
    await connect();
    const { searchParams } = new URL(req.url);
    const uri = searchParams.get('uri');

    if (uri) {
        // Ensure correct filtering by `to` field
        const tribute = await Tribute.find({ to: uri });
        return NextResponse.json({ data: { Tribute: tribute } });
    }

    const tributes = await Tribute.find();
    return NextResponse.json({ data: { Tribute: tributes } });
}
