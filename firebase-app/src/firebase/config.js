// Import the functions you need from the SDKs you need
import firebase from "firebase/app";
import "firebase/firestore"

const firebaseConfig = {
  apiKey: "AIzaSyD8ueQObD0uJzozhOmqlGm_hQamM4c1kLs",
  authDomain: "curso-react-4f158.firebaseapp.com",
  projectId: "curso-react-4f158",
  storageBucket: "curso-react-4f158.appspot.com",
  messagingSenderId: "315773456601",
  appId: "1:315773456601:web:861c4b58c97a5098dc2ec8",
  measurementId: "G-J6GENTP3CY"
};

// Initialize Firebase
const app = firebase.initializeApp(firebaseConfig);
const firestore = app.firestore();

export {app, firestore}