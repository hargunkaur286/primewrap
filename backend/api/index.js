import { app } from "../app.js";
import { ensureDbConnection } from "../database/dbConnection.js";

// Vercel Node Serverless Function entrypoint.
// Export a handler so @vercel/node can invoke it as (req, res).
export default async function handler(req, res) {
	try {
		await ensureDbConnection();
	} catch (err) {
		// Fail fast with a clear error instead of hanging for ~10s.
		return res.status(503).json({
			success: false,
			message: "Database is not connected. Please try again later.",
		});
	}

	return app(req, res);
}
