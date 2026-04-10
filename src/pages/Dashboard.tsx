import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Sidebar from '../components/Sidebar';
import { 
  Bell, 
  Search, 
  Menu, 
  TrendingUp, 
  CheckCircle, 
  Clock, 
  ArrowRight,
  Zap,
  Award,
  BookOpen,
  Settings,
  FileText,
  Mic2,
  Activity,
  Flame,
  Brain
} from 'lucide-react';
import { motion } from 'framer-motion';

const Dashboard = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const navigate = useNavigate();
  const userName = localStorage.getItem('userName') || 'Ninja';

  useEffect(() => {
    const isLoggedIn = localStorage.getItem('isLoggedIn') === 'true';
    if (!isLoggedIn) {
      navigate('/login');
    }
  }, [navigate]);

  return (
    <div className="flex min-h-screen bg-slate-50">
      <Sidebar isMobile={false} />
      <Sidebar isMobile={true} isOpen={isSidebarOpen} onClose={() => setIsSidebarOpen(false)} />

      <main className="flex-1 min-w-0 overflow-auto pb-20 lg:pb-0">
        {/* Top Navbar */}
        <header className="bg-white border-b border-slate-200 h-16 lg:h-20 sticky top-0 z-40 flex items-center justify-between px-4 lg:px-8">
          <div className="flex items-center space-x-3 lg:space-x-4 flex-1">
            <button 
              onClick={() => setIsSidebarOpen(true)}
              className="lg:hidden p-2 hover:bg-slate-100 rounded-xl transition-colors shrink-0"
            >
              <Menu className="w-5 h-5 lg:w-6 lg:h-6 text-slate-600" />
            </button>
            <div className="relative max-w-md w-full hidden sm:block">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 lg:w-5 lg:h-5 text-slate-400" />
              <input 
                type="text" 
                placeholder="Search..." 
                className="w-full bg-slate-50 border-none rounded-2xl pl-10 lg:pl-12 pr-4 py-2 lg:py-2.5 text-sm outline-none focus:ring-2 focus:ring-primary-500/20 transition-all font-medium"
              />
            </div>
          </div>

          <div className="flex items-center space-x-2 lg:space-x-4">
            <button className="relative p-2 lg:p-2.5 hover:bg-slate-50 rounded-xl transition-colors text-slate-500">
               <Bell className="w-5 h-5 lg:w-6 lg:h-6" />
               <span className="absolute top-2 right-2 w-2 h-2 bg-red-500 rounded-full border-2 border-white"></span>
            </button>
            <div className="h-8 w-[1px] bg-slate-200 mx-1 lg:mx-2"></div>
            <div className="flex items-center space-x-2 lg:space-x-3 cursor-pointer group">
              <div className="text-right hidden md:block">
                <p className="text-sm font-bold text-slate-900 leading-none">{userName}</p>
                <p className="text-[10px] text-primary-600 font-bold mt-1 uppercase tracking-wider">Premium</p>
              </div>
              <div className="w-8 h-8 lg:w-10 lg:h-10 bg-slate-200 rounded-xl overflow-hidden border-2 border-white shadow-sm ring-2 ring-primary-50">
                <img src={`https://ui-avatars.com/api/?name=${userName}&background=4F46E5&color=fff`} alt="User" />
              </div>
            </div>
          </div>
        </header>

        {/* Dashboard Content */}
        <div className="p-4 lg:p-8 max-w-7xl mx-auto space-y-6 lg:space-y-8">
          {/* Welcome Section */}
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div>
              <h2 className="text-3xl font-extrabold text-slate-900 tracking-tight">Welcome back, {userName}! 👋</h2>
              <p className="text-slate-500 mt-1 font-medium">You're doing great! Your placement readiness increased by <span className="text-green-600 font-bold">12%</span> this week.</p>
            </div>
            <div className="flex space-x-3">
              <button className="px-5 py-2.5 bg-white border border-slate-200 text-slate-700 rounded-xl font-bold hover:bg-slate-50 transition-all flex items-center space-x-2">
                <Clock className="w-4 h-4" />
                <span>History</span>
              </button>
              <button className="px-5 py-2.5 bg-primary-600 text-white rounded-xl font-bold hover:bg-primary-700 transition-all shadow-lg shadow-primary-600/20 flex items-center space-x-2">
                <Zap className="w-4 h-4" />
                <span>Try Mock</span>
              </button>
            </div>
          </div>

          {/* Stats Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <StatCard 
              title="Aptitude Score" 
              value="840/1000" 
              trend="+24 pts" 
              icon={<TrendingUp className="text-green-500" />}
              color="bg-green-50"
            />
            <StatCard 
              title="Resume Score" 
              value="88%" 
              trend="Strong" 
              icon={<FileText className="text-blue-500" />}
              color="bg-blue-50"
            />
            <StatCard 
              title="Interview Performance" 
              value="7.4/10" 
              trend="+0.5" 
              icon={<Mic2 className="text-purple-500" />}
              color="bg-purple-50"
            />
            <StatCard 
              title="Ready For" 
              value="SDE-1" 
              trend="92% Match" 
              icon={<CheckCircle className="text-orange-500 w-5 h-5" />}
              color="bg-orange-50"
            />
          </div>

          <div className="grid grid-cols-1 xl:grid-cols-3 gap-6 lg:gap-8">
             {/* Main Activity Area */}
             <div className="xl:col-span-2 space-y-6 lg:space-y-8">
                {/* AI Insights Card */}
                <div className="bg-primary-600 rounded-[32px] lg:rounded-[40px] p-8 lg:p-12 text-white relative overflow-hidden group">
                   <div className="relative z-10">
                      <div className="flex items-center space-x-2 lg:space-x-3 mb-6 lg:mb-8">
                         <div className="px-3 py-1 lg:px-4 lg:py-1.5 bg-white/20 backdrop-blur-md rounded-full text-[10px] lg:text-xs font-black uppercase tracking-widest">AI Prediction</div>
                         <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
                      </div>
                      <h3 className="text-2xl lg:text-5xl font-black mb-4 lg:mb-6 leading-tight">You're 84% ready for <br className="hidden lg:block"/> Google's SDE-1 role.</h3>
                      <p className="text-base lg:text-xl text-white/80 font-medium max-w-xl mb-8 lg:mb-10 leading-relaxed">Our neural network analyzed your last 12 mocks. Improve your <span className="text-white underline decoration-white/40 underline-offset-4">time complexity analysis</span> to hit 90%+.</p>
                      <button className="bg-white text-primary-600 px-8 py-3 lg:px-10 lg:py-4 rounded-xl lg:rounded-2xl font-bold text-sm lg:text-lg shadow-2xl shadow-black/10 hover:scale-105 transition-transform">
                         Start Custom Practice
                      </button>
                   </div>
                   <Brain className="absolute -bottom-10 -right-10 w-48 h-48 lg:w-80 lg:h-80 text-white/10 group-hover:rotate-12 transition-transform duration-700 pointer-events-none" />
                </div>

                {/* Placement Readiness Chart */}
                <div className="bg-white rounded-[32px] p-8 border border-slate-200 shadow-sm relative overflow-hidden group">
                  <div className="flex items-center justify-between mb-8">
                    <div>
                      <h3 className="text-xl font-bold text-slate-900">Placement Readiness</h3>
                      <p className="text-sm text-slate-500">Progress tracked across all categories</p>
                    </div>
                    <select className="bg-slate-50 border-none rounded-xl px-4 py-2 text-sm font-bold outline-none ring-1 ring-slate-100">
                      <option>Last 30 Days</option>
                      <option>Overall</option>
                    </select>
                  </div>
                  
                  <div className="h-[300px] flex items-end justify-between px-4 pb-4">
                    {[40, 60, 35, 75, 50, 90, 65, 80, 45, 100].map((h, i) => (
                      <motion.div 
                        key={i}
                        initial={{ height: 0 }}
                        animate={{ height: `${h}%` }}
                        transition={{ delay: i * 0.05, duration: 0.5 }}
                        className="w-[8%] bg-primary-600/10 rounded-t-lg relative group/bar hover:bg-primary-600 transition-all"
                      >
                        <div className="absolute -top-10 left-1/2 -translate-x-1/2 bg-slate-900 text-white text-[10px] font-bold px-2 py-1 rounded opacity-0 group-hover/bar:opacity-100 transition-opacity">
                          {h}%
                        </div>
                      </motion.div>
                    ))}
                  </div>
                  <div className="flex justify-between mt-4 text-[10px] font-bold text-slate-400 uppercase tracking-widest px-1">
                    <span>Jan</span><span>Feb</span><span>Mar</span><span>Apr</span><span>May</span><span>Jun</span><span>Jul</span><span>Aug</span><span>Sep</span><span>Oct</span>
                  </div>
                </div>
             </div>

            {/* Circular Progress & Goals */}
            <div className="bg-white rounded-[32px] p-8 border border-slate-200 shadow-sm">
              <h3 className="text-xl font-bold text-slate-900 mb-8">Overall Rank</h3>
              <div className="relative w-48 h-48 mx-auto mb-8">
                <svg className="w-full h-full transform -rotate-90">
                  <circle cx="96" cy="96" r="88" fill="transparent" stroke="#f1f5f9" strokeWidth="12" />
                  <motion.circle 
                    cx="96" cy="96" r="88" fill="transparent" stroke="#4f46e5" strokeWidth="12" 
                    strokeDasharray={552}
                    initial={{ strokeDashoffset: 552 }}
                    animate={{ strokeDashoffset: 552 * (1 - 0.82) }}
                    transition={{ duration: 1.5, ease: "easeOut" }}
                    strokeLinecap="round"
                  />
                </svg>
                <div className="absolute inset-0 flex flex-col items-center justify-center">
                  <span className="text-4xl font-extrabold text-slate-900">82%</span>
                  <span className="text-[10px] uppercase font-black tracking-widest text-slate-400 mt-1">Top 2%</span>
                </div>
              </div>
              
              <div className="space-y-4">
                <div className="flex items-center justify-between p-4 bg-slate-50 rounded-2xl border border-slate-100">
                   <div className="flex items-center space-x-3">
                      <div className="w-10 h-10 bg-blue-100 rounded-xl flex items-center justify-center text-blue-600"><Award className="w-5 h-5"/></div>
                      <div>
                        <p className="text-xs font-bold text-slate-500 uppercase tracking-tight">Current Level</p>
                        <p className="font-bold text-slate-900">Ninja Master</p>
                      </div>
                   </div>
                   <ChevronRight className="w-4 h-4 text-slate-400"/>
                </div>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Recent Activity */}
            <div className="bg-white rounded-[32px] p-8 border border-slate-200 shadow-sm">
              <div className="flex items-center justify-between mb-8">
                <h3 className="text-xl font-bold text-slate-900">Recent Activity</h3>
                <button className="text-sm font-bold text-primary-600 hover:text-primary-700">View All</button>
              </div>
              <div className="space-y-6">
                <ActivityItem 
                   icon={<BookOpen className="text-blue-500" />}
                   title="Solved 15 Aptitude Questions"
                   subtitle="Topic: Time & Work • 92% Accuracy"
                   time="2 hours ago"
                />
                <ActivityItem 
                   icon={<Mic2 className="text-purple-500" />}
                   title="Mock Interview Completed"
                   subtitle="Role: Software Engineer • Score: 7/10"
                   time="Yesterday"
                />
                <ActivityItem 
                   icon={<FileText className="text-green-500" />}
                   title="Resume Optimized"
                   subtitle="ATS Score increased to 88"
                   time="2 days ago"
                />
              </div>
            </div>

            {/* Continue Learning */}
            <div className="bg-white rounded-[32px] p-8 border border-slate-200 shadow-sm">
              <h3 className="text-xl font-bold text-slate-900 mb-8">Continue Learning</h3>
              <div className="space-y-4">
                <LearningCard 
                  title="Quantitative Aptitude"
                  progress={65}
                  tasks="24/40 Completed"
                  color="bg-primary-600"
                />
                <LearningCard 
                  title="Communication Skills"
                  progress={40}
                  tasks="8/20 Completed"
                  color="bg-indigo-500"
                />
                <div className="pt-4">
                  <button className="w-full py-4 bg-slate-50 hover:bg-slate-100 rounded-2xl border border-dashed border-slate-300 transition-all font-bold text-slate-500 flex items-center justify-center space-x-2">
                    <span>Explore Question Bank</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

// UI Components
const StatCard = ({ title, value, trend, icon, color }: any) => (
  <div className="bg-white p-6 rounded-[28px] border border-slate-200 shadow-sm hover:shadow-md transition-all group">
    <div className="flex items-center justify-between mb-4">
      <div className={`w-12 h-12 ${color} rounded-2xl flex items-center justify-center transition-transform group-hover:scale-110 duration-300`}>
        {icon}
      </div>
      <span className="text-xs font-bold text-slate-400 group-hover:text-primary-600 transition-colors uppercase tracking-wider">{trend}</span>
    </div>
    <p className="text-slate-500 text-sm font-semibold mb-1">{title}</p>
    <h4 className="text-2xl font-black text-slate-900">{value}</h4>
  </div>
);

const ActivityItem = ({ icon, title, subtitle, time }: any) => (
  <div className="flex items-start space-x-4 group cursor-pointer">
    <div className="w-10 h-10 bg-slate-50 rounded-xl flex items-center justify-center mt-0.5 group-hover:bg-slate-100 transition-colors">
      {icon}
    </div>
    <div className="flex-1">
      <h4 className="font-bold text-slate-900 group-hover:text-primary-600 transition-colors">{title}</h4>
      <p className="text-xs text-slate-500 font-medium mb-1">{subtitle}</p>
      <span className="text-[10px] text-slate-400 font-bold uppercase tracking-widest">{time}</span>
    </div>
  </div>
);

const LearningCard = ({ title, progress, tasks, color }: any) => (
  <div className="p-5 rounded-2xl border border-slate-100 bg-slate-50/50 group hover:bg-white hover:shadow-lg hover:shadow-slate-200/50 transition-all">
    <div className="flex items-center justify-between mb-3">
      <h4 className="font-bold text-slate-900">{title}</h4>
      <span className="text-xs font-bold text-slate-500">{progress}%</span>
    </div>
    <div className="w-full h-2 bg-slate-100 rounded-full overflow-hidden mb-3">
      <motion.div 
        initial={{ width: 0 }}
        animate={{ width: `${progress}%` }}
        transition={{ duration: 1 }}
        className={`h-full ${color}`}
      ></motion.div>
    </div>
    <div className="flex items-center justify-between">
      <span className="text-[11px] font-bold text-slate-400 uppercase tracking-tight">{tasks}</span>
      <ArrowRight className="w-4 h-4 text-slate-300 group-hover:text-primary-600 transform group-hover:translate-x-1 transition-all" />
    </div>
  </div>
);

const ChevronRight = ({ className }: { className: string }) => (
  <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="9 5l7 7-7 7" />
  </svg>
);

export default Dashboard;
