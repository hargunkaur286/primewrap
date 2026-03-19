import express from "express";
import cookieParser from "cookie-parser";
import cors from "cors";
import { connection } from "./database/dbConnection.js";
import { errorMiddleware } from "./middleware/error.js";
import userRouter from "./routes/userRouter.js";
import { removeUnverifiedAccounts } from "./automation/removeUnverifiedAccounts.js";
import compression from "compression";
export const app = express();

// Production frontend (custom domain) + Vercel deployment URLs.
const defaultFrontendUrl = "https://pinewrap.ca";
const vercelProdFrontendUrl = "https://primewrap.vercel.app";
const wwwFrontendUrl = "https://www.pinewrap.ca";

const paymentRoutes = require('./routes/paymentRoutes');
const stripeWebhookRoutes = require('./routes/stripeWebhookRoutes');

// In Vercel, your frontend can be either the production URL or a preview URL like:
// https://primewrap-git-main-hargunkaur286s-projects.vercel.app
const vercelPreviewOriginRegex = /^https:\/\/primewrap(-.*)?\.vercel\.app$/;
const allowedOrigins = new Set(
  [
    process.env.FRONTEND_URL,
    defaultFrontendUrl,
    wwwFrontendUrl,
    vercelProdFrontendUrl,
  ].filter(Boolean)
);

const corsOptions = {
  origin: (origin, callback) => {
    // Non-browser clients / same-origin requests may not send Origin.
    if (!origin) return callback(null, true);

    // Local dev: be permissive.
    if (!process.env.VERCEL) return callback(null, true);

    if (allowedOrigins.has(origin) || vercelPreviewOriginRegex.test(origin)) {
      return callback(null, true);
    }

    return callback(new Error(`CORS blocked origin: ${origin}`));
  },
  methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
  credentials: true,
};

app.use(cors(corsOptions));
// Express 5 does not accept "*" as a path pattern here.
app.options(/.*/, cors(corsOptions));

app.use('/api/payments', stripeWebhookRoutes);

app.use(compression({ threshold: 0 }));
app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/api/payments', paymentRoutes);

app.use("/api/v1/user", userRouter);

// Vercel serverless functions should not start background cron jobs.
if (!process.env.VERCEL) {
  removeUnverifiedAccounts();
}
connection();

app.use(errorMiddleware);
