import express from "express"
import {createMessage, createOrder, createSubscribers, forgotPassword, getAllMessages, getAllOrders, getAllSubscribers, getAllUsers, getCart, getUser, login, logout, payment, register, resetPassword, saveCart, verifyOTP} from "../controllers/userController.js"
import { isAuthenticated } from "../middleware/auth.js";

const router = express.Router();

router.post("/register", register);
router.post("/otp-verification", verifyOTP);
router.post("/login", login);
router.get("/logout", isAuthenticated, logout);
router.get("/me", isAuthenticated, getUser);
router.post("/password/forgot", forgotPassword);
router.put("/password/reset/:token", resetPassword);
router.post("/payment", payment);
router.post("/contact", createMessage)
router.post('/subscribe', createSubscribers);
router.get("/cart", isAuthenticated, getCart);
router.post("/cart", isAuthenticated, saveCart);
router.get("/contact", isAuthenticated, getAllMessages);
router.get("/all", isAuthenticated, getAllUsers);
router.get("/subscribers", isAuthenticated, getAllSubscribers);
router.get("/orders", isAuthenticated, getAllOrders);
router.post("/orders", createOrder);  // Remove authentication requirement for guest checkout

export default router;
