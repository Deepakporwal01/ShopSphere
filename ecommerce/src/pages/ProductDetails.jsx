import React, { useEffect, useState } from "react";
import { SummaryApi } from "../common";
import { Navigate, useNavigate, useParams } from "react-router-dom";
import { FaStar } from "react-icons/fa";
import { FaStarHalf } from "react-icons/fa";
import { displayINRCurrency } from "../helpers/displayCurrency.js";
import { addToCart } from "../helpers/addToCart.js";
import { useContext } from "react";
import Context from "../context/index.js"; 

export default function ProductDetails() {
  const { fetchUserAddToCart } = useContext(Context); 
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const productImageLoadingList = new Array(4).fill(null);
  const handleAddtoCart = async (e, id) => {
    await addToCart(e, id);
    fetchUserAddToCart();
    // Call helper function to add the product to the cart
  };

  const handleBuyProduct = async (e, id) => {
    await addToCart(e, id);
    fetchUserAddToCart();
    navigate("/cart")
    // Call helper function to add the product to the cart
  };

  const [data, setData] = useState({
    productName: "  ",
    brandName: " ",
    category: " ",
    productImage: [],
    description: " ",
    price: " ",
    sellingPrice: " ",
  });
  const [active, setActive] = useState("");
  const params = useParams();
  const fetchData = async () => {
    setLoading(true);
    const response = await fetch(SummaryApi.get_productdetails.url, {
      method: SummaryApi.get_productdetails.method,
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify({
        productId: params?.id,
      }),
    });
    setLoading(false);
    const dataApi = await response.json();
    setData(dataApi.data);
    setActive(dataApi?.data?.productImage[0]);
  };
  useEffect(() => {
    fetchData();
  }, []);

  const MouseHoverHandler = (imgUrl) => {
    setActive(imgUrl);
  };
  return (
   
    <div className="container mx-auto p-4 ">

{loading ? (
 <div className=" min-h-[200px]  flex flex-col lg:flex-row gap-4">
 <div className="h-96 flex gap-4  flex-col  lg:flex-row-reverse">
   <div className=" h-[300px] w-[300px] lg:h-96 lg:w-96 bg-slate-200 animate-pulse">
     <img
      
       alt=""
       className=" mix-blend-multiply object-scale-down w-full h-full "
     />
   </div>

   <div className=" h-full ">
     {loading ? (
       <div className=" flex gap-4 lg:flex-col overflow-scroll scrollbar animate-pulse">
         {productImageLoadingList.map((el, index) => {
           return (
             <div
               className="h-20 w-20 bg-slate-200 rounded "
               key={"loading...."}
             ></div>
           );
         })}
       </div>
     ) : (
       <div className="flex gap-2 lg:flex-col overflow-scroll scrollbar h-full ">
         {data.productImage.map((image, index) => {
           return (
             <div
               className="h-20 w-20 bg-slate-200 rounded  cursor-pointer"
               key={image}
               onMouseEnter={() => {
                 MouseHoverHandler(image);
               }}
               onClick={() => {
                 MouseHoverHandler(image);
               }}
             >
               <img
            
                 
                 className=" h-full w-full object-scale-down mix-blend-multiply"
               />
             </div>
           );
         })}
       </div>
     )}
   </div>
 </div>

 {/* product Details
  */}

 <div className="flex flex-col gap-1">
   <p className="bg-slate-200 w-full p-1 h-4 animate-pulse text-red-600 px-2 rounded-full  capitalize ">
    
   </p>
   <h2 className="text-2xl lg:text-4xl font-semibold bg-slate-200 w-full p-1 h-6 animate-pulse">
     
   </h2>
   <p className="text-slate-400 capitalize bg-slate-200 w-full p-1 h-6 animate-pulse"> </p>

   <div className="flex text-red-600  items-center gap-1">
      
   </div>
   <div className=" flex gap-2 font-medium text-2xl lg:text-3xl bg-slate-200 w-full p-1 h-6 animate-pulse">
     <p className="text-red-60  bg-slate-200 w-full p-1 h-6 animate-pulse ">
       
     </p>
     <p className=" line-through text-slate-400 bg-slate-200 w-full p-1 h-6 animate-pulse ">
        
     </p>
   </div>

   <div className=" flex gap-2 py-2">
     <button className="bg-slate-200 w-full p-1 h-4 animate-pulse" >
       {" "}
     </button>
     <button className="bg-slate-200 w-full p-1 h-4 animate-pulse">
      
     </button>
   </div>

   <div>
     <p className="text-slate-600 font-md my-2">Description :</p>
     <p className="bg-slate-200 w-full p-1 h-4 animate-pulse"> </p>
   </div>
 </div>
</div>
):(
    <div className=" min-h-[200px]  flex flex-col lg:flex-row gap-4">
    <div className="h-96 flex gap-4  flex-col  lg:flex-row-reverse">
      <div className=" h-[300px] w-[300px] lg:h-96 lg:w-96 bg-slate-200 ">
        <img
          src={active}
          alt=""
          className=" mix-blend-multiply object-scale-down w-full h-full "
        />
      </div>

      <div className=" h-full">
        {loading ? (
          <div className=" flex gap-4 lg:flex-col overflow-scroll scrollbar animate-pulse">
            {productImageLoadingList.map((el, index) => {
              return (
                <div
                  className="h-20 w-20 bg-slate-200 rounded "
                  key={"loading...."}
                ></div>
              );
            })}
          </div>
        ) : (
          <div className="flex gap-2 lg:flex-col overflow-scroll scrollbar h-full items-center justify-center ">
            {data.productImage.map((image, index) => {
              return (
                <div
                  className="h-20 w-20 bg-slate-200 rounded  cursor-pointer"
                  key={image}
                  onMouseEnter={() => {
                    MouseHoverHandler(image);
                  }}
                  onClick={() => {
                    MouseHoverHandler(image);
                  }}
                >
                  <img
                    src={image}
                    alt=""
                    className=" h-full w-full object-scale-down mix-blend-multiply flex items-center justify-center "
                  />
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>

    {/* product Details
     */}

    <div className="flex flex-col p-2 gap-1">
      <p className="bg-red-200  text-red-600 px-2 rounded-full  capitalize w-fit">
        {data.brandName}
      </p>
      <h2 className="text-2xl lg:text-4xl font-semibold">
        {data?.productName}
      </h2>
      <p className="text-slate-400 capitalize">{data?.category}</p>
      <div className="flex text-red-600  items-center gap-1">
        <FaStar />
        <FaStar />
        <FaStar />
        <FaStar />
        <FaStarHalf />
      </div>
      <div className=" flex gap-2 font-medium text-2xl lg:text-3xl">
        <p className="text-red-600 ">
          {displayINRCurrency(data?.sellingPrice)}
        </p>
        <p className=" line-through text-slate-400  ">
          {displayINRCurrency(data?.price)}
        </p>
      </div>

      <div className=" flex gap-2 py-2">
        <button  onClick={(e)=>{handleBuyProduct(e,  params?.id)}} className=" border-2 border-red-600 rounded px-3 py-1 min-w-[120px] text-red-600 hover:bg-red-600 hover:text-white">
          Buy{" "}
        </button>
        <button  onClick={(e)=>{handleAddtoCart(e,  params?.id)}} className=" border-2 border-red-600 rounded px-3 py-1 min-w-[120px] text-white bg-red-600  hover:bg-white hover:text-red-600">
          Add to cart
        </button>
      </div>

      <div>
        <p className="text-slate-600 font-md my-2">Description :</p>
        <p>{data?.description}</p>
      </div>
    </div>
  </div>
)}
      {/* product image */}
     
    </div>
  );
}
