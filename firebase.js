import { initializeApp } from "https://www.gstatic.com/firebasejs/12.1.0/firebase-app.js";

import { getFirestore } from "https://www.gstatic.com/firebasejs/12.1.0/firebase-firestore.js";

const firebaseConfig = {
  apiKey: "AIzaSyB2Ih1p8mGRipAU9kxI32YbRipbgjXCObE",
  authDomain: "typing-agung.firebaseapp.com",
  projectId: "typing-agung",
  storageBucket: "typing-agung.firebasestorage.app",
  messagingSenderId: "258640168758",
  appId: "1:258640168758:web:a8078f57e87c2709319597"
};

const app = initializeApp(firebaseConfig);

export const db = getFirestore(app);
