import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Link, useLocation, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'motion/react';
import { Check, Menu, X, ArrowRight, Shield, FileText, Mail, Phone, MapPin, ChevronRight, CheckCircle2 } from 'lucide-react';
import { Logo } from './components/Logo';

// --- Components ---

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const location = useLocation();
  const isHome = location.pathname === '/';

  const handleLinkClick = (id: string) => {
    setIsMenuOpen(false);
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const showScrolledStyle = isScrolled || !isHome;

  return (
    <nav className={`fixed w-full z-50 transition-all duration-300 ${showScrolledStyle ? 'bg-white/90 backdrop-blur-md shadow-sm py-4' : 'bg-transparent py-6'}`}>
      <div className="max-w-7xl mx-auto px-6 flex justify-between items-center">
        <div className="md:hidden w-10" /> {/* Mobile spacer to center logo */}
        <Link to="/" className="flex items-center gap-2">
          <Logo 
            variant={showScrolledStyle ? 'dark' : 'light'} 
            className="h-20 w-auto"
          />
        </Link>

        <div className="hidden md:flex items-center gap-8">
          <Link to="/#how-it-works" onClick={() => handleLinkClick('how-it-works')} className={`text-sm font-medium hover:text-gold transition-colors ${showScrolledStyle ? 'text-forest' : 'text-white'}`}>How It Works</Link>
          <Link to="/#benefits" onClick={() => handleLinkClick('benefits')} className={`text-sm font-medium hover:text-gold transition-colors ${showScrolledStyle ? 'text-forest' : 'text-white'}`}>Why Choose Us</Link>
          <Link to="/#contact" onClick={() => handleLinkClick('contact')} className="bg-gold hover:bg-gold/90 text-white px-8 py-2.5 rounded-full text-sm font-light italic transition-all tracking-wide shadow-lg shadow-gold/10">
            Get My Offer
          </Link>
        </div>

        <button className="md:hidden text-white" onClick={() => setIsMenuOpen(!isMenuOpen)}>
          {isMenuOpen ? <X className={showScrolledStyle ? 'text-forest' : 'text-white'} /> : <Menu className={showScrolledStyle ? 'text-forest' : 'text-white'} />}
        </button>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="absolute top-full left-0 w-full bg-white shadow-xl py-8 px-6 flex flex-col gap-6 md:hidden"
          >
            <Link to="/#how-it-works" onClick={() => handleLinkClick('how-it-works')} className="text-lg font-medium text-forest">How It Works</Link>
            <Link to="/#benefits" onClick={() => handleLinkClick('benefits')} className="text-lg font-medium text-forest">Why Choose Us</Link>
            <Link to="/#contact" onClick={() => handleLinkClick('contact')} className="bg-forest text-white text-center py-4 rounded-xl font-light italic">Get My Offer</Link>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

const Footer = () => {
  const handleLinkClick = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <footer className="bg-[#0b2114] text-white py-20 px-6">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-16">
        <div>
          <div className="mb-10 flex justify-center md:justify-start">
            <Logo variant="light" className="h-24 w-auto" />
          </div>
          <p className="text-gray-400 text-sm leading-relaxed max-w-xs font-light">
            Helping land owners across the country sell their property through a seamless, professional process.
          </p>
        </div>
        <div>
          <h4 className="font-bold mb-8 text-gold uppercase tracking-[0.2em] text-[10px]">Quick Links</h4>
          <ul className="space-y-4 text-sm text-gray-400 font-light">
            <li><Link to="/#how-it-works" onClick={() => handleLinkClick('how-it-works')} className="hover:text-gold transition-colors">How It Works</Link></li>
            <li><Link to="/#benefits" onClick={() => handleLinkClick('benefits')} className="hover:text-gold transition-colors">Why Choose Us</Link></li>
            <li><Link to="/privacy" className="hover:text-gold transition-colors">Privacy Policy</Link></li>
            <li><Link to="/terms" className="hover:text-gold transition-colors">Terms of Service</Link></li>
          </ul>
        </div>
        <div>
          <h4 className="font-bold mb-8 text-gold uppercase tracking-[0.2em] text-[10px]">Contact</h4>
          <ul className="space-y-4 text-sm text-gray-400 font-light">
            <li className="flex items-center gap-3"><Mail size={16} className="text-gold" /> info@acqrinvestments.com</li>
            <li className="flex items-center gap-3"><MapPin size={16} className="text-gold" /> 3225 McLeod Dr. Suite 100 Las Vegas, NV 89121</li>
            <li className="flex items-center gap-3"><Phone size={16} className="text-gold" /> 805-826-1749</li>
          </ul>
        </div>
      </div>
      <div className="max-w-7xl mx-auto mt-20 pt-8 border-t border-white/5 text-center text-[10px] uppercase tracking-widest text-gray-500">
        &copy; {new Date().getFullYear()} ACQR, LLC. All rights reserved.
      </div>
    </footer>
  );
};

// --- Pages ---

const LandingPage = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    propertyInfo: '',
    transactionalConsent: false,
    promotionalConsent: false
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    console.log("FORM SUBMIT STARTED");
    
    // Collect form values using FormData as requested
    const form = e.target as HTMLFormElement;
    const data = new FormData(form);
    const payload: any = {};
    
    // Map fields to the requested payload structure
    const firstName = data.get('firstName') as string;
    const lastName = data.get('lastName') as string;
    const email = data.get('email') as string;
    const phone = data.get('phone') as string;
    const propertyInfo = data.get('propertyInfo') as string;

    if (firstName) payload.firstName = firstName;
    if (lastName) payload.lastName = lastName;
    if (firstName && lastName) payload.name = `${firstName} ${lastName}`;
    if (email) payload.email = email;
    if (phone) payload.phone = phone;
    if (propertyInfo) payload.propertyAddress = propertyInfo; // Mapping propertyInfo to propertyAddress

    console.log("PAYLOAD:", payload);

    try {
      const response = await fetch('https://services.leadconnectorhq.com/hooks/XAeN1WklwW8MkNzlvtgb/webhook-trigger/959ba564-d478-4d45-9cdf-173228b1496f', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload),
      });

      console.log("WEBHOOK RESPONSE STATUS:", response.status);

      if (response.ok) {
        alert('Your inquiry has been received. Someone from our team will be in touch with you shortly.');
        // Reset form
        setFormData({
          firstName: '',
          lastName: '',
          email: '',
          phone: '',
          propertyInfo: '',
          transactionalConsent: false,
          promotionalConsent: false
        });
        navigate('/thank-you');
      } else {
        throw new Error('Failed to submit form');
      }
    } catch (error) {
      console.error('Submission error:', error);
      alert('There was an error submitting your form. Please try again later.');
    }
  };

  return (
    <div className="relative">
      {/* Hero Section */}
      <section className="relative h-screen flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 z-0">
          <img 
            src="https://images.unsplash.com/photo-1500382017468-9049fed747ef?auto=format&fit=crop&q=80&w=2000" 
            alt="Sleek field" 
            className="w-full h-full object-cover brightness-[0.65]"
            referrerPolicy="no-referrer"
          />
        </div>
        
        <div className="relative z-10 max-w-4xl mx-auto px-6 text-center pt-32">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h1 className="text-6xl md:text-8xl font-light italic text-white mb-20 leading-[1.1]">
              Sell Your Land <br /><span className="text-gold">Hassle-Free</span>
            </h1>
            <p className="text-xl text-gray-200 mb-16 max-w-2xl mx-auto font-light leading-relaxed italic">
              Professional land acquisitions designed for today’s landowners
            </p>
            <div className="flex justify-center">
              <Link to="/#contact" onClick={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })} className="bg-gold hover:bg-gold/90 text-white px-12 py-5 rounded-full font-light italic text-lg transition-all shadow-xl shadow-gold/20 flex items-center justify-center gap-3 tracking-wide">
                Get My Offer <ArrowRight size={20} />
              </Link>
            </div>
          </motion.div>
        </div>

        <div className="absolute bottom-10 left-1/2 -translate-x-1/2 animate-bounce text-white/50">
          <ChevronRight size={32} className="rotate-90" />
        </div>
      </section>

      <section id="how-it-works" className="py-32 px-6 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-24">
            <h2 className="text-[10px] uppercase tracking-[0.4em] text-gold font-bold mb-6">The Methodology</h2>
            <h3 className="text-5xl font-bold text-forest leading-tight">A Refined Approach <br />to Land Acquisition</h3>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-16">
            {[
              { step: 'I', title: 'Digital Submission', desc: 'Provide your property details through our secure form below.' },
              { step: 'II', title: 'Property Review', desc: 'Our team evaluates your property and will reach out if additional details are needed.' },
              { step: 'III', title: 'Offer & Closing', desc: 'We present a fair, cash offer and handle a smooth, efficient closing process.' }
            ].map((item, idx) => (
              <div key={idx} className="relative p-10 rounded-[2.5rem] bg-paper border border-forest/5 hover:border-gold/40 transition-all duration-500 group">
                <span className="text-7xl font-serif italic text-gold/10 absolute top-6 right-10 group-hover:text-gold/20 transition-colors">{item.step}</span>
                <h4 className="text-2xl font-bold mb-6 text-forest">{item.title}</h4>
                <p className="text-gray-600 leading-relaxed font-light">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section id="benefits" className="py-32 px-6 bg-paper">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-24 items-center">
          <div>
            <h2 className="text-[10px] uppercase tracking-[0.4em] text-gold font-bold mb-6">The Distinction</h2>
            <h3 className="text-5xl font-bold text-forest mb-10 leading-tight">A Simpler Way <br />to Sell Your Land</h3>
            <div className="space-y-8">
              {[
                'Simple and hassle-free process',
                'No commissions or hidden fees',
                'Transparent, fair offers',
                'Clear communication at every step',
                'We take care of the paperwork'
              ].map((benefit, idx) => (
                <div key={idx} className="flex items-center gap-6">
                  <div className="w-8 h-8 rounded-full bg-gold/10 flex items-center justify-center text-gold">
                    <Check size={18} />
                  </div>
                  <span className="text-forest/80 font-medium text-lg italic font-serif">{benefit}</span>
                </div>
              ))}
            </div>
          </div>
          <div className="relative">
            <img 
              src="/land-lot-lines.jpg" 
              alt="Aerial land with lot lines" 
              className="rounded-[3rem] shadow-2xl grayscale-[0.2] contrast-[1.1]"
              referrerPolicy="no-referrer"
            />
            <div className="absolute -bottom-12 -left-12 bg-white p-10 rounded-[2.5rem] shadow-2xl hidden md:block border border-forest/5">
              <div className="flex items-center gap-6">
                <CheckCircle2 className="text-gold" size={40} />
                <p className="text-xl font-bold text-forest font-serif italic leading-tight">A Simple, <br />Transparent Process</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section id="contact" className="py-32 px-6 bg-white">
        <div className="max-w-3xl mx-auto">
          <div className="text-center mb-20">
            <h2 className="text-5xl font-bold text-forest mb-6">Secure Your Offer</h2>
            <p className="text-gray-600 font-light italic">Begin your journey towards a seamless property exit.</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-8 bg-paper p-10 md:p-16 rounded-[3rem] border border-forest/5 shadow-sm">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="space-y-3">
                <label className="text-xs uppercase tracking-widest font-bold text-forest/60 ml-1">First Name</label>
                <input 
                  required
                  name="firstName"
                  type="text" 
                  placeholder="John"
                  className="w-full px-8 py-5 rounded-2xl bg-white border border-forest/10 focus:border-gold focus:ring-4 focus:ring-gold/5 outline-none transition-all font-light"
                  value={formData.firstName}
                  onChange={e => setFormData({...formData, firstName: e.target.value})}
                />
              </div>
              <div className="space-y-3">
                <label className="text-xs uppercase tracking-widest font-bold text-forest/60 ml-1">Last Name</label>
                <input 
                  required
                  name="lastName"
                  type="text" 
                  placeholder="Doe"
                  className="w-full px-8 py-5 rounded-2xl bg-white border border-forest/10 focus:border-gold focus:ring-4 focus:ring-gold/5 outline-none transition-all font-light"
                  value={formData.lastName}
                  onChange={e => setFormData({...formData, lastName: e.target.value})}
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="space-y-3">
                <label className="text-xs uppercase tracking-widest font-bold text-forest/60 ml-1">Email Address</label>
                <input 
                  required
                  name="email"
                  type="email" 
                  placeholder="john@example.com"
                  className="w-full px-8 py-5 rounded-2xl bg-white border border-forest/10 focus:border-gold focus:ring-4 focus:ring-gold/5 outline-none transition-all font-light"
                  value={formData.email}
                  onChange={e => setFormData({...formData, email: e.target.value})}
                />
              </div>
              <div className="space-y-3">
                <label className="text-xs uppercase tracking-widest font-bold text-forest/60 ml-1">Phone Number</label>
                <input 
                  name="phone"
                  type="tel" 
                  placeholder="(555) 000-0000"
                  className="w-full px-8 py-5 rounded-2xl bg-white border border-forest/10 focus:border-gold focus:ring-4 focus:ring-gold/5 outline-none transition-all font-light"
                  value={formData.phone}
                  onChange={e => setFormData({...formData, phone: e.target.value})}
                />
              </div>
            </div>

            <div className="space-y-3">
              <label className="text-xs uppercase tracking-widest font-bold text-forest/60 ml-1">Property Information</label>
              <textarea 
                required
                name="propertyInfo"
                rows={4}
                placeholder="County, State, APN, or Address..."
                className="w-full px-8 py-5 rounded-2xl bg-white border border-forest/10 focus:border-gold focus:ring-4 focus:ring-gold/5 outline-none transition-all resize-none font-light"
                value={formData.propertyInfo}
                onChange={e => setFormData({...formData, propertyInfo: e.target.value})}
              />
            </div>

            {/* A2P Compliance Checkboxes */}
            <div className="space-y-6 pt-8 border-t border-forest/10">
              <label className="flex items-start gap-4 cursor-pointer group">
                <div className="relative mt-1">
                  <input 
                    type="checkbox" 
                    className="peer sr-only"
                    checked={formData.transactionalConsent}
                    onChange={e => setFormData({...formData, transactionalConsent: e.target.checked})}
                  />
                  <div className="w-6 h-6 border-2 border-forest/20 rounded-lg peer-checked:bg-forest peer-checked:border-forest transition-all" />
                  <Check className="absolute top-1 left-1 text-white opacity-0 peer-checked:opacity-100 transition-opacity" size={16} />
                </div>
                <span className="text-[11px] text-gray-500 leading-relaxed font-light italic">
                  I consent to receive transactional SMS messages (updates, reminders, and conversation) from ACQR, LLC dba ACQR Investments at the number provided. Message frequency varies. Msg & data rates may apply. Reply STOP to opt out.
                </span>
              </label>

              <label className="flex items-start gap-4 cursor-pointer group">
                <div className="relative mt-1">
                  <input 
                    type="checkbox" 
                    className="peer sr-only"
                    checked={formData.promotionalConsent}
                    onChange={e => setFormData({...formData, promotionalConsent: e.target.checked})}
                  />
                  <div className="w-6 h-6 border-2 border-forest/20 rounded-lg peer-checked:bg-forest peer-checked:border-forest transition-all" />
                  <Check className="absolute top-1 left-1 text-white opacity-0 peer-checked:opacity-100 transition-opacity" size={16} />
                </div>
                <span className="text-[11px] text-gray-500 leading-relaxed font-light italic">
                  I consent to receive promotional SMS messages (offers or marketing messages) from ACQR, LLC dba ACQR Investments at the number provided. Consent is not a condition of any purchase. Message frequency varies. Msg & data rates may apply. Reply STOP to opt out.
                </span>
              </label>

              <p className="text-[10px] text-gray-400 mt-6 text-center">
                By clicking "Get My Offer", you agree to our <Link to="/terms" className="underline hover:text-gold">Terms of Service</Link> and <Link to="/privacy" className="underline hover:text-gold">Privacy Policy</Link>.
              </p>
            </div>

            <button type="submit" className="w-full bg-forest hover:bg-forest/90 text-white py-6 rounded-2xl font-light italic text-lg transition-all shadow-2xl shadow-forest/20">
              Get My Offer
            </button>
          </form>
        </div>
      </section>
    </div>
  );
};

const PrivacyPolicy = () => (
  <div className="pt-32 pb-24 px-6 max-w-4xl mx-auto">
    <h1 className="text-5xl font-bold mb-10 text-forest">Privacy Policy</h1>
    <div className="prose prose-forest max-w-none text-gray-700 space-y-8 font-light leading-relaxed">
      <p className="italic">
        ACQR, LLC dba ACQR Investments values and respects your privacy. This Privacy Policy explains how we collect, use, disclose, and safeguard your personal information when you interact with our website, mobile application, and related services (collectively, the “Service”).
      </p>
      <p>
        By accessing or using our Service, you acknowledge that you have read, understood, and agreed to the terms of this Privacy Policy as well as our Terms of Service.
      </p>
      
      <h2 className="text-3xl font-bold text-forest pt-6 border-b border-forest/5 pb-2">1. Definitions</h2>
      <ul className="list-disc pl-6 space-y-3">
        <li><strong className="text-forest">Company:</strong> Refers to ACQR, LLC.</li>
        <li><strong className="text-forest">Personal Data:</strong> Any information that can identify or be linked to an individual (e.g., name, email, phone number, IP address).</li>
        <li><strong className="text-forest">Cookies:</strong> Small data files stored on your browser that help us recognize you and improve your user experience.</li>
        <li><strong className="text-forest">Device:</strong> Any internet-connected device such as a phone, tablet, or computer used to access our Service.</li>
        <li><strong className="text-forest">Service:</strong> The ACQR Investments platform, website, and associated applications.</li>
        <li><strong className="text-forest">You / User:</strong> Any person or entity that interacts with our Service.</li>
      </ul>

      <h2 className="text-3xl font-bold text-forest pt-6 border-b border-forest/5 pb-2">2. Information We Collect</h2>
      <p>We may collect the following information when you use our Service:</p>
      <ul className="list-disc pl-6 space-y-3">
        <li><strong className="text-forest">Contact Information:</strong> Name, phone number, email address.</li>
        <li><strong className="text-forest">Account Information:</strong> When you register, subscribe, or fill out forms.</li>
        <li><strong className="text-forest">Device Information:</strong> IP address, browser type, operating system, and device identifiers.</li>
        <li><strong className="text-forest">Optional Data:</strong> If enabled, mobile contacts/phonebook for easier use of certain features.</li>
        <li><strong className="text-forest">Social Media Data:</strong> Public information you choose to share with us via third-party platforms.</li>
      </ul>

      <h2 className="text-3xl font-bold text-forest pt-6 border-b border-forest/5 pb-2">3. How We Use Your Information</h2>
      <p>Your information may be used for the following purposes:</p>
      <ul className="list-disc pl-6 space-y-3">
        <li>To provide and personalize our services.</li>
        <li>To process transactions and deliver purchased products or services.</li>
        <li>To improve customer service and website functionality.</li>
        <li>To send marketing communications (with opt-out options).</li>
        <li>To administer promotions, surveys, or contests.</li>
        <li>To comply with legal obligations or enforce our rights.</li>
      </ul>

      <h2 className="text-3xl font-bold text-forest pt-6 border-b border-forest/5 pb-2">4. Sharing of Information</h2>
      <p>We may share your information in the following situations:</p>
      <ul className="list-disc pl-6 space-y-3">
        <li>With trusted third-party service providers (e.g., hosting, payment processing, email management).</li>
        <li>With advertisers or marketing partners whose services we believe may be of interest to you.</li>
        <li>With affiliates or business partners, including in the event of a merger, sale, or acquisition.</li>
        <li>As required by law enforcement, court orders, or regulatory obligations.</li>
      </ul>
      <p>We do not sell your personal information.</p>

      <h2 className="text-3xl font-bold text-forest pt-6 border-b border-forest/5 pb-2">5. Data Retention</h2>
      <p>We retain personal data only for as long as necessary to provide our Service and comply with legal obligations. Once no longer required, we securely delete or anonymize the data.</p>

      <h2 className="text-3xl font-bold text-forest pt-6 border-b border-forest/5 pb-2">6. Security of Your Information</h2>
      <p>We use reasonable technical, administrative, and physical safeguards (including SSL encryption and secure servers) to protect your information. However, no system is 100% secure, and we cannot guarantee absolute security.</p>

      <h2 className="text-3xl font-bold text-forest pt-6 border-b border-forest/5 pb-2">7. International Data Transfers</h2>
      <p>As a U.S.-based company, your information may be stored or processed in other countries. By using our Service, you consent to such transfers, subject to applicable data protection laws.</p>

      <h2 className="text-3xl font-bold text-forest pt-6 border-b border-forest/5 pb-2">8. Your Rights</h2>
      <p>Depending on your location, you may have the following rights:</p>
      <ul className="list-disc pl-6 space-y-3">
        <li><strong className="text-forest">Access & Correction:</strong> Request access to or correction of your personal data.</li>
        <li><strong className="text-forest">Deletion:</strong> Request deletion of your information.</li>
        <li><strong className="text-forest">Opt-Out:</strong> Unsubscribe from marketing communications at any time.</li>
        <li><strong className="text-forest">Data Portability:</strong> Request a copy of your data in a portable format.</li>
      </ul>

      <h2 className="text-3xl font-bold text-forest pt-6 border-b border-forest/5 pb-2">SMS Communication and Data Use</h2>
      <p>We may collect personal information such as your name, phone number, email, and property details when you submit information through our website or communicate with us.</p>
      
      <p><strong className="text-forest">How We Use Your Information:</strong><br />
      We use this information to contact you regarding your property, respond to inquiries, and provide offers.</p>
      
      <p><strong className="text-forest">SMS Consent:</strong><br />
      By providing your phone number through our website form, you expressly consent to receive SMS messages from ACQR Investments regarding your property and related services. Consent is not a condition of purchase.</p>
      
      <p>Message frequency may vary. Message and data rates may apply.</p>
      
      <p><strong className="text-forest">Opt-Out Instructions:</strong><br />
      You can opt out at any time by replying STOP. For assistance, reply HELP.</p>
      
      <p><strong className="text-forest">No Sharing Policy:</strong><br />
      We do not sell, rent, or share your personal information, including phone numbers or SMS consent data, with third parties for marketing purposes.</p>
      
      <p><strong className="text-forest">Cookies and Tracking:</strong><br />
      We may use cookies and tracking technologies to improve user experience and analyze website traffic.</p>
      
      <p><strong className="text-forest">Data Security:</strong><br />
      We implement reasonable security measures to protect your information.</p>
      
      <p><strong className="text-forest">User Rights:</strong><br />
      You may request access, updates, or deletion of your personal information by contacting us.</p>

      <h2 className="text-3xl font-bold text-forest pt-6 border-b border-forest/5 pb-2">10. Children’s Privacy</h2>
      <p>Our Service is not directed at individuals under the age of 13, and we do not knowingly collect personal data from children. If you believe a child has provided us with personal information, please contact us immediately for removal.</p>

      <h2 className="text-3xl font-bold text-forest pt-6 border-b border-forest/5 pb-2">11. Cookies & Tracking Technologies</h2>
      <p>We use cookies and similar technologies to enhance your experience, analyze site traffic, and improve performance. You can disable cookies in your browser, but certain features of the Service may not function properly.</p>

      <h2 className="text-3xl font-bold text-forest pt-6 border-b border-forest/5 pb-2">12. Legal Compliance (GDPR & CCPA)</h2>
      <ul className="list-disc pl-6 space-y-3">
        <li><strong className="text-forest">GDPR (EU Residents):</strong> You have rights of access, rectification, erasure, and restriction of processing.</li>
        <li><strong className="text-forest">CCPA (California Residents):</strong> You have the right to know what data we collect, request deletion, and opt out of the sale of personal data (we do not sell personal data).</li>
      </ul>

      <h2 className="text-3xl font-bold text-forest pt-6 border-b border-forest/5 pb-2">13. Changes to this Privacy Policy</h2>
      <p>We may update this Privacy Policy from time to time. Continued use of our Service after changes indicates acceptance.</p>
    </div>
    <div className="mt-16 pt-10 border-t border-forest/5">
      <Link to="/" className="text-gold font-bold flex items-center gap-2 hover:gap-4 transition-all uppercase tracking-widest text-xs">
        <ArrowRight className="rotate-180" size={16} /> Back to Home
      </Link>
    </div>
  </div>
);

const TermsOfService = () => (
  <div className="pt-32 pb-24 px-6 max-w-4xl mx-auto">
    <h1 className="text-5xl font-bold mb-10 text-forest">Terms of Service</h1>
    <div className="prose prose-forest max-w-none text-gray-700 space-y-8 font-light leading-relaxed">
      <p className="italic">
        You agree to receive recurring automated promotional and personalized marketing text (e.g., SMS and MMS) messages (e.g. cart reminders) from ACQR, LLC dba ACQR Investments, including text messages that may be sent using an automatic telephone dialing system, to the mobile telephone number you provided when signing up or any other number that you designate. Consent to receive automated marketing text messages is not a condition of any purchase. Msg & Data rates may apply.
      </p>
      <p>
        Message frequency will vary. ACQR, LLC reserves the right to alter the frequency of messages sent at any time, so as to increase or decrease the total number of sent messages. ACQR, LLC also reserves the right to change the short code or phone number from which messages are sent and we will notify you when we do so. Not all mobile devices or handsets may be supported and our messages may not be deliverable in all areas. ACQR, LLC, its service providers, and the mobile carriers supported by the program are not liable for delayed or undelivered messages. We are able to deliver messages to the following mobile phone carriers: AT&T, Verizon Wireless, Sprint, T-Mobile, and other major national and regional carriers.
      </p>
      
      <h2 className="text-3xl font-bold text-forest pt-6 border-b border-forest/5 pb-2">SMS Messaging Terms</h2>
      
      <p><strong className="text-forest">Program Description:</strong><br />
      By submitting your information through our website, you agree to receive SMS messages from ACQR Investments related to your property inquiries, offers, and follow-ups.</p>
      
      <p><strong className="text-forest">Types of Messages:</strong><br />
      You may receive messages such as:<br />
      - Property-related offers<br />
      - Follow-up messages<br />
      - Appointment coordination</p>
      
      <p><strong className="text-forest">Message Frequency:</strong><br />
      Message frequency may vary depending on your interaction.</p>
      
      <p><strong className="text-forest">Message & Data Rates:</strong><br />
      Standard message and data rates may apply.</p>
      
      <p><strong className="text-forest">Opt-In Method:</strong><br />
      You opt in by submitting your information through our website form.</p>
      
      <p><strong className="text-forest">Opt-Out Instructions:</strong><br />
      You can opt out at any time by replying STOP.</p>
      
      <p><strong className="text-forest">Help:</strong><br />
      For assistance, reply HELP or contact us at info@acqrinvestments.com.</p>
      
      <p><strong className="text-forest">Carrier Disclaimer:</strong><br />
      We are not responsible for delays or undelivered messages caused by mobile carriers.</p>
      
      <p><strong className="text-forest">Age Requirement:</strong><br />
      You must be at least 18 years old to use our services.</p>
      
      <p><strong className="text-forest">Privacy Policy Reference:</strong><br />
      For more information, please review our Privacy Policy.</p>

      <h2 className="text-3xl font-bold text-forest pt-6 border-b border-forest/5 pb-2">Cancellation</h2>
      <p>
        Text the keywords STOP, END, CANCEL, UNSUBSCRIBE or QUIT to cancel. After texting STOP, END, CANCEL, UNSUBSCRIBE, or QUIT you will receive one additional message confirming that your request has been processed. You acknowledge that our text message platform may not recognize and respond to unsubscribe requests that do not include the STOP, END, CANCEL, UNSUBSCRIBE, or QUIT keyword commands and agree that ACQR, LLC and its service providers will have no liability for failing to honor such requests.
      </p>

      <h2 className="text-3xl font-bold text-forest pt-6 border-b border-forest/5 pb-2">Help</h2>
      <p>
        Text the keyword HELP to return customer care contact information.
      </p>

      <h2 className="text-3xl font-bold text-forest pt-6 border-b border-forest/5 pb-2">Customer Care</h2>
      <p>
        If you are experiencing any problems, please email us at <strong className="text-forest">info@acqrinvestments.com</strong>.
      </p>

      <h2 className="text-3xl font-bold text-forest pt-6 border-b border-forest/5 pb-2">Other Terms</h2>
      <p>
        These Messaging Terms & Conditions are a part of and subject to our Terms of Use and our Privacy Policy (collectively with these Messaging Terms & Conditions, the “Terms Documents”). By participating in our text message program, you agree to our Terms Documents. To the extent that a conflict exists between these Messaging Terms & Conditions and our Terms of Use, these Messaging Terms & Conditions will control.
      </p>
      <p>
        <strong className="text-forest">Age Restriction:</strong> Our services are intended for individuals who are at least 18 years of age. By using our services or providing your contact information, you confirm that you are 18 years or older.
      </p>

      <h2 className="text-3xl font-bold text-forest pt-6 border-b border-forest/5 pb-2">Contact</h2>
      <p>
        This messaging program is a service of ACQR, LLC, located at 3225 McLeod Dr. Suite 100 Las Vegas, NV 89121.
      </p>
    </div>
    <div className="mt-16 pt-10 border-t border-forest/5">
      <Link to="/" className="text-gold font-bold flex items-center gap-2 hover:gap-4 transition-all uppercase tracking-widest text-xs">
        <ArrowRight className="rotate-180" size={16} /> Back to Home
      </Link>
    </div>
  </div>
);

const ThankYouPage = () => (
  <div className="min-h-screen flex items-center justify-center px-6 bg-paper">
    <motion.div 
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      className="max-w-xl w-full bg-white p-16 rounded-[4rem] shadow-2xl text-center border border-forest/5"
    >
      <div className="w-24 h-24 bg-gold/10 rounded-full flex items-center justify-center text-gold mx-auto mb-10">
        <Check size={48} />
      </div>
      <h1 className="text-5xl font-bold text-forest mb-6">Success</h1>
      <p className="text-gray-600 mb-12 leading-relaxed font-light italic">
        Your inquiry has been received. Someone from our team will be in touch with you shortly.
      </p>
      <Link to="/" className="inline-block bg-gold text-white px-12 py-5 rounded-full font-bold transition-all hover:shadow-xl hover:shadow-gold/20 tracking-widest uppercase text-sm">
        Return to Home
      </Link>
      <div className="mt-16 pt-10 border-t border-forest/5 flex justify-center gap-8 text-[10px] uppercase tracking-widest text-gray-400">
        <Link to="/privacy" className="hover:text-gold underline">Privacy Policy</Link>
        <Link to="/terms" className="hover:text-gold underline">Terms of Service</Link>
      </div>
    </motion.div>
  </div>
);

const ScrollToTop = () => {
  const { pathname, hash } = useLocation();
  useEffect(() => {
    if (hash) {
      const id = hash.replace('#', '');
      const element = document.getElementById(id);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
      } else {
        // Fallback for when navigating from another page or if rendering is delayed
        const timeoutId = setTimeout(() => {
          const el = document.getElementById(id);
          if (el) el.scrollIntoView({ behavior: 'smooth' });
        }, 100);
        return () => clearTimeout(timeoutId);
      }
    } else {
      window.scrollTo(0, 0);
    }
  }, [pathname, hash]);
  return null;
};

export default function App() {
  return (
    <Router>
      <ScrollToTop />
      <div className="min-h-screen flex flex-col">
        <Navbar />
        <main className="flex-grow">
          <Routes>
            <Route path="/" element={<LandingPage />} />
            <Route path="/privacy" element={<PrivacyPolicy />} />
            <Route path="/terms" element={<TermsOfService />} />
            <Route path="/thank-you" element={<ThankYouPage />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </Router>
  );
}
