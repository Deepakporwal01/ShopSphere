import React from 'react'
import { IoIosClose } from "react-icons/io";
export default function Displayimage({imageUrl,onClose}) {
  return (
    <div className='fixed  top-0 bottom-0 left-0 right-0  flex justify-center items-center    '>

<div className='bg-white shadow-lg rounded max-w-6xl mx auto'>

<div  div className='text-3xl w-fit ml-auto hover:text-red-600  cursor-pointer' onClick={onClose}>
<IoIosClose/> 
</div>
<div className=' flex justify-center  items-center p-4   max-w-[80vw] max-h-[80vh]'>

<img src={imageUrl} alt ="" />
</div>

</div>

    </div>
  
  )
}
