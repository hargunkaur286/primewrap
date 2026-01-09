
import type { ReactNode } from 'react';

interface Feature {
  title: string;
  description: string;
  icon: ReactNode;
}

interface FeatureCardProps {
  feature: Feature;
}

const FeatureCard = ({ feature }: FeatureCardProps) => {
  return (
    <div className="group relative perspective-1000">
      <div className="relative bg-white/80 backdrop-blur-xl rounded-2xl p-8 shadow-lg hover:shadow-2xl transition-all duration-500 border border-white/20 transform-gpu hover:scale-105 hover:-rotate-1">
        {/* Animated Background */}
        <div className="absolute inset-0 bg-gradient-to-br from-blue-500/10 via-transparent to-purple-500/10 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
        
        {/* Icon Container */}
        <div className="relative mb-6 flex justify-center">
          <div className="w-16 h-16 bg-gradient-to-br from-blue-100 to-purple-100 rounded-2xl flex items-center justify-center text-3xl transform-gpu group-hover:scale-110 group-hover:rotate-6 transition-transform duration-300 shadow-lg">
            {feature.icon}
          </div>
        </div>
        
        {/* Content */}
        <div className="relative text-center space-y-3">
          <h3 className="text-xl font-bold text-gray-900 tracking-tight group-hover:text-blue-600 transition-colors duration-300">
            {feature.title}
          </h3>
          <p className="text-gray-600 leading-relaxed">
            {feature.description}
          </p>
        </div>
        
        {/* Subtle Glow */}
        <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-blue-400/20 to-purple-400/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500 blur-xl -z-10"></div>
      </div>
    </div>
  );
};

export default FeatureCard;
