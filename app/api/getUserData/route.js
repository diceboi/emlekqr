import connect from "../../Utils/db";
import User from "../../(models)/User"
import { NextResponse } from "next/server";

export const dynamic = "force-dynamic";

export async function GET(req) {
    await connect();
    const { searchParams } = new URL(req.url);
    const email = searchParams.get('email');
    
    if (email) {
        const user = await User.findOne({ email: email });
        return NextResponse.json({ data: { User: user } });
    }

    const usersdata = await User.find();
    return NextResponse.json({ data: { User: usersdata } });
}