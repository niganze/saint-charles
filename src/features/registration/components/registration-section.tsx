"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import {
  RegistrationFormData,
  registrationSchema,
  COURSE_OPTIONS,
  SCHEDULE_OPTIONS,
} from "@/features/registration/types";
import { useMutation } from "@tanstack/react-query";
import { toast } from "react-hot-toast";
import { Mail, Phone, BookOpen, CheckCircle2, Loader } from "lucide-react";

export function RegistrationSection() {
  const [isSubmitted, setIsSubmitted] = useState(false);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<RegistrationFormData>({
    resolver: zodResolver(registrationSchema),
  });

  const mutation = useMutation({
    mutationFn: (data: RegistrationFormData) =>
      fetch("/api/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      }),
  });

  const onSubmit = async (data: RegistrationFormData) => {
    try {
      mutation.mutate(data, {
        onSuccess: () => {
          setIsSubmitted(true);
          reset();
        },
        onError: (error) => {
          console.error("Registration error:", error);
          toast.error("Failed to submit registration. Please try again.");
        },
      });
    } catch (error) {
      console.error("Registration error:", error);
      toast.error("Failed to submit registration. Please try again.");
    }
  };

  return (
    <>
      {/* Registration Section */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 z-0">
          <div className="absolute right-1/4 top-1/4 h-96 w-96 rounded-full bg-sc-red/5 blur-3xl" />
          <div className="absolute left-1/4 bottom-1/4 h-96 w-96 rounded-full bg-sc-yellow/5 blur-3xl" />
        </div>

        <div className="container relative z-10 pb-24">
          <div className="grid gap-12 lg:grid-cols-2">
            {/* Course Information */}
            <div>
              <h2 className="text-3xl font-bold tracking-tight text-gray-900">
                Course Registration
              </h2>
              <p className="mt-4 text-lg text-gray-600">
                Ready to start your German language journey? Fill out the form
                to register for our courses. We'll get back to you with
                confirmation and next steps.
              </p>

              <div className="mt-8 space-y-6">
                <div className="flex items-center gap-4">
                  <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-sc-red/10">
                    <BookOpen className="h-6 w-6 text-sc-red" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900">
                      Course Levels
                    </h3>
                    <p className="text-gray-600">
                      From A1 to C2 - All proficiency levels
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-4">
                  <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-sc-yellow/10">
                    <Phone className="h-6 w-6 text-sc-yellow" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900">Contact</h3>
                    <p className="text-gray-600">+250 788 123 456</p>
                  </div>
                </div>

                <div className="flex items-center gap-4">
                  <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-sc-red/10">
                    <Mail className="h-6 w-6 text-sc-red" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900">Email</h3>
                    <p className="text-gray-600">info@saintcharles.rw</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Registration Form */}
            <div className="bg-white rounded-lg p-6 md:p-12 shadow">
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
                    <h2 className="text-2xl font-bold mb-4">
                      Registration Successful!
                    </h2>
                    <p className="text-gray-600 mb-8">
                      Thank you for registering with Saint Charles K. LTD. We
                      will review your application and get back to you soon.
                    </p>
                    <Button
                      variant="outline"
                      onClick={() => setIsSubmitted(false)}
                    >
                      Register Another Student
                    </Button>
                  </motion.div>
                ) : (
                  <motion.form
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    onSubmit={handleSubmit(onSubmit)}
                    className="space-y-6 bg-white rounded-lg"
                  >
                    <h3 className="text-2xl font-bold text-gray-900">
                      Registration Form
                    </h3>
                    <p className="text-gray-600">
                      Please fill in your personal information to register for
                      our courses.
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
                      <label className="block text-base mb-2">
                        Preferred Course Level
                      </label>
                      <select
                        {...register("preferredCourse")}
                        className="w-full rounded-lg border border-gray-200 bg-white px-4 py-3 text-base"
                      >
                        <option value="">Select a course level</option>
                        {COURSE_OPTIONS.map((level) => (
                          <option key={level} value={level}>
                            {level}
                          </option>
                        ))}
                      </select>
                      {errors.preferredCourse && (
                        <p className="mt-1 text-sm text-red-500">
                          {errors.preferredCourse.message}
                        </p>
                      )}
                    </div>
                    <div>
                      <label className="block text-base mb-2">
                        Preferred Schedule
                      </label>
                      <select
                        {...register("preferredSchedule")}
                        className="w-full rounded-lg border border-gray-200 bg-white px-4 py-3 text-base"
                      >
                        <option value="">Select a schedule</option>
                        {SCHEDULE_OPTIONS.map((schedule) => (
                          <option key={schedule} value={schedule}>
                            {schedule}
                          </option>
                        ))}
                      </select>
                      {errors.preferredSchedule && (
                        <p className="mt-1 text-sm text-red-500">
                          {errors.preferredSchedule.message}
                        </p>
                      )}
                    </div>
                    <div>
                      <Textarea
                        label="Additional Information (Optional)"
                        {...register("additionalInfo")}
                        error={errors.additionalInfo?.message}
                      />
                    </div>
                    <Button
                      type="submit"
                      className="w-full"
                      isLoading={mutation.isPending}
                    >
                      {mutation.isPending ? (
                        <Loader className="w-4 h-4 mr-2 animate-spin" />
                      ) : (
                        "Submit Registration"
                      )}
                    </Button>
                  </motion.form>
                )}
              </AnimatePresence>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

export default RegistrationSection;
