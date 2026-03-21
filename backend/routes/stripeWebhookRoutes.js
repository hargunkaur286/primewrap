import express from "express";
import Stripe from "stripe";
import ErrorHandler from "../middleware/error.js";
import { ensureDbConnection } from "../database/dbConnection.js";
import CheckoutSession from "../models/checkoutSession.js";
import { sendEmail } from "../utils/sendEmail.js";

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
						const emailTo =
							session.customer_details?.email ||
							session.customer_email ||
							session.metadata?.email ||
							null;

						// Ensure the record exists even if the session wasn't created via our API.
						await CheckoutSession.findOneAndUpdate(
							{ stripeCheckoutSessionId: session.id },
							{
								$setOnInsert: {
									email: emailTo || "unknown@unknown",
									productSlug: String(session.metadata?.productSlug || ""),
									planType: String(session.metadata?.planType || "one_time"),
									quantity: Number(session.metadata?.quantity || 1),
								},
								$set: {
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
							},
							{ upsert: true, new: true }
						);

						// Send thank-you email once.
						const existing = await CheckoutSession.findOne({
							stripeCheckoutSessionId: session.id,
						}).lean();

						if (existing && !existing.thankYouEmailSent && emailTo) {
							const currency = (session.currency || existing.currency || "cad").toUpperCase();
							const totalCents = session.amount_total ?? existing.amountTotal ?? 0;
							const formattedTotal = new Intl.NumberFormat("en-CA", {
								style: "currency",
								currency,
							}).format(Number(totalCents) / 100);

							const productSlug = String(session.metadata?.productSlug || existing.productSlug || "");
							const planType = String(session.metadata?.planType || existing.planType || "");
							const quantity = Number(session.metadata?.quantity || existing.quantity || 1);

							const shipping = session.customer_details?.address
								? {
									name: session.customer_details?.name,
									line1: session.customer_details.address?.line1,
									city: session.customer_details.address?.city,
									state: session.customer_details.address?.state,
									postalCode: session.customer_details.address?.postal_code,
									country: session.customer_details.address?.country,
								}
								: null;

							const shippingHtml = shipping
								? `
                <p style="margin:0;"><strong>Shipping to</strong></p>
                <p style="margin:0;">${shipping.name || ""}</p>
                <p style="margin:0;">${shipping.line1 || ""}</p>
                <p style="margin:0;">${[shipping.city, shipping.state, shipping.postalCode].filter(Boolean).join(", ")}</p>
                <p style="margin:0;">${shipping.country || ""}</p>
              `
								: "";

							const supportEmail = process.env.SUPPORT_EMAIL || process.env.SMTP_MAIL || "";
							const subject = "Thanks for your order — Pinewrap";
							const message = `
              <div style="font-family: Arial, sans-serif; line-height: 1.5;">
                <h2 style="margin:0 0 12px;">Thanks for your purchase!</h2>
                <p style="margin:0 0 12px;">We’ve received your payment and your order is being processed.</p>

                <p style="margin:0;"><strong>Order details</strong></p>
                <ul>
                  <li><strong>Session ID:</strong> ${session.id}</li>
                  <li><strong>Product:</strong> ${productSlug || "Pinewrap"}</li>
                  <li><strong>Plan:</strong> ${planType || ""}</li>
                  <li><strong>Quantity:</strong> ${quantity}</li>
                  <li><strong>Total:</strong> ${formattedTotal}</li>
                </ul>

                ${shippingHtml}

                <p style="margin:12px 0 0;">If you have any questions, reply to this email${supportEmail ? ` or contact us at ${supportEmail}` : ""}.</p>
              </div>
            `;

							try {
								await sendEmail({ email: emailTo, subject, message });
								await CheckoutSession.findOneAndUpdate(
									{ stripeCheckoutSessionId: session.id },
									{
										thankYouEmailSent: true,
										thankYouEmailSentAt: new Date(),
										thankYouEmailTo: emailTo,
										thankYouEmailLastError: null,
									}
								);
							} catch (mailErr) {
								await CheckoutSession.findOneAndUpdate(
									{ stripeCheckoutSessionId: session.id },
									{
										thankYouEmailLastError: String(mailErr?.message || mailErr),
										thankYouEmailTo: emailTo,
									}
								);
							}
						}

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