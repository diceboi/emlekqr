import connect from "../../utils/db";
import Tributes from "../../(models)/Tributes";
import { NextResponse } from "next/server";

export async function PUT(req) {
    await connect();
  
    const { formData } = await req.json(); // Extract formData directly
  
    try {
      // Find the tribute by its _id and update the verified field
      const tribute = await Tributes.findOneAndUpdate(
        { _id: formData._id }, 
        { $set: { verified: formData.verified, deleted: formData.deleted } },
        { new: true } // This option returns the updated document
      );
  
      console.log('Tribute updated:', tribute);
      return NextResponse.json({ data: tribute });
    } catch (error) {
      console.error('Error updating tribute:', error);
      return NextResponse.json({ message: "Nem sikerült a hozzászólást elmenteni", error }, { status: 500 });
    }
}
