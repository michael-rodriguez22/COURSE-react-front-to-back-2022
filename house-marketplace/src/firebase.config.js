import { initializeApp } from "firebase/app"
import { getFirestore } from "firebase/firestore"

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCAD7S-XiuX17Nl9YFpmPPuSdwfGbrtv5I",
  authDomain: "house-marketplace-1441e.firebaseapp.com",
  projectId: "house-marketplace-1441e",
  storageBucket: "house-marketplace-1441e.appspot.com",
  messagingSenderId: "38071860995",
  appId: "1:38071860995:web:a0d3ba6bf806d01595b336",
}

// Initialize Firebase
initializeApp(firebaseConfig)
export const db = getFirestore()
