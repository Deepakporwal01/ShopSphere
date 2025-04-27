import bcrypt from "bcrypt";
import { userModel } from "../../models/userModel.js";
import jwt from "jsonwebtoken";

export async function userSigninController(req, res) {
  try {
    const { email, password } = req.body;
    console.log("email and password from user sign in",)
    if (!email) {
      throw new error("please enter email ");
    }
    if (!password) {
      throw new error("please enter  password ");
    }
    const user = await userModel.findOne({ email });

    if (!user) {
      throw new error("user not found ");
    }
    const checkpassword = bcrypt.compareSync(password, user?.password);
    if (checkpassword) {
      const tokenData = {
        _id: user?._id,
        email: user?.email,
      };

      const token = jwt.sign(tokenData, process.env.TOKEN_SECRET_KEY, {
        expiresIn: "1d",
      });

      const TokenOption = {
        httpOnly: true,
        secure: true, // use 'true' in production for HTTPS
        sameSite: "none", // or "Lax" / "None" depending on your frontend/backend setup
        maxAge: 1000 * 60 * 60 * 8, // Optional: 8 hours in milliseconds
      };

      res.cookie("token", token, TokenOption).json({
        success: true,
        message: "Login Successful",
        data: token,
        error: false,
      });
    } else {
      throw new Error("password does not match");
    }
  } catch (err) {
    res.json({
      message: "user does not exists",
      error: true,
      success: false,
    });
  }
}
