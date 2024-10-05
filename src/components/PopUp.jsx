import React from 'react'
import { LoginCard } from './index.js'

function PopUp({ openPopUp, closePopUp }) {
    const handlelosePopUp = (e) => {
        if (e.target.id === 'ModelContainer') {
          closePopUp();
        }
    }
  return (openPopUp !== true)? null : 
  (
    <div id='ModelContainer'
    className='fixed inset-0 bg-black flex justify-center items-center bg-opacity-20 backdrop-blur-sm'
    onClick={handlelosePopUp}
    >
      <LoginCard />
    </div>
  )
}

export default PopUp
