import { useState, useEffect } from 'react';
import Sidebar from '../components/Sidebar';
import { 
  Calculator, 
  ChevronRight, 
  Clock, 
  CheckCircle, 
  ArrowLeft,
  Timer,
  BarChart3,
  PieChart,
  Download,
  Menu,
  Zap
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import toast from 'react-hot-toast';

// Dummy Question Data
const TOPICS = [
  { id: 'percentage', name: 'Percentage', icon: <PieChart className="w-5 h-5"/>, count: 45, color: 'text-blue-600', bg: 'bg-blue-50' },
  { id: 'time-work', name: 'Time & Work', icon: <Clock className="w-5 h-5"/>, count: 32, color: 'text-purple-600', bg: 'bg-purple-50' },
  { id: 'profit-loss', name: 'Profit & Loss', icon: <BarChart3 className="w-5 h-5"/>, count: 50, color: 'text-green-600', bg: 'bg-green-50' },
  { id: 'data-interpretation', name: 'Data Interpretation', icon: <Calculator className="w-5 h-5"/>, count: 28, color: 'text-orange-600', bg: 'bg-orange-50' },
];

const QUESTIONS_DATA = [
  {
    id: 1,
    question: "A can complete a task in 12 days, while B can complete the same task in 18 days. If they work together for 4 days, how much work is left?",
    options: ["1/3", "4/9", "5/9", "2/3"],
    correct: 1, // "4/9" is 1 - (4 * (1/12 + 1/18)) = 1 - 4 * (5/36) = 1 - 20/36 = 16/36 = 4/9. Actually 1 - 20/36 = 16/36 = 4/9. Let's check math. 1/12 + 1/18 = (3+2)/36 = 5/36. 4 days = 20/36. Ref: 1 - 20/36 = 16/36 = 4/9.
    explanation: "1. Work = LCM of 12 & 18 = 36 units. 2. A's efficiency = 3 units/day. B's efficiency = 2 units/day. 3. Together they work for 4 days: (3+2) * 4 = 20 units done. 4. Remaining work = 36 - 20 = 16 units. 5. Fraction left = 16/36 = 4/9."
  },
  {
    id: 2,
    question: "What is 25% of 30% of 400?",
    options: ["25", "30", "40", "50"],
    correct: 1, // 400 * 0.3 = 120. 120 * 0.25 = 30.
    explanation: "30% of 400 = 120. 25% of 120 = 30."
  },
  // Adding more dummy questions...
];

const AptitudeSystem = () => {
  const [view, setView] = useState<'selection' | 'test' | 'result'>('selection');
  const [selectedTopic, setSelectedTopic] = useState<string | null>(null);
  const [difficulty, setDifficulty] = useState<'Easy' | 'Medium' | 'Hard'>('Easy');
  const [selectedDuration, setSelectedDuration] = useState(15);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  // Test State
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState<Record<number, number>>({});
  const [timeLeft, setTimeLeft] = useState(0);
  const [isTestStarted, setIsTestStarted] = useState(false);
  const [questions, setQuestions] = useState<any[]>(QUESTIONS_DATA);

  useEffect(() => {
    const saved = localStorage.getItem('aptitude_questions');
    if (saved) {
      const parsed = JSON.parse(saved);
      // Filter by selected topic if needed, but for now just use all or the topic matching ones
      const topicQuestions = parsed.filter((q: any) => q.topic === selectedTopic);
      setQuestions(topicQuestions.length > 0 ? topicQuestions : parsed);
    }
  }, [selectedTopic, isTestStarted]);

  const startTest = () => {
    if (!selectedTopic) return toast.error('Please select a topic');
    setView('test');
    setTimeLeft(selectedDuration * 60);
    setIsTestStarted(true);
    setAnswers({});
    setCurrentQuestion(0);
  };

  useEffect(() => {
    let timer: any;
    if (isTestStarted && timeLeft > 0) {
      timer = setInterval(() => setTimeLeft(prev => prev - 1), 1000);
    } else if (timeLeft === 0 && isTestStarted) {
      submitTest();
    }
    return () => clearInterval(timer);
  }, [isTestStarted, timeLeft]);

  const submitTest = () => {
    setIsTestStarted(false);
    setView('result');
    toast.success('Test Submitted Successfully!');
  };

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs < 10 ? '0' : ''}${secs}`;
  };

  return (
    <div className="flex min-h-screen bg-slate-50">
      <Sidebar isMobile={false} />
      <Sidebar isMobile={true} isOpen={isSidebarOpen} onClose={() => setIsSidebarOpen(false)} />

      <main className="flex-1 min-w-0 flex flex-col pb-20 lg:pb-0">
        {/* Top Header */}
        <header className="bg-white border-b border-slate-200 h-16 lg:h-20 flex items-center justify-between px-4 lg:px-8 shrink-0 sticky top-0 z-40">
          <div className="flex items-center space-x-3 lg:space-x-4">
             <button onClick={() => setIsSidebarOpen(true)} className="lg:hidden p-2 hover:bg-slate-100 rounded-xl">
               <Menu className="w-5 h-5 text-slate-600" />
             </button>
             <h2 className="text-lg lg:text-xl font-bold text-slate-900">Aptitude Arena</h2>
          </div>
          <div className="flex items-center space-x-3 lg:space-x-4">
             <div className="px-3 lg:px-4 py-1.5 lg:py-2 bg-primary-50 text-primary-600 rounded-lg lg:rounded-xl font-bold text-[10px] lg:text-sm uppercase tracking-wider transition-all">
                Credits: 240
             </div>
             <div className="w-8 h-8 lg:w-10 lg:h-10 bg-slate-200 rounded-full overflow-hidden border-2 border-white shadow-sm ring-2 ring-primary-50 transition-all">
                <img src={`https://ui-avatars.com/api/?name=${localStorage.getItem('userName') || 'Ninja'}&background=4F46E5&color=fff`} alt="User" />
             </div>
          </div>
        </header>

        <div className="p-4 lg:p-8 flex-1 overflow-auto">
          <AnimatePresence mode="wait">
            {view === 'selection' && (
              <motion.div 
                key="selection" 
                initial={{ opacity: 0, y: 20 }} 
                animate={{ opacity: 1, y: 0 }} 
                exit={{ opacity: 0, y: -20 }}
                className="max-w-5xl mx-auto"
              >
                <div className="mb-8 lg:mb-12">
                   <h1 className="text-2xl lg:text-4xl font-black text-slate-900 tracking-tight leading-tight">Choose Your Battle</h1>
                   <p className="text-slate-500 mt-2 text-base lg:text-lg font-medium">Master critical aptitude domains with AI-generated sets.</p>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                  <div className="lg:col-span-2 grid grid-cols-1 md:grid-cols-2 gap-6">
                    {TOPICS.map((topic) => (
                      <button 
                        key={topic.id}
                        onClick={() => setSelectedTopic(topic.id)}
                        className={`p-6 lg:p-8 rounded-[28px] lg:rounded-[32px] border-2 transition-all text-left group relative overflow-hidden ${
                          selectedTopic === topic.id 
                            ? 'border-primary-600 bg-white shadow-xl shadow-primary-600/10' 
                            : 'border-white bg-white hover:border-slate-200 shadow-sm'
                        }`}
                      >
                        <div className={`w-12 h-12 lg:w-14 lg:h-14 ${topic.bg} rounded-xl lg:rounded-2xl flex items-center justify-center mb-4 lg:mb-6 group-hover:scale-110 transition-transform`}>
                           <div className={topic.color}>{topic.icon}</div>
                        </div>
                        <h3 className="text-lg lg:text-xl font-bold text-slate-900 mb-1 lg:mb-2">{topic.name}</h3>
                        <p className="text-xs lg:text-sm text-slate-500 mb-4 line-clamp-1 lg:line-clamp-2">Master calculations, fractional conversions, and relative growth patterns.</p>
                        <div className="flex items-center text-sm font-bold text-primary-600">
                           <span>{topic.count} Questions Available</span>
                           <ChevronRight className="w-4 h-4 ml-1" />
                        </div>
                        {selectedTopic === topic.id && (
                          <div className="absolute top-4 right-4 text-primary-600">
                            <CheckCircle className="w-6 h-6 fill-current text-primary-600" />
                          </div>
                        )}
                      </button>
                    ))}
                  </div>

                  <div className="bg-white p-8 rounded-[32px] border border-slate-200 shadow-sm h-fit">
                    <h3 className="text-xl font-bold text-slate-900 mb-6">Test Configuration</h3>
                    
                    <div className="space-y-6">
                      <div>
                        <label className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-4 block">Difficulty Level</label>
                        <div className="space-y-3">
                          {['Easy', 'Medium', 'Hard'].map((lvl) => (
                            <button 
                              key={lvl}
                              onClick={() => setDifficulty(lvl as any)}
                              className={`w-full p-4 rounded-2xl border flex items-center justify-between font-bold transition-all ${
                                difficulty === lvl ? 'border-primary-600 bg-primary-50 text-primary-600' : 'border-slate-100 bg-white text-slate-600'
                              }`}
                            >
                              <span>{lvl}</span>
                              <div className={`w-2 h-2 rounded-full ${lvl === 'Easy' ? 'bg-green-500' : lvl === 'Medium' ? 'bg-yellow-500' : 'bg-red-500'}`}></div>
                            </button>
                          ))}
                        </div>
                      </div>

                      <div>
                        <label className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-4 block">Duration</label>
                        <select 
                          value={selectedDuration}
                          onChange={(e) => setSelectedDuration(Number(e.target.value))}
                          className="w-full p-4 rounded-2xl border border-slate-100 bg-white font-bold text-slate-700 outline-none"
                        >
                          <option value={10}>10 Minutes</option>
                          <option value={15}>15 Minutes</option>
                          <option value={20}>20 Minutes</option>
                          <option value={30}>30 Minutes</option>
                        </select>
                      </div>

                      <button 
                        onClick={startTest}
                        className="w-full py-4 bg-primary-600 text-white rounded-2xl font-bold text-lg hover:bg-primary-700 transition-all shadow-xl shadow-primary-600/20 active:scale-95"
                      >
                        Start Assessment
                      </button>
                    </div>
                  </div>
                </div>
              </motion.div>
            )}

            {view === 'test' && (
              <motion.div 
                key="test" 
                initial={{ opacity: 0, scale: 0.95 }} 
                animate={{ opacity: 1, scale: 1 }} 
                className="max-w-4xl mx-auto h-full flex flex-col"
              >
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-6 mb-8 lg:mb-12">
                  <div className="flex items-center space-x-3 lg:space-x-4">
                    <div className="w-10 h-10 lg:w-12 lg:h-12 bg-white rounded-lg lg:rounded-xl shadow-sm flex items-center justify-center font-black text-primary-600 border border-slate-100">
                       {currentQuestion + 1}/15
                    </div>
                    <div>
                       <h3 className="font-bold text-slate-900 text-sm lg:text-base">{TOPICS.find(t => t.id === selectedTopic)?.name}</h3>
                       <div className="flex items-center text-[10px] font-black text-slate-400 uppercase space-x-2 tracking-widest">
                          <span>{difficulty}</span>
                          <span>•</span>
                          <span>MCQ</span>
                       </div>
                    </div>
                  </div>
                  
                  <div className={`flex items-center justify-center space-x-2 px-5 py-2.5 lg:px-6 lg:py-3 rounded-xl lg:rounded-2xl border-2 font-black transition-colors ${timeLeft < 60 ? 'border-red-100 bg-red-50 text-red-600' : 'border-slate-100 bg-white text-slate-900'}`}>
                    <Timer className="w-4 h-4 lg:w-5 lg:h-5"/>
                    <span className="text-lg lg:text-xl tabular-nums leading-none mb-0.5">{formatTime(timeLeft)}</span>
                  </div>
                </div>

                <div className="w-full h-2 bg-slate-200 rounded-full overflow-hidden mb-12">
                   <motion.div 
                    initial={{ width: 0 }}
                    animate={{ width: `${((currentQuestion + 1) / 15) * 100}%` }}
                    className="h-full bg-primary-600"
                   />
                </div>

                <div className="bg-white rounded-[32px] lg:rounded-[40px] p-6 lg:p-10 border border-slate-200 shadow-lg flex-1 mb-6 lg:mb-8">
                  <h2 className="text-lg lg:text-2xl font-bold text-slate-900 mb-6 lg:mb-10 leading-relaxed">
                    {questions[currentQuestion % questions.length]?.question}
                  </h2>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3 lg:gap-4">
                    {questions[currentQuestion % questions.length]?.options.map((opt: string, idx: number) => (
                      <button 
                        key={idx}
                        onClick={() => setAnswers({...answers, [currentQuestion]: idx})}
                        className={`p-4 lg:p-6 rounded-2xl lg:rounded-3xl border-2 text-left font-bold transition-all flex items-center space-x-3 lg:space-x-4 ${
                          answers[currentQuestion] === idx 
                          ? 'border-primary-600 bg-primary-50 text-primary-600' 
                          : 'border-slate-50 hover:border-slate-200 text-slate-700'
                        }`}
                      >
                        <div className={`w-8 h-8 rounded-lg flex items-center justify-center border-2 shrink-0 ${
                           answers[currentQuestion] === idx ? 'border-primary-600 bg-primary-600 text-white' : 'border-slate-200'
                        }`}>
                           {String.fromCharCode(65 + idx)}
                        </div>
                        <span className="text-sm lg:text-base">{opt}</span>
                      </button>
                    ))}
                  </div>
                </div>

                <div className="flex justify-between items-center mb-12">
                   <button 
                    disabled={currentQuestion === 0}
                    onClick={() => setCurrentQuestion(prev => prev - 1)}
                    className="flex items-center space-x-2 px-6 py-3 font-bold text-slate-500 disabled:opacity-30"
                   >
                     <ArrowLeft className="w-5 h-5"/>
                     <span>Back</span>
                   </button>
                   
                   <div className="flex space-x-4">
                     <button 
                      onClick={submitTest}
                      className="px-8 py-3 rounded-xl border-2 border-slate-200 font-bold text-slate-600 hover:bg-slate-50 transition-all"
                     >
                       Quit
                     </button>
                     {currentQuestion === 14 ? (
                        <button 
                          onClick={submitTest}
                          className="px-10 py-3 bg-primary-600 text-white rounded-xl font-bold hover:bg-primary-700 shadow-lg shadow-primary-600/20 shadow-xl"
                        >
                          Submit Test
                        </button>
                     ) : (
                        <button 
                          onClick={() => setCurrentQuestion(prev => prev + 1)}
                          className="px-10 py-3 bg-primary-600 text-white rounded-xl font-bold hover:bg-primary-700 shadow-lg shadow-primary-600/20"
                        >
                          Next Question
                        </button>
                     )}
                   </div>
                </div>
              </motion.div>
            )}

            {view === 'result' && (
              <motion.div 
                key="result" 
                initial={{ opacity: 0 }} 
                animate={{ opacity: 1 }} 
                className="max-w-5xl mx-auto pb-20"
              >
                <div className="text-center mb-16">
                   <div className="w-20 h-20 bg-primary-50 text-primary-600 rounded-3xl flex items-center justify-center mx-auto mb-6">
                      <Zap className="w-10 h-10 fill-current"/>
                   </div>
                   <h1 className="text-4xl font-black text-slate-900">Test Completed!</h1>
                   <p className="text-slate-500 mt-2 font-medium">You outperformed 82% of students this week.</p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
                   {/* Score Summary */}
                   <div className="bg-white rounded-[32px] p-10 border border-slate-200 shadow-sm flex flex-col items-center justify-center">
                      <div className="relative w-40 h-40 mb-8">
                         <svg className="w-full h-full transform -rotate-90">
                           <circle cx="80" cy="80" r="70" fill="transparent" stroke="#f1f5f9" strokeWidth="12" />
                           <motion.circle 
                              cx="80" cy="80" r="70" fill="transparent" stroke="#4f46e5" strokeWidth="12" 
                              strokeDasharray={440}
                              initial={{ strokeDashoffset: 440 }}
                              animate={{ strokeDashoffset: 440 * (1 - 12/15) }}
                              transition={{ duration: 1.5 }}
                              strokeLinecap="round"
                           />
                         </svg>
                         <div className="absolute inset-0 flex flex-col items-center justify-center">
                            <span className="text-4xl font-black text-slate-900">12/15</span>
                            <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mt-1">Score</span>
                         </div>
                      </div>
                      <div className="grid grid-cols-2 gap-12 w-full max-w-[240px]">
                         <div className="text-center">
                            <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-1">Accuracy</p>
                            <p className="text-xl font-black text-primary-600">80%</p>
                         </div>
                         <div className="text-center">
                            <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-1">Time</p>
                            <p className="text-xl font-black text-slate-900">09:12</p>
                         </div>
                      </div>
                   </div>

                   {/* Analysis */}
                   <div className="bg-white rounded-[32px] p-10 border border-slate-200 shadow-sm">
                      <div className="flex items-center space-x-3 mb-8">
                         <TrendingUp className="text-primary-600 w-6 h-6"/>
                         <h3 className="text-xl font-bold">Weak Topics Analysis</h3>
                      </div>
                      <div className="space-y-6">
                        <TopicAnalysis topic="Logical Deduction" level="Needs Improvement" percent={40} color="bg-red-500" />
                        <TopicAnalysis topic="Relative Speed" level="Average" percent={65} color="bg-yellow-500" />
                        <TopicAnalysis topic="Equations" level="Mastered" percent={95} color="bg-green-500" />
                        
                        <div className="pt-4">
                           <button className="w-full py-4 border-2 border-slate-100 rounded-2xl flex items-center justify-center space-x-2 font-bold text-slate-500 hover:bg-slate-50 transition-all">
                              <Download className="w-5 h-5"/>
                              <span>Download Detailed PDF Report</span>
                           </button>
                        </div>
                      </div>
                   </div>
                </div>

                {/* Detailed Breakdown */}
                <h3 className="text-2xl font-black text-slate-900 mb-8">Detailed Breakdown</h3>
                <div className="space-y-6">
                   {questions.map((q, idx) => (
                      <div key={idx} className="bg-white rounded-[32px] p-8 border border-slate-200 shadow-sm overflow-hidden">
                         <div className="flex items-center justify-between mb-8">
                            <div className="flex items-center space-x-3">
                               <div className={`px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-widest ${answers[idx] === q.correct ? 'bg-green-50 text-green-600' : 'bg-red-50 text-red-600'}`}>
                                  {answers[idx] === q.correct ? 'Correct' : 'Incorrect'}
                               </div>
                               <span className="text-sm font-bold text-slate-400 uppercase tracking-tight">Question {idx + 1} — {TOPICS[0].name}</span>
                            </div>
                         </div>
                         <p className="text-lg font-bold text-slate-900 mb-8 leading-relaxed">{q.question}</p>
                         
                         <div className="bg-primary-50/50 p-6 rounded-3xl border border-primary-100">
                            <div className="flex items-center space-x-2 text-primary-600 mb-4 font-bold">
                               <CheckCircle className="w-5 h-5"/>
                               <span>Ninja Explanation</span>
                            </div>
                            <p className="text-slate-600 leading-relaxed font-medium whitespace-pre-line">{q.explanation}</p>
                         </div>
                      </div>
                   ))}
                </div>

                <div className="mt-12 flex justify-center space-x-4">
                   <button 
                    onClick={() => setView('selection')}
                    className="px-8 py-4 bg-slate-200 text-slate-700 rounded-2xl font-bold hover:bg-slate-300 transition-all"
                   >
                     Go to Overview
                   </button>
                   <button 
                    onClick={() => setView('selection')}
                    className="px-8 py-4 bg-primary-600 text-white rounded-2xl font-bold hover:bg-primary-700 shadow-lg shadow-primary-600/20 transition-all"
                   >
                     Retake Other Topic
                   </button>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </main>
    </div>
  );
};

// UI Components
const TopicAnalysis = ({ topic, level, percent, color }: any) => (
  <div>
    <div className="flex justify-between items-center mb-2">
      <span className="font-bold text-slate-700">{topic}</span>
      <span className={`text-xs font-black uppercase tracking-widest ${color.replace('bg-', 'text-')}`}>{level}</span>
    </div>
    <div className="w-full h-2 bg-slate-100 rounded-full overflow-hidden">
      <motion.div 
        initial={{ width: 0 }}
        animate={{ width: `${percent}%` }}
        className={`h-full ${color}`}
      ></motion.div>
    </div>
  </div>
);

const TrendingUp = ({ className }: { className: string }) => (
  <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-9 9-4-4-6 6" />
  </svg>
);

export default AptitudeSystem;
