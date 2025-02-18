import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { uploadImage } from "@/lib/cloudinary";
import { testimonySchema } from "@/features/testimonies/types";

export async function GET() {
  try {
    const testimonies = await prisma.testimony.findMany({
      orderBy: {
        createdAt: "desc",
      },
    });

    return NextResponse.json(testimonies);
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to fetch testimonies" },
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

    let imageUrl = null;
    if (image) {
      imageUrl = await uploadImage(image);
    }

    const testimony = await prisma.testimony.create({
      data: {
        name,
        content,
        image: imageUrl,
      },
    });

    return NextResponse.json(testimony);
  } catch (error) {
    console.error("Failed to create testimony:", error);
    return NextResponse.json(
      { error: "Failed to create testimony" },
      { status: 500 }
    );
  }
}
