"use client";

import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { MapPin, Phone, Mail, Clock } from "lucide-react";

export function ContactSection() {
  return (
    <section className="relative overflow-hidden bg-white py-24">
      <div className="container relative z-10">
        <div className="grid gap-12 lg:grid-cols-2">
          {/* Contact Information */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <h2 className="text-3xl font-bold tracking-tight text-gray-900">
              Contact Information
            </h2>
            <p className="mt-4 text-lg text-gray-600">
              Get in touch with us through any of these channels. We're here to
              help you on your journey to mastering German.
            </p>

            <div className="mt-12 space-y-8">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.1 }}
                className="flex gap-4"
              >
                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-sc-red/10 flex-shrink-0">
                  <MapPin className="h-6 w-6 text-sc-red" />
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900">Our Location</h3>
                  <p className="mt-2 text-gray-600">
                    KN 32 Ave, Kigali, Rwanda
                  </p>
                </div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.2 }}
                className="flex gap-4"
              >
                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-sc-yellow/10 flex-shrink-0">
                  <Phone className="h-6 w-6 text-sc-yellow" />
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900">Phone Number</h3>
                  <p className="mt-2 text-gray-600">+250 788 123 456</p>
                </div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.3 }}
                className="flex gap-4"
              >
                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-sc-red/10 flex-shrink-0">
                  <Mail className="h-6 w-6 text-sc-red" />
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900">Email Address</h3>
                  <p className="mt-2 text-gray-600">info@saintcharles.rw</p>
                </div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.4 }}
                className="flex gap-4"
              >
                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-sc-yellow/10 flex-shrink-0">
                  <Clock className="h-6 w-6 text-sc-yellow" />
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900">Working Hours</h3>
                  <p className="mt-2 text-gray-600">
                    Monday - Friday: 8:00 AM - 8:30 PM
                    <br />
                    Saturday - Sunday: 8:30 AM - 3:30 PM
                  </p>
                </div>
              </motion.div>
            </div>
          </motion.div>

          {/* Contact Form */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="relative overflow-hidden rounded-2xl bg-white p-8 shadow-sm ring-1 ring-gray-200/50"
          >
            <h2 className="text-2xl font-bold tracking-tight text-gray-900">
              Send us a Message
            </h2>
            <p className="mt-4 text-gray-600">
              Fill out the form below and we'll get back to you as soon as
              possible.
            </p>

            <form className="mt-8 space-y-6">
              <div className="grid gap-6 sm:grid-cols-2">
                <div>
                  <label
                    htmlFor="first-name"
                    className="block text-sm font-medium text-gray-700"
                  >
                    First Name
                  </label>
                  <Input
                    type="text"
                    id="first-name"
                    name="first-name"
                    className="mt-2"
                    required
                  />
                </div>
                <div>
                  <label
                    htmlFor="last-name"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Last Name
                  </label>
                  <Input
                    type="text"
                    id="last-name"
                    name="last-name"
                    className="mt-2"
                    required
                  />
                </div>
              </div>

              <div>
                <label
                  htmlFor="email"
                  className="block text-sm font-medium text-gray-700"
                >
                  Email Address
                </label>
                <Input
                  type="email"
                  id="email"
                  name="email"
                  className="mt-2"
                  required
                />
              </div>

              <div>
                <label
                  htmlFor="phone"
                  className="block text-sm font-medium text-gray-700"
                >
                  Phone Number
                </label>
                <Input
                  type="tel"
                  id="phone"
                  name="phone"
                  className="mt-2"
                  required
                />
              </div>

              <div>
                <label
                  htmlFor="message"
                  className="block text-sm font-medium text-gray-700"
                >
                  Your Message
                </label>
                <Textarea
                  id="message"
                  name="message"
                  className="mt-2"
                  required
                />
              </div>

              <Button
                type="submit"
                className="w-full bg-sc-red hover:bg-sc-red/90"
              >
                Send Message
              </Button>
            </form>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
