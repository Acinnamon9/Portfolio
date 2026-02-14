import * as React from "react";
import { motion } from "framer-motion";
import { Slot } from "@radix-ui/react-slot";
import { cn } from "../../lib/utils";

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "default" | "outline" | "ghost" | "link";
  size?: "default" | "sm" | "lg" | "icon";
  asChild?: boolean;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      className,
      variant = "default",
      size = "default",
      asChild = false,
      ...props
    },
    ref,
  ) => {
    const Comp = asChild ? Slot : motion.button;

    const variants = {
      default: "brutalist-button",
      outline:
        "border-4 border-foreground bg-transparent hover:bg-foreground hover:text-background font-black",
      ghost: "hover:bg-accent hover:border-2 border-transparent font-bold",
      link: "text-foreground underline decoration-4 underline-offset-4 hover:text-accent font-black",
    };

    const sizes = {
      default: "h-14 px-8 text-xl",
      sm: "h-10 px-4 text-sm",
      lg: "h-20 px-12 text-2xl",
      icon: "h-14 w-14",
    };

    return (
      <Comp
        {...(asChild ? {} : { whileTap: { scale: 0.95 } })}
        ref={ref}
        className={cn(
          "inline-flex items-center justify-center transition-all focus-visible:outline-none disabled:pointer-events-none disabled:opacity-50",
          variants[variant],
          sizes[size],
          className,
        )}
        {...(props as any)}
      />
    );
  },
);
Button.displayName = "Button";

export { Button };
