"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import Link from "next/link";

export const Logo = ({
  variant = "default",
}: {
  variant?: "default" | "footer";
}) => {
  const isFooter = variant === "footer";

  return (
    <Link href="/" className="relative inline-block w-auto">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="relative"
      >
        {/* Mobile Logo */}
        {/* {!isFooter && (
          <Image
            src={"/logos/black-red.png"}
            alt="Saint Charles Logo"
            width={50}
            height={50}
            className="w-auto object-contain xl:hidden"
            priority
          />
        )} */}
        <Image
          src={isFooter ? "/logos/white-red-x.png" : "/logos/black-red-x.png"}
          alt="Saint Charles Logo"
          width={isFooter ? 200 : 190}  // Increased from 140/130 to 180/170
          height={isFooter ? 80 : 80} // Increased from 50/40 to 65/55
          className={` ${!isFooter ? "" : ""} w-auto object-contain"`}
          priority
        />
      </motion.div>
    </Link>
  );
};
