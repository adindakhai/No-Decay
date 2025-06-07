"use client";

import { ChevronLeft } from "lucide-react";
import { useRouter } from "next/navigation";
import { CustomButton } from "@/components/ui/custom-button";
import { Navbar } from "@/components/ui/navbar";
import { RecCard } from "@/components/ui/rec-card";
import { useState } from "react";
import { Recommendation } from "../../../types/types";
import  Image from "next/image";

export default function TipsPage() {
  const router = useRouter();

  const [activeTab, setActiveTab] = useState<"cook" | "store" | null>(null);
  const [searchInput, setSearchInput] = useState("");
  const [selectedBadges, setSelectedBadges] = useState<string[]>([]);
  const [searchResults, setSearchResults] = useState<Recommendation[]>([]);

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
      ]);
    }
  };

  return (
    <div className="min-h-screen bg-white flex flex-col">
      <div className="w-full max-w-md mx-auto px-4 flex flex-col flex-1 pt-4 pb-32">
        {/* Header */}
        <div className="flex items-center space-x-2 w-full">
          <ChevronLeft 
            className="w-5 h-5 text-green-900 cursor-pointer" 
            onClick={() => router.push('/')} 
          />
          <h1 className="text-green-900 font-semibold text-lg">Tips</h1>
        </div>

        {/* Title */}
        <div className="mt-4 w-full">
          <h2 className="text-2xl md:text-[32px] font-bold text-green-900 leading-snug">
            What to do with your<br />fruits & veggies?
          </h2>
        </div>

        {/* Rec Card */}
        <div className="mt-4 w-full">
          <RecCard
            searchInput={searchInput}
            setSearchInput={setSearchInput}
            selectedBadges={selectedBadges}
            setSelectedBadges={setSelectedBadges}
            onSearch={handleSearch}
          />
        </div>

        {/* Filter Buttons */}
        <div className="mt-4 flex flex-wrap gap-2 md:gap-[25px] w-full">
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

        {/* Search Results Section */}
        {searchResults.length > 0 && (
          <div className="mt-6 w-full">
            <div className="flex items-center justify-between mb-2 w-full">
              <h3 className="text-green-900 font-semibold text-lg">Recommendation</h3>
              <button className="text-green-900 font-bold text-base">See All</button>
            </div>
            <div className="flex flex-col gap-4 w-full">
              {searchResults.map((item, index) => (
                <div
                  key={index}
                  className="flex w-full bg-[#FFF1DD] rounded-2xl p-4 shadow-sm gap-4 items-center"
                >
                  <Image
                    src={item.image}
                    alt={item.title}
                    className="w-20 h-20 object-contain flex-shrink-0"
                  />
                  <div className="flex-1">
                    <h4 className="font-bold text-green-900 text-lg mb-1">{item.title}</h4>
                    <div className="text-green-900 text-base flex flex-col gap-1">
                      <div className="flex items-center gap-2"><span role='img' aria-label='timer'>⏱</span> {item.freeze}</div>
                      <div className="flex items-center gap-2"><span role='img' aria-label='frozen'>🧊</span> {item.store}</div>
                      <div className="flex items-center gap-2"><span role='img' aria-label='ingredients'>🌿</span> {item.ingredients}</div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
      <Navbar />
    </div>
  );
}
