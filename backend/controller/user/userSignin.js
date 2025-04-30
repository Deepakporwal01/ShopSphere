import bcrypt from "bcrypt";
import { userModel } from "../../models/userModel.js";
import jwt from "jsonwebtoken";

export async function userSigninController(req, res) {
  try {
    const { email, password } = req.body;
    
    if (!email) {
      return res.status(400).json({
        success: false,
        message: "Please enter email",
        error: true,
      });
    }
    
    if (!password) {
      return res.status(400).json({
        success: false,
        message: "Please enter password",
        error: true,
      });
    }
    
    const user = await userModel.findOne({ email });
    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
        error: true,
      });
    }
    
    const checkPassword = bcrypt.compareSync(password, user.password);
    
    if (checkPassword) {
      const tokenData = {
        _id: user._id,
        email: user.email,
      };
      
      const token = jwt.sign(tokenData, process.env.TOKEN_SECRET_KEY, {
        expiresIn: "1d",
      });
      
      const tokenOption = {
        httpOnly: true,
        secure: true,  
        sameSite: 'None',
        maxAge: 1000 * 60 * 60 * 8, // 8 hours in milliseconds
        path: '/', // Important: set path for the cookie
      };
      
      return res
        .cookie("token", token, tokenOption)
        .status(200)
        .json({
          success: true,
          message: "Login Successful",
          data: token,
          error: false,
        });
    } else {
      return res.status(401).json({
        success: false,
        message: "Password does not match",
        error: true,
      });
    }
  } catch (err) {
    console.error("Login error:", err);
    return res.status(500).json({
      success: false,
      message: err.message || "An error occurred during login",
      error: true,
    });
  }
}
