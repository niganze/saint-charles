import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth"; // Ensure you import your auth options
import { NextResponse } from "next/server";

export async function GET() {
  try {
    const session = await getServerSession(authOptions); // Use getServerSession to get the session

    if (!session) {
      return NextResponse.json(null, { status: 401 }); // Return 401 if no session
    }

    return NextResponse.json(session); // Return the session
  } catch (error) {
    console.error("[SESSION]", error); // Log the error for debugging
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}

export async function POST() {
  try {
    const session = await getServerSession(authOptions);

    if (!session) {
      return NextResponse.json(null, { status: 401 });
    }

    return NextResponse.json(session);
  } catch (error) {
    console.error("[SESSION]", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
