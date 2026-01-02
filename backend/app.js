import express from "express";
import cookieParser from "cookie-parser";
import cors from "cors";
import {connection} from "./database/dbConnection.js"
import { errorMiddleware } from "./middleware/error.js";
import userRouter from "./routes/userRouter.js"
import { removeUnverifiedAccounts } from "./automation/removeUnverifiedAccounts.js";
export const app = express();

const corsOrigin = process.env.FRONTEND_URL
  ? [process.env.FRONTEND_URL]
  : true; // safe default (reflect request origin) when env var isn't set

app.use(
  cors({
    origin: corsOrigin,
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true,
  })
);

app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/api/v1/user", userRouter);

// Vercel serverless functions should not start background cron jobs.
if (!process.env.VERCEL) {
  removeUnverifiedAccounts();
}
connection();

app.use(errorMiddleware)