import Stripe from 'stripe';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY); // Ensure this is defined in your .env.local

// Named export for the POST request
export async function POST(req) {
  try {
    const { subscriptionId } = await req.json();

    // Fetch the subscription details from Stripe
    const subscription = await stripe.subscriptions.retrieve(subscriptionId);

    // Return the subscription status
    return new Response(JSON.stringify({ status: subscription.status }), {
      status: 200,
      headers: { 'Content-Type': 'application/json' },
    });
  } catch (error) {
    return new Response(JSON.stringify({ message: 'Error fetching subscription status', error: error.message }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    });
  }
}
