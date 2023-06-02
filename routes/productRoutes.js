import express from "express";
import { isAdmin, requireSignIn } from "../middlewares/authMiddleware.js";
import { createProductController, getProductController, getSingleProductController, productController } from "../controllers/productController.js";
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


// get products 
router.get('/get-product', getProductController);


// single product 
router.get("/get-product/:slug", getSingleProductController)



// get photo 
router.get('/product-photo/:pid', productController)


export default router;