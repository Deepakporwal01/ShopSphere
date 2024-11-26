import {SummaryApi} from "../common/index.js"
import {toast} from "react-toastify"
 export const addToCart = async(e,id)=>{
 e.stopPropagation();
e.preventDefault();

 const response = await fetch (SummaryApi.addtoCart.url,{
    method:SummaryApi.addtoCart.method,
    credentials:'include',
    headers:{
        "content-type" :"application/json"
    },
    body:JSON.stringify(
        {
            productId:id
        }
    )
 })
 const dataApi = await response.json();

 if(dataApi.success){
    toast.success("Product Added to cart Successfully")
 }
if(dataApi.error){
    toast.error(dataApi.message )
}
}