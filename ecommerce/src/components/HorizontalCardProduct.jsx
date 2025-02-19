import React, { useContext, useEffect, useRef, useState } from "react";
import { fetchCategoryWiseProduct } from "../helpers/fetchCategoryWiseProduct.js";
import { displayINRCurrency } from "../helpers/displayCurrency.js";
import { FaAngleLeft } from "react-icons/fa6";
import { FaAngleRight } from "react-icons/fa6";
import {Link} from "react-router-dom"
import {addToCart} from "../helpers/addToCart.js"
import Context from "../context/index.js";
export default function HorizontalCardProduct({ category, heading }) {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const loadingList = new Array(13).fill(null);

const {fetchUserAddToCart} = useContext(Context)

const handleAddtoCart = async(e,id)=>{
await addToCart(e,id)
 fetchUserAddToCart()
}


  const scrollElement = useRef();
  const fetchData = async () => {
    setLoading(true);
    const dataresponse = await fetchCategoryWiseProduct(category);
   setLoading(false)

    setData(dataresponse?.data);
  };

  useEffect(() => {
    fetchData();
  }, []);

  const scrollRight = () => {
    scrollElement.current.scrollLeft += 300;
  };
  const scrollLeft = () => {
    scrollElement.current.scrollLeft -= 300;
  };

  return (
    <div className="container mx-2 md:mx-8 my-6 realtive ">
      <h2 className="text-xl font-semibold py-2">{heading}</h2>
      <div
        className="flex items-center gap-4 md:gap-6 overflow-scroll scrollbar transition-all "
        ref={scrollElement}
      >
        <button
          className="  hidden md:block bg-white shadow-md rounded-full p-2 absolute left-0 text-xl"
          onClick={scrollRight}
        >
          {" "}
          <FaAngleLeft />
        </button>
        <button
          onClick={scrollLeft}
          className="hidden md:block bg-white shadow-md rounded-full p-2 absolute right-0 text-xl"
        >
          <FaAngleRight />
        </button>
        {loading ? (
           

  loadingList.map((product ,index)=>{
return(

  <div
  className="w-full  min-w-[280px] md:min-w-[320px] md:max-w-[320px] max-w-[280px]  h-36 bg-white rounded-sm shadow  flex"
  key={index}
>
  <div className="bg-slate-200 h-full p-2 min-w-[120px] md:min-w-[145px]  animate-pulse  ">
   
  </div>

  <div className="p-4   grid w-full gap-4  ">
    <h2 className="font-medium text-base md:text-lg text-ellipsis line-clamp-1 bg-slate-200 animate-pulse text-black w-full p-1">
      
    </h2> 
    <p className=" capitalize text-slate-500 w-full p-1 bg-slate-200   ">
      
    </p>
    <div className="flex gap-1"> 
      <p className=" text-red-600  font-medium w-full p-1 bg-slate-200 animate-pulse">
        
      </p>
      <p className=" text-slate-500 line-through w-full p-1 bg-slate-200 animate-pulse">
        
      </p>
    </div>
    <button className="  text-white px-3 py-2 rounded-full w-full p-1 bg-slate-200 animate-pulse">
     
    </button>
  </div>
</div>


)

  })
        ) : (
          data?.map((product, index) => {
         
            return (
              <Link to ={"product-details/"+product?._id}
            
                className="w-full  min-w-[280px] md:min-w-[320px] md:max-w-[320px] max-w-[280px]  h-36 bg-white rounded-sm shadow  flex"
                key={index}
              >
                <div className="bg-slate-200 h-full p-2 min-w-[120px] md:min-w-[145px]">
                  <img
                    src={product.productImage[0]}
                    alt=""
                    className=" object-scale-down h-full p-2 hover:scale-110 transition-all mix-blend-multiply"
                  />
                </div>

                <div className="p-4  grid ">
                  <h2 className="font-medium text-base md:text-lg text-ellipsis line-clamp-1  text-black">
                    {product?.productName}
                  </h2>
                  <p className=" capitalize text-slate-500 ">
                    {product?.category}
                  </p>
                  <div className="flex gap-1">
                    <p className=" text-red-600  font-medium">
                      {displayINRCurrency(product?.sellingPrice)}
                    </p>
                    <p className=" text-slate-500 line-through">
                      {displayINRCurrency(product?.price)}
                    </p>
                  </div>
                  <button onClick ={(e)=>{handleAddtoCart(e,product?._id)}} className=" bg-red-600 hover:bg-red-700 text-white px-3 py-2 rounded-full">
                    Add to cart
                  </button>
                </div>
              </Link>
            );
          })
        )}
      </div>
    </div>
  );
}
