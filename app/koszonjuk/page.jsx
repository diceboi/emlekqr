import { getServerSession } from "next-auth";
import Stripe from "stripe";
import KoszonjukClient from "../components/KoszonjukClient" // Import the client component

// Helper functions
const getCheckoutSession = async (sessionId) => {
  const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);
  return await stripe.checkout.sessions.retrieve(sessionId);
};

export default async function Koszonjuk({ searchParams }) {
  const session_id = searchParams.session_id;
  const checkoutSession = session_id ? await getCheckoutSession(session_id) : null;
  const session = await getServerSession();

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
      }
    : null;

  // Generate the random number once on the server
  const randomNumber = Math.floor(100000 + Math.random() * 900000);

  return (
    <KoszonjukClient
      session={serializedSession}
      checkoutSession={serializedCheckoutSession}
      randomNumber={randomNumber} // Pass the random number as a prop
    />
  );
}