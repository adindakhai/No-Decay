import { cn } from "@/lib/utils";
import { ButtonHTMLAttributes } from "react";

interface CustomButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "outline" | "soft";
  children: React.ReactNode;
}

export function CustomButton({
  variant = "primary",
  className,
  children,
  ...props
}: CustomButtonProps) {
  return (
    <button
      {...props}
      className={cn(
        "rounded-[12px] px-5 py-3 font-normal text-[10px] transition-colors",
        variant === "soft" && "bg-green-900 text-white hover:bg-green-800",
        variant === "outline" && "bg-[#FFF9E4] text-green-900 hover:bg-[#fff2c4]",
        className
      )}
    >
      {children}
    </button>
  );
}
