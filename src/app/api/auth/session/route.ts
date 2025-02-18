import { auth } from "@/../auth";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    const session = await auth();

    if (!session) {
      return NextResponse.json(null);
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
