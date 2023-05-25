import express from 'express'
import {  loginController, registerController, testController } from "../controllers/authController.js"
import { isAdmin, requireSign } from '../middlewares/authMiddleware.js';
// router object 
const router = express.Router()

//routing

// register || post method
router.post("/register", registerController);

// Login || post method 
router.post("/login", loginController);


// test routes 
router.get('/test', requireSign, isAdmin, testController)

export default router;