import Stripe from 'stripe';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

export async function POST(req) {
  try {
    const { subscriptionId } = await req.json();

    if (!subscriptionId) {
      return new Response(JSON.stringify({ error: 'Subscription ID is required' }), {
        status: 400,
      });
    }

    console.log("Substatus: ", subscriptionId)

    const canceledSubscription = await stripe.subscriptions.cancel(subscriptionId);

    return new Response(JSON.stringify({ message: 'Subscription canceled successfully', subscription: canceledSubscription }), {
      status: 200,
      headers: { 'Content-Type': 'application/json' },
    });
  } catch (error) {
    console.error('Error canceling subscription:', error);
    return new Response(JSON.stringify({ error: 'Failed to cancel subscription' }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    });
  }
}
