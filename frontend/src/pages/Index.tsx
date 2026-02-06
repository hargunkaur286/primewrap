import { useState } from 'react';
import { Link } from 'react-router-dom';
import {
  AlertTriangle,
  ArrowDown,
  BadgeCheck,
  Brain,
  Dumbbell,
  Leaf,
  PartyPopper,
  Shield,
  Sparkles,
  Sprout,
  Star,
  XCircle,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useCart } from '@/contexts/CartContext';
import { toast } from '@/hooks/use-toast';
import ProductCard from '@/components/ProductCard';
import FeatureCard from '@/components/FeatureCard';
import { API_BASE } from '@/lib/apiBase';

const Index = () => {
  const [email, setEmail] = useState('');
  const { addItem } = useCart();

  const handleEmailSubmit = async (e: React.FormEvent) => {
  e.preventDefault();

  if (!email) return;

  try {
    const response = await fetch(`${API_BASE}/api/v1/user/subscribe`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email }),
    });

    const message = await response.text();

    if (response.ok) {
      toast({
        title: (
          <span className="inline-flex items-center gap-2">
            <PartyPopper className="w-4 h-4" />
            Subscription Successful!
          </span>
        ),
        description: message,
      });
    } else {
      toast({
        title: (
          <span className="inline-flex items-center gap-2">
            <AlertTriangle className="w-4 h-4" />
            Subscription Failed
          </span>
        ),
        description: message,
        variant: "destructive",
      });
    }

    setEmail('');
  } catch (error) {
    console.error("Newsletter subscription error:", error);
    toast({
      title: (
        <span className="inline-flex items-center gap-2">
          <XCircle className="w-4 h-4" />
          Something went wrong
        </span>
      ),
      description: "Please try again later.",
      variant: "destructive",
    });
  }
};


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

  const features = [
    {
      title: '100% Biodegradable',
      description: 'Break down naturally without harming the environment',
      icon: <Sprout className="w-7 h-7 text-blue-600" />
    },
    {
      title: 'Ultra Strong',
      description: 'Advanced polymer technology for maximum durability',
      icon: <Dumbbell className="w-7 h-7 text-blue-600" />
    },
    {
      title: 'Smart Design',
      description: 'Engineered for modern living with convenience in mind',
      icon: <Brain className="w-7 h-7 text-blue-600" />
    },
    {
      title: 'Certified Quality',
      description: 'Meets all environmental and safety standards worldwide',
      icon: <BadgeCheck className="w-7 h-7 text-blue-600" />
    }
  ];

  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section with 3D Elements */}
      <section className="relative min-h-[90vh] flex items-center overflow-hidden px-4 sm:px-6 lg:px-8">
        {/* Animated Background Elements */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          {/* Hide blurred circles on small screens for clarity */}
          <div className="hidden sm:block absolute top-1/4 left-1/4 w-56 h-56 sm:w-72 sm:h-72 bg-[#FFC400]/20 rounded-full blur-3xl animate-float"></div>
          <div className="hidden sm:block absolute bottom-1/4 right-1/4 w-72 h-72 sm:w-96 sm:h-96 bg-[#0B2D5C]/14 rounded-full blur-3xl animate-float" style={{ animationDelay: '1s' }}></div>
          <div className="hidden sm:block absolute top-1/2 left-1/2 w-48 h-48 sm:w-64 sm:h-64 bg-[#000000]/5 rounded-full blur-3xl animate-float" style={{ animationDelay: '2s' }}></div>
        </div>

        <div className="relative max-w-7xl mx-auto py-20 grid gap-12 lg:grid-cols-2 items-center">
          {/* Left: Text Content */}
          <div className="text-center lg:text-left space-y-8 animate-fade-in">
            <div className="inline-flex items-center bg-white/80 backdrop-blur-sm rounded-full px-6 py-3 shadow-lg border border-white/20 justify-center lg:justify-start">
              <Sparkles className="w-5 h-5 text-emerald-600 mr-2" />
              <span className="text-sm font-semibold text-emerald-700 tracking-wide">REVOLUTIONARY ECO-TECH</span>
            </div>

            <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold font-display tracking-tight leading-tight">
              <span className="text-foreground">
                Cleaner Living
              </span>
              <br />
              <span className="text-primary">
                Starts With
              </span>
              <br />
              <span className="text-foreground">
                Pinewrap
              </span>
            </h1>

            <p className="text-base sm:text-lg text-gray-600 leading-relaxed max-w-xl mx-auto lg:mx-0">
              Experience the future of waste management with our revolutionary 
              eco-friendly garbage bags. Thoughtfully engineered for the modern lifestyle.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
              <Link to="/shop">
                <Button className="bg-primary hover:bg-primary/90 text-white px-8 sm:px-10 py-3 sm:py-4 text-base sm:text-lg font-semibold rounded-2xl shadow-xl hover:shadow-2xl transition-all duration-300 transform-gpu hover:scale-105 hover:animate-glow">
                  SHOP NOW
                </Button>
              </Link>
              <Button 
                variant="outline" 
                className="border-2 border-primary text-primary hover:bg-primary/10 px-8 sm:px-10 py-3 sm:py-4 text-base sm:text-lg font-semibold rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 transform-gpu hover:scale-105 bg-white/50 backdrop-blur-sm"
              >
                LEARN MORE
              </Button>
            </div>
          </div>

          {/* Right: Hero Product Image */}
          <div className="relative animate-slide-up max-w-lg mx-auto lg:mx-0 w-full">
            <div className="perspective-1000">
              <div className="transform-gpu hover:rotate-y-12 transition-transform duration-700 group">
                <img
                  src="/uploads/ca930026-bdcf-41a6-974f-5d894632c11f.png"
                  alt="Pinewrap Hero Product"
                  className="w-full h-auto drop-shadow-2xl group-hover:drop-shadow-3xl transition-all duration-500 rounded-lg"
                />

                <div className="absolute -top-4 -right-4 bg-white/90 backdrop-blur-sm rounded-2xl p-3 shadow-xl animate-float hidden sm:flex items-center space-x-2">
                  <Shield className="w-5 h-5 text-emerald-600" />
                  <span className="text-sm font-semibold text-gray-700">Eco-Certified</span>
                </div>

                <div className="absolute -bottom-4 -left-4 bg-white/90 backdrop-blur-sm rounded-2xl p-3 shadow-xl animate-float hidden sm:flex items-center space-x-2" style={{animationDelay: '1s'}}>
                  <Star className="w-5 h-5 text-emerald-500" />
                  <span className="text-sm font-semibold text-gray-700">Premium Quality</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Scroll Indicator */}
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
          <div className="bg-white/80 backdrop-blur-sm rounded-full p-3 shadow-lg">
            <ArrowDown className="text-emerald-600" size={24} />
          </div>
        </div>
      </section>

      {/* Product Showcase */}
      <section className="py-20 sm:py-24 bg-background">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16 sm:mb-20 space-y-6">
            <div className="inline-flex items-center bg-emerald-100/80 backdrop-blur-sm rounded-full px-6 py-2 shadow-lg justify-center mx-auto max-w-xs">
              <Leaf className="w-5 h-5 text-white mr-2" />
              <span className="text-sm font-semibold text-white tracking-wide">OUR PRODUCT LINE</span>
            </div>

            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold font-display tracking-tight">
              <span className="text-foreground">
                Choose Your Perfect
              </span>
              <br />
              <span className="text-primary">
                Eco Solution
              </span>
            </h2>

            <p className="text-base sm:text-lg text-gray-600 max-w-2xl mx-auto leading-relaxed">
              Two revolutionary products, one sustainable mission. 
              Designed for different needs, unified by innovation.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12 max-w-5xl mx-auto">
            {products.map((product, index) => (
              <div key={product.id} className="animate-slide-up" style={{animationDelay: `${index * 0.2}s`}}>
                <ProductCard
                  product={product}
                  onAddToCart={() => {
                    addItem(product);
                    toast({
                      title: (
                        <span className="inline-flex items-center gap-2">
                          <PartyPopper className="w-4 h-4" />
                          Added to cart!
                        </span>
                      ),
                      description: `${product.name} has been added to your cart.`,
                    });
                  }}
                />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 sm:py-24 bg-muted">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16 sm:mb-20 space-y-6">
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold font-display tracking-tight">
              <span className="text-foreground">
                Why Choose
              </span>
              <br />
              <span className="text-primary">
                Pinewrap?
              </span>
            </h2>

            <p className="text-base sm:text-lg text-gray-600 max-w-2xl mx-auto leading-relaxed">
              Every bag represents our commitment to innovation, sustainability, and your lifestyle
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
            {features.map((feature, index) => (
              <div key={index} className="animate-slide-up" style={{animationDelay: `${index * 0.1}s`}}>
                <FeatureCard feature={feature} />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Newsletter CTA */}
      <section className="py-20 sm:py-24 bg-primary relative overflow-hidden px-4 sm:px-6 lg:px-8">
        {/* Background Effects */}
        <div className="absolute inset-0 pointer-events-none">
          <div className="hidden lg:block absolute top-0 left-1/4 w-72 h-72 bg-white/10 rounded-full blur-3xl"></div>
          <div className="hidden lg:block absolute bottom-0 right-1/4 w-56 h-56 bg-white/10 rounded-full blur-3xl"></div>
        </div>

        <div className="relative max-w-4xl mx-auto text-center space-y-8">
          <div className="space-y-6">
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold font-display text-white tracking-tight">
              Get 10% Off Your
              <br />
              <span className="text-secondary">
                First Order
              </span>
            </h2>

            <p className="text-base sm:text-lg text-white/90 leading-relaxed max-w-2xl mx-auto">
              Join thousands who've already made the switch to smarter, 
              more sustainable living
            </p>
          </div>

          <form onSubmit={handleEmailSubmit} className="max-w-md mx-auto">
            <div className="flex flex-col sm:flex-row gap-4">
              <Input
                type="email"
                placeholder="Enter your email address"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="flex-1 bg-white/20 backdrop-blur-sm border border-white/30 text-white placeholder:text-white/70 rounded-2xl px-6 py-4 text-lg focus:border-white/50 focus:ring-2 focus:ring-white/30"
                required
              />
              <Button
                type="submit"
                className="bg-white text-emerald-600 hover:bg-gray-100 px-8 py-4 font-semibold rounded-2xl shadow-xl hover:shadow-2xl transition-all duration-300 transform-gpu hover:scale-105"
              >
                SUBSCRIBE
              </Button>
            </div>
          </form>

          <p className="text-white/70 text-sm mt-2">
            <span className="inline-flex items-center gap-2">
              <Sparkles className="w-4 h-4" />
              No spam, just exclusive offers and eco-living tips
            </span>
          </p>
        </div>
      </section>
    </div>
  );
};

export default Index;
