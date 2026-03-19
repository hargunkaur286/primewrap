const mongoose = require('mongoose');

const orderSchema = new mongoose.Schema(
  {
    email: String,
    stripeCheckoutSessionId: { type: String, index: true },
    stripePaymentIntentId: String,
    stripeCustomerId: String,
    productSlug: String,
    planType: String,
    quantity: Number,
    paymentStatus: {
      type: String,
      enum: ['pending', 'paid', 'failed', 'refunded'],
      default: 'pending',
    },
    fulfillmentStatus: {
      type: String,
      enum: ['pending', 'packed', 'shipped', 'delivered'],
      default: 'pending',
    },
    totalAmount: Number,
    currency: String,
    shippingAddress: Object,
  },
  { timestamps: true }
);

module.exports = mongoose.model('Order', orderSchema);