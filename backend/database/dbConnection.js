import mongoose from "mongoose";
import { config } from "dotenv";
config({ path: "./.env" });

export const connection = () => {
    if (!process.env.MONGO_URI) {
        console.warn("MONGO_URI is not set; skipping DB connection.");
        return;
    }
    mongoose
        .connect(process.env.MONGO_URI, {
            dbName: "auth_db",
        })
        .then(() => {
            console.log("Connected to the database.");
        })
        .catch((err) => {
            console.log(`Some error occured while connecting to the database: ${err}`);
        });
};