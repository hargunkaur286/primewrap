import { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { ArrowUp } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useCart } from '@/contexts/CartContext';
import { toast } from '@/hooks/use-toast';

const ProductDetail = () => {
  const { id } = useParams();
  const { addItem } = useCart();
  const [quantity, setQuantity] = useState(1);

  const products = {
    'scented-bags': {
      id: 'scented-bags',
      name: 'PrimeWrap Scented',
      tagline: 'Fresh scent, lasting strength',
      price: 24.99,
      image: '/lovable-uploads/9a4802e7-c0b1-4503-ada5-a1ee29b8504b.png',
      description: 'Our premium scented garbage bags combine powerful odor control with eco-friendly materials. Each bag is infused with a light, fresh scent that neutralizes unpleasant odors while maintaining our commitment to sustainability.',
      benefits: [
        'Fresh lavender scent neutralizes odors',
        'Extra-strong puncture resistance',
        '100% biodegradable materials',
        'Fits standard 13-gallon bins perfectly',
        'Leak-proof bottom seal',
        'Easy-tie handles for convenience'
      ]
    },
    'recycling-bags': {
      id: 'recycling-bags',
      name: 'PrimeWrap Recycling',
      tagline: 'Made from 100% recycled materials',
      price: 22.99,
      image: '/lovable-uploads/e2e7eb2e-d8a9-4c28-9248-a226799224b2.png',
      description: 'Leading the circular economy, our recycling bags are crafted entirely from post-consumer recycled materials. Perfect for sorting and disposing of recyclables while maintaining the highest standards of strength and reliability.',
      benefits: [
        '100% post-consumer recycled content',
        'Clear design for easy sorting',
        'Heavy-duty construction',
        'Certified for curbside recycling',
        'Reduces plastic waste by 75%',
        'Supports circular economy principles'
      ]
    }
  };

  const product = products[id as keyof typeof products];

  if (!product) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-charcoal mb-4">Product not found</h1>
          <Link to="/shop">
            <Button className="bg-prime-blue hover:bg-prime-blue/90 text-white">
              Back to Shop
            </Button>
          </Link>
        </div>
      </div>
    );
  }

  const handleAddToCart = () => {
    for (let i = 0; i < quantity; i++) {
      addItem(product);
    }
    toast({
      title: "Added to cart!",
      description: `${quantity} ${product.name}${quantity > 1 ? 's' : ''} added to your cart.`,
    });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-blue-50/30">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Breadcrumb */}
        <nav className="mb-8">
          <div className="flex items-center gap-2 text-sm text-charcoal/60">
            <Link to="/" className="hover:text-prime-blue">Home</Link>
            <span>/</span>
            <Link to="/shop" className="hover:text-prime-blue">Shop</Link>
            <span>/</span>
            <span className="text-charcoal">{product.name}</span>
          </div>
        </nav>

        <div className="grid lg:grid-cols-2 gap-16">
          {/* Product Image */}
          <div className="relative group perspective-1000">
            <div className="aspect-square bg-gradient-to-br from-gray-100 to-gray-200 rounded-3xl overflow-hidden shadow-2xl transform-gpu hover:scale-105 transition-transform duration-500">
              <img
                src={product.image}
                alt={product.name}
                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
              />
              {/* 3D Glow Effect */}
              <div className="absolute inset-0 bg-gradient-to-r from-blue-500/20 via-purple-500/20 to-pink-500/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-3xl"></div>
            </div>
          </div>

          {/* Product Info */}
          <div className="flex flex-col justify-center">
            <h1 className="text-3xl md:text-4xl font-bold text-charcoal mb-4 tracking-tight">
              {product.name}
            </h1>
            <p className="text-xl text-charcoal/70 mb-6">
              {product.tagline}
            </p>
            <p className="text-charcoal/80 leading-relaxed mb-8">
              {product.description}
            </p>

            {/* Price */}
            <div className="text-3xl font-bold text-prime-blue mb-8">
              ${product.price}
            </div>

            {/* Quantity Selector */}
            <div className="flex items-center gap-4 mb-8">
              <span className="font-medium text-charcoal">Quantity:</span>
              <div className="flex items-center gap-3">
                <button
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  className="w-10 h-10 rounded-full border border-sage hover:bg-sage/20 transition-colors flex items-center justify-center"
                >
                  -
                </button>
                <span className="w-12 text-center font-medium">{quantity}</span>
                <button
                  onClick={() => setQuantity(quantity + 1)}
                  className="w-10 h-10 rounded-full border border-sage hover:bg-sage/20 transition-colors flex items-center justify-center"
                >
                  +
                </button>
              </div>
            </div>

            {/* Add to Cart Button */}
            <Button
              onClick={handleAddToCart}
              className="bg-forest-green hover:bg-forest-green/90 text-white py-4 text-lg font-semibold tracking-wide mb-8"
            >
              ADD TO CART
            </Button>

            {/* Benefits */}
            <div>
              <h3 className="text-xl font-bold text-charcoal mb-4">Key Benefits</h3>
              <ul className="space-y-2">
                {product.benefits.map((benefit, index) => (
                  <li key={index} className="flex items-start gap-3">
                    <ArrowUp className="text-forest-green mt-1 flex-shrink-0" size={16} />
                    <span className="text-charcoal/80">{benefit}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetail;
