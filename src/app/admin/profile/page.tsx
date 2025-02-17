"use client";

import { AdminLayout } from "@/components/layouts/AdminLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { toast } from "react-hot-toast";
import { useSession } from "next-auth/react";
import { useState } from "react";
import { Spinner } from "@/components/ui/spinner";

export default function ProfilePage() {
  const { data: session, update } = useSession();
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);
    const formData = new FormData(e.currentTarget);

    try {
      const response = await fetch("/api/profile", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: formData.get("name"),
          email: formData.get("email"),
          currentPassword: formData.get("currentPassword"),
          newPassword: formData.get("newPassword"),
        }),
      });

      if (!response.ok) {
        throw new Error("Failed to update profile");
      }

      await update();
      toast.success("Profile updated successfully");
    } catch (error) {
      toast.error("Failed to update profile");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <AdminLayout>
      <div className="max-w-2xl mx-auto">
        <Card>
          <CardHeader>
            <CardTitle className="text-2xl font-bold">
              Profile Settings
            </CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Name
                </label>
                <Input
                  name="name"
                  defaultValue={session?.user?.name}
                  required
                  className="mt-1"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Email
                </label>
                <Input
                  name="email"
                  type="email"
                  defaultValue={session?.user?.email}
                  required
                  className="mt-1"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Current Password
                </label>
                <Input
                  name="currentPassword"
                  type="password"
                  className="mt-1"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700">
                  New Password
                </label>
                <Input name="newPassword" type="password" className="mt-1" />
              </div>

              <button
                type="submit"
                disabled={isLoading}
                className="flex justify-center w-full px-4 py-2 text-sm font-medium text-white bg-sc-red rounded-md hover:bg-sc-black focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-sc-red disabled:opacity-50"
              >
                {isLoading ? (
                  <Spinner
                    size="sm"
                    className="border-white border-t-transparent"
                  />
                ) : (
                  "Update Profile"
                )}
              </button>
            </form>
          </CardContent>
        </Card>
      </div>
    </AdminLayout>
  );
}
