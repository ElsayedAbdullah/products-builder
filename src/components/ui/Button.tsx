import React from "react";
import { cva, type VariantProps } from "class-variance-authority";

const button = cva(
  "rounded-lg flex items-center text-white font-medium gap-3 justify-center duration-300",
  {
    variants: {
      intent: {
        primary: ["bg-indigo-500", "hover:bg-indigo-600"],
        secondary: ["bg-[#eaeaeb]", "hover:bg-[#d8d6d6] text-black"],
        destructive: ["bg-red-500", "hover:bg-red-600"],
      },
      size: {
        small: ["text-sm", "py-1", "px-2"],
        medium: ["text-base", "py-2", "px-4"],
      },
      fullWidth: {
        true: "w-full",
      },
    },
    defaultVariants: {
      intent: "primary",
      size: "medium",
    },
  }
);

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof button> {
  children: React.ReactNode;
}

export const Button: React.FC<ButtonProps> = ({
  className,
  children,
  intent,
  size,
  fullWidth,
  ...props
}) => (
  <button className={button({ intent, size, className, fullWidth })} {...props}>
    {children}
  </button>
);

export default Button;
