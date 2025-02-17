import Image from "next/image";

export const Logo = () => (
  <div className="relative w-full h-full">
    <Image
      src="/logo.png"
      alt="Saint Charles Logo"
      fill
      className="object-contain"
      priority
    />
  </div>
);
