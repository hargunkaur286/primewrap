const stripe = require('../config/stripe');
const catalog = require('../config/pinewrapCatalog');
const CheckoutSession = require('../models/checkoutSession');

exports.createCheckoutSession = async (req, res) => {
  try {
    const { productSlug, planType, quantity = 1, email, shipping } = req.body;

    if (!email) {
      return res.status(400).json({ message: 'Email is required' });
    }

    const product = catalog[productSlug];
    if (!product) {
      return res.status(404).json({ message: 'Invalid product' });
    }

    const plan = product.plans[planType];
    if (!plan) {
      return res.status(400).json({ message: 'Invalid plan type' });
    }

    let finalQuantity = 1;

    if (plan.allowQuantity) {
      finalQuantity = Number(quantity);
      if (!Number.isInteger(finalQuantity) || finalQuantity < 1 || finalQuantity > (plan.maxQuantity || 10)) {
        return res.status(400).json({ message: 'Invalid quantity selected' });
      }
    }

    const customer = await stripe.customers.create({
      email,
      name: shipping?.name,
      phone: shipping?.phone,
      address: shipping
        ? {
            line1: shipping.addressLine1,
            city: shipping.city,
            state: shipping.state,
            postal_code: shipping.postalCode,
            country: shipping.country,
          }
        : undefined,
      metadata: {
        productSlug,
        planType,
      },
    });

    const session = await stripe.checkout.sessions.create({
      mode: plan.mode,
      customer: customer.id,
      line_items: [
        {
          price: plan.stripePriceId,
          quantity: finalQuantity,
        },
      ],
      success_url: `${process.env.FRONTEND_URL}/checkout/success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${process.env.FRONTEND_URL}/checkout?product=${productSlug}&plan=${planType}&qty=${finalQuantity}`,
      billing_address_collection: 'required',
      client_reference_id: `${productSlug}:${planType}:${Date.now()}`,
      allow_promotion_codes: true,
      metadata: {
        productSlug,
        planType,
        quantity: String(finalQuantity),
        email,
      },
    });

    await CheckoutSession.create({
      email,
      productSlug,
      planType,
      quantity: finalQuantity,
      stripeCheckoutSessionId: session.id,
      stripeCustomerId: customer.id,
      stripePriceId: plan.stripePriceId,
      status: 'created',
      currency: 'cad',
      shipping,
    });

    return res.status(200).json({
      url: session.url,
      sessionId: session.id,
    });
  } catch (error) {
    console.error('createCheckoutSession error:', error);
    return res.status(500).json({ message: 'Unable to create checkout session' });
  }
};

exports.getCheckoutSession = async (req, res) => {
  try {
    const session = await stripe.checkout.sessions.retrieve(req.params.sessionId);

    return res.json({
      id: session.id,
      status: session.status,
      paymentStatus: session.payment_status,
      customerEmail: session.customer_details?.email,
      amountTotal: session.amount_total,
      currency: session.currency,
      mode: session.mode,
    });
  } catch (error) {
    console.error('getCheckoutSession error:', error);
    return res.status(500).json({ message: 'Unable to fetch session' });
  }
};