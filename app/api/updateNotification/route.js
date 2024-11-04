import connect from "../../utils/db";
import Notification from "../../(models)/Notifications";
import { NextResponse } from "next/server";

export async function PUT(req) {
  await connect();

  try {
    const { adatlap, viewed } = await req.json(); // Destructure adatlap and viewed from the request body

    const notification = await Notification.findOneAndUpdate(
      { _id: adatlap },
      { $set: { viewed } },
      { new: true } // Return the updated document
    );

    if (!notification) {
      return NextResponse.json(
        { message: "Notification not found" },
        { status: 404 }
      );
    }

    console.log("Notification updated:", notification);
    return NextResponse.json({ data: notification });
  } catch (error) {
    console.error("Error updating notification:", error);
    return NextResponse.json(
      { message: "Failed to update notification", error },
      { status: 500 }
    );
  }
}
