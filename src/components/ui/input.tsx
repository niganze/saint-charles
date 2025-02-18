import * as React from "react";
import { cn } from "@/lib/utils";
import { VariantProps, cva } from "class-variance-authority";

const inputVariants = cva(
  "flex w-full rounded-lg border border-gray-200 bg-white px-3 py-2 text-sm ring-offset-white file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-gray-500 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sc-red/20 focus:border-sc-red disabled:cursor-not-allowed disabled:opacity-50",
  {
    variants: {
      variant: {
        default: "h-10",
        textarea: "min-h-[80px] resize-none",
      },
      hasLeftIcon: {
        true: "pl-10",
      },
    },
    defaultVariants: {
      variant: "default",
      hasLeftIcon: false,
    },
  }
);

export interface InputProps
  extends React.InputHTMLAttributes<HTMLInputElement>,
    VariantProps<typeof inputVariants> {
  icon?: React.ReactNode;
  error?: string;
}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, variant, icon, error, ...props }, ref) => {
    return (
      <div className="relative">
        {icon && (
          <div className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">
            {icon}
          </div>
        )}
        <input
          className={cn(
            inputVariants({ variant, hasLeftIcon: !!icon, className })
          )}
          ref={ref}
          {...props}
        />
        {error && <p className="mt-1 text-xs text-sc-red">{error}</p>}
      </div>
    );
  }
);
Input.displayName = "Input";

export { Input, inputVariants };
