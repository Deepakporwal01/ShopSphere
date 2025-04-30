 import Razorpay from "razorpay";
 import crypto from "crypto";
import dotenv from "dotenv";
dotenv.config();
const razorpay = new Razorpay({
  key_id: process.env.RAZORPAY_KEY_ID,
  key_secret: process.env.RAZORPAY_SECRET,
});

export const createOrder = async (amount, currency = "INR") => {
  const options = {
    amount: amount * 100,
    currency,
    receipt: `receipt_order_${Date.now()}`,
  };
  return await razorpay.orders.create(options);
};

export const verifyPayment = async (razorpay_order_id, razorpay_payment_id, razorpay_signature, amount) => {
    const sign = `${razorpay_order_id}|${razorpay_payment_id}`;
    const expectedSignature = crypto
        .createHmac("sha256", process.env.RAZORPAY_SECRET)
        .update(sign)
        .digest("hex");

    if (expectedSignature !== razorpay_signature) {
        throw new Error("Invalid payment signature");
    }

    // Find the order using Razorpay Order ID
    const order = await orderModel.findOne({ "paymentDetails.paymentId": razorpay_order_id });

    if (!order) {
        throw new Error("Order not found");
    }

    // Update payment details
    order.paymentDetails.paymentId = razorpay_payment_id;
    order.paymentDetails.payment_status = "Paid";
    order.paymentDetails.payment_method_type = ["razorpay"]; // optional: update with actual method
    order.totalAmount = amount;

    await order.save();

    return order;
};

