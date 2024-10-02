import { getServerSession } from "next-auth";
import Stripe from 'stripe';

// Function to get user data
const getUserData = async (email) => {
  try {
    const baseUrl = process.env.NEXT_PUBLIC_URL;
    const res = await fetch(`${baseUrl}/api/getUserData?email=${email}`, { cache: 'no-store' });
    if (!res.ok) {
      throw new Error("Az adatok letöltése nem sikerült");
    }
    const data = await res.json();
    return data;
  } catch (error) {
    console.log("Az adatok betöltése sikertlen", error);
    return null;
  }
};

// Function to fetch Stripe customer data based on email
const getCheckoutSession = async (userEmail) => {
  try {
    const baseUrl = process.env.NEXT_PUBLIC_URL;
    const res = await fetch(`${baseUrl}/api/stripe/searchCustomer?email=${userEmail}`, { cache: 'no-store' });
    if (!res.ok) {
      throw new Error("A Stripe client secret ");
    }
    const data = await res.json();
    return data;
  } catch (error) {
    console.log("Nem sikerült megtalálni a felhasználót", error);
    return null;
  }
};

// Function to send secret to your API
const sendSecretToAPI = async (email, secret) => {
  try {
    const baseUrl = process.env.NEXT_PUBLIC_URL;
    const res = await fetch(`${baseUrl}/api/auth/secret`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email, secret }),
    });

    if (!res.ok) {
      throw new Error("Failed to update user secret");
    }

    // Parse the JSON response
    const data = await res.json();
    console.log("Secret successfully added:", data);
    return data;
  } catch (error) {
    console.error("Error sending secret to API:", error);
  }
};

// Main function to render the component
export default async function Koszonjuk({ searchParams }) {
  const session = await getServerSession();
  const session_id = searchParams.session_id;
  
  // Initialize Stripe with the secret key
  const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

  // Retrieve the Stripe checkout session using the session_id
  const checkoutSession = await stripe.checkout.sessions.retrieve(session_id);
  
  // Extract the user email from the checkout session
  const userEmail = checkoutSession.customer_details?.email;

  // Pass the userEmail to getCheckoutSession instead of session_id
  if (userEmail) {
    const customerData = await getCheckoutSession(userEmail); // Pass the userEmail
    console.log("Customer Data:", customerData); // Log the customer data for debugging
  }

  let currentUser = null;

  if (session) {
    const userData = await getUserData(session.user.email);
    currentUser = userData?.data?.User || null;
  }

  // Generate a random number as the secret
  const randomNumber = Math.floor(100000 + Math.random() * 900000);

  // Send the session email and the generated secret to the API
  if (session?.user?.email) {
    await sendSecretToAPI(session.user.email, randomNumber);
  }

  return (
    <section className='w-full py-20'>
      <div className='container flex flex-col gap-8 m-auto p-4 bg-[--cream] rounded-2xl'>
        <h2 className="text-[--rose] text-center">Köszönjük a vásárlást</h2>

        <p className="text-center">Jelenleg nincs más dolgod, mint megvárni, amíg megérkezik az érme.</p>
        <p className="text-center">Rendelési azonosítód: <strong>{randomNumber}</strong></p>
        {currentUser?.email && <p>{currentUser.email}</p>}
      </div>
    </section>
  );
}
