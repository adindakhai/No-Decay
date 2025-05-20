"use client";

import { usePathname, useRouter } from "next/navigation";
import { cn } from "@/lib/utils";
import { Bell, LayoutGrid, Lightbulb, Users } from "lucide-react";

export function Navbar() {
  const pathname = usePathname();
  const router = useRouter();

  const navItems = [
    { icon: LayoutGrid, path: "/dashboard" },
    { icon: Bell, path: "/notifications" },
    { icon: Lightbulb, path: "/tips" },
    { icon: Users, path: "/profile" },
  ];

  return (
    <nav className="fixed bottom-6 left-4 right-4 max-w-md mx-auto bg-green-900 rounded-[12px] px-6 py-4 flex justify-center gap-x-15 text-white z-50 shadow-[0_10px_20px_rgba(0,0,0,0.25)]">
      {navItems.map(({ icon: Icon, path }, i) => {
        const isActive =
          pathname === path || (pathname === "/recommendation" && path === "/dashboard");

        return (
          <button
            key={i}
            onClick={() => router.push(path)}
            className="relative flex flex-col items-center justify-center w-10 h-10"
          >
            {isActive && (
              <div className="absolute -top-4 w-13 h-2 rounded-b-full bg-[#FFE9A0] shadow-[0px_4px_15px_rgba(0,0,0,0.7)]" />
            )}
            <Icon
              className={cn(
                "w-6 h-6 transition-colors",
                isActive ? "text-[#FFE9A0]" : "text-white"
              )}
            />
          </button>
        );
      })}
    </nav>
  );
}
