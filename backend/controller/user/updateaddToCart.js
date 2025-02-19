import { addToCartModel } from "../../models/cartProduct.js";

export default async function updateCartController(req, res) {
  try {
    const currentUser = req?.userId;
    const addtocartProductId = req?.body._id;
    const qty = req?.body.quantity;

    // Validate inputs
 
 
    // Update product in cart
    const updateProduct = await addToCartModel.updateOne(
      { _id: addtocartProductId },
      { ...(qty && { quantity: qty }) }
    );

    if (updateProduct.modifiedCount === 0) {
      return res.status(404).json({
        message: "Product not found or no changes applied",
        error: true,
        success: false,
      });
    }

    return res.json({
      message: "Cart product updated successfully",
      error: false,
      success: true,
    });
  } catch (err) {
    console.error("Error updating cart product:", err);

    return res.status(500).json({
      message: "Trouble updating cart product",
      error: true,
      success: false,
    });
  }
}
