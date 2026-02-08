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
  status: {
    type: String,
    enum: ['pending','processing','shipped','delivered','cancelled'],
    default: 'pending'
  },
  createdAt: {
    type: Date,
    default: Date.now
  },
  deliveryAddress: { type: String, required: true },
  paymentMethod: { type: String, required: true },
  trackingNumber: String
});

export const Order = mongoose.model('Order', orderSchema);
