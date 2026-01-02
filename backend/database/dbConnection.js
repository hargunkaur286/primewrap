import mongoose from "mongoose";
import { config } from "dotenv";
config({ path: "./.env" });

// Avoid long request hangs if the DB is not connected (common in serverless cold starts
// or when env vars are missing). Instead, queries will error immediately.
mongoose.set("bufferCommands", false);
mongoose.set("bufferTimeoutMS", 0);

let connectionPromise = null;

export const ensureDbConnection = async () => {
    if (!process.env.MONGO_URI) {
        throw new Error("MONGO_URI is not set");
    }

    // 0 = disconnected, 1 = connected, 2 = connecting, 3 = disconnecting
    if (mongoose.connection.readyState === 1) {
        return;
    }

    if (connectionPromise) {
        return connectionPromise;
    }

    connectionPromise = mongoose
        .connect(process.env.MONGO_URI, { dbName: "auth_db" })
        .then(() => {
            console.log("Connected to the database.");
        })
        .catch((err) => {
            // Allow retries on subsequent invocations.
            connectionPromise = null;
            throw err;
        });

    return connectionPromise;
};

export const connection = () => {
    if (!process.env.MONGO_URI) {
        console.warn("MONGO_URI is not set; skipping DB connection.");
        return;
    }
    ensureDbConnection().catch((err) => {
        console.log(`Some error occured while connecting to the database: ${err}`);
    });
};