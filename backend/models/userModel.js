import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    firstname: {
      type: "string",
      required: true,
    },
    lastname: {
      type: "string",
      required: true,
    },
    email: {
      type: "string",
      unique: true,
      required: true,
    },

    password: {
      type: "string",
      unique: true,
      required: true,
    },

    confirmpassword: {
      type: "string",
      required: true,
    },
    profilePic: "string",
    role: "string",
  },
  { timestamps: true }
);
export const userModel = mongoose.model("user", userSchema);
