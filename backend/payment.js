// import Stripe from 'stripe';
// const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

// export const paymentHelper = async (number, cvc, exp_month, exp_year, amount) => {
//   try {
//     const paymentMethod = await stripe.paymentMethods.create({
//       type: 'card',
//       card: {
//         number: number,
//         exp_month: exp_month,
//         exp_year: exp_year,
//         cvc: cvc,
//       },
//     });
//     const paymentIntent = await stripe.paymentIntents.create({
//       amount: amount,
//       currency: 'cad',
//       payment_method: paymentMethod.id,
//       confirm: true,
//       return_url: "https://localhost:5176"
//     });
//     return paymentIntent;
//   }catch(error){
//     console.log(error);
//   }
// };



import Stripe from 'stripe';

let stripeClient;
const getStripeClient = () => {
  if (stripeClient) return stripeClient;
  const secretKey = process.env.STRIPE_SECRET_KEY;
  if (!secretKey) {
    throw new Error('STRIPE_SECRET_KEY is not set');
  }
  stripeClient = new Stripe(secretKey);
  return stripeClient;
};

export const paymentHelper = async (paymentMethodId, amount) => {
  try {
    const stripe = getStripeClient();
    const paymentIntent = await stripe.paymentIntents.create({
      amount: amount * 100, 
      currency: 'cad',
      payment_method: paymentMethodId,
      confirm: true,
      return_url: "https://localhost:5176"
    });

    return paymentIntent;
  } catch (error) {
    console.error("Stripe Payment Error:", error);
    throw error;
  }
};