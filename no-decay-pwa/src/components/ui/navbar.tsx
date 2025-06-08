"use client";

import { usePathname, useRouter } from "next/navigation";
import { cn } from "@/lib/utils";
import { Bell, LayoutGrid, Lightbulb, Users } from "lucide-react";

export function Navbar() {
  const pathname = usePathname();
  const router = useRouter();

  const navItems = [
    { icon: LayoutGrid, path: "/" },
    { icon: Bell, path: "/notifications" },
    { icon: Lightbulb, path: "/recommendation" },
    { icon: Users, path: "/profile" },
  ];

  return (
    <nav
      className={cn(
        "fixed bottom-4 left-4 right-4 z-50 bg-green-900 shadow-[0_4px_15px_rgba(0,0,0,0.25)] rounded-[12px] py-3 px-4 flex justify-between items-center md:justify-center md:gap-x-[35px] max-w-screen-md mx-auto"
      )}
    >
      {navItems.map(({ icon: Icon, path }, i) => {
        const isActive =
          pathname === path || (pathname === "/" && path === "/");

        return (
          <button
            key={i}
            onClick={() => router.push(path)}
            className={cn(
              "relative flex flex-col items-center justify-center w-12 h-12 transition-colors",
              "md:w-10 md:h-10"
            )}
          >
            {isActive && (
              <div
                className={cn(
                  "absolute -top-3 w-10 h-1.5 rounded-b-full bg-[#FFE9A0] shadow-[0px_4px_15px_rgba(0,0,0,0.7)]",
                  "md:-top-4 md:w-[53px] md:h-[5px]"
                )}
              />
            )}
            <Icon
              className={cn(
                "w-5 h-5 md:w-6 md:h-6 transition-colors",
                isActive ? "text-[#FFE9A0]" : "text-white"
              )}
            />
          </button>
        );
      })}
    </nav>
  );
}
