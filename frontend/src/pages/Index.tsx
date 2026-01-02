
// import { useState } from 'react';
// import { Link } from 'react-router-dom';
// import { ArrowDown, Sparkles, Shield, Leaf, Star } from 'lucide-react';
// import { Button } from '@/components/ui/button';
// import { Input } from '@/components/ui/input';
// import { useCart } from '@/contexts/CartContext';
// import { toast } from '@/hooks/use-toast';
// import ProductCard from '@/components/ProductCard';
// import FeatureCard from '@/components/FeatureCard';

// const Index = () => {
//   const [email, setEmail] = useState('');
//   const { addItem } = useCart();

//   const handleEmailSubmit = (e: React.FormEvent) => {
//     e.preventDefault();
//     if (email) {
//       toast({
//         title: "Welcome to the future! 🚀",
//         description: "Check your email for your exclusive 10% discount code.",
//       });
//       setEmail('');
//     }
//   };

//   const products = [
//     {
//       id: 'scented-bags',
//       name: 'PrimeWrap Scented',
//       tagline: 'Fresh scent, lasting strength',
//       price: 24.99,
//       image: '/lovable-uploads/9a4802e7-c0b1-4503-ada5-a1ee29b8504b.png'
//     },
//     {
//       id: 'recycling-bags',
//       name: 'PrimeWrap Recycling',
//       tagline: 'Made from 100% recycled materials',
//       price: 22.99,
//       image: '/lovable-uploads/e2e7eb2e-d8a9-4c28-9248-a226799224b2.png'
//     }
//   ];

//   const features = [
//     {
//       title: '100% Biodegradable',
//       description: 'Break down naturally without harming the environment',
//       icon: '🌱'
//     },
//     {
//       title: 'Ultra Strong',
//       description: 'Advanced polymer technology for maximum durability',
//       icon: '💪'
//     },
//     {
//       title: 'Smart Design',
//       description: 'Engineered for modern living with convenience in mind',
//       icon: '🧠'
//     },
//     {
//       title: 'Certified Quality',
//       description: 'Meets all environmental and safety standards worldwide',
//       icon: '✅'
//     }
//   ];

//   return (
//     <div className="min-h-screen bg-gradient-to-br from-emerald-50 via-white to-cyan-50/30">
//       {/* Hero Section with 3D Elements */}
//       <section className="relative min-h-[90vh] flex items-center overflow-hidden">
//         {/* Animated Background Elements */}
//         <div className="absolute inset-0 overflow-hidden">
//           <div className="absolute top-1/4 left-1/4 w-72 h-72 bg-emerald-200/30 rounded-full blur-3xl animate-float"></div>
//           <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-cyan-200/30 rounded-full blur-3xl animate-float" style={{animationDelay: '1s'}}></div>
//           <div className="absolute top-1/2 left-1/2 w-64 h-64 bg-teal-200/30 rounded-full blur-3xl animate-float" style={{animationDelay: '2s'}}></div>
//         </div>

//         <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
//           <div className="grid lg:grid-cols-2 gap-16 items-center">
//             {/* Left: Text Content */}
//             <div className="text-center lg:text-left space-y-8 animate-fade-in">
//               <div className="inline-flex items-center bg-white/80 backdrop-blur-sm rounded-full px-6 py-3 shadow-lg border border-white/20">
//                 <Sparkles className="w-5 h-5 text-emerald-600 mr-2" />
//                 <span className="text-sm font-semibold text-emerald-700 tracking-wide">REVOLUTIONARY ECO-TECH</span>
//               </div>
              
//               <h1 className="text-5xl md:text-7xl font-bold font-display tracking-tight leading-[0.9]">
//                 <span className="bg-gradient-to-r from-gray-900 via-emerald-900 to-cyan-900 bg-clip-text text-transparent">
//                   Cleaner Living
//                 </span>
//                 <br />
//                 <span className="bg-gradient-to-r from-emerald-600 to-cyan-600 bg-clip-text text-transparent">
//                   Starts With
//                 </span>
//                 <br />
//                 <span className="bg-gradient-to-r from-cyan-600 to-teal-600 bg-clip-text text-transparent">
//                   PrimeWrap
//                 </span>
//               </h1>
              
//               <p className="text-xl text-gray-600 leading-relaxed max-w-xl">
//                 Experience the future of waste management with our revolutionary 
//                 eco-friendly garbage bags. Thoughtfully engineered for the modern lifestyle.
//               </p>
              
//               <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
//                 <Link to="/shop">
//                   <Button className="bg-gradient-to-r from-emerald-600 to-cyan-600 hover:from-emerald-700 hover:to-cyan-700 text-white px-10 py-4 text-lg font-semibold rounded-2xl shadow-xl hover:shadow-2xl transition-all duration-300 transform-gpu hover:scale-105 hover:animate-glow">
//                     SHOP NOW
//                   </Button>
//                 </Link>
//                 <Button 
//                   variant="outline" 
//                   className="border-2 border-emerald-300 text-emerald-700 hover:bg-emerald-50 hover:text-emerald-900 px-10 py-4 text-lg font-semibold rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 transform-gpu hover:scale-105 bg-white/50 backdrop-blur-sm"
//                 >
//                   LEARN MORE
//                 </Button>
//               </div>
//             </div>

//             {/* Right: Hero Product Image */}
//             <div className="relative animate-slide-up">
//               <div className="relative perspective-1000">
//                 <div className="transform-gpu hover:rotate-y-12 transition-transform duration-700 group">
//                   <img
//                     src="/lovable-uploads/ca930026-bdcf-41a6-974f-5d894632c11f.png"
//                     alt="PrimeWrap Hero Product"
//                     className="w-full h-auto max-w-lg mx-auto drop-shadow-2xl group-hover:drop-shadow-3xl transition-all duration-500"
//                   />
                  
//                   {/* Floating Elements */}
//                   <div className="absolute -top-4 -right-4 bg-white/90 backdrop-blur-sm rounded-2xl p-4 shadow-xl animate-float">
//                     <div className="flex items-center space-x-2">
//                       <Shield className="w-5 h-5 text-emerald-600" />
//                       <span className="text-sm font-semibold text-gray-700">Eco-Certified</span>
//                     </div>
//                   </div>
                  
//                   <div className="absolute -bottom-4 -left-4 bg-white/90 backdrop-blur-sm rounded-2xl p-4 shadow-xl animate-float" style={{animationDelay: '1s'}}>
//                     <div className="flex items-center space-x-2">
//                       <Star className="w-5 h-5 text-emerald-500" />
//                       <span className="text-sm font-semibold text-gray-700">Premium Quality</span>
//                     </div>
//                   </div>
//                 </div>
//               </div>
//             </div>
//           </div>
//         </div>

//         {/* Scroll Indicator */}
//         <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
//           <div className="bg-white/80 backdrop-blur-sm rounded-full p-3 shadow-lg">
//             <ArrowDown className="text-emerald-600" size={24} />
//           </div>
//         </div>
//       </section>

//       {/* Product Showcase */}
//       <section className="py-24 bg-gradient-to-br from-white to-emerald-50/50">
//         <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
//           <div className="text-center mb-20 space-y-6">
//             <div className="inline-flex items-center bg-emerald-100/80 backdrop-blur-sm rounded-full px-6 py-3 shadow-lg">
//               <Leaf className="w-5 h-5 text-emerald-600 mr-2" />
//               <span className="text-sm font-semibold text-emerald-700 tracking-wide">OUR PRODUCT LINE</span>
//             </div>
            
//             <h2 className="text-4xl md:text-6xl font-bold font-display tracking-tight">
//               <span className="bg-gradient-to-r from-gray-900 to-emerald-900 bg-clip-text text-transparent">
//                 Choose Your Perfect
//               </span>
//               <br />
//               <span className="bg-gradient-to-r from-emerald-600 to-cyan-600 bg-clip-text text-transparent">
//                 Eco Solution
//               </span>
//             </h2>
            
//             <p className="text-xl text-gray-600 max-w-2xl mx-auto leading-relaxed">
//               Two revolutionary products, one sustainable mission. 
//               Designed for different needs, unified by innovation.
//             </p>
//           </div>

//           <div className="grid md:grid-cols-2 gap-12 max-w-5xl mx-auto">
//             {products.map((product, index) => (
//               <div key={product.id} className="animate-slide-up" style={{animationDelay: `${index * 0.2}s`}}>
//                 <ProductCard
//                   product={product}
//                   onAddToCart={() => {
//                     addItem(product);
//                     toast({
//                       title: "Added to cart! 🎉",
//                       description: `${product.name} has been added to your cart.`,
//                     });
//                   }}
//                 />
//               </div>
//             ))}
//           </div>
//         </div>
//       </section>

//       {/* Features Section */}
//       <section className="py-24 bg-gradient-to-br from-emerald-50/50 via-white to-cyan-50/30">
//         <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
//           <div className="text-center mb-20 space-y-6">
//             <h2 className="text-4xl md:text-6xl font-bold font-display tracking-tight">
//               <span className="bg-gradient-to-r from-gray-900 to-emerald-900 bg-clip-text text-transparent">
//                 Why Choose
//               </span>
//               <br />
//               <span className="bg-gradient-to-r from-emerald-600 to-cyan-600 bg-clip-text text-transparent">
//                 PrimeWrap?
//               </span>
//             </h2>
            
//             <p className="text-xl text-gray-600 max-w-2xl mx-auto leading-relaxed">
//               Every bag represents our commitment to innovation, sustainability, and your lifestyle
//             </p>
//           </div>

//           <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
//             {features.map((feature, index) => (
//               <div key={index} className="animate-slide-up" style={{animationDelay: `${index * 0.1}s`}}>
//                 <FeatureCard feature={feature} />
//               </div>
//             ))}
//           </div>
//         </div>
//       </section>

//       {/* Newsletter CTA */}
//       <section className="py-24 bg-gradient-to-br from-emerald-600 via-cyan-600 to-teal-600 relative overflow-hidden">
//         {/* Background Effects */}
//         <div className="absolute inset-0">
//           <div className="absolute top-0 left-1/4 w-96 h-96 bg-white/10 rounded-full blur-3xl"></div>
//           <div className="absolute bottom-0 right-1/4 w-72 h-72 bg-white/10 rounded-full blur-3xl"></div>
//         </div>
        
//         <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-8">
//           <div className="space-y-6">
//             <h2 className="text-4xl md:text-6xl font-bold font-display text-white tracking-tight">
//               Get 10% Off Your
//               <br />
//               <span className="bg-gradient-to-r from-yellow-300 to-orange-300 bg-clip-text text-transparent">
//                 First Order
//               </span>
//             </h2>
            
//             <p className="text-xl text-white/90 leading-relaxed max-w-2xl mx-auto">
//               Join thousands who've already made the switch to smarter, 
//               more sustainable living
//             </p>
//           </div>
          
//           <form onSubmit={handleEmailSubmit} className="max-w-md mx-auto">
//             <div className="flex gap-4">
//               <Input
//                 type="email"
//                 placeholder="Enter your email address"
//                 value={email}
//                 onChange={(e) => setEmail(e.target.value)}
//                 className="flex-1 bg-white/20 backdrop-blur-sm border border-white/30 text-white placeholder:text-white/70 rounded-2xl px-6 py-4 text-lg focus:border-white/50 focus:ring-2 focus:ring-white/30"
//                 required
//               />
//               <Button
//                 type="submit"
//                 className="bg-white text-emerald-600 hover:bg-gray-100 px-8 py-4 font-semibold rounded-2xl shadow-xl hover:shadow-2xl transition-all duration-300 transform-gpu hover:scale-105"
//               >
//                 SUBSCRIBE
//               </Button>
//             </div>
//           </form>
          
//           <p className="text-white/70 text-sm">
//             ✨ No spam, just exclusive offers and eco-living tips
//           </p>
//         </div>
//       </section>
//     </div>
//   );
// };

// export default Index;


import { useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowDown, Sparkles, Shield, Leaf, Star } from 'lucide-react';
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
        title: "🎉 Subscription Successful!",
        description: message,
      });
    } else {
      toast({
        title: "⚠️ Subscription Failed",
        description: message,
        variant: "destructive",
      });
    }

    setEmail('');
  } catch (error) {
    console.error("Newsletter subscription error:", error);
    toast({
      title: "❌ Something went wrong",
      description: "Please try again later.",
      variant: "destructive",
    });
  }
};


  const products = [
    {
      id: 'scented-bags',
      name: 'PrimeWrap Scented',
      tagline: 'Fresh scent, lasting strength',
      price: 24.99,
      image: '/lovable-uploads/9a4802e7-c0b1-4503-ada5-a1ee29b8504b.png'
    },
    {
      id: 'recycling-bags',
      name: 'PrimeWrap Recycling',
      tagline: 'Made from 100% recycled materials',
      price: 22.99,
      image: '/lovable-uploads/e2e7eb2e-d8a9-4c28-9248-a226799224b2.png'
    }
  ];

  const features = [
    {
      title: '100% Biodegradable',
      description: 'Break down naturally without harming the environment',
      icon: '🌱'
    },
    {
      title: 'Ultra Strong',
      description: 'Advanced polymer technology for maximum durability',
      icon: '💪'
    },
    {
      title: 'Smart Design',
      description: 'Engineered for modern living with convenience in mind',
      icon: '🧠'
    },
    {
      title: 'Certified Quality',
      description: 'Meets all environmental and safety standards worldwide',
      icon: '✅'
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-50 via-white to-cyan-50/30">
      {/* Hero Section with 3D Elements */}
      <section className="relative min-h-[90vh] flex items-center overflow-hidden px-4 sm:px-6 lg:px-8">
        {/* Animated Background Elements */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          {/* Hide blurred circles on small screens for clarity */}
          <div className="hidden sm:block absolute top-1/4 left-1/4 w-56 h-56 sm:w-72 sm:h-72 bg-emerald-200/30 rounded-full blur-3xl animate-float"></div>
          <div className="hidden sm:block absolute bottom-1/4 right-1/4 w-72 h-72 sm:w-96 sm:h-96 bg-cyan-200/30 rounded-full blur-3xl animate-float" style={{ animationDelay: '1s' }}></div>
          <div className="hidden sm:block absolute top-1/2 left-1/2 w-48 h-48 sm:w-64 sm:h-64 bg-teal-200/30 rounded-full blur-3xl animate-float" style={{ animationDelay: '2s' }}></div>
        </div>

        <div className="relative max-w-7xl mx-auto py-20 grid gap-12 lg:grid-cols-2 items-center">
          {/* Left: Text Content */}
          <div className="text-center lg:text-left space-y-8 animate-fade-in">
            <div className="inline-flex items-center bg-white/80 backdrop-blur-sm rounded-full px-6 py-3 shadow-lg border border-white/20 justify-center lg:justify-start">
              <Sparkles className="w-5 h-5 text-emerald-600 mr-2" />
              <span className="text-sm font-semibold text-emerald-700 tracking-wide">REVOLUTIONARY ECO-TECH</span>
            </div>

            <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold font-display tracking-tight leading-tight">
              <span className="bg-gradient-to-r from-gray-900 via-emerald-900 to-cyan-900 bg-clip-text text-transparent">
                Cleaner Living
              </span>
              <br />
              <span className="bg-gradient-to-r from-emerald-600 to-cyan-600 bg-clip-text text-transparent">
                Starts With
              </span>
              <br />
              <span className="bg-gradient-to-r from-cyan-600 to-teal-600 bg-clip-text text-transparent">
                PrimeWrap
              </span>
            </h1>

            <p className="text-base sm:text-lg text-gray-600 leading-relaxed max-w-xl mx-auto lg:mx-0">
              Experience the future of waste management with our revolutionary 
              eco-friendly garbage bags. Thoughtfully engineered for the modern lifestyle.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
              <Link to="/shop">
                <Button className="bg-gradient-to-r from-emerald-600 to-cyan-600 hover:from-emerald-700 hover:to-cyan-700 text-white px-8 sm:px-10 py-3 sm:py-4 text-base sm:text-lg font-semibold rounded-2xl shadow-xl hover:shadow-2xl transition-all duration-300 transform-gpu hover:scale-105 hover:animate-glow">
                  SHOP NOW
                </Button>
              </Link>
              <Button 
                variant="outline" 
                className="border-2 border-emerald-300 text-emerald-700 hover:bg-emerald-50 hover:text-emerald-900 px-8 sm:px-10 py-3 sm:py-4 text-base sm:text-lg font-semibold rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 transform-gpu hover:scale-105 bg-white/50 backdrop-blur-sm"
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
                  src="/lovable-uploads/ca930026-bdcf-41a6-974f-5d894632c11f.png"
                  alt="PrimeWrap Hero Product"
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
      <section className="py-20 sm:py-24 bg-gradient-to-br from-white to-emerald-50/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16 sm:mb-20 space-y-6">
            <div className="inline-flex items-center bg-emerald-100/80 backdrop-blur-sm rounded-full px-6 py-2 shadow-lg justify-center mx-auto max-w-xs">
              <Leaf className="w-5 h-5 text-emerald-600 mr-2" />
              <span className="text-sm font-semibold text-emerald-700 tracking-wide">OUR PRODUCT LINE</span>
            </div>

            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold font-display tracking-tight">
              <span className="bg-gradient-to-r from-gray-900 to-emerald-900 bg-clip-text text-transparent">
                Choose Your Perfect
              </span>
              <br />
              <span className="bg-gradient-to-r from-emerald-600 to-cyan-600 bg-clip-text text-transparent">
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
                      title: "Added to cart! 🎉",
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
      <section className="py-20 sm:py-24 bg-gradient-to-br from-emerald-50/50 via-white to-cyan-50/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16 sm:mb-20 space-y-6">
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold font-display tracking-tight">
              <span className="bg-gradient-to-r from-gray-900 to-emerald-900 bg-clip-text text-transparent">
                Why Choose
              </span>
              <br />
              <span className="bg-gradient-to-r from-emerald-600 to-cyan-600 bg-clip-text text-transparent">
                PrimeWrap?
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
      <section className="py-20 sm:py-24 bg-gradient-to-br from-emerald-600 via-cyan-600 to-teal-600 relative overflow-hidden px-4 sm:px-6 lg:px-8">
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
              <span className="bg-gradient-to-r from-yellow-300 to-orange-300 bg-clip-text text-transparent">
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
            ✨ No spam, just exclusive offers and eco-living tips
          </p>
        </div>
      </section>
    </div>
  );
};

export default Index;
