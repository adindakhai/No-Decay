import { ClipboardList, Plus } from "lucide-react";
import { BadgeItem } from "@/components/ui/badge";
import  SearchBar  from "@/components/ui/search-bar";
import { cn } from "@/lib/utils";

export function RecCard() {
  return (
    <div className="w-[350px] h-[250px] rounded-[12px] bg-gradient-to-br from-[#FFF9E4] to-[#FFE9A0] p-[20px] flex flex-col">
      
      {/* Header: Text + Custom Image */}
      <div className="flex items-center gap-x-[15px]">
        <p className="text-green-900 text-[20px] font-semibold">
          We’ve got gentle tips for you!
        </p>
        <img
          src="/image/tips.svg" // ganti sesuai path gambarmu
          alt="Tips Icon"
          className="w-16 h-16" // sesuaikan ukuran & posisi
        />
      </div>

        {/* Tags */}
        <div className="mt-4 flex flex-wrap gap-x-2 gap-y-2">
        {[
            { label: "Banana", imageSrc: "/image/y.svg" },
            { label: "Apple", imageSrc: "/image/y.svg" },
            { label: "Pear", imageSrc: "/image/y.svg" },
            { label: "Pear", imageSrc: "/image/y.svg" },
        ].map((item, i) => (
            <BadgeItem
            key={i}
            label={item.label}
            imageSrc={item.imageSrc}
            onRemove={() => console.log(`Remove ${item.label}`)}
            />
        ))}
        <BadgeItem 
              className={cn(
                "h-[30px] px-[7px] py-[9px] bg-[#FEF3E2] rounded-[12px] flex items-center gap-[5px] text-[10px] font-normal text-muted-foreground"
              )}
            label="Add Food">
            <Plus className="w-[10px] h-[10px] flex items-center text-green-900" />
        </BadgeItem>
        </div>


      {/* Search bar */}
      <div className="mt-4">
        <SearchBar />
      </div>
    </div>
  );
}
