"use client";

import { useSession } from "next-auth/react";
import { useState } from "react";
import ProfileTab from "@/features/auth/components/profile-tab";
import PasswordTab from "@/features/auth/components/password-tab";
import TabButton from "@/components/ui/tab-button";

export default function ProfilePage() {
  const { data: session } = useSession();
  const [activeTab, setActiveTab] = useState("profile");

  return (
    <div className="flex justify-center py-6 px-4 sm:px-6 lg:px-8">
      <div className="bg-white rounded-xl p-8 max-w-md w-full space-y-8">
        <div className="w-full flex flex-col items-center">
          <div className="flex space-x-4 mb-5">
            <TabButton
              active={activeTab === "profile"}
              onClick={() => setActiveTab("profile")}
            >
              Profile
            </TabButton>
            <TabButton
              active={activeTab === "password"}
              onClick={() => setActiveTab("password")}
            >
              Password
            </TabButton>
          </div>
        </div>
        {activeTab === "profile" ? <ProfileTab /> : <PasswordTab />}
      </div>
    </div>
  );
}
