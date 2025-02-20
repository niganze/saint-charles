import { ContactHero } from "@/features/contact/components/contact-hero";
import { ContactSection } from "@/features/contact/components/contact-section";
import { FaqSection } from "@/features/contact/components/faq-section";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Contact Us | Saint Charles K. LTD - German Language School",
  description:
    "Get in touch with us for inquiries about German language courses, schedules, and registration. Visit our school in Kigali or contact us online.",
  openGraph: {
    title: "Contact Saint Charles K. LTD - German Language School",
    description:
      "Get in touch with us for inquiries about German language courses, schedules, and registration. Visit our school in Kigali or contact us online.",
    type: "website",
    url: "/contact",
  },
};

export default function ContactPage() {
  return (
    <main className="bg-white">
      <ContactHero />
      <ContactSection />
      <FaqSection />
    </main>
  );
}
