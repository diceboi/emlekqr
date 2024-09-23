import { NextResponse } from "next/server";
const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);

export async function GET(req) {
  try {
    const { searchParams } = new URL(req.email);
    const email = searchParams.get('email');

    if (!email) {
      return NextResponse.json({ error: "Email query parameter is required" }, { status: 400 });
    }

    const customer = await stripe.customers.search({
      query: `email:"${email}"`,
    });

    if (customer.data.length === 0) {
      return NextResponse.json({ error: "Customer not found" }, { status: 404 });
    }
    console.log('Found customer', customer.data[0]);
    return NextResponse.json(customer.data[0]);
  } catch (error) {
    console.error('Error retrieving customer:', error);
    return NextResponse.json({ error: "Something went wrong" }, { status: 500 });
  }
}
