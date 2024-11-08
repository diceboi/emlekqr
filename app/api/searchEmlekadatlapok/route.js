import connect from "../../Utils/db"
import Emlekadatlap from "../../(models)/Emlekadatlap"
import { NextResponse } from "next/server";

export async function GET(req) {

  await connect();

  const { searchParams } = new URL(req.url);
  const query = searchParams.get("query");

  if (!query || query.length < 3) {
    return NextResponse(JSON.stringify([]), { status: 400 });
  }

  try {
    const results = await Emlekadatlap.find(
      {
        $or: [
          { name: { $regex: query, $options: "i" } },
          { born: { $regex: query, $options: "i" } },
          { died: { $regex: query, $options: "i" } },
          { graveyard: { $regex: query, $options: "i" } },
          { bio: { $regex: query, $options: "i" } }
          // Add other relevant fields here
        ],
      },
      { name: 1, uri: 1, born: 1, died: 1, graveyard: 1, profileimage: 1, } // Only return relevant fields
    ).limit(10);

    return NextResponse.json(results, {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  } catch (error) {
    return NextResponse.json(
      { error: "Error fetching search results" },
      { status: 500 }
    );
  }
}
