import React from 'react'

function LoginCard() {
  return (
    <div
    className='flex justify-center items-center flex-col gap-y-3 bg-white p-5 rounded-lg shadow-lg h-60 w-80'
    >
        <h3 className='text-xl font-bold'>SignIn/SignUp</h3>
        <input 
        className='w-full border border-black rounded-lg px-3 outline-none duration-150 bg-white py-1.5'
        type="email" placeholder='E-Mail' />

        <input
        className='w-full border border-black rounded-lg px-3 outline-none duration-150 bg-white py-1.5'
        type="password" placeholder='Password' />
        
        <div className="flex justify-center px-3 gap-2">
          <button
          className='text-white bg-blue-800 border-black rounded-lg px-3 py-1 hover:bg-blue-900'
          >SignIn</button>
          <button
          className='text-white bg-blue-800 border-black rounded-lg px-3 py-1 hover:bg-blue-900'
          >SignUp</button>
        </div>
    </div>
  )
}

export default LoginCard
