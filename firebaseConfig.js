import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyDfoEteLtSrKKVT737e9BCpKo3C8vIFCyE",
  authDomain: "recipeapp-23f53.firebaseapp.com",
  projectId: "recipeapp-23f53",
  storageBucket: "recipeapp-23f53.firebasestorage.app",
  messagingSenderId: "429828481513",
  appId: "1:429828481513:web:ff070612c09e5db8e3eb78",
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
export const storage = getStorage(app);
