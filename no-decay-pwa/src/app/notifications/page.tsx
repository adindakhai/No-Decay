"use client";

import { ArrowLeft, X } from "lucide-react";
import { useRouter } from "next/navigation";
import { Navbar } from "@/components/ui/navbar";

interface Notification {
  id: string;
  title: string;
  message: string;
  date: string;
}

const mockNotifications: Notification[] = [
  {
    id: "1",
    title: "NO-DECAY - 3 Days Ago",
    message: "Makanan Anda di Container 01 akan kadaluarsa 5 hari lagi!! Lihat cara pengolahannya sekarang!!",
    date: "3 days ago"
  },
  {
    id: "2", 
    title: "NO-DECAY - 4 Days Ago",
    message: "Makanan Anda sudah kadaluarsa? Lihat rekomendasi pengolahan limbah makanan dari kami!!",
    date: "4 days ago"
  },
  {
    id: "3",
    title: "NO-DECAY - 5 Days Ago", 
    message: "Makanan Anda di Container 01 akan kadaluarsa 1 minggu lagi!! Lihat rekomendasi pengolahannya sekarang!!",
    date: "5 days ago"
  },
  {
    id: "4",
    title: "NO-DECAY - 7 Days Ago",
    message: "Makanan telah disimpan Container 03. Agar tahan lebih lama, lihat rekomendasi penyimpanan dari kami.",
    date: "7 days ago"
  }
];

export default function NotificationsPage() {
  const router = useRouter();

  return (
    <div className="min-h-screen bg-white p-5 pb-24">
      {/* Header */}
      <div className="flex flex-row items-center gap-x-11 mb-4">
        <button onClick={() => router.back()}>
          <ArrowLeft className="w-3.5 h-6 text-[#115437]" />
        </button>
        <h1 className="text-2xl font-bold text-[#115437]">Notification</h1>
      </div>

      {/* Title */}
      <h2 className="text-[32px] font-bold text-[#115437] mb-4">
        My Notifications
      </h2>

      {/* Notifications List */}
      <div className="flex flex-col gap-4">
        {mockNotifications.map((notification) => (
          <div
            key={notification.id}
            className="relative flex flex-row items-center p-4 gap-3 bg-[#FEF3E2] rounded-xl shadow-[0px_4px_15px_rgba(0,0,0,0.25)]"
          >
            <div className="flex flex-col gap-1 flex-1">
              <h3 className="text-base font-semibold text-[#1E1E1E]">
                {notification.title}
              </h3>
              <p className="text-base text-[#1E1E1E]">
                {notification.message}
              </p>
            </div>
            <button className="absolute -right-2 -top-2 w-9 h-9 flex items-center justify-center rounded-full">
              <X className="w-5 h-5 text-[#2C2C2C]" />
            </button>
          </div>
        ))}
      </div>
      <Navbar />
    </div>
  );
} 