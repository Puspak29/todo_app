import { useContext, createContext } from "react"

export const authContext = createContext({
    user : null,
    signup : (email,password)=>{},
    signin : (email,password)=>{},
    signout : ()=>{}
});

export const useAuth = ()=>{
    return useContext(authContext);
};

export const AuthProvider=authContext.Provider