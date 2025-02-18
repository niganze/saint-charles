"use client";

import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { ProfileInput, profileSchema } from "@/lib/validations/auth";
import { useMutation } from "@tanstack/react-query";
import { updateUserProfile } from "../auth.api";
import { toast } from "react-hot-toast";
import { Session } from "next-auth";
import { useSession } from "next-auth/react";
import { User, Mail, Loader } from "lucide-react";
import { useEffect, useState } from "react";

interface ProfileTabProps {
  session: Session | null;
}

export default function ProfileTab() {
  const { update, data: session } = useSession();
  const [isLoading, setIsLoading] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
  } = useForm<ProfileInput>({
    resolver: zodResolver(profileSchema),
    defaultValues: {
      name: session?.user?.name || "",
      email: session?.user?.email || "",
    },
  });

  useEffect(() => {
    setValue("name", session?.user?.name || "");
    setValue("email", session?.user?.email || "");
  }, [session]);

  const mutation = useMutation({
    mutationFn: updateUserProfile,
    onSuccess: async () => {
      await update();
      toast.success("Profile updated successfully!");
    },
    onError: (error: Error) => {
      toast.error(error.message || "Failed to update profile");
    },
    onSettled: () => {
      setIsLoading(false);
    },
  });

  const onSubmit = handleSubmit((data) => {
    setIsLoading(true);
    mutation.mutate(data);
  });

  return (
    <form onSubmit={onSubmit} className="mt-8 space-y-6 w-full">
      <div>
        <Input
          label="Name"
          {...register("name")}
          error={errors.name?.message}
          placeholder="Enter your name"
          icon={<User className="w-4 h-4" />}
          disabled={isLoading}
        />
      </div>

      <div>
        <Input
          label="Email"
          {...register("email")}
          type="email"
          error={errors.email?.message}
          placeholder="Enter your email"
          icon={<Mail className="w-4 h-4" />}
          disabled={isLoading}
        />
      </div>

      <Button type="submit" className="w-full" disabled={isLoading}>
        {isLoading ? (
          <Loader className="w-4 h-4 animate-spin" />
        ) : (
          "Update Profile"
        )}
      </Button>
    </form>
  );
}
