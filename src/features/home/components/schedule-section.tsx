"use client";

import { motion } from "framer-motion";
import { Calendar, Clock, Sun } from "lucide-react";

const schedules = [
  {
    title: "Early Shifts",
    icon: Clock,
    times: [
      { time: "08:00–11:00", label: "Morning Session" },
      { time: "11:10–14:10", label: "Early Afternoon" },
    ],
  },
  {
    title: "Late Shifts",
    icon: Calendar,
    times: [
      { time: "14:20–17:20", label: "Late Afternoon" },
      { time: "17:30–20:30", label: "Evening Session" },
    ],
  },
  {
    title: "Weekend Classes",
    icon: Sun,
    times: [
      { time: "08:30–15:30", label: "Saturday Full Day" },
      { time: "08:30–15:30", label: "Sunday Full Day" },
    ],
  },
];

export function ScheduleSection() {
  return (
    <section className="relative overflow-hidden bg-white py-24">
      {/* Background Pattern */}
      <div className="absolute inset-0 z-0">
        <div className="absolute right-1/4 top-1/4 h-96 w-96 rounded-full bg-sc-red/5 blur-3xl" />
        <div className="absolute left-1/4 bottom-1/4 h-96 w-96 rounded-full bg-sc-yellow/5 blur-3xl" />
      </div>

      <div className="container relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center"
        >
          <div className="flex items-center justify-center gap-2 mb-6">
            <div className="h-1 w-12 bg-sc-red rounded-full" />
            <span className="text-sc-red font-medium">Class Schedule</span>
            <div className="h-1 w-12 bg-sc-red rounded-full" />
          </div>

          <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
            Flexible Learning Hours
          </h2>
          <p className="mt-4 text-lg leading-8 text-gray-600 max-w-2xl mx-auto">
            Choose from our variety of class schedules designed to accommodate
            your busy lifestyle. Whether you prefer morning, afternoon, or
            evening classes, we have options for you.
          </p>
        </motion.div>

        <div className="mt-16 grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {schedules.map((schedule, scheduleIndex) => (
            <motion.div
              key={schedule.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: scheduleIndex * 0.1 }}
              className="relative overflow-hidden rounded-2xl bg-white p-8 shadow-sm ring-1 ring-gray-200/50 hover:shadow-md transition-all duration-300 group"
            >
              <div className="flex items-center gap-4 mb-8">
                <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-sc-red/10">
                  <schedule.icon className="h-6 w-6 text-sc-red" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900">
                  {schedule.title}
                </h3>
              </div>

              <div className="space-y-4">
                {schedule.times.map((time, timeIndex) => (
                  <motion.div
                    key={timeIndex}
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{
                      duration: 0.5,
                      delay: scheduleIndex * 0.1 + timeIndex * 0.1,
                    }}
                    className="flex items-center gap-4 p-4 rounded-lg bg-gray-50 group-hover:bg-gray-100/80 transition-colors"
                  >
                    <div className="h-2 w-2 rounded-full bg-sc-red" />
                    <div>
                      <p className="font-medium text-gray-900">{time.time}</p>
                      <p className="text-sm text-gray-600">{time.label}</p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
