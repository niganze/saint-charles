import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { contactSchema } from "@/features/contact/types";
import { generateContactEmail, sendMail } from "@/lib/mailer";

export async function POST(request: Request) {
  try {
    const data = await request.json();

    // Validate the data
    const validationResult = contactSchema.safeParse(data);
    if (!validationResult.success) {
      return NextResponse.json(
        { error: validationResult.error.errors[0].message },
        { status: 400 }
      );
    }

    // Create contact entry
    const contact = await prisma.contact.create({
      data: validationResult.data,
    });

    // Send notification email
    const html = generateContactEmail(validationResult.data);
    await sendMail({
      to: process.env.NOTIFICATION_EMAIL!,
      subject: "New Contact Inquiry",
      html,
    });

    return NextResponse.json(contact);
  } catch (error) {
    console.error("Failed to submit contact form:", error);
    return NextResponse.json(
      { error: "Failed to submit contact form" },
      { status: 500 }
    );
  }
}

export async function GET() {
  try {
    const contacts = await prisma.contact.findMany({
      orderBy: {
        createdAt: "desc",
      },
    });

    return NextResponse.json(contacts);
  } catch (error) {
    console.error("Failed to fetch contacts:", error);
    return NextResponse.json(
      { error: "Failed to fetch contacts" },
      { status: 500 }
    );
  }
}
