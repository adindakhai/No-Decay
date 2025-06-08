importScripts("https://www.gstatic.com/firebasejs/10.12.0/firebase-app-compat.js");
importScripts("https://www.gstatic.com/firebasejs/10.12.0/firebase-messaging-compat.js");

firebase.initializeApp({
  apiKey: "AIzaSyDOGRZOrf9otySMGaUd3MqmnCcrjAruNlA",
  authDomain: "no-decay.firebaseapp.com",
  projectId: "no-decay",
  storageBucket: "no-decay.firebasestorage.app",
  messagingSenderId: "94151802510",
  appId: "1:94151802510:web:1f628bec51a95bbf9d53df",
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
