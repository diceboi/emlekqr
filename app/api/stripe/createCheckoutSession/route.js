import Stripe from 'stripe';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

export async function POST(req) {
  try {
    const { email, productPriceId } = await req.json(); // Parse request body

    if (!email || !productPriceId) {
      return new Response(JSON.stringify({ error: 'Email and Product Price ID are required' }), {
        status: 400,
      });
    }

    // Find or create a Stripe customer
    let customer;
    const existingCustomers = await stripe.customers.list({ email, limit: 1 });
    if (existingCustomers.data.length > 0) {
      customer = existingCustomers.data[0];
    } else {
      customer = await stripe.customers.create({ email });
    }

    // Create a Checkout Session
    const session = await stripe.checkout.sessions.create({
      customer: customer.id,
      payment_method_types: ['card'],
      line_items: [
        {
          price: productPriceId, // Replace with your actual Stripe price ID
          quantity: 1,
        },
      ],
      mode: 'subscription',
      success_url: `${req.headers.get('origin')}/koszonjuk?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${req.headers.get('origin')}/cancel`,
    });

    // Return the session ID
    return new Response(JSON.stringify({ sessionId: session.id }), {
      status: 200,
    });
  } catch (error) {
    console.error('Error creating checkout session:', error);
    return new Response(JSON.stringify({ error: 'Failed to create session' }), {
      status: 500,
    });
  }
}
