import React, { useContext, useState, useEffect, createContext } from "react"
import { firebaseAuth } from "../Firebase/FirebaseConfig"; 
import { createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut, onAuthStateChanged} from "firebase/auth"

export const authContext = createContext({
    currentUser : null,
    signup : (email,password)=>{},
    signin : (email,password)=>{},
    signout : ()=>{}
});

export const authProvider = ()=>{
    return useContext(authContext);
};

