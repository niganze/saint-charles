import * as React from "react";
import { cn } from "@/lib/utils";
import { VariantProps, cva } from "class-variance-authority";
import InputLabel from "./input-label";

const inputVariants = cva(
  "flex w-full rounded-lg border border-gray-200 bg-white px-4 py-3 text-base ring-offset-white file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-gray-500 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gray-950/10 focus:border-gray-950/10 disabled:cursor-not-allowed disabled:opacity-50",
  {
    variants: {
      variant: {
        default: "h-12",
        textarea: "min-h-[120px] resize-none",
      },
      hasLeftIcon: {
        true: "pl-12",
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
  label?: string;
}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, variant, icon, error, label, ...props }, ref) => {
    return (
      <div className="flex flex-col gap-2.5">
        {label && (
          <InputLabel htmlFor={props.name} className="text-base">
            {label}
          </InputLabel>
        )}
        <div className="relative">
          {icon && (
            <div className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500">
              {icon}
            </div>
          )}
          <input
            className={cn(
              inputVariants({ variant, hasLeftIcon: !!icon, className }),
              error && "border-red-500"
            )}
            ref={ref}
            {...props}
          />
        </div>
        {error && <p className="mt-2 text-sm text-red-500">{error}</p>}
      </div>
    );
  }
);
Input.displayName = "Input";

export { Input, inputVariants };
