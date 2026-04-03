import { NextResponse } from "next/server";
import { auth, prisma } from "@/lib/auth";

export async function POST(req: Request) {
  try {
    const session = await auth();
    if (!session || !session.user || !session.user.id) {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }

    const { destination, data_json } = await req.json();

    if (!destination || !data_json) {
      return NextResponse.json({ message: "Missing required fields" }, { status: 400 });
    }

    const itinerary = await prisma.savedItinerary.create({
      data: {
        userId: session.user.id,
        destination,
        data_json: JSON.stringify(data_json),
      },
    });

    return NextResponse.json({ message: "Saved successfully", itinerary }, { status: 201 });
  } catch (error) {
    console.error("Save error:", error);
    return NextResponse.json({ message: "Failed to save itinerary" }, { status: 500 });
  }
}

export async function GET(req: Request) {
  try {
    const session = await auth();
    if (!session || !session.user || !session.user.id) {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }

    const itineraries = await prisma.savedItinerary.findMany({
      where: { userId: session.user.id },
      orderBy: { createdAt: "desc" },
    });

    return NextResponse.json({ itineraries }, { status: 200 });
  } catch (error) {
    console.error("Fetch error:", error);
    return NextResponse.json({ message: "Failed to fetch itineraries" }, { status: 500 });
  }
}
