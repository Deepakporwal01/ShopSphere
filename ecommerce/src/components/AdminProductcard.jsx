import React from 'react'
import { useState } from 'react';
import { MdEdit } from "react-icons/md";
import AdminEditcard from './AdminEditProduct';
import { displayINRCurrency } from '../helpers/displayCurrency';
export default function AdminProductcard({data}) {
  const [editProduct, setEditProduct] = useState(false);
  
  return (
    <div className='bg-white p-4 rounded '>

<div className='max-w-28  line-clamp-2 text-ellipsis overflow-hidden ' >

<div className=' flex justify-center items-center w-32 h-32 '>
<img className ='  object-contain h-full mr-4 ' src={data?.productImage[0]} alt=""  width={100} height={100}/>
</div>


<h2 className=' '>{data?.productName}</h2>

</div>
<p className='font-semibold'>
{
   displayINRCurrency(data?.price)
}

</p>

<div className='w-fit ml-auto p-2 bg-green-100 hover:bg-green-600 rounded-full hover:text-white cursor-pointer' onClick={()=>{setEditProduct(true)}}>
<MdEdit/>
</div>

{
  editProduct && (<AdminEditcard productdata={data} onClose={()=>{setEditProduct(false)}} />)
}
    </div>
  )
}
