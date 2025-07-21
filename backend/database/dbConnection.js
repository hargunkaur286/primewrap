import mongoose from "mongoose";
import { config } from "dotenv";
config({ path: "./.env" });

console.log(process.env.MONGO_URI)

export const connection = () => {
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