import { getStorage } from "firebase/storage";
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";


const firebaseConfig = {
  apiKey: "AIzaSyDvwQ5Yu_zegF7l1TGd25jwsP-ZHOW45Co",
  authDomain: "netfix-db.firebaseapp.com",
  projectId: "netfix-db",
  storageBucket: "netfix-db.appspot.com",
  messagingSenderId: "101463350452",
  appId: "1:101463350452:web:af9b9482e53393d7590be1",
  measurementId: "G-YT3PNQ4RFH"
};


const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
export const auth = getAuth(app);
const storage = getStorage(app);
const db = getFirestore(app);

export { storage, db };