
import { Button } from '@/components/ui/button';
import { ShoppingCart, Star, Sparkles } from 'lucide-react';
import { Link } from 'react-router-dom';

interface Product {
  id: string;
  name: string;
  tagline: string;
  price: number;
  image: string;
}

interface ProductCardProps {
  product: Product;
  onAddToCart: () => void;
}

const ProductCard = ({ product, onAddToCart }: ProductCardProps) => {
  const getProductPath = (id: string) => {
    switch (id) {
      case 'scented-bags':
        return '/product/scented';
      case 'recycling-bags':
        return '/product/recycling';
      default:
        return `/product/${id}`;
    }
  };

  return (
    <div className="group relative">
      <div className="relative bg-gradient-to-br from-white to-emerald-50/30 rounded-3xl shadow-lg hover:shadow-2xl transition-all duration-500 overflow-hidden border border-emerald-100/50 backdrop-blur-sm transform-gpu hover:scale-[1.02]">
        {/* Enhanced 3D Glow Effect */}
        <div className="absolute inset-0 bg-gradient-to-r from-emerald-500/10 via-cyan-500/10 to-teal-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-3xl"></div>
        
        {/* Image Container */}
        <Link to={getProductPath(product.id)}>
          <div className="relative aspect-square overflow-hidden rounded-t-3xl cursor-pointer">
            <div className="absolute inset-0 bg-gradient-to-br from-emerald-100 to-cyan-100"></div>
            <img
              src={product.image}
              alt={product.name}
              className="w-full h-full object-cover transform-gpu group-hover:scale-110 transition-transform duration-700 ease-out"
            />
            
            {/* Enhanced Floating Badge */}
            <div className="absolute top-2 md:top-4 right-2 md:right-4 bg-white/90 backdrop-blur-sm rounded-full px-2 md:px-3 py-1 text-xs font-semibold text-emerald-700 shadow-lg transform-gpu group-hover:scale-110 transition-transform duration-300 flex items-center gap-1">
              <Sparkles className="w-3 h-3" />
              <span className="hidden sm:inline">ECO-FRIENDLY</span>
              <span className="sm:hidden">ECO</span>
            </div>

            {/* Quality Rating */}
            <div className="absolute top-2 md:top-4 left-2 md:left-4 bg-white/90 backdrop-blur-sm rounded-full px-2 md:px-3 py-1 text-xs font-semibold text-gray-700 shadow-lg transform-gpu group-hover:scale-110 transition-transform duration-300 flex items-center gap-1">
              <Star className="w-3 h-3 fill-yellow-400 text-yellow-400" />
              5.0
            </div>
          </div>
        </Link>
        
        {/* Enhanced Content */}
        <div className="relative p-4 md:p-8 space-y-3 md:space-y-4">
          <div className="space-y-2">
            <Link to={getProductPath(product.id)}>
              <h3 className="text-lg md:text-2xl font-bold text-gray-900 tracking-tight group-hover:text-emerald-600 transition-colors duration-300 cursor-pointer">
                {product.name}
              </h3>
            </Link>
            <p className="text-sm md:text-base text-gray-600 leading-relaxed">
              {product.tagline}
            </p>
          </div>

          {/* Enhanced Features List */}
          <div className="flex flex-wrap gap-1 md:gap-2 pt-2">
            <span className="text-xs bg-emerald-100/80 text-white px-2 md:px-3 py-1 rounded-full font-medium">
              Biodegradable
            </span>
            <span className="text-xs bg-teal-100/80 text-white px-2 md:px-3 py-1 rounded-full font-medium">
              Ultra Strong
            </span>
            <span className="text-xs bg-teal-100/80 text-white px-2 md:px-3 py-1 rounded-full font-medium">
              Premium
            </span>
          </div>
          
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 pt-4">
            <div className="space-y-1">
              <div className="text-2xl md:text-3xl font-bold bg-gradient-to-r from-emerald-600 to-cyan-600 bg-clip-text">
                ${product.price}
              </div>
              <div className="text-xs text-gray-500 uppercase tracking-wide">
                Premium Quality
              </div>
            </div>
            
            <Button
              onClick={onAddToCart}
              className="relative bg-gradient-to-r from-emerald-600 to-cyan-600 hover:from-emerald-700 hover:to-cyan-700 text-white px-4 md:px-8 py-3 font-semibold tracking-wide rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 transform-gpu hover:scale-105 group/button w-full sm:w-auto"
            >
              <span className="relative z-10 flex items-center justify-center gap-2">
                <ShoppingCart className="w-4 h-4 group-hover/button:animate-bounce" />
                <span className="hidden sm:inline">ADD TO CART</span>
                <span className="sm:hidden">ADD</span>
              </span>
              <div className="absolute inset-0 bg-gradient-to-r from-white/20 to-transparent rounded-2xl opacity-0 group-hover/button:opacity-100 transition-opacity duration-300"></div>
            </Button>
          </div>
        </div>
        
        {/* Enhanced 3D Shadow */}
        <div className="absolute inset-0 rounded-3xl shadow-2xl opacity-0 group-hover:opacity-30 transition-opacity duration-500 pointer-events-none"></div>
      </div>
    </div>
  );
};

export default ProductCard;
