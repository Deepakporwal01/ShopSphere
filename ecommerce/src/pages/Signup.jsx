import React from 'react'
import loginImage from '../assest/signin.gif';
import { FaEye } from "react-icons/fa";
import { FaEyeSlash } from "react-icons/fa";
import { Link } from 'react-router-dom';
import { useState } from 'react';
import imagetoBase64 from '../helpers/imagetoBase64';
import { SummaryApi } from '../common';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
const Signup = () => {
  const navigate = useNavigate();
    const [showpassword ,setshowpassword] = useState(false);
    const [confirmpassword,setConfirmpassword] = useState(false);
    const [data,setData] = useState(
      {
        firstname :"",
        lastname :"",
        email : "" ,
        password :"",
       confirmpassword :"",
   profilepic :"",
    
      }
    
    )
     
    const handlechange =(e)=>{
    const {name,value} = e.target;
    
    setData ((prev)=>{
      return {
    ...prev,
    [name] :value
      }
    })
    
    }
    const handleUploadPic = async (e)=>{
      const file = e.target.files[0];
      const base64 = await imagetoBase64(file);
       
       setData((prev)=>{
        return {
      
        ...prev,
        profilepic: base64,
      
        }
      }
       )
          }
    
   const handlesubmit =  async (e)=> {
    e.preventDefault();
if(data.password === data.confirmpassword){
  const dataResponse = await fetch(SummaryApi.signUp.url,{
    method:SummaryApi.signUp.method,
    headers:{
      "content-type":"application/json",
    },
    body:JSON.stringify(data)
  })
  const dataapi = await dataResponse.json();
 
   if(dataapi.success){
    toast.success(dataapi.message)
    navigate("/login")
   }
  if(dataapi.error){
    toast.error(dataapi.message);
  }
 
}
else{
  console.log("password and confirm password  does not match")
}
    
    }
     
    
      return (
        <section id='login'>
     <div  className=' mx-auto container  p-4'>
        
     <div className='w-full  bg-red-300 max-w-md p-2 mx-auto '>
    <div className=' w-20 h-20 mx-auto relative'> 
<div>
<img src={loginImage} alt="" />
</div>
 
 <form action="">

<label htmlFor="">
<div className=' text-xs bg-slate-200 text-center pt-2 absolute bottom-0 w-full   bg-opacity-75 rounded-full cursor-pointer overflow-hidden'>
  Upload photo

  </div>
  <input  type="file" 
   className=' '
    name='profilepic' 
    onChange={handleUploadPic}
    required
    />

</label>

 </form>

    </div>
    
    <form action="" onSubmit={handlesubmit}>
    
    <div className='grid mt-4 '> 
    
    <label htmlFor=""> First Name</label>
    
    <div className=''>
    <input type="text" 
    className='w-full  outline-none h-8 rounded-sm' 
    placeholder='Enter Your First Name'
    name= "firstname"
    value={data.firstname} 
    onChange={handlechange}
    required
    />
    </div>
    
    </div>

    <div className='grid'> 
    
    <label htmlFor="">Last Name</label>
    
    <div className=''>
    <input type="text" 
    className='w-full  outline-none h-8 rounded-sm' 
    placeholder=' Enter Your LastName '
    name= "lastname"
    value={data.lastname} 
    onChange={handlechange}
    required
    />
    </div>
    
    </div>
    
    <div className='grid'> 
    
    <label htmlFor="">Email</label>
    
    <div className=''>
    <input type="text" 
    className='w-full  outline-none h-8 rounded-sm' 
    placeholder='Enter Email '
    name= "email"
    value={data.email} 
    onChange={handlechange}
    required
    />
    </div>
    
    </div>
    
    <div>
    
    <label htmlFor="">Password</label>
    
    <div  className='flex relative'>
    <input className=' w-full  outline-none   h-8 rounded-sm' 
    type={showpassword ? "text" :"password"} 
    name= "password"
    value={data.password} 
    onChange={handlechange}
    placeholder='Enter Password'
    required
    />
    
    <div className=' cursor-pointer' onClick={()=>setshowpassword((prev)=>!prev)}> 
    <span className='absolute right-2 top-2  text-lg flex justify-center items-center ' > 
      
      {showpassword ? ( <FaEyeSlash />):(<FaEye />)}
    
      </span>
    
    </div>
    
    
    </div>

    </div>


    <div>
    
    <label htmlFor=""> Confirm Password</label>
    
    <div  className='flex relative'>
    <input className=' w-full  outline-none   h-8 rounded-sm' 
    type={ confirmpassword? "text" :"password"} 
    name= "confirmpassword"
    value={data.confirmpassword} 
    onChange={handlechange}
    placeholder='Enter Confirm Password' 
    required
    />
    
    <div className=' cursor-pointer' onClick={()=>setConfirmpassword((prev)=>!prev)}> 
    <span className='absolute right-2 top-2  text-lg flex justify-center items-center ' > 
      
      {confirmpassword ? ( <FaEyeSlash />):(<FaEye />)}
    
      </span>
    
    </div>
    
    
    </div>

    </div>


    <button className='  bg-red-600 px-6 py-2 w-full max-w-[150px] rounded-full hover:scale-110 transition-all  mx-auto block my-4'>Signup</button>


    </form>
    <div className=' flex gap-2'>
      <p>Already have an account?</p>
      <Link  className ='hover:underline hover:text-red-600' to={"/login"}>login</Link>
    </div>
    
          </div>
    
        </div>
    
        </section>
       
      )
 
}

export default Signup
