import firebase from "firebase/app";
import "firebase/auth";
import "firebase/firestore";
import "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyDPKM1p_u0iCinT6b5BoqC821K4FVhk_pc",
  authDomain: "portfolio-board.firebaseapp.com",
  projectId: "portfolio-board",
  storageBucket: "portfolio-board.appspot.com",
  messagingSenderId: "334002615976",
  appId: "1:334002615976:web:115b823ffd25adca50749d",
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);

export const firebaseInstance = firebase;

export const authService = firebase.auth();
export const dbService = firebase.firestore();
export const storageService = firebase.storage();
