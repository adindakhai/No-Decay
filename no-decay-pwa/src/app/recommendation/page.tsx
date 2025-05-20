"use client";

import { ChevronLeft, Bell, LayoutGrid, Lightbulb, Users } from "lucide-react";
import { usePathname, useRouter } from "next/navigation";
import { cn } from "@/lib/utils";
import { CustomButton } from "@/components/ui/custom-button";
import { Navbar } from "@/components/ui/navbar";
import { RecCard } from "@/components/ui/rec-card";
import { useState } from "react";

export default function TipsPage() {
  const pathname = usePathname();
  const router = useRouter();

  const navItems = [
    { icon: Bell, path: "/notifications" },
    { icon: LayoutGrid, path: "/dashboard" },
    { icon: Lightbulb, path: "/tips" },
    { icon: Users, path: "/profile" },
  ];

  const [activeTab, setActiveTab] = useState<"cook" | "store" | null>(null);
  const [searchInput, setSearchInput] = useState("");
  const [selectedBadges, setSelectedBadges] = useState<string[]>([]);
  const [searchResults, setSearchResults] = useState<any[]>([]);

  const handleSearch = () => {
    if (searchInput.trim() || selectedBadges.length > 0) {
      setSearchResults([
        {
          title: "Frozen Banana Bites",
          image: "/image/banana.png",
          freeze: "3 Hours Freeze",
          store: "Keep Frozen",
          ingredients: "3 Ingredients",
        },
        // Bisa tambahkan hasil lainnya juga di sini
      ]);
    }
  };

  return (
    <div className="flex flex-col min-h-screen px-4 pt-4 pb-32 bg-white left-4 right-4 max-w-md mx-auto">
      {/* Header */}
      <div className="flex items-center space-x-2">
        <ChevronLeft className="w-5 h-5 text-green-900" />
        <h1 className="text-green-900 font-semibold text-lg">Tips</h1>
      </div>

      {/* Title */}
      <div className="mt-4 w-full">
        <h2 className="text-[32px] font-bold text-green-900 leading-snug">
          What to do with your<br />fruits & veggies?
        </h2>
      </div>

      {/* Rec Card */}
      <div className="mt-4">
        <RecCard
          searchInput={searchInput}
          setSearchInput={setSearchInput}
          selectedBadges={selectedBadges}
          setSelectedBadges={setSelectedBadges}
          onSearch={handleSearch}
        />
      </div>

      {/* Filter Buttons */}
        <div className="mt-4 flex gap-[25px]">
          <CustomButton
            variant="outline"
            isActive={activeTab === "cook"}
            onClick={() => setActiveTab("cook")}
          >
            How to Cook
          </CustomButton>

          <CustomButton
            variant="outline"
            isActive={activeTab === "store"}
            onClick={() => setActiveTab("store")}
          >
            How to Store
          </CustomButton>
        </div>

{searchResults.length > 0 && (activeTab === "cook" || activeTab === null) && (
  <div className="mt-4 space-y-3 w-[350px]">
    {searchResults.map((item, index) => (
      <div
        key={index}
        className="flex items-center p-4 rounded-xl shadow-sm bg-[#FFF1DD]"
      >
        <img
          src={item.image}
          alt={item.title}
          className="w-20 h-20 object-contain mr-4"
        />
        <div>
          <h3 className="font-semibold text-green-900 text-sm">
            {item.title}
          </h3>
          <div className="text-sm mt-1 space-y-[2px] text-green-900">
            <p>⏱ {item.freeze}</p>
            <p>🧊 {item.store}</p>
            <p>🌿 {item.ingredients}</p>
          </div>
        </div>
      </div>
    ))}
  </div>
)}



      {/* Bottom Nav */}
      <Navbar />
    </div>
  );
}
