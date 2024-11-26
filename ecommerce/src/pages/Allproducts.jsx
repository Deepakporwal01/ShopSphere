import React, { useEffect, useState } from "react";
import UploadProduct from "../components/UploadProduct";
import { SummaryApi } from "../common";
import AdminProductcard from "../components/AdminProductcard";
export default function Allproducts() {
  const [openuploadProduct, setOpenUploadProduct] = useState(false);
  const [allproduct, setAllproduct] = useState([]);
  const fetchData = async () => {
    const dataresponse = await fetch(SummaryApi.get_product.url);
    const dataApi = await dataresponse.json();
    setAllproduct(dataApi?.data || []);
  };

  useEffect(() => {
    fetchData();
    
  }, []);
 
  return (
    <div>
      <div className="bg-white py-2 px-4 flex justify-between items-center">
        <h2 className="font-bold text-lg ">All Product</h2>
        <button
          onClick={() => {
            setOpenUploadProduct(true);
          }}
          className="border-2 border-red-600 hover:bg-red-600 hover:text-white py-1 px-3 transition-all rounded-full"
        >
          Upload Product{" "}
        </button>

      </div>

      { <div className="flex items-stretch flex-wrap overflow-y-scroll max-h-[calc(100vh-150px)] gap-5 py-4">

        {allproduct.map((product, index) => {
          return (
             <AdminProductcard data={product} fetchData ={fetchData} key={index +"all product"}/>
          )
        })}
      </div> 
       }

      {/* upload product component */}
      {openuploadProduct && (
        <UploadProduct
          onClose={() => {
            setOpenUploadProduct(false);
        
          } }fetchData={fetchData}
        />
      )}
    </div>
  );
}
