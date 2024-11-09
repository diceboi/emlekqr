import connect from "../../Utils/db";
import User from "../../(models)/User";
import { NextResponse } from "next/server";

export const dynamic = "force-dynamic";

export async function GET(req) {
  await connect();
  
  const { searchParams } = new URL(req.url);
  const email = searchParams.get('email');
  const id = searchParams.get('id');

  if (email) {
    const user = await User.findOne({ email: email });

    if (!user) {
      return NextResponse.json({ error: 'User not found' }, { status: 404 });
    }

    return NextResponse.json({ data: { User: user } });
  } else if (id) {
    const user = await User.findOne({ _id: id });
    if (!user) {
      return NextResponse.json({ error: 'User not found' }, { status: 404 });
    }
    return NextResponse.json({ data: { User: user } });
  }

  const usersdata = await User.find();
  console.log("Returned UserData: ", usersdata)
  return NextResponse.json({ data: { Users: usersdata } });
}
