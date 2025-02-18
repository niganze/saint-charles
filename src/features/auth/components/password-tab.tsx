"use client";

import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { PasswordInput, passwordSchema } from "@/lib/validations/auth";
import { useMutation } from "@tanstack/react-query";
import { updatePassword } from "../auth.api";
import { toast } from "react-hot-toast";
import { Lock, Loader } from "lucide-react";
import { useState } from "react";

export default function PasswordTab() {
  const [isLoading, setIsLoading] = useState(false);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<PasswordInput>({
    resolver: zodResolver(passwordSchema),
  });

  const mutation = useMutation({
    mutationFn: updatePassword,
    onSuccess: () => {
      toast.success("Password updated successfully!");
      reset();
    },
    onError: (error: Error) => {
      toast.error(error.message || "Failed to update password");
    },
    onSettled: () => {
      setIsLoading(false);
    },
  });

  const onSubmit = handleSubmit((data) => {
    setIsLoading(true);
    mutation.mutate({
      currentPassword: data.currentPassword,
      newPassword: data.newPassword,
    });
  });

  return (
    <form onSubmit={onSubmit} className="mt-8 space-y-6 w-full">
      <div>
        <Input
          label="Current Password"
          {...register("currentPassword")}
          type="password"
          error={errors.currentPassword?.message}
          placeholder="Enter current password"
          icon={<Lock className="w-4 h-4" />}
          disabled={isLoading}
        />
      </div>

      <div>
        <Input
          label="New Password"
          {...register("newPassword")}
          type="password"
          error={errors.newPassword?.message}
          placeholder="Enter new password"
          icon={<Lock className="w-4 h-4" />}
          disabled={isLoading}
        />
      </div>

      <div>
        <Input
          label="Confirm New Password"
          {...register("confirmPassword")}
          type="password"
          error={errors.confirmPassword?.message}
          placeholder="Confirm new password"
          icon={<Lock className="w-4 h-4" />}
          disabled={isLoading}
        />
      </div>

      <Button type="submit" className="w-full" disabled={isLoading}>
        {isLoading ? (
          <Loader className="w-4 h-4 animate-spin" />
        ) : (
          "Update Password"
        )}
      </Button>
    </form>
  );
}
