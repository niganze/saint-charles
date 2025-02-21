"use client";

import { Logo } from "@/components/ui/logo";
import { signOut, useSession } from "next-auth/react";
import Link from "next/link";
import { useState } from "react";
import { ChevronDown, LogOut, User, Bell, Menu, X } from "lucide-react";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";

const navigation = [
  { name: "Dashboard", href: "/admin" },
  { name: "Blogs", href: "/admin/blogs" },
  { name: "Testimonies", href: "/admin/testimonies" },
  { name: "Contacts", href: "/admin/contacts" },
  { name: "Registrations", href: "/admin/registrations" },
];

export const AppBar = () => {
  const { data: session } = useSession();
  const [showDropdown, setShowDropdown] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const currentPath = usePathname();

  return (
    <header className="bg-white border-b border-gray-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3">
        <div className="flex justify-between items-center h-16">
          <div className="w-32 h-12 relative">
            <Logo />
          </div>

          <nav className="hidden md:flex items-center gap-6">
            {navigation.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                className={cn(
                  "text-gray-600 hover:text-sc-red transition-colors",
                  currentPath === item.href && "text-sc-red"
                )}
              >
                {item.name}
              </Link>
            ))}
          </nav>

          {session?.user && (
            <div className="flex items-center gap-6">
              <div className="relative hidden md:block">
                <button
                  onClick={() => setShowDropdown(!showDropdown)}
                  className="flex items-center gap-3 text-gray-700 hover:text-sc-red focus:outline-none transition-all duration-200"
                >
                  <div className="w-9 h-9 rounded-full bg-gradient-to-br from-sc-black via-sc-red to-sc-yellow text-white flex items-center justify-center font-medium shadow-lg">
                    {session.user.name?.[0].toUpperCase()}
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="flex flex-col items-start">
                      <span className="text-sm font-medium">
                        {session.user.name}
                      </span>
                      <span className="text-xs text-sc-red font-medium">
                        Administrator
                      </span>
                    </div>
                    <ChevronDown className="w-4 h-4 text-gray-400" />
                  </div>
                </button>

                {showDropdown && (
                  <div className="absolute right-0 mt-2 w-56 bg-white rounded-lg shadow-lg py-1 z-10 border border-gray-100 transform transition-all duration-200">
                    <Link
                      href="/admin/profile"
                      className="flex items-center px-4 py-2.5 text-sm text-gray-700 hover:bg-gradient-to-r hover:from-gray-50 hover:to-white group transition-colors"
                      onClick={() => setShowDropdown(false)}
                    >
                      <User className="w-4 h-4 mr-3 text-gray-400 group-hover:text-sc-red transition-colors" />
                      Profile Settings
                    </Link>
                    <button
                      onClick={() => signOut()}
                      className="flex items-center w-full px-4 py-2.5 text-sm text-gray-700 hover:bg-gradient-to-r hover:from-gray-50 hover:to-white group transition-colors"
                    >
                      <LogOut className="w-4 h-4 mr-3 text-gray-400 group-hover:text-sc-red transition-colors" />
                      Sign out
                    </button>
                  </div>
                )}
              </div>

              {/* Mobile menu button */}
              <button
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                className="md:hidden text-gray-600 hover:text-sc-red transition-colors"
              >
                {isMobileMenuOpen ? (
                  <X className="h-6 w-6" />
                ) : (
                  <Menu className="h-6 w-6" />
                )}
              </button>
            </div>
          )}
        </div>

        {/* Mobile menu */}
        {isMobileMenuOpen && (
          <div className="md:hidden py-4 border-t border-gray-100">
            <nav className="flex flex-col gap-4">
              {navigation.map((item) => (
                <Link
                  key={item.name}
                  href={item.href}
                  className={cn(
                    "text-gray-600 hover:text-sc-red transition-colors",
                    currentPath === item.href && "text-sc-red"
                  )}
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  {item.name}
                </Link>
              ))}
              <div className="pt-4 border-t border-gray-100">
                <Link
                  href="/admin/profile"
                  className="flex items-center py-2 text-gray-600 hover:text-sc-red transition-colors"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  <User className="w-4 h-4 mr-3" />
                  Profile Settings
                </Link>
                <button
                  onClick={() => signOut()}
                  className="flex items-center w-full py-2 text-gray-600 hover:text-sc-red transition-colors"
                >
                  <LogOut className="w-4 h-4 mr-3" />
                  Sign out
                </button>
              </div>
            </nav>
          </div>
        )}
      </div>
    </header>
  );
};
