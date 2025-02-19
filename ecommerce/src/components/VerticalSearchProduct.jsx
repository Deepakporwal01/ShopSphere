import React, { useContext } from "react";
import { displayINRCurrency } from "../helpers/displayCurrency";
import { FaAngleLeft, FaAngleRight } from "react-icons/fa";
import { addToCart } from "../helpers/addToCart";
import Context from "../context";
import { Link, useParams } from "react-router-dom";

export default function VerticalSearchProduct({ loading, data = [] }) {
  const loadingList = new Array(13).fill(null);
const param = useParams();
  const { fetchUserAddToCart } = useContext(Context);

  // Function to handle adding a product to the cart
  const handleAddtoCart = async (e, id) => {
    await addToCart(e, id); // Call helper function to add the product to the cart
    fetchUserAddToCart(); // Refresh cart state
  };

  return (
    <div className="flex   items-center   flex-wrap   md:gap-6 overflow-hidden    ">
      {/* Conditional rendering based on loading state */}
      {loading ? (
        loadingList.map((_, index) => {
          // Render loading placeholders
          return (
            <div
              className="w-full min-w-[150px] md:min-w-[380px] md:max-w-[340px] max-w-[200px] bg-red-600 rounded-sm shadow"
              key={index}
            >
              {/* Product card skeleton */}
              <div className="bg-slate-200 h-48 p-2 min-w-[280px] md:min-w-[145px] flex items-center justify-center animate-pulse"></div>
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
          );
        })
      ) : (
        data.map((product, index) => {
          // Render actual product cards
       
          return (
            <Link
              to={"/search/product-details/" + product?._id}
              className=" w-full  min-w-[150px] md:min-w-[300px] md:max-w-[300px] max-w-[200px]  "
              key={index}
            >
              <div className="bg-slate-200 h-48 p-2   md:min-w-[145px]  flex items-center justify-center">
                <img
                  src={product.productImage[0]}
                  alt={product?.productName || "Product Image"}
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
          );
        })
      )}
    </div>
  );
}
