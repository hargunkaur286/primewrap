import { useNavigate } from 'react-router-dom';
import { toast } from '@/hooks/use-toast';
import { CheckCircle, ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import ProductCard from '@/components/ProductCard';
import ProductBenefits from '@/components/ProductBenefits';
import Testimonials from '@/components/Testimonials';

const Shop = () => {
  const navigate = useNavigate();

  const products = [
    {
      id: 'one-time',
      name: 'One Time Purchase',
      tagline: 'For first-time customers to try out 15-bags pack',
      price: 6.49,
      image: '/uploads/9a4802e7-c0b1-4503-ada5-a1ee29b8504b.png',
      checkoutConfig: {
        productSlug: 'pinewrap',
        planType: 'one_time',
        quantity: 1,
      },
    },
    {
      id: '6-month-sub-10-bags',
      name: '6-Month 10-Bags',
      tagline: 'Most Popular, Pack of 10-bags delivered every month.',
      price: 5.99,
      image: '/uploads/e2e7eb2e-d8a9-4c28-9248-a226799224b2.png',
      checkoutConfig: {
        productSlug: 'pinewrap',
        planType: 'sub_6m_10',
        quantity: 1,
      },
    },
    {
      id: '6-month-sub-15-bags',
      name: '6-Months, 15-Bags',
      tagline: '15-bags each Pack, preferred by bigger families',
      price: 7.39,
      image: '/uploads/e2e7eb2e-d8a9-4c28-9248-a226799224b2.png',
      checkoutConfig: {
        productSlug: 'pinewrap',
        planType: 'sub_6m_15',
        quantity: 1,
      },
    },
  ];

  const guarantees = [
    { icon: <CheckCircle className="w-4 md:w-5 h-4 md:h-5" />, text: 'Guaranteed Satisfaction' },
    { icon: <CheckCircle className="w-4 md:w-5 h-4 md:h-5" />, text: 'Certified & Lab Tested' },
    { icon: <CheckCircle className="w-4 md:w-5 h-4 md:h-5" />, text: '24/7 Customer Support' },
  ];

  const handleBuyNow = (product: (typeof products)[number]) => {
    const params = new URLSearchParams({
      product: product.checkoutConfig.productSlug,
      plan: product.checkoutConfig.planType,
      qty: String(product.checkoutConfig.quantity),
    });

    navigate(`/checkout?${params.toString()}`);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-50 via-white to-cyan-50/30">
      <section className="relative py-12 md:py-24 overflow-hidden">
        <div className="absolute inset-0">
          <div className="absolute top-1/4 right-1/4 w-48 md:w-72 h-48 md:h-72 bg-emerald-200/30 rounded-full blur-3xl animate-float"></div>
          <div
            className="absolute bottom-1/4 left-1/4 w-64 md:w-96 h-64 md:h-96 bg-cyan-200/30 rounded-full blur-3xl animate-float"
            style={{ animationDelay: '1s' }}
          ></div>
        </div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12 md:mb-10 space-y-4 md:space-y-8">
            <h1 className="text-4xl md:text-5xl lg:text-7xl font-bold font-display tracking-tight leading-[0.9]">
              <span className="bg-gradient-to-r from-gray-900 to-emerald-900 bg-clip-text text-transparent">
                Our
              </span>
              <br />
              <span className="bg-gradient-to-r from-emerald-600 to-cyan-600 bg-clip-text text-transparent">
                Products
              </span>
            </h1>

            <p className="text-lg md:text-xl text-gray-600 max-w-2xl mx-auto leading-relaxed px-4">
              Premium quality garbage bags engineered for the future of sustainable living
            </p>

            <div className="flex flex-wrap justify-center gap-3 md:gap-6 mt-6 md:mt-8">
              {guarantees.map((guarantee, index) => (
                <div
                  key={index}
                  className="flex items-center space-x-2 text-emerald-700 bg-white/80 backdrop-blur-sm rounded-full px-3 md:px-4 py-2 shadow-md"
                >
                  {guarantee.icon}
                  <span className="text-xs md:text-sm font-medium">{guarantee.text}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="grid md:grid-cols-3 gap-2 md:gap-12 max-w-5xl mx-auto mb-12 md:mb-20">
            {products.map((product, index) => (
              <div key={product.id} className="animate-slide-up" style={{ animationDelay: `${index * 0.2}s` }}>
                <ProductCard
                  product={product}
                  onAddToCart={() => handleBuyNow(product)}
                />
              </div>
            ))}
          </div>

          <div className="mb-12 md:mb-20">
            <div className="text-center mb-8 md:mb-12">
              <h2 className="text-2xl md:text-3xl font-bold font-display mb-4 bg-gradient-to-r from-gray-900 to-emerald-900 bg-clip-text text-transparent">
                Why Choose Pinewrap?
              </h2>
              <p className="text-base md:text-lg text-gray-600 max-w-2xl mx-auto px-4">
                Every product is designed with your needs and the environment in mind
              </p>
            </div>
            <ProductBenefits />
          </div>

          <div className="text-center bg-secondary rounded-3xl p-8 md:p-12 text-gray-900 relative overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-r from-white/10 to-transparent animate-shimmer"></div>
            <div className="relative z-10">
              <h3 className="text-2xl md:text-3xl font-bold mb-4 text-primary">Ready to Make the Switch?</h3>
              <p className="text-lg md:text-xl mb-6 md:mb-8 opacity-90 text-gray-800">
                Join thousands of smart-decision customers today
              </p>
              <Button className="bg-gray-900 text-secondary bg-primary px-6 md:px-8 py-3 md:py-4 text-base md:text-lg font-semibold rounded-2xl shadow-xl hover:shadow-2xl transition-all duration-300 transform-gpu hover:scale-105">
                <span className="flex items-center gap-2">
                  Start Shopping
                  <ArrowRight className="w-4 md:w-5 h-4 md:h-5" />
                </span>
              </Button>
            </div>
          </div>
        </div>
      </section>

      <Testimonials />
    </div>
  );
};

export default Shop;