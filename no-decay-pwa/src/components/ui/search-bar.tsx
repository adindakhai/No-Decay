import { BadgeItem } from "@/components/ui/badge";

interface SearchBarProps {
  value: string;
  onChange: (val: string) => void;
  onSearch?: () => void;
  selectedBadges?: string[];
  onRemoveBadge?: (label: string) => void;
}

export default function SearchBar({
  value,
  onChange,
  onSearch,
  selectedBadges = [],
  onRemoveBadge, // ✅ tambahkan ini
}: SearchBarProps) {
  const isDisabled = value.trim() === "" && selectedBadges.length === 0;

  return (
    <div className="relative flex items-center border border-green-900 rounded-[12px] shadow-xl bg-white px-3 py-2">
{selectedBadges?.map((badge) => (
  <div key={badge} className="mr-2">
    <BadgeItem
      label={badge}
      imageSrc="/image/y.svg"
      onRemove={() => onRemoveBadge?.(badge)}
      className="bg-[#FEF3E2] border border-green-900 text-green-900 px-[7px] py-[6px] h-[30px] text-[10px] font-normal"
    />
  </div>
))}

      <input
        type="text"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder="Search food"
        className="flex-1 text-sm text-gray-800 bg-transparent outline-none pr-8"
      />

      <button
        type="button"
        disabled={isDisabled}
        onClick={onSearch}
        className={`absolute right-3 ${
          isDisabled ? "opacity-50 cursor-not-allowed" : "text-green-900"
        }`}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="w-5 h-5"
        >
          <circle cx="11" cy="11" r="8" />
          <path d="m21 21-4.3-4.3" />
        </svg>
      </button>
    </div>
  );
}
