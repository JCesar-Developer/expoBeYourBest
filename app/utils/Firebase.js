import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
    apiKey: "AIzaSyAS48gCWpy2bWViH4mJr6tvRc08qVljPEg",
    authDomain: "be-yourbest.firebaseapp.com",
    projectId: "be-yourbest",
    storageBucket: "be-yourbest.appspot.com",
    messagingSenderId: "279894496325",
    appId: "1:279894496325:web:df59aeecf3d8153cfb7f2c"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export default {
    app,
    db
} 
