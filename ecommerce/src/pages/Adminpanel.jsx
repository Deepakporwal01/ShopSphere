import React from 'react'
import { FaRegUserCircle } from "react-icons/fa";
import { useSelector } from 'react-redux';
import { Outlet, Link } from 'react-router-dom';
 
 
export default function Adminpanel() {

    const user = useSelector(state => state?.user?.user);
   
  return (
    //  parent div for admin panel 
  <div className='min-h-[calc(100vh-80px)] md:flex hidden bg-slate-200'> 


<aside className='bg-white  w-full min-h-full  max-w-60 '>


<div className=' h-32 flex justify-center items-center flex-col '>
<div className='text-3xl cursor-pointer' >
<FaRegUserCircle />
</div>
  <p className=' capitalize text-lg text-black font-semibold'> {user?.firstname} {user?.lastname} </p>  
 <p>{user?.role}</p>
  
</div>

<div className=''>
<nav className='grid p-4'>
   <Link to="all-users" className=' px-2 py-1 hover:bg-slate-100'>All Users</Link>
   <Link to="all-products" className=' px-2 py-1 hover:bg-slate-100'>All Products</Link>
  
</nav>

</div>

</aside>

<main className='w-full h-full p-2'>
 
<Outlet/> 
</main>

 
  </div>




  )
}

