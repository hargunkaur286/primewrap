import express from "express";
import cookieParser from "cookie-parser";
import cors from "cors";
import {connection} from "./database/dbConnection.js"
import { errorMiddleware } from "./middleware/error.js";
import userRouter from "./routes/userRouter.js"
import { removeUnverifiedAccounts } from "./automation/removeUnverifiedAccounts.js";
export const app = express();

const defaultFrontendUrl = "https://primewrap.vercel.app";

// In Vercel, your frontend can be either the production URL or a preview URL like:
// https://primewrap-git-main-hargunkaur286s-projects.vercel.app
const vercelPreviewOriginRegex = /^https:\/\/primewrap(-.*)?\.vercel\.app$/;
const allowedOrigins = new Set(
  [process.env.FRONTEND_URL, defaultFrontendUrl].filter(Boolean)
);

const corsOptions = {
  origin: (origin, callback) => {
    // Non-browser clients / same-origin requests may not send Origin.
    if (!origin) return callback(null, true);

    // Local dev: be permissive.
    if (!process.env.VERCEL) return callback(null, true);

    if (allowedOrigins.has(origin) || vercelPreviewOriginRegex.test(origin)) {
      return callback(null, origin); // echo back the request origin
    }

    return callback(new Error(`CORS blocked origin: ${origin}`));
  },
  methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
  credentials: true,
};

app.use(cors(corsOptions));
app.options("*", cors(corsOptions));

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