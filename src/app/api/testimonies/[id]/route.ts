import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { uploadImage } from "@/lib/cloudinary";
import { testimonySchema } from "@/features/testimonies/types";

export async function PUT(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const session = await getServerSession(authOptions);
    if (!session) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const oldTestimony = await prisma.testimony.findUnique({
      where: { id: parseInt(params.id) },
    });

    if (!oldTestimony) {
      return NextResponse.json(
        { error: "Testimony not found" },
        { status: 404 }
      );
    }

    const formData = await request.formData();
    const name = formData.get("name") as string;
    const content = formData.get("content") as string;
    const image = formData.get("image") as File | null;

    // Validate the data
    const validationResult = testimonySchema.safeParse({
      name,
      content,
      image: image || undefined,
    });

    if (!validationResult.success) {
      return NextResponse.json(
        { error: validationResult.error.errors[0].message },
        { status: 400 }
      );
    }

    const id = parseInt(params.id);
    let imageUrl = oldTestimony.image;

    if (image) {
      imageUrl = await uploadImage(image);
    }

    const testimony = await prisma.testimony.update({
      where: { id },
      data: {
        name,
        content,
        image: imageUrl,
      },
    });

    return NextResponse.json(testimony);
  } catch (error) {
    console.error("Failed to update testimony:", error);
    return NextResponse.json(
      { error: "Failed to update testimony" },
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

    await prisma.testimony.delete({
      where: { id },
    });

    return NextResponse.json({ message: "Testimony deleted successfully" });
  } catch (error) {
    console.error("Failed to delete testimony:", error);
    return NextResponse.json(
      { error: "Failed to delete testimony" },
      { status: 500 }
    );
  }
}
