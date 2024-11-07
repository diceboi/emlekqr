import connect from "../../Utils/db";
import Emlekadatlap from "../../(models)/Emlekadatlap";
import { NextResponse } from "next/server";

export const PUT = async (req) => {
    await connect();

    try {
        const { formData } = await req.json();

        // Find the existing document by the uri field
        const existingAdatlap = await Emlekadatlap.findOneAndUpdate(
            { uri: formData.uri }, // Filter
            { $set: formData },    // Update with new data
            { new: true }          // Return the updated document
        );

        if (!existingAdatlap) {
            return NextResponse.json({ message: "Adatlap not found" }, { status: 404 });
        }

        // Return a JSON response
        return NextResponse.json({ message: "Data updated successfully", data: existingAdatlap }, { status: 200 });
    } catch (err) {
        return NextResponse.json({ error: err.message }, { status: 500 });
    }
};
