import { NextResponse } from "next/server";
import Stripe from "stripe";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

export async function GET(request) {
  const { searchParams } = new URL(request.url);
  const couponCode = searchParams.get("couponcode");

  if (!couponCode) {
    return NextResponse.json({ error: "Missing coupon code" }, { status: 400 });
  }

  try {
    const sessions = await stripe.checkout.sessions.list({ limit: 100 });
    const matchingPurchases = [];

    for (const session of sessions.data) {
      if (session.discounts && session.discounts.length > 0) {
        for (const discount of session.discounts) {
          const promoId = discount.promotion_code;

          if (promoId) {
            const promo = await stripe.promotionCodes.retrieve(promoId);

            if (promo.code.toUpperCase() === couponCode.toUpperCase()) {
              matchingPurchases.push({
                id: session.id,
                amount_total: session.amount_total,
                currency: session.currency,
                created: session.created,
                customer_email: session.customer_details?.email || "Nincs email",
              });
            }
          }
        }
      }
    }

    return NextResponse.json({ purchases: matchingPurchases }, { status: 200 });
  } catch (error) {
    console.error("Stripe lekérés hiba:", error);
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}
