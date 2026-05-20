/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  ChevronDown, 
  ChevronUp, 
  Mail, 
  Phone, 
  Facebook,
  Instagram,
  MessageSquare, 
  CheckCircle2, 
  Layout, 
  Truck, 
  Users, 
  Zap, 
  MapPin, 
  ShieldCheck, 
  Menu, 
  X,
  ArrowRight,
  MessageCircle
} from 'lucide-react';
import logo from './logo.svg';
import heroBg from './hero-bg.jpg';
import mockup from './mockup.png';
import mockup3 from './mockup 3.png';
import mockup4 from './mockup4.png';
import mockup5 from './mockup5.png';
import example1 from './example1.png';
import example2 from './example2.png';
import example3 from './example3.png';
import mapImg from './map.png';

// --- Components ---

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'Home', href: '#home' },
    { name: 'What We Do', href: '#what-we-do' },
    { name: 'How It Works', href: '#how-it-works' },
    { name: 'Map', href: '#targeting' },
    { name: 'Why Choose Us', href: '#why-choose-us' },
    { name: 'FAQ', href: '#faq' },
    { name: 'Contact', href: '#contact' },
  ];

  return (
    <nav 
      className={`fixed top-0 w-full z-50 transition-all duration-300 ${
        isScrolled ? 'bg-white/50 backdrop-blur-md border-b border-soft py-4' : 'bg-transparent py-6'
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 flex justify-between items-center">
        <a href="#home" className="flex items-center">
          <img 
            src={logo} 
            alt="Local Spotlight Logo" 
            className={`h-14 md:h-[75px] w-auto transition-all duration-300 ${
              !isScrolled ? 'brightness-0 invert' : ''
            }`} 
          />
        </a>

        {/* Desktop Links */}
        <div className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => (
            <a 
              key={link.name} 
              href={link.href}
              className={`text-sm font-medium transition-colors ${
                isScrolled ? 'text-heading/70 hover:text-accent' : 'text-white/90 hover:text-white'
              }`}
            >
              {link.name}
            </a>
          ))}
          <a 
            href="#contact"
            className="bg-accent text-white px-6 py-2.5 rounded-full text-sm font-semibold hover:bg-heading transition-all shadow-md hover:shadow-lg"
          >
            Get Featured
          </a>
        </div>

        {/* Mobile Menu Toggle */}
        <div className="flex items-center gap-4 md:hidden">
          <div className="flex flex-col items-end">
            <span className={`text-[10px] font-bold uppercase tracking-tight leading-none mb-1 transition-colors ${isScrolled ? 'text-accent' : 'text-white'}`}>Limited Availability!</span>
            <a 
              href="https://wa.me/353834120889"
              target="_blank"
              rel="noopener noreferrer"
              className="bg-accent text-white px-4 py-2 rounded-lg text-sm font-bold flex items-center gap-2 active:scale-95 transition-all shadow-md"
            >
              <MessageCircle size={16} />
              WhatsApp Us
            </a>
          </div>

          <button 
            className={`transition-colors ${isScrolled ? 'text-heading' : 'text-white'}`}
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            {isMobileMenuOpen ? <X size={28} /> : <Menu size={28} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div 
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="absolute top-full left-0 w-full bg-white border-b border-gray-100 p-6 flex flex-col gap-4 md:hidden"
          >
            {navLinks.map((link) => (
              <a 
                key={link.name} 
                href={link.href}
                onClick={() => setIsMobileMenuOpen(false)}
                className="text-lg font-medium text-heading"
              >
                {link.name}
              </a>
            ))}
            <a 
              href="#contact"
              onClick={() => setIsMobileMenuOpen(false)}
              className="bg-accent text-white px-6 py-3 rounded-xl text-center font-bold"
            >
              Get Featured
            </a>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

const FAQItem = ({ question, answer }: { question: string, answer: string }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="border-b border-soft py-4">
      <button 
        className="w-full flex justify-between items-center text-left py-2 group"
        onClick={() => setIsOpen(!isOpen)}
      >
        <span className="text-lg font-serif font-bold text-heading group-hover:text-accent transition-colors">
          {question}
        </span>
        {isOpen ? <ChevronUp className="text-accent" /> : <ChevronDown className="text-gray-400" />}
      </button>
      <AnimatePresence>
        {isOpen && (
          <motion.div 
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            className="overflow-hidden"
          >
            <p className="py-4 text-heading/70 leading-relaxed">
              {answer}
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

const FadeIn = ({ children, delay = 0 }: { children: React.ReactNode, delay?: number, key?: React.Key }) => (
  <motion.div
    initial={{ opacity: 0, y: 30 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true }}
    transition={{ duration: 0.8, delay, ease: [0.21, 0.47, 0.32, 0.98] }}
  >
    {children}
  </motion.div>
);

// --- Main App ---

export default function App() {
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [formData, setFormData] = useState({ name: '', business: '', message: '' });
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.business || !formData.message) return;

    setStatus('loading');
    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        setStatus('success');
        setFormData({ name: '', business: '', message: '' });
      } else {
        setStatus('error');
      }
    } catch (err) {
      console.error(err);
      setStatus('error');
    }
  };

  return (
    <div className="bg-cream min-h-screen text-heading font-sans selection:bg-accent/10 selection:text-accent">
      <Navbar />

      {/* 🔴 1. HERO SECTION */}
      <section id="home" className="relative pt-32 pb-20 md:pt-48 md:pb-32 overflow-hidden bg-heading">
        {/* Background Image Overlay - User provided custom flyer showcase */}
        <div 
          className="absolute inset-0 z-0 opacity-60 bg-cover bg-center"
          style={{ 
            backgroundImage: `url(${heroBg})`,
            maskImage: 'linear-gradient(to bottom, black 80%, transparent)'
          }}
        />
        <div className="absolute inset-0 z-0 bg-heading/40" />

        <div className="max-w-7xl px-6 relative z-10 text-left md:pl-20">
          <FadeIn>
            <div className="inline-block bg-accent text-white px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-widest mb-6 backdrop-blur-sm border border-white/20">
              Exclusivity Guaranteed
            </div>
            <h1 className="text-5xl md:text-8xl font-serif font-bold leading-[1.1] mb-8 text-white">
              Reach 8,500 <br /><span className="italic">Local Homes</span> <br />in Mullingar
            </h1>
            <p className="text-xl md:text-2xl text-white/90 mb-12 font-medium leading-relaxed max-w-2xl">
              Simple affordable, shared direct mail advertising for local businesses.
            </p>
            <div className="flex flex-col sm:flex-row gap-6 justify-start">
              <a 
                href="#contact" 
                className="bg-accent text-white px-10 py-5 rounded-full font-bold shadow-lg hover:opacity-90 hover:-translate-y-1 transition-all text-center flex items-center justify-center gap-2 text-lg"
              >
                Secure your spot <ArrowRight size={20} />
              </a>
              <a 
                href="#how-it-works" 
                className="bg-white/10 backdrop-blur-md text-white border border-white/20 px-10 py-5 rounded-full font-bold hover:bg-white hover:text-heading transition-all text-center shadow-sm text-lg"
              >
                See How It Works
              </a>
            </div>
          </FadeIn>
        </div>
      </section>

      {/* 🟢 STATS BANNER */}
      <section className="bg-white border-y border-soft py-0">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row">
          <div className="flex-1 p-8 text-center border-b md:border-b-0 md:border-r border-soft">
            <div className="text-4xl font-serif font-bold text-accent mb-1">8,500</div>
            <div className="text-xs uppercase tracking-widest font-bold opacity-60">homes reached monthly</div>
          </div>
          <div className="flex-1 p-8 text-center border-b md:border-b-0 md:border-r border-soft">
            <div className="text-2xl lg:text-3xl font-serif font-bold text-accent mb-1">Exclusivity Guaranteed</div>
            <div className="text-xs uppercase tracking-widest font-bold opacity-60">One business per category</div>
          </div>
          <div className="flex-1 p-8 text-center border-b md:border-b-0 md:border-r border-soft">
            <div className="text-4xl font-serif font-bold text-accent mb-1">2 Cent</div>
            <div className="text-xs uppercase tracking-widest font-bold opacity-60">Per Home</div>
          </div>
          <div className="flex-1 p-8 text-center">
            <div className="text-4xl font-serif font-bold text-accent mb-1">An Post</div>
            <div className="text-xs uppercase tracking-widest font-bold opacity-60">Delivery Partner</div>
          </div>
        </div>
      </section>

      {/* 🟡 2. WHAT WE DO */}
      <section id="what-we-do" className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid md:grid-cols-[1.2fr_0.8fr] gap-12 md:gap-20 items-center">
            {/* Desktop Mockup - Hidden on mobile */}
            <div className="hidden md:block order-1">
              <FadeIn>
                <div 
                  className="relative rounded-2xl overflow-hidden shadow-2xl group border border-soft cursor-zoom-in"
                  onClick={() => setSelectedImage(mockup)}
                >
                  <img 
                    src={mockup} 
                    alt="Shared Direct Mail service showcase" 
                    className="w-full h-auto transition-transform duration-700 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-black/0 group-hover:bg-black/5 transition-colors flex items-center justify-center opacity-0 group-hover:opacity-100">
                    <div className="bg-white/90 backdrop-blur-sm text-heading px-4 py-2 rounded-full text-sm font-semibold shadow-lg">
                      Click to expand
                    </div>
                  </div>
                </div>
              </FadeIn>
            </div>
            
            <div className="md:order-2 space-y-8">
              <FadeIn>
                <div className="mb-4 inline-block px-3 py-1 bg-accent/10 rounded-full">
                  <span className="text-accent font-bold text-xs uppercase tracking-widest">Big impact, small budget.</span>
                </div>
                <h2 className="text-4xl md:text-5xl font-serif font-bold mb-8">
                  The Power of <br />
                  <span className="italic text-accent">Shared Mail</span>
                </h2>

                {/* Mobile Mockup - Only shows on mobile directly under heading */}
                <div className="md:hidden mb-10">
                  <div 
                    className="relative rounded-2xl overflow-hidden shadow-xl group border border-soft cursor-zoom-in"
                    onClick={() => setSelectedImage(mockup)}
                  >
                    <img 
                      src={mockup} 
                      alt="Shared Direct Mail service showcase" 
                      className="w-full h-auto"
                    />
                    <div className="absolute inset-0 flex items-center justify-center">
                      <div className="bg-white/90 backdrop-blur-sm text-heading px-4 py-2 rounded-full text-sm font-semibold shadow-lg">
                        Tap to expand
                      </div>
                    </div>
                  </div>
                </div>
                <p className="text-lg text-heading/70 mb-8 leading-relaxed">
                  Local Spotlight is a shared direct mail advertising service. Your business is featured on a professionally designed card and delivered to thousands of homes in your local area for a fraction of the cost if you were to do it alone.
                </p>
                
                <ul className="space-y-6">
                  {[
                    "Delivered to 8,500 homes",
                    "Shared cost (extremely affordable)",
                    "One business per category (exclusivity)"
                  ].map((item, i) => (
                    <li key={i} className="flex items-start gap-4">
                      <div className="mt-1 bg-accent/10 p-1 rounded-full text-accent">
                        <CheckCircle2 size={20} />
                      </div>
                      <span className="text-lg font-medium text-heading/90">{item}</span>
                    </li>
                  ))}
                </ul>
              </FadeIn>
            </div>
          </div>
        </div>
      </section>

      {/* 🔵 3. HOW IT WORKS */}
      <section id="how-it-works" className="py-24 bg-cream">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center max-w-2xl mx-auto mb-20">
            <FadeIn>
              <h2 className="text-4xl md:text-5xl font-serif font-bold mb-6">How It Works</h2>
              <p className="text-lg text-heading/70">A physical, reliable, and premium way to reach your local community.</p>
            </FadeIn>
          </div>

          <div className="grid md:grid-cols-3 gap-12">
            {[
              {
                number: "01",
                title: "You're Featured",
                desc: "We design a high-converting spotlight for your business on our monthly shared card.",
                img: example1
              },
              {
                number: "02",
                title: "Delivered Locally",
                desc: "The card is delivered via An Post to 8,500 verified residential addresses.",
                img: example2
              },
              {
                number: "03",
                title: "Generate Local Customers",
                desc: "Turn exposure into real enquiries, bookings, and sales.",
                img: example3
              }
            ].map((step, i) => (
              <FadeIn key={i} delay={i * 0.2}>
                <div className="space-y-6 group">
                  <div className="relative aspect-video rounded-2xl overflow-hidden border border-soft shadow-sm group-hover:shadow-md transition-shadow">
                    <img 
                      src={step.img} 
                      alt={step.title} 
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" 
                    />
                  </div>
                  <div className="space-y-4">
                    <div className="text-accent text-3xl font-serif font-bold">{step.number}</div>
                    <h3 className="text-xl font-bold">{step.title}</h3>
                    <p className="text-heading/60 text-sm leading-relaxed">{step.desc}</p>
                  </div>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* 🛑 TARGETING SECTION */}
      <section id="targeting" className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid md:grid-cols-[1.2fr_0.8fr] gap-12 md:gap-20 items-center">
            <div className="order-2 md:order-1">
              <FadeIn>
                <div 
                  className="relative rounded-2xl overflow-hidden shadow-2xl group border border-soft cursor-zoom-in"
                  onClick={() => setSelectedImage(mapImg)}
                >
                  <img 
                    src={mapImg} 
                    alt="Map of target area" 
                    className="w-full h-auto transition-transform duration-700 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-black/0 group-hover:bg-black/5 transition-colors flex items-center justify-center opacity-0 group-hover:opacity-100">
                    <div className="bg-white/90 backdrop-blur-sm text-heading px-4 py-2 rounded-full text-sm font-semibold shadow-lg">
                      Click to expand
                    </div>
                  </div>
                </div>
              </FadeIn>
            </div>
            
            <div className="order-1 md:order-2">
              <FadeIn>
                <h2 className="text-4xl md:text-6xl font-serif font-bold mb-8 tracking-tight">
                  Where we are <br />Targetting
                </h2>
                <div className="flex items-center gap-3 mb-6 bg-accent/5 w-fit px-6 py-3 rounded-2xl border border-accent/10">
                  <span className="text-3xl md:text-4xl font-bold text-heading">Mullingar</span>
                  <MapPin className="text-accent" size={32} />
                </div>
                <p className="text-xl md:text-2xl text-heading/70 leading-relaxed font-medium">
                  8500 verified and guaranteed addresses in Mullingar and the surrounding areas.
                </p>
              </FadeIn>
            </div>
          </div>
        </div>
      </section>

      {/* 🟣 4. WHY CHOOSE US */}
      <section id="why-choose-us" className="py-24 bg-white border-y border-soft overflow-hidden">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid lg:grid-cols-[0.9fr_1.1fr] gap-12 lg:gap-20 items-center">
            <div>
              <FadeIn>
                <div className="mb-4 inline-block px-3 py-1 bg-accent/10 rounded-full">
                  <span className="text-accent font-bold text-xs uppercase tracking-widest">a smarter way to reach local customers.</span>
                </div>
                <h2 className="text-4xl md:text-5xl font-serif font-bold mb-10">Why Local Businesses <br />Choose Us</h2>
                <div className="grid sm:grid-cols-2 gap-8">
                  {[
                    { icon: <ShieldCheck size={24} />, title: "No competition", desc: "One business per category-Exclusivity guaranteed" },
                    { icon: <MapPin size={24} />, title: "Guaranteed Local Reach", desc: "Delivered to 8,500 homes in your area." },
                    { icon: <Zap size={24} />, title: "Cost-Effective Advertising", desc: "A fraction of the cost of traditional direct mail." },
                    { icon: <CheckCircle2 size={24} />, title: "Actually Gets Seen", desc: "Physical marketing that stands out and gets noticed not skipped." }
                  ].map((feature, i) => (
                    <div key={i} className="space-y-3">
                      <div className="text-accent">{feature.icon}</div>
                      <h4 className="font-bold text-lg">{feature.title}</h4>
                      <p className="text-heading/60 text-sm leading-relaxed">{feature.desc}</p>
                    </div>
                  ))}
                </div>

                <div className="mt-12 bg-cream p-8 rounded-2xl text-heading relative overflow-hidden shadow-card border border-soft">
                  <div className="relative z-10">
                    <h3 className="text-2xl font-serif font-bold mb-2">Unbeatable Value</h3>
                    <p className="text-heading/80 mb-6 text-sm">Reach every single home in your targeted area for less than a postage stamp.</p>
                    
                    <ul className="mb-8 space-y-3">
                      {['Professional ad Design', 'Printed', 'Delivered'].map((item) => (
                        <li key={item} className="flex items-center gap-3 text-sm font-bold">
                          <CheckCircle2 size={18} className="text-green-600 fill-green-50" />
                          {item}
                        </li>
                      ))}
                    </ul>

                    <p className="text-3xl md:text-4xl font-serif font-bold italic text-accent leading-tight">
                      Starting at €190. <br className="sm:hidden" />
                      <span className="text-2xl md:text-3xl">just 2c per home!</span>
                    </p>
                  </div>
                </div>
              </FadeIn>
            </div>

            <div className="relative">
              <FadeIn>
                <div 
                  className="relative z-10 rounded-2xl overflow-hidden shadow-2xl group border border-soft cursor-zoom-in"
                  onClick={() => setSelectedImage(mockup4)}
                >
                  <img 
                    src={mockup4} 
                    alt="Professional flyer design sample" 
                    className="w-full h-auto transition-transform duration-1000 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-black/0 group-hover:bg-black/5 transition-colors flex items-center justify-center opacity-0 group-hover:opacity-100">
                    <div className="bg-white/90 backdrop-blur-sm text-heading px-4 py-2 rounded-full text-sm font-semibold shadow-lg">
                      Click to expand
                    </div>
                  </div>
                </div>
                {/* Decorative Elements */}
                <div className="absolute -top-10 -right-10 w-40 h-40 bg-accent/5 rounded-full -z-1" />
                <div className="absolute -bottom-10 -left-10 w-60 h-60 bg-cream -z-1 rounded-full border border-soft" />
              </FadeIn>
            </div>
          </div>
        </div>
      </section>

      {/* 🟠 5. SHOWCASE GALLERY */}
      <section id="gallery" className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <div className="mb-16">
            <FadeIn>
              <h2 className="text-4xl md:text-5xl font-serif font-bold mb-4">Real Local <br /><span className="italic text-accent">Impact</span></h2>
            </FadeIn>
            <FadeIn delay={0.2}>
              <p className="max-w-md text-heading/60 text-lg">
                See how other local businesses are standing out on doormats across the county.
              </p>
            </FadeIn>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            <FadeIn delay={0.3}>
              <div className="group relative rounded-3xl overflow-hidden shadow-card border border-soft aspect-[16/10]">
                <img 
                  src={mockup3} 
                  alt="Business showcase sample" 
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" 
                />
                <div className="absolute inset-0 bg-gradient-to-t from-heading/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex items-end p-8">
                  <span className="text-white font-bold text-xl">Premium Full-Page Featured Spot</span>
                </div>
              </div>
            </FadeIn>
            <FadeIn delay={0.4}>
              <div className="group relative rounded-3xl overflow-hidden shadow-card border border-soft aspect-[16/10]">
                <img 
                  src={mockup5} 
                  alt="Business showcase sample" 
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" 
                />
                <div className="absolute inset-0 bg-gradient-to-t from-heading/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex items-end p-8">
                  <span className="text-white font-bold text-xl">Category-Specific Spotlights</span>
                </div>
              </div>
            </FadeIn>
          </div>
        </div>
      </section>

      {/* 🟠 6. FAQ */}
      <section id="faq" className="py-24 bg-cream">
        <div className="max-w-4xl mx-auto px-6">
          <div className="text-center mb-16">
            <FadeIn>
              <h2 className="text-4xl md:text-5xl font-serif font-bold mb-6">Frequently Asked Questions</h2>
              <p className="text-lg text-heading/70">Everything you need to know about getting your spotlight.</p>
            </FadeIn>
          </div>

          <div className="bg-white/50 backdrop-blur-sm p-8 md:p-12 rounded-2xl border border-soft">
            <FadeIn>
              <FAQItem 
                question="How does shared direct mail advertising work?" 
                answer="We design a premium folded 16cm x 24cm postcard which unfolds to 32cm x 24cm, mailed to thousands of homes in your area. Multiple local businesses share the space, splitting the cost while each getting prominent placement." 
              />
              <FAQItem 
                question="How much does it cost?" 
                answer="We have 3 ad sizes available to suit all business size and budgets. Starting at €190. Limited availability. Message us on WhatsApp for current availability and prices." 
              />
              <FAQItem 
                question="What areas do you cover?" 
                answer="Currently, we are specializing in Mullingar and its immediate surroundings, covering over 8,500 verified residential addresses. We are expanding to other towns soon!" 
              />
              <FAQItem 
                question="How many businesses per card?" 
                answer="We feature a limited number of businesses (usually 14-16) per card to ensure maximum visibility for everyone. Most importantly, we only allow ONE business per industry category." 
              />
              <FAQItem 
                question="Can I choose my placement?" 
                answer="Placement is determined based on Ad size. The Ad size you choose is based on a first-come, first-served basis. Our design team ensure visual balance and readability for the homeowner" 
              />
              <FAQItem 
                question="Can I design my own ad?" 
                answer="Absolutely! You can provide your own design or we can create one for you. We provide design guidelines and templates to make sure your ad looks its best." 
              />
              <FAQItem 
                question="How often are postcards mailed?" 
                answer="Mailing frequency varies by campaign — typically monthly or bi-monthly. You'll always know the schedule in advance." 
              />
              <FAQItem 
                question="What kind of businesses advertise?" 
                answer="Restaurants, cafes, bars, home services, fitness studios, salons, real estate agents, dental offices, etc. — any business that serves a local community." 
              />
              <FAQItem 
                question="Is there a contract?" 
                answer="We offer both single-issue and multi-month packages. No long-term contracts required, though multi-month commitments offer better rates." 
              />
            </FadeIn>
          </div>
        </div>
      </section>

      {/* 🔴 6. CONTACT / CTA */}
      <section id="contact" className="py-24 bg-heading text-white overflow-hidden relative">
        <div className="max-w-7xl mx-auto px-6 relative z-10">
          <div className="grid lg:grid-cols-2 gap-20">
            <div className="flex flex-col justify-center">
              <FadeIn>
                <h2 className="text-5xl md:text-6xl font-serif font-bold mb-6 leading-tight select-none">Secure your spot. <br /><span className="italic text-accent">Limited availability</span></h2>
                
                <div className="mb-10">
                  <p className="text-xl text-white/80 mb-6">Message or call us on WhatsApp</p>
                  
                  <div className="flex items-center gap-6 group">
                    <ArrowRight className="text-accent animate-pulse" size={32} />
                    <a 
                      href="https://wa.me/353834120889" 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-3 bg-green-500 text-white px-8 py-4 rounded-full font-bold text-lg shadow-xl hover:bg-green-600 transition-all hover:scale-105 active:scale-95"
                    >
                      <MessageCircle size={24} />
                      WhatsApp Us
                    </a>
                  </div>

                  <div className="mt-8 flex flex-col gap-2">
                    <p className="text-white/40 uppercase tracking-widest text-[10px] font-bold">or</p>
                    <p className="text-lg text-white/80">fill out the form, and we'll get back to you in less than 24 hours</p>
                  </div>

                  <div className="mt-12 flex flex-col sm:flex-row gap-8 pt-10 border-t border-white/5">
                    <div className="space-y-4">
                      <div className="flex items-center gap-3 text-white/70 hover:text-white transition-colors group">
                        <div className="p-2 rounded-lg bg-white/5 group-hover:bg-accent/20 transition-colors">
                          <Mail className="text-accent" size={18} />
                        </div>
                        <a href="mailto:info@localspotlight.ie" className="text-sm font-medium">info@localspotlight.ie</a>
                      </div>
                      <div className="flex items-center gap-3 text-white/70 hover:text-white transition-colors group">
                        <div className="p-2 rounded-lg bg-white/5 group-hover:bg-accent/20 transition-colors">
                          <Phone className="text-accent" size={18} />
                        </div>
                        <a href="tel:0834120889" className="text-sm font-medium">0834120889</a>
                      </div>
                    </div>

                    <div className="flex items-center gap-4">
                      <a 
                        href="https://www.facebook.com/profile.php?id=61590020284741" 
                        target="_blank"
                        rel="noopener noreferrer"
                        className="w-12 h-12 rounded-xl bg-white/5 flex items-center justify-center hover:bg-accent transition-all hover:-translate-y-1 group"
                      >
                        <Facebook size={22} className="text-white/40 group-hover:text-white transition-colors" />
                      </a>
                      <a 
                        href="https://www.instagram.com/local.spotlight.ie?igsh=bGF3Mng0Ym12eTVh" 
                        target="_blank"
                        rel="noopener noreferrer"
                        className="w-12 h-12 rounded-xl bg-white/5 flex items-center justify-center hover:bg-accent transition-all hover:-translate-y-1 group"
                      >
                        <Instagram size={22} className="text-white/40 group-hover:text-white transition-colors" />
                      </a>
                    </div>
                  </div>
                </div>
              </FadeIn>
            </div>

            <div className="bg-white rounded-2xl p-8 md:p-12 text-heading shadow-card relative border border-soft">
              <FadeIn>
                <h3 className="text-3xl font-serif font-bold mb-8">Book My Spot</h3>
                {status === 'success' ? (
                  <motion.div 
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="text-center py-10"
                  >
                    <div className="bg-green-100 text-green-700 p-4 rounded-xl mb-6 flex flex-col items-center gap-3">
                      <CheckCircle2 size={48} />
                      <p className="font-bold text-xl">Inquiry Sent!</p>
                      <p className="text-sm">We'll get back to you within 24 hours.</p>
                    </div>
                    <button 
                      onClick={() => setStatus('idle')}
                      className="text-accent font-bold hover:underline"
                    >
                      Send another message
                    </button>
                  </motion.div>
                ) : (
                  <form className="space-y-6" onSubmit={handleSubmit}>
                    <div className="grid md:grid-cols-2 gap-6">
                      <div className="space-y-2">
                        <label className="text-[10px] font-bold uppercase tracking-widest opacity-60">Full Name</label>
                        <input 
                          type="text" 
                          required
                          value={formData.name}
                          onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                          className="w-full px-4 py-3 rounded-lg bg-cream/50 border border-soft focus:ring-1 focus:ring-accent outline-none transition-all" 
                          placeholder="John Doe" 
                        />
                      </div>
                      <div className="space-y-2">
                        <label className="text-[10px] font-bold uppercase tracking-widest opacity-60">Business Name</label>
                        <input 
                          type="text" 
                          required
                          value={formData.business}
                          onChange={(e) => setFormData({ ...formData, business: e.target.value })}
                          className="w-full px-4 py-3 rounded-lg bg-cream/50 border border-soft focus:ring-1 focus:ring-accent outline-none transition-all" 
                          placeholder="Joe's Plastering" 
                        />
                      </div>
                    </div>
                    <div className="space-y-2">
                      <label className="text-[10px] font-bold uppercase tracking-widest opacity-60">Message</label>
                      <textarea 
                        rows={4} 
                        required
                        value={formData.message}
                        onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                        className="w-full px-4 py-3 rounded-lg bg-cream/50 border border-soft focus:ring-1 focus:ring-accent outline-none transition-all" 
                        placeholder="Tell us about your business..." 
                      />
                    </div>
                    
                    {status === 'error' && (
                      <p className="text-red-500 text-sm font-medium">Failed to send message. Please try again or use WhatsApp.</p>
                    )}

                    <button 
                      disabled={status === 'loading'}
                      className="w-full bg-accent text-white py-4 rounded-full font-bold text-lg shadow-lg hover:opacity-90 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      {status === 'loading' ? 'Sending...' : 'Get Featured Now'}
                    </button>
                  </form>
                )}
              </FadeIn>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-heading py-16 border-t border-white/5">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid md:grid-cols-3 gap-12 mb-12">
            <div className="space-y-6">
              <img src={logo} alt="Local Spotlight Logo" className="h-10 md:h-12 w-auto brightness-0 invert" />
              <p className="text-white/50 text-sm leading-relaxed max-w-xs">
                Connecting local businesses to local families through premium shared direct mail advertising.
              </p>
            </div>
            
            <div className="space-y-6">
              <h4 className="text-white font-bold uppercase tracking-widest text-xs">Quick Links</h4>
              <nav className="flex flex-col gap-3">
                {[
                  { name: 'Home', href: '#home' },
                  { name: 'What We Do', href: '#what-we-do' },
                  { name: 'How It Works', href: '#how-it-works' },
                  { name: 'Targeting Map', href: '#targeting' },
                  { name: 'Why Choose Us', href: '#why-choose-us' },
                  { name: 'FAQ', href: '#faq' },
                  { name: 'Contact', href: '#contact' },
                ].map((link) => (
                  <a 
                    key={link.name} 
                    href={link.href} 
                    className="text-white/40 hover:text-accent transition-colors text-sm font-medium w-fit"
                  >
                    {link.name}
                  </a>
                ))}
              </nav>
            </div>

            <div className="space-y-6">
              <h4 className="text-white font-bold uppercase tracking-widest text-xs">Contact Us</h4>
              <div className="space-y-3">
                <p className="text-white/40 text-sm">info@localspotlight.ie</p>
                <p className="text-white/40 text-sm">0834120889</p>
                <p className="text-white/40 text-sm">Mullingar, Co. Westmeath</p>
              </div>
            </div>
          </div>

          <div className="pt-8 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-6">
            <p className="text-white/30 text-[10px] uppercase tracking-widest font-bold">
              Delivered by An Post • Mullingar
            </p>
            <div className="flex gap-6 text-[10px] font-bold uppercase tracking-widest text-white/30">
              <a href="#" className="hover:text-white transition-colors">Privacy</a>
              <a href="#" className="hover:text-white transition-colors">Terms</a>
              <p>© {new Date().getFullYear()} Local Spotlight</p>
            </div>
          </div>
        </div>
      </footer>

      {/* Full Screen Image Modal */}
      <AnimatePresence>
        {selectedImage && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] flex items-center justify-center p-4 md:p-12 bg-heading/95 backdrop-blur-md"
            onClick={() => setSelectedImage(null)}
          >
            <motion.button
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              className="absolute top-8 right-8 text-white hover:text-accent transition-colors"
              onClick={(e) => {
                e.stopPropagation();
                setSelectedImage(null);
              }}
            >
              <X size={40} />
            </motion.button>
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="max-w-6xl w-full h-auto rounded-2xl overflow-hidden shadow-2xl relative"
              onClick={(e) => e.stopPropagation()}
            >
              <img 
                src={selectedImage} 
                alt="Full screen view" 
                className="w-full h-auto cursor-zoom-out"
                onClick={() => setSelectedImage(null)}
              />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
