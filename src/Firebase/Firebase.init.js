import { initializeApp } from "firebase/app";
import firebaseConfig from "./Firebase.config";

const initializeFirebase = () => {
    initializeApp(firebaseConfig)
};

export default initializeFirebase;

/* 
1. firebase.config.js
config with .env
2. firebase.init.js
const initializeFirebase = () => { initializeApp(firebaseconfig)}
3. Enable auth method
4. useFirebase hooks

*/