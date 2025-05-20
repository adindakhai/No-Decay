import Image from "next/image";
import { cn } from "@/lib/utils";

export default function SplashScreen() {
  return (
    <div
      className={cn(
        "relative h-screen w-full",
        "bg-gradient-to-b from-[#FFF9E4] to-[#FFE9A0]"
      )}
    >
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
        <div className="relative w-48 h-48 mb-2">
          <Image
            src="/image/LOGO.svg"
            alt="No-Decay Logo"
            fill
            className="object-contain"
          />
        </div>
      </div>
      <p className="absolute bottom-8 w-full text-center text-green-900 font-semibold text-lg">
        Manage Efficiently!
      </p>
    </div>
  );
}