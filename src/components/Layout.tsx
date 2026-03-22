import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, Phone, Mail, MapPin, Instagram, Facebook, Send, Lock, Youtube, ChevronDown, Users, User } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { DEFAULTS } from '../data';

const Header = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [showLoginMenu, setShowLoginMenu] = useState(false);
  const location = useLocation();

  useEffect(()=>{
    const fn=(e:MouseEvent)=>{if(!(e.target as Element).closest('.login-dropdown')) setShowLoginMenu(false);};
    document.addEventListener('mousedown',fn);
    return()=>document.removeEventListener('mousedown',fn);
  },[]);

  const navLinks = [
    { name: 'Home', path: '/' },
    { name: 'Tour Packages', path: '/packages' },
    { name: 'About Us', path: '/about' },
    { name: 'Contact', path: '/contact' }
  ];

  return (
    <motion.header
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      className="sticky top-0 z-50 glass"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16 md:h-20">
          <Link to="/" className="flex items-center space-x-1.5 md:space-x-2 group shrink min-w-0">
            <img
              src="/logo.png"
              alt="The Travel Guru Logo"
              className="h-10 sm:h-12 md:h-14 lg:h-16 w-auto object-contain transition-transform duration-300 group-hover:scale-105 shrink-0"
              onError={(e) => {
                // Fallback to text if image is not found
                e.currentTarget.style.display = 'none';
                e.currentTarget.nextElementSibling?.classList.remove('hidden');
              }}
            />
            <span className="text-lg xs:text-xl sm:text-2xl font-bold text-brand-blue tracking-tight transition-transform group-hover:scale-105 whitespace-nowrap">
              The Travel's<span className="text-brand-orange underline decoration-2 underline-offset-4"> Guru</span>
            </span>
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden md:flex space-x-8">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                to={link.path}
                className={`text-sm font-semibold transition-colors hover:text-brand-orange ${location.pathname === link.path ? 'text-brand-blue border-b-2 border-brand-blue' : 'text-gray-600'
                  }`}
              >
                {link.name}
              </Link>
            ))}
          </nav>

          <div className="relative hidden md:block login-dropdown">
            <button
              onClick={()=>setShowLoginMenu(!showLoginMenu)}
              className="btn-primary flex items-center gap-2"
            >
              Login <ChevronDown size={16}/>
            </button>
            {showLoginMenu && (
              <div className="absolute right-0 top-full mt-2 w-48 bg-white rounded-2xl shadow-xl border border-slate-100 overflow-hidden z-50">
                <Link to="/admin" onClick={()=>setShowLoginMenu(false)} className="flex items-center gap-2 px-4 py-3 text-sm font-semibold text-slate-700 hover:bg-slate-50 border-b border-slate-100"><Lock size={14}/> Admin Login</Link>
                <Link to="/employee" onClick={()=>setShowLoginMenu(false)} className="flex items-center gap-2 px-4 py-3 text-sm font-semibold text-slate-700 hover:bg-slate-50 border-b border-slate-100"><Users size={14}/> Employee Login</Link>
                <Link to="/customer" onClick={()=>setShowLoginMenu(false)} className="flex items-center gap-2 px-4 py-3 text-sm font-semibold text-slate-700 hover:bg-slate-50"><User size={14}/> Customer Login</Link>
              </div>
            )}
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden shrink-0 ml-2">
            <button onClick={() => setIsOpen(!isOpen)} className="text-slate-800 p-1">
              {isOpen ? <X size={28} /> : <Menu size={28} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Nav */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden bg-white border-t py-4 px-4 space-y-4 overflow-hidden"
          >
            {navLinks.map((link) => (
              <Link
                key={link.name}
                to={link.path}
                onClick={() => setIsOpen(false)}
                className="block text-base font-medium text-gray-700 hover:text-brand-blue py-2 border-b border-gray-100"
              >
                {link.name}
              </Link>
            ))}
            <div className="space-y-2 pt-2">
              <Link to="/admin" onClick={()=>setIsOpen(false)} className="flex items-center gap-2 w-full bg-slate-800 text-white py-3 px-4 rounded-xl font-bold text-sm"><Lock size={14}/> Admin Login</Link>
              <Link to="/employee" onClick={()=>setIsOpen(false)} className="flex items-center gap-2 w-full bg-slate-600 text-white py-3 px-4 rounded-xl font-bold text-sm"><Users size={14}/> Employee Login</Link>
              <Link to="/customer" onClick={()=>setIsOpen(false)} className="flex items-center gap-2 w-full bg-brand-blue text-white py-3 px-4 rounded-xl font-bold text-sm"><User size={14}/> Customer Login</Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  );
};

const Footer = () => {
  return (
    <footer className="bg-slate-900 text-white pt-16 pb-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 md:grid-cols-4 gap-12">
        <div className="space-y-4">
          <Link to="/" className="inline-block mb-2">
            <img
              src="/logo.png"
              alt="The Travel Guru Logo"
              className="h-12 md:h-16 w-auto object-contain bg-white/95 px-2 py-1 rounded-xl shadow-lg"
              onError={(e) => {
                // Fallback to text if image is not found
                e.currentTarget.style.display = 'none';
                e.currentTarget.nextElementSibling?.classList.remove('hidden');
              }}
            />
            <h3 className="text-xl font-bold text-white mt-2">The Travel's Guru</h3>
          </Link>
          <p className="text-slate-400 text-sm">🏢 Main: Happy Hallmark Shopper, Vesu, Surat<br/>🏢 Sub: Taloda, Nandurbar, Maharashtra</p>
          <div className="flex space-x-4 pt-2">
            <a href="https://www.facebook.com/profile.php?id=100072345653999" target="_blank" rel="noreferrer"><Facebook className="text-slate-400 hover:text-blue-500 cursor-pointer transition-colors" size={20}/></a>
            <a href="https://www.instagram.com/the_travels_guru/?hl=en" target="_blank" rel="noreferrer"><Instagram className="text-slate-400 hover:text-pink-500 cursor-pointer transition-colors" size={20}/></a>
            <a href="https://t.me/thetravelsguru" target="_blank" rel="noreferrer"><Send className="text-slate-400 hover:text-blue-400 cursor-pointer transition-colors" size={20}/></a>
            <a href="https://www.youtube.com/@thetravelsguru" target="_blank" rel="noreferrer"><Youtube className="text-slate-400 hover:text-red-500 cursor-pointer transition-colors" size={20}/></a>
          </div>
        </div>

        <div>
          <h4 className="font-bold mb-6">Quick Links</h4>
          <ul className="space-y-3 text-slate-400 text-sm">
            <li><Link to="/packages" onClick={()=>window.scrollTo(0,0)} className="hover:text-white">Explore Packages</Link></li>
            <li><Link to="/about" onClick={()=>window.scrollTo(0,0)} className="hover:text-white">Our Story</Link></li>
            <li><Link to="/contact" onClick={()=>window.scrollTo(0,0)} className="hover:text-white">Contact Us</Link></li>
            <li><Link to="/contact" onClick={()=>window.scrollTo(0,0)} className="hover:text-white">Custom Trip Plan</Link></li>
          </ul>
        </div>

        <div>
          <h4 className="font-bold mb-6">Support</h4>
          <ul className="space-y-3 text-slate-400 text-sm">
            <li><Link to="/cancellation-policy" onClick={()=>window.scrollTo(0,0)} className="hover:text-white">Cancellation Policy</Link></li>
            <li><Link to="/privacy-policy" onClick={()=>window.scrollTo(0,0)} className="hover:text-white">Privacy Policy</Link></li>
            <li><Link to="/travel-insurance" onClick={()=>window.scrollTo(0,0)} className="hover:text-white">Travel Insurance</Link></li>
            <li><Link to="/terms" onClick={()=>window.scrollTo(0,0)} className="hover:text-white">Terms of Service</Link></li>
          </ul>
        </div>

        <div>
          <h4 className="font-bold mb-6">Contact Info</h4>
          <ul className="space-y-4 text-slate-400 text-sm">
            <li className="flex items-start space-x-3">
              <MapPin className="text-orange-500 shrink-0" size={18} />
              <span>{DEFAULTS.ADDRESS}</span>
            </li>
            <li className="flex items-center space-x-3">
              <Phone className="text-orange-500 shrink-0" size={18} />
              <a href={`tel:${DEFAULTS.PHONE}`}>{DEFAULTS.PHONE}</a>
            </li>
            <li className="flex items-center space-x-3">
              <Mail className="text-orange-500 shrink-0" size={18} />
              <a href={`mailto:${DEFAULTS.EMAIL}`}>{DEFAULTS.EMAIL}</a>
            </li>
            <li className="mt-3 rounded-xl overflow-hidden border border-slate-700" style={{height:'130px'}}>
              <iframe src="https://maps.google.com/maps?q=Happy+Hallmark+Shopper+Vesu+Surat&t=&z=14&ie=UTF8&iwloc=&output=embed" width="100%" height="100%" style={{border:0}} loading="lazy" title="Office"/>
            </li>
          </ul>
        </div>
      </div>
      <div className="mt-16 pt-8 border-t border-slate-800 text-center text-slate-500 text-xs">
        <p>&copy; {new Date().getFullYear()} The Travel's Guru. All Rights Reserved. Designed for Trust & Excellence.</p>
      </div>
    </footer>
  );
};

export const Layout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-grow">{children}</main>
      <Footer />

      {/* Floating WhatsApp Widget */}
      <a
        href={`https://wa.me/${DEFAULTS.WHATSAPP.replace(/\s+/g, '')}?text=Hi! I am interested in planning a trip with The Travel's Guru.`}
        target="_blank"
        rel="noopener noreferrer"
        className="fixed bottom-6 right-6 z-50 bg-green-500 text-white p-4 rounded-full shadow-2xl hover:bg-green-600 transition-all hover:scale-110 group"
      >
        <span className="absolute right-full mr-3 bg-white text-gray-800 px-3 py-1.5 rounded-lg text-sm font-semibold shadow-lg opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
          Chat with us!
        </span>
        <svg viewBox="0 0 24 24" width="28" height="28" stroke="currentColor" strokeWidth="0" fill="currentColor">
          <path d="M12.031 6.172c-3.181 0-5.767 2.586-5.768 5.766-.001 1.298.38 2.27 1.019 3.287l-.582 2.128 2.182-.573c.978.58 1.911.928 3.145.929 3.178 0 5.767-2.587 5.768-5.766 0-3.18-2.587-5.771-5.764-5.771zm3.392 8.244c-.144.405-.837.774-1.17.824-.299.045-.677.063-1.092-.069-.252-.08-.575-.187-.988-.365-1.739-.751-2.874-2.502-2.961-2.617-.087-.116-.708-.94-.708-1.793 0-.852.449-1.27.61-1.444.162-.174.347-.217.464-.217.115 0 .231.001.331.005.106.004.249-.04.391.297.144.35.494 1.206.538 1.294.044.088.072.19.014.305-.058.115-.087.19-.174.29-.087.1-.183.222-.261.305-.087.087-.179.183-.077.359.102.176.452.746.969 1.206.666.591 1.228.775 1.402.864.174.089.275.074.377-.044.102-.118.434-.506.549-.68.116-.174.232-.145.39-.087.159.058 1.013.477 1.187.564.174.087.289.129.331.202.044.073.044.423-.1.828z" />
        </svg>
      </a>
    </div>
  );
};

