import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import Link from "next/link";

interface SecondaryButtonProps {
  href?: string;
  onClick?: () => void;
  children: React.ReactNode;
  className?: string;
  type?: "button" | "submit";
}

export function SecondaryButton({
  href,
  onClick,
  children,
  className,
  type = "button",
}: SecondaryButtonProps) {
  const buttonClasses = cn(
    "rounded-md py-6 px-8 text-base font-medium bg-white hover:bg-gray-50",
    className
  );

  if (href) {
    return (
      <Button asChild variant="outline" className={buttonClasses}>
        <Link href={href}>{children}</Link>
      </Button>
    );
  }

  return (
    <Button
      type={type}
      onClick={onClick}
      variant="outline"
      className={buttonClasses}
    >
      {children}
    </Button>
  );
}
