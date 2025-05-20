import { cn } from "@/lib/utils";
import { ButtonHTMLAttributes } from "react";

interface CustomButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "outline" | "soft";
  isActive?: boolean; // ✅ baru
  children: React.ReactNode;
}

export function CustomButton({
  variant = "primary",
  isActive = false,
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
        variant === "outline" &&
          (isActive
            ? "bg-[#fff2c4] text-green-900 shadow"
            : "bg-[#FEF3E2] text-green-900 hover:bg-[#fff2c4]"),
        className
      )}
    >
      {children}
    </button>
  );
}
