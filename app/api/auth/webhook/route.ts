import Stripe from "stripe";
import { NextResponse, NextRequest } from "next/server";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!)

export async function POST(req: NextRequest, res: NextResponse) {

    const payload= await req.text()
    const response = JSON.parse(payload)

    const sig = req.headers.get("Stripe-Signature")

    const dateTime = new Date(response?.created * 1000).toLocaleDateString()
    const timeString = new Date(response?.created * 1000).toLocaleDateString()

    try {
        let event  = stripe.webhooks.constructEvent(
            payload,
            sig!,
            process.env.STRIPE_WEBHOOK_SECRET!,
        )

        console.log("Event", event?.type);
        // charge.succeeded
        // payment_intent.succeeded
        // payment_intent.created

        console.log(
        response?.data?.object?.billing_details?.email, // email
        response?.data?.object?.amount, // amount
        JSON.stringify(res), // payment info
        response?.type, // type
        String(timeString), // time
        String(dateTime), // date
        response?.data?.object?.receipt_email, // email
        response?.data?.object?.receipt_url, // url
        JSON.stringify(response?.data?.object?.payment_method_details), // Payment method details
        JSON.stringify(response?.data?.object?.billing_details), // Billing details
        response?.data?.object?.currency // Currency
        );

        return NextResponse.json({ status: "success", event: event.type, response: res })
    } catch (error) {
        return NextResponse.json({ status: "failed", error })
    }
}