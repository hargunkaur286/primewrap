
import { Star, Quote } from 'lucide-react';

const Testimonials = () => {
  const testimonials = [
    {
      name: "Sarah Johnson",
      role: "Eco-Conscious Parent",
      content: "These bags are amazing! Strong, eco-friendly, and actually help control odors. My family has completely switched over.",
      rating: 5,
      image: "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=80&h=80&fit=crop&face"
    },
    {
      name: "Mike Chen",
      role: "Restaurant Owner",
      content: "We use these for our restaurant waste. They're incredibly durable and align with our sustainability goals perfectly.",
      rating: 5,
      image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=80&h=80&fit=crop&face"
    },
    {
      name: "Emma Rodriguez",
      role: "Environmental Activist",
      content: "Finally, a product that doesn't compromise on quality while being truly environmentally responsible. Highly recommended!",
      rating: 5,
      image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=80&h=80&fit=crop&face"
    }
  ];

  return (
    <div className="py-20 bg-gradient-to-br from-emerald-50/50 to-cyan-50/30">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold font-display mb-6">
            <span className="bg-gradient-to-r from-gray-900 to-emerald-900 bg-clip-text">
              What Our Customers
            </span>
            <br />
            <span className="bg-gradient-to-r from-emerald-600 to-cyan-600 bg-clip-text">
              Are Saying
            </span>
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Join thousands of satisfied customers who've made the switch to sustainable living
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <div
              key={index}
              className="group relative bg-white/80 backdrop-blur-sm rounded-3xl p-8 shadow-lg hover:shadow-2xl transition-all duration-500 transform-gpu hover:scale-105 animate-slide-up"
              style={{ animationDelay: `${index * 0.2}s` }}
            >
              {/* Quote Icon */}
              <div className="absolute -top-4 -left-4 bg-gradient-to-r from-emerald-500 to-cyan-500 rounded-full p-3 shadow-lg">
                <Quote className="w-6 h-6 text-white" />
              </div>

              {/* Stars */}
              <div className="flex justify-center mb-6">
                {[...Array(testimonial.rating)].map((_, i) => (
                  <Star key={i} className="w-5 h-5 text-yellow-400 fill-current" />
                ))}
              </div>

              {/* Content */}
              <p className="text-gray-700 mb-6 leading-relaxed italic">
                "{testimonial.content}"
              </p>

              {/* Author */}
              <div className="flex items-center justify-center space-x-4">
                <img
                  src={testimonial.image}
                  alt={testimonial.name}
                  className="w-12 h-12 rounded-full object-cover shadow-md"
                />
                <div className="text-center">
                  <div className="font-semibold text-gray-900">{testimonial.name}</div>
                  <div className="text-sm text-gray-600">{testimonial.role}</div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Testimonials;
