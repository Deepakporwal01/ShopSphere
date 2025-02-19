import React, { useEffect, useRef, useState, useContext } from "react"; 
// Import React along with hooks for managing state, side effects, refs, and context
import { fetchCategoryWiseProduct } from "../helpers/fetchCategoryWiseProduct.js"; 
// Function to fetch products based on category
import { displayINRCurrency } from "../helpers/displayCurrency.js"; 
// Utility to format prices in INR
import { FaAngleLeft, FaAngleRight } from "react-icons/fa6"; 
// Import icons for scrolling
import { Link } from "react-router-dom"; 
// Link component for navigation
import { addToCart } from "../helpers/addToCart.js"; 
// Helper function to add a product to the cart
import Context from "../context/index.js"; 
// Import application context for global state
export default function VerticalCardProduct({ category, heading }) {
  // Component accepts `category` (product category) and `heading` (section title) as props
  const [data, setData] = useState([]); 
  // State to store the fetched product data
  const [loading, setLoading] = useState(false); 
  // State to manage loading state
  const loadingList = new Array(13).fill(null); 
  // Array to simulate loading placeholders
  const { fetchUserAddToCart } = useContext(Context); 
  // Access a context method to refresh the cart state
  // Function to handle adding a product to the cart
  const handleAddtoCart = async (e, id) => {
    await addToCart(e, id); // Call helper function to add the product to the cart
    fetchUserAddToCart(); // Refresh cart state
  };
  const scrollElement = useRef(); 
  // Create a reference for the scrollable product container
  // Function to fetch products for the given category
  const fetchData = async () => {
    setLoading(true); // Start loading
    const dataresponse = await fetchCategoryWiseProduct(category); // Fetch data using helper
    setLoading(false); // Stop loading
    setData(dataresponse?.data); // Update product data state
  };

  useEffect(() => {
    fetchData(); // Fetch data on component mount
  }, []);

  // Function to scroll the product container to the right
  const scrollRight = () => {
    scrollElement.current.scrollLeft += 300;
  };

  // Function to scroll the product container to the left
  const scrollLeft = () => {
    scrollElement.current.scrollLeft -= 300;
  };

  return (
    <div className="container mx-2 md:mx-8 my-6 realtive">
      {/* Section container with margin and padding */}
      <h2 className="text-xl font-semibold py-2">{heading}</h2>
      {/* Section heading */}
      <div
        className="flex items-center gap-4 md:gap-6 overflow-scroll scrollbar transition-all"
        ref={scrollElement}
      >
        {/* Scrollable product container */}

        {/* Left scroll button (visible only on medium+ screens) */}
        <button
          className="hidden md:block bg-white shadow-md rounded-full p-2 absolute left-0 text-xl"
          onClick={scrollRight}
        >
          <FaAngleLeft />
        </button>

        {/* Right scroll button */}
        <button
          onClick={scrollLeft}
          className="hidden md:block bg-white shadow-md rounded-full p-2 absolute right-0 text-xl"
        >
          <FaAngleRight />
        </button>

        {/* Conditional rendering based on loading state */}
        {loading ? (
          loadingList.map((product, index) => {
            // Render loading placeholders
            return (
              <div
                className="w-full min-w-[280px] md:min-w-[320px] md:max-w-[320px] max-w-[280px] bg-white rounded-sm shadow"
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
                to={"/product-details/" + product?._id}
                className="w-full min-w-[280px] md:min-w-[320px] md:max-w-[320px] max-w-[280px] bg-white rounded-sm shadow"
                key={index}
              >
                <div className="bg-slate-200 h-48 p-2 min-w-[280px] md:min-w-[145px] flex items-center justify-center">
                  <img
                    src={product.productImage[0]}
                    alt=""
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
                    onClick={(e) => {
                      handleAddtoCart(e, product?._id);
                    }}
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
    </div>
  );
}
