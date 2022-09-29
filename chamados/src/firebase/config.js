// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.10.0/firebase-app.js";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAidR-G11a3HE8krI-JGHLDm7On6rGiyic",
  authDomain: "chamados-8463e.firebaseapp.com",
  projectId: "chamados-8463e",
  storageBucket: "chamados-8463e.appspot.com",
  messagingSenderId: "87120157137",
  appId: "1:87120157137:web:31987c89f249f290c568f0",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const firestore = app.firestore();
const auth = app.auth();

export { firestore, auth };
