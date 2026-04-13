import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Sidebar from '../components/Sidebar';
import { 
  Menu, 
  Search, 
  Plus, 
  Edit2, 
  Trash2, 
  Users, 
  CreditCard, 
  TrendingUp, 
  Tag, 
  Filter,
  ChevronLeft,
  ChevronRight,
  ShieldCheck,
  DollarSign,
  X,
  FileCode
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import toast from 'react-hot-toast';

const AdminDashboard = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [activeTab, setActiveTab] = useState<'analytics' | 'questions' | 'users' | 'resumes' | 'coupons'>('analytics');
  const [showAddModal, setShowAddModal] = useState(false);
  const [showResumeLayoutModal, setShowResumeLayoutModal] = useState(false);
  const [questions, setQuestions] = useState<any[]>([]);
  const [resumes, setResumes] = useState<any[]>([]);
  
  // New Layout Form State
  const [newLayout, setNewLayout] = useState({
    name: '',
    color: 'bg-primary-600',
  });
  
  // New Question Form State
  const [newQuestion, setNewQuestion] = useState({
    question: '',
    options: ['', '', '', ''],
    correct: 0,
    explanation: '',
    topic: 'percentage',
    difficulty: 'Easy'
  });

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const tab = params.get('tab');
    if (tab && ['analytics', 'questions', 'users', 'resumes', 'coupons'].includes(tab)) {
      setActiveTab(tab as any);
    }
  }, [window.location.search]);

  useEffect(() => {
    // Load questions from localStorage or use defaults
    const saved = localStorage.getItem('aptitude_questions');
    if (saved) {
      setQuestions(JSON.parse(saved));
    } else {
      const defaults = [
        { id: 1, topic: 'percentage', difficulty: 'Medium', question: "What is 25% of 30% of 400?", options: ["25", "30", "40", "50"], correct: 1, explanation: "30% of 400 = 120. 25% of 120 = 30." },
        { id: 2, topic: 'time-work', difficulty: 'Easy', question: "A can do a work in 10 days, B in 15 days. Together they take?", options: ["5 days", "6 days", "8 days", "4 days"], correct: 1, explanation: "Together = (10*15)/(10+15) = 150/25 = 6 days" }
      ];
      setQuestions(defaults);
      localStorage.setItem('aptitude_questions', JSON.stringify(defaults));
    }

    // Load resumes
    const savedResumes = localStorage.getItem('resume_layouts');
    if (savedResumes) {
      setResumes(JSON.parse(savedResumes));
    } else {
      const defaults = [
        { id: 1, name: 'Modern', color: 'bg-primary-600' },
        { id: 2, name: 'Classic', color: 'bg-slate-900' },
        { id: 3, name: 'Minimal', color: 'bg-indigo-500' }
      ];
      setResumes(defaults);
      localStorage.setItem('resume_layouts', JSON.stringify(defaults));
    }
  }, []);

  const handleCreateLayout = (e: React.FormEvent) => {
    e.preventDefault();
    const updated = [...resumes, { ...newLayout, id: Date.now() }];
    setResumes(updated);
    localStorage.setItem('resume_layouts', JSON.stringify(updated));
    setShowResumeLayoutModal(false);
    toast.success("Resume Layout created and published!");
    setNewLayout({ name: '', color: 'bg-primary-600' });
  };

  const deleteLayout = (id: number) => {
    const updated = resumes.filter(r => r.id !== id);
    setResumes(updated);
    localStorage.setItem('resume_layouts', JSON.stringify(updated));
    toast.success("Layout removed");
  };

  const handleAddQuestion = (e: React.FormEvent) => {
    e.preventDefault();
    const updated = [...questions, { ...newQuestion, id: Date.now() }];
    setQuestions(updated);
    localStorage.setItem('aptitude_questions', JSON.stringify(updated));
    setShowAddModal(false);
    toast.success("Question added successfully!");
    setNewQuestion({
      question: '',
      options: ['', '', '', ''],
      correct: 0,
      explanation: '',
      topic: 'percentage',
      difficulty: 'Easy'
    });
  };

  const deleteQuestion = (id: number) => {
    const updated = questions.filter(q => q.id !== id);
    setQuestions(updated);
    localStorage.setItem('aptitude_questions', JSON.stringify(updated));
    toast.success("Question deleted");
  };

  const navigate = useNavigate();
  const userName = localStorage.getItem('userName') || 'Admin';

  useEffect(() => {
    const isLoggedIn = localStorage.getItem('isLoggedIn') === 'true';
    const userRole = localStorage.getItem('userRole');
    
    if (!isLoggedIn || userRole !== 'admin') {
      navigate('/login');
    }
  }, [navigate]);

  return (
    <div className="flex h-screen bg-slate-50 overflow-hidden">
      <Sidebar isMobile={false} />
      <Sidebar isMobile={true} isOpen={isSidebarOpen} onClose={() => setIsSidebarOpen(false)} />

      <main className="flex-1 min-w-0 flex flex-col bg-white lg:bg-slate-50 pb-20 lg:pb-0">
        {/* Header */}
        <header className="bg-white border-b border-slate-200 h-16 lg:h-20 flex items-center justify-between px-4 lg:px-8 shrink-0 relative z-10">
          <div className="flex items-center space-x-3 lg:space-x-4 flex-1">
             <button onClick={() => setIsSidebarOpen(true)} className="lg:hidden p-2 hover:bg-slate-100 rounded-xl">
               <Menu className="w-5 h-5 text-slate-600" />
             </button>
             <div className="flex items-center space-x-2 lg:space-x-3">
                <div className="w-8 h-8 lg:w-10 lg:h-10 bg-primary-600 rounded-lg lg:rounded-xl flex items-center justify-center">
                   <ShieldCheck className="w-5 h-5 lg:w-6 lg:h-6 text-white" />
                </div>
                <h2 className="text-lg lg:text-xl font-black text-slate-900 leading-tight">Admin Console</h2>
                <span className="hidden sm:inline-block px-2 py-0.5 bg-primary-100 text-primary-700 text-[10px] font-black uppercase rounded-md ml-2">Secure</span>
             </div>
          </div>

          <div className="flex items-center space-x-4">
             <div className="relative max-w-xs w-full hidden md:block">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                <input 
                  type="text" 
                  placeholder="Global search..." 
                  className="w-full bg-slate-100 border-none rounded-2xl pl-10 pr-4 py-2 text-sm font-medium outline-none focus:ring-2 focus:ring-primary-500/20"
                />
             </div>
             <div className="w-8 h-8 lg:w-10 lg:h-10 bg-slate-200 rounded-full overflow-hidden border-2 border-white ring-2 ring-primary-50">
                <img src={`https://ui-avatars.com/api/?name=${userName}&background=4F46E5&color=fff`} alt="Admin" />
             </div>
          </div>
        </header>

        {/* Console Nav */}
        <div className="px-4 lg:px-8 mt-4 lg:mt-6 shrink-0 overflow-x-auto no-scrollbar">
           <div className="flex space-x-6 lg:space-x-8 border-b border-slate-200 min-w-max">
              <NavButton active={activeTab === 'analytics'} onClick={() => setActiveTab('analytics')} icon={<TrendingUp className="w-4 h-4"/>} label="Analytics" />
              <NavButton active={activeTab === 'questions'} onClick={() => setActiveTab('questions')} icon={<Edit2 className="w-4 h-4"/>} label="Questions" />
              <NavButton active={activeTab === 'resumes'} onClick={() => setActiveTab('resumes')} icon={<FileCode className="w-4 h-4"/>} label="Resumes" />
              <NavButton active={activeTab === 'users'} onClick={() => setActiveTab('users')} icon={<Users className="w-4 h-4"/>} label="Users" />
              <NavButton active={activeTab === 'coupons'} onClick={() => setActiveTab('coupons')} icon={<Tag className="w-4 h-4"/>} label="Growth" />
           </div>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-auto p-4 lg:p-8 pt-4 lg:pt-6">
          {activeTab === 'analytics' && (
            <div className="space-y-8 animate-in fade-in slide-in-from-bottom-2 duration-500">
               <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                  <BigStatCard label="Total Registered Users" value="42,892" trend="+12.5%" icon={<Users className="text-blue-600"/>} color="bg-blue-100" />
                  <BigStatCard label="Active Today" value="8,104" trend="+4.2%" icon={<TrendingUp className="text-green-600"/>} color="bg-green-100" />
                  <BigStatCard label="Monthly Revenue" value="$128.4k" trend="+18.2%" icon={<DollarSign className="text-purple-600"/>} color="bg-primary-600 text-white" isPrimary />
               </div>

               <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                  <div className="bg-white p-8 rounded-[40px] border border-slate-200 shadow-sm">
                     <h3 className="text-xl font-bold mb-6">Recent Sales</h3>
                     <div className="space-y-6">
                        {[1, 2, 3, 4].map(i => (
                          <div key={i} className="flex items-center justify-between p-4 hover:bg-slate-50 rounded-2xl transition-colors">
                             <div className="flex items-center space-x-4">
                                <div className="w-10 h-10 bg-slate-100 rounded-xl overflow-hidden">
                                   <img src={`https://ui-avatars.com/api/?background=random&name=User${i}`} alt="U" />
                                </div>
                                <div>
                                   <p className="font-bold text-slate-900">User_{i} purchased Pro</p>
                                   <p className="text-xs text-slate-500 font-medium">2 mins ago via UPI</p>
                                </div>
                             </div>
                             <span className="font-black text-slate-900">₹199</span>
                          </div>
                        ))}
                     </div>
                  </div>
                  
                  <div className="bg-white p-8 rounded-[40px] border border-slate-200 shadow-sm">
                     <h3 className="text-xl font-bold mb-6">Popular Topics</h3>
                     <div className="space-y-6">
                        <SimpleProgress label="Quant: Percentage" value={85} />
                        <SimpleProgress label="LR: Seating Arrangement" value={72} />
                        <SimpleProgress label="Quant: Profit & Loss" value={64} />
                        <SimpleProgress label="Verbal: Grammar" value={51} />
                     </div>
                  </div>
               </div>
            </div>
          )}

          {activeTab === 'questions' && (
            <div className="bg-white rounded-[40px] border border-slate-200 shadow-sm overflow-hidden animate-in fade-in slide-in-from-bottom-2 duration-500">
               <div className="p-8 border-b border-slate-200 flex flex-col md:flex-row items-center justify-between gap-4">
                  <div>
                    <h3 className="text-xl font-bold text-slate-900">Question Management</h3>
                    <p className="text-sm text-slate-500 font-medium">Add or edit questions across all modules</p>
                  </div>
                  <div className="flex items-center space-x-3 w-full md:w-auto">
                     <button className="flex-1 md:flex-none flex items-center justify-center space-x-2 px-4 py-2 bg-slate-100 rounded-xl text-slate-700 font-bold hover:bg-slate-200">
                        <Filter className="w-4 h-4"/>
                        <span>Filter</span>
                     </button>
                     <button 
                        onClick={() => setShowAddModal(true)}
                        className="flex-1 md:flex-none flex items-center justify-center space-x-2 px-6 py-2 bg-primary-600 text-white rounded-xl font-bold hover:bg-primary-700 shadow-lg shadow-primary-600/20"
                      >
                        <Plus className="w-4 h-4"/>
                        <span>Add Question</span>
                     </button>
                  </div>
               </div>
               
               <div className="overflow-x-auto">
                 <table className="w-full text-left">
                    <thead className="bg-slate-50 text-[10px] font-black uppercase tracking-widest text-slate-400">
                       <tr>
                          <th className="px-8 py-4">ID</th>
                          <th className="px-8 py-4">Topic</th>
                          <th className="px-8 py-4">Difficulty</th>
                          <th className="px-8 py-4">Accuracy</th>
                          <th className="px-8 py-4">Actions</th>
                       </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100">
                        {questions.map((q, i) => (
                          <tr key={q.id} className="hover:bg-slate-50 transition-colors group">
                             <td className="px-8 py-4 font-black text-slate-900 text-sm">#{q.id.toString().slice(-4)}</td>
                             <td className="px-8 py-4">
                                <span className={`px-3 py-1 bg-blue-50 text-blue-600 rounded-full text-[10px] font-bold uppercase`}>
                                   {q.topic}
                                </span>
                             </td>
                             <td className="px-8 py-4">
                                <div className="flex items-center space-x-2">
                                   <div className={`w-2 h-2 rounded-full ${q.difficulty === 'Easy' ? 'bg-green-500' : q.difficulty === 'Medium' ? 'bg-orange-500' : 'bg-red-500'}`}></div>
                                   <span className="text-sm font-bold text-slate-700">{q.difficulty}</span>
                                </div>
                             </td>
                             <td className="px-8 py-4 font-bold text-slate-600">84%</td>
                             <td className="px-8 py-4">
                                <div className="flex items-center space-x-4 opacity-0 group-hover:opacity-100 transition-opacity">
                                   <button className="p-2 hover:bg-white rounded-lg shadow-sm text-slate-500 hover:text-primary-600"><Edit2 className="w-4 h-4"/></button>
                                   <button 
                                      onClick={() => deleteQuestion(q.id)}
                                      className="p-2 hover:bg-white rounded-lg shadow-sm text-slate-500 hover:text-red-600"
                                    >
                                      <Trash2 className="w-4 h-4"/>
                                    </button>
                                </div>
                             </td>
                          </tr>
                        ))}
                     </tbody>
                 </table>
               </div>
               
               <div className="p-8 border-t border-slate-100 flex items-center justify-between">
                  <p className="text-sm font-bold text-slate-400 uppercase tracking-widest leading-none">Showing 1-10 of 1240 questions</p>
                  <div className="flex space-x-2">
                     <button className="p-2 border border-slate-200 rounded-xl hover:bg-slate-50 transition-colors"><ChevronLeft className="w-5 h-5"/></button>
                     <button className="p-2 border border-slate-200 rounded-xl hover:bg-slate-50 transition-colors bg-primary-600 text-white font-bold px-4">1</button>
                     <button className="p-2 border border-slate-200 rounded-xl hover:bg-slate-50 transition-colors font-bold px-4">2</button>
                     <button className="p-2 border border-slate-200 rounded-xl hover:bg-slate-50 transition-colors"><ChevronRight className="w-5 h-5"/></button>
                  </div>
               </div>
            </div>
          )}

          {activeTab === 'resumes' && (
             <div className="bg-white rounded-[40px] border border-slate-200 shadow-sm p-8 animate-in fade-in slide-in-from-bottom-2 duration-500">
                <div className="flex justify-between items-center mb-10">
                   <div>
                      <h3 className="text-2xl font-black text-slate-900">Resume Templates</h3>
                      <p className="text-slate-500 font-medium">Manage pre-built layouts for users</p>
                   </div>
                   <button 
                    onClick={() => setShowResumeLayoutModal(true)}
                    className="bg-primary-600 text-white px-6 py-3 rounded-2xl font-bold flex items-center space-x-2 hover:bg-primary-700 transition-all shadow-lg shadow-primary-600/20"
                   >
                      <Plus className="w-5 h-5"/>
                      <span>Create Layout</span>
                   </button>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                   {resumes.map(r => (
                     <div key={r.id} className="group relative rounded-[32px] overflow-hidden border border-slate-100 shadow-sm hover:shadow-xl transition-all h-[400px]">
                        <div className={`absolute inset-0 ${r.color} opacity-10 flex items-center justify-center`}>
                           <FileCode className={`w-12 h-12 text-slate-300 group-hover:scale-110 transition-transform`}/>
                        </div>
                        <div className="absolute inset-0 bg-gradient-to-t from-slate-900/90 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex flex-col justify-end p-8">
                           <h4 className="text-white font-bold text-lg mb-2">{r.name} Template</h4>
                           <div className="flex space-x-3">
                              <button className="flex-1 py-2 bg-white text-slate-900 rounded-xl font-bold text-sm">Edit Design</button>
                              <button 
                                onClick={() => deleteLayout(r.id)}
                                className="p-2 bg-white/20 backdrop-blur-md rounded-xl text-white hover:bg-red-500 transition-colors"
                              >
                                <Trash2 className="w-4 h-4"/>
                              </button>
                           </div>
                        </div>
                     </div>
                   ))}
                </div>
             </div>
           )}

          {activeTab === 'users' && (
            <div className="bg-white rounded-[40px] border border-slate-200 shadow-sm overflow-hidden animate-in fade-in slide-in-from-bottom-2 duration-500">
               <div className="p-8 border-b border-slate-200 flex items-center justify-between">
                  <h3 className="text-xl font-bold">Manage Students</h3>
                  <div className="flex items-center space-x-4">
                     <div className="relative">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                        <input type="text" placeholder="Find user..." className="bg-slate-100 border-none rounded-xl pl-10 pr-4 py-2 text-sm font-medium outline-none focus:ring-2 focus:ring-primary-500/20" />
                     </div>
                  </div>
               </div>
               <table className="w-full text-left">
                  <thead className="bg-slate-50 text-[10px] font-black uppercase tracking-widest text-slate-400">
                     <tr>
                        <th className="px-8 py-4">Candidate</th>
                        <th className="px-8 py-4">Status</th>
                        <th className="px-8 py-4">Subscription</th>
                        <th className="px-8 py-4">Action</th>
                     </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100">
                     {[1, 2, 3, 4, 5].map(i => (
                       <tr key={i} className="hover:bg-slate-50 transition-colors">
                          <td className="px-8 py-4">
                             <div className="flex items-center space-x-3">
                                <div className="w-10 h-10 bg-slate-100 rounded-xl overflow-hidden shadow-sm">
                                   <img src={`https://ui-avatars.com/api/?background=random&name=Candidate${i}`} alt="C" />
                                </div>
                                <div>
                                   <p className="font-bold text-slate-900">Candidate Name {i}</p>
                                   <p className="text-xs text-slate-500">c.name{i}@email.com</p>
                                </div>
                             </div>
                          </td>
                          <td className="px-8 py-4">
                             <span className={`px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-widest ${i % 3 === 0 ? 'bg-red-50 text-red-600' : 'bg-green-50 text-green-600'}`}>
                                {i % 3 === 0 ? 'Incomplete' : 'Active'}
                             </span>
                          </td>
                          <td className="px-8 py-4">
                             <div className="flex items-center space-x-2">
                                <CreditCard className="w-4 h-4 text-slate-400" />
                                <span className="text-sm font-bold text-slate-700">{i % 2 === 0 ? 'Ninja Pro' : 'Free Tier'}</span>
                             </div>
                          </td>
                          <td className="px-8 py-4">
                             <button className="text-primary-600 font-bold text-sm hover:underline">View Profile</button>
                          </td>
                       </tr>
                     ))}
                  </tbody>
               </table>
            </div>
          )}

          {activeTab === 'coupons' && (
             <div className="max-w-4xl mx-auto space-y-8 animate-in fade-in slide-in-from-bottom-2 duration-500">
                <div className="bg-white p-10 rounded-[40px] border border-slate-200 shadow-sm relative overflow-hidden">
                   <div className="relative z-10">
                      <h3 className="text-2xl font-black text-slate-900 mb-2">Create Growth Coupon</h3>
                      <p className="text-slate-500 mb-10 font-medium">Generate viral discount codes for colleges and campus ambassadors.</p>
                      
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                         <div className="space-y-6 text-slate-700">
                            <div>
                               <label className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-2 block">Coupon Code</label>
                               <input type="text" defaultValue="COLLEGE89" className="w-full bg-slate-50 border border-slate-100 rounded-2xl px-5 py-3 font-black text-xl tracking-widest placeholder:text-slate-200 outline-none focus:ring-2 focus:ring-primary-500/20" />
                            </div>
                            <div>
                               <label className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-2 block">Discount Type</label>
                               <div className="grid grid-cols-2 gap-4">
                                  <button className="p-4 rounded-2xl border-2 border-primary-600 bg-primary-50 text-primary-600 font-bold">Percentage</button>
                                  <button className="p-4 rounded-2xl border-2 border-slate-100 bg-white text-slate-500 font-bold">Fixed Amount</button>
                               </div>
                            </div>
                         </div>
                         <div className="space-y-6">
                            <div>
                               <label className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-2 block">Discount Value</label>
                               <div className="relative">
                                  <span className="absolute right-6 top-1/2 -translate-y-1/2 font-black text-2xl text-slate-300">%</span>
                                  <input type="number" defaultValue="30" className="w-full bg-slate-50 border border-slate-100 rounded-2xl px-5 py-3 font-black text-2xl outline-none focus:ring-2 focus:ring-primary-500/20" />
                               </div>
                            </div>
                            <div>
                               <label className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-2 block">Usage Limit</label>
                               <input type="number" defaultValue="500" className="w-full bg-slate-50 border border-slate-100 rounded-2xl px-5 py-3 font-bold text-lg outline-none focus:ring-2 focus:ring-primary-500/20" />
                            </div>
                         </div>
                      </div>
                      
                      <button className="mt-12 w-full py-5 bg-primary-600 text-white rounded-3xl font-black text-xl hover:bg-primary-700 shadow-2xl shadow-primary-600/30 transition-all active:scale-[0.98]">
                         Generate & Release Coupon
                      </button>
                   </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                   <CouponCard code="STUDENT50" discount="50%" used={245} total={500} status="Active" />
                   <CouponCard code="RECRUIT10" discount="₹100" used={12} total={50} status="Expired" />
                </div>
             </div>
          )}
        </div>
      </main>

      {/* Add Question Modal */}
      <AnimatePresence>
        {showAddModal && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
            <motion.div 
              initial={{ opacity: 0 }} 
              animate={{ opacity: 1 }} 
              exit={{ opacity: 0 }}
              onClick={() => setShowAddModal(false)}
              className="absolute inset-0 bg-slate-900/60 backdrop-blur-sm" 
            />
            <motion.div 
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              className="relative bg-white w-full max-w-2xl rounded-[40px] shadow-2xl overflow-hidden overflow-y-auto max-h-[90vh]"
            >
              <div className="p-8 border-b border-slate-100 flex justify-between items-center bg-slate-50">
                 <h3 className="text-2xl font-black text-slate-900">Add New Question</h3>
                 <button onClick={() => setShowAddModal(false)} className="p-2 hover:bg-white rounded-xl transition-colors text-slate-400 hover:text-slate-600">
                    <X className="w-6 h-6" />
                 </button>
              </div>
              
              <form onSubmit={handleAddQuestion} className="p-8 space-y-6">
                 <div className="grid grid-cols-2 gap-6">
                    <div>
                       <label className="text-xs font-black text-slate-400 uppercase tracking-widest mb-2 block">Topic</label>
                       <select 
                         value={newQuestion.topic}
                         onChange={(e) => setNewQuestion({...newQuestion, topic: e.target.value})}
                         className="w-full bg-slate-50 border border-slate-100 rounded-2xl px-5 py-3 font-bold outline-none focus:ring-4 focus:ring-primary-500/10"
                       >
                          <option value="percentage">Percentage</option>
                          <option value="time-work">Time & Work</option>
                          <option value="profit-loss">Profit & Loss</option>
                          <option value="data-interpretation">Data Interpretation</option>
                       </select>
                    </div>
                    <div>
                       <label className="text-xs font-black text-slate-400 uppercase tracking-widest mb-2 block">Difficulty</label>
                       <select 
                         value={newQuestion.difficulty}
                         onChange={(e) => setNewQuestion({...newQuestion, difficulty: e.target.value})}
                         className="w-full bg-slate-50 border border-slate-100 rounded-2xl px-5 py-3 font-bold outline-none focus:ring-4 focus:ring-primary-500/10"
                       >
                          <option value="Easy">Easy</option>
                          <option value="Medium">Medium</option>
                          <option value="Hard">Hard</option>
                       </select>
                    </div>
                 </div>

                 <div>
                    <label className="text-xs font-black text-slate-400 uppercase tracking-widest mb-2 block">Question Text</label>
                    <textarea 
                       required
                       value={newQuestion.question}
                       onChange={(e) => setNewQuestion({...newQuestion, question: e.target.value})}
                       rows={3}
                       placeholder="Enter the question here..."
                       className="w-full bg-slate-50 border border-slate-100 rounded-2xl px-5 py-4 font-medium outline-none focus:ring-4 focus:ring-primary-500/10"
                    />
                 </div>

                 <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {newQuestion.options.map((opt, idx) => (
                      <div key={idx}>
                         <label className="text-xs font-black text-slate-400 uppercase tracking-widest mb-2 block">Option {String.fromCharCode(65 + idx)}</label>
                         <input 
                           required
                           type="text" 
                           value={opt}
                           onChange={(e) => {
                             const newOpts = [...newQuestion.options];
                             newOpts[idx] = e.target.value;
                             setNewQuestion({...newQuestion, options: newOpts});
                           }}
                           placeholder={`Option ${idx + 1}`}
                           className="w-full bg-slate-50 border border-slate-100 rounded-2xl px-5 py-3 font-bold outline-none focus:ring-4 focus:ring-primary-500/10"
                         />
                      </div>
                    ))}
                 </div>

                 <div className="grid grid-cols-2 gap-6">
                    <div>
                       <label className="text-xs font-black text-slate-400 uppercase tracking-widest mb-2 block">Correct Option</label>
                       <select 
                         value={newQuestion.correct}
                         onChange={(e) => setNewQuestion({...newQuestion, correct: parseInt(e.target.value)})}
                         className="w-full bg-slate-50 border border-slate-100 rounded-2xl px-5 py-3 font-bold outline-none focus:ring-4 focus:ring-primary-500/10"
                       >
                          <option value={0}>Option A</option>
                          <option value={1}>Option B</option>
                          <option value={2}>Option C</option>
                          <option value={3}>Option D</option>
                       </select>
                    </div>
                 </div>

                 <div>
                    <label className="text-xs font-black text-slate-400 uppercase tracking-widest mb-2 block">Explanation</label>
                    <textarea 
                       required
                       value={newQuestion.explanation}
                       onChange={(e) => setNewQuestion({...newQuestion, explanation: e.target.value})}
                       rows={2}
                       placeholder="Explain the solution..."
                       className="w-full bg-slate-50 border border-slate-100 rounded-2xl px-5 py-4 font-medium outline-none focus:ring-4 focus:ring-primary-500/10"
                    />
                 </div>

                 <button type="submit" className="w-full py-4 bg-primary-600 text-white rounded-2xl font-black text-xl hover:bg-primary-700 shadow-2xl shadow-primary-600/30 transition-all active:scale-[0.98]">
                    Add to Question Bank
                 </button>
              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* Add Resume Layout Modal */}
      <AnimatePresence>
        {showResumeLayoutModal && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
            <motion.div 
              initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
              onClick={() => setShowResumeLayoutModal(false)}
              className="absolute inset-0 bg-slate-900/60 backdrop-blur-sm" 
            />
            <motion.div 
              initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.9 }}
              className="relative bg-white w-full max-w-md rounded-[40px] shadow-2xl overflow-hidden p-10"
            >
               <h3 className="text-2xl font-black text-slate-900 mb-8 tracking-tight">Create New Layout</h3>
               <form onSubmit={handleCreateLayout} className="space-y-6">
                  <div>
                    <label className="text-[10px] font-black text-slate-400 mb-2 block uppercase tracking-widest">Template Name</label>
                    <input 
                      required
                      type="text" 
                      value={newLayout.name}
                      onChange={(e) => setNewLayout({...newLayout, name: e.target.value})}
                      placeholder="e.g. Creative Modern" 
                      className="w-full bg-slate-50 border border-slate-100 rounded-2xl px-5 py-4 font-bold outline-none focus:ring-4 focus:ring-primary-500/10" 
                    />
                  </div>
                  <div>
                    <label className="text-[10px] font-black text-slate-400 mb-4 block uppercase tracking-widest">Branding Color</label>
                    <div className="grid grid-cols-4 gap-4">
                       {['bg-primary-600', 'bg-slate-900', 'bg-indigo-500', 'bg-rose-500', 'bg-emerald-500', 'bg-orange-500', 'bg-purple-600', 'bg-blue-600'].map(c => (
                         <button 
                           key={c}
                           type="button"
                           onClick={() => setNewLayout({...newLayout, color: c})}
                           className={`h-10 rounded-xl transition-all ${c} ${newLayout.color === c ? 'ring-4 ring-offset-2 ring-slate-400' : 'opacity-80 hover:opacity-100'}`}
                         />
                       ))}
                    </div>
                  </div>
                  <button type="submit" className="w-full py-5 bg-primary-600 text-white rounded-[32px] font-black text-lg hover:bg-primary-700 shadow-2xl shadow-primary-600/30 transition-all">
                     Publish Layout to Sidebar
                  </button>
               </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
};

// UI Components
const NavButton = ({ active, onClick, icon, label }: any) => (
  <button 
    onClick={onClick}
    className={`flex items-center space-x-2 pb-4 transition-all relative ${
      active ? 'text-primary-600 font-bold' : 'text-slate-400 font-medium hover:text-slate-600'
    }`}
  >
    {icon}
    <span>{label}</span>
    {active && (
      <motion.div 
        layoutId="tab-underline"
        className="absolute bottom-0 left-0 right-0 h-1 bg-primary-600 rounded-full"
      />
    )}
  </button>
);

const BigStatCard = ({ label, value, trend, icon, color, isPrimary = false }: any) => (
  <div className={`${isPrimary ? 'bg-primary-600 text-white shadow-2xl shadow-primary-600/30' : 'bg-white border border-slate-200'} p-8 rounded-[40px] group transition-all`}>
    <div className="flex items-center justify-between mb-8">
       <div className={`w-14 h-14 ${isPrimary ? 'bg-white/20' : color} rounded-3xl flex items-center justify-center transition-transform group-hover:scale-110 duration-500`}>
          {icon}
       </div>
       <span className={`text-[10px] font-black uppercase tracking-widest px-3 py-1 rounded-full ${isPrimary ? 'bg-white/20 text-white' : 'bg-green-50 text-green-600'}`}>
          {trend}
       </span>
    </div>
    <p className={`text-xs font-bold uppercase tracking-tight mb-2 ${isPrimary ? 'text-white/60' : 'text-slate-400'}`}>{label}</p>
    <h4 className="text-4xl font-black">{value}</h4>
  </div>
);

const SimpleProgress = ({ label, value }: any) => (
  <div>
    <div className="flex justify-between items-center mb-2">
       <span className="font-bold text-slate-700">{label}</span>
       <span className="text-xs font-bold text-slate-400">{value}%</span>
    </div>
    <div className="w-full h-2 bg-slate-100 rounded-full overflow-hidden">
       <div className="h-full bg-primary-600 rounded-full" style={{ width: `${value}%` }}></div>
    </div>
  </div>
);

const CouponCard = ({ code, discount, used, total, status }: any) => (
  <div className="bg-white p-8 rounded-[32px] border border-slate-200 relative overflow-hidden group">
    <div className={`absolute top-6 right-8 text-[10px] font-black uppercase tracking-widest px-3 py-1 rounded-full ${status === 'Active' ? 'bg-green-50 text-green-600' : 'bg-red-50 text-red-600'}`}>
       {status}
    </div>
    <h4 className="font-black text-2xl tracking-widest text-primary-600 mb-6 group-hover:scale-105 transition-transform origin-left">{code}</h4>
    <div className="flex items-center justify-between">
       <div>
          <p className="text-xs font-bold text-slate-400 uppercase tracking-tight mb-1">Discount</p>
          <p className="font-black text-slate-900 text-xl">{discount}</p>
       </div>
       <div className="text-right">
          <p className="text-xs font-bold text-slate-400 uppercase tracking-tight mb-1">Redemptions</p>
          <p className="font-bold text-slate-900">{used}/{total}</p>
       </div>
    </div>
  </div>
);

export default AdminDashboard;
