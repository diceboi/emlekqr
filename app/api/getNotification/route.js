import connect from "../../utils/db";
import Notifications from "../../(models)/Notifications";
import { NextResponse } from "next/server";

export const dynamic = "force-dynamic";

export async function GET(req) {
  await connect();

  const { searchParams } = new URL(req.url);
  const adatlap = searchParams.get('adatlap');

  if (adatlap) {
    const notifications = await Notifications.find({ adatlap });

    if (!notifications || notifications.length === 0) {
      return NextResponse.json({ error: 'Notification not found' }, { status: 404 });
    }

    return NextResponse.json({ data: { notifications } });
  }

  const notificationdata = await Notifications.find();
  return NextResponse.json({ data: { notifications: notificationdata } });
}
