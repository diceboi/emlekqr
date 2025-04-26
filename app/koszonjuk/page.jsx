import { getServerSession } from "next-auth";
import Stripe from "stripe";
import KoszonjukClient from "../components/KoszonjukClient" // Import the client component

export const metadata = {
  title: 'Köszönjük a rendelésed - EmlékQR',
}

// Helper functions
const getCheckoutSession = async (sessionId) => {
  const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);
  return await stripe.checkout.sessions.retrieve(sessionId, { expand: ['discounts'] });
};

export default async function Koszonjuk({ searchParams }) {
  const session_id = searchParams.session_id;
  const checkoutSession = session_id ? await getCheckoutSession(session_id) : null;
  const session = await getServerSession();

  let couponCode = null;

  if (checkoutSession?.discounts?.length > 0 && checkoutSession.discounts[0]?.promotion_code) {
    try {
      const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);
      const promotionCode = await stripe.promotionCodes.retrieve(checkoutSession.discounts[0].promotion_code);
      couponCode = promotionCode.code; // Itt kapod meg pl. 'TPE6658'
    } catch (error) {
      console.error("Hiba a promotion code lekérésénél:", error);
    }
  }

  // Serialize data to pass only necessary information to the client
  const serializedSession = session
    ? { user: { email: session.user.email } }
    : null;

  const serializedCheckoutSession = checkoutSession
    ? {
        id: checkoutSession.id,
        customer: checkoutSession.customer,
        amount_total: checkoutSession.amount_total,
        customer_details: checkoutSession.customer_details,
        subscription: checkoutSession.subscription,
        payment_mode: checkoutSession.mode,
        payment_status: checkoutSession.payment_status,
        metadata: checkoutSession.metadata
      }
    : null;

  const randomNumber = Math.floor(100000 + Math.random() * 900000);

  console.log("Checkout Session:", checkoutSession);
  console.log("Coupon Code:", couponCode);

  return (
    <KoszonjukClient
      session={serializedSession}
      checkoutSession={serializedCheckoutSession}
      randomNumber={randomNumber}
      couponCode={couponCode} // <<<<<< Passzoltam ide is
    />
  );
}