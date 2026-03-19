module.exports = {
  pinewrap: {
    name: 'Pinewrap',
    plans: {
      one_time: {
        label: 'One Time Purchase',
        mode: 'payment',
        stripePriceId: process.env.STRIPE_PRICE_ONE_TIME,
        allowQuantity: true,
        maxQuantity: 10,
      },
      sub_6m_10: {
        label: '6-Month 10-Bags',
        mode: 'subscription',
        stripePriceId: process.env.STRIPE_PRICE_SUB_6M_10,
        allowQuantity: false,
      },
      sub_6m_15: {
        label: '6-Month 15-Bags',
        mode: 'subscription',
        stripePriceId: process.env.STRIPE_PRICE_SUB_6M_15,
        allowQuantity: false,
      },
    },
  },
};