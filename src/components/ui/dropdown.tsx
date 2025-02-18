"use client";

import * as React from "react";
import { cva } from "class-variance-authority";
import { cn } from "@/lib/utils";

const dropdownVariants = cva(
  "absolute right-0 mt-2 w-56 origin-top-right rounded-lg bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none z-50 border border-gray-100 py-1",
  {
    variants: {
      align: {
        start: "left-0",
        center: "left-1/2 -translate-x-1/2",
        end: "right-0",
      },
    },
    defaultVariants: {
      align: "end",
    },
  }
);

export interface DropdownProps extends React.HTMLAttributes<HTMLDivElement> {
  trigger: React.ReactNode;
  align?: "start" | "center" | "end";
}

export const DropdownContainer = React.forwardRef<
  HTMLDivElement,
  DropdownProps
>(({ className, children, trigger, align, ...props }, ref) => {
  const [open, setOpen] = React.useState(false);

  return (
    <div className="relative" ref={ref} {...props}>
      <div onClick={() => setOpen(!open)}>{trigger}</div>
      {open && (
        <>
          <div className="fixed inset-0 z-40" onClick={() => setOpen(false)} />
          <div className={cn(dropdownVariants({ align, className }))}>
            {children}
          </div>
        </>
      )}
    </div>
  );
});
DropdownContainer.displayName = "DropdownContainer";

export const DropdownItem = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn(
      "relative flex cursor-pointer select-none items-center rounded-sm px-4 py-2.5 text-sm outline-none transition-colors hover:bg-gray-50 hover:text-sc-red data-[disabled]:pointer-events-none data-[disabled]:opacity-50",
      className
    )}
    {...props}
  />
));
DropdownItem.displayName = "DropdownItem";
