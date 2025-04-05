import Emlekadatlap from "../../(models)/Emlekadatlap";

export async function POST(req) {
  try {
    const { subscriptionId } = await req.json();

    const emlekadatlap = await Emlekadatlap.findOneAndDelete({ subscription: subscriptionId });

    return new Response(JSON.stringify({ message: 'Adatlap successfully deleted', emlekadatlap }), {
      status: 200,
      headers: { 'Content-Type': 'application/json' },
    });
  } catch (error) {
    console.error('Error deleting adatlap:', error);
    return new Response(JSON.stringify({ error: 'Failed to delete adatlap' }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    });
  }
}
