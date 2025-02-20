"use client";

import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";

const categories = [
  { name: "All", count: 24 },
  { name: "Language Tips", count: 8 },
  { name: "Culture", count: 6 },
  { name: "Student Stories", count: 4 },
  { name: "Events", count: 3 },
  { name: "News", count: 3 },
];

export function BlogCategories() {
  return (
    <section className="border-b border-gray-200 bg-white">
      <div className="container py-4">
        <div className="flex flex-wrap items-center gap-4">
          {categories.map((category, index) => (
            <motion.div
              key={category.name}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
            >
              <Button
                variant="outline"
                className={index === 0 ? "border-sc-red text-sc-red" : ""}
              >
                {category.name}{" "}
                <span className="ml-2 text-gray-500">({category.count})</span>
              </Button>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
