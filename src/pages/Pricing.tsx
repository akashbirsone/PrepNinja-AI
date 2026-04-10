import { useState } from 'react';
import Sidebar from '../components/Sidebar';
import { 
  CheckCircle, 
  Menu, 
  Zap, 
  PlayCircle,
  X,
  Video
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import toast from 'react-hot-toast';

const Pricing = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [showAdModal, setShowAdModal] = useState(false);

  const plans = [
    {
      name: "Free Plan",
      price: "0",
      description: "Basic preparation for curious students.",
      features: [
        { text: "3 AI Mocks / week", value: "3 Per Week" },
        { text: "Placement Roadmap", value: "Generic" },
        { text: "Ads Experience", value: "Banner & Video Ads" },
        { text: "Expert Feedback", value: "—" },
        { text: "Resume ATS Check", value: "Standard" },
      ]
    },
    {
      name: "Ninja Pro",
      price: "199",
      popular: true,
      description: "Complete preparation accelerator for high-performers.",
      features: [
        { text: "AI Interview Credits", value: "Unlimited" },
        { text: "Placement Roadmap", value: "AI Personalized" },
        { text: "Ads Experience", value: "100% Ad-Free" },
        { text: "Expert Feedback", value: "Real-time" },
        { text: "Resume ATS Check", value: "Advanced + AI Suggestions" },
      ]
    }
  ];

  return (
    <div className="flex h-screen bg-slate-50 overflow-hidden">
      <Sidebar isMobile={false} />
      <Sidebar isMobile={true} isOpen={isSidebarOpen} onClose={() => setIsSidebarOpen(false)} />

      <main className="flex-1 min-w-0 flex flex-col overflow-auto">
        <header className="bg-white border-b border-slate-200 h-20 flex items-center justify-between px-8 shrink-0">
           <div className="flex items-center space-x-4">
              <button onClick={() => setIsSidebarOpen(true)} className="lg:hidden p-2 hover:bg-slate-100 rounded-xl">
                 <Menu className="w-6 h-6 text-slate-600" />
              </button>
              <h2 className="text-xl font-black text-slate-900">Subscription Plans</h2>
           </div>
           <button className="bg-primary-600 text-white px-6 py-2 rounded-xl font-bold text-sm shadow-lg shadow-primary-600/20 hover:bg-primary-700 transition-all">
              Go Pro Now
           </button>
        </header>

        <div className="p-8 pb-20 max-w-6xl mx-auto w-full">
           <div className="text-center mb-16">
              <h1 className="text-4xl font-extrabold text-slate-900 tracking-tight mb-4">Choose Your Path to Success</h1>
              <p className="text-slate-500 font-medium text-lg max-w-2xl mx-auto">
                 Prepare smarter, not harder. Our AI tracks your progress and curates the perfect roadmap for your dream job.
              </p>
           </div>

           <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-20">
              {/* Premium Plan Card */}
              <div className="bg-white p-10 rounded-[48px] border border-slate-200 shadow-xl relative overflow-hidden">
                 <div className="flex items-center space-x-2 text-primary-600 font-black text-[10px] uppercase tracking-widest mb-8 px-4 py-1.5 bg-primary-50 rounded-full w-fit">
                    <Zap className="w-3 h-3 fill-current" />
                    <span>Premium Accelerator</span>
                 </div>
                 
                 <h2 className="text-4xl font-black text-slate-900 mb-2">Unlimited AI Power. <br /><span className="text-primary-600">Ad-Free Preparation.</span></h2>
                 <ul className="space-y-4 mb-10 mt-8">
                    <BenefitItem text="Unlimited AI-Generated Mock Interviews" />
                    <BenefitItem text="Zero Banner or Rewarded Ads" />
                    <BenefitItem text="Real-time Code Execution Analysis" />
                 </ul>

                 <div className="flex items-center space-x-4 mb-10">
                    <button className="flex-1 bg-primary-600 text-white py-5 rounded-[28px] font-black text-xl hover:bg-primary-700 shadow-2xl transition-all">
                       Upgrade to Pro — ₹199
                    </button>
                 </div>
              </div>

              {/* Free Plan Card */}
              <div className="bg-white p-10 rounded-[48px] border border-slate-200 shadow-sm relative overflow-hidden">
                 <div className="flex items-center justify-between mb-8 text-slate-900">
                    <h3 className="text-xl font-bold">Free Plan</h3>
                    <span className="text-2xl font-black">₹0</span>
                 </div>
                 
                 <div className="p-6 bg-slate-50 rounded-[32px] border border-slate-100 mb-8">
                    <div className="flex items-center justify-between mb-4">
                       <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Limited Access</span>
                       <div className="px-2 py-1 bg-blue-50 rounded text-[10px] font-black text-blue-600">Interviews: 3 Left</div>
                    </div>
                    <div className="w-full h-1.5 bg-slate-200 rounded-full overflow-hidden mb-6">
                       <div className="h-full bg-blue-500 w-1/3"></div>
                    </div>
                    
                    <div className="bg-primary-600 rounded-3xl p-6 text-white text-center">
                       <p className="text-[10px] font-black uppercase tracking-widest opacity-60 mb-1">Quick Boost</p>
                       <h4 className="font-bold text-lg mb-4">Unlock 1 More AI Interview</h4>
                       <button 
                         onClick={() => setShowAdModal(true)}
                         className="w-full py-3 bg-white text-primary-600 rounded-2xl font-bold text-sm flex items-center justify-center space-x-2"
                       >
                          <PlayCircle className="w-5 h-5"/>
                          <span>Watch Video Ad</span>
                       </button>
                    </div>
                 </div>
              </div>
           </div>

           <div className="bg-white rounded-[40px] border border-slate-200 shadow-sm overflow-hidden mb-20">
              <table className="w-full text-left">
                 <thead className="bg-slate-50 text-[10px] uppercase font-black tracking-widest text-slate-400">
                    <tr>
                       <th className="px-10 py-6">Feature</th>
                       <th className="px-10 py-6">Free Tier</th>
                       <th className="px-10 py-6 text-primary-600">Ninja Pro</th>
                    </tr>
                 </thead>
                 <tbody className="divide-y divide-slate-100 font-medium">
                    {plans[1].features.map((f, i) => (
                      <tr key={i}>
                         <td className="px-10 py-6 text-slate-600">{f.text}</td>
                         <td className="px-10 py-6 text-slate-400">{plans[0].features[i].value}</td>
                         <td className="px-10 py-6 text-primary-600 font-bold">{f.value}</td>
                      </tr>
                    ))}
                 </tbody>
              </table>
           </div>

           {/* Ads Section Demonstration */}
           <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
              <div className="md:col-span-3 h-64 bg-slate-100 rounded-[40px] border-2 border-dashed border-slate-200 flex items-center justify-center">
                 <p className="font-bold text-slate-300">Content Area</p>
              </div>
              <div className="bg-white p-4 rounded-[40px] border border-slate-100 shadow-sm relative group overflow-hidden">
                 <div className="aspect-square bg-slate-100 rounded-3xl mb-4 overflow-hidden relative">
                    <img src="https://images.unsplash.com/photo-1542744173-8e7e53415bb0?q=80" className="object-cover w-full h-full grayscale opacity-50 group-hover:grayscale-0 transition-all duration-700" alt="Ad" />
                    <div className="absolute top-3 left-3 px-2 py-0.5 bg-white/80 rounded text-[8px] font-black text-slate-500 uppercase">Sponsored</div>
                 </div>
                 <div className="h-4 bg-slate-100 rounded w-3/4 mb-2"></div>
                 <div className="h-4 bg-slate-100 rounded w-1/2 opacity-50 mb-4"></div>
                 <button className="w-full py-2 bg-slate-100 text-slate-400 rounded-xl text-[10px] font-black uppercase hover:bg-slate-200 transition-all">Visit Ads</button>
              </div>
           </div>
        </div>

        {/* Ad Video Modal */}
        <AnimatePresence>
          {showAdModal && (
            <motion.div 
               initial={{ opacity: 0 }}
               animate={{ opacity: 1 }}
               exit={{ opacity: 0 }}
               className="fixed inset-0 z-[100] bg-slate-900/95 backdrop-blur-md flex flex-col items-center justify-center p-8 text-center text-white"
            >
               <button 
                  onClick={() => setShowAdModal(false)}
                  className="absolute top-8 right-8 p-3 bg-white/10 rounded-full hover:bg-white/20 transition-all"
               >
                  <X className="w-6 h-6"/>
               </button>
               
               <div className="max-w-2xl w-full">
                  <div className="w-full aspect-video bg-black rounded-[32px] overflow-hidden relative shadow-2xl border border-white/10 group mb-8 flex items-center justify-center">
                     <Video className="w-20 h-20 text-white/20" />
                     <div className="absolute top-6 left-6 px-3 py-1 bg-white/20 backdrop-blur-md rounded-lg text-[10px] font-black uppercase tracking-widest">Sponsored Movie</div>
                  </div>
                  
                  <h3 className="text-2xl font-black mb-4">Watching Rewards Advertisement...</h3>
                  <p className="text-white/60 mb-12">Support PrepNinja by viewing this content. Credit will be granted in 15s.</p>
                  
                  <div className="w-full h-1.5 bg-white/10 rounded-full overflow-hidden">
                     <motion.div 
                       initial={{ width: 0 }}
                       animate={{ width: "100%" }}
                       transition={{ duration: 15, ease: "linear" }}
                       onAnimationComplete={() => { toast.success("+1 Credit Added!"); setShowAdModal(false); }}
                       className="h-full bg-primary-500"
                     />
                  </div>
               </div>
            </motion.div>
          )}
        </AnimatePresence>
      </main>
    </div>
  );
};

const BenefitItem = ({ text }: { text: string }) => (
  <li className="flex items-center space-x-3 text-slate-700 font-bold">
    <CheckCircle className="w-5 h-5 text-primary-600 shrink-0" />
    <span>{text}</span>
  </li>
);

export default Pricing;
