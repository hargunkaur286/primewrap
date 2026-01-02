import { app } from "../app.js";

// Vercel Node Serverless Function entrypoint.
// Export a handler so @vercel/node can invoke it as (req, res).
export default function handler(req, res) {
	return app(req, res);
}
