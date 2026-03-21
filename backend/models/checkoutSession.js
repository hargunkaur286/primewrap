import mongoose from 'mongoose';

const checkoutSessionSchema = new mongoose.Schema(
  {
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', default: null },
    email: { type: String, required: true },
    productSlug: { type: String, required: true },
    planType: {
      type: String,
      enum: ['one_time', 'sub_6m_10', 'sub_6m_15'],
      required: true,
    },
    quantity: { type: Number, default: 1 },
    stripeCheckoutSessionId: { type: String, index: true },
    stripeCustomerId: { type: String, default: null },
    // Optional because some flows use Stripe inline `price_data` (no reusable Price ID).
    stripePriceId: { type: String, default: null },
    status: {
      type: String,
      enum: ['created', 'completed', 'expired', 'failed'],
      default: 'created',
    },
    amountSubtotal: Number,
    amountTotal: Number,
    currency: { type: String, default: 'cad' },
    shipping: {
      name: String,
      phone: String,
      addressLine1: String,
      city: String,
      state: String,
      postalCode: String,
      country: String,
    },

    thankYouEmailSent: { type: Boolean, default: false },
    thankYouEmailSentAt: { type: Date, default: null },
    thankYouEmailTo: { type: String, default: null },
    thankYouEmailLastError: { type: String, default: null },
  },
  { timestamps: true }
);

const CheckoutSession = mongoose.model('CheckoutSession', checkoutSessionSchema);
export default CheckoutSession;