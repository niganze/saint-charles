"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Menu, X } from "lucide-react";
import Link from "next/link";
import { Logo } from "../ui/logo";
import { motion, AnimatePresence } from "framer-motion";

const navigation = [
  { name: "Home", href: "/" },
  { name: "About", href: "/about" },
  {
    name: "Courses",
    href: "/courses",
    children: [
      { name: "A1 - Beginner", href: "/courses#a1" },
      { name: "A2 - Elementary", href: "/courses#a2" },
      { name: "B1 - Intermediate", href: "/courses#b1" },
      { name: "B2 - Upper Intermediate", href: "/courses#b2" },
      { name: "C1 - Advanced", href: "/courses#c1" },
      { name: "C2 - Mastery", href: "/courses#c2" },
    ],
  },
  { name: "Blog", href: "/blog" },
];

export function Header() {
  const [isSidebarOpen, setSidebarOpen] = useState(false);
  const [isScrolled, setScrolled] = useState(false);
  const [hoveredItem, setHoveredItem] = useState<string | null>(null);

  const handleScroll = () => {
    setScrolled(window.scrollY > 0);
  };

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <>
      <header
        className={`fixed bg-white py-2 inset-x-0 top-0 z-50 transition-all duration-300 ${
          isScrolled ? " shadow-sm" : ""
        }`}
      >
        <nav className="container flex items-center justify-between">
          <div className="bg-red-500">
            <div className="bg-white">
              <Logo />
            </div>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex md:items-center md:gap-8">
            {navigation.map((item) => (
              <div
                key={item.name}
                className="relative"
                onMouseEnter={() => setHoveredItem(item.name)}
                onMouseLeave={() => setHoveredItem(null)}
              >
                <Link
                  href={item.href}
                  className="text-sm font-medium text-gray-700 hover:text-sc-red transition-colors relative group"
                >
                  {item.name}
                  <span className="absolute -bottom-1 left-0 h-0.5 w-0 bg-sc-red group-hover:w-full transition-all duration-300" />
                </Link>

                {/* Dropdown for Courses */}
                {item.children && hoveredItem === item.name && (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 10 }}
                    className="absolute left-0 mt-2 w-60 rounded-xl bg-white shadow-lg ring-1 ring-black/5 p-2 backdrop-blur-sm"
                  >
                    {item.children.map((child) => (
                      <Link
                        key={child.name}
                        href={child.href}
                        className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 hover:text-sc-red rounded-lg transition-colors"
                      >
                        {child.name}
                      </Link>
                    ))}
                  </motion.div>
                )}
              </div>
            ))}
            <Button
              asChild
              variant="outline"
              size="lg"
              className="border-sc-red/20 text-sc-red hover:bg-sc-red/5 hover:border-sc-red/30"
            >
              <Link href="/contact">Contact Us</Link>
            </Button>
            <Button
              asChild
              size="lg"
              className="bg-sc-red hover:bg-sc-red/90 group relative overflow-hidden"
            >
              <Link href="/register" className="flex items-center gap-2">
                Register
              </Link>
            </Button>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setSidebarOpen(true)}
            className="md:hidden rounded-lg p-2 text-gray-700 hover:bg-gray-100 transition-colors"
          >
            <Menu className="h-6 w-6" />
          </button>
        </nav>
      </header>

      {/* Mobile Sidebar */}
      <AnimatePresence>
        {isSidebarOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.5 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black z-40"
              onClick={() => setSidebarOpen(false)}
            />
            <motion.div
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "spring", damping: 20 }}
              className="fixed inset-y-0 right-0 z-50 w-full max-w-sm bg-white shadow-xl px-6 py-6"
            >
              <div className="flex items-center justify-between mb-8">
                <Logo />
                <button
                  onClick={() => setSidebarOpen(false)}
                  className="rounded-lg p-2 text-gray-700 hover:bg-gray-100 transition-colors"
                >
                  <X className="h-6 w-6" />
                </button>
              </div>

              <div className="flex flex-col gap-6">
                {navigation.map((item) => (
                  <div key={item.name}>
                    <Link
                      href={item.href}
                      className="text-lg font-medium text-gray-900 hover:text-sc-red transition-colors"
                      onClick={() => setSidebarOpen(false)}
                    >
                      {item.name}
                    </Link>
                    {item.children && (
                      <div className="mt-2 ml-4 flex flex-col gap-2">
                        {item.children.map((child) => (
                          <Link
                            key={child.name}
                            href={child.href}
                            className="text-sm text-gray-600 hover:text-sc-red transition-colors"
                            onClick={() => setSidebarOpen(false)}
                          >
                            {child.name}
                          </Link>
                        ))}
                      </div>
                    )}
                  </div>
                ))}
                <div className="flex flex-col gap-4 mt-4">
                  <Button
                    asChild
                    variant="outline"
                    className="border-sc-red/20 text-sc-red hover:bg-sc-red/5 hover:border-sc-red/30"
                    onClick={() => setSidebarOpen(false)}
                  >
                    <Link href="/contact">Contact Us</Link>
                  </Button>
                  <Button
                    asChild
                    className="bg-sc-red hover:bg-sc-red/90"
                    onClick={() => setSidebarOpen(false)}
                  >
                    <Link href="/register">Register Now</Link>
                  </Button>
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
