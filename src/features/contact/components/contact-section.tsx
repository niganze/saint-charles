"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { ContactFormData, contactSchema } from "@/features/contact/types";
import { CheckCircle2, Loader, Mail, MapPin, Phone } from "lucide-react";
import { toast } from "react-hot-toast";
import { useMutation } from "@tanstack/react-query";

export function ContactSection() {
  const [isSubmitted, setIsSubmitted] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<ContactFormData>({
    resolver: zodResolver(contactSchema),
  });

  const mutation = useMutation({
    mutationFn: async (data: ContactFormData) => {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });
    },
  });

  const onSubmit = async (data: ContactFormData) => {
    try {
      mutation.mutate(data, {
        onSuccess: () => {
          setIsSubmitted(true);
          reset();
        },
        onError: () => {
          toast.error("Failed to submit contact form. Please try again.");
        },
      });
    } catch (error) {
      console.error("Contact form error:", error);
      toast.error("Failed to submit contact form. Please try again.");
    }
  };

  return (
    <section className="relative overflow-hidden bg-white pb-24">
      {/* Background Pattern */}
      <div className="absolute inset-0 z-0">
        <div className="absolute right-1/4 top-1/4 h-96 w-96 rounded-full bg-sc-red/5 blur-3xl" />
        <div className="absolute left-1/4 bottom-1/4 h-96 w-96 rounded-full bg-sc-yellow/5 blur-3xl" />
      </div>

      <div className="container relative z-10">
        <div className="grid gap-12 lg:grid-cols-2">
          {/* Contact Information */}
          <div>
            <h2 className="text-3xl font-bold tracking-tight text-gray-900">
              Get in Touch
            </h2>
            <p className="mt-4 text-lg text-gray-600">
              Have questions about our German language courses? Want to learn
              more about our programs? We're here to help!
            </p>

            <div className="mt-8 space-y-6">
              <div className="flex items-center gap-4">
                <div className="flex h-12 min-w-12 items-center justify-center rounded-lg bg-sc-red/10">
                  <MapPin className="h-6 w-6 text-sc-red" />
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900">Location</h3>
                  <p className="text-gray-600">
                    Centre Saint Paul, Nyarugenge, Kigali, Rwanda (KN 32 St.)
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-4">
                <div className="flex h-12 min-w-12 items-center justify-center rounded-lg bg-sc-yellow/10">
                  <Phone className="h-6 w-6 text-sc-yellow" />
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900">Phone</h3>
                  <p className="text-gray-600">0793763948 / 0781061385</p>
                </div>
              </div>

              <div className="flex items-center gap-4">
                <div className="flex h-12 min-w-12 items-center justify-center rounded-lg bg-sc-red/10">
                  <Mail className="h-6 w-6 text-sc-red" />
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900">Email</h3>
                  <p className="text-gray-600">info@saintcharlesk.com</p>
                </div>
              </div>
            </div>
          </div>

          {/* Contact Form */}
          <div className="bg-white p-6 sm:p-12 rounded-lg shadow">
            <AnimatePresence mode="wait">
              {isSubmitted ? (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  className="text-center"
                >
                  <div className="flex justify-center mb-6">
                    <motion.div
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      transition={{ delay: 0.2 }}
                    >
                      <CheckCircle2 className="w-16 h-16 text-sc-yellow" />
                    </motion.div>
                  </div>
                  <h2 className="text-2xl font-bold mb-4">Message Sent!</h2>
                  <p className="text-gray-600 mb-8">
                    Thank you for contacting Saint Charles K. LTD. We will get
                    back to you as soon as possible.
                  </p>
                  <Button
                    variant="outline"
                    onClick={() => setIsSubmitted(false)}
                  >
                    Send Another Message
                  </Button>
                </motion.div>
              ) : (
                <motion.form
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  onSubmit={handleSubmit(onSubmit)}
                  className="space-y-6"
                >
                  <h2 className="text-2xl font-bold mb-4">Send Us a Message</h2>
                  <p className="text-gray-600 mb-8">
                    Fill out the form below to send us a message.
                  </p>
                  <div>
                    <Input
                      label="Full Name"
                      {...register("name")}
                      error={errors.name?.message}
                    />
                  </div>
                  <div>
                    <Input
                      label="Email"
                      type="email"
                      {...register("email")}
                      error={errors.email?.message}
                    />
                  </div>
                  <div>
                    <Input
                      label="Phone Number"
                      {...register("phone")}
                      error={errors.phone?.message}
                    />
                  </div>
                  <div>
                    <Textarea
                      label="Message"
                      {...register("message")}
                      error={errors.message?.message}
                    />
                  </div>
                  <Button
                    type="submit"
                    className="w-full"
                    isLoading={mutation.isPending}
                  >
                    {mutation.isPending ? (
                      <Loader className="w-4 animate-spin" />
                    ) : (
                      "Send Message"
                    )}
                  </Button>
                </motion.form>
              )}
            </AnimatePresence>
          </div>
        </div>
      </div>
    </section>
  );
}
