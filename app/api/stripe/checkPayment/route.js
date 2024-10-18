import Stripe from 'stripe';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

export async function POST(req) {
  try {
    const { subscriptionId } = await req.json();
    
    if (!subscriptionId) {
      throw new Error("Subscription ID is missing from the request.");
    }

    // Log the subscription ID to ensure it's correct
    console.log(`Received subscriptionId: ${subscriptionId}`);

    // Fetch the subscription details from Stripe
    const subscription = await stripe.subscriptions.retrieve(subscriptionId);

    // Log the subscription object to check for any issues
    console.log('Subscription retrieved:', subscription);

    // Return the subscription status
    return new Response(JSON.stringify({ status: subscription.status }), {
      status: 200,
      headers: { 'Content-Type': 'application/json' },
    });
  } catch (error) {
    console.error('Error in Stripe checkPayment route:', error);
    return new Response(JSON.stringify({ message: 'Error fetching subscription status', error: error.message }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    });
  }
}
