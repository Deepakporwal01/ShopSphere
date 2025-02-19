import React, { useState } from "react";
 

import { IoIosClose } from "react-icons/io";
import { productCategory } from "../helpers/productCategory";
import { FaCloudUploadAlt } from "react-icons/fa";
import { uploadImage } from "../helpers/uploadImage";
import Displayimage from "../components/Displayimage";
import { MdDelete } from "react-icons/md";
import { SummaryApi } from "../common";
import { toast } from "react-toastify";

export default function AdminEditcard({ onClose , productdata}) {

  const [data, setData] = useState(productdata)
  
  const [openfullScreenImage, setOpenFullScreenimage] = useState(false);
  const [fullScreenImage, setFullScreenImage] = useState("");

  const handleUploadProduct = async (e) => {
    const file = e.target.files[0];
    const uploadCloudinary = await uploadImage(file);

    setData((prev) => {
      return {
        ...prev,
        productImage: [...prev.productImage, uploadCloudinary.url],
      };
    });
  };

  const handleDeleteProductImage = async (index) => {
    console.log("Imaeg index", index);
    const newProductImage = [...data.productImage];
    newProductImage.splice(index, 1);

    setData((prev) => {
      return {
        ...prev,
        productImage: [...newProductImage],
      };
    });
  };
  const changeHandler = (e) => {
    const { name, value } = e.target;
    setData((prev) => {
      return {
        ...prev,
        [name]: value,
      };
    });
  };
  const submitHandler = async (e) => {
    e.preventDefault();
  
    const dataResponse = await fetch(SummaryApi.update_product.url, {
      method: SummaryApi.update_product.method,
      credentials: "include",
      headers: { "content-type": "application/json" },
      body: JSON.stringify(data),
    });

    const dataApi = await dataResponse.json();
    if (dataApi.success) {
      toast.success("Product Updated Successfully");
      onClose();
    }
    if (dataApi.error) {
      toast.error(dataApi.message);
    }
    console.log("product data ", dataApi);
  };

  return (
    <div className=" fixed flex justify-center items-center w-full h-full right-0 left-7  bg-slate-100 bottom-0 top-10  bg-opacity-40">
      <div className="bg-white p-4 rounded w-full max-w-2xl h-full max-h-[80%] border shadow-md  overflow-hidden  ">
        <div className="flex justify-between items-center">
          <h2 className=" font-bold text-lg ">Edit Product</h2>
          <div
            onClick={onClose}
            className="  w-fit text-3xl  ml-auto hover:text-red-600 cursor-pointer"
          >
            {" "}
            <IoIosClose />
          </div>
        </div>
        <form
          action=""
          className=" grid gap-2  overflow-y-scroll h-full pb-4"
          onSubmit={submitHandler}
        >
          <label >Product Name :</label>
          <input
            type="text"
            id="productName"
            name="productName"
            placeholder="Enter Product Name"
            value={data.productName}
            onChange={changeHandler}
            className="p-2 bg-slate-100 border rounded "
            required
          />
          <label htmlFor="brandName">Brand Name :</label>
          <input
            type="text"
            id="brandName"
            name="brandName"
            placeholder="Enter Brand  Name"
            value={data.brandName}
            onChange={changeHandler}
            className="p-2 bg-slate-100 border rounded "
            required
          />
          <label htmlFor="brandName" className="">
            Category :
          </label>
          <select
            value={data.category}
            required
            className="p-2 bg-slate-100 border rounded "
            name="category"
            id="category"
            onChange={changeHandler}
          >
            <option value={""}>Select Category </option>
            {productCategory.map((el, index) => {
              return (
                <option value={el.value} key={index + el.id}>
                  {el.label}
                </option>
              );
            })}
          </select>
          <label htmlFor="productImage" > Product Image :</label>
          
            <div className="p-2 bg-slate-100 border rounded h-36 w-full flex justify-center  items-center  ">
              <div className="text-slate-500 flex flex-col justify-center items-center cursor-pointer">
                <span className="text-4xl">
                  {" "}
                  <FaCloudUploadAlt />
                </span>
                <p>Upload Product Image</p>
                <input
                
                  className="hidden"
                  type="file"
                  name="productImage"
                  id="productImage"
                  onChange={handleUploadProduct}
                  // required
                />
              </div>
            </div>
           

          <div>
            {data?.productImage[0] ? (
              <div className="flex items-center gap-2">
                {data.productImage.map((el, index) => {
                  return (
                    <div className=" relative group ">
                      <img
                        src={el}
                        alt={el}
                        width={80}
                        height={80}
                        className=" bg-slate-100 border cursor-pointer "
                        onClick={() => {
                          setOpenFullScreenimage(true);
                          setFullScreenImage(el);
                        }}
                      />

                      <div
                        onClick={() => {
                          handleDeleteProductImage(index);
                        }}
                        className=" cursor-pointer absolute bottom-0 right-0    hidden text-white rounded-full bg-red-600 group-hover:block p-1
                          "
                      >
                        <MdDelete />
                      </div>
                    </div>
                  );
                })}
              </div>
            ) : (
              <p className=" text-red-600 text text-xs">
                {" "}
                *please upload Image*
              </p>
            )}
          </div>

          <label htmlFor="price">price:</label>

          <input
            type="number"
            id="price"
            name="price"
            placeholder="Enter Product Price"
            value={data.price}
            onChange={changeHandler}
            className="p-2 bg-slate-100 border rounded "
            required
          />
          <label htmlFor="sellingPrice">Selling Price:</label>

          <input
            type="number"
            id="sellingPrice"
            name="sellingPrice"
            placeholder="Enter Product sellingPrice"
            value={data.sellingPrice}
            onChange={changeHandler}
            className="p-2 bg-slate-100 border rounded "
            required
          />
          <label htmlFor="description">Description:</label>

          <textarea
            rows={2}
            id="description"
            name="description"
            placeholder="Enter Product description"
            value={data.description}
            onChange={changeHandler}
            className="p-2 bg-slate-100  rounded  h-32 border resize-none "
          ></textarea>

          <button className="px-3 py-2 mt-3 bg-red-600 text-white mb-10 hover:bg-red-700">
            Update Product
          </button>
        </form>
      </div>
      {openfullScreenImage && (
        <Displayimage
          onClose={() => {
            setOpenFullScreenimage(false);
          }}
          imageUrl={fullScreenImage}
        />
      )}
    </div>
  );
}
