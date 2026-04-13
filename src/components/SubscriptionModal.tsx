import { motion, AnimatePresence } from 'framer-motion';
import { X, CheckCircle, Zap, Crown } from 'lucide-react';

interface SubscriptionModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const SubscriptionModal = ({ isOpen, onClose }: SubscriptionModalProps) => {
  const plans = [
    {
      name: "Free Plan",
      price: "0",
      description: "Basic preparation for curiosity.",
      features: [
        "3 AI Mock Interviews / week",
        "Standard Resume ATS Check",
        "Limited Access to Roadmap",
        "Ads Experience"
      ],
      buttonText: "Current Plan",
      isPrimary: false
    },
    {
      name: "Ninja Pro",
      price: "199",
      description: "Complete preparation accelerator.",
      features: [
        "Unlimited AI Mock Interviews",
        "Advanced AI Resume Suggestions",
        "Personalized AI Career Roadmap",
        "100% Ad-Free Experience",
        "Premium Community Access"
      ],
      buttonText: "Upgrade to Pro",
      isPrimary: true
    }
  ];

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-slate-900/40 backdrop-blur-sm z-[100]"
          />

          {/* Modal Container */}
          <div className="fixed inset-0 w-full h-full z-[101] flex items-center justify-center p-4">
            <motion.div
              initial={{ scale: 0.9, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.9, opacity: 0, y: 20 }}
              className="bg-white rounded-[32px] shadow-2xl w-full max-w-4xl max-h-[90vh] overflow-y-auto relative z-10 scrollbar-hide"
            >
              {/* Close Button */}
              <button
                onClick={onClose}
                className="absolute top-6 right-6 p-2 hover:bg-slate-100 rounded-full transition-colors z-10"
              >
                <X className="w-6 h-6 text-slate-400" />
              </button>

              <div className="flex flex-col md:flex-row min-h-full">
                {/* Left Side: Header/Info */}
                <div className="md:w-[35%] bg-slate-900 p-6 md:p-10 text-white flex flex-col justify-center">
                  <div className="mb-8 md:mb-12">
                    <div className="w-10 h-10 md:w-14 md:h-14 bg-primary-500 rounded-2xl flex items-center justify-center mb-6 shadow-xl shadow-primary-500/20">
                      <Crown className="w-5 h-5 md:w-7 md:h-7 text-white" />
                    </div>
                    <h2 className="text-2xl md:text-3xl font-black mb-4 leading-tight">Unlock Your <br className="hidden md:block" /> Full Potential</h2>
                    <p className="text-slate-400 text-sm leading-relaxed font-medium">
                      Upgrade to Pro for unlimited access to AI resources and premium preparation tools.
                    </p>
                  </div>
                  
                  <div className="space-y-5">
                    <div className="flex items-center space-x-4 text-sm">
                      <div className="w-9 h-9 rounded-full bg-white/5 flex items-center justify-center border border-white/10">
                        <Zap className="w-4 h-4 text-primary-400" />
                      </div>
                      <span className="font-bold text-slate-300">Instant AI Feedback</span>
                    </div>
                    <div className="flex items-center space-x-4 text-sm">
                      <div className="w-9 h-9 rounded-full bg-white/5 flex items-center justify-center border border-white/10">
                        <CheckCircle className="w-4 h-4 text-green-400" />
                      </div>
                      <span className="font-bold text-slate-300">Priority Support</span>
                    </div>
                  </div>
                </div>

                {/* Right Side: Plans */}
                <div className="md:w-[65%] p-6 md:p-10 bg-white">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-5 md:gap-6">
                    {plans.map((plan, idx) => (
                      <div 
                        key={idx}
                        className={`p-6 rounded-[28px] border-2 ${
                          plan.isPrimary ? 'border-primary-100 bg-primary-50/20' : 'border-slate-50 bg-slate-50/50'
                        } flex flex-col hover:border-primary-200 transition-colors duration-300 relative group`}
                      >
                        {plan.isPrimary && (
                          <div className="absolute -top-3 left-1/2 -translate-x-1/2 px-3 py-1 bg-primary-600 text-white text-[10px] font-black uppercase tracking-widest rounded-full shadow-lg">
                            Popular Choice
                          </div>
                        )}
                        <div className="mb-6">
                          <h3 className={`font-black text-lg ${plan.isPrimary ? 'text-primary-600' : 'text-slate-900'}`}>
                            {plan.name}
                          </h3>
                          <div className="flex items-baseline mt-1">
                            <span className="text-3xl font-black text-slate-900">₹{plan.price}</span>
                            <span className="text-slate-500 text-xs ml-1 font-bold">/lifetime</span>
                          </div>
                        </div>

                        <ul className="space-y-3 mb-8 flex-1">
                          {plan.features.map((feature, fIdx) => (
                            <li key={fIdx} className="flex items-start space-x-2.5 text-xs">
                              <CheckCircle className={`w-4 h-4 shrink-0 mt-0.5 ${plan.isPrimary ? 'text-primary-500' : 'text-slate-400'}`} />
                              <span className="text-slate-600 font-bold leading-tight">{feature}</span>
                            </li>
                          ))}
                        </ul>

                        <button 
                          className={`w-full py-3.5 rounded-2xl font-black text-xs md:text-sm transition-all transform active:scale-95 ${
                            plan.isPrimary 
                              ? 'bg-primary-600 text-white shadow-xl shadow-primary-600/30 hover:bg-primary-700' 
                              : 'bg-white border-2 border-slate-200 text-slate-600 hover:bg-slate-50'
                          }`}
                        >
                          {plan.buttonText}
                        </button>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </>
      )}
    </AnimatePresence>
  );
};

export default SubscriptionModal;
