import { prisma } from "@/lib/prisma";
import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";
import { authOptions } from "@/lib/auth";

export async function GET() {
  try {
    const session = await getServerSession(authOptions);

    if (!session) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    const [userCount, publishedBlogCount, testimonyCount] = await Promise.all([
      prisma.user.count(),
      prisma.blog.count({ where: { published: true } }),
      prisma.testimony.count(),
    ]);

    return NextResponse.json({
      userCount,
      publishedBlogCount,
      testimonyCount,
    });
  } catch (error) {
    console.error("[DASHBOARD_STATS]", error);
    return new NextResponse("Internal error", { status: 500 });
  }
}
