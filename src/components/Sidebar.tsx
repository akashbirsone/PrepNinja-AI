import { Link, useLocation, useNavigate } from 'react-router-dom';
import { 
  LayoutDashboard, 
  FileText, 
  Calculator, 
  Mic2, 
  LogOut, 
  Settings,
  HelpCircle,
  Brain,
  Crown,
  ShieldCheck
} from 'lucide-react';
import { motion } from 'framer-motion';

const Sidebar = ({ isMobile, isOpen, onClose }: any) => {
  const location = useLocation();
  const navigate = useNavigate();
  const isAdminPath = location.pathname.startsWith('/admin');
  const userRole = localStorage.getItem('userRole');

  const handleLogout = () => {
    localStorage.clear();
    navigate('/login');
  };
  
  let menuItems = [];
  
  if (isAdminPath) {
    menuItems = [
      { id: 'admin', label: 'Console Home', icon: ShieldCheck, path: '/admin' },
      { id: 'users', label: 'Manage Users', icon: LayoutDashboard, path: '/admin?tab=users' },
      { id: 'questions', label: 'Question Bank', icon: Calculator, path: '/admin?tab=questions' },
      { id: 'resumes', label: 'Resume Templates', icon: FileText, path: '/admin?tab=resumes' },
    ];
  } else {
    menuItems = [
      { id: 'dashboard', label: 'Overview', icon: LayoutDashboard, path: '/dashboard' },
      { id: 'aptitude', label: 'Aptitude Tests', icon: Calculator, path: '/aptitude' },
      { id: 'interview', label: 'AI Interviews', icon: Mic2, path: '/interview' },
      { id: 'resume', label: 'Resume Builder', icon: FileText, path: '/resume' },
      { id: 'subscription', label: 'Subscription', icon: Crown, path: '/pricing' },
    ];
  }

  const bottomItems = [
    { label: 'Settings', icon: Settings, path: '/settings' },
    { label: 'Help Center', icon: HelpCircle, path: '/help' },
  ];



  const content = (
    <div className="flex flex-col h-full bg-white border-r border-slate-200">
      <div className="p-8">
        <Link to="/" className="flex items-center space-x-2">
          <div className="w-10 h-10 bg-primary-600 rounded-xl flex items-center justify-center">
             <Brain className="text-white w-6 h-6" />
          </div>
          <div>
            <h1 className="text-xl font-bold text-slate-900 leading-none">PrepNinja AI</h1>
            <p className="text-[10px] text-slate-500 font-semibold tracking-widest uppercase mt-1">AI-Powered Placement</p>
          </div>
        </Link>
      </div>

      <nav className="flex-1 px-4 space-y-2 mt-4">
        {menuItems.map((item) => {
           const isActive = location.pathname.startsWith(item.path);
           return (
             <Link
               key={item.id}
               to={item.path}
               onClick={onClose}
               className={`flex items-center space-x-3 px-4 py-3.5 rounded-2xl transition-all duration-200 group ${
                 isActive 
                   ? 'bg-primary-600 text-white shadow-lg shadow-primary-600/20' 
                   : 'text-slate-500 hover:bg-slate-50 hover:text-primary-600'
               }`}
             >
               <item.icon className="w-5 h-5" />
               <span className="font-semibold">{item.label}</span>
             </Link>
           );
        })}
      </nav>

      <div className="px-4 mb-6">
        <div className="bg-primary-600 rounded-2xl p-6 text-white relative overflow-hidden group">
          <div className="relative z-10">
            <h4 className="font-bold mb-1">Ready for the big leagues?</h4>
            <p className="text-xs text-white/80 mb-4 leading-relaxed">Unlock all AI-driven mocks & priority placement.</p>
            <button className="w-full bg-white text-primary-600 py-2 rounded-xl text-sm font-bold shadow-lg shadow-black/5 hover:bg-slate-50 transition-colors">
              Upgrade to Pro
            </button>
          </div>
          <Crown className="absolute -bottom-4 -right-4 w-20 h-20 text-white/10 group-hover:rotate-12 transition-transform duration-500" />
        </div>
      </div>

      <div className="px-4 pb-8 space-y-2">
        {bottomItems.map((item) => (
          <Link
            key={item.label}
            to={item.path}
            className="flex items-center space-x-3 px-4 py-3 text-slate-500 hover:text-slate-900 transition-colors font-medium"
          >
            <item.icon className="w-5 h-5" />
            <span>{item.label}</span>
          </Link>
        ))}
        <button 
          onClick={handleLogout}
          className="w-full flex items-center space-x-3 px-4 py-3 text-red-500 hover:bg-red-50 rounded-2xl transition-colors font-medium"
        >
          <LogOut className="w-5 h-5" />
          <span>Sign Out</span>
        </button>
      </div>
    </div>
  );

  if (isMobile) {
    return (
      <>
        {/* Sidebar Drawer */}
        <div className={`fixed inset-0 z-[100] transition-opacity duration-300 ${isOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'}`}>
          <div className="absolute inset-0 bg-black/50 backdrop-blur-sm" onClick={onClose} />
          <motion.div 
            initial={{ x: '-100%' }}
            animate={{ x: isOpen ? '0%' : '-100%' }}
            transition={{ type: 'spring', damping: 25, stiffness: 200 }}
            className="absolute inset-y-0 left-0 w-[280px] shadow-2xl"
          >
            {content}
          </motion.div>
        </div>

        {/* Bottom Nav for Mobile */}
        <div className="fixed bottom-0 left-0 right-0 h-16 bg-white border-t border-slate-100 z-[90] lg:hidden flex items-center justify-around px-2 shadow-2xl shadow-black/10">
           <MobileNavItem to="/dashboard" active={location.pathname === '/dashboard'} icon={<LayoutDashboard className="w-5 h-5"/>} label="Home" />
           <MobileNavItem to="/aptitude" active={location.pathname.startsWith('/aptitude')} icon={<Calculator className="w-5 h-5"/>} label="Aptitude" />
           <MobileNavItem to="/interview" active={location.pathname === '/interview'} icon={<Mic2 className="w-5 h-5"/>} label="Mocks" />
           <MobileNavItem to="/resume" active={location.pathname === '/resume'} icon={<FileText className="w-5 h-5"/>} label="Resume" />
           <button onClick={onClose} className="flex flex-col items-center justify-center p-2 text-slate-400">
              <div className="w-6 h-6 rounded-full bg-slate-100 flex items-center justify-center">
                 <div className="w-1 h-1 bg-slate-400 rounded-full mx-[1px]"></div>
                 <div className="w-1 h-1 bg-slate-400 rounded-full mx-[1px]"></div>
                 <div className="w-1 h-1 bg-slate-400 rounded-full mx-[1px]"></div>
              </div>
              <span className="text-[10px] font-bold uppercase mt-1">More</span>
           </button>
        </div>
      </>
    );
  }

  return (
    <div className="w-[280px] sticky top-0 h-screen hidden lg:block">
      {content}
    </div>
  );
};

const MobileNavItem = ({ to, active, icon, label }: any) => (
  <Link 
    to={to}
    className={`flex flex-col items-center justify-center p-2 transition-all ${
      active ? 'text-primary-600' : 'text-slate-400'
    }`}
  >
    <div className={`transition-transform duration-300 ${active ? 'scale-110 -translate-y-1' : ''}`}>
       {icon}
    </div>
    <span className={`text-[10px] font-bold uppercase mt-1 tracking-tight ${active ? 'opacity-100' : 'opacity-60'}`}>{label}</span>
    {active && (
      <motion.div 
        layoutId="bottom-nav-indicator"
        className="w-1 h-1 bg-primary-600 rounded-full mt-1"
      />
    )}
  </Link>
);

export default Sidebar;
