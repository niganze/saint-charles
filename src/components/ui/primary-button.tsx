import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { ArrowRight } from "lucide-react";
import Link from "next/link";

interface PrimaryButtonProps {
  href?: string;
  onClick?: () => void;
  children: React.ReactNode;
  className?: string;
  showArrow?: boolean;
  type?: "button" | "submit";
}

export function PrimaryButton({
  href,
  onClick,
  children,
  className,
  showArrow = false,
  type = "button",
}: PrimaryButtonProps) {
  const buttonContent = (
    <>
      {children}
      {showArrow && <ArrowRight className="ml-2 h-4 w-4" />}
    </>
  );

  const buttonClasses = cn(
    "rounded-md py-6 px-8 text-base font-medium",
    className
  );

  if (href) {
    return (
      <Button asChild className={buttonClasses}>
        <Link href={href}>{buttonContent}</Link>
      </Button>
    );
  }

  return (
    <Button type={type} onClick={onClick} className={buttonClasses}>
      {buttonContent}
    </Button>
  );
}
