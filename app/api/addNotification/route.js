import connect from "../../Utils/db";
import Notifications from "../../(models)/Notifications";
import { NextResponse } from "next/server";

export async function POST(req) {
  await connect();

  const { personal, viewed, notificationtype, adatlap, from, images, videos, message } = await req.json(); // Extract formData directly

  console.log("VÁLTOZÁSOK: ", personal, viewed, notificationtype, adatlap, from, images, videos, message)

  try {
    const notification = await Notifications.create({personal, viewed, notificationtype, adatlap, from, images, videos, message}); // No need to wrap formData in another object
    console.log('Notification created:', notification);
    return NextResponse.json({ data: notification });
  } catch (error) {
    console.error('Error adding notification:', error);
    return NextResponse.json({ message: "Nem sikerült az értesítést elmenteni", error }, { status: 500 });
  }
}