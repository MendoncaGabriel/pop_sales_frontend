import React from "react";
import { cn } from "@/lib/utils";

type Variants = "blue" | "red" | "text" | "gray" | "green";
type Sizes = "sm" | "md" | "lg" | "xl";

const variants: Record<Variants, string> = {
  blue: "bg-blue-500 text-white hover:bg-blue-600",
  gray: "bg-gray-200 text-gray-800 hover:bg-gray-300",
  green: "bg-green-500 text-white hover:bg-green-600",
  text: "bg-transparent text-blue-600 hover:underline",
  red: "bg-red-600 text-white hover:bg-red-700",
};

const sizes: Record<Sizes, string> = {
  sm: "px-3 py-1 text-sm",
  md: "px-4 py-2 text-base",
  lg: "px-5 py-3 text-lg",
  xl: "px-6 py-4 text-xl",
};

type AsProp<C extends React.ElementType> = {
  as?: C;
};

type PropsToComponent<C extends React.ElementType> = React.ComponentPropsWithoutRef<C> & AsProp<C>;

type ButtonProps<C extends React.ElementType> = PropsToComponent<C> & {
  variant?: Variants;
  size?: Sizes;
  className?: string;
  children: React.ReactNode;
};

export const Button = <C extends React.ElementType = "button">({
  as,
  variant = "blue",
  size = "md",
  className,
  children,
  ...restProps
}: ButtonProps<C>) => {
  const Component = as || "button";

  const baseClasses = "inline-flex items-center justify-center font-medium rounded-lg transition-all duration-200 cursor-pointer select-none focus:outline-none focus:ring-2 focus:ring-offset-2";
  const combinedClasses = cn(baseClasses, variants[variant], sizes[size], className);

  return (
    <Component className={combinedClasses} {...restProps}>
      {children}
    </Component>
  );
};
