import React, { useEffect, useState } from 'react'
import { useLocation } from 'react-router-dom'
import { SummaryApi } from '../common';
import { scrolltoTop } from '../helpers/scrolltoTop';
import VerticalSearchProduct from '../components/VerticalSearchProduct';

export default function Searchproduct() {

    const query = useLocation();
    console.log("query",query.search);
    const [searchdata,setSearchdata] = useState([]);

    const [loading,setLoading] = useState(false);
    const Searchproduct = async()=>{
      setLoading(true);
const response =await fetch(SummaryApi.searchProduct.url+query.search);
const dataresponse = await response.json();
console.log("dataresponse",dataresponse);
 setSearchdata(dataresponse.data);
 setLoading(false);
    }
    useEffect(()=>{
Searchproduct();

    },[query])

  return (
    <div className='container mx-auto p-4'> 
    {
      loading  && (
        <p className='text-lg text-center'> loading...</p>
      )
    }
 <p className='font-semibold my-2 '>Search Result : {searchdata.length}</p>
 {
  searchdata.length===0 && !loading && (
    <p className='bg-white text-lg text-center'> No data Found</p>
  ) 
 }

{
    searchdata.length!==0 && !loading &&(
<VerticalSearchProduct loading = {loading } data ={searchdata}/>
    )

}

    </div>

  )
}
