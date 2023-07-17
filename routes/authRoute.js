import express from "express";
import {
  forgotPasswordController,
  getOrderController,
  loginController,
  registerController,
  testController,
  updateProfileController,
} from "../controllers/authController.js";
import { isAdmin, requireSignIn } from "../middlewares/authMiddleware.js";
// router object
const router = express.Router();

//routing

// register || post method
router.post("/register", registerController);

// Login || post method
router.post("/login", loginController);

// Forgot password || post
router.post("/forgot-password", forgotPasswordController);

// test routes
router.get("/test", requireSignIn, isAdmin, testController);

// protected route auth

router.get("/user-auth", requireSignIn, (req, res) => {
  res.status(200).send({ ok: true });
});

//Protected admin dashboard 
router.get("/admin-auth", requireSignIn, isAdmin, (req, res) => {
  res.status(200).send({ ok: true });
});

router.put('/profile', requireSignIn, updateProfileController)

// orders 
router.get("/orders", requireSignIn, getOrderController);
export default router;
