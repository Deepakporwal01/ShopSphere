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
const [sortBy,setSortBy] = useState("");
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
console.log(dataresponse)
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

const sortByHandler =(e) => {
  const {value} = e.target;
  setSortBy(value);
  setData((prev) => {
    const sortedData = [...prev]; // Create a new array to avoid mutating the original state
    if (value === "asc") {
      sortedData.sort((a, b) => a.sellingPrice - b.sellingPrice);
    } else if (value === "des") {
      sortedData.sort((a, b) => b.sellingPrice - a.sellingPrice);
    }
    return sortedData; // Return the new sorted array
  });
};




  return (
    <div className='container max-h-[ 100vh]   mx-auto p-4'>
{/* ----desktop version ---- */}
<div className=' hidden lg:grid grid-cols-[200px,1fr]  gap-16   '>
{/* leftside  */}
<div className='bg-white p-2 max-h-[100vh]  overflow-y-hidden'>

 <div className=''>
  <h3 className='text-lg uppercse font-medium text-slate-500 border-b border-slate-500 pb-1'>Sort By</h3>

<form action="" className='text-sm flex flex-col  gap-2'>
 
<div className='flex  items-center gap-2'>
<input type="radio" name='sortBy' value={"asc"}  checked ={sortBy === "asc"} onChange={sortByHandler} />
<label htmlFor=""> Price-Low to High</label>
</div>
<div>
<input type="radio" name='sortBy'  checked ={sortBy === "des"} value={"des"} onChange={sortByHandler}/>
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
 
<div className=' max-h-[100vh]  overflow-y-auto '>
  { !loading && <VerticalSearchProduct loading={loading} data={data} />}
</div>


</div>


    </div>
  )
}
