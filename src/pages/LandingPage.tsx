import { motion } from 'framer-motion';
import { 
  CheckCircle2, 
  ArrowRight, 
  FileText, 
  Calculator, 
  Mic2, 
  Star, 
  ChevronDown,
  BrainCircuit,
  Send,
  Briefcase,
  Camera,
  Code
} from 'lucide-react';
import { Link } from 'react-router-dom';
import Navbar from '../components/Navbar';
import { useState } from 'react';

const LandingPage = () => {
  return (
    <div className="min-h-screen bg-white">
      <Navbar />

      {/* Hero Section */}
      <section className="relative pt-32 pb-20 lg:pt-48 lg:pb-32 overflow-hidden">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full -z-10">
          <div className="absolute top-[10%] left-[10%] w-[30%] h-[30%] bg-primary-100/50 rounded-full blur-[120px] animate-pulse"></div>
          <div className="absolute bottom-[10%] right-[10%] w-[40%] h-[40%] bg-indigo-100/50 rounded-full blur-[120px] animate-pulse" style={{ animationDelay: '2s' }}></div>
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <span className="inline-block px-4 py-1.5 rounded-full bg-primary-50 text-primary-600 text-sm font-semibold mb-6 border border-primary-100">
              Transform Your Career with AI
            </span>
            <h1 className="text-5xl lg:text-7xl font-extrabold text-slate-900 tracking-tight mb-6 leading-tight">
              Get Placement Ready <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary-600 to-indigo-400">
                with AI Intelligence
              </span>
            </h1>
            <p className="max-w-2xl mx-auto text-lg lg:text-xl text-slate-600 mb-10 leading-relaxed">
              Master your placement preparation with our all-in-one platform. 
              Smart Resume Builder, Unlimited Aptitude Practice, and AI-Powered Mock Interviews.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link to="/register" className="w-full sm:w-auto px-8 py-4 bg-primary-600 text-white rounded-2xl font-bold text-lg hover:bg-primary-700 transition-all shadow-xl shadow-primary-600/25 flex items-center justify-center group">
                Start Free 
                <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </Link>
              <button className="w-full sm:w-auto px-8 py-4 bg-white text-slate-700 border border-slate-200 rounded-2xl font-bold text-lg hover:bg-slate-50 transition-all flex items-center justify-center">
                Try Mock Interview
              </button>
            </div>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="mt-20 relative mx-auto max-w-5xl"
          >
            <div className="aspect-[16/9] bg-gradient-to-br from-slate-100 to-slate-200 rounded-3xl border border-slate-200 shadow-2xl overflow-hidden relative group">
              <div className="absolute inset-0 bg-primary-600/5 opacity-0 group-hover:opacity-100 transition-opacity"></div>
              {/* Placeholder for Mock UI */}
              <div className="absolute inset-0 flex items-center justify-center">
                 <div className="p-8 text-slate-400 flex flex-col items-center">
                    <BrainCircuit className="w-20 h-20 mb-4 opacity-50" />
                    <span className="text-xl font-medium">PrepNinja AI Dashboard Preview</span>
                 </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-24 bg-slate-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl lg:text-4xl font-bold text-slate-900 mb-4">Everything you need to get hired</h2>
            <p className="text-slate-600 max-w-2xl mx-auto">Focus on what matters. We provide the tools to sharpen your skills and land your dream role.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <FeatureCard 
              icon={<FileText className="w-8 h-8 text-primary-600" />}
              title="Resume Builder"
              description="Create ATS-optimized resumes in minutes with our AI assistant. Instant scoring and optimization tips included."
            />
            <FeatureCard 
              icon={<Calculator className="w-8 h-8 text-indigo-600" />}
              title="Aptitude Practice"
              description="10,000+ topic-wise questions spanning Quantitative, Verbal, and Logical Reasoning with detailed explanations."
            />
            <FeatureCard 
              icon={<Mic2 className="w-8 h-8 text-blue-600" />}
              title="AI Mock Interview"
              description="Realistic interview simulations with real-time feedback on your communication and technical knowledge."
            />
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-20">
            <h2 className="text-3xl lg:text-4xl font-bold text-slate-900 mb-4">How it works?</h2>
            <p className="text-slate-600">Three simple steps to your dream placement.</p>
          </div>

          <div className="relative">
            <div className="hidden md:block absolute top-1/2 left-0 w-full h-0.5 bg-slate-100 -translate-y-1/2"></div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
              <Step 
                num="01"
                title="Build Resume"
                description="Upload your details and let our AI generate a professional resume."
              />
              <Step 
                num="02"
                title="Practice Aptitude"
                description="Solve random MCQs across different levels to sharp your brain."
              />
              <Step 
                num="03"
                title="Give AI Interview"
                description="Face the AI interviewer and get a detailed performance report."
              />
            </div>
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <section className="py-24 bg-slate-50 relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center mb-16">
            <h2 className="text-3xl lg:text-4xl font-bold text-slate-900 mb-4">Simple, Transparent Pricing</h2>
            <p className="text-slate-600">Choose the plan that fits your preparation stage.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            {/* Free Plan */}
            <div className="bg-white p-10 rounded-[32px] border border-slate-200 hover:border-slate-300 transition-all">
              <h3 className="text-xl font-bold text-slate-900 mb-2">Free Plan</h3>
              <p className="text-slate-500 mb-6">Basic preparation for everyone.</p>
              <div className="mb-8">
                <span className="text-4xl font-bold">₹0</span>
                <span className="text-slate-500">/ lifetime</span>
              </div>
              <ul className="space-y-4 mb-10">
                <PricingItem text="3 AI Mock Interviews / week" />
                <PricingItem text="Basic Resume Templates" />
                <PricingItem text="Standard Aptitude Practice" />
                <PricingItem text="Banner Ads Enabled" />
              </ul>
              <button className="w-full py-4 rounded-2xl border border-slate-200 font-bold hover:bg-slate-50 transition-all">
                Get Started
              </button>
            </div>

            {/* Pro Plan */}
            <div className="bg-primary-600 p-10 rounded-[32px] text-white shadow-2xl shadow-primary-600/30 transform hover:-translate-y-2 transition-all relative">
              <div className="absolute top-6 right-8 bg-white/20 px-3 py-1 rounded-full text-xs font-bold backdrop-blur-md">
                POPULAR
              </div>
              <h3 className="text-xl font-bold mb-2">Ninja Pro</h3>
              <p className="text-white/70 mb-6">Complete preparation accelerator.</p>
              <div className="mb-8">
                <span className="text-4xl font-bold">₹199</span>
                <span className="text-white/70">/ month</span>
              </div>
              <ul className="space-y-4 mb-10">
                <PricingItem text="Unlimited AI Interviews" isDark />
                <PricingItem text="Premium Resume Builder + ATS" isDark />
                <PricingItem text="Priority Question Bank" isDark />
                <PricingItem text="Ad-Free Experience" isDark />
                <PricingItem text="Placement Strategy Guide" isDark />
              </ul>
              <button className="w-full py-4 rounded-2xl bg-white text-primary-600 font-bold hover:bg-slate-50 transition-all">
                Go Pro Now
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold mb-4">Loved by Students</h2>
            <p className="text-slate-600">Join 50,000+ students preparing for their dream roles.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <Testimonial 
              name="Aditya Sharma"
              role="SDE at Google"
              content="The AI Mock Interview felt so real. It helped me overcome my nervousness and improve my body language before the final round."
            />
            <Testimonial 
              name="Priya Patel"
              role="Data Analyst at Amazon"
              content="PrepNinja's aptitude section is unmatched. The topic-wise organization helped me focus on my weak areas (Profit & Loss) efficiently."
            />
            <Testimonial 
              name="Rahul Verma"
              role="Graduated 2024"
              content="I got my first offer within 2 weeks of using PrepNinja. The resume builder actually got me through the ATS filters everywhere!"
            />
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-24 bg-slate-50">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-center mb-12">Frequently Asked Questions</h2>
          <div className="space-y-4">
            <FAQItem 
              question="What is PrepNinja AI?"
              answer="PrepNinja AI is an AI-powered placement preparation platform that helps you with resumes, aptitude, and mock interviews."
            />
            <FAQItem 
              question="How does the AI Mock Interview work?"
              answer="Our AI uses advanced NLP to ask relevant technical and HR questions. It listens to your voice via the Web Speech API and analyzes your answers to provide feedback."
            />
            <FAQItem 
              question="Is the payment secure?"
              answer="Yes, we use industry-standard encryption and payment gateways (like Razorpay) to ensure your transaction is 100% safe."
            />
            <FAQItem 
              question="Can I upgrade from free to pro later?"
              answer="Absolutely! You can upgrade anytime from your dashboard to unlock unlimited features and an ad-free experience."
            />
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-slate-900 pt-20 pb-10 text-slate-400">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-16">
            <div className="col-span-1 md:col-span-1">
              <Link to="/" className="flex items-center space-x-2 text-white mb-6">
                <BrainCircuit className="text-primary-400 w-8 h-8" />
                <span className="text-xl font-bold">PrepNinja AI</span>
              </Link>
              <p className="leading-relaxed">
                Empowering candidates to ace their dream placements with artificial intelligence and precision.
              </p>
              <div className="flex space-x-4 mt-8">
                <SocialIcon icon={<Send className="w-5 h-5" />} />
                <SocialIcon icon={<Briefcase className="w-5 h-5" />} />
                <SocialIcon icon={<Camera className="w-5 h-5" />} />
                <SocialIcon icon={<Code className="w-5 h-5" />} />
              </div>
            </div>
            
            <div>
              <h4 className="text-white font-bold mb-6 text-lg">Platform</h4>
              <ul className="space-y-4">
                <li><Link to="/aptitude" className="hover:text-primary-400 transition-colors">Aptitude Tests</Link></li>
                <li><Link to="/interview" className="hover:text-primary-400 transition-colors">Mock Interviews</Link></li>
                <li><Link to="/resume" className="hover:text-primary-400 transition-colors">Resume Builder</Link></li>
                <li><Link to="/pricing" className="hover:text-primary-400 transition-colors">Pricing Plans</Link></li>
              </ul>
            </div>

            <div>
              <h4 className="text-white font-bold mb-6 text-lg">Company</h4>
              <ul className="space-y-4">
                <li><a href="#" className="hover:text-primary-400 transition-colors">About Us</a></li>
                <li><a href="#" className="hover:text-primary-400 transition-colors">Career</a></li>
                <li><a href="#" className="hover:text-primary-400 transition-colors">Blog</a></li>
                <li><a href="#" className="hover:text-primary-400 transition-colors">Contact</a></li>
              </ul>
            </div>

            <div>
              <h4 className="text-white font-bold mb-6 text-lg">Newsletter</h4>
              <p className="mb-6">Stay updated with the latest in placement prep.</p>
              <div className="flex">
                <input type="text" placeholder="Email" className="bg-slate-800 border-none rounded-l-xl px-4 py-3 w-full focus:ring-1 focus:ring-primary-500" />
                <button className="bg-primary-600 text-white rounded-r-xl px-4 hover:bg-primary-700 transition-colors">Join</button>
              </div>
            </div>
          </div>
          <div className="border-t border-slate-800 pt-8 flex flex-col md:row justify-between items-center text-sm">
            <p>© 2024 PrepNinja AI. Empowering Next-Gen Talent.</p>
            <div className="flex space-x-6 mt-4 md:mt-0">
              <a href="#" className="hover:text-white transition-colors">Privacy Policy</a>
              <a href="#" className="hover:text-white transition-colors">Terms of Service</a>
              <a href="#" className="hover:text-white transition-colors">Cookies</a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

// UI Components for Landing Page
const FeatureCard = ({ icon, title, description }: any) => (
  <motion.div 
    whileHover={{ y: -10 }}
    className="bg-white p-10 rounded-[40px] border border-slate-100 shadow-xl shadow-slate-200/40 hover:shadow-2xl hover:shadow-primary-600/10 transition-all duration-300 group"
  >
    <div className="w-16 h-16 bg-slate-50 rounded-[22px] flex items-center justify-center mb-8 group-hover:bg-primary-50 transition-colors">
      {icon}
    </div>
    <h3 className="text-2xl font-bold text-slate-900 mb-4">{title}</h3>
    <p className="text-slate-600 leading-relaxed font-medium">{description}</p>
  </motion.div>
);

const Step = ({ num, title, description }: any) => (
  <div className="relative z-10 text-center">
    <div className="w-16 h-16 bg-white border-2 border-primary-600 rounded-full flex items-center justify-center mx-auto mb-8 shadow-xl">
      <span className="text-primary-600 font-black text-xl">{num}</span>
    </div>
    <h3 className="text-xl font-bold text-slate-900 mb-2">{title}</h3>
    <p className="text-slate-600">{description}</p>
  </div>
);

const PricingItem = ({ text, isDark = false }: any) => (
  <li className="flex items-center space-x-3 text-sm font-medium">
    <CheckCircle2 className={`w-5 h-5 flex-shrink-0 ${isDark ? 'text-white/60' : 'text-primary-600'}`} />
    <span>{text}</span>
  </li>
);

const Testimonial = ({ name, role, content }: any) => (
  <div className="bg-white p-8 rounded-3xl border border-slate-100 shadow-lg relative overflow-hidden">
    <div className="flex text-yellow-400 space-x-1 mb-4">
      {[...Array(5)].map((_, i) => <Star key={i} className="w-4 h-4 fill-current" />)}
    </div>
    <p className="text-slate-700 italic mb-6">"{content}"</p>
    <div className="flex items-center space-x-4">
      <div className="w-12 h-12 bg-slate-200 rounded-full overflow-hidden">
        <img src={`https://ui-avatars.com/api/?name=${name}&background=random`} alt={name} />
      </div>
      <div>
        <h4 className="font-bold text-slate-900">{name}</h4>
        <p className="text-sm text-slate-500">{role}</p>
      </div>
    </div>
  </div>
);

const FAQItem = ({ question, answer }: any) => {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <div className="bg-white rounded-2xl border border-slate-200 overflow-hidden transition-all">
      <button 
        onClick={() => setIsOpen(!isOpen)}
        className="w-full px-6 py-4 flex items-center justify-between text-left font-bold text-slate-900 hover:bg-slate-50"
      >
        <span>{question}</span>
        <ChevronDown className={`w-5 h-5 text-slate-400 transition-transform ${isOpen ? 'rotate-180' : ''}`} />
      </button>
      {isOpen && (
        <div className="px-6 py-4 text-slate-600 border-t border-slate-50 leading-relaxed">
          {answer}
        </div>
      )}
    </div>
  );
};

const SocialIcon = ({ icon }: any) => (
  <a href="#" className="w-10 h-10 bg-slate-800 rounded-full flex items-center justify-center hover:bg-primary-600 hover:text-white transition-all">
    {icon}
  </a>
);

export default LandingPage;
