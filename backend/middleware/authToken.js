 
import jwt from "jsonwebtoken";
export async function authToken(req, res, next) {
  try {
    const token = req?.cookies?.token;
 console.log(token, "token from authToken middleware"); 

    if (!token) {
      return res.json({
        message: "user not  ",
        success: false, 
        error: true,
      });
    }

    jwt.verify(token, process.env.TOKEN_SECRET_KEY, function (err, decoded) {
      console.log(process.env.TOKEN_SECRET_KEY, "token secret key from env");
      if (err) {
        console.log("auth err in jwt ", err);
      }
      req.userId = decoded?._id;
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
