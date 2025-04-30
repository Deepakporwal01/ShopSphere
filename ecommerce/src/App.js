import "./App.css";
import Header from "./components/Header";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useEffect, useState } from "react";
import { SummaryApi } from "./common";
import Context from "./context";
import { useDispatch, useSelector } from "react-redux";
import { setUserDetails } from "./store/userSlice";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Adminpanel from "./pages/Adminpanel";
import Allusers from "./pages/Allusers";
import Allproducts from "./pages/Allproducts";
import Home from "./pages/Home";
import CategoryWiseProduct from "./pages/CategoryWiseProduct";
import ProductDetails from "./pages/ProductDetails";
import Cart from "./pages/Cart";
import Searchproduct from "./pages/Searchproduct";
import axios from "axios";
import Payment from "./pages/Payment";

function App() {
  const dispatch = useDispatch();
  const [countCartProducts, setCountCartProducts] = useState(0);
  
  const fetchUserAddToCart = async () => {
    const response = await fetch(SummaryApi.countaddtoCart.url, {
      method: SummaryApi.countaddtoCart.method,
      credentials: "include",
    });
    const dataApi = await response?.json();
    setCountCartProducts(dataApi?.data?.count);
  };
  const fetchUserDetails = async () => {
    const dataResponse = await axios.get(SummaryApi?.current_user?.url,{  withCredentials: true, });
    const dataapi = await dataResponse?.data;
    console.log(dataapi, "user details from app");
    if (dataapi?.success) {
      dispatch(setUserDetails(dataapi?.data));
    }
  };
  
  useEffect(() => {
    // user Details
    fetchUserAddToCart();
    fetchUserDetails();
    // user cart details
   
  }, []);
  return (
    <div className="  ">
      <Context.Provider
        value={{
          fetchUserDetails,
          countCartProducts,
          fetchUserAddToCart,
        }}
      >
        <ToastContainer position="top-center" />
        <Header />
        <div className=" pt-16 bg-slate-100">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/admin-panel" element={<Adminpanel />}>
              <Route
                index
                path="/admin-panel/all-users"
                element={<Allusers />}
              />
              <Route
                path="/admin-panel/all-products"
                element={<Allproducts />}
              />
            </Route>
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="/payment" element={<Payment/>}/>
            <Route
              path="/product-category/:category"
              element={<CategoryWiseProduct />}
            />
            <Route path="/product-details/:id" element={<ProductDetails />} />
            <Route path="/cart" element={<Cart />} />
            <Route path="/search" element={<Searchproduct />} />
            <Route
              path="/search/product-details/:id"
              element={<ProductDetails />}
            />
          </Routes>
        </div>
      </Context.Provider>
    </div>
  );
}

export default App;
