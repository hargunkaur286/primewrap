import mongoose from 'mongoose';

const orderItemSchema = new mongoose.Schema({
  product: {
    type: String,  // Changed from ObjectId to String to support product slugs like 'scented-bags'
    required: false  // Made optional since we have all product details
  },
  name: { type: String, required: true },
  price: { type: Number, required: true },
  quantity: { type: Number, required: true, min: 1 },
  image: { type: String }  // Add image field
});

const orderSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: false  // Allow guest orders
  },
  // Guest user information (when user is not logged in)
  guestEmail: { type: String },
  guestName: { type: String },
  items: [orderItemSchema],
  total: { type: Number, required: true },

  // Stripe related fields (optional) - allow using same Order model for both local and Stripe flows
  stripeCheckoutSessionId: { type: String, index: true, unique: true, sparse: true },
  stripePaymentIntentId: { type: String, default: null },
  stripeCustomerId: { type: String, default: null },
  productSlug: { type: String, default: null },
  planType: { type: String, default: null },
  quantity: { type: Number, default: 1 },
  totalAmount: { type: Number, default: null },
  currency: { type: String, default: 'cad' },
  shippingAddress: { type: Object, default: null },

  status: {
    type: String,
    enum: ['pending','processing','shipped','delivered','cancelled'],
    default: 'pending'
  },
  paymentStatus: {
    type: String,
    enum: ['pending', 'paid', 'failed', 'refunded'],
    default: 'pending'
  },

  createdAt: {
    type: Date,
    default: Date.now
  },
  deliveryAddress: { type: String, required: false },
  paymentMethod: { type: String, required: false },
  trackingNumber: String
});

export const Order = mongoose.model('Order', orderSchema);
