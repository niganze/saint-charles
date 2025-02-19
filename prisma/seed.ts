import { PrismaClient } from "@prisma/client";
import * as bcrypt from "bcrypt";

const prisma = new PrismaClient();

const users = [
  {
    email: "admin@saintcharles.com",
    name: "Admin",
    password: "admin@saintcharles.com",
  },
];

const blogs = [
  {
    title: "Welcome to Saint Charles Web Development",
    content:
      "We are excited to announce the launch of our new web development services...",
  },
  {
    title: "Our Mission",
    content:
      "Our mission is to provide the best web development services to our clients...",
  },
  {
    title: "Our Services",
    content:
      "We offer a range of web development services to meet your needs...",
  },
];

const testimonies = [
  {
    name: "Yvonne MUKAZI",
    content:
      "Thanks to Saint Charles K. LTD, I was able to pass my B1 exam and achieved my goal because of learning Germany language at Saint Charles K. The teachers were incredibly supportive, and the courses were well-organized.",
  },
  {
    name: "Jane Smith",
    content:
      "I am now studying in Germany, and I couldn’t have gotten here without the excellent preparation I received from Saint Charles K. LTD. They really care about their students.",
  },
];

async function main() {
  console.log("Starting seed...");
  // Create admin user
  const adminPassword = await bcrypt.hash("admin123", 10);
  console.log("Creating admin user...");
  users.forEach(async (user) => {
    await prisma.user.upsert({
      where: { email: user.email },
      update: {},
      create: {
        ...user,
        password: adminPassword,
      },
    });
  });

  // Create sample blog posts
  console.log("Creating sample blog posts...");
  blogs.forEach(async (blog) => {
    await prisma.blog.create({
      data: { ...blog, published: true },
    });
  });

  // Create sample testimonies
  console.log("Creating sample testimonies...");
  testimonies.forEach(async (testimony) => {
    await prisma.testimony.create({
      data: { ...testimony },
    });
  });

  console.log("Seed completed successfully!");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
