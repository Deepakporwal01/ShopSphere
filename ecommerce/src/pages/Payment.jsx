import React, { useState } from "react";
import { SummaryApi } from "../common";
import { useLocation } from "react-router-dom";

const RazorpayCheckout = () => {
  const location = useLocation();
  const { data } = location.state || {};

  const [address, setAddress] = useState({
    name: "",
    email: "",
    phone: "",
    addressLine: "",
    city: "",
    pincode: "",
    state: "",
  });

  const handleInputChange = (e) => {
    setAddress({ ...address, [e.target.name]: e.target.value });
  };

  const handlePayment = async () => {
    try {
      const response = await fetch(SummaryApi.placeOrder.url, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify({
          cartItems: data,
          addressDetails: address,
          shipping_options: "Standard", // Adjust as needed
        }),
      });

      const datares = await response.json();
      console.log(datares, "datares");

      if (!datares.success) {
        alert("Failed to create Razorpay order");
        return;
      }

      const options = {
        key: process.env.REACT_APP_RAZORPAY_KEY,
        amount: datares.razorpayOrder.amount,
        currency: datares.razorpayOrder.currency,
        name: "Deepaks Ecommerce",
        description: "Test Transaction",
        order_id: datares.razorpayOrder.id,
        handler: async (response) => {
          const verifyRes = await fetch(SummaryApi.verifyOrder.url, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            credentials: "include",
            body: JSON.stringify({
              razorpay_order_id: response.razorpay_order_id,
              razorpay_payment_id: response.razorpay_payment_id,
              razorpay_signature: response.razorpay_signature,
              amount: datares.razorpayOrder.amount,
            }),
          });

          const verifyData = await verifyRes.json();
          alert(verifyData.success ? "✅ Payment Successful!" : "❌ Payment Failed");
        },
        prefill: {
          name: address.name,
          email: address.email,
          contact: address.phone,
        },
        theme: {
          color: "#6366f1",
        },
      };

      const rzp = new window.Razorpay(options);
      rzp.open();
    } catch (error) {
      console.error("Payment Error:", error);
      alert("Something went wrong during payment.");
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center px-4">
      <div className="max-w-xl w-full bg-white shadow-lg rounded-2xl p-8">
        <h2 className="text-2xl font-semibold mb-6 text-center text-indigo-600">
          Shipping Address
        </h2>
        <div className="flex flex-col space-y-4">
          {["name", "email", "phone", "pincode", "city", "state"].map((field) => (
            <input
              key={field}
              name={field}
              placeholder={field.charAt(0).toUpperCase() + field.slice(1)}
              className="input-style border border-black h-10 p-2 rounded"
              onChange={handleInputChange}
            />
          ))}
        </div>
        <textarea
          name="addressLine"
          placeholder="Address Line"
          className="input-style mt-4 h-24 w-full resize-none border border-black p-2 rounded"
          onChange={handleInputChange}
        />
        <button
          onClick={handlePayment}
          className="w-full mt-6 bg-indigo-600 hover:bg-indigo-700 text-white py-3 rounded-lg font-medium text-lg transition"
        >
          Pay with Razorpay
        </button>
      </div>
    </div>
  );
};

export default RazorpayCheckout;
