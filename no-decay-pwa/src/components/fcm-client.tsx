"use client";

import { useEffect } from "react";
import { getToken, onMessage } from "firebase/messaging";
import { getFirebaseMessaging } from "@/lib/firebase";

export default function FCMClient() {
  useEffect(() => {
    const messaging = getFirebaseMessaging();

    if (!messaging) {
      console.warn("⚠️ Firebase Messaging belum tersedia.");
      return;
    }

    const requestPermissionAndRegister = async () => {
      try {
        const permission = await Notification.requestPermission();
        if (permission !== "granted") {
          console.warn("❌ Notifikasi ditolak oleh user.");
          return;
        }

        const token = await getToken(messaging, {
          vapidKey: "BLS-t9-5AjzvFEZ31zbOE9bLUQZwfQUc8A6p-k9th2tL0od9OyjIYhebrooMMEef1PwHTJbFRsz8iibNhM2URxg", // ganti dengan punyamu
        });

        if (token) {
          console.log("✅ Token device:", token);

          // Kirim ke backend untuk disimpan
          await fetch("/api/fcm/register", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ token }),
          });
        } else {
          console.warn("⚠️ Token kosong / tidak tersedia.");
        }
      } catch (error) {
        console.error("❌ Gagal ambil atau kirim token:", error);
      }
    };

    requestPermissionAndRegister();

    // Tangani notifikasi saat browser aktif
    const unsubscribe = onMessage(messaging, (payload) => {
      console.log("📩 Notifikasi masuk:", payload);

      const { title, body } = payload.notification ?? {};

      if (Notification.permission === "granted" && title && body) {
        new Notification(title, {
          body,
          icon: "/icon512_rounded.png", // pastikan file ini ada di public/
        });
      }
    });

    return () => unsubscribe();
  }, []);

  return null;
}
