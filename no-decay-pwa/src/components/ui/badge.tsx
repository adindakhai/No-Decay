import { X } from "lucide-react";
import { cn } from "@/lib/utils";

interface BadgeItemProps {
  label: string;
  icon?: string;
  imageSrc?: string;
  onRemove?: () => void;
  onClick?: () => void; // ✅ Tambahkan ini
  className?: string;
  children?: React.ReactNode;
}

export function BadgeItem({
  label,
  icon,
  imageSrc,
  onRemove,
  onClick,
  className,
  children,
}: BadgeItemProps) {
  return (
    <div
      onClick={onClick} // ✅ Gunakan di sini
      role="button"
      tabIndex={0}
      className={cn(
        "h-[30px] px-[7px] py-[9px] bg-[#FEF3E2] rounded-[12px] flex items-center gap-[5px] text-[10px] font-normal text-green-900",
        className
      )}
    >
      <div className="flex items-center gap-1">
        {imageSrc ? (
          <img src={imageSrc} alt={label} className="w-[14px] h-[12px] object-contain" />
        ) : icon ? (
          <span className="text-xs">{icon}</span>
        ) : null}
        <span>{label}</span>
      </div>
      {onRemove && (
        <button
          onClick={(e) => {
            e.stopPropagation(); // supaya tidak trigger onClick utama
            onRemove();
          }}
          className="flex items-center"
        >
          <X className="w-[10px] h-[10px] text-green-900" />
        </button>
      )}
      {children}
    </div>
  );
}
