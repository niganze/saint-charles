import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    const [testimonials, blogs] = await Promise.all([
      prisma.testimony.findMany({
        orderBy: {
          createdAt: "desc",
        },
      }),
      prisma.blog.findMany({
        where: {
          published: true,
        },
        orderBy: {
          createdAt: "desc",
        },
      }),
    ]);

    return NextResponse.json({ testimonials, blogs });
  } catch (error) {
    console.error("Error fetching content:", error);
    return NextResponse.json(
      { error: "Failed to fetch content" },
      { status: 500 }
    );
  }
}
