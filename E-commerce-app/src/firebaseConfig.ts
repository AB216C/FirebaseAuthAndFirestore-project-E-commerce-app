import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
import { getAuth } from 'firebase/auth';

const firebaseConfig = {
  apiKey:import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: "e-commerce-firebase-app-3319a.firebaseapp.com",
  projectId: "e-commerce-firebase-app-3319a",
  storageBucket: "e-commerce-firebase-app-3319a.firebasestorage.app",
  messagingSenderId: "154779788627",
  appId: "1:154779788627:web:ced09eb8a26456945c6da6"
};

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const auth = getAuth(app);

