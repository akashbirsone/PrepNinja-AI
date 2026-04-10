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
    if (email === "akashbirsone@gmail.com" && password === "2324000721") {
      localStorage.setItem('isLoggedIn', 'true');
      localStorage.setItem('userRole', 'admin');
      localStorage.setItem('userName', 'Admin');
      toast.success("Welcome back, Admin!");
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
      {/* Left Decoration - Desktop Only */}
      <div className="hidden lg:flex w-1/2 bg-primary-600 relative overflow-hidden items-center justify-center p-20">
         <div className="absolute top-[-10%] left-[-10%] w-[50%] h-[50%] bg-indigo-400/30 rounded-full blur-[120px]"></div>
         <div className="absolute bottom-[-10%] right-[-10%] w-[60%] h-[60%] bg-blue-400/30 rounded-full blur-[120px]"></div>
         
         <div className="relative z-10 text-white">
            <motion.div 
               initial={{ opacity: 0, y: 20 }}
               animate={{ opacity: 1, y: 0 }}
               className="mb-12"
            >
               <div className="w-16 h-16 bg-white/20 backdrop-blur-md rounded-2xl flex items-center justify-center mb-8">
                  <Brain className="w-10 h-10" />
               </div>
               <h1 className="text-6xl font-black mb-6 leading-tight">Master the <br /> flow of your career.</h1>
               <p className="text-xl text-white/80 leading-relaxed font-medium">
                  Harness predictive AI to navigate the most complex placement landscapes with effortless precision.
               </p>
            </motion.div>

            <div className="flex space-x-12">
               <div>
                  <p className="text-4xl font-black">94%</p>
                  <p className="text-xs font-bold uppercase tracking-widest text-white/60 mt-1">Placement Success</p>
               </div>
               <div className="h-12 w-[1px] bg-white/20"></div>
               <div>
                  <p className="text-4xl font-black">12k+</p>
                  <p className="text-xs font-bold uppercase tracking-widest text-white/60 mt-1">Interviews Aced</p>
               </div>
            </div>
         </div>
         
         {/* Animated Grid Decoration */}
         <div className="absolute inset-0 opacity-10" style={{ backgroundImage: 'radial-gradient(#fff 1px, transparent 1px)', backgroundSize: '40px 40px' }}></div>
      </div>

      {/* Right Form */}
      <div className="w-full lg:w-1/2 flex flex-col items-center justify-center p-8 lg:p-24 bg-white">
         <div className="w-full max-w-md">
            <Link to="/" className="flex items-center space-x-2 lg:hidden mb-12">
               <div className="w-10 h-10 bg-primary-600 rounded-xl flex items-center justify-center">
                  <Brain className="text-white w-6 h-6" />
               </div>
               <span className="text-xl font-bold text-slate-900">PrepNinja <span className="text-primary-600">AI</span></span>
            </Link>

            <div className="mb-10 text-center lg:text-left">
               <h2 className="text-3xl lg:text-4xl font-black text-slate-900 mb-2">Welcome back</h2>
               <p className="text-slate-500 font-medium">Continue your path to precision placement.</p>
            </div>

            <div className="space-y-4 mb-10">
               <SocialAuthButton icon={<Globe className="w-5 h-5" />} label="Log in with Google" />
               <SocialAuthButton icon={<Code className="w-5 h-5" />} label="Log in with GitHub" />
            </div>

            <div className="relative mb-10">
               <div className="absolute inset-0 flex items-center"><div className="w-full border-t border-slate-100"></div></div>
               <div className="relative flex justify-center text-xs font-bold uppercase tracking-widest text-slate-400"><span className="bg-white px-4">or email</span></div>
            </div>

            <form onSubmit={handleLogin} className="space-y-6">
               <div className="space-y-2">
                  <label className="text-xs font-bold text-slate-400 uppercase tracking-widest px-2">Email Address</label>
                  <div className="relative group">
                     <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400 group-focus-within:text-primary-600 transition-colors" />
                     <input 
                        type="email" 
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="name@example.com" 
                        className="w-full bg-slate-50 border border-slate-100 rounded-2xl pl-12 pr-4 py-4 outline-none focus:ring-4 focus:ring-primary-600/10 focus:bg-white transition-all font-medium" 
                     />
                  </div>
               </div>

               <div className="space-y-2">
                  <div className="flex justify-between px-2">
                     <label className="text-xs font-bold text-slate-400 uppercase tracking-widest">Password</label>
                     <a href="#" className="text-xs font-bold text-primary-600 hover:underline">Forgot Password?</a>
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

               <div className="flex items-center space-x-3 px-2">
                  <input type="checkbox" id="remember" className="w-5 h-5 rounded-lg border-slate-200 text-primary-600 focus:ring-primary-600/20" />
                  <label htmlFor="remember" className="text-sm font-medium text-slate-600 cursor-pointer">Remember this device</label>
               </div>

               <button type="submit" className="w-full py-4 bg-primary-600 text-white rounded-2xl font-black text-lg hover:bg-primary-700 transition-all shadow-xl shadow-primary-600/20 active:scale-[0.98]">
                  Sign In to PrepNinja
               </button>
            </form>

            <p className="mt-12 text-center text-slate-500 font-medium">
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
  <button className="w-full flex items-center justify-center space-x-3 px-6 py-3.5 bg-white border border-slate-100 rounded-2xl font-bold text-slate-700 hover:bg-slate-50 hover:border-slate-200 transition-all shadow-sm">
    <div className="text-slate-900">{icon}</div>
    <span>{label}</span>
  </button>
);

export default Login;
