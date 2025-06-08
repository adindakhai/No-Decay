importScripts("https://www.gstatic.com/firebasejs/10.12.0/firebase-app-compat.js");
importScripts("https://www.gstatic.com/firebasejs/10.12.0/firebase-messaging-compat.js");

firebase.initializeApp({
  apiKey: "AIzaSyDebXqOGMQ3G6jCLpXZMCwr4Y2C2Qu-M0s",
  authDomain: "no-decay-6d09c.firebaseapp.com",
  projectId: "no-decay-6d09c",
  storageBucket: "no-decay-6d09c.firebasestorage.app",
  messagingSenderId: "1019354028791",
  appId: "1:1019354028791:web:61e92b65ff5590e15551f2",
  measurementId: "G-35T5WVJSJ2"
});

const messaging = firebase.messaging();

messaging.onBackgroundMessage(function (payload) {
  console.log("[firebase-messaging-sw.js] Background message ", payload);

  const notificationTitle = payload.notification?.title || "No Title";
  const notificationOptions = {
    body: payload.notification?.body || "No Body",
    icon: "/icon512_rounded.png", // ← ganti sesuai file kamu di public/
  };

  // ✅ Ini yang wajib ada agar notifikasi muncul
  self.registration.showNotification(notificationTitle, notificationOptions);
});
