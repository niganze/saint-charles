"use client";

import { Logo } from "@/components/ui/logo";
import { signIn } from "next-auth/react";
import { useRouter, useSearchParams } from "next/navigation";
import { useState } from "react";
import toast from "react-hot-toast";
import { Mail, Lock, Loader } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import InputLabel from "@/components/ui/input-label";
import { signInSchema } from "@/lib/validations/auth";
import { useForm } from "react-hook-form";
import { SignInInput } from "@/lib/validations/auth";
import { zodResolver } from "@hookform/resolvers/zod";

export default function SignIn() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const callbackUrl = searchParams.get("callbackUrl") || "/admin";
  const [isLoading, setIsLoading] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<SignInInput>({
    resolver: zodResolver(signInSchema),
  });

  const onSubmit = handleSubmit(async (data) => {
    setIsLoading(true);
    try {
      const res = await signIn("credentials", {
        email: data.email,
        password: data.password,
        redirect: false,
      });

      if (res?.error) {
        toast.error("Invalid credentials");
        return;
      }

      toast.success("Signed in successfully");
      router.push(callbackUrl);
      router.refresh();
    } catch (error) {
      toast.error("Something went wrong");
    } finally {
      setIsLoading(false);
    }
  });

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
          <form onSubmit={onSubmit} className="space-y-6">
            <div>
              <InputLabel htmlFor="email">Email address</InputLabel>
              <div className="mt-1">
                <Input
                  id="email"
                  type="email"
                  autoComplete="email"
                  icon={<Mail className="h-5 w-5" />}
                  placeholder="Enter your email"
                  {...register("email")}
                  error={errors.email?.message}
                />
              </div>
            </div>

            <div>
              <InputLabel htmlFor="password">Password</InputLabel>
              <div className="mt-1">
                <Input
                  id="password"
                  type="password"
                  autoComplete="current-password"
                  icon={<Lock className="h-5 w-5" />}
                  placeholder="Enter your password"
                  {...register("password")}
                  error={errors.password?.message}
                />
              </div>
            </div>

            <Button type="submit" disabled={isLoading} className="w-full">
              {isLoading ? (
                <Loader className="h-4 w-4 animate-spin" />
              ) : (
                "Sign in"
              )}
            </Button>
          </form>
        </div>
      </div>
    </div>
  );
}
