import { orderModel } from "../../models/orderProduct.js";
import { createOrder } from "../../utils/razorpayUtils.js";
import crypto from "crypto";

export const placeOrder = async (req, res) => {
  try {
    const { cartItems, addressDetails, shipping_options } = req.body;

    const userId = req.userId;
    console.log(userId);
    if (!Array.isArray(cartItems) || cartItems.length === 0) {
      return res.status(400).json({ success: false, message: "Cart is empty" });
    }
    const { email } = addressDetails;

    // Calculate total amount (use sellingPrice * quantity)
    const totalAmount = cartItems.reduce((acc, item) => {
      return acc + item.productId.sellingPrice * item.quantity;
    }, 0);

    const amountInPaise = totalAmount; // Razorpay uses smallest currency unit (paise)

    // Create Razorpay order
    const razorpayOrder = await createOrder(amountInPaise, "INR");

    // Save order in DB
    const newOrder = new orderModel({
      productDetails: cartItems,
      email,
      userId,
      shipping_options,
      totalAmount,
      paymentDetails: {
        paymentId: razorpayOrder.id,
        payment_status: "Pending",
      },
    });
    console.log(newOrder);
    await newOrder.save();

    res.status(200).json({
      success: true,
      razorpayOrder,
      orderId: newOrder._id,
    });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
};

const verifyPaymentSignature = (orderId, paymentId, signature) => {
  const body = `${orderId}|${paymentId}`;
  const expectedSignature = crypto
    .createHmac("sha256", process.env.RAZORPAY_SECRET)
    .update(body)
    .digest("hex");

  return expectedSignature === signature;
};

export const verifypayment = async (req, res) => {
  const { razorpay_order_id, razorpay_payment_id, razorpay_signature, amount } =
    req.body;

  try {
    const isValid = verifyPaymentSignature(
      razorpay_order_id,
      razorpay_payment_id,
      razorpay_signature
    );

    if (!isValid) {
      return res.status(400).json({
        success: false,
        message: "Payment verification failed",
      });
    }

    const order = await orderModel.findOne({
      "paymentDetails.paymentId": razorpay_order_id,
    });

    if (!order) {
      return res.status(404).json({
        success: false,
        message: "Order not found",
      });
    }

    order.paymentDetails.paymentId = razorpay_payment_id;
    order.paymentDetails.payment_status = "Paid";
    order.paymentDetails.payment_method_type = ["razorpay"];
    order.totalAmount = amount / 100; // Convert back to rupees

    await order.save();

    res.status(200).json({
      success: true,
      message: "Payment verified and order updated successfully",
      order,
    });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};
