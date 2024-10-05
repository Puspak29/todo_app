import React, { useContext, useState, useEffect, createContext } from "react"
import { firebaseAuth } from "../Firebase/FirebaseConfig"; 
import { createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut, onAuthStateChanged} from "firebase/auth"

export const authContext = createContext({
    user : null,
    signup : (email,password)=>{},
    signin : (email,password)=>{},
    signout : ()=>{}
});

export const useAuth = ()=>{
    return useContext(authContext);
};

export const authProvider=authContext.Provider

