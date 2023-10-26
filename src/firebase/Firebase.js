import { initializeApp } from "firebase/app";

import {getFirestore,collection} from "firebase/firestore"

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: process.env.REACT_APP_API_KEY,
  authDomain: "filmy-duniya-99915.firebaseapp.com",
  projectId: "filmy-duniya-99915",
  storageBucket: "filmy-duniya-99915.appspot.com",
  messagingSenderId: "429365770314",
  appId: "1:429365770314:web:978763fb2e2e5bf2b20eb3"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);


export const db = getFirestore(app)
export const moviesRef = collection(db,"movies");
export const reviewsRef = collection(db,"reviews");
export const usersRef = collection(db, "users");
export default app;