import { userModel } from "../../models/userModel.js";

export async function userDetailController(req, res) {
  try {
    // Check if req.userId exists (it should be set by your auth middleware)
    if (!req.userId) {
      return res.status(401).json({
        success: false,
        error: true,
        message: "Authentication required. User ID not found in request.",
      });
    }

    // Find the user by ID
    const user = await userModel.findById(req.userId);
    

    // Check if user exists
    if (!user) {
      return res.status(404).json({
        success: false,
        error: true,
        message: "User not found",
      });
    }

    // Remove sensitive data before sending response
    const userData = user.toObject();
    delete userData.password; // Don't send password back to client

    // Send successful response
    return res.status(200).json({
      message: "User details retrieved successfully",
      success: true,
      error: false,
      data: userData,
    });
  } catch (err) {
    console.error("Error in userDetailController:", err);
    
    // Handle specific error cases
    if (err.name === "CastError" && err.kind === "ObjectId") {
      return res.status(400).json({
        success: false,
        error: true,
        message: "Invalid user ID format",
      });
    }
    
    // Generic error response
    return res.status(500).json({
      success: false,
      error: true,
      message: err.message || "An error occurred while retrieving user details",
    });
  }
}