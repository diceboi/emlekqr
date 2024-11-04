import connect from "../../utils/db";
import Tribute from "../../(models)/Tributes";
import { NextResponse } from "next/server";

export const dynamic = "force-dynamic";

export async function GET(req) {
    await connect();
    const { searchParams } = new URL(req.url);
    const to = searchParams.get('uri') || [];
    const parent = searchParams.get('parent') || [];

    if (to) {
        // Ensure correct filtering by `to` field
        const tribute = await Tribute.find({ to: to });
        return NextResponse.json({ data: { Tribute: tribute } });
    }

    if (parent) {
        // Ensure correct filtering by `to` field
        const tribute = await Tribute.find({ parent: parent });
        return NextResponse.json({ data: { Tribute: tribute } });
    }

    const tributes = await Tribute.find();
    return NextResponse.json({ data: { Tribute: tributes } });
}
