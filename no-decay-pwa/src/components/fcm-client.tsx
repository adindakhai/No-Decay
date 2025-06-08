"use client";

import { useEffect } from "react";
import { getToken, onMessage } from "firebase/messaging";
import { getFirebaseMessaging } from "@/lib/firebase"; // custom function kamu

export default function FCMClient() {
  useEffect(() => {
    const messaging = getFirebaseMessaging();

    // 💡 Jika messaging null, langsung keluar
    if (!messaging) {
      console.warn("⚠️ Firebase Messaging belum tersedia.");
      return;
    }

    // ✅ Minta izin notifikasi
    const requestPermissionAndToken = async () => {
      try {
        const permission = await Notification.requestPermission();
        if (permission !== "granted") {
          console.warn("❌ Notifikasi ditolak oleh user.");
          return;
        }

        const token = await getToken(messaging, {
          vapidKey: "BI7o7NvnQloBCdGVcWcjigRxydaAafwhCd1brUG23-0CKDTD0USZkkNkCNWb7NSo8QaprdXWdsb3NRs2hGcBgVc", // ganti punyamu
        });

        if (token) {
          console.log("✅ Token device:", token);
        } else {
          console.warn("⚠️ Token tidak tersedia.");
        }
      } catch (error) {
        console.error("❌ Gagal ambil token:", error);
      }
    };

    requestPermissionAndToken();

    // ✅ Tangani notifikasi saat foreground
    const unsubscribe = onMessage(messaging, (payload) => {
      console.log("📩 Notifikasi masuk:", payload);

      const { title, body } = payload.notification ?? {};

      if (Notification.permission === "granted" && title && body) {
        new Notification(title, {
          body,
          icon: "/icon512_rounded.png",
        });
      }
    });

    return () => unsubscribe();
  }, []);

  return null;
}
