import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const buttonVariants = cva(
  "inline-flex items-center justify-center whitespace-nowrap rounded-lg text-base font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gray-950/10 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50",
  {
    variants: {
      variant: {
        default: "bg-sc-red text-white shadow hover:bg-sc-red/90 h-12 px-8",
        destructive:
          "bg-red-500 text-white shadow-sm hover:bg-red-500/90 h-12 px-8",
        outline:
          "border border-gray-200 bg-white shadow-sm hover:bg-gray-100 hover:text-gray-900 h-12 px-8",
        secondary:
          "bg-gray-100 text-gray-900 shadow-sm hover:bg-gray-100/80 h-12 px-8",
        ghost: "hover:bg-gray-100 hover:text-gray-900 px-4",
        link: "text-gray-900 underline-offset-4 hover:underline",
        destructiveOutline:
          "border border-red-500 text-red-500 shadow-sm hover:bg-red-500/5 hover:border-red-500/30 h-12 px-8",
      },
      size: {
        default: "h-10 px-8",
        sm: "h-10 px-4",
        lg: "h-14 px-10",
        icon: "h-12 w-12",
      },
      isLoading: {
        true: "cursor-not-allowed opacity-50",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
);

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean;
  isLoading?: boolean;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      className,
      variant,
      size,
      isLoading,
      leftIcon,
      rightIcon,
      asChild = false,
      children,
      color,
      ...props
    },
    ref
  ) => {
    const Comp = asChild ? Slot : "button";
    return (
      <Comp
        className={cn(buttonVariants({ variant, size, isLoading, className }))}
        ref={ref}
        {...props}
      >
        <div className="flex items-center gap-2">
          {leftIcon}
          {children}
          {rightIcon}
        </div>
      </Comp>
    );
  }
);
Button.displayName = "Button";

export { Button, buttonVariants };
