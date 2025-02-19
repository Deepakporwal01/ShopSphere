import React, { useEffect, useState } from "react";
import { SummaryApi } from "../common";
import { Link } from "react-router-dom";
export default function CategoryWiseProductList() {
  const [categoryProduct, setCategoryProduct] = useState([]);
  const [loading, setLoading] = useState(false);
  const fetchCategoryProduct = async () => {
    setLoading(true);
    const fetchProductData = await fetch(SummaryApi.get_categoryProduct.url, {
      method: SummaryApi.get_categoryProduct.method,
      credentials: "include",
    });
    setLoading(false);
    const dataResponse = await fetchProductData.json();
    setCategoryProduct(dataResponse.data);
    console.log(dataResponse.data);
    
    
  };
  useEffect(() => {
    fetchCategoryProduct();
  }, []);

  return (
    <div
      className="   
          flex overflow-scroll md:justify-center md:p-4 items-center  gap-2 w-full scrollbar "
    >
      {
        loading?(
        categoryProduct.map((product,index)=>{
          return (
            <div className="h-16 w-16 md:w-20 md:h-20  animate-pulse rounded-full overflow-hidden bg-slate-200"></div>
          )
        })
      
      ):(
          categoryProduct.map((product, index) => {
            return (
              <Link
                to={"/product-category/" + product?.category}
                className=" flex  flex-col items-center  justify-between hover:cursor-pointer "
              >
                <div className=" h-16 w-16 md:h-20 md:w-20 rounded-full overflow-hidden p-2 bg-slate-200 flex  items-center justify-center">
                  <img
                    src={ product?.productImage[0]
                    }
                    alt={product?.category}
                    className="h-full object-scale-down hover:scale-125 transition-all mix-blend-multiply"
                  />
                </div>
    
                <h2 className="text-sm capitalize">{product.category}</h2>
              </Link>
            );
          })
        )
      }
    
    </div>
  );
}
