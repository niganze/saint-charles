"use client";

import { ArrowRight, Calendar, Mail, MapPin, Phone } from "lucide-react";
import Link from "next/link";
import { Logo } from "../ui/logo";
import { motion } from "framer-motion";
import { Button } from "../ui/button";

const navigation = {
  main: [
    { name: "Home", href: "/" },
    { name: "About", href: "/about" },
    { name: "Courses", href: "/courses" },
    { name: "Blog", href: "/blog" },
    { name: "Contact", href: "/contact" },
  ],
  courses: [
    { name: "A1 - Beginner", href: "/courses#a1" },
    { name: "A2 - Elementary", href: "/courses#a2" },
    { name: "B1 - Intermediate", href: "/courses#b1" },
    { name: "B2 - Upper Intermediate", href: "/courses#b2" },
    { name: "C1 - Advanced", href: "/courses#c1" },
    { name: "C2 - Mastery", href: "/courses#c2" },
  ],
};

export function Footer() {
  return (
    <footer className="bg-sc-black text-gray-400 relative overflow-visible  mt-24">
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

      <div className="container relative py-20 overflow-visible">
        {/* CTA Section */}
        <div className="absolute z-20 -top-24 left-0 bg-white w-full rounded-lg shadow-2xl border border-gray-100">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="p-10 md:py-16 md:px-20"
          >
            <div className="flex justify-between gap-8 md:gap-4 flex-col md:flex-row md:items-center">
              <div>
                <h2 className="font-semibold text-xl text-sc-black">
                  Ready to start your journey?
                </h2>
                <p>Join a class now and start mastering German!</p>
              </div>

              <div className="">
                <Button
                  asChild
                  size="lg"
                  className="bg-sc-red hover:bg-sc-red/90 group relative overflow-hidden"
                >
                  <Link href="/register" className="flex items-center gap-2">
                    Register
                    <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
                  </Link>
                </Button>
              </div>
            </div>
          </motion.div>
        </div>

        <div className="grid gap-16 lg:grid-cols-[2fr_1fr_1fr]  pt-24">
          {/* Company Info */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="space-y-8"
          >
            <div className="w-[200px]">
              <Logo variant="footer" />
            </div>
            <p className="leading-relaxed">
              Join us on your journey to mastering the German language.
            </p>
            <div className="grid sm:grid-cols-2 gap-4">
              <motion.div
                whileHover={{ scale: 1.02 }}
                transition={{ type: "spring", stiffness: 300 }}
                className="relative overflow-hidden rounded-xl bg-white/5 backdrop-blur-sm p-4 ring-1 ring-white/10 hover:ring-sc-red/20 transition-all duration-300"
              >
                <div className="flex items-center gap-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-sc-red/10">
                    <Phone className="h-5 w-5 text-sc-red" />
                  </div>
                  <div>
                    <h3 className="font-medium text-white">Call Us</h3>
                    <Link
                      href="tel:+250793763948"
                      className="text-sm text-sc-red hover:text-sc-red/80 transition-colors"
                    >
                      +250 793 763 948
                    </Link>
                  </div>
                </div>
              </motion.div>

              <motion.div
                whileHover={{ scale: 1.02 }}
                transition={{ type: "spring", stiffness: 300 }}
                className="relative overflow-hidden rounded-xl bg-white/5 backdrop-blur-sm p-4 ring-1 ring-white/10 hover:ring-sc-yellow/20 transition-all duration-300"
              >
                <div className="flex items-center gap-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-sc-yellow/10">
                    <Mail className="h-5 w-5 text-sc-yellow" />
                  </div>
                  <div>
                    <h3 className=" font-medium text-white">Email Us</h3>
                    <Link
                      href="mailto:info@saintcharles.com"
                      className="text-sm text-sc-yellow hover:text-sc-yellow/80 transition-colors"
                    >
                      info@saintcharles.com
                    </Link>
                  </div>
                </div>
              </motion.div>

              <motion.div
                whileHover={{ scale: 1.02 }}
                transition={{ type: "spring", stiffness: 300 }}
                className="relative overflow-hidden rounded-xl bg-white/5 backdrop-blur-sm p-4 ring-1 ring-white/10 hover:ring-sc-red/20 transition-all duration-300 sm:col-span-2"
              >
                <div className="flex items-center gap-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-sc-red/10">
                    <MapPin className="h-5 w-5 text-sc-red" />
                  </div>
                  <div>
                    <h3 className=" font-medium text-white">Visit Us</h3>
                    <p className="text-sm">
                      Centre Saint Paul, Nyarugenge, Kigali Rwanda (KN
                      32st.Kigali)
                    </p>
                  </div>
                </div>
              </motion.div>
            </div>
          </motion.div>

          {/* Quick Links */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            <h3 className="text-white font-semibold mb-8">Quick Links</h3>
            <ul className="space-y-4">
              {navigation.main.map((item, index) => (
                <motion.li
                  key={item.name}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: 0.1 * index }}
                >
                  <Link
                    href={item.href}
                    className="hover:text-white transition-all duration-300 flex items-center gap-3 group"
                  >
                    <span className="h-1.5 w-1.5 rounded-full bg-sc-red/40 group-hover:bg-sc-red transition-colors" />
                    {item.name}
                  </Link>
                </motion.li>
              ))}

              <motion.li
                key="register"
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{
                  duration: 0.5,
                  delay: 0.1 * navigation.main.length,
                }}
              >
                <Button
                  asChild
                  size="lg"
                  variant="ghost"
                  className="bg-white/5 backdrop-blur-sm ring-1 w-full hover:bg-white/10 hover:text-white/80 ring-white/10 hover:ring-sc-red/20 group relative overflow-hidden"
                >
                  <Link href="/register" className="flex items-center gap-2">
                    Register
                    <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
                  </Link>
                </Button>
              </motion.li>
            </ul>
          </motion.div>

          {/* Courses */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <h3 className="text-white font-semibold mb-8">Our Courses</h3>
            <ul className="space-y-4">
              {navigation.courses.map((item, index) => (
                <motion.li
                  key={item.name}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: 0.1 * index }}
                >
                  <Link
                    href={item.href}
                    className="hover:text-white transition-all duration-300 flex items-center gap-3 group"
                  >
                    <span className="h-1.5 w-1.5 rounded-full bg-sc-yellow/40 group-hover:bg-sc-yellow transition-colors" />
                    {item.name}
                  </Link>
                </motion.li>
              ))}
            </ul>
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="mt-16 pt-8 border-t border-gray-800/50"
        >
          <div className="flex justify-center items-center gap-4">
            <p className="text-sm text-center">
              © {new Date().getFullYear()} Saint Charles K. LTD. All rights
              reserved.
            </p>
          </div>
        </motion.div>
      </div>
    </footer>
  );
}
