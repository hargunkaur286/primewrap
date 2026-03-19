const stripe = require('../config/stripe');
const CheckoutSession = require('../models/checkoutSession');
const Order = require('../models/rrder');
const Subscription = require('../models/Subscription');

exports.handleStripeWebhook = async (req, res) => {
  const sig = req.headers['stripe-signature'];
  let event;

  try {
    event = stripe.webhooks.constructEvent(
      req.body,
      sig,
      process.env.STRIPE_WEBHOOK_SECRET
    );
  } catch (err) {
    console.error('Webhook signature verification failed:', err.message);
    return res.status(400).send(`Webhook Error: ${err.message}`);
  }

  try {
    switch (event.type) {
      case 'checkout.session.completed': {
        const session = event.data.object;

        await CheckoutSession.findOneAndUpdate(
          { stripeCheckoutSessionId: session.id },
          {
            status: 'completed',
            amountSubtotal: session.amount_subtotal,
            amountTotal: session.amount_total,
          }
        );

        if (session.mode === 'payment') {
          const existingOrder = await Order.findOne({ stripeCheckoutSessionId: session.id });
          if (!existingOrder) {
            await Order.create({
              email: session.customer_details?.email || session.metadata?.email,
              stripeCheckoutSessionId: session.id,
              stripePaymentIntentId: session.payment_intent,
              stripeCustomerId: session.customer,
              productSlug: session.metadata?.productSlug,
              planType: session.metadata?.planType,
              quantity: Number(session.metadata?.quantity || 1),
              paymentStatus: 'paid',
              fulfillmentStatus: 'pending',
              totalAmount: session.amount_total,
              currency: session.currency,
              shippingAddress: session.customer_details?.address || {},
            });
          }
        }

        if (session.mode === 'subscription') {
          const existingSub = await Subscription.findOne({ stripeCheckoutSessionId: session.id });
          if (!existingSub) {
            await Subscription.create({
              email: session.customer_details?.email || session.metadata?.email,
              productSlug: session.metadata?.productSlug,
              planType: session.metadata?.planType,
              stripeCustomerId: session.customer,
              stripeSubscriptionId: session.subscription,
              stripeCheckoutSessionId: session.id,
              status: 'active',
            });
          }
        }

        break;
      }

      case 'checkout.session.expired': {
        const session = event.data.object;
        await CheckoutSession.findOneAndUpdate(
          { stripeCheckoutSessionId: session.id },
          { status: 'expired' }
        );
        break;
      }

      case 'customer.subscription.updated': {
        const sub = event.data.object;
        await Subscription.findOneAndUpdate(
          { stripeSubscriptionId: sub.id },
          {
            status: sub.status,
            currentPeriodStart: sub.current_period_start
              ? new Date(sub.current_period_start * 1000)
              : null,
            currentPeriodEnd: sub.current_period_end
              ? new Date(sub.current_period_end * 1000)
              : null,
            cancelAtPeriodEnd: sub.cancel_at_period_end,
          }
        );
        break;
      }

      case 'customer.subscription.deleted': {
        const sub = event.data.object;
        await Subscription.findOneAndUpdate(
          { stripeSubscriptionId: sub.id },
          { status: 'canceled' }
        );
        break;
      }

      default:
        break;
    }

    return res.json({ received: true });
  } catch (error) {
    console.error('Webhook processing error:', error);
    return res.status(500).json({ message: 'Webhook handler failed' });
  }
};