import { Plus } from "lucide-react";
import { BadgeItem } from "@/components/ui/badge";
import SearchBar from "@/components/ui/search-bar";
import { cn } from "@/lib/utils";

interface RecCardProps {
  searchInput: string;
  setSearchInput: (val: string) => void;
  selectedBadges: string[];
  setSelectedBadges: (badges: string[]) => void;
  onSearch: () => void;
}

export function RecCard({
  searchInput,
  setSearchInput,
  selectedBadges,
  setSelectedBadges,
  onSearch,
}: RecCardProps) {
  const handleBadgeClick = (label: string) => {
    if (selectedBadges.includes(label)) {
      setSelectedBadges(selectedBadges.filter((item) => item !== label));
    } else if (selectedBadges.length < 3) {
      setSelectedBadges([...selectedBadges, label]);
    }
    setSearchInput("");
  };

  return (
    <div className="w-[350px] rounded-[12px] bg-gradient-to-br from-[#FFF9E4] to-[#FFE9A0] p-[20px] flex flex-col">
      {/* Header */}
      <div className="flex items-center gap-x-[15px]">
        <p className="text-green-900 text-[20px] font-semibold">
          We’ve got gentle tips for you!
        </p>
        <img src="/image/tips.svg" alt="Tips Icon" className="w-16 h-16" />
      </div>

      {/* Badges */}
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
            onClick={() => handleBadgeClick(item.label)}
            className={cn(
              "h-[30px] px-[7px] py-[9px] rounded-[12px] flex items-center gap-[5px] text-[10px] font-normal cursor-pointer",
              selectedBadges.includes(item.label)
                ? "bg-[#FFF1DD] border border-green-900 text-green-900"
                : "bg-[#FEF3E2] text-muted-foreground border border-transparent"
            )}
            onRemove={() => console.log(`Remove ${item.label}`)}
          />
        ))}

        {/* Add Food Badge */}
        <BadgeItem
          onClick={() => handleBadgeClick("Add Food")}
          className={cn(
            "h-[30px] px-[7px] py-[9px] rounded-[12px] flex items-center gap-[5px] text-[10px] font-normal cursor-pointer",
            selectedBadges.includes("Add Food")
              ? "bg-[#FFF1DD] border border-green-900 text-green-900"
              : "bg-[#FEF3E2] text-muted-foreground border border-transparent"
          )}
          label="Add Food"
        >
          <Plus className="w-[10px] h-[10px] text-green-900" />
        </BadgeItem>
      </div>

      {/* Search Bar */}
      <div className="mt-4">
        <SearchBar
          value={searchInput}
          onChange={setSearchInput}
          onSearch={onSearch}
          selectedBadges={selectedBadges}
          onRemoveBadge={(badge) =>
            setSelectedBadges(selectedBadges.filter((item) => item !== badge))
          }
        />
      </div>
    </div>
  );
}
