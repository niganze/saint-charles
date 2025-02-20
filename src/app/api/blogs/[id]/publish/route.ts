import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";

export async function PUT(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const session = await getServerSession(authOptions);
    if (!session) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const id = parseInt(params.id);

    const blog = await prisma.blog.update({
      where: { id },
      data: {
        published: true,
        publishedAt: new Date(),
      },
    });

    return NextResponse.json(blog);
  } catch (error) {
    console.error("Failed to publish blog:", error);
    return NextResponse.json(
      { error: "Failed to publish blog" },
      { status: 500 }
    );
  }
}
