"use client";

import { useEffect, useState } from "react";
import { ArrowLeft, X } from "lucide-react";
import { useRouter } from "next/navigation";
import { Navbar } from "@/components/ui/navbar";

interface Notification {
  id: string;
  title: string;
  message: string;
  createdAt: string;
}

export default function NotificationsPage() {
  const router = useRouter();
  const [notifications, setNotifications] = useState<Notification[]>([]);

  useEffect(() => {
    const fetchNotifications = async () => {
      try {
        const res = await fetch("/api/notifications");
        const data = await res.json();
        setNotifications(data);
      } catch (error) {
        console.error("❌ Gagal fetch notifikasi:", error);
      }
    };

    fetchNotifications();
  }, []);

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
        {notifications.map((notification) => (
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
              <span className="text-sm text-[#999]">
                {new Date(notification.createdAt).toLocaleString("en-US", {
                  day: "2-digit",
                  month: "short",
                  hour: "2-digit",
                  minute: "2-digit",
                })}
              </span>
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
