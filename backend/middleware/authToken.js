import jwt from "jsonwebtoken";

export async function authToken(req, res, next) {
  try {
    // Get token from multiple possible sources
    let token = null; 
    
    // Check cookies first
    if (req.cookies && req.cookies.token) {
      token = req.cookies.token;
   
    }
    
    // Check authorization header if no token in cookies
  
    // If no token found anywhere
    if (!token) {
     
      return res.status(401).json({
        message: "Authentication required. No token provided.",
        success: false,
        error: true,
      });
    }

    // Verify the token
    jwt.verify(token, process.env.TOKEN_SECRET_KEY, (err, decoded) => {
      if (err) {
        
        
        if (err.name === 'TokenExpiredError') {
          return res.status(401).json({
            message: "Token expired. Please login again.",
            success: false,
            error: true,
          });
        }
        
        return res.status(401).json({
          message: "Invalid token. Authentication failed.",
          success: false,
          error: true,
        });
      }
      
      // Set userId in request object for use in controller
      req.userId = decoded._id;
     
      
      // Continue to the next middleware or route handler
      next();
    });
  } catch (err) {
   
    return res.status(500).json({
      error: true,
      message: "Authentication error: " + (err.message || "Unknown error"),
      success: false,
    });
  }
}
