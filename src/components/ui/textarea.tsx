import * as React from "react";
import { cn } from "@/lib/utils";
import InputLabel from "./input-label";

export interface TextareaProps
  extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  error?: string;
  label?: string;
}

const Textarea = React.forwardRef<HTMLTextAreaElement, TextareaProps>(
  ({ className, error, label, ...props }, ref) => {
    const [height, setHeight] = React.useState(80); // Initial height

    const handleInput = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
      setHeight(Math.min(event.target.scrollHeight, 200)); // Adjust height based on content
    };

    return (
      <div className="relative flex flex-col gap-2">
        {label && (
          <InputLabel className="text-sm font-medium text-gray-900">
            {label}
          </InputLabel>
        )}
        <textarea
          className={cn(
            "flex w-full min-h-[80px] overflow-hidden rounded-md border border-gray-200 bg-white px-3 py-2 text-sm ring-offset-white placeholder:text-gray-500 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gray-950/10 focus:border-gray-950/10 focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50",
            error && "border-red-500",
            className
          )}
          ref={ref}
          {...props}
          style={{ height }} // Set the height dynamically
          onInput={handleInput} // Adjust height on input
        ></textarea>
        {error && <p className="mt-1 text-sm text-red-500">{error}</p>}
      </div>
    );
  }
);
Textarea.displayName = "Textarea";

export { Textarea };
