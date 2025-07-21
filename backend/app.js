import express from "express";
import cookieParser from "cookie-parser";
import cors from "cors";
import {connection} from "./database/dbConnection.js"
import { errorMiddleware } from "./middleware/error.js";

export const app = express();

app.use(
  cors({
    origin: [process.env.FRONTEND_URL],
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true,
  })
);

app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

connection();

app.use(errorMiddleware)