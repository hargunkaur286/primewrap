import React, { useState } from 'react';
import { loadStripe } from '@stripe/stripe-js';
import { Elements, CardElement, useStripe, useElements } from '@stripe/react-stripe-js';
import { ArrowLeft, Shield, Lock, CheckCircle, CreditCard, Sparkles } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { useNavigate } from 'react-router-dom';
import { useCart } from '@/contexts/CartContext';
import { toast } from '@/hooks/use-toast';
import { API_BASE } from '@/lib/apiBase';
import axios from "axios"
const stripePromise = loadStripe('pk_test_51RrbJ256fhzVxt4O5OGBHT37TZEHt4RshdZ2M7NFvzSlfAvbHb2HozFBOLAKyEy3nGTcVHjCwtTOQViIZSPPBmjM00A50jWvn3');

interface PaymentFormData {
  email: string;
  fullName: string;
  address: string;
  city: string;
  postalCode: string;
  province: string;
}

const PaymentForm = () => {
  const stripe = useStripe();
  const elements = useElements();
  const navigate = useNavigate();
  const { items, getTotalPrice, clearCart } = useCart();
  
  const [formData, setFormData] = useState<PaymentFormData>({
    email: '',
    fullName: '',
    address: '',
    city: '',
    postalCode: '',
    province: ''
  });
  
  const [isProcessing, setIsProcessing] = useState(false);
  const [paymentComplete, setPaymentComplete] = useState(false);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!stripe || !elements) {
      return;
    }

    setIsProcessing(true);

    try {
      const cardElement = elements.getElement(CardElement);
      
      if (!cardElement) {
        throw new Error('Card element not found');
      }

      // Create payment method
      const { error, paymentMethod } = await stripe.createPaymentMethod({
        type: 'card',
        card: cardElement,
        billing_details: {
          name: formData.fullName,
          email: formData.email,
          address: {
            line1: formData.address,
            city: formData.city,
            postal_code: formData.postalCode,
            state: formData.province,
            country: 'CA'
          }
        }
      });

      if (error) {
        throw new Error(error.message);
      }

      // TODO: Replace with your actual backend API endpoint
      const response = await fetch(`${API_BASE}/api/v1/user/payment`, {
        method: 'POST',
        credentials: 'include',
        headers: {
          'Content-Type': 'application/json',
          // TODO: Add authentication headers if required
          // 'Authorization': `Bearer ${authToken}`
        },
        body: JSON.stringify({
          paymentMethodId: paymentMethod.id,
          amount: Math.round(finalTotal * 100), // Convert to proper format for your backend
        //   currency: 'CAD',
        //   metadata: {
        //     customer_email: formData.email,
        //     customer_name: formData.fullName,
        //     items: JSON.stringify(items),
        //     shipping_address: `${formData.address}, ${formData.city}, ${formData.province} ${formData.postalCode}`
        //   }
        })
      });

      const result = await response.json();

      if (result.success) {
        setPaymentComplete(true);
        clearCart();
        toast({
          title: "Payment Successful! 🎉",
          description: "Your order has been confirmed. You'll receive an email confirmation shortly.",
        });
      } else {
        throw new Error(result.message || 'Payment failed');
      }

    } catch (error) {
      console.error('Payment error:', error);
      toast({
        title: "Payment Failed",
        description: error instanceof Error ? error.message : "Something went wrong. Please try again.",
        variant: "destructive"
      });
    } finally {
      setIsProcessing(false);
    }
  };

// const handleSubmit = async (e: React.FormEvent) => {
//   e.preventDefault();
//   if (!stripe || !elements) return;

//   setIsProcessing(true);

//   try {
//     // 1) Create the Stripe payment method
//     const cardElement = elements.getElement(CardElement);
//     if (!cardElement) throw new Error("Card element not found");

//     const { error, paymentMethod } = await stripe.createPaymentMethod({
//       type: 'card',
//       card: cardElement,
//       billing_details: {
//         name:  formData.fullName,
//         email: formData.email,
//         address: {
//           line1:       formData.address,
//           city:        formData.city,
//           postal_code: formData.postalCode,
//           state:       formData.province,
//           country:     'CA',
//         },
//       },
//     });

//     if (error) throw new Error(error.message);

//     // 2) Send it off to your backend to confirm & charge
//     const paymentResponse = await fetch('http://localhost:4000/api/v1/user/payment', {
//       method:  'POST',
//       headers: { 'Content-Type': 'application/json' },
//       body: JSON.stringify({
//         paymentMethodId: paymentMethod.id,
//         amount:          Math.round(finalTotal * 100), // cents
//       }),
//       credentials: 'include',
//     });
//     const paymentResult = await paymentResponse.json();
//     if (!paymentResult.success) {
//       throw new Error(paymentResult.message || 'Payment failed');
//     }

//     // 3) **Now** that the charge succeeded, create an Order in Mongo
//     await axios.post(
//       'http://localhost:4000/api/v1/user/orders',
//       {
//         items:            items.map(i => ({
//                              id:       i.id,
//                              name:     i.name,
//                              price:    i.price,
//                              quantity: i.quantity,
//                              image:    i.image,
//                            })),
//         total:            finalTotal,
//         deliveryAddress:  `${formData.address}, ${formData.city}, ${formData.province} ${formData.postalCode}`,
//         paymentMethod:    'Credit Card',
//         trackingNumber:   null,
//       },
//       { withCredentials: true }
//     );

//     // 4) Finally, mark complete, clear cart, show toast
//     setPaymentComplete(true);
//     clearCart();
//     toast({
//       title:       "Payment Successful! 🎉",
//       description: "Your order has been confirmed. You'll receive an email confirmation shortly.",
//     });

//   } catch (err: any) {
//     console.error('Checkout error:', err);
//     toast({
//       title:       "Checkout Failed",
//       description: err.message || "Something went wrong, please try again.",
//       variant:     "destructive",
//     });
//   } finally {
//     setIsProcessing(false);
//   }
// };


  if (paymentComplete) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="max-w-md mx-auto text-center space-y-6 p-8">
          <div className="w-24 h-24 bg-primary rounded-full mx-auto flex items-center justify-center animate-pulse-glow">
            <CheckCircle className="w-12 h-12 text-white" />
          </div>
          
          <div className="space-y-4">
            <h1 className="text-3xl font-bold font-display text-foreground">
              Payment Complete!
            </h1>
            <p className="text-gray-600 text-lg">
              Thank you for choosing Pinewrap! Your order is being processed.
            </p>
          </div>
          
          <div className="space-y-3">
            <Button 
              onClick={() => navigate('/')}
              className="w-full bg-primary hover:bg-primary/90 text-primary-foreground py-3 rounded-xl font-semibold"
            >
              Continue Shopping
            </Button>
            <Button 
              variant="outline"
              onClick={() => navigate('/profile')}
              className="w-full border-primary text-primary hover:bg-muted py-3 rounded-xl"
            >
              View Order History
            </Button>
          </div>
        </div>
      </div>
    );
  }

  const totalAmount = getTotalPrice();
  const taxes = totalAmount * 0.13; // 13% HST for Canada
  const shipping = totalAmount > 50 ? 0 : 9.99;
  const finalTotal = totalAmount + taxes + shipping;

  return (
    <div className="min-h-screen bg-background">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <Button
            variant="ghost"
            onClick={() => navigate(-1)}
            className="flex items-center gap-2 text-primary hover:text-primary hover:bg-muted"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to Cart
          </Button>
          
          <div className="flex items-center gap-2">
            <Shield className="w-5 h-5 text-primary" />
            <span className="text-sm font-medium text-foreground">Secure Checkout</span>
          </div>
        </div>

        <div className="grid lg:grid-cols-2 gap-12">
          {/* Payment Form */}
          <div className="space-y-8">
            <div className="space-y-2">
              <h1 className="text-3xl font-bold font-display text-foreground">
                Complete Your Order
              </h1>
              <p className="text-gray-600">
                Secure payment powered by Stripe
              </p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Contact Information */}
              <Card className="border-border shadow-lg bg-white/80 backdrop-blur-sm">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2 text-foreground">
                    <Sparkles className="w-5 h-5" />
                    Contact Information
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <Label htmlFor="email" className="text-gray-700 font-medium">Email Address</Label>
                    <Input
                      id="email"
                      name="email"
                      type="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      className="mt-1 border-border focus:border-primary focus:ring-primary"
                      required
                    />
                  </div>
                  
                  <div>
                    <Label htmlFor="fullName" className="text-gray-700 font-medium">Full Name</Label>
                    <Input
                      id="fullName"
                      name="fullName"
                      value={formData.fullName}
                      onChange={handleInputChange}
                      className="mt-1 border-border focus:border-primary focus:ring-primary"
                      required
                    />
                  </div>
                </CardContent>
              </Card>

              {/* Shipping Address */}
              <Card className="border-border shadow-lg bg-white/80 backdrop-blur-sm">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2 text-foreground">
                    <Shield className="w-5 h-5" />
                    Shipping Address
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <Label htmlFor="address" className="text-gray-700 font-medium">Street Address</Label>
                    <Input
                      id="address"
                      name="address"
                      value={formData.address}
                      onChange={handleInputChange}
                      className="mt-1 border-border focus:border-primary focus:ring-primary"
                      required
                    />
                  </div>
                  
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="city" className="text-gray-700 font-medium">City</Label>
                      <Input
                        id="city"
                        name="city"
                        value={formData.city}
                        onChange={handleInputChange}
                        className="mt-1 border-border focus:border-primary focus:ring-primary"
                        required
                      />
                    </div>
                    
                    <div>
                      <Label htmlFor="province" className="text-gray-700 font-medium">Province</Label>
                      <Input
                        id="province"
                        name="province"
                        value={formData.province}
                        onChange={handleInputChange}
                        placeholder="ON"
                        className="mt-1 border-border focus:border-primary focus:ring-primary"
                        required
                      />
                    </div>
                  </div>
                  
                  <div>
                    <Label htmlFor="postalCode" className="text-gray-700 font-medium">Postal Code</Label>
                    <Input
                      id="postalCode"
                      name="postalCode"
                      value={formData.postalCode}
                      onChange={handleInputChange}
                      placeholder="K1A 0A6"
                      className="mt-1 border-border focus:border-primary focus:ring-primary"
                      required
                    />
                  </div>
                </CardContent>
              </Card>

              {/* Payment Method */}
              <Card className="border-border shadow-lg bg-white/80 backdrop-blur-sm">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2 text-foreground">
                    <CreditCard className="w-5 h-5" />
                    Payment Method
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="p-4 border border-border rounded-lg bg-muted/30">
                    <CardElement
                      options={{
                        style: {
                          base: {
                            fontSize: '16px',
                            color: '#000000',
                            fontFamily: 'Inter, system-ui, sans-serif',
                            '::placeholder': {
                              color: '#134686',
                            },
                          },
                        },
                      }}
                    />
                  </div>
                  
                  <div className="flex items-center gap-2 mt-4 p-3 bg-muted rounded-lg">
                    <Lock className="w-4 h-4 text-primary" />
                    <span className="text-sm text-foreground">
                      Your payment information is encrypted and secure
                    </span>
                  </div>
                </CardContent>
              </Card>

              <Button
                type="submit"
                disabled={!stripe || isProcessing}
                className="w-full bg-primary hover:bg-primary/90 text-primary-foreground py-4 text-lg font-semibold rounded-xl shadow-xl hover:shadow-2xl transition-all duration-300 transform-gpu hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isProcessing ? (
                  <div className="flex items-center gap-2">
                    <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                    Processing Payment...
                  </div>
                ) : (
                  `Complete Order - $${finalTotal.toFixed(2)} CAD`
                )}
              </Button>
            </form>
          </div>

          {/* Order Summary */}
          <div className="space-y-6">
            <Card className="border-border shadow-lg bg-white/80 backdrop-blur-sm sticky top-8">
              <CardHeader>
                <CardTitle className="text-foreground">Order Summary</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {/* Cart Items */}
                <div className="space-y-3">
                  {items.map((item) => (
                    <div key={item.id} className="flex items-center gap-3 p-3 bg-muted/50 rounded-lg">
                      <img
                        src={item.image}
                        alt={item.name}
                        className="w-12 h-12 object-cover rounded-lg"
                      />
                      <div className="flex-1">
                        <h4 className="font-medium text-gray-900">{item.name}</h4>
                        <p className="text-sm text-gray-600">Qty: {item.quantity}</p>
                      </div>
                      <span className="font-semibold text-primary">
                        ${(item.price * item.quantity).toFixed(2)}
                      </span>
                    </div>
                  ))}
                </div>

                <Separator className="bg-border" />

                {/* Price Breakdown */}
                <div className="space-y-2">
                  <div className="flex justify-between text-gray-600">
                    <span>Subtotal</span>
                    <span>${totalAmount.toFixed(2)}</span>
                  </div>
                  
                  <div className="flex justify-between text-gray-600">
                    <span>Shipping</span>
                    <span>
                      {shipping === 0 ? (
                        <span className="text-primary font-medium">FREE</span>
                      ) : (
                        `$${shipping.toFixed(2)}`
                      )}
                    </span>
                  </div>
                  
                  <div className="flex justify-between text-gray-600">
                    <span>HST (13%)</span>
                    <span>${taxes.toFixed(2)}</span>
                  </div>
                  
                  <Separator className="bg-border" />
                  
                  <div className="flex justify-between text-lg font-bold text-foreground">
                    <span>Total</span>
                    <span>${finalTotal.toFixed(2)} CAD</span>
                  </div>
                </div>

                {totalAmount < 50 && (
                  <div className="p-3 bg-muted border border-border rounded-lg">
                    <p className="text-sm text-foreground">
                      Add ${(50 - totalAmount).toFixed(2)} more for free shipping!
                    </p>
                  </div>
                )}
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

const Payment = () => {
  return (
    <Elements stripe={stripePromise}>
      <PaymentForm />
    </Elements>
  );
};

export default Payment;

