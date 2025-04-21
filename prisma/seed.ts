import { PrismaClient } from "@prisma/client";
import * as bcrypt from "bcryptjs";

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
    title: "The Importance of Quality Education in Today's World",
    content: `
      <h2>Building a Foundation for Success</h2>
      <p>At Saint Charles K. LTD, we believe that quality education is the cornerstone of personal and societal development. In today's rapidly evolving world, a solid educational foundation is more important than ever before.</p>
      
      <p>Our approach to education goes beyond traditional classroom learning. We focus on developing:</p>
      
      <ul>
        <li>Critical thinking and problem-solving skills</li>
        <li>Effective communication abilities</li>
        <li>Character development and ethical values</li>
        <li>Leadership qualities and teamwork</li>
      </ul>
      
      <h3>Preparing Students for the Future</h3>
      <p>The world is changing at an unprecedented pace, and education must evolve to prepare students for challenges that may not even exist yet. At Saint Charles K. LTD, our curriculum is designed to be forward-thinking, equipping students with adaptable skills that will serve them throughout their lives.</p>
      
      <blockquote>
        "Education is the passport to the future, for tomorrow belongs to those who prepare for it today." - Malcolm X
      </blockquote>
      
      <p>We invite you to join our community of learners and discover the difference that quality education can make in your life or the life of your child.</p>
    `,
    published: true,
    publishedAt: new Date(),
  },
  {
    title: "Our Approach to Student-Centered Learning",
    content: `
      <h2>Putting Students at the Heart of Education</h2>
      <p>At Saint Charles K. LTD, we believe that effective education must place students at the center of the learning process. Our student-centered approach recognizes that each learner is unique, with different strengths, challenges, and learning styles.</p>
      
      <h3>Key Elements of Our Approach</h3>
      
      <h4>Personalized Learning Paths</h4>
      <p>We understand that one size does not fit all when it comes to education. Our teachers work closely with each student to identify their individual needs and create personalized learning experiences that help them thrive.</p>
      
      <h4>Active Engagement</h4>
      <p>Learning is not a passive process. We encourage active participation through discussions, projects, and hands-on activities that make learning meaningful and memorable.</p>
      
      <h4>Supportive Environment</h4>
      <p>Our school provides a safe and supportive environment where students feel comfortable taking intellectual risks and learning from mistakes.</p>
      
      <h3>The Results Speak for Themselves</h3>
      <p>Our student-centered approach has led to impressive outcomes:</p>
      
      <ul>
        <li>Higher levels of student engagement and motivation</li>
        <li>Improved academic performance</li>
        <li>Development of lifelong learning skills</li>
        <li>Greater student satisfaction and well-being</li>
      </ul>
      
      <p>We invite you to visit our campus and see our student-centered approach in action.</p>
    `,
    published: true,
    publishedAt: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000), // 7 days ago
  },
  {
    title: "Building Character Through Education",
    content: `
      <h2>Education That Goes Beyond Academics</h2>
      <p>At Saint Charles K. LTD, we believe that true education encompasses more than just academic knowledge. It involves the development of character, values, and life skills that prepare students to be responsible and ethical members of society.</p>
      
      <h3>Character Development in Our Curriculum</h3>
      <p>Character education is woven throughout our curriculum and school culture. We emphasize values such as:</p>
      
      <ul>
        <li><strong>Integrity:</strong> Being honest and ethical in all actions</li>
        <li><strong>Respect:</strong> Treating others with dignity and consideration</li>
        <li><strong>Responsibility:</strong> Taking ownership of one's actions and commitments</li>
        <li><strong>Perseverance:</strong> Developing resilience in the face of challenges</li>
        <li><strong>Empathy:</strong> Understanding and sharing the feelings of others</li>
      </ul>
      
      <h3>Learning Through Service</h3>
      <p>We believe that service to others is a powerful way to build character. Our students participate in community service projects that help them develop empathy, social responsibility, and leadership skills.</p>
      
      <blockquote>
        "Intelligence plus character—that is the goal of true education." - Martin Luther King Jr.
      </blockquote>
      
      <p>By focusing on both academic excellence and character development, we prepare our students not just for successful careers, but for meaningful and purposeful lives.</p>
    `,
    published: true,
    publishedAt: new Date(Date.now() - 14 * 24 * 60 * 60 * 1000), // 14 days ago
  },
];

const testimonies = [
  {
    name: "Yvonne MUKAZI",
    content:
      "Thanks to Saint Charles K. LTD, I was able to pass my B1 exam and achieved my goal because of learning Germany language at Saint Charles K. The teachers were incredibly supportive, and the courses were well-organized.",
    title: "Student",
  },
  {
    name: "Jane Smith",
    content:
      "I am now studying in Germany, and I couldn't have gotten here without the excellent preparation I received from Saint Charles K. LTD. They really care about their students.",
    title: "Student",
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
      data: { ...blog, published: true, publishedAt: new Date() },
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
