
import { Shield, Leaf, Star, Sparkles, Heart, Zap } from 'lucide-react';

const ProductBenefits = () => {
  const benefits = [
    {
      icon: <Leaf className="w-6 h-6" />,
      title: "100% Biodegradable",
      description: "Breaks down naturally in 90 days",
      color: "text-emerald-600"
    },
    {
      icon: <Shield className="w-6 h-6" />,
      title: "Ultra Durable",
      description: "5x stronger than regular bags",
      color: "text-cyan-600"
    },
    {
      icon: <Sparkles className="w-6 h-6" />,
      title: "Odor Control",
      description: "Advanced odor-blocking technology",
      color: "text-teal-600"
    },
    {
      icon: <Heart className="w-6 h-6" />,
      title: "Family Safe",
      description: "Non-toxic, BPA-free materials",
      color: "text-emerald-500"
    },
    {
      icon: <Star className="w-6 h-6" />,
      title: "Premium Quality",
      description: "Certified by eco-standards",
      color: "text-cyan-500"
    },
    {
      icon: <Zap className="w-6 h-6" />,
      title: "Quick Dissolve",
      description: "Dissolves in compost conditions",
      color: "text-teal-500"
    }
  ];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
      {benefits.map((benefit, index) => (
        <div
          key={index}
          className="p-4 md:p-6 bg-white/80 backdrop-blur-sm rounded-2xl shadow-lg hover:shadow-xl transition-shadow duration-300"
        >
          <div className={`${benefit.color} mb-4 flex justify-center`}>
            {benefit.icon}
          </div>
          <h3 className="font-bold text-gray-900 text-center mb-2 text-sm md:text-base">{benefit.title}</h3>
          <p className="text-xs md:text-sm text-gray-600 text-center leading-relaxed">{benefit.description}</p>
        </div>
      ))}
    </div>
  );
};

export default ProductBenefits;
