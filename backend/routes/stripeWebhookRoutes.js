import express from "express";
import Stripe from "stripe";
import ErrorHandler from "../middleware/error.js";
import { ensureDbConnection } from "../database/dbConnection.js";
import CheckoutSession from "../models/checkoutSession.js";

const router = express.Router();

let stripeClient;
const getStripeClient = () => {
	if (stripeClient) return stripeClient;
	const secretKey = process.env.STRIPE_SECRET_KEY;
	if (!secretKey) {
		throw new ErrorHandler("STRIPE_SECRET_KEY is not set", 500);
	}
	stripeClient = new Stripe(secretKey);
	return stripeClient;
};

router.post(
	"/webhook",
	express.raw({ type: "application/json" }),
	async (req, res) => {
		const signature = req.headers["stripe-signature"];

		if (!process.env.STRIPE_WEBHOOK_SECRET) {
			return res
				.status(500)
				.json({ success: false, message: "STRIPE_WEBHOOK_SECRET is not set" });
		}

		if (!signature) {
			return res.status(400).send("Missing stripe-signature header");
		}

			const stripe = getStripeClient();			
			let event;
			try {
				event = stripe.webhooks.constructEvent(
					req.body,
					signature,
					process.env.STRIPE_WEBHOOK_SECRET
				);
			} catch (err) {
				return res
					.status(400)
					.send(`Webhook Error: ${err?.message || "invalid signature"}`);
			}

			try {
				// Persist webhook-derived state in MongoDB.
				await ensureDbConnection();

				switch (event.type) {
					case "checkout.session.completed": {
						const session = event.data.object;

						await CheckoutSession.findOneAndUpdate(
							{ stripeCheckoutSessionId: session.id },
							{
								status: "completed",
								amountSubtotal: session.amount_subtotal ?? null,
								amountTotal: session.amount_total ?? null,
								currency: session.currency || undefined,
								stripeCustomerId: session.customer || undefined,
								shipping: session.customer_details
									? {
										name: session.customer_details.name,
										phone: session.customer_details.phone,
										addressLine1: session.customer_details.address?.line1,
										city: session.customer_details.address?.city,
										state: session.customer_details.address?.state,
										postalCode: session.customer_details.address?.postal_code,
										country: session.customer_details.address?.country,
									}
									: undefined,
							},
							{ new: true }
						);
						break;
					}

					case "checkout.session.expired": {
						const session = event.data.object;
						await CheckoutSession.findOneAndUpdate(
							{ stripeCheckoutSessionId: session.id },
							{ status: "expired" },
							{ new: true }
						);
						break;
					}

					case "checkout.session.async_payment_failed": {
						const session = event.data.object;
						await CheckoutSession.findOneAndUpdate(
							{ stripeCheckoutSessionId: session.id },
							{ status: "failed" },
							{ new: true }
						);
						break;
					}

					default:
						break;
				}

				return res.status(200).json({ received: true, type: event.type });
		} catch (err) {
				console.error("Stripe webhook processing error:", err);
				return res.status(500).json({
					success: false,
					message: "Webhook handler failed",
				});
		}
	}
);

export default router;