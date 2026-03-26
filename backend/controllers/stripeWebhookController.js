import stripe from '../config/stripe.js';
import CheckoutSession from '../models/checkoutSession.js';
import { Order } from '../models/orderModel.js';
import Subscription from '../models/Subscription.js';

export const handleStripeWebhook = async (req, res) => {
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

        // Update CheckoutSession record if it exists
        try {
          await CheckoutSession.findOneAndUpdate(
            { stripeCheckoutSessionId: session.id },
            {
              status: 'completed',
              amountSubtotal: session.amount_subtotal,
              amountTotal: session.amount_total,
            }
          );
        } catch (err) {
          console.warn('Failed to update CheckoutSession for', session.id, err);
        }

        if (session.mode === 'payment') {
          try {
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
              console.log('Stripe webhook: created Order for session', session.id);
            } else {
              console.log('Stripe webhook: Order already exists for session', session.id);
            }
          } catch (err) {
            console.error('Error creating or checking Order from webhook:', err);
          }
        }

        if (session.mode === 'subscription') {
          try {
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
              console.log('Stripe webhook: created Subscription for session', session.id);
            } else {
              console.log('Stripe webhook: Subscription already exists for session', session.id);
            }
          } catch (err) {
            console.error('Error creating or checking Subscription from webhook:', err);
          }
        }

        break;
      }

      case 'checkout.session.expired': {
        const session = event.data.object;
        try {
          await CheckoutSession.findOneAndUpdate(
            { stripeCheckoutSessionId: session.id },
            { status: 'expired' }
          );
        } catch (err) {
          console.warn('Failed to mark CheckoutSession expired for', session.id, err);
        }
        break;
      }

      case 'customer.subscription.updated': {
        const sub = event.data.object;
        try {
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
        } catch (err) {
          console.warn('Failed to update Subscription for', sub.id, err);
        }
        break;
      }

      case 'customer.subscription.deleted': {
        const sub = event.data.object;
        try {
          await Subscription.findOneAndUpdate(
            { stripeSubscriptionId: sub.id },
            { status: 'canceled' }
          );
        } catch (err) {
          console.warn('Failed to mark Subscription canceled for', sub.id, err);
        }
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