import connect from "../../Utils/db";
import Emlekadatlap from "../../(models)/Emlekadatlap";
import { NextResponse } from "next/server";

export async function POST(req) {
    await connect();

    const { writtensecret, uri, email, subscriptionId } = await req.json();

    console.log('Secret received from frontend: ',writtensecret);
    console.log('Uri received from frontend: ',uri);
    console.log('Email received from frontend: ',email);
    console.log('Subscription ID:', subscriptionId);

    try {
        const emlekadatlap = await Emlekadatlap.create({ uri, secret: writtensecret, owner: email, subscription: subscriptionId });
        console.log('Emlekadatlap created:', emlekadatlap);
        return NextResponse.json({ data: { Emlekadatlap: emlekadatlap } });
    } catch (error) {
        console.error('Error adding secret to Emlekadatlap:', error);
        return NextResponse.json({ message: "Nem sikerült a secretet az adatlaphoz hozzáadni", error }, { status: 500 });
    }
}
