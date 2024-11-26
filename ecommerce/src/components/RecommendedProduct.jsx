import React, { useEffect, useRef, useState, useContext } from "react";
import { fetchCategoryWiseProduct } from "../helpers/fetchCategoryWiseProduct.js";
import { displayINRCurrency } from "../helpers/displayCurrency.js";
import { Link } from "react-router-dom";
import { addToCart } from "../helpers/addToCart.js";
import Context from "../context/index.js";

export default function RecommendedProduct ({ category, heading }) {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const loadingList = new Array(13).fill(null);
  const { fetchUserAddToCart } = useContext(Context);
 

  const handleAddtoCart = async (e, id) => {
    await addToCart(e, id);
    fetchUserAddToCart();
  };

  const fetchData = async () => {
    setLoading(true);
    const dataresponse = await fetchCategoryWiseProduct(category);
    setLoading(false);
    setData(dataresponse?.data || []);
  };

 
  useEffect(() => {
    fetchData();
  }, [category]);

  return (
    <div className="container mx-2 md:mx-8 my-6 relative">
      <h2 className="text-xl font-semibold py-2">{heading}</h2>
      <div className="relative">
        {/* Scrollable container */}
      
        <div
          
          className="flex gap-6 overflow-x-auto no-scrollbar scroll-smooth flex-wrap items-center justify-center "
        >
          {loading
            ? loadingList.map((_, index) => (
                <div
                  className="w-full min-w-[280px] md:min-w-[320px] md:max-w-[320px] max-w-[280px] bg-white rounded-sm shadow"
                  key={index}
                >
                  <div className="bg-slate-200 h-48 p-2 min-w-[280px] md:min-w-[145px] flex items-center flex-wrap justify-center animate-pulse"></div>
                  <div className="p-4 grid gap-3 w-full">
                    <h2 className="font-medium text-base md:text-lg text-ellipsis p-1 w-full bg-slate-200 animate-pulse line-clamp-1 text-black"></h2>
                    <p className="capitalize text-slate-500 p-1 w-full bg-slate-200 animate-pulse"></p>
                    <div className="flex gap-2">
                      <p className="text-red-600 font-medium p-1 w-full bg-slate-200 animate-pulse"></p>
                      <p className="text-slate-500 line-through p-1 w-full bg-slate-200 animate-pulse"></p>
                    </div>
                    <button className="text-white px-3 py-2 rounded-full p-1 w-full bg-slate-200 animate-pulse"></button>
                  </div>
                </div>
              ))
            : data.map((product, index) => (
                <Link
                  to={"/product-details/" + product?._id}
                  className="w-full min-w-[280px] md:min-w-[320px] md:max-w-[320px] max-w-[280px] bg-white rounded-sm shadow"
                  key={product?._id || index}
                >
                  <div className="bg-slate-200 h-48 p-2 min-w-[280px] md:min-w-[145px] flex items-center justify-center flex-wrap overflow-hidden">
                    <img
                      src={product.productImage[0]}
                      alt={product?.productName}
                      className="object-scale-down h-full p-2 hover:scale-110 transition-all mix-blend-multiply"
                    />
                  </div>
                  <div className="p-4 grid gap-3">
                    <h2 className="font-medium text-base md:text-lg text-ellipsis line-clamp-1 text-black">
                      {product?.productName}
                    </h2>
                    <p className="capitalize text-slate-500">{product?.category}</p>
                    <div className="flex gap-2">
                      <p className="text-red-600 font-medium">
                        {displayINRCurrency(product?.sellingPrice)}
                      </p>
                      <p className="text-slate-500 line-through">
                        {displayINRCurrency(product?.price)}
                      </p>
                    </div>
                    <button
                      onClick={(e) => handleAddtoCart(e, product?._id)}
                      className="bg-red-600 hover:bg-red-700 text-white px-3 py-2 rounded-full"
                    >
                      Add to cart
                    </button>
                  </div>
                </Link>
              ))}
        </div>
      
      </div>
    </div>
  );
}
