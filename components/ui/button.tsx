import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "@/lib/utils";

const buttonVariants = cva(
  "inline-flex cursor-pointer items-center justify-center whitespace-nowrap text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none  focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50",
  {
    variants: {
      variant: {
        default:
          "bg-[#5324FB] text-white hover:bg-[#5324FB]/80 bg-[length:200%_100%] hover:animate-bg-slide",
        defaultReverse: "bg-white text-[#5324FB] ",
        white: "bg-white text-grey-700 hover:bg-grey-200/90",
        destructive:
          "bg-destructive text-destructive-foreground hover:bg-destructive/90",
        outline:
          "border border-input bg-background hover:bg-accent hover:text-accent-foreground",
        secondaryGray: "bg-white text-black hover:bg-grey-200/80",
        gray: "bg-grey-900 text-white hover:bg-grey-700/80",
        ghost:
          "border border-grey-200 text-black hover:bg-accent hover:text-accent-foreground",
        pricing:
          "border border-[#D0D5DD] bg-[#F5F8FF] text-black text-left hover:bg-accent hover:text-accent-foreground active:border-blueDark-400 active:border-blueDark-800",
        link: "text-primary underline-offset-4 hover:underline",
        muted: "",
        content:
          "border border-[#F4EBFF] bg-[#F0ECFF] text-[#5324FB] font-semibold hover:bg-accent",
      },
      size: {
        default: " px-[18px] py-[10px]",
        md: "px-4 py-7",
        sm: "w-[84px] text-center",
        lg: "h-11  px-8",
        xl: "h-11  px-8 md:px-16",
        full: "py-[10px] w-full px-8",
        icon: "h-10 w-10",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  },
);

export interface ButtonProps
  extends
    React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : "button";
    return (
      <Comp
        className={cn(buttonVariants({ variant, size, className }))}
        ref={ref}
        {...props}
      />
    );
  },
);
Button.displayName = "Button";

export { Button, buttonVariants };
