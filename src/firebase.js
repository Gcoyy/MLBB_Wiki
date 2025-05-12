// src/firebase.js
import { initializeApp } from "firebase/app";
// import { getAnalytics } from "firebase/analytics";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyBs1r_igom4xNY_MRt5DEUDNQ7b1YYWvbM",
  authDomain: "ccs8-5d882.firebaseapp.com",
  databaseURL: "https://ccs8-5d882-default-rtdb.asia-southeast1.firebasedatabase.app",
  projectId: "ccs8-5d882",
  storageBucket: "ccs8-5d882.appspot.com",
  messagingSenderId: "506331163309",
  appId: "1:506331163309:web:89ff8f55c975fe43817424",
  measurementId: "G-1Z5E3WN19H"
};

const app = initializeApp(firebaseConfig);
// const analytics = getAnalytics(app);
const db = getFirestore(app); 

export { db }; 
