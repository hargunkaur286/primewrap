const express = require('express');
const {
  createCheckoutSession,
  getCheckoutSession,
} = require('../controllers/paymentController');

const router = express.Router();

router.post('/create-checkout-session', createCheckoutSession);
router.get('/session/:sessionId', getCheckoutSession);

module.exports = router;