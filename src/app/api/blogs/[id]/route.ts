import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { uploadImage } from "@/lib/cloudinary";
import { blogSchema } from "@/features/blogs/types";

export async function PUT(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const session = await getServerSession(authOptions);
    if (!session) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const oldBlog = await prisma.blog.findUnique({
      where: { id: parseInt(params.id) },
    });

    if (!oldBlog) {
      return NextResponse.json({ error: "Blog not found" }, { status: 404 });
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

    const id = parseInt(params.id);
    let imageUrl = oldBlog.image;

    if (image) {
      imageUrl = await uploadImage(image);
    }

    const blog = await prisma.blog.update({
      where: { id },
      data: {
        title,
        content,
        image: imageUrl,
        published,
        publishedAt:
          published && !oldBlog.published ? new Date() : oldBlog.publishedAt,
      },
    });

    return NextResponse.json(blog);
  } catch (error) {
    console.error("Failed to update blog:", error);
    return NextResponse.json(
      { error: "Failed to update blog" },
      { status: 500 }
    );
  }
}

export async function DELETE(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const session = await getServerSession(authOptions);
    if (!session) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const id = parseInt(params.id);

    await prisma.blog.delete({
      where: { id },
    });

    return NextResponse.json({ message: "Blog deleted successfully" });
  } catch (error) {
    console.error("Failed to delete blog:", error);
    return NextResponse.json(
      { error: "Failed to delete blog" },
      { status: 500 }
    );
  }
}
