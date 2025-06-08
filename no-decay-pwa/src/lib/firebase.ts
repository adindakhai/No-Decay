import { initializeApp } from "firebase/app";
import { getMessaging, Messaging } from "firebase/messaging";
import { firebaseConfig } from "./firebase-config";

const app = initializeApp(firebaseConfig);


export function getFirebaseMessaging(): Messaging | null {
  if (typeof window !== "undefined" && "serviceWorker" in navigator) {
    return getMessaging(app);
  }
  return null;
}
