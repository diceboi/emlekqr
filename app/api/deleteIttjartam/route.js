import Ittjartam from "../../(models)/Ittjartam";

export async function POST(req) {
  try {
    const { id } = await req.json();

    const ittjartam = await Ittjartam.findOneAndDelete({ _id: id });

    return new Response(JSON.stringify({ message: 'Ittjartam successfully deleted', ittjartam }), {
      status: 200,
      headers: { 'Content-Type': 'application/json' },
    });
  } catch (error) {
    console.error('Error deleting ittjartam:', error);
    return new Response(JSON.stringify({ error: 'Failed to delete adatlap' }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    });
  }
}
