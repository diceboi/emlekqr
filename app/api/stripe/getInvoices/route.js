import Stripe from 'stripe';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY); // Ensure this is defined in your .env.local

// Named export for the POST request
export async function GET(req) {

try {

    const { searchParams } = new URL(req.url);
    const subscriptionId = searchParams.get('subscriptionid');

    console.log(searchParams.get('subscriptionid'))
  
    const invoices = await stripe.invoices.list(subscriptionId);
    
    return new Response(JSON.stringify({ invoices }), {
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