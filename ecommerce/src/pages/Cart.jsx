import React, { useContext, useEffect, useState } from "react";
import { SummaryApi } from "../common";
import Context from "../context";
import { displayINRCurrency } from "../helpers/displayCurrency";
import { MdDelete } from "react-icons/md";
import { Link } from "react-router-dom";
import { addToCart } from "../helpers/addToCart";

export default function Cart() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const context = useContext(Context);
  const loadingList = new Array(context.countCartProducts).fill(null);

  // Fetch cart data
  const fetchData = async () => {
    try {
      setLoading(true);
      const response = await fetch(SummaryApi.viewCart.url, {
        method: SummaryApi.viewCart.method,
        headers: {
          "content-type": "application/json",
        },
        credentials: "include",
      });
      const dataApi = await response.json();

      if (dataApi?.success) {
        setData(dataApi?.data);
      }
    } catch (error) {
      console.error("Error fetching cart data:", error);
    } finally {
      setLoading(false);
    }
  };

  // Increment product quantity
  const incCart = async (id, qty) => {
    try {
      const response = await fetch(SummaryApi.updateaddtoCart.url, {
        method: SummaryApi.updateaddtoCart.method,
        credentials: "include",
        headers: {
          "content-type": "application/json",
        },
        body: JSON.stringify({
          _id: id,
          quantity: qty + 1,
        }),
      });
      const responseData = await response.json();

      if (responseData.success) {
        fetchData();
      }
    } catch (error) {
      console.error("Error incrementing cart quantity:", error);
    }
  };

  // Decrement product quantity
  const decCart = async (id, qty) => {
    try {
      const response = await fetch(SummaryApi.updateaddtoCart.url, {
        method: SummaryApi.updateaddtoCart.method,
        credentials: "include",
        headers: {
          "content-type": "application/json",
        },
        body: JSON.stringify({
          _id: id,
          quantity: qty > 1 ? qty - 1 : qty,
        }),
      });
      const responseData = await response.json();

      if (responseData.success) {
        fetchData();
      }
    } catch (error) {
      console.error("Error decrementing cart quantity:", error);
    }
  };

  const removefromcartHandler = async (id) => {
    try {
      if (!id) {
        console.error("Product ID is missing");
        return;
      }

      const response = await fetch(SummaryApi.removefromCart.url, {
        method: SummaryApi.removefromCart.method,
        credentials: "include",
        headers: {
          "content-type": "application/json",
        },
        body: JSON.stringify({ _id: id }),
      });

      const responseData = await response.json();

      if (responseData.success) {
        fetchData();
        context.fetchUserAddToCart();
        // Refresh the cart after successful removal
      } else {
        console.error("Failed to remove item from cart:", responseData.message);
      }
    } catch (err) {
      console.error("Error removing item from cart:", err);
    }
  };
  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div className="container mx-auto">
      <div className="text-center text-lg my-3">
        {data?.length === 0 && !loading && (
          <p className="bg-white py-5">Nothing To See Here</p>
        )}
        <div className="flex flex-col lg:flex-row justify-between items-start lg:items-stretch">
          {/* View Products */}
          <div className="w-full max-w-3xl">
            {loading
              ? loadingList.map((_, index) => (
                  <div
                    key={index}
                    className="w-full bg-slate-200 h-32 my-2 border border-slate-300 animate-pulse rounded"
                  ></div>
                ))
              : data.map((product, index) => (
                  <div
                    key={index}
                    className="bg-white h-35 my-2 border   border-slate-300 rounded flex"
                  >
                    {/* Product Image */}
                    <Link
                      className="bg-black"
                      to={"/product-details/" + product?.productId._id}
                    >
                      <div className="w-32 h-35 p-2 bg-slate-200">
                        <img
                          src={product?.productId?.productImage[0]}
                          alt=""
                          className="w-full h-full object-scale-down mix-blend-multiply"
                        />
                      </div>
                    </Link>
                    {/* Product Details */}
                    <div className="px-4 py-2  place-items-start grid w-full relative  ">
                      <div
                        className="absolute cursor-pointer right-0 text-red-500 rounded-full p-2 hover:bg-red-600 hover:text-white"
                        onClick={() => removefromcartHandler(product?._id)}
                      >
                        <MdDelete />
                      </div>
                      <h2 className="text-lg lg:text-lg text-ellipsis line-clamp-1">
                        {product?.productId?.productName}
                      </h2>
                      <p className="capitalize text-slate-500">
                        {product?.productId?.category}
                      </p>
                      <p className="text-red-600">
                        {displayINRCurrency(product?.productId?.sellingPrice)}
                      </p>

                      {/* Cart Buttons */}
                      <div className="flex gap-2 justify-center items-center">
                        <button
                          className="border border-red-600 text-red-600 hover:bg-red-600 hover:text-white w-6 h-6 flex justify-center items-center"
                          onClick={() =>
                            decCart(product?._id, product?.quantity)
                          }
                        >
                          -
                        </button>
                        <span>{product?.quantity}</span>
                        <button
                          className="border border-red-600 text-red-600 hover:bg-red-600 hover:text-white w-6 h-6 flex justify-center items-center"
                          onClick={() =>
                            incCart(product?._id, product?.quantity)
                          }
                        >
                          +
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
          </div>

          {/* Total Product Calculation */}
          <div className="mt-5 lg:mt-0 w-full max-w-sm lg:ml-4 flex flex-col gap-10">
            {loading ? (
              <div className="h-36 bg-slate-200 border border-slate-300 animate-pulse"></div>
            ) : (
              <div className="bg-white p-4 border border-slate-300 rounded">
                <h2 className=" bg-red-500">Summary</h2>
                <div className=" flex justify-around">
                  <p>quantity</p>
                  <p>{context.countCartProducts}</p>
                </div>
                <div className=" flex justify-around">
                  <h3 className="text-lg font-semibold">Total price</h3>
                  <p>
                    {displayINRCurrency(
                      data.reduce(
                        (total, product) =>
                          total +
                          product.quantity * product.productId.sellingPrice,
                        0
                      )
                    )}
                  </p>
                </div>
                <div className=" bg-blue-600 cursor-pointer"  >Payment</div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
