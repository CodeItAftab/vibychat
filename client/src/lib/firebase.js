import { initializeApp } from "firebase/app";
import { getMessaging } from "firebase/messaging";
// import { getAnalytics } from "firebase/analytics";

const firebaseConfig = {
  apiKey: "AIzaSyBSr5dwTifArnM6ZROJUej0zm_xhWjYieg",
  authDomain: "viby-chat-b4f3d.firebaseapp.com",
  projectId: "viby-chat-b4f3d",
  storageBucket: "viby-chat-b4f3d.firebasestorage.app",
  messagingSenderId: "843532868764",
  appId: "1:843532868764:web:7f75cc0f1e6d01373e2159",
  measurementId: "G-K4ETC46D4C",
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
// export const analytics = getAnalytics(app);
export const messaging = getMessaging(app);
