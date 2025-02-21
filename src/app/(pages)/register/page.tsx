"use client";

import { RegistrationHero } from "@/features/registration/components/registration-hero";
import { RegistrationSection } from "@/features/registration/components/registration-section";
export default function RegistrationPage() {
  return (
    <main className="bg-white">
      {/* Hero Section */}
      <RegistrationHero />
      {/* Registration Section */}
      <RegistrationSection />
    </main>
  );
}
