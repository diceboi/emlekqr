import Stripe from 'stripe';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

export async function POST(req) {
  try {
    const { email, productPriceId, type } = await req.json(); // Parse request body to include couponCode

    if (!email || !productPriceId) {
      console.error('Missing email or productPriceId');
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

    // Create a Checkout Session with the discount if valid
    const session = await stripe.checkout.sessions.create({
      customer: customer.id,
      payment_method_types: ['card'],
      line_items: [
        {
          price: productPriceId,
          quantity: 1,
        },
      ],
      mode: 'subscription',
      billing_address_collection: 'required',
      shipping_address_collection: {
        allowed_countries: ['HU'],
      },
      phone_number_collection: {
        enabled: true,
      },
      allow_promotion_codes: true,
      success_url: `${req.headers.get('origin')}/koszonjuk?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${req.headers.get('origin')}/cancel`,
      metadata: {
        forma: type,
      },
    });

    // Return the session ID
    return new Response(JSON.stringify({ sessionId: session.id }), {
      status: 200,
      headers: { 'Content-Type': 'application/json' },
    });
  } catch (error) {
    console.error('Error creating checkout session:', error);
    return new Response(JSON.stringify({ error: 'Failed to create session' }), {
      status: 500,
    });
  }
}
