import { userSigninController } from "../controller/user/userSignin.js";
import jwt from "jsonwebtoken";
export async function authToken(req, res, next) {
  try {
    const token = req.cookies?.token;
 
    if (!token) {
      return res.json({
        message: "user not logged in ",
        success: false, 
        error: true,
      });
    }
    jwt.verify(token, process.env.TOKEN_SECRET_KEY, function (err, decoded) {
      if (err) {
        console.log("auth err", err);
      }
      req.userId = decoded._id;
      next();
    });
  } catch (err) {
    res.status(400).json({
      error: true,
      data: [],
      message: err.message || err,
      success: false,
    });
  }
}
