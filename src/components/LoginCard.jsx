import React, { useState } from 'react'
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword } from "firebase/auth";
import { AuthProvider } from '../contexts';

function LoginCard() {
  const auth = getAuth();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [user, setUser] = useState(null);

  return (
    <AuthProvider value={{user}}>
    <div
      className='flex justify-center items-center flex-col gap-y-3 bg-white p-5 rounded-lg shadow-lg h-60 w-80'
    >
      <h3 className='text-xl font-bold'>SignIn/SignUp</h3>
      <input
        className='w-full border border-black rounded-lg px-3 outline-none duration-150 bg-white py-1.5'
        onChange={(e) => setEmail(e.target.value)}
        type="email" placeholder='E-Mail' />

      <input
        className='w-full border border-black rounded-lg px-3 outline-none duration-150 bg-white py-1.5'
        onChange={(e) => setPassword(e.target.value)}
        type="password" placeholder='Password' />

      <div className="flex justify-center px-3 gap-2">
        <button
          className='text-white bg-blue-800 border-black rounded-lg px-3 py-1 hover:bg-blue-900'
          onClick={() => {

            signInWithEmailAndPassword(auth, email, password)
              .then((userCredential) => {
                // Signed in 
                setUser(userCredential.user.email);
                console.log("user", user)
                // ...
              })
              .catch((error) => {
                const errorCode = error.code;
                const errorMessage = error.message;
              });
          }}
        >SignIn</button>
        <button

          className='text-white bg-blue-800 border-black rounded-lg px-3 py-1 hover:bg-blue-900'
          onClick={() => {

            createUserWithEmailAndPassword(auth, email, password)
              .then((userCredential) => {
                // Signed up 
                const user = userCredential.user;
                console.log("user", user)
                // ...
              })
              .catch((error) => {
                const errorCode = error.code;
                const errorMessage = error.message;
                // ..
              });
          }}
        >SignUp</button>
      </div>
    </div>
    </AuthProvider>
  )
}

export default LoginCard
