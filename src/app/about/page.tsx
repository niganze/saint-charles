import { PrimaryButton } from "@/components/ui/primary-button";
import {
  Award,
  BookOpen,
  Clock,
  GraduationCap,
  Heart,
  Scale,
  Target,
} from "lucide-react";

const values = [
  {
    icon: Award,
    name: "Commitment to Excellence",
    description:
      "We strive for the highest quality of teaching and student satisfaction.",
  },
  {
    icon: Target,
    name: "Affordability",
    description:
      "We offer the most affordable German courses to make education accessible to everyone.",
  },
  {
    icon: Heart,
    name: "Student-Centered Approach",
    description:
      "Our students' success is our top priority. We provide personalized guidance and support throughout their learning journey.",
  },
  {
    icon: Scale,
    name: "Integrity",
    description:
      "We maintain the highest standards of professionalism, transparency, and ethical conduct.",
  },
];

const milestones = [
  {
    year: "2021",
    title: "Foundation",
    description:
      "Saint Charles K. LTD was founded with the vision of providing comprehensive German language education.",
  },
  {
    year: "2023",
    title: "100+ Success Stories",
    description:
      "More than 100 of our students have successfully traveled to Germany for work, study, and life.",
  },
  {
    year: "Present",
    title: "Continuous Growth",
    description:
      "We continue to evolve and adapt our programs to meet the changing needs of our students.",
  },
];

const schedules = [
  {
    title: "Weekday Shifts",
    times: ["08:00–11:00", "11:10–14:10", "14:20–17:20", "17:30–20:30"],
  },
  {
    title: "Weekend Shifts",
    times: ["Saturday: 08:30–15:30", "Sunday: 08:30–15:30"],
  },
];

export default function AboutPage() {
  return (
    <main>
      {/* Hero */}
      <section className="py-24 bg-gray-900 text-white">
        <div className="container">
          <div className="max-w-3xl">
            <h1 className="text-4xl font-bold tracking-tight sm:text-5xl">
              Welcome to Saint Charles K. LTD
            </h1>
            <p className="mt-6 text-lg leading-8 text-gray-300">
              At Saint Charles K. LTD, we are dedicated to providing
              high-quality, intensive German language courses. Since our
              founding in 2021, we have helped more students achieve their
              dream, with more than 100 now thriving in Germany country.
            </p>
            <div className="mt-8">
              <PrimaryButton href="/contact" showArrow>
                Get in Touch
              </PrimaryButton>
            </div>
          </div>
        </div>
      </section>

      {/* Mission & Vision */}
      <section className="py-24">
        <div className="container">
          <div className="grid gap-12 md:grid-cols-2">
            <div className="space-y-6">
              <h2 className="text-3xl font-bold tracking-tight text-gray-900">
                Our Mission
              </h2>
              <p className="text-lg leading-8 text-gray-600">
                Our mission is to make learning German accessible, most
                affordable, and effective for all. We are committed to guiding
                you every step of the way on your journey to mastering the
                German language, whether you're looking to study, work, or live
                in Germany.
              </p>
            </div>
            <div className="space-y-6">
              <h2 className="text-3xl font-bold tracking-tight text-gray-900">
                Our Vision
              </h2>
              <p className="text-lg leading-8 text-gray-600">
                We envision a world where every student has the opportunity to
                access the tools, knowledge, and resources to learn German
                effectively. We aim to be a bridge to success for our students,
                opening doors to new educational and career opportunities in
                Germany.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Core Values */}
      <section className="py-24 bg-gray-50">
        <div className="container">
          <div className="text-center">
            <h2 className="text-3xl font-bold tracking-tight text-gray-900">
              Core Values
            </h2>
            <p className="mt-4 text-lg leading-8 text-gray-600 max-w-2xl mx-auto">
              Our values guide everything we do, from how we teach to how we
              interact with our students.
            </p>
          </div>

          <div className="mt-16 grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
            {values.map((value) => (
              <div
                key={value.name}
                className="relative overflow-hidden rounded-md bg-white p-8 shadow-sm ring-1 ring-gray-200/50"
              >
                <div className="flex h-12 w-12 items-center justify-center rounded-md bg-sc-red/10">
                  <value.icon className="h-6 w-6 text-sc-red" />
                </div>
                <h3 className="mt-4 text-lg font-semibold text-gray-900">
                  {value.name}
                </h3>
                <p className="mt-2 text-gray-600">{value.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* History & Milestones */}
      <section className="py-24">
        <div className="container">
          <div className="grid gap-12 lg:grid-cols-2">
            <div>
              <h2 className="text-3xl font-bold tracking-tight text-gray-900">
                Our History
              </h2>
              <p className="mt-6 text-lg leading-8 text-gray-600">
                Saint Charles K. LTD was founded with the vision of providing
                comprehensive German language education to aspiring learners. In
                our years of operation, we have already helped many students
                achieving their dreams and we continue to grow, evolve, and
                adapt to meet the needs of our students.
              </p>
            </div>

            <div className="space-y-12">
              <h2 className="text-3xl font-bold tracking-tight text-gray-900">
                Milestones & Achievements
              </h2>
              <div className="space-y-8">
                {milestones.map((milestone) => (
                  <div
                    key={milestone.year}
                    className="relative pl-12 before:absolute before:left-0 before:top-0 before:h-full before:w-0.5 before:bg-sc-red"
                  >
                    <div className="absolute left-0 top-0 -translate-x-1/2 rounded-full bg-sc-red p-1">
                      <div className="h-2 w-2 rounded-full bg-white" />
                    </div>
                    <div className="text-sm font-semibold text-sc-red">
                      {milestone.year}
                    </div>
                    <h3 className="mt-2 text-lg font-semibold text-gray-900">
                      {milestone.title}
                    </h3>
                    <p className="mt-2 text-gray-600">
                      {milestone.description}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Class Schedule */}
      <section className="py-24 bg-gray-900 text-white">
        <div className="container">
          <div className="text-center">
            <h2 className="text-3xl font-bold tracking-tight">
              Class Schedule
            </h2>
            <p className="mt-4 text-lg leading-8 text-gray-300 max-w-2xl mx-auto">
              We offer flexible schedules to accommodate various needs for each
              level.
            </p>
          </div>

          <div className="mt-16 grid gap-8 sm:grid-cols-2">
            {schedules.map((schedule) => (
              <div
                key={schedule.title}
                className="relative overflow-hidden rounded-md bg-white/10 backdrop-blur-sm p-8"
              >
                <div className="flex items-center gap-4">
                  <div className="flex h-12 w-12 items-center justify-center rounded-full bg-sc-red/20">
                    <Clock className="h-6 w-6 text-sc-red" />
                  </div>
                  <h3 className="text-lg font-semibold">{schedule.title}</h3>
                </div>
                <ul className="mt-6 space-y-4">
                  {schedule.times.map((time) => (
                    <li
                      key={time}
                      className="flex items-center gap-3 text-gray-300"
                    >
                      <div className="h-1.5 w-1.5 rounded-full bg-sc-red" />
                      {time}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Services */}
      <section className="py-24">
        <div className="container">
          <div className="text-center">
            <h2 className="text-3xl font-bold tracking-tight text-gray-900">
              Our Services
            </h2>
            <p className="mt-4 text-lg leading-8 text-gray-600 max-w-2xl mx-auto">
              We offer comprehensive German language courses at all levels,
              supported by additional services to ensure your success.
            </p>
          </div>

          <div className="mt-16 grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
            <div className="relative overflow-hidden rounded-md bg-white p-8 shadow-sm ring-1 ring-gray-200/50">
              <div className="flex h-12 w-12 items-center justify-center rounded-md bg-sc-red/10">
                <BookOpen className="h-6 w-6 text-sc-red" />
              </div>
              <h3 className="mt-4 text-lg font-semibold text-gray-900">
                Free Books Promotion
              </h3>
              <p className="mt-2 text-gray-600">
                All enrolled students receive free access to course books.
              </p>
            </div>

            <div className="relative overflow-hidden rounded-md bg-white p-8 shadow-sm ring-1 ring-gray-200/50">
              <div className="flex h-12 w-12 items-center justify-center rounded-md bg-sc-yellow/10">
                <Target className="h-6 w-6 text-sc-yellow" />
              </div>
              <h3 className="mt-4 text-lg font-semibold text-gray-900">
                Free Exam Preparation
              </h3>
              <p className="mt-2 text-gray-600">
                We prepare our students for success with free exam preparation.
              </p>
            </div>

            <div className="relative overflow-hidden rounded-md bg-white p-8 shadow-sm ring-1 ring-gray-200/50">
              <div className="flex h-12 w-12 items-center justify-center rounded-md bg-sc-red/10">
                <GraduationCap className="h-6 w-6 text-sc-red" />
              </div>
              <h3 className="mt-4 text-lg font-semibold text-gray-900">
                Qualified Teachers
              </h3>
              <p className="mt-2 text-gray-600">
                Our team consists of certified and experienced instructors
                dedicated to your learning success.
              </p>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
