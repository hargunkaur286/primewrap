import express from "express";
import Stripe from "stripe";
import ErrorHandler from "../middleware/error.js";
import { catchAsyncError } from "../middleware/catchAsyncError.js";
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

const PLAN_TO_ENV_PRICE_KEY = {
  one_time: { envKey: "STRIPE_PRICE_ONE_TIME", mode: "payment", allowQuantity: true, maxQuantity: 10 },
  sub_6m_10: { envKey: "STRIPE_PRICE_SUB_6M_10", mode: "subscription", allowQuantity: false },
  sub_6m_15: { envKey: "STRIPE_PRICE_SUB_6M_15", mode: "subscription", allowQuantity: false },
};

const PLAN_CATALOG = {
  one_time: {
    label: "One Time Purchase",
    unitAmountCents: 649,
    currency: "cad",
    mode: "payment",
    allowQuantity: true,
    maxQuantity: 10,
  },
  sub_6m_10: {
    label: "6-Month 10-Bags",
    unitAmountCents: 599,
    currency: "cad",
    mode: "subscription",
    allowQuantity: false,
    // Bills every 6 months. Adjust if you want monthly billing instead.
    recurring: { interval: "month", interval_count: 6 },
  },
  sub_6m_15: {
    label: "6-Month 15-Bags",
    unitAmountCents: 739,
    currency: "cad",
    mode: "subscription",
    allowQuantity: false,
    recurring: { interval: "month", interval_count: 6 },
  },
};

const getFrontendOrigin = (req) => {
  return (
    req.headers.origin ||
    process.env.FRONTEND_URL ||
    (process.env.VERCEL ? "https://pinewrap.ca" : "http://localhost:8080")
  );
};

router.post(
  "/create-checkout-session",
  catchAsyncError(async (req, res, next) => {
    const { productSlug, planType, quantity = 1, email, shipping } = req.body || {};

    await ensureDbConnection();

    const planConfig = PLAN_TO_ENV_PRICE_KEY[planType];
    if (!planConfig) {
      return next(new ErrorHandler("Invalid planType", 400));
    }

    if (!email) {
      return next(new ErrorHandler("Email is required", 400));
    }

    const price = process.env[planConfig.envKey];
    const catalogPlan = PLAN_CATALOG[planType];
    if (!catalogPlan) {
      return next(new ErrorHandler("Invalid planType", 400));
    }

    let finalQuantity = 1;
    if (planConfig.allowQuantity) {
      finalQuantity = Number(quantity);
      const maxQuantity = planConfig.maxQuantity ?? 10;
      if (!Number.isInteger(finalQuantity) || finalQuantity < 1 || finalQuantity > maxQuantity) {
        return next(new ErrorHandler("Invalid quantity selected", 400));
      }
    }

    const origin = getFrontendOrigin(req);
    const stripe = getStripeClient();

    const sessionPayloadBase = {
      mode: planConfig.mode,
      customer_email: email,
      success_url: `${origin}/checkout/success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${origin}/checkout?product=${encodeURIComponent(String(productSlug || "pinewrap"))}&plan=${encodeURIComponent(String(planType))}&qty=${encodeURIComponent(String(finalQuantity))}`,
      billing_address_collection: "required",
      allow_promotion_codes: true,
      metadata: {
        productSlug: String(productSlug || ""),
        planType: String(planType),
        quantity: String(finalQuantity),
        email: String(email),
        shippingName: String(shipping?.name || ""),
      },
    };

    const lineItemFromEnvPrice = price
      ? {
          price,
          quantity: finalQuantity,
        }
      : null;

    const lineItemFromInlinePriceData = {
      price_data: {
        currency: catalogPlan.currency,
        unit_amount: catalogPlan.unitAmountCents,
        product_data: {
          name: `Pinewrap — ${catalogPlan.label}`,
        },
        ...(catalogPlan.mode === "subscription" ? { recurring: catalogPlan.recurring } : {}),
      },
      quantity: finalQuantity,
    };

    const createSession = async (lineItem) => {
      return stripe.checkout.sessions.create({
        ...sessionPayloadBase,
        line_items: [lineItem],
      });
    };

    let session;
    try {
      session = await createSession(lineItemFromEnvPrice || lineItemFromInlinePriceData);
    } catch (err) {
      const message = err?.message || "Stripe checkout session creation failed";

      // Common dev issue: using live Price IDs with a test secret key (or vice versa).
      // In local dev, fall back to inline price_data so you can keep moving.
      if (!process.env.VERCEL && /No such price/i.test(message) && lineItemFromEnvPrice) {
        session = await createSession(lineItemFromInlinePriceData);
      } else {
        throw err;
      }
    }

    await CheckoutSession.create({
      userId: req.user?._id || null,
      email,
      productSlug: String(productSlug || ""),
      planType: String(planType),
      quantity: finalQuantity,
      stripeCheckoutSessionId: session.id,
      stripeCustomerId: session.customer || null,
      stripePriceId: price || null,
      status: "created",
      currency: catalogPlan.currency,
      shipping,
    });

    return res.status(200).json({
      success: true,
      url: session.url,
      sessionId: session.id,
    });
  })
);

router.get(
  "/session/:sessionId",
  catchAsyncError(async (req, res, next) => {
    const sessionId = req.params.sessionId;
    if (!sessionId) {
      return next(new ErrorHandler("sessionId is required", 400));
    }

    const stripe = getStripeClient();
    const session = await stripe.checkout.sessions.retrieve(sessionId);

    return res.status(200).json({
      success: true,
      id: session.id,
      status: session.status,
      paymentStatus: session.payment_status,
      customerEmail: session.customer_details?.email || session.customer_email,
      amountTotal: session.amount_total,
      currency: session.currency,
      mode: session.mode,
    });
  })
);

export default router;