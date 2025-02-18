"use client";

import { Logo } from "@/assets/logo";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import toast from "react-hot-toast";
import { useMutation } from "@tanstack/react-query";
import { Input } from "@/components/ui/input";
import { Loader } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { SignInInput, signInSchema } from "@/lib/validations/auth";

export const LoginForm = () => {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<SignInInput>({
    resolver: zodResolver(signInSchema),
  });

  const mutation = useMutation({
    mutationFn: async (data: SignInInput) => {
      setIsLoading(true);
      const res = await signIn("credentials", {
        ...data,
        redirect: false,
      });

      if (res?.error) {
        throw new Error(res.error);
      }

      return res;
    },
    onSuccess: () => {
      toast.success("Welcome back!");
      router.push("/admin");
      router.refresh();
    },
    onError: (error: Error) => {
      toast.error(error.message || "Invalid credentials");
    },
    onSettled: () => {
      setIsLoading(false);
    },
  });

  const onSubmit = handleSubmit((data) => {
    mutation.mutate(data);
  });

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        <div className="flex flex-col items-center">
          <div className="w-32 h-20">
            <Logo />
          </div>
          <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
            Sign in to your account
          </h2>
        </div>
        <form onSubmit={onSubmit} className="mt-8 space-y-6">
          <div className="rounded-md shadow-sm space-y-4">
            <div>
              <Input
                label="Email address"
                {...register("email")}
                type="email"
                error={errors.email?.message}
                placeholder="Enter your email address"
                disabled={isLoading}
                autoComplete="email"
                required
              />
            </div>
            <div>
              <Input
                label="Password"
                {...register("password")}
                type="password"
                error={errors.password?.message}
                placeholder="Enter your password"
                disabled={isLoading}
                autoComplete="current-password"
                required
              />
            </div>
          </div>

          <Button
            type="submit"
            className="w-full group relative flex justify-center py-2 px-4"
            disabled={isLoading}
          >
            {isLoading ? (
              <Loader className="w-4 h-4 animate-spin" />
            ) : (
              "Sign in"
            )}
          </Button>
        </form>
      </div>
    </div>
  );
};
