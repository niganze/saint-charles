import Image from "next/image";

export const Logo = () => (
  <div className="relative w-full h-full">
    <svg
      viewBox="0 0 200 120"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className="w-full h-full"
    >
      <path
        d="M20 0 L180 0 C180 0 190 20 180 40 L20 40 C10 40 20 20 20 0Z"
        fill="#000000"
      />
      <path
        d="M40 40 L160 40 C160 40 170 60 160 80 L40 80 C30 80 40 60 40 40Z"
        fill="#DD0000"
      />
      <path
        d="M60 80 L140 80 C140 80 150 100 140 120 L60 120 C50 120 60 100 60 80Z"
        fill="#FFCE00"
      />
    </svg>
  </div>
);
