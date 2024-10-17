import { getServerSession } from "next-auth";
import Stripe from "stripe";

// Function to fetch Stripe Checkout Session using session_id
const getCheckoutSession = async (sessionId) => {
  try {
    const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);
    const session = await stripe.checkout.sessions.retrieve(sessionId);
    return session;
  } catch (error) {
    console.error("Error fetching Stripe session:", error);
    return null;
  }
};

const updateUserData = async (email, checkoutSessionData) => {
  const { session_id, zip, city, address_line1, address_line2, phone, subscription_id, secret } = checkoutSessionData;

  try {
    const baseUrl = process.env.NEXT_PUBLIC_URL;
    const res = await fetch(`${baseUrl}/api/updateUser`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        email,
        checkoutSession: session_id,
        zip,
        city,
        address1: address_line1,
        address2: address_line2,
        phone,
        stripeSubscription: subscription_id,
        secret: secret,
      }),
    });

    if (!res.ok) {
      throw new Error("Failed to update user data");
    }

    const data = await res.json();
    return data;
  } catch (error) {
    console.error("Error updating user data:", error);
    return null;
  }
};

// Main server-side component
export default async function Koszonjuk({ searchParams }) {
  const session_id = searchParams.session_id; // Get session_id from URL

  // Fetch the checkout session details from Stripe
  const checkoutSession = session_id ? await getCheckoutSession(session_id) : null;

  // Get the current user session from NextAuth
  const session = await getServerSession();

  let currentUser = null;
  let randomNumber = Math.floor(100000 + Math.random() * 900000); // Generate a random number

  if (session?.user?.email) {
    // Get user data (if needed for other purposes)
    currentUser = session.user;

    if (checkoutSession && checkoutSession.customer_details?.email) {
      const customerDetails = checkoutSession.customer_details;

      // Prepare data to update the user
      const checkoutSessionData = {
        session_id,
        zip: customerDetails.address?.postal_code,
        city: customerDetails.address?.city,
        address_line1: customerDetails.address?.line1,
        address_line2: customerDetails.address?.line2 || '',
        phone: customerDetails.phone || '',
        subscription_id: checkoutSession.subscription || '',
        secret: randomNumber,
      };

      // Update the user data in the database
      await updateUserData(customerDetails.email, checkoutSessionData);
    }
  }

  console.log(checkoutSession)

  return (
    <section className="w-full py-20">
      <div className="container flex flex-col gap-8 m-auto p-4 bg-[--cream] rounded-2xl">
        <h2 className="text-[--rose] text-center">Köszönjük a vásárlást</h2>
        <p className="text-center">Jelenleg nincs más dolgod, mint megvárni, amíg megérkezik az érme.</p>
        <p className="text-center">Rendelési azonosítód: <strong>{randomNumber}</strong></p>
        {currentUser?.email && <p>{currentUser.email}</p>}
        {checkoutSession && (
          <div className="text-center">
            <p>Customer: {checkoutSession.customer}</p>
            <p>Total Amount: ${(checkoutSession.amount_total / 100).toFixed(2)}</p>
          </div>
        )}
      </div>
    </section>
  );
}
