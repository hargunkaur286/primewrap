import express from "express"
import {login, logout, register, verifyOTP} from "../controllers/userController.js"

const router = express.Router();

router.post("/register", register);
router.post("/otp-verification", verifyOTP);
router.post("/login", login);
router.get("/logout", logout);
export default router;
