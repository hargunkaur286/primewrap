import { Order } from './orderModel.js';

// Re-export the canonical Order model so any code importing `models/order.js` (CommonJS or ESM)
// continues to work without creating a second conflicting model.
export default Order;
export { Order };