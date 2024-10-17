import Stripe from 'stripe';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

export default async function handler(req, res) {
  if (req.method === 'GET') {
    const sessionId = req.query.session_id;

    if (!sessionId) {
      return res.status(400).json({ error: 'session_id query parameter is required' });
    }

    try {
      // Fetch the checkout session using the session ID
      const session = await stripe.checkout.sessions.retrieve(sessionId);
      return res.status(200).json(session);
    } catch (error) {
      console.error('Error retrieving Stripe session:', error);
      return res.status(500).json({ error: 'Failed to retrieve session' });
    }
  } else {
    res.setHeader('Allow', 'GET');
    res.status(405).end('Method Not Allowed');
  }
}
