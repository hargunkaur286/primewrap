import React from 'react';
import { useCart } from '@/contexts/CartContext';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Separator } from '@/components/ui/separator';
import { Badge } from '@/components/ui/badge';
import { Minus, Plus, Trash2, ShoppingBag, ArrowRight } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const Cart = () => {
  const { items, updateQuantity, removeItem, getTotalPrice, getTotalItems } = useCart();
  const navigate = useNavigate();

  const handleProceedToPayment = () => {
    navigate('/payment');
  };

  if (items.length === 0) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-sage-50 to-kraft-50 py-16">
        <div className="max-w-4xl mx-auto px-4">
          <div className="text-center py-20">
            <ShoppingBag className="mx-auto h-24 w-24 text-sage-300 mb-6" />
            <h1 className="text-3xl font-bold text-charcoal-900 mb-4">Your Cart is Empty</h1>
            <p className="text-charcoal-600 mb-8">Start shopping to add items to your cart</p>
            <Button 
              onClick={() => navigate('/shop')}
              className="bg-gradient-to-r from-forest-green-600 to-sage-600 hover:from-forest-green-700 hover:to-sage-700 text-white px-8 py-3"
            >
              Continue Shopping
            </Button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-sage-50 to-kraft-50 py-16">
      <div className="max-w-6xl mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-charcoal-900 mb-4">
            Shopping Cart
          </h1>
          <p className="text-charcoal-600">
            Review your items and proceed to checkout
          </p>
          <Badge variant="secondary" className="mt-2">
            {getTotalItems()} {getTotalItems() === 1 ? 'item' : 'items'}
          </Badge>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Cart Items */}
          <div className="lg:col-span-2">
            <Card className="border-sage-200 shadow-lg">
              <CardHeader>
                <CardTitle className="text-charcoal-900">Cart Items</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {items.map((item) => (
                  <div
                    key={item.id}
                    className="flex flex-col sm:flex-row sm:items-center gap-4 p-4 bg-white rounded-lg border border-sage-100"
                  >
                    <img
                      src={item.image}
                      alt={item.name}
                      className="w-16 h-16 sm:w-20 sm:h-20 object-cover rounded-md bg-kraft-100"
                    />
                    
                    <div className="flex-1 min-w-0">
                      <h3 className="font-semibold text-charcoal-900 truncate">
                        {item.name}
                      </h3>
                      <p className="text-sage-600">
                        ${item.price.toFixed(2)} each
                      </p>
                    </div>

                    <div className="flex items-center flex-wrap gap-3">
                      <Button
                        variant="outline"
                        size="icon"
                        onClick={() => updateQuantity(item.id, item.quantity - 1)}
                        className="h-8 w-8 border-sage-300 hover:bg-sage-50"
                      >
                        <Minus className="h-3 w-3" />
                      </Button>
                      
                      <Input
                        type="number"
                        value={item.quantity}
                        onChange={(e) => updateQuantity(item.id, parseInt(e.target.value) || 1)}
                        className="w-16 text-center border-sage-300"
                        min="1"
                      />
                      
                      <Button
                        variant="outline"
                        size="icon"
                        onClick={() => updateQuantity(item.id, item.quantity + 1)}
                        className="h-8 w-8 border-sage-300 hover:bg-sage-50"
                      >
                        <Plus className="h-3 w-3" />
                      </Button>
                    </div>

                    <div className="text-right sm:ml-auto">
                      <p className="font-semibold text-charcoal-900">
                        ${(item.price * item.quantity).toFixed(2)}
                      </p>
                    </div>

                    <Button
                      variant="outline"
                      size="icon"
                      onClick={() => removeItem(item.id)}
                      className="h-8 w-8 border-red-300 text-red-500 hover:bg-red-50 hover:text-red-700"
                    >
                      <Trash2 className="h-3 w-3" />
                    </Button>
                  </div>
                ))}
              </CardContent>
            </Card>
          </div>

          {/* Order Summary */}
          <div className="lg:col-span-1">
            <Card className="border-sage-200 shadow-lg lg:sticky lg:top-8">
              <CardHeader>
                <CardTitle className="text-charcoal-900">Order Summary</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <div className="flex justify-between text-charcoal-600">
                    <span>Subtotal ({getTotalItems()} items)</span>
                    <span>${getTotalPrice().toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between text-charcoal-600">
                    <span>Shipping</span>
                    <span>$9.99</span>
                  </div>
                  <div className="flex justify-between text-charcoal-600">
                    <span>Tax</span>
                    <span>${(getTotalPrice() * 0.13).toFixed(2)}</span>
                  </div>
                </div>
                
                <Separator className="bg-sage-200" />
                
                <div className="flex justify-between text-lg font-bold text-charcoal-900">
                  <span>Total</span>
                  <span>${(getTotalPrice() + 9.99 + (getTotalPrice() * 0.13)).toFixed(2)}</span>
                </div>

                <Button 
                  onClick={handleProceedToPayment}
                  className="w-full bg-gradient-to-r from-forest-green-600 to-sage-600 hover:from-forest-green-700 hover:to-sage-700 text-white font-semibold py-3 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300"
                >
                  Proceed to Payment
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>

                <Button 
                  variant="outline"
                  onClick={() => navigate('/shop')}
                  className="w-full border-sage-300 text-sage-700 hover:bg-sage-50"
                >
                  Continue Shopping
                </Button>

                {/* Security & Trust Badges */}
                <div className="pt-4 text-center">
                  <div className="text-xs text-charcoal-500 mb-2">Secure Checkout</div>
                  <div className="flex justify-center space-x-2">
                    <Badge variant="outline" className="text-xs">SSL Encrypted</Badge>
                    <Badge variant="outline" className="text-xs">Secure Payment</Badge>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cart;