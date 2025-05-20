"use client";

import { ChevronLeft, Bell, LayoutGrid, Lightbulb, Users } from "lucide-react";
import { usePathname, useRouter } from "next/navigation";
import { cn } from "@/lib/utils";
import { CustomButton } from "@/components/ui/custom-button";
import { Navbar } from "@/components/ui/navbar";
import { RecCard } from "@/components/ui/rec-card";

export default function TipsPage() {
  const pathname = usePathname();
  const router = useRouter();

  const navItems = [
    { icon: Bell, path: "/notifications" },
    { icon: LayoutGrid, path: "/dashboard" },
    { icon: Lightbulb, path: "/tips" },
    { icon: Users, path: "/profile" },
  ];

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
        <RecCard />
      </div>

      {/* Buttons */}
      <div className="mt-4 flex gap-[25px]">
        <CustomButton variant="outline">How to Cook</CustomButton>
        <CustomButton variant="outline">How to Store</CustomButton>
      </div>

      {/* Bottom Nav */}
      <Navbar />
    </div>
  );
}