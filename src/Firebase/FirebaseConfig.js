import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth"
import { getFirestore } from "firebase/firestore"

const firebaseConfig = {
    apiKey: "AIzaSyBThxO8kENKtyYOaoqlouCV0HVRrpSdCqA",
    authDomain: "todo-list-114a1.firebaseapp.com",
    projectId: "todo-list-114a1",
    storageBucket: "todo-list-114a1.appspot.com",
    messagingSenderId: "617928941694",
    appId: "1:617928941694:web:c5c3665db731fa9a9cb82f",
    measurementId: "G-LHY8MVTYNT"
};

const firebaseApp = initializeApp(firebaseConfig);
const firebaseAuth = getAuth(firebaseApp);
const db = getFirestore(firebaseApp);

export { 
    firebaseAuth,
    db 
};