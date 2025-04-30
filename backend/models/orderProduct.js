import mongoose from "mongoose";

const orderSchema = new mongoose.Schema(
  {
    productDetails: [
      {
        productId: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "product", // Adjust this based on your product model name
        },
        quantity: {
          type: Number,
          required: true,
        },
      },
    ],
    email: {
      type: String,
      default: "",
    },
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "user", // If you're storing user reference
      required: true,
    },
    paymentDetails: {
      paymentId: {
        type: String,
        default: "",
      },
      payment_method_type: {
        type: [String],
        default: [],
      },
      payment_status: {
        type: String,
        default: "Pending",
      },
    },
    shipping_options: {
      type: Object,
      default: {},
    },
    totalAmount: {
      type: Number,
      default: 0,
    },
  },
  {
    timestamps: true,
  }
);

export const orderModel = mongoose.model("order", orderSchema);
