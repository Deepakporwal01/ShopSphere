import express from "express";
import { userSignUpController } from "../controller/user/userSignup.js";
import { userSigninController } from "../controller/user/userSignin.js";
import { userDetailController } from "../controller/user/userDetail.js";
import { authToken } from "../middleware/authToken.js";
import { userLogoutController } from "../controller/user/userLogout.js";
  import {allUsersController} from "../controller/user/allUsers.js"
import { updateUserController } from "../controller/user/updateUser.js";
import { UploadProductController } from "../controller/product/uploadProduct.js";
import { getProductController } from "../controller/product/getProduct.js";
import { updateProductController } from "../controller/product/updateproduct.js";
import { getCategoryProductController } from "../controller/product/getCategoryProduct.js";
import { getProductForEachCategoryController } from "../controller/product/getProductForEachCategory.js";
import { getProductDetailsController } from "../controller/product/getProductDetils.js";
import { addToCartController } from "../controller/product/addToCart.js";
import { countaddtoCartController } from "../controller/user/countaddToCart.js";
import { viewCartController } from "../controller/user/viewCart.js";
import updateCartController from "../controller/user/updateaddToCart.js"
import { removeCartController } from "../controller/product/removefromcart.js";
import { searchProduct } from "../controller/product/searchProduct.js";
import { filterProductController } from "../controller/product/filterProduct.js";
import { placeOrder,verifypayment } from "../controller/order/paymentController.js";
 export const router = express.Router();
router.post("/signup", userSignUpController);
router.post("/signin",userSigninController);
router.get("/user-details",authToken,userDetailController);
router.get("/userLogout",userLogoutController);
router.get("/all-users",authToken,allUsersController);
router.post("/update-user",authToken,updateUserController);
router.post("/upload-product",authToken,UploadProductController);
router.get("/get-product",getProductController);
router.post("/update-product",authToken,updateProductController);
router.get("/get-categoryProduct",getCategoryProductController);
router.post("/get-eachCategoryProduct",getProductForEachCategoryController);
router.post("/get-productdetails",getProductDetailsController);
router.post("/addtoCart",authToken,addToCartController);
router.get("/countaddtoCart",authToken,countaddtoCartController);
router.get("/viewCart",authToken,viewCartController);
router.post("/updateCart",authToken,updateCartController);
router.post("/removefromcart",authToken,removeCartController);
router.get("/search",searchProduct);
router.post("/filter-product",filterProductController);

// payments routes
router.post("/place-order",authToken,placeOrder);
router.post("/verify-payments",authToken,verifypayment);
