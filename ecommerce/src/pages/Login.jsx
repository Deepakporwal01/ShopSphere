import React, { useContext, useState } from "react";
import loginImage from "../assest/signin.gif";
import { FaEye } from "react-icons/fa";
import { FaEyeSlash } from "react-icons/fa";
import { json, Link, useNavigate } from "react-router-dom";
import { SummaryApi } from "../common";
import { toast } from "react-toastify";
import Context from "../context";

const Login = () => {
  function setCookie(name, value, days) {
    let expires = "";
    if (days) {
      const date = new Date();
      date.setTime(date.getTime() + days * 24 * 60 * 60 * 1000);
      expires = "; expires=" + date.toUTCString();
    }
    document.cookie = name + "=" + (value || "") + expires + "; path=/";
  }
  const navigate = useNavigate();

  const [showpassword, setshowpassword] = useState(false);

  const [data, setData] = useState({
    email: "",
    password: "",
  });
  const { fetchUserDetails, fetchUserAddToCart } = useContext(Context);

  const handlechange = (e) => {
    const { name, value } = e.target;

    setData((prev) => {
      return {
        ...prev,
        [name]: value,
      };
    });
  };

  const handlesubmit = async (e) => {
    e.preventDefault();

    const dataResponse = await fetch(SummaryApi.signIn.url, {
      method: SummaryApi.signIn.method,
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });

    const dataapi = await dataResponse.json();

    if (dataapi.success) {
      toast.success(dataapi.message);
      setCookie("token", dataapi.data, 10);
      fetchUserDetails();
      fetchUserAddToCart();
      navigate("/");
    }

    if (dataapi.error) {
      toast.error(dataapi.message);
    }
  };

  return (
    <section id="login">
      <div className=" mx-auto container  bg-white p-4 ">
        <div className="w-full  bg-slate-200 max-w-md p-2 mx-auto ">
          <div className=" w-20 h-20 mx-auto">
            <img src={loginImage} alt="" />
          </div>

          <form action="" onSubmit={handlesubmit}>
            <div className="grid">
              <label htmlFor="">Email</label>

              <div className="">
                <input
                  type="text"
                  className="w-full  outline-none h-8 rounded-sm"
                  placeholder="Enter Email "
                  name="email"
                  value={data.email}
                  onChange={handlechange}
                />
              </div>
            </div>

            <div>
              <label htmlFor="">Password</label>

              <div className="flex relative">
                <input
                  className=" w-full  outline-none   h-8 rounded-sm"
                  type={showpassword ? "text" : "password"}
                  name="password"
                  value={data.password}
                  onChange={handlechange}
                  placeholder="Enter Password"
                />

                <div
                  className=" cursor-pointer"
                  onClick={() => setshowpassword((prev) => !prev)}
                >
                  <span className="absolute right-2 top-2  text-lg flex justify-center items-center ">
                    {showpassword ? <FaEyeSlash /> : <FaEye />}
                  </span>
                </div>
              </div>
              <Link
                to={"forgot password"}
                className="block w-fit ml-auto hover:underline hover:text-red-500"
              >
                Forgot Password ?
              </Link>
              <button className="  bg-red-600 px-6 py-2 w-full max-w-[150px] rounded-full hover:scale-110 transition-all  mx-auto block my-4">
                Login
              </button>
            </div>
          </form>
          <div className=" flex gap-2">
            <p>Dont have account ?</p>
            <Link className="hover:underline hover:text-red-600" to={"/signup"}>
              signup
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Login;
