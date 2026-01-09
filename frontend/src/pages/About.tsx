
import { Leaf, Shield, Heart, Award, Recycle, Globe, BadgeCheck, Sprout, Trophy } from 'lucide-react';

const About = () => {
  const values = [
    {
      icon: <Globe className="w-8 h-8 text-primary" />,
      title: "Planet First",
      description: "Every decision we make considers the environmental impact first",
      color: "from-emerald-400 to-green-500"
    },
    {
      icon: <Shield className="w-8 h-8 text-primary" />,
      title: "Ultra Strong",
      description: "Eco-friendly shouldn't mean compromising on quality or reliability",
      color: "from-cyan-400 to-blue-500"
    },
    {
      icon: <Heart className="w-8 h-8 text-primary" />,
      title: "Community Love",
      description: "Building a movement of conscious consumers making better choices",
      color: "from-teal-400 to-emerald-500"
    }
  ];

  const certifications = [
    { icon: <BadgeCheck className="w-8 h-8" />, title: "BPI Certified", color: "from-emerald-100 to-green-100" },
    { icon: <Sprout className="w-8 h-8" />, title: "ASTM D6400", color: "from-cyan-100 to-blue-100" },
    { icon: <Recycle className="w-8 h-8" />, title: "OK Compost", color: "from-teal-100 to-emerald-100" },
    { icon: <Trophy className="w-8 h-8" />, title: "ISO 14855", color: "from-green-100 to-cyan-100" }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-50 via-cyan-50 to-teal-50">
      {/* Floating Elements */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 right-1/4 w-64 h-64 bg-emerald-200/20 rounded-full blur-3xl animate-float"></div>
        <div className="absolute bottom-1/4 left-1/4 w-96 h-96 bg-cyan-200/20 rounded-full blur-3xl animate-float" style={{animationDelay: '2s'}}></div>
        <div className="absolute top-3/4 right-1/3 w-48 h-48 bg-teal-200/20 rounded-full blur-3xl animate-float" style={{animationDelay: '4s'}}></div>
      </div>

      <div className="relative max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        {/* Hero Section */}
        <div className="text-center mb-20 animate-fade-in">
          <div className="inline-flex items-center bg-white/80 backdrop-blur-xl rounded-full px-8 py-4 shadow-lg border border-emerald-200/30 mb-8 transform-gpu hover:scale-105 transition-all duration-300">
            <Leaf className="w-6 h-6 text-emerald-600 mr-3 animate-pulse" />
            <span className="text-sm font-bold text-emerald-800 tracking-wide">ECO-FRIENDLY INNOVATION</span>
          </div>
          
            <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold font-display tracking-tight leading-tight">
            <span className="bg-gradient-to-r from-emerald-700 via-cyan-600 to-teal-700 bg-clip-text text-foreground">
              SMALL CHANGE,
            </span>
            <br />
            <span className="bg-gradient-to-r from-cyan-600 via-teal-600 to-emerald-600 bg-clip-text text-primary">
              BIG IMPACT
            </span>
          </h1>
          
          <p className="text-xl text-slate-600 max-w-3xl mx-auto leading-relaxed">
            At Pinewrap, we believe that everyday choices can create extraordinary change. 
            Our mission is to make sustainable living simple, accessible, and effective.
          </p>
        </div>

        {/* Story Section */}
        <div className="mb-20 animate-slide-up">
          <div className="group perspective-1000">
            <div className="relative bg-gradient-to-br from-white/90 to-emerald-50/90 backdrop-blur-xl rounded-3xl p-12 shadow-2xl border border-white/30 transform-gpu group-hover:scale-[1.02] group-hover:rotate-1 transition-all duration-500">
              {/* 3D Glow */}
              <div className="absolute inset-0 bg-gradient-to-r from-emerald-400/10 via-cyan-400/10 to-teal-400/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-3xl blur-xl -z-10"></div>
              
              <div className="flex items-center mb-8">
                <div className="w-16 h-16 bg-gradient-to-br from-emerald-400 to-cyan-500 rounded-2xl flex items-center justify-center mr-6 shadow-lg transform-gpu group-hover:rotate-6 transition-transform duration-300">
                  <Recycle className="w-8 h-8 text-primary" />
                </div>
                <h2 className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-emerald-700 to-cyan-700 bg-clip-text">
                  Our Story
                </h2>
              </div>
              
              <p className="text-lg text-slate-700 leading-relaxed mb-6">
                Born from the simple realization that the products we use every day should work 
                for us <em>and</em> our planet, Pinewrap started as a quest to reimagine the 
                humble garbage bag.
              </p>
              <p className="text-lg text-slate-700 leading-relaxed">
                We spent months researching sustainable materials, working with environmental 
                scientists, and testing with real families to create garbage bags that don't 
                compromise on strength or convenience while being kind to the Earth.
              </p>
            </div>
          </div>
        </div>

        {/* Values Grid */}
        <div className="grid md:grid-cols-3 gap-8 mb-20">
          {values.map((value, index) => (
            <div key={index} className="group perspective-1000 animate-slide-up" style={{animationDelay: `${index * 0.2}s`}}>
              <div className="relative bg-white/80 backdrop-blur-xl rounded-3xl p-8 shadow-xl border border-white/30 text-center transform-gpu group-hover:scale-105 group-hover:rotate-2 transition-all duration-500">
                {/* 3D Icon */}
                <div className={`w-20 h-20 bg-gradient-to-br ${value.color} rounded-3xl flex items-center justify-center mx-auto mb-6 shadow-lg transform-gpu group-hover:scale-110 group-hover:rotate-12 transition-transform duration-300`}>
                  <div className="text-white transform-gpu group-hover:scale-110 transition-transform duration-300">
                    {value.icon}
                  </div>
                  {/* 3D depth */}
                  <div className={`absolute inset-0 bg-gradient-to-br ${value.color} opacity-60 rounded-3xl -z-10 translate-x-2 translate-y-2`}></div>
                </div>
                
                <h3 className="text-xl font-bold text-slate-800 mb-4 group-hover:text-emerald-700 transition-colors duration-300">
                  {value.title}
                </h3>
                <p className="text-slate-600 leading-relaxed">
                  {value.description}
                </p>
                
                {/* Hover glow */}
                <div className="absolute inset-0 rounded-3xl bg-gradient-to-r from-emerald-400/20 to-cyan-400/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500 blur-xl -z-10"></div>
              </div>
            </div>
          ))}
        </div>

        {/* Certifications */}
        <div className="group perspective-1000 animate-fade-in">
          <div className="relative bg-gradient-to-br from-white/90 to-cyan-50/90 backdrop-blur-xl rounded-3xl p-12 shadow-2xl border border-white/30 text-center transform-gpu group-hover:scale-[1.02] transition-all duration-500">
            <h2 className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-emerald-700 to-cyan-700 bg-clip-text mb-12">
              Certified & Trusted
            </h2>
            
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8 items-center justify-items-center">
              {certifications.map((cert, index) => (
                <div key={index} className="group/cert text-center transform-gpu hover:scale-110 transition-all duration-300">
                  <div className={`bg-gradient-to-br ${cert.color} rounded-2xl p-6 mb-4 shadow-lg transform-gpu group-hover/cert:rotate-6 transition-transform duration-300`}>
                    <div className="flex items-center justify-center text-slate-700">{cert.icon}</div>
                    {/* 3D depth */}
                    <div className={`absolute inset-0 bg-gradient-to-br ${cert.color} opacity-40 rounded-2xl -z-10 translate-x-1 translate-y-1`}></div>
                  </div>
                  <p className="text-sm font-semibold text-slate-700">{cert.title}</p>
                </div>
              ))}
            </div>
            
            {/* Background glow */}
            <div className="absolute inset-0 rounded-3xl bg-gradient-to-r from-emerald-400/10 via-cyan-400/10 to-teal-400/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500 blur-xl -z-10"></div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default About;
