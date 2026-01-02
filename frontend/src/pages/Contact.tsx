
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { toast } from '@/hooks/use-toast';
import { Mail, MessageSquare, Phone, Clock, Leaf, Sparkles } from 'lucide-react';
import axios from 'axios';
import { API_BASE } from '@/lib/apiBase';

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });

  const handleSubmit = async (e: React.FormEvent) => {
  e.preventDefault();
  if (formData.name && formData.email && formData.message) {
    try {
      const res = await axios.post(`${API_BASE}/api/v1/user/contact`, formData, {
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (res.status === 201) {
        toast({
          title: "Message sent! 🌱",
          description: "We'll get back to you within 24 hours.",
        });
        setFormData({ name: '', email: '', message: '' });
      }
    } catch (error: any) {
      toast({
        title: "Error",
        description: error?.response?.data?.message || "Failed to send message. Please try again.",
        variant: "destructive",
      });
    }
  } else {
    toast({
      title: "Incomplete form",
      description: "Please fill all fields before submitting.",
      variant: "destructive",
    });
  }
};

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  const faqs = [
    {
      question: "What makes PrimeWrap bags eco-friendly?",
      answer: "Our bags are made from plant-based materials that biodegrade naturally without leaving harmful residues. They're certified compostable and meet all international environmental standards."
    },
    {
      question: "How strong are PrimeWrap bags compared to regular plastic bags?",
      answer: "PrimeWrap bags are designed to be just as strong as traditional plastic bags, with enhanced puncture resistance and stretch capacity. They won't tear or leak during normal use."
    },
    {
      question: "What's your shipping policy?",
      answer: "We offer free shipping on orders over $25. Standard delivery takes 3-5 business days, and expedited shipping is available for faster delivery."
    },
    {
      question: "Can I return products if I'm not satisfied?",
      answer: "Absolutely! We offer a 30-day satisfaction guarantee. If you're not completely happy with your purchase, we'll provide a full refund or exchange."
    },
    {
      question: "How should I store the bags?",
      answer: "Store PrimeWrap bags in a cool, dry place away from direct sunlight. They have a shelf life of 18 months when stored properly."
    },
    {
      question: "Are the bags suitable for all types of waste?",
      answer: "Yes, our bags are designed for regular household waste. However, avoid using them for sharp objects or extremely hot materials to prevent damage."
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-50 via-cyan-50 to-teal-50">
      {/* Floating Elements */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 right-1/4 w-72 h-72 bg-emerald-200/20 rounded-full blur-3xl animate-float"></div>
        <div className="absolute bottom-1/4 left-1/4 w-96 h-96 bg-cyan-200/20 rounded-full blur-3xl animate-float" style={{animationDelay: '1s'}}></div>
        <div className="absolute top-3/4 right-1/3 w-64 h-64 bg-teal-200/20 rounded-full blur-3xl animate-float" style={{animationDelay: '3s'}}></div>
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        {/* Header */}
        <div className="text-center mb-20 animate-fade-in">
          <div className="inline-flex items-center bg-white/80 backdrop-blur-xl rounded-full px-8 py-4 shadow-lg border border-emerald-200/30 mb-8 transform-gpu hover:scale-105 transition-all duration-300">
            <MessageSquare className="w-6 h-6 text-emerald-600 mr-3 animate-pulse" />
            <span className="text-sm font-bold text-emerald-800 tracking-wide">LET'S CONNECT</span>
          </div>
          
          <h1 className="text-5xl md:text-7xl font-bold mb-8 tracking-tight leading-[0.9]">
            <span className="bg-gradient-to-r from-emerald-700 via-cyan-600 to-teal-700 bg-clip-text text-transparent">
              GET IN
            </span>
            <br />
            <span className="bg-gradient-to-r from-cyan-600 via-teal-600 to-emerald-600 bg-clip-text text-transparent">
              TOUCH
            </span>
          </h1>
          
          <p className="text-xl text-slate-600 max-w-2xl mx-auto">
            Have questions about our products or need support? We're here to help make your eco-journey easier!
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-16">
          {/* Contact Form */}
          <div className="group perspective-1000 animate-slide-up">
            <div className="relative bg-gradient-to-br from-white/90 to-emerald-50/90 backdrop-blur-xl rounded-3xl p-10 shadow-2xl border border-white/30 transform-gpu group-hover:scale-[1.02] group-hover:rotate-1 transition-all duration-500">
              {/* 3D Icon Header */}
              <div className="flex items-center mb-8">
                <div className="w-16 h-16 bg-gradient-to-br from-emerald-400 to-cyan-500 rounded-2xl flex items-center justify-center mr-6 shadow-lg transform-gpu group-hover:rotate-6 transition-transform duration-500">
                  <Mail className="w-8 h-8 text-white" />
                </div>
                <h2 className="text-3xl font-bold bg-gradient-to-r from-emerald-700 to-cyan-700 bg-clip-text text-transparent">
                  Send us a message
                </h2>
              </div>

              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <label htmlFor="name" className="block text-sm font-semibold text-slate-700 mb-3">
                    Name
                  </label>
                  <Input
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    placeholder="Your full name"
                    required
                    className="bg-white/80 border-2 border-emerald-200/50 focus:border-emerald-400 rounded-xl px-4 py-3 text-slate-700 placeholder:text-slate-400 backdrop-blur-sm"
                  />
                </div>
                <div>
                  <label htmlFor="email" className="block text-sm font-semibold text-slate-700 mb-3">
                    Email
                  </label>
                  <Input
                    id="email"
                    name="email"
                    type="email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="your.email@example.com"
                    required
                    className="bg-white/80 border-2 border-emerald-200/50 focus:border-emerald-400 rounded-xl px-4 py-3 text-slate-700 placeholder:text-slate-400 backdrop-blur-sm"
                  />
                </div>
                <div>
                  <label htmlFor="message" className="block text-sm font-semibold text-slate-700 mb-3">
                    Message
                  </label>
                  <Textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    placeholder="How can we help you make a difference?"
                    rows={5}
                    required
                    className="bg-white/80 border-2 border-emerald-200/50 focus:border-emerald-400 rounded-xl px-4 py-3 text-slate-700 placeholder:text-slate-400 resize-none backdrop-blur-sm"
                  />
                </div>
                <Button
                  type="submit"
                  className="w-full bg-gradient-to-r from-emerald-500 to-cyan-500 hover:from-emerald-600 hover:to-cyan-600 text-white py-4 font-bold tracking-wide rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 transform-gpu hover:scale-105"
                >
                  <Sparkles className="w-5 h-5 mr-2" />
                  SEND MESSAGE
                </Button>
              </form>

              {/* Hover glow */}
              <div className="absolute inset-0 rounded-3xl bg-gradient-to-r from-emerald-400/10 via-cyan-400/10 to-teal-400/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500 blur-xl -z-10"></div>
            </div>
          </div>

          {/* FAQ Section */}
          <div className="space-y-8 animate-slide-up" style={{animationDelay: '0.2s'}}>
            {/* Contact Info Cards */}
            <div className="grid gap-4 mb-8">
              {[
                { icon: <Phone className="w-5 h-5" />, text: "1-800-PRIMEWRAP", color: "from-emerald-100 to-green-100" },
                { icon: <Mail className="w-5 h-5" />, text: "help@primewrap.com", color: "from-cyan-100 to-blue-100" },
                { icon: <Clock className="w-5 h-5" />, text: "Mon-Fri 9AM-6PM EST", color: "from-teal-100 to-emerald-100" }
              ].map((contact, index) => (
                <div key={index} className="group perspective-1000">
                  <div className={`bg-gradient-to-r ${contact.color} backdrop-blur-sm rounded-2xl p-4 flex items-center space-x-4 shadow-lg border border-white/30 transform-gpu group-hover:scale-105 group-hover:rotate-1 transition-all duration-300`}>
                    <div className="w-10 h-10 bg-white/80 rounded-xl flex items-center justify-center text-emerald-600 shadow-md">
                      {contact.icon}
                    </div>
                    <span className="font-semibold text-slate-700">{contact.text}</span>
                  </div>
                </div>
              ))}
            </div>

            <div className="flex items-center mb-6">
              <div className="w-12 h-12 bg-gradient-to-br from-cyan-400 to-emerald-500 rounded-2xl flex items-center justify-center mr-4 shadow-lg">
                <Leaf className="w-6 h-6 text-white" />
              </div>
              <h2 className="text-2xl font-bold bg-gradient-to-r from-emerald-700 to-cyan-700 bg-clip-text text-transparent">
                Frequently Asked Questions
              </h2>
            </div>
            
            <Accordion type="single" collapsible className="space-y-4">
              {faqs.map((faq, index) => (
                <AccordionItem
                  key={index}
                  value={`item-${index}`}
                  className="group perspective-1000"
                >
                  <div className="bg-white/80 backdrop-blur-xl rounded-2xl border border-white/30 shadow-lg transform-gpu group-hover:scale-[1.02] transition-all duration-300 px-6">
                    <AccordionTrigger className="text-left font-semibold text-slate-700 hover:text-emerald-600 py-4">
                      {faq.question}
                    </AccordionTrigger>
                    <AccordionContent className="text-slate-600 pb-4 leading-relaxed">
                      {faq.answer}
                    </AccordionContent>
                  </div>
                </AccordionItem>
              ))}
            </Accordion>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contact;
