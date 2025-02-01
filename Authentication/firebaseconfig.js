import { initializeApp } from "https://www.gstatic.com/firebasejs/11.1.0/firebase-app.js";
import { getAuth } from "https://www.gstatic.com/firebasejs/11.1.0/firebase-auth.js";

const firebaseConfig = {
  apiKey: "AIzaSyCDK6xb5Q3mXQn1vysQluQwanFFXaxXQoM",
  authDomain: "batch-12-saylani.firebaseapp.com",
  projectId: "batch-12-saylani",
  storageBucket: "batch-12-saylani.firebasestorage.app",
  messagingSenderId: "16623225297",
  appId: "1:16623225297:web:09b34842dbbcb09c9478f0",
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);