"use client";

import { motion, AnimatePresence } from "framer-motion";
import { Quote, Star, ChevronLeft, ChevronRight } from "lucide-react";
import Image from "next/image";
import { useEffect, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { Testimony } from "@prisma/client";

async function getTestimonials(): Promise<Testimony[]> {
  const response = await fetch("/api/content");
  const data = await response.json();
  return data.testimonials;
}

const HighlightedText = ({ text }: { text: string }) => {
  return (
    <span className="relative inline-block">
      <span className="relative z-10">{text}</span>
      <motion.span
        className="absolute inset-0 bg-sc-yellow/20"
        initial={{ width: 0 }}
        animate={{ width: "100%" }}
        transition={{ duration: 0.5, delay: 0.2 }}
      />
    </span>
  );
};

export function TestimonialsSection() {
  const { data: testimonials = [] } = useQuery({
    queryKey: ["testimonials"],
    queryFn: getTestimonials,
  });

  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);

  const nextSlide = () => {
    setCurrentIndex((prev) => (prev + 1) % testimonials.length);
  };

  const previousSlide = () => {
    setCurrentIndex(
      (prev) => (prev - 1 + testimonials.length) % testimonials.length
    );
  };

  useEffect(() => {
    if (testimonials.length === 0 || !isAutoPlaying) return;

    const timer = setInterval(() => {
      nextSlide();
    }, 8000); // Increased to 8 seconds

    return () => clearInterval(timer);
  }, [testimonials.length, isAutoPlaying]);

  if (testimonials.length === 0) {
    return null;
  }

  return (
    <section className="py-24 bg-sc-black text-gray-300 relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute -right-64 top-0 w-[500px] h-[500px] bg-sc-red/5 rounded-full blur-[128px]" />
        <div className="absolute -left-64 bottom-0 w-[500px] h-[500px] bg-sc-yellow/5 rounded-full blur-[128px]" />
        <div className="absolute right-1/3 top-1/3 grid grid-cols-3 gap-1 opacity-20 rotate-12">
          {[...Array(9)].map((_, i) => (
            <div key={i} className="w-2 h-2 rounded-full bg-sc-red" />
          ))}
        </div>
        <div className="absolute left-1/4 bottom-1/4 grid grid-cols-3 gap-1 opacity-20 -rotate-12">
          {[...Array(9)].map((_, i) => (
            <div key={i} className="w-2 h-2 rounded-full bg-sc-yellow" />
          ))}
        </div>
      </div>

      <div className="container relative">
        <div className="text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="flex items-center justify-center gap-2 mb-6"
          >
            <div className="h-1 w-12 bg-sc-red rounded-full" />
            <span className="text-sc-red font-medium">Testimonials</span>
            <div className="h-1 w-12 bg-sc-red rounded-full" />
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="text-3xl font-bold tracking-tight text-white sm:text-4xl"
          >
            What Our Students Say
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="mt-4 text-lg leading-8 text-gray-300 max-w-2xl mx-auto"
          >
            Hear from our successful students who achieved their German language
            goals with us.
          </motion.p>
        </div>

        <div className="mt-16 relative">
          <div className="relative max-w-4xl mx-auto">
            {/* Navigation Buttons - Desktop */}
            <div className="hidden md:block">
              <button
                onClick={() => {
                  setIsAutoPlaying(false);
                  previousSlide();
                }}
                className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-12 z-10 p-2 rounded-full bg-white/10 hover:bg-white/20 transition-colors"
                aria-label="Previous testimony"
              >
                <ChevronLeft className="h-6 w-6 text-white" />
              </button>
              <button
                onClick={() => {
                  setIsAutoPlaying(false);
                  nextSlide();
                }}
                className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-12 z-10 p-2 rounded-full bg-white/10 hover:bg-white/20 transition-colors"
                aria-label="Next testimony"
              >
                <ChevronRight className="h-6 w-6 text-white" />
              </button>
            </div>

            <AnimatePresence mode="wait">
              <motion.div
                key={currentIndex}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.5 }}
                className="relative"
              >
                <div className="absolute -top-12 left-1/2 -translate-x-1/2">
                  <div className="flex -space-x-2">
                    {[...Array(5)].map((_, i) => (
                      <motion.div
                        key={i}
                        initial={{ opacity: 0, scale: 0 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{
                          duration: 0.5,
                          delay: 0.1 * i,
                        }}
                        className="flex h-8 w-8 items-center justify-center rounded-full bg-sc-yellow/20"
                      >
                        <Star className="h-4 w-4 text-sc-yellow" />
                      </motion.div>
                    ))}
                  </div>
                </div>

                <div className="relative rounded-2xl bg-white/5 backdrop-blur-sm p-8 md:p-12 ring-1 ring-white/10">
                  <Quote className="absolute -top-4 -left-4 h-8 w-8 text-sc-yellow/20" />
                  <Quote className="absolute -bottom-4 -right-4 h-8 w-8 text-sc-yellow/20 rotate-180" />
                  <blockquote className="text-lg font-medium leading-8 text-gray-300 sm:text-md sm:leading-9 text-center">
                    {testimonials[currentIndex].content}
                  </blockquote>
                  <div className="mt-8 flex flex-col items-center gap-4">
                    {testimonials[currentIndex].image && (
                      <div className="relative h-16 w-16 rounded-full overflow-hidden ring-4 ring-sc-yellow/20">
                        <Image
                          src={testimonials[currentIndex].image}
                          alt={testimonials[currentIndex].name}
                          fill
                          className="object-cover"
                        />
                      </div>
                    )}
                    <div className="text-center">
                      <div className="font-semibold text-white text-lg">
                        {testimonials[currentIndex].name}
                      </div>
                      <div className="text-sm text-gray-400">
                        {testimonials[currentIndex].title}
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Navigation Buttons - Mobile */}
          <div className="md:hidden flex justify-center gap-4 mt-8">
            <button
              onClick={() => {
                setIsAutoPlaying(false);
                previousSlide();
              }}
              className="p-2 rounded-full bg-white/10 hover:bg-white/20 transition-colors"
              aria-label="Previous testimony"
            >
              <ChevronLeft className="h-6 w-6 text-white" />
            </button>
            <button
              onClick={() => {
                setIsAutoPlaying(false);
                nextSlide();
              }}
              className="p-2 rounded-full bg-white/10 hover:bg-white/20 transition-colors"
              aria-label="Next testimony"
            >
              <ChevronRight className="h-6 w-6 text-white" />
            </button>
          </div>

          {/* Dots Navigation */}
          <div className="mt-8 flex justify-center gap-2">
            {testimonials.map((_, index) => (
              <button
                key={index}
                onClick={() => {
                  setIsAutoPlaying(false);
                  setCurrentIndex(index);
                }}
                className={`h-1.5 rounded-full transition-all duration-500 ${
                  index === currentIndex
                    ? "w-8 bg-sc-red"
                    : "w-2 bg-gray-700 hover:bg-gray-600"
                }`}
                aria-label={`Go to testimony ${index + 1}`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
