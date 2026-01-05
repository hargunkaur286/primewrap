
import { useCart } from '@/contexts/CartContext';
import { toast } from '@/hooks/use-toast';
import { Sparkles, Shield, Leaf, Star, ArrowRight, CheckCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import ProductCard from '@/components/ProductCard';
import ProductBenefits from '@/components/ProductBenefits';
import Testimonials from '@/components/Testimonials';

const Shop = () => {
  const { addItem } = useCart();

  const products = [
    {
      id: 'scented-bags',
      name: 'Pinewrap Scented',
      tagline: 'Fresh scent, lasting strength',
      price: 24.99,
      image: '/uploads/9a4802e7-c0b1-4503-ada5-a1ee29b8504b.png'
    },
    {
      id: 'recycling-bags',
      name: 'Pinewrap Recycling',
      tagline: 'Made from 100% recycled materials',
      price: 22.99,
      image: '/uploads/e2e7eb2e-d8a9-4c28-9248-a226799224b2.png'
    }
  ];

  const guarantees = [
    { icon: <CheckCircle className="w-4 md:w-5 h-4 md:h-5" />, text: "30-Day Money Back Guarantee" },
    { icon: <CheckCircle className="w-4 md:w-5 h-4 md:h-5" />, text: "Free Shipping on Orders Over $50" },
    { icon: <CheckCircle className="w-4 md:w-5 h-4 md:h-5" />, text: "Eco-Certified & Lab Tested" },
    { icon: <CheckCircle className="w-4 md:w-5 h-4 md:h-5" />, text: "24/7 Customer Support" }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-50 via-white to-cyan-50/30">
      {/* Hero Section */}
      <section className="relative py-12 md:py-24 overflow-hidden">
        {/* Background Effects */}
        <div className="absolute inset-0">
          <div className="absolute top-1/4 right-1/4 w-48 md:w-72 h-48 md:h-72 bg-emerald-200/30 rounded-full blur-3xl animate-float"></div>
          <div className="absolute bottom-1/4 left-1/4 w-64 md:w-96 h-64 md:h-96 bg-cyan-200/30 rounded-full blur-3xl animate-float" style={{animationDelay: '1s'}}></div>
        </div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12 md:mb-20 space-y-4 md:space-y-8">
            <div className="inline-flex items-center bg-white/80 backdrop-blur-sm rounded-full px-4 md:px-6 py-2 md:py-3 shadow-lg border border-white/20">
              <Sparkles className="w-4 md:w-5 h-4 md:h-5 text-emerald-600 mr-2" />
              <span className="text-xs md:text-sm font-semibold text-emerald-700 tracking-wide">PREMIUM COLLECTION</span>
            </div>
            
            <h1 className="text-4xl md:text-5xl lg:text-7xl font-bold font-display tracking-tight leading-[0.9]">
              <span className="bg-gradient-to-r from-gray-900 to-emerald-900 bg-clip-text">
                Our
              </span>
              <br />
              <span className="bg-gradient-to-r from-emerald-600 to-cyan-600 bg-clip-text text-primary">
                Products
              </span>
            </h1>
            
            <p className="text-lg md:text-xl text-gray-600 max-w-2xl mx-auto leading-relaxed px-4">
              Premium eco-friendly garbage bags engineered for the future of sustainable living
            </p>

            {/* Trust Indicators */}
            <div className="flex flex-wrap justify-center gap-3 md:gap-6 mt-6 md:mt-8">
              {guarantees.map((guarantee, index) => (
                <div key={index} className="flex items-center space-x-2 text-emerald-700 bg-white/80 backdrop-blur-sm rounded-full px-3 md:px-4 py-2 shadow-md">
                  {guarantee.icon}
                  <span className="text-xs md:text-sm font-medium">{guarantee.text}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Products Grid */}
          <div className="grid md:grid-cols-2 gap-8 md:gap-12 max-w-5xl mx-auto mb-12 md:mb-20">
            {products.map((product, index) => (
              <div key={product.id} className="animate-slide-up" style={{animationDelay: `${index * 0.2}s`}}>
                <ProductCard
                  product={product}
                  onAddToCart={() => {
                    addItem(product);
                    toast({
                      title: "Added to cart! 🎉",
                      description: `${product.name} has been added to your cart.`,
                    });
                  }}
                />
              </div>
            ))}
          </div>

          {/* Product Comparison */}
          <div className="bg-white/80 backdrop-blur-xl rounded-3xl p-6 md:p-12 shadow-2xl border border-white/20 mb-12 md:mb-20">
            <h2 className="text-2xl md:text-3xl font-bold font-display text-center mb-8 md:mb-12 bg-gradient-to-r from-gray-900 to-emerald-900 bg-clip-text">
              Compare Our Products
            </h2>
            
            <div className="grid md:grid-cols-2 gap-6 md:gap-8">
              <div className="text-center space-y-4 md:space-y-6 p-4 md:p-8 bg-gradient-to-br from-emerald-50 to-cyan-50 rounded-2xl hover-lift">
                <img 
                  src="/uploads/9a4802e7-c0b1-4503-ada5-a1ee29b8504b.png" 
                  alt="Scented Bags" 
                  className="w-32 md:w-48 h-32 md:h-48 mx-auto object-cover rounded-2xl shadow-lg"
                />
                <h3 className="text-xl md:text-2xl font-bold text-gray-900">Scented Collection</h3>
                <ul className="space-y-1 md:space-y-2 text-sm md:text-base text-gray-600">
                  <li>• Fresh lavender scent</li>
                  <li>• Odor neutralization</li>
                  <li>• 13-gallon capacity</li>
                  <li>• Biodegradable material</li>
                </ul>
              </div>
              
              <div className="text-center space-y-4 md:space-y-6 p-4 md:p-8 bg-gradient-to-br from-cyan-50 to-emerald-50 rounded-2xl hover-lift">
                <img 
                  src="/uploads/e2e7eb2e-d8a9-4c28-9248-a226799224b2.png" 
                  alt="Recycling Bags" 
                  className="w-32 md:w-48 h-32 md:h-48 mx-auto object-cover rounded-2xl shadow-lg"
                />
                <h3 className="text-xl md:text-2xl font-bold text-gray-900">Recycling Collection</h3>
                <ul className="space-y-1 md:space-y-2 text-sm md:text-base text-gray-600">
                  <li>• 100% recycled materials</li>
                  <li>• Clear sorting design</li>
                  <li>• Heavy-duty construction</li>
                  <li>• Circular economy support</li>
                </ul>
              </div>
            </div>
          </div>

          {/* Product Benefits Section */}
          <div className="mb-12 md:mb-20">
            <div className="text-center mb-8 md:mb-12">
              <h2 className="text-2xl md:text-3xl font-bold font-display mb-4 bg-gradient-to-r from-gray-900 to-emerald-900 bg-clip-text">
                Why Choose Pinewrap?
              </h2>
              <p className="text-base md:text-lg text-gray-600 max-w-2xl mx-auto px-4">
                Every product is designed with your needs and the environment in mind
              </p>
            </div>
            <ProductBenefits />
          </div>

          {/* Call to Action */}
          <div className="text-center bg-gradient-to-r from-emerald-600 to-cyan-600 rounded-3xl p-8 md:p-12 text-white relative overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-r from-white/10 to-transparent animate-shimmer"></div>
            <div className="relative z-10">
              <h3 className="text-2xl md:text-3xl font-bold mb-4 text-primary">Ready to Make the Switch?</h3>
              <p className="text-lg md:text-xl mb-6 md:mb-8 opacity-90 text-primary">Join thousands of eco-conscious customers today</p>
              <Button className="bg-white text-emerald-600 hover:bg-gray-100 px-6 md:px-8 py-3 md:py-4 text-base md:text-lg font-semibold rounded-2xl shadow-xl hover:shadow-2xl transition-all duration-300 transform-gpu hover:scale-105">
                <span className="flex items-center gap-2">
                  Start Shopping
                  <ArrowRight className="w-4 md:w-5 h-4 md:h-5" />
                </span>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <Testimonials />
    </div>
  );
};

export default Shop;
