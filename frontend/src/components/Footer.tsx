
import { Link } from 'react-router-dom';
import { Leaf, Mail, Phone, MapPin, Heart } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="relative bg-gradient-to-br from-emerald-900 via-slate-800 to-cyan-900 text-white overflow-hidden">
      {/* Floating Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-1/4 right-1/4 w-72 h-72 bg-emerald-400/10 rounded-full blur-3xl animate-float"></div>
        <div className="absolute bottom-1/4 left-1/4 w-96 h-96 bg-cyan-400/10 rounded-full blur-3xl animate-float" style={{animationDelay: '2s'}}></div>
        <div className="absolute top-3/4 right-1/3 w-64 h-64 bg-teal-400/10 rounded-full blur-3xl animate-float" style={{animationDelay: '4s'}}></div>
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid md:grid-cols-4 gap-12">
          {/* Brand Section */}
          <div className="md:col-span-2 space-y-6">
            {/* 3D Logo */}
            <div className="group flex items-center space-x-4 mb-6">
              <div className="relative perspective-1000">
                <div className="w-16 h-16 bg-gradient-to-br from-emerald-400 to-cyan-500 rounded-3xl flex items-center justify-center shadow-2xl transform-gpu group-hover:rotate-y-12 group-hover:scale-110 transition-all duration-500 transform-style-preserve-3d">
                  <Leaf className="w-8 h-8 text-white transform-gpu group-hover:scale-110 transition-transform duration-300" />
                  {/* 3D depth effect */}
                  <div className="absolute inset-0 bg-gradient-to-br from-emerald-500 to-cyan-600 rounded-3xl -z-10 translate-x-2 translate-y-2 opacity-60"></div>
                </div>
              </div>
              <div className="font-bold text-3xl tracking-tight">
                <span className="bg-gradient-to-r from-emerald-300 to-cyan-300 bg-clip-text text-transparent">
                  PINE
                </span>
                <span className="bg-gradient-to-r from-cyan-300 to-emerald-300 bg-clip-text text-transparent">
                  WRAP
                </span>
              </div>
            </div>
            
            <p className="text-emerald-100/80 text-lg leading-relaxed max-w-md">
              Leading the way in eco-friendly garbage bags. 
              Making sustainable choices simple for modern living.
            </p>
            
            <div className="group flex items-center space-x-4 p-4 bg-white/10 backdrop-blur-sm rounded-2xl border border-white/20 transform-gpu hover:scale-105 transition-all duration-300">
              <div className="w-12 h-12 bg-gradient-to-br from-emerald-400 to-green-500 rounded-2xl flex items-center justify-center shadow-lg transform-gpu group-hover:rotate-6 transition-transform duration-300">
                <span className="text-2xl">🌱</span>
              </div>
              <span className="text-emerald-200 font-medium">
                Certified biodegradable & compostable
              </span>
            </div>
          </div>

          {/* Quick Links */}
          <div className="space-y-6">
            <h3 className="font-bold text-xl bg-gradient-to-r from-emerald-300 to-cyan-300 bg-clip-text text-transparent">
              Quick Links
            </h3>
            <div className="space-y-3">
              {[
                { name: 'Home', href: '/' },
                { name: 'Shop', href: '/shop' },
                { name: 'About', href: '/about' },
                { name: 'Contact', href: '/contact' }
              ].map((link, index) => (
                <Link
                  key={link.name}
                  to={link.href}
                  className="group block text-emerald-100/70 hover:text-emerald-300 transition-all duration-300 transform-gpu hover:translate-x-2"
                >
                  <span className="relative">
                    {link.name}
                    <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-gradient-to-r from-emerald-400 to-cyan-400 group-hover:w-full transition-all duration-300"></span>
                  </span>
                </Link>
              ))}
            </div>
          </div>

          {/* Contact Info */}
          <div className="space-y-6">
            <h3 className="font-bold text-xl bg-gradient-to-r from-cyan-300 to-emerald-300 bg-clip-text text-transparent">
              Get in Touch
            </h3>
            <div className="space-y-4">
              {[
                { icon: <Mail className="w-5 h-5" />, text: "help@primewrap.com", color: "from-emerald-400/20 to-cyan-400/20" },
                { icon: <Phone className="w-5 h-5" />, text: "1-800-PRIMEWRAP", color: "from-cyan-400/20 to-teal-400/20" },
                { icon: <MapPin className="w-5 h-5" />, text: "Mon-Fri 9AM-6PM EST", color: "from-teal-400/20 to-emerald-400/20" }
              ].map((contact, index) => (
                <div key={index} className="group flex items-center space-x-3 p-3 bg-white/5 backdrop-blur-sm rounded-xl border border-white/10 hover:bg-white/10 transition-all duration-300 transform-gpu hover:scale-105">
                  <div className={`w-10 h-10 bg-gradient-to-br ${contact.color} rounded-xl flex items-center justify-center text-emerald-300 shadow-lg transform-gpu group-hover:rotate-6 transition-transform duration-300`}>
                    {contact.icon}
                  </div>
                  <span className="text-emerald-100/80 text-sm">{contact.text}</span>
                </div>
              ))}
            </div>
            
            <div className="mt-6 p-4 bg-gradient-to-r from-emerald-500/20 to-cyan-500/20 backdrop-blur-sm rounded-2xl border border-emerald-400/30">
              <p className="text-emerald-200 text-sm font-medium">
                🚚 Free shipping over $25
              </p>
            </div>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="border-t border-white/20 mt-16 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <div className="flex items-center space-x-2">
              <Heart className="w-5 h-5 text-emerald-400 animate-pulse" />
              <p className="text-emerald-100/60 text-sm">
                © 2024 Pinewrap. Made with love for our planet.
              </p>
            </div>
            
            <div className="flex items-center space-x-6">
              {['Privacy Policy', 'Terms of Service'].map((link, index) => (
                <Link
                  key={link}
                  to="#"
                  className="group text-emerald-100/50 hover:text-emerald-300 text-sm transition-all duration-300"
                >
                  <span className="relative">
                    {link}
                    <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-gradient-to-r from-emerald-400 to-cyan-400 group-hover:w-full transition-all duration-300"></span>
                  </span>
                </Link>
              ))}
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
