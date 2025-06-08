import admin from "firebase-admin";
import { prisma } from "./prisma"
// Cegah inisialisasi ulang (wajib di Next.js)
if (!admin.apps.length) {
  admin.initializeApp({
    credential: admin.credential.cert({
      projectId: process.env.FIREBASE_PROJECT_ID,
      clientEmail: process.env.FIREBASE_CLIENT_EMAIL,
      privateKey: process.env.FIREBASE_PRIVATE_KEY?.replace(/\\n/g, "\n"),
    }),
  });
}

/**
 * Mengirim push notification ke 1 token device
 */
export async function sendFCMNotification(
  token: string,
  message: { title: string; body: string }
) {
  try {
    await admin.messaging().send({
      token,
      notification: {
        title: message.title,
        body: message.body,
      },
    });

    // Simpan ke DB
    await prisma.notification.create({
      data: {
        title: message.title,
        message: message.body,
      },
    });

    console.log("✅ Notifikasi dikirim & disimpan:", message.title);
  } catch (error) {
    console.error("❌ Gagal kirim notifikasi:", error);
  }
}

