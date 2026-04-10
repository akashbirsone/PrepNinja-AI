import { useState, useEffect } from 'react';
import Sidebar from '../components/Sidebar';
import { 
  FileText, 
  Download, 
  Plus, 
  Trash2, 
  User, 
  Briefcase, 
  GraduationCap, 
  Code,
  Layout,
  Menu,
  Check
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import toast from 'react-hot-toast';

const ResumeBuilder = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [activeTab, setActiveTab] = useState<'info' | 'experience' | 'skills' | 'layout'>('info');
  const [mobileView, setMobileView] = useState<'edit' | 'preview'>('edit');
  
  // Resume State
  const [resumeData, setResumeData] = useState({
    name: 'Akash Gupta',
    role: 'Full Stack Developer',
    email: 'akash@example.com',
    phone: '+91 98765 43210',
    location: 'Mumbai, India',
    summary: 'A passionate developer focused on creating intuitive and high-performance web applications using modern technologies.',
    experience: [
      { company: 'TechNova', role: 'Frontend Intern', duration: '2023 - Present', desc: 'Developed responsive UI components using React and Tailwind CSS.' }
    ],
    education: [
      { school: 'Global Tech University', degree: 'B.Tech in CSE', year: '2024' }
    ],
    skills: ['React', 'TypeScript', 'Node.js', 'Tailwind CSS', 'Framer Motion'],
    template: 'Modern'
  });

  const [templates, setTemplates] = useState<any[]>([
    { name: 'Modern', color: 'bg-primary-600' },
    { name: 'Classic', color: 'bg-slate-900' },
    { name: 'Minimal', color: 'bg-indigo-500' },
    { name: 'Creative', color: 'bg-rose-500' }
  ]);

  useEffect(() => {
    const saved = localStorage.getItem('resume_layouts');
    if (saved) {
      setTemplates(JSON.parse(saved));
    }
  }, []);

  const handleDownload = () => {
    toast.success("Preparing your professional resume for download...");
  };

  return (
    <div className="flex min-h-screen bg-slate-50">
      <Sidebar isMobile={false} />
      <Sidebar isMobile={true} isOpen={isSidebarOpen} onClose={() => setIsSidebarOpen(false)} />

      <main className="flex-1 min-w-0 flex flex-col pb-20 lg:pb-0">
        <header className="bg-white border-b border-slate-200 h-16 lg:h-20 flex items-center justify-between px-4 lg:px-8 shrink-0 relative z-10">
          <div className="flex items-center space-x-3 lg:space-x-4">
             <button onClick={() => setIsSidebarOpen(true)} className="lg:hidden p-2 hover:bg-slate-100 rounded-xl">
               <Menu className="w-5 h-5 text-slate-600" />
             </button>
             <h2 className="text-lg lg:text-xl font-bold text-slate-900 flex items-center space-x-2">
                <FileText className="w-5 h-5 text-primary-600"/>
                <span className="hidden sm:inline">AI Resume Builder</span>
                <span className="sm:hidden text-sm uppercase tracking-widest font-black">Builder</span>
             </h2>
          </div>
          
          <div className="flex items-center space-x-2">
             <button 
               onClick={() => setMobileView(mobileView === 'edit' ? 'preview' : 'edit')}
               className="lg:hidden px-4 py-2 bg-slate-100 text-slate-600 rounded-xl font-bold text-xs uppercase tracking-wider"
             >
                {mobileView === 'edit' ? 'Preview' : 'Edit'}
             </button>
             <button 
               onClick={handleDownload}
               className="flex items-center space-x-2 px-4 py-2 lg:px-6 lg:py-2.5 bg-primary-600 text-white rounded-xl font-bold hover:bg-primary-700 transition-all shadow-lg shadow-primary-600/20 text-xs lg:text-base"
             >
               <Download className="w-3 h-3 lg:w-4 lg:h-4"/>
               <span className="hidden sm:inline">Download PDF</span>
               <span className="sm:hidden">PDF</span>
             </button>
          </div>
        </header>

        <div className="flex-1 flex overflow-hidden relative">
          {/* Editor Sidebar */}
          <div className={`w-full lg:w-[400px] bg-white border-r border-slate-200 overflow-y-auto p-6 lg:p-8 custom-scrollbar transition-all duration-300 ${
            mobileView === 'edit' ? 'block' : 'hidden lg:block'
          }`}>
            <div className="flex space-x-1 mb-10 bg-slate-100 p-1.5 rounded-2xl">
               <TabButton active={activeTab === 'info'} onClick={() => setActiveTab('info')} icon={<User className="w-4 h-4"/>} />
               <TabButton active={activeTab === 'experience'} onClick={() => setActiveTab('experience')} icon={<Briefcase className="w-4 h-4"/>} />
               <TabButton active={activeTab === 'skills'} onClick={() => setActiveTab('skills')} icon={<Code className="w-4 h-4"/>} />
               <TabButton active={activeTab === 'layout'} onClick={() => setActiveTab('layout')} icon={<Layout className="w-4 h-4"/>} />
            </div>

            <div className="space-y-8 animate-in fade-in slide-in-from-left-4 duration-500">
               {activeTab === 'info' && (
                 <div className="space-y-6">
                    <h3 className="text-xl font-black text-slate-900">Personal Information</h3>
                    <InputField label="Full Name" value={resumeData.name} onChange={(v) => setResumeData({...resumeData, name: v})} />
                    <InputField label="Target Role" value={resumeData.role} onChange={(v) => setResumeData({...resumeData, role: v})} />
                    <InputField label="Professional Summary" isTextArea value={resumeData.summary} onChange={(v) => setResumeData({...resumeData, summary: v})} />
                    <div className="grid grid-cols-2 gap-4">
                       <InputField label="Email" value={resumeData.email} onChange={(v) => setResumeData({...resumeData, email: v})} />
                       <InputField label="Phone" value={resumeData.phone} onChange={(v) => setResumeData({...resumeData, phone: v})} />
                    </div>
                 </div>
               )}

               {activeTab === 'experience' && (
                 <div className="space-y-6">
                    <div className="flex items-center justify-between">
                       <h3 className="text-xl font-black text-slate-900">Experience</h3>
                       <button className="p-2 bg-slate-100 rounded-lg text-primary-600 hover:bg-primary-50 transition-colors"><Plus className="w-4 h-4"/></button>
                    </div>
                    {resumeData.experience.map((exp, i) => (
                       <div key={i} className="p-4 rounded-2xl bg-slate-50 border border-slate-100 relative group">
                          <button className="absolute top-2 right-2 p-1.5 text-slate-300 hover:text-red-500 opacity-0 group-hover:opacity-100 transition-opacity"><Trash2 className="w-4 h-4"/></button>
                          <p className="font-bold text-slate-900 text-sm mb-1">{exp.role} at {exp.company}</p>
                          <p className="text-[10px] text-slate-400 font-bold uppercase tracking-wider mb-2">{exp.duration}</p>
                          <p className="text-xs text-slate-500 leading-relaxed font-medium">{exp.desc}</p>
                       </div>
                    ))}
                 </div>
               )}

               {activeTab === 'skills' && (
                 <div className="space-y-6">
                    <h3 className="text-xl font-black text-slate-900">Expertise</h3>
                    <div className="flex flex-wrap gap-2">
                       {resumeData.skills.map(skill => (
                         <span key={skill} className="px-3 py-1.5 bg-primary-50 text-primary-600 rounded-xl text-[11px] font-black uppercase tracking-wider flex items-center space-x-2">
                           <span>{skill}</span>
                           <button className="hover:text-red-600"><Plus className="w-3 h-3 rotate-45"/></button>
                         </span>
                       ))}
                    </div>
                    <div className="relative">
                       <input type="text" placeholder="Add a new skill..." className="w-full bg-slate-50 border border-slate-100 rounded-xl px-4 py-3 text-sm outline-none focus:ring-4 focus:ring-primary-500/10 font-bold" />
                       <button className="absolute right-3 top-1/2 -translate-y-1/2 p-1.5 bg-white rounded-lg shadow-sm"><Plus className="w-4 h-4 text-primary-600"/></button>
                    </div>
                 </div>
               )}

               {activeTab === 'layout' && (
                 <div className="space-y-6">
                    <h3 className="text-xl font-black text-slate-900">Style & Layout</h3>
                    <div className="grid grid-cols-2 gap-4">
                       {templates.map(t => (
                         <button 
                           key={t.name}
                           onClick={() => setResumeData({...resumeData, template: t.name})}
                           className={`p-4 rounded-2xl border-2 transition-all text-left ${
                             resumeData.template === t.name ? 'border-primary-600 bg-primary-50' : 'border-slate-100 hover:border-slate-200'
                           }`}
                         >
                           <div className={`w-10 h-10 ${t.color} rounded-lg mb-3 shadow-lg shadow-black/5`}></div>
                           <p className="font-bold text-slate-900 text-sm leading-none">{t.name}</p>
                           {resumeData.template === t.name && <Check className="w-4 h-4 text-primary-600 mt-2"/>}
                         </button>
                       ))}
                    </div>
                 </div>
               )}
            </div>
          </div>

          {/* Preview Area (Live Canvas) */}
          <div className={`flex-1 bg-slate-200/50 p-4 lg:p-12 overflow-y-auto flex justify-center items-start custom-scrollbar transition-all duration-300 ${
            mobileView === 'preview' ? 'block' : 'hidden lg:block'
          }`}>
             <motion.div 
               layout
               className="bg-white w-full max-w-[800px] min-h-[1100px] shadow-2xl rounded-[2px] transition-all origin-top scale-[0.6] sm:scale-[0.8] lg:scale-[0.9] xl:scale-100 overflow-hidden"
             >
                {/* Visual Header */}
                <div className={`${templates.find(t => t.name === resumeData.template)?.color || 'bg-primary-600'} p-8 lg:p-12 text-white relative overflow-hidden`}>
                   <div className="relative z-10">
                      <h1 className="text-3xl lg:text-5xl font-black tracking-tight mb-2">{resumeData.name}</h1>
                      <p className="text-base lg:text-xl text-white/80 font-bold uppercase tracking-[0.2em]">{resumeData.role}</p>
                   </div>
                   <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full blur-[80px] -mr-32 -mt-32"></div>
                </div>

                <div className="p-8 lg:p-12 flex flex-col sm:row sm:space-x-12">
                   {/* Left Col */}
                   <div className="w-full sm:w-2/3 space-y-12 mb-12 sm:mb-0">
                      <section>
                         <SectionTitle title="Summary" />
                         <p className="text-slate-600 leading-relaxed text-sm font-medium">{resumeData.summary}</p>
                      </section>

                      <section>
                         <SectionTitle title="Experience" />
                         <div className="space-y-8">
                            {resumeData.experience.map((exp, i) => (
                               <div key={i} className="relative pl-8 border-l-2 border-slate-100">
                                  <div className="absolute -left-[9px] top-1.5 w-4 h-4 bg-white border-2 border-primary-600 rounded-full"></div>
                                  <div className="flex justify-between items-start mb-2">
                                     <h4 className="font-black text-slate-900 text-sm lg:text-base">{exp.role}</h4>
                                     <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">{exp.duration}</span>
                                  </div>
                                  <p className="text-xs font-bold text-primary-600 mb-3">{exp.company}</p>
                                  <p className="text-xs text-slate-500 leading-relaxed font-medium">{exp.desc}</p>
                               </div>
                            ))}
                         </div>
                      </section>

                      <section>
                         <SectionTitle title="Education" />
                         <div className="space-y-6">
                           {resumeData.education.map((edu, i) => (
                              <div key={i} className="flex justify-between items-start">
                                 <div>
                                    <h4 className="font-black text-slate-900 text-sm lg:text-base">{edu.degree}</h4>
                                    <p className="text-xs font-bold text-slate-500">{edu.school}</p>
                                 </div>
                                 <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">{edu.year}</span>
                              </div>
                           ))}
                         </div>
                      </section>
                   </div>

                   {/* Right Col */}
                   <div className="w-full sm:w-1/3 space-y-12">
                      <section>
                         <SectionTitle title="Contact" />
                         <div className="space-y-4 text-xs font-bold text-slate-600 italic">
                            <p className="flex flex-col lg:flex-row lg:items-center lg:space-x-2"><span>Email:</span> <span className="text-slate-900 not-italic break-all">{resumeData.email}</span></p>
                            <p className="flex flex-col lg:flex-row lg:items-center lg:space-x-2"><span>Phone:</span> <span className="text-slate-900 not-italic">{resumeData.phone}</span></p>
                            <p className="flex flex-col lg:flex-row lg:items-center lg:space-x-2"><span>Loc:</span> <span className="text-slate-900 not-italic">{resumeData.location}</span></p>
                         </div>
                      </section>

                      <section>
                         <SectionTitle title="Expertise" />
                         <div className="flex flex-wrap gap-2">
                            {resumeData.skills.map(skill => (
                               <span key={skill} className="px-3 py-1 bg-slate-100 text-slate-700 rounded-lg text-[10px] font-black uppercase tracking-tight">{skill}</span>
                            ))}
                         </div>
                      </section>
                   </div>
                </div>
             </motion.div>
          </div>
        </div>
      </main>
    </div>
  );
};

const TabButton = ({ active, onClick, icon }: any) => (
  <button 
    onClick={onClick}
    className={`flex-1 flex items-center justify-center py-3 rounded-xl transition-all ${
      active ? 'bg-white text-primary-600 shadow-sm' : 'text-slate-400 hover:text-slate-600'
    }`}
  >
    {icon}
  </button>
);

const InputField = ({ label, value, onChange, isTextArea = false }: any) => (
  <div>
    <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1.5 block">{label}</label>
    {isTextArea ? (
      <textarea 
        value={value}
        onChange={(e) => onChange(e.target.value)}
        rows={4}
        className="w-full bg-slate-50 border border-slate-100 rounded-xl px-4 py-3 text-sm outline-none focus:ring-4 focus:ring-primary-500/10 font-bold transition-all"
      />
    ) : (
      <input 
        type="text" 
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="w-full bg-slate-50 border border-slate-100 rounded-xl px-4 py-3 text-sm outline-none focus:ring-4 focus:ring-primary-500/10 font-bold transition-all"
      />
    ) }
  </div>
);

const SectionTitle = ({ title }: { title: string }) => (
  <div className="flex items-center space-x-3 mb-6">
     <h4 className="text-sm font-black uppercase tracking-[0.2em] text-slate-900">{title}</h4>
     <div className="flex-1 h-[1px] bg-slate-100"></div>
  </div>
);

export default ResumeBuilder;
