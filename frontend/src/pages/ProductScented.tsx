
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, ShoppingCart, Star, Sparkles, CheckCircle, PartyPopper } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useCart } from '@/contexts/CartContext';
import { toast } from '@/hooks/use-toast';

const ProductScented = () => {
  const { addItem } = useCart();
  const [quantity, setQuantity] = useState(1);

  const product = {
    id: 'scented-bags',
    name: 'Pinewrap Scented',
    tagline: 'Fresh scent, lasting strength',
    price: 24.99,
    image: '/uploads/9a4802e7-c0b1-4503-ada5-a1ee29b8504b.png',
    description: 'Our premium scented garbage bags combine powerful odor control with eco-friendly materials. Each bag is infused with a light, fresh scent that neutralizes unpleasant odors while maintaining our commitment to sustainability.',
    features: [
      'Fresh lavender scent neutralizes odors',
      'Extra-strong puncture resistance',
      '100% biodegradable materials',
      'Fits standard 13-gallon bins perfectly',
      'Leak-proof bottom seal',
      'Easy-tie handles for convenience'
    ],
    specifications: {
      capacity: '13 gallons',
      material: 'Biodegradable polymer blend',
      scent: 'Fresh lavender',
      count: '50 bags per box',
      dimensions: '24" x 27"',
      thickness: '0.9 mil'
    }
  };

  const handleAddToCart = () => {
    for (let i = 0; i < quantity; i++) {
      addItem(product);
    }
    toast({
      title: (
        <span className="inline-flex items-center gap-2">
          <PartyPopper className="w-4 h-4" />
          Added to cart!
        </span>
      ),
      description: `${quantity} ${product.name}${quantity > 1 ? 's' : ''} added to your cart.`,
    });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-50 via-white to-cyan-50/30">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 lg:py-12">
        {/* Back Navigation */}
        <Link to="/shop" className="inline-flex items-center gap-2 text-emerald-600 hover:text-emerald-700 mb-8 transition-colors">
          <ArrowLeft className="w-4 h-4" />
          Back to Shop
        </Link>

        <div className="grid lg:grid-cols-2 gap-8 lg:gap-16">
          {/* Product Image */}
          <div className="relative group">
            <div className="aspect-square bg-gradient-to-br from-emerald-100 to-cyan-100 rounded-3xl overflow-hidden shadow-xl">
              <img
                src={product.image}
                alt={product.name}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
              />
              {/* Quality Badge */}
              <div className="absolute top-4 left-4 bg-white/90 backdrop-blur-sm rounded-full px-3 py-1 text-xs font-semibold text-gray-700 shadow-lg flex items-center gap-1">
                <Star className="w-3 h-3 fill-yellow-400 text-yellow-400" />
                5.0
              </div>
              {/* Eco Badge */}
              <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm rounded-full px-3 py-1 text-xs font-semibold text-emerald-700 shadow-lg flex items-center gap-1">
                <Sparkles className="w-3 h-3" />
                ECO-FRIENDLY
              </div>
            </div>
          </div>

          {/* Product Info */}
          <div className="flex flex-col justify-center space-y-6">
            <div>
              <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 mb-4 tracking-tight">
                {product.name}
              </h1>
              <p className="text-lg md:text-xl text-gray-600 mb-6">
                {product.tagline}
              </p>
              <p className="text-gray-700 leading-relaxed text-sm md:text-base">
                {product.description}
              </p>
            </div>

            {/* Price */}
            <div className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-emerald-600 to-cyan-600 bg-clip-text">
              ${product.price}
            </div>

            {/* Quantity Selector */}
            <div className="flex flex-col sm:flex-row sm:items-center gap-4">
              <span className="font-medium text-gray-900">Quantity:</span>
              <div className="flex items-center gap-3">
                <button
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  className="w-10 h-10 rounded-full border border-emerald-300 hover:bg-emerald-50 transition-colors flex items-center justify-center"
                >
                  -
                </button>
                <span className="w-12 text-center font-medium text-lg">{quantity}</span>
                <button
                  onClick={() => setQuantity(quantity + 1)}
                  className="w-10 h-10 rounded-full border border-emerald-300 hover:bg-emerald-50 transition-colors flex items-center justify-center"
                >
                  +
                </button>
              </div>
            </div>

            {/* Add to Cart Button */}
            <Button
              onClick={handleAddToCart}
              className="bg-gradient-to-r from-emerald-600 to-cyan-600 hover:from-emerald-700 hover:to-cyan-700 text-white py-4 text-lg font-semibold tracking-wide w-full sm:w-auto"
            >
              <ShoppingCart className="w-5 h-5 mr-2" />
              ADD TO CART
            </Button>

            {/* Features */}
            <div>
              <h3 className="text-xl font-bold text-gray-900 mb-4">Key Features</h3>
              <ul className="space-y-3">
                {product.features.map((feature, index) => (
                  <li key={index} className="flex items-start gap-3">
                    <CheckCircle className="text-emerald-600 mt-0.5 flex-shrink-0 w-5 h-5" />
                    <span className="text-gray-700">{feature}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        {/* Specifications */}
        <div className="mt-16">
          <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-8 text-center">Product Specifications</h2>
          <div className="bg-white/80 backdrop-blur-sm rounded-3xl p-6 md:p-8 shadow-lg">
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {Object.entries(product.specifications).map(([key, value]) => (
                <div key={key} className="text-center">
                  <div className="text-sm text-gray-500 uppercase tracking-wide mb-1">
                    {key.replace(/([A-Z])/g, ' $1').replace(/^./, str => str.toUpperCase())}
                  </div>
                  <div className="font-semibold text-gray-900">{value}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductScented;
