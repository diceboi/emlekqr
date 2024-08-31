import connect from "../../Utils/db";
import Emlekadatlap from "../../(models)/Emlekadatlap";
import { NextResponse } from "next/server";

export const dynamic = "force-dynamic";

export async function PUT(req, {params}) {
    await connect();

    const { filteredFormData } = await req.json()

    console.log({filteredFormData})

    /*
    try {
        const emlekadatlap = await Emlekadatlap.findOneAndUpdate({ uri: uri });
        return NextResponse.json({ data: { Emlekadatlap: emlekadatlap } });
    } catch (error) {
        console.log({ message: "Nem sikerült az adatlap frissítése" }, { status: 500 })
    }
        */

    /*
    
    const { id } = params;
    const { kiszallitva, elkeszult } = await req.json();

    try {
        console.log(`Updating document with id: ${id}`);
        console.log(kiszallitva, elkeszult);
        await Rendelesek.findOneAndUpdate({_id: id}, {kiszallitva, elkeszult} );
        console.log(`Document with id: ${id} updated successfully.`);
        return NextResponse.json({ message: "Napimenuarak frissítve" }, { status: 200 });
    } catch (error) {
        console.error("Failed to update the document:", error);
        return NextResponse.json({ message: "Failed to update the document" }, { status: 500 });
    }
    
    */
}
