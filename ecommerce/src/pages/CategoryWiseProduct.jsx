import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { productCategory } from '../helpers/productCategory';
import VerticalSearchProduct from '../components/VerticalSearchProduct';
import { SummaryApi } from '../common';
export default function CategoryWiseProduct() {
  const params = useParams();
   const [data,setData] = useState();
const [loading,setLoading] = useState(false);
const [selectCategory,setSelectCategory] = useState({});
const[filterCategoryList,setFilterCategoryList] = useState([]);
const fetchData = async()=>{
const response = await fetch(SummaryApi.filterproduct.url,{
  method:SummaryApi.filterproduct.method,
  headers:{
    "content-type":"application/json",
  },
  body:
   JSON.stringify({
    category:filterCategoryList,
   })
})
const dataresponse = await response.json();
setData(dataresponse?.data || []); 
}
 
const handleSelectCategory =(e)=>{
  const {name,value,checked} = e.target;
   setSelectCategory((prev)=>{
    return{
      ...prev,
      [value] :checked
    }
   })
}
useEffect(()=>{fetchData()},[filterCategoryList]);
useEffect(()=>{
const arraysOfCategory = Object.keys(selectCategory).map(categorykeyName=>{
 if(selectCategory[categorykeyName]){
  return categorykeyName
 }
 return null

}).filter(el=>el)
 setFilterCategoryList(arraysOfCategory);
},[selectCategory])

  return (
    <div className='container mx-auto p-4'>
{/* ----desktop version ---- */}
<div className=' hidden lg:grid grid-cols-[200px,1fr]'>
{/* leftside  */}
<div className='bg-white p-2 min-h-[calc(100vh-120px)]  overflow-y-auto'>

 <div className=''>
  <h3 className='text-lg uppercse font-medium text-slate-500 border-b border-slate-500 pb-1'>Sort By</h3>

<form action="" className='text-sm flex flex-col  gap-2'>
 
<div className='flex  items-center gap-2'>
<input type="radio" name='sortBy'  />
<label htmlFor=""> Price-Low to High</label>
</div>
<div>
<input type="radio" name='sortBy'  />
<label htmlFor=""> Price-High to Low</label>
</div>
</form>
 </div>

{/* filterby */}

<div className=''>
  <h3 className='text-lg uppercse font-medium text-slate-500 border-b border-slate-500 pb-1'>Category</h3>

<form action="" className='text-sm flex flex-col  gap-2'>
 {

  productCategory.map((categoryName,index)=>{
    return(
      <div className='flex items-center gap-3'>
        <input onChange={ handleSelectCategory}  value={ categoryName?.value} type="checkbox" name={"category"} id={categoryName.id} checked={selectCategory[categoryName?.value]}/>
        <label htmlFor={categoryName.value}>{categoryName?.label}</label>
      </div>
    )
  })
 }
 

</form>


 </div>


</div>
{/* right side  */}
 
<div>
  { !loading && <VerticalSearchProduct loading={loading} data={data} />}
</div>


</div>


    </div>
  )
}
