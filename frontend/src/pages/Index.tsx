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
import { Anchor, Droplet, Truck } from 'lucide-react';


const heroProduct = {
  id: 'pinewrap-premium',
  name: 'Pinewrap Premium 2-Handle Garbage Bags',
  tagline: '10 Bags Per Pack',
  image: '/uploads/hero.webp',
  subscriptionPrice: 5.99,
  oneTimePrice: 6.49,
};

const featureHighlights = [
  {
    title: '2 Handle Tie System',
    description: 'Easy secure knot, no tearing even when overfilled',
    icon: <Anchor className="w-7 h-7 text-emerald-500" />,
  },
  {
    title: 'Leak Resistant Material',
    description: 'Heavy-duty gauge holds daily household waste without bulging',
    icon: <Droplet className="w-7 h-7 text-amber-500" />,
  },
  {
    title: 'Monthly Delivery',
    description: 'Automatically delivered so you never run out mid-week',
    icon: <Truck className="w-7 h-7 text-sky-500" />,
  },
];

const subscriptionSteps = [
  {
    title: 'Choose Delivery Frequency',
    detail: 'Monthly by default',
  },
  {
    title: 'Receive Monthly',
    detail: 'Fresh packs arrive on your door before run out of the bags.',
  },
  {
    title: 'Cancel Anytime',
    detail: 'Pause, skip, or adjust your subscription without penalties.',
  },
];


const formatPrice = (value: number) => `$${value.toFixed(2)}`;

const Index = () => {
  const [email, setEmail] = useState('');
  const { addItem } = useCart();
  const [quantity, setQuantity] = useState(1);
  const [purchaseOption, setPurchaseOption] = useState<'subscription' | 'one-time'>('subscription');
  // const [showPromoPopup, setShowPromoPopup] = useState(false);

  const price = purchaseOption === 'subscription' ? heroProduct.subscriptionPrice : heroProduct.oneTimePrice;

  const handleQuantityChange = (delta: number) => {
    setQuantity((prev) => Math.max(1, prev + delta));
  };

  const handleAddToCart = async () => {
      await addItem({
        id: `${heroProduct.id}-${purchaseOption}`,
        name: heroProduct.name,
        price,
        quantity,
        image: heroProduct.image,
      });
  
      toast({
        title: `${heroProduct.name} added`,
        description:
          purchaseOption === 'subscription'
            ? `Subscription locked in at ${formatPrice(heroProduct.subscriptionPrice)} / month.`
            : `One-time purchase at ${formatPrice(heroProduct.oneTimePrice)} added.`,
      });
    };


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

  // Promo popup disabled for now; we'll re-enable later.
  // useEffect(() => {
  //   const timer = setTimeout(() => setShowPromoPopup(true), 10000);
  //   return () => clearTimeout(timer);
  // }, []);


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
      {/** Timed promo popup disabled for now; we'll re-enable later */}
      {/* {showPromoPopup && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 px-4 py-8 ">
          <div className="relative w-full max-w-sm rounded-[2rem] border border-[#0b0a08]/20 bg-primary p-6 text-white shadow-[0_25px_80px_rgba(15,15,15,0.35)] sm:p-10">
            <button
              className="absolute right-4 top-4 rounded-full bg-white/80 p-2 text-sm font-bold text-[#0b0a08] shadow-lg"
              onClick={() => setShowPromoPopup(false)}
            >
              ×
            </button>
            <div className="space-y-4 text-center">
              <p className="text-xs uppercase tracking-[0.5em] text-white/70">Limited Time</p>
              <h3 className="text-3xl font-bold text-white">Save 20% on your next Pinewrap order</h3>
              <p className="text-base text-white/80">Use code <span className="font-semibold text-white">STOCKUP20</span> at checkout. Valid for the first three rolls.</p>
              <p className="text-sm font-semibold text-white/80">Hurry—deal fades in 20 seconds!</p>
              <div className="flex flex-col items-center gap-2 text-sm uppercase tracking-[0.2em] sm:flex-row">
                <BadgeCheck className="h-5 w-5 text-white" />
                <span className="text-white/70">Auto applies on subscribe</span>
              </div>
            </div>
          </div>
        </div>
      )} */}
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
              garbage bags. Thoughtfully engineered for the modern lifestyle.
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
                onClick={() => {
                  const featuresSection = document.getElementById('features-section');
                  if (featuresSection) {
                    featuresSection.scrollIntoView({ behavior: 'smooth' });
                  }
                }}
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
                  src="/uploads/hero-672.webp"
                  srcSet="/uploads/hero-480.webp 480w, /uploads/hero-672.webp 672w"
                  sizes="(max-width: 1024px) 100vw, 672px"
                  alt="Pinewrap Hero Product"
                  loading="eager"
                  fetchPriority="high"
                  decoding="async"
                  width={762}
                  height={770}
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

      <section className="bg-[#fffdf8] px-6 py-16">
        <div className="mx-auto max-w-6xl space-y-8">
          <div className="space-y-2 text-center">
            <p className="text-sm font-semibold uppercase tracking-[0.4em] text-emerald-500">Features</p>
            <h2 className="text-3xl font-bold">High-performance bags built for homes</h2>
            <p className="mx-auto max-w-3xl text-base text-[#0b0a08]/70">
              Designed with strength, grip, and convenience in mind so you can focus on the rest of the chores.
            </p>
          </div>

          <div className="grid gap-6 md:grid-cols-3">
            {featureHighlights.map((feature) => (
              <div key={feature.title} className="rounded-3xl border border-black/5 bg-white p-6 text-center shadow-[0_15px_50px_rgba(15,15,15,0.08)]">
                <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-2xl bg-black/5">
                  {feature.icon}
                </div>
                <h3 className="mt-6 text-lg font-semibold">{feature.title}</h3>
                <p className="mt-2 text-sm text-gray-600">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Product Showcase */}
      {/* <section className="py-20 sm:py-24 bg-background">
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
      </section> */}

      <section className="px-6 py-16">
              <div className="mx-auto grid max-w-6xl items-center gap-10 lg:grid-cols-[1fr,1.1fr]">
                <div className="rounded-[2.5rem] border border-black/10 bg-white p-6 shadow-[0_35px_90px_rgba(15,15,15,0.15)]">
                  <img src={heroProduct.image} alt={heroProduct.name} className="w-full rounded-2xl border border-black/5 object-cover" loading="lazy" />
                </div>
                <div className="space-y-6">
                  <p className="text-sm uppercase tracking-[0.4em] text-emerald-500">Single SKU focus</p>
                  <h2 className="text-3xl font-bold">{heroProduct.name}</h2>
                  <p className="text-sm uppercase tracking-[0.4em] text-gray-500">{heroProduct.tagline}</p>
      
                  <div className="space-y-2">
                    <div className="flex items-center gap-3">
                      <span className="text-3xl font-bold text-[#111]">{formatPrice(price)}</span>
                      {purchaseOption === 'subscription' && (
                        <span className="rounded-full bg-emerald-100 px-3 py-1 text-xs font-semibold text-white">Save 15%</span>
                      )}
                    </div>
                    <p className="text-sm text-gray-500">
                      {purchaseOption === 'subscription'
                        ? `Subscription: ${formatPrice(heroProduct.subscriptionPrice)} / month `
                        : `One-time: ${formatPrice(heroProduct.oneTimePrice)} — no recurring charge`}
                    </p>
                  </div>
      
                  <div className="flex flex-col gap-2">
                    <div className="flex overflow-hidden rounded-full border border-[#d6d3cd] text-sm font-semibold">
                      <button
                        className={`flex-1 px-6 py-3 transition ${
                          purchaseOption === 'subscription' ? 'bg-primary text-white' : 'bg-white text-[#0b0a08]'
                        }`}
                        onClick={() => setPurchaseOption('subscription')}
                      >
                        Subscribe & Save
                      </button>
                      <button
                        className={`flex-1 px-6 py-3 transition ${
                          purchaseOption === 'one-time' ? 'bg-primary text-white' : 'bg-white text-[#0b0a08]'
                        }`}
                        onClick={() => setPurchaseOption('one-time')}
                      >
                        Buy Once
                      </button>
                    </div>
                    <p className="text-xs uppercase tracking-[0.3em] text-gray-500">Subscription pre-selected</p>
                  </div>
      
                  <div className="flex flex-wrap items-center gap-3">
                    {/* <span className="text-sm font-semibold">Quantity</span>
                    <div className="flex items-center gap-2 rounded-full border border-black/10 bg-white px-3 py-1 text-sm">
                      <button className="rounded-full px-2 py-1 text-lg font-semibold text-gray-600" onClick={() => handleQuantityChange(-1)}>
                        –
                      </button>
                      <span className="w-6 text-center text-base font-semibold">{quantity}</span>
                      <button className="rounded-full px-2 py-1 text-lg font-semibold text-gray-600" onClick={() => handleQuantityChange(1)}>
                        +
                      </button>
                    </div> */}
                    <div className="ml-auto flex items-center gap-2 rounded-full bg-[#fff3e0] px-4 py-1 text-xs font-semibold text-[#ad5e00]">
                      <Sparkles className="w-4 h-4" />
                      Premium 2-handle grip
                    </div>
                  </div>
      
                  <Button className="bg-primary px-8 py-4 text-lg font-semibold text-white shadow-2xl shadow-[#0b3a23]/40" onClick={handleAddToCart}>
                    Add To Cart
                  </Button>
      
                  <p className="text-sm text-gray-500">
                    Pure strength, four handle tie, and a monthly delivery rhythm that keeps you stocked.
                  </p>
                </div>
              </div>
            </section>

      {/* Features Section */}
      {/* <section className="py-20 sm:py-24 bg-muted" id="features-section">
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
      </section> */}
      <section className="bg-[#faf8f4] px-6 py-16">
        <div className="mx-auto max-w-5xl space-y-6">
          <div className="space-y-2 text-center">
            <p className="text-sm font-semibold uppercase tracking-[0.4em] text-emerald-500">How it works</p>
            <h2 className="text-3xl font-bold">Three steps to keep you stocked</h2>
            <p className="mx-auto max-w-3xl text-base text-[#0b0a08]/70">
              A simple rhythm so trash day never catches you off guard again.
            </p>
          </div>
          <div className="grid gap-6 md:grid-cols-3">
            {subscriptionSteps.map((step, index) => (
              <div key={step.title} className="space-y-2 rounded-3xl border border-[#f3ede2] bg-white p-6 text-sm">
                <div className="text-3xl font-bold text-[#0b3a23]">0{index + 1}</div>
                <p className="font-semibold">{step.title}</p>
                <p className="text-gray-600">{step.detail}</p>
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
