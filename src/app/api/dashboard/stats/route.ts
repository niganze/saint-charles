import { prisma } from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";
import { authOptions } from "@/lib/auth";
import { getServerSession } from "next-auth";

export const dynamic = "force-dynamic";

export async function GET(request: NextRequest) {
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
