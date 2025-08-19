import jwt from "jsonwebtoken";
import { User } from "../models/userModel.js";
import { catchAsyncError } from "./catchAsyncError.js";
import ErrorHandler from "./error.js";

/**
 * Middleware to check if the user is authenticated.
 * It reads the JWT from cookies, verifies it, and attaches the user to req.user.
 */
export const isAuthenticated = catchAsyncError(async (req, res, next) => {
    const { token } = req.cookies;

    if (!token) {
        return next(new ErrorHandler("User is not authenticated.", 401));
    }
    console.log("Cookies received:", req.cookies);
    console.log("Token received:", req.cookies.token);
    console.log("JWT_SECRET_KEY loaded:", process.env.JWT_SECRET_KEY);
    try {
        // Verify the JWT
        const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY);

        // Fetch the user from the database
        const user = await User.findById(decoded.id);
        if (!user) {
            return next(new ErrorHandler("User not found.", 404));
        }

        // Attach user to request
        req.user = user;
        next();
    } catch (err) {
        // Handle common JWT errors
        if (err.name === "TokenExpiredError") {
            return next(new ErrorHandler("Token has expired. Please login again.", 401));
        } else if (err.name === "JsonWebTokenError") {
            return next(new ErrorHandler("Token is malformed or invalid. Please login again.", 401));
        }

        // Generic error fallback
        return next(new ErrorHandler("Authentication failed. Please try again.", 401));
    }

});
