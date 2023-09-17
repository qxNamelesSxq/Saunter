import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyDzmso9Xo-AeMGKBvuyowlTiO676j3R87s",
  authDomain: "test--map-62e0d.firebaseapp.com",
  projectId: "test--map-62e0d",
  storageBucket: "test--map-62e0d.appspot.com",
  messagingSenderId: "833142357658",
  appId: "1:833142357658:web:586114b7b8302b7dbc2923",
  measurementId: "G-G1S61XY4VT",
};

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
