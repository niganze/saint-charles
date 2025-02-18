"use client";

import { Logo } from "@/components/ui/logo";
import { useRouter } from "next/navigation";
import { useState } from "react";
import toast from "react-hot-toast";
import { Mail, Lock } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import InputLabel from "@/components/ui/input-label";
import { signInUser } from "@/features/auth/auth.api";

export default function SignIn() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);
    const formData = new FormData(e.currentTarget);

    try {
      const res = await signInUser({
        email: formData.get("email") as string,
        password: formData.get("password") as string,
      });

      if (res?.error) {
        throw new Error(res.error);
      }

      router.push("/admin");
      toast.success("Welcome back!");
    } catch (error) {
      toast.error("Invalid credentials");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-white via-gray-50 to-gray-100 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <div className="w-32 h-12 mx-auto relative">
          <Logo />
        </div>
        <h2 className="mt-6 text-center text-2xl font-bold text-sc-black">
          Welcome back
        </h2>
        <p className="mt-2 text-center text-sm text-gray-600">
          Sign in to your account to continue
        </p>
      </div>

      <div className="mt-8 mx-auto w-full max-w-[400px]">
        <div className="bg-white py-20 px-12 shadow-xl shadow-gray-100/10 rounded-xl border border-gray-100">
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <InputLabel htmlFor="email">Email address</InputLabel>
              <div className="mt-1">
                <Input
                  id="email"
                  name="email"
                  type="email"
                  // autoComplete="email"
                  required
                  icon={<Mail className="h-5 w-5" />}
                  placeholder="Enter your email"
                />
              </div>
            </div>

            <div>
              <InputLabel htmlFor="password">Password</InputLabel>
              <div className="mt-1">
                <Input
                  id="password"
                  name="password"
                  type="password"
                  // autoComplete="current-password"
                  required
                  icon={<Lock className="h-5 w-5" />}
                  placeholder="Enter your password"
                />
              </div>
            </div>

            <Button type="submit" isLoading={isLoading} className="w-full">
              Sign in
            </Button>
          </form>
        </div>
      </div>
    </div>
  );
}
