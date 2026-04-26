import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Brain, Eye, EyeOff, Mail, Lock, Globe, Code } from 'lucide-react';
import toast from 'react-hot-toast';

const Login = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !password) return toast.error("Please fill in all fields");
    
    // Admin credentials Check
    if (email === "akashbirsone80@gmail.com" && password === "2324000721") {
      localStorage.setItem('isLoggedIn', 'true');
      localStorage.setItem('userRole', 'admin');
      localStorage.setItem('userName', 'Akash Birsone');
      toast.success("Welcome back, Akash!");
      navigate('/admin');
    } else {
      // Regular user login simulation
      localStorage.setItem('isLoggedIn', 'true');
      localStorage.setItem('userRole', 'user');
      localStorage.setItem('userName', 'Ninja');
      toast.success("Welcome back, Ninja!");
      navigate('/dashboard');
    }
  };

  return (
    <div className="flex min-h-screen bg-white">
      {/* Left Decoration */}
      <div className="hidden lg:flex w-1/2 bg-slate-900 relative overflow-hidden items-center justify-center p-20">
         <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-primary-900/50 to-transparent"></div>
         <div className="absolute top-[-20%] left-[-10%] w-[70%] h-[70%] bg-primary-600/20 rounded-full blur-[120px]"></div>
         
         <div className="relative z-10 text-white max-w-lg">
            <span className="inline-block px-4 py-1.5 rounded-full bg-primary-600/20 text-primary-400 text-xs font-bold uppercase tracking-widest mb-8 backdrop-blur-md border border-primary-600/20">
               Welcome Back
            </span>
            <h1 className="text-7xl font-black mb-8 leading-tight tracking-tight">Resume your <br /><span className="text-primary-400">journey</span>.</h1>
            <p className="text-xl text-slate-400 leading-relaxed font-medium mb-12">
               Log in to access your personalized placement roadmap, AI mock interviews, and advanced performance analytics.
            </p>

            <div className="grid grid-cols-2 gap-8">
               <div className="p-8 bg-white/5 backdrop-blur-md rounded-3xl border border-white/10">
                  <p className="text-5xl font-black text-white mb-2">94%</p>
                  <p className="text-xs font-bold uppercase tracking-widest text-slate-500">Success Rate</p>
               </div>
               <div className="p-8 bg-white/5 backdrop-blur-md rounded-3xl border border-white/10">
                  <p className="text-5xl font-black text-white mb-2">12k+</p>
                  <p className="text-xs font-bold uppercase tracking-widest text-slate-500">Mock Interviews</p>
               </div>
            </div>
         </div>

         {/* Abstract Flow Shapes (Simulating the image) */}
         <div className="absolute inset-0 z-0 opacity-40">
            <svg className="w-full h-full" viewBox="0 0 100 100" preserveAspectRatio="none">
               <motion.path 
                  d="M0 100 Q 25 20 50 100 T 100 0" 
                  fill="none" 
                  stroke="#4f46e5" 
                  strokeWidth="0.5"
                  initial={{ pathLength: 0 }}
                  animate={{ pathLength: 1 }}
                  transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
               />
            </svg>
         </div>
      </div>

      {/* Right Form */}
      <div className="w-full lg:w-1/2 flex flex-col items-center justify-center p-6 lg:p-24 bg-white min-h-screen">
         <div className="w-full max-w-md pt-8 lg:pt-0">
            <div className="mb-8 text-center lg:text-left">
               <Link to="/" className="inline-flex items-center space-x-2 text-primary-600 font-black text-xl mb-6 lg:mb-8">
                  <Brain className="w-7 h-7 lg:w-8 lg:h-8" />
                  <span className="text-xl lg:text-2xl">PrepNinja AI</span>
               </Link>
               <h2 className="text-2xl lg:text-4xl font-black text-slate-900 mb-2 leading-tight">Welcome back</h2>
               <p className="text-sm lg:text-base text-slate-500 font-medium tracking-tight">Continue your path to precision placement.</p>
            </div>

            <div className="space-y-4 mb-10">
               <SocialAuthButton icon={<Globe className="w-5 h-5" />} label="Log in with Google" />
               <SocialAuthButton icon={<Code className="w-5 h-5" />} label="Log in with GitHub" />
            </div>

            <div className="relative my-10">
               <div className="absolute inset-0 flex items-center"><div className="w-full border-t border-slate-100"></div></div>
               <div className="relative flex justify-center text-[10px] font-black uppercase tracking-widest text-slate-400"><span className="bg-white px-4">or email</span></div>
            </div>

            <form onSubmit={handleLogin} className="space-y-5">
               <div className="space-y-2">
                  <label className="text-[11px] font-bold text-slate-400 uppercase tracking-widest px-2">Email Address</label>
                  <div className="relative group">
                     <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400 group-focus-within:text-primary-600 transition-colors" />
                     <input 
                        type="email" 
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="john@example.com" 
                        className="w-full bg-slate-50 border border-slate-100 rounded-2xl pl-12 pr-4 py-4 outline-none focus:ring-4 focus:ring-primary-600/10 focus:bg-white transition-all font-medium" 
                     />
                  </div>
               </div>

               <div className="space-y-2">
                  <div className="flex justify-between px-2">
                     <label className="text-[11px] font-bold text-slate-400 uppercase tracking-widest">Password</label>
                     <a href="#" className="text-[11px] font-bold text-primary-600 hover:underline">Forgot Password?</a>
                  </div>
                  <div className="relative group">
                     <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400 group-focus-within:text-primary-600 transition-colors" />
                     <input 
                        type={showPassword ? "text" : "password"} 
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        placeholder="••••••••" 
                        className="w-full bg-slate-50 border border-slate-100 rounded-2xl pl-12 pr-12 py-4 outline-none focus:ring-4 focus:ring-primary-600/10 focus:bg-white transition-all font-medium" 
                     />
                     <button 
                        type="button"
                        onClick={() => setShowPassword(!showPassword)}
                        className="absolute right-4 top-1/2 -translate-y-1/2 p-1 text-slate-400 hover:text-slate-600"
                     >
                        {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                     </button>
                  </div>
               </div>

               <div className="flex items-center space-x-3 px-2 pt-2">
                  <input type="checkbox" id="remember" className="w-5 h-5 rounded-lg border-slate-200 text-primary-600 focus:ring-primary-600/20" />
                  <label htmlFor="remember" className="text-sm font-medium text-slate-600 cursor-pointer">Remember this device</label>
               </div>

               <button type="submit" className="w-full py-5 bg-primary-600 text-white rounded-[24px] font-black text-xl hover:bg-primary-700 transition-all shadow-2xl shadow-primary-600/25 active:scale-[0.98] mt-4">
                  Sign In to PrepNinja
               </button>
            </form>

            <p className="mt-8 text-center text-slate-500 font-medium">
               Don't have an account? <Link to="/register" className="text-primary-600 font-bold hover:underline">Sign Up</Link>
            </p>

            <div className="mt-12 flex justify-center space-x-6 text-[11px] font-bold text-slate-400 uppercase tracking-widest">
               <a href="#" className="hover:text-slate-600 transition-colors">Privacy Policy</a>
               <span className="text-slate-200">•</span>
               <a href="#" className="hover:text-slate-600 transition-colors">Terms of Service</a>
               <span className="text-slate-200">•</span>
               <a href="#" className="hover:text-slate-600 transition-colors">Help Center</a>
            </div>
         </div>
      </div>
    </div>
  );
};

const SocialAuthButton = ({ icon, label }: any) => (
  <button className="w-full flex items-center justify-center space-x-3 px-6 py-4 bg-white border border-slate-100 rounded-2xl font-bold text-slate-700 hover:bg-slate-50 hover:border-slate-200 transition-all shadow-sm">
    <div className="text-slate-900">{icon}</div>
    <span>{label}</span>
  </button>
);

export default Login;
