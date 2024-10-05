import React, { useState } from 'react'
import PopUp from './PopUp';

function Test() {

    const [openPopup, setOpenPopup] = useState(false);
    const HandleRemovePopUp = () => setOpenPopup(false);

  return (
    <div >
      <div>
        <button
          onClick={() => setOpenPopup(true)}
          className='text-white bg-blue-800 border-black rounded-lg px-3 py-1 hover:bg-blue-900'
         >
          click me
        </button>
      </div>
      <div className='w-full p-5 flex justify-center items-center'>
        <PopUp openPopUp={openPopup} closePopUp={HandleRemovePopUp} />
      </div>
    </div>

  )
}

export default Test
