"use client";

import { motion } from "framer-motion";
import { Calendar, Clock, Sun } from "lucide-react";
import Image from "next/image";

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
    times: [{ time: "08:30–15:30", label: "Saturday & Sunday Full Day" }],
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
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="relative"
          >
            <div className="relative aspect-[4/3] rounded-2xl overflow-hidden">
              <Image
                src="/teacher-in-class.jpeg"
                alt="Teacher in class"
                fill
                className="object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />
            </div>
            {/* Floating Icons */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="absolute -bottom-6 -right-6 bg-white p-4 rounded-2xl shadow-lg"
            >
              <Clock className="h-8 w-8 text-sc-red" />
            </motion.div>
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="absolute -top-6 -left-6 bg-white p-4 rounded-2xl shadow-lg"
            >
              <Calendar className="h-8 w-8 text-sc-yellow" />
            </motion.div>
          </motion.div>

          <div>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="text-left"
            >
              <div className="flex items-center gap-2 mb-6">
                <div className="h-1 w-12 bg-sc-red rounded-full" />
                <span className="text-sc-red font-medium">Class Schedule</span>
              </div>

              <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
                Flexible Learning Hours
              </h2>
              {/* <p className="mt-4 text-lg leading-8 text-gray-600">
                Choose from our variety of class schedules designed to
                accommodate your busy lifestyle.
              </p> */}
            </motion.div>

            <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 gap-4">
              {schedules.map((schedule, scheduleIndex) => (
                <motion.div
                  key={schedule.title}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: scheduleIndex * 0.1 }}
                  className={`relative overflow-hidden rounded-2xl bg-white p-4 shadow-sm ring-1 ring-gray-200/50 hover:shadow-md transition-all duration-300 group ${
                    scheduleIndex === 2 ? "sm:col-span-2" : ""
                  }`}
                >
                  <div className="flex items-center gap-3 mb-3">
                    <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-sc-red/10">
                      <schedule.icon className="h-5 w-5 text-sc-red" />
                    </div>
                    <h3 className="text-lg font-semibold text-gray-900">
                      {schedule.title}
                    </h3>
                  </div>

                  <div className="flex flex-col flex-wrap gap-2">
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
                        className="flex items-center gap-2 p-3 rounded-lg transition-colors flex-1"
                      >
                        <div className="h-2 w-2 rounded-full bg-sc-red" />
                        <div className="min-w-0">
                          <p className="font-medium text-base text-gray-900">
                            {time.time}
                          </p>
                          <p className="text-sm text-gray-600">{time.label}</p>
                        </div>
                      </motion.div>
                    ))}
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
