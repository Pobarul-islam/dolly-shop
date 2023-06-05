import express from "express";
import { isAdmin, requireSignIn } from "../middlewares/authMiddleware.js";
import { createProductController, deleteProductController, getProductController, getSingleProductController, productController, updateProductController } from "../controllers/productController.js";
import formidable from "express-formidable";

const router = express.Router();

// routes

router.post(
  "/create-product",
  requireSignIn,
  isAdmin,
  formidable(),
  createProductController
);
router.put(
  "/update-product/:pid",
  requireSignIn,
  isAdmin,
  formidable(),
  updateProductController
);


// get products 
router.get('/get-product', getProductController);


// single product 
router.get("/get-product/:slug", getSingleProductController)



// get photo 
router.get('/product-photo/:pid', productController)

// delete product

router.delete("/product", deleteProductController)



export default router;