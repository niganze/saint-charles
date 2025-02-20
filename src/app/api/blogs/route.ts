import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { uploadImage } from "@/lib/cloudinary";
import { blogSchema } from "@/features/blogs/types";

export async function GET() {
  try {
    const blogs = await prisma.blog.findMany({
      orderBy: {
        createdAt: "desc",
      },
    });

    return NextResponse.json(blogs);
  } catch (error) {
    console.error("Failed to fetch blogs:", error);
    return NextResponse.json(
      { error: "Failed to fetch blogs" },
      { status: 500 }
    );
  }
}

export async function POST(request: Request) {
  try {
    const session = await getServerSession(authOptions);
    if (!session) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const formData = await request.formData();
    const title = formData.get("title") as string;
    const content = formData.get("content") as string;
    const published = formData.get("published") === "true";
    const image = formData.get("image") as File | null;

    // Validate the data
    const validationResult = blogSchema.safeParse({
      title,
      content,
      image: image || undefined,
      published,
    });

    if (!validationResult.success) {
      return NextResponse.json(
        { error: validationResult.error.errors[0].message },
        { status: 400 }
      );
    }

    let imageUrl = null;
    if (image) {
      imageUrl = await uploadImage(image);
    }

    const blog = await prisma.blog.create({
      data: {
        title,
        content,
        image: imageUrl,
        published,
        publishedAt: published ? new Date() : null,
      },
    });

    return NextResponse.json(blog);
  } catch (error) {
    console.error("Failed to create blog:", error);
    return NextResponse.json(
      { error: "Failed to create blog" },
      { status: 500 }
    );
  }
}
