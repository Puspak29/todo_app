import React from 'react'

function LoginCard(props) {
  return (
    <div>
        <h3>{props.name}</h3>
        <input type="text" placeholder='Enter Your Email' />
        <input type="password" placeholder='Password' />
        <button>{props.name}</button>
    </div>
  )
}

export default LoginCard
