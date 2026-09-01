import * as React from "react";

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?:
    | "default"
    | "destructive"
    | "outline"
    | "secondary"
    | "ghost"
    | "link";

  size?: "default" | "sm" | "lg" | "icon";
}

const variantClasses: Record<
  NonNullable<ButtonProps["variant"]>,
  string
> = {
  default:
    "bg-blue-600 text-white hover:bg-blue-700",

  destructive:
    "bg-red-600 text-white hover:bg-red-700",

  outline:
    "border border-gray-300 bg-white text-gray-900 hover:bg-gray-100",

  secondary:
    "bg-gray-200 text-gray-900 hover:bg-gray-300",

  ghost:
    "hover:bg-gray-100",

  link:
    "text-blue-600 underline-offset-4 hover:underline",
};

const sizeClasses: Record<
  NonNullable<ButtonProps["size"]>,
  string
> = {
  default:
    "h-10 px-4 py-2",

  sm:
    "h-9 rounded-md px-3",

  lg:
    "h-11 rounded-md px-8",

  icon:
    "h-10 w-10",
};

export const Button = React.forwardRef<
  HTMLButtonElement,
  ButtonProps
>(
  (
    {
      variant = "default",
      size = "default",
      className = "",
      type = "button",
      ...props
    },
    ref
  ) => {
    return (
      <button
        ref={ref}
        type={type}
        className={`inline-flex items-center justify-center rounded-lg font-medium transition disabled:cursor-not-allowed disabled:opacity-50 ${variantClasses[variant]} ${sizeClasses[size]} ${className}`}
        {...props}
      />
    );
  }
);

Button.displayName = "Button";
