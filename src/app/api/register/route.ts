import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { registrationSchema } from "@/features/registration/types";
import { generateRegistrationEmail, sendMail } from "@/lib/mailer";

export async function POST(request: Request) {
  try {
    const data = await request.json();

    // Validate the data
    const validationResult = registrationSchema.safeParse(data);
    if (!validationResult.success) {
      return NextResponse.json(
        { error: validationResult.error.errors[0].message },
        { status: 400 }
      );
    }

    // Create registration entry
    const registration = await prisma.registration.create({
      data: validationResult.data,
    });

    // Send notification email
    const html = generateRegistrationEmail(validationResult.data);
    await sendMail({
      to: process.env.NOTIFICATION_EMAIL!,
      subject: "New Course Registration",
      html,
    });
    
    // Send to the user (optional, with a different message)
await sendMail({
  to: validationResult.data.email,
  subject: "Thank you for registering with Saint Charles K. Ltd",
  html: `
    <h2>Hi ${validationResult.data.name},</h2>
    <p>Thank you for registering for our course: <strong>${validationResult.data.preferredCourse}</strong>.</p>
    <p>We have received your details and will get in touch with you shortly.</p>
    <p>Regards,<br/>Saint Charles K. Ltd</p>
  `,
});

    return NextResponse.json(registration);
  } catch (error) {
    console.error("Failed to submit registration:", error);
    return NextResponse.json(
      { error: "Failed to submit registration" },
      { status: 500 }
    );
  }
}

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const startDate = searchParams.get("startDate");
    const endDate = searchParams.get("endDate");
    const search = searchParams.get("search");
    const shift = searchParams.get("shift");
    const course = searchParams.get("course");

    const where: any = {};

    if (startDate && endDate) {
      where.createdAt = {
        gte: new Date(startDate),
        lte: new Date(endDate),
      };
    }

    if (search) {
      where.OR = [
        { name: { contains: search } },
        { email: { contains: search } },
        { phone: { contains: search } },
      ];
    }

    if (shift) {
      where.preferredSchedule = shift;
    }

    if (course) {
      where.preferredCourse = course;
    }

    const registrations = await prisma.registration.findMany({
      where,
      orderBy: {
        createdAt: "desc",
      },
    });

    return NextResponse.json(registrations);
  } catch (error) {
    console.error("Failed to fetch registrations:", error);
    return NextResponse.json(
      { error: "Failed to fetch registrations" },
      { status: 500 }
    );
  }
}
