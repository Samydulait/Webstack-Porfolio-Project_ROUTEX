import firebase from "firebase/app";
import "firebase/auth";

const config = {
    apikey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY, 
    authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
    projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID     // This how you access any env. variable in both node and inside of the web
}


export default function initFirebase() {    // Initialize the initfirebase
  if (!firebase.apps.length) {
    firebase.initializeApp(config);
  }
}


