"use client";

import { motion } from "framer-motion";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const faqs = [
  {
    question: "What levels of German courses do you offer?",
    answer:
      "We offer all levels of German language courses from A1 (Beginner) to C2 (Mastery). Each level is structured according to the Common European Framework of Reference for Languages (CEFR).",
  },
  {
    question: "How long does it take to complete each level?",
    answer:
      "Each level typically takes 2-3 months to complete with regular attendance. However, the duration can vary based on your learning pace and the intensity of the course you choose.",
  },
  {
    question: "Do you provide course materials?",
    answer:
      "Yes, we provide all necessary course materials including textbooks, workbooks, and online resources as part of your course fee.",
  },
  {
    question: "Are your teachers native German speakers?",
    answer:
      "Our teaching staff includes both native German speakers and highly qualified non-native teachers with extensive experience in German language instruction.",
  },
  {
    question: "Do you offer exam preparation courses?",
    answer:
      "Yes, we offer specialized preparation courses for all official German language examinations including Goethe-Institut certificates and TestDaF.",
  },
  {
    question: "What is your class size policy?",
    answer:
      "We maintain small class sizes with a maximum of 15 students per class to ensure personalized attention and optimal learning conditions.",
  },
];

export function FaqSection() {
  return (
    <section className="relative overflow-hidden bg-white py-24">
      {/* Background Pattern */}
      <div className="absolute inset-0 z-0">
        <div className="absolute -left-4 top-0 h-72 w-72 rounded-full bg-sc-red/5 blur-3xl" />
        <div className="absolute -right-4 bottom-0 h-72 w-72 rounded-full bg-sc-yellow/5 blur-3xl" />
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
            <span className="text-sc-red font-medium">FAQ</span>
            <div className="h-1 w-12 bg-sc-red rounded-full" />
          </div>

          <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
            Frequently Asked Questions
          </h2>
          <p className="mt-4 text-lg leading-8 text-gray-600 max-w-2xl mx-auto">
            Find answers to common questions about our German language courses,
            teaching methods, and policies.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="mx-auto mt-16 max-w-3xl"
        >
          <Accordion type="single" collapsible className="space-y-4">
            {faqs.map((faq, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <AccordionItem
                  value={`item-${index}`}
                  className="rounded-xl border border-gray-200 px-6 shadow-sm"
                >
                  <AccordionTrigger className="text-left font-semibold">
                    {faq.question}
                  </AccordionTrigger>
                  <AccordionContent className=" text-md text-gray-600">
                    <div className="text-base">{faq.answer}</div>
                  </AccordionContent>
                </AccordionItem>
              </motion.div>
            ))}
          </Accordion>
        </motion.div>
      </div>
    </section>
  );
}
