import { Link } from 'react-router-dom';
import { Menu, X, Brain, Crown } from 'lucide-react';
import { useState } from 'react';
import { motion } from 'framer-motion';
import SubscriptionModal from './SubscriptionModal';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isSubscriptionOpen, setIsSubscriptionOpen] = useState(false);

  return (
    <>
      <nav className="fixed w-full z-[50] bg-white/80 backdrop-blur-md border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16 items-center">
            <Link to="/" className="flex items-center space-x-2">
              <div className="w-10 h-10 bg-primary-600 rounded-xl flex items-center justify-center">
                <Brain className="text-white w-6 h-6" />
              </div>
              <span className="text-xl font-bold text-slate-900">PrepNinja <span className="text-primary-600">AI</span></span>
            </Link>

            {/* Desktop Nav */}
            <div className="hidden md:flex items-center space-x-8">
              <Link to="/" className="text-slate-600 hover:text-primary-600 font-medium transition-colors">Features</Link>
              <Link to="/pricing" className="text-slate-600 hover:text-primary-600 font-medium transition-colors">Pricing</Link>
              <Link to="/about" className="text-slate-600 hover:text-primary-600 font-medium transition-colors">About</Link>
              <Link to="/login" className="text-slate-600 hover:text-primary-600 font-medium transition-colors">Log in</Link>
              <button 
                onClick={() => setIsSubscriptionOpen(true)}
                className="flex items-center space-x-1.5 bg-gradient-to-r from-amber-400 to-amber-600 text-white px-6 py-2.5 rounded-full font-bold hover:from-amber-500 hover:to-amber-700 transition-all shadow-lg shadow-amber-500/20 transform hover:scale-105 active:scale-95 text-sm"
              >
                <Crown className="w-4 h-4" />
                <span>Get Pro</span>
              </button>
            </div>

            {/* Mobile menu button */}
            <div className="md:hidden">
              <button onClick={() => setIsOpen(!isOpen)} className="text-slate-600">
                {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Nav */}
        {isOpen && (
          <motion.div 
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="md:hidden bg-white border-b border-slate-200 px-4 pt-2 pb-6 space-y-2"
          >
            <Link to="/" className="block px-3 py-2 text-slate-600 font-medium">Features</Link>
            <Link to="/pricing" className="block px-3 py-2 text-slate-600 font-medium">Pricing</Link>
            <Link to="/login" className="block px-3 py-2 text-slate-600 font-medium">Log in</Link>
            <button 
              onClick={() => { setIsSubscriptionOpen(true); setIsOpen(false); }}
              className="w-full flex items-center justify-center space-x-2 bg-gradient-to-r from-amber-400 to-amber-600 text-white py-3 rounded-xl font-bold shadow-lg shadow-amber-500/20"
            >
              <Crown className="w-5 h-5" />
              <span>Get Pro</span>
            </button>
          </motion.div>
        )}
      </nav>

      <SubscriptionModal 
        isOpen={isSubscriptionOpen} 
        onClose={() => setIsSubscriptionOpen(false)} 
      />
    </>
  );
};

export default Navbar;
