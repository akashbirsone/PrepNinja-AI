import { useState, useEffect, useRef } from 'react';
import Sidebar from '../components/Sidebar';
import { 
  Menu, 
  Mic, 
  MicOff, 
  Send, 
  Clock, 
  Award, 
  AlertCircle,
  TrendingUp,
  Brain,
  Video,
  RotateCcw,
  CheckCircle
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import toast from 'react-hot-toast';

interface Message {
  id: number;
  type: 'ai' | 'user';
  text: string;
}

const MockInterview = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    { id: 1, type: 'ai', text: "Hello! I'm your AI Interviewer. Are you ready to start your mock session for the Software Engineer role?" }
  ]);
  const [inputText, setInputText] = useState("");
  const [isRecording, setIsRecording] = useState(false);
  const [isInterviewActive, setIsInterviewActive] = useState(false);
  const [timeLeft, setTimeLeft] = useState(15 * 60); // 15 mins
  const [showFeedback, setShowFeedback] = useState(false);
  const chatEndRef = useRef<HTMLDivElement>(null);

  // Web Speech API
  const recognition = (window as any).webkitSpeechRecognition 
    ? new (window as any).webkitSpeechRecognition() 
    : null;

  if (recognition) {
    recognition.continuous = true;
    recognition.interimResults = true;
    recognition.lang = 'en-US';

    recognition.onresult = (event: any) => {
      const transcript = Array.from(event.results)
        .map((result: any) => result[0])
        .map(result => result.transcript)
        .join('');
      setInputText(transcript);
    };
  }

  const toggleRecording = () => {
    if (!recognition) return toast.error("Speech recognition not supported in this browser.");
    if (isRecording) {
      recognition.stop();
    } else {
      recognition.start();
    }
    setIsRecording(!isRecording);
  };

  const handleSendMessage = () => {
    if (!inputText.trim()) return;
    
    const newUserMsg: Message = { id: Date.now(), type: 'user', text: inputText };
    setMessages(prev => [...prev, newUserMsg]);
    setInputText("");
    
    if (isRecording) {
       recognition.stop();
       setIsRecording(false);
    }

    // Simulate AI think and reply
    setTimeout(() => {
      const aiReplies = [
        "That's a very clear explanation. Now, can you tell me about a challenging technical project you worked on?",
        "Interesting. How do you handle disagreements within a team setting?",
        "Good. Let's move to some technical basics. Briefly explain the difference between REST and GraphQL.",
        "Alright. Finally, why do you want to join our company specifically?"
      ];
      
      const nextAiMsg: Message = { 
        id: Date.now() + 1, 
        type: 'ai', 
        text: aiReplies[Math.min(messages.filter(m => m.type === 'user').length, aiReplies.length - 1)] 
      };
      setMessages(prev => [...prev, nextAiMsg]);
    }, 1500);
  };

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  useEffect(() => {
    let timer: any;
    if (isInterviewActive && timeLeft > 0) {
      timer = setInterval(() => setTimeLeft(prev => prev - 1), 1000);
    } else if (timeLeft === 0 && isInterviewActive) {
      endInterview();
    }
    return () => clearInterval(timer);
  }, [isInterviewActive, timeLeft]);

  const startInterview = () => {
    setIsInterviewActive(true);
    toast.success("Interview Started!");
  };

  const endInterview = () => {
    setIsInterviewActive(false);
    setShowFeedback(true);
    toast.success("Interview Completed!");
  };

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs < 10 ? '0' : ''}${secs}`;
  };

  return (
    <div className="flex h-screen bg-slate-50 overflow-hidden">
      <Sidebar isMobile={false} />
      <Sidebar isMobile={true} isOpen={isSidebarOpen} onClose={() => setIsSidebarOpen(false)} />

      <main className="flex-1 min-w-0 flex flex-col relative">
        {/* Header */}
        <header className="bg-white border-b border-slate-200 h-20 flex items-center justify-between px-8 shrink-0 z-10">
          <div className="flex items-center space-x-4">
            <button onClick={() => setIsSidebarOpen(true)} className="lg:hidden p-2 hover:bg-slate-100 rounded-xl">
              <Menu className="w-6 h-6 text-slate-600" />
            </button>
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-primary-50 rounded-xl flex items-center justify-center">
                 <Video className="w-5 h-5 text-primary-600" />
              </div>
              <div>
                <h2 className="text-lg font-bold text-slate-900 leading-none">AI Mock Session</h2>
                <p className="text-[11px] font-bold text-green-600 uppercase mt-1 tracking-wider">Live Analysis Active</p>
              </div>
            </div>
          </div>

          <div className="flex items-center space-x-4">
             {isInterviewActive && (
               <div className="flex items-center space-x-3 px-6 py-2.5 bg-slate-900 text-white rounded-2xl font-black tabular-nums shadow-lg shadow-black/10">
                 <Clock className="w-4 h-4 text-primary-400"/>
                 <span>{formatTime(timeLeft)}</span>
               </div>
             )}
             <button 
              onClick={isInterviewActive ? endInterview : startInterview}
              className={`px-6 py-2.5 rounded-2xl font-bold transition-all ${
                isInterviewActive ? 'bg-red-50 text-red-600 border border-red-100' : 'bg-primary-600 text-white shadow-lg shadow-primary-600/20'
              }`}
             >
               {isInterviewActive ? "End Session" : "Start Session"}
             </button>
          </div>
        </header>

        {/* Chat Area */}
        <div className="flex-1 overflow-y-auto p-4 lg:p-8 space-y-8 pb-32">
          {!isInterviewActive && !showFeedback && (
             <div className="h-full flex flex-col items-center justify-center text-center max-w-md mx-auto">
                <div className="w-24 h-24 bg-primary-100 rounded-[32px] flex items-center justify-center mb-8 rotate-3">
                   <Brain className="w-12 h-12 text-primary-600" />
                </div>
                <h3 className="text-2xl font-black text-slate-900 mb-4">Ready to perform?</h3>
                <p className="text-slate-500 font-medium mb-8 leading-relaxed">
                  The AI will ask technical and behavioral questions. Your answers will be analyzed for quality, tone, and brevity.
                </p>
                <div className="grid grid-cols-2 gap-4 w-full">
                   <div className="p-4 bg-white rounded-2xl border border-slate-200 text-left">
                      <Clock className="w-5 h-5 text-blue-500 mb-2"/>
                      <p className="text-xs font-bold text-slate-400 uppercase">Duration</p>
                      <p className="font-bold text-slate-900">15 Minutes</p>
                   </div>
                   <div className="p-4 bg-white rounded-2xl border border-slate-200 text-left">
                      <Mic className="w-5 h-5 text-purple-500 mb-2"/>
                      <p className="text-xs font-bold text-slate-400 uppercase">Input</p>
                      <p className="font-bold text-slate-900">Voice/Text</p>
                   </div>
                </div>
             </div>
          )}

          <AnimatePresence>
            {(isInterviewActive || messages.length > 1) && !showFeedback && messages.map((msg) => (
              <motion.div 
                key={msg.id}
                initial={{ opacity: 0, y: 20, scale: 0.95 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                className={`flex ${msg.type === 'ai' ? 'justify-start' : 'justify-end'}`}
              >
                <div className={`max-w-[80%] flex items-end space-x-3 ${msg.type === 'ai' ? 'flex-row' : 'flex-row-reverse space-x-reverse'}`}>
                  {msg.type === 'ai' && (
                    <div className="w-8 h-8 rounded-lg bg-primary-600 flex items-center justify-center shrink-0 mb-1">
                      <Brain className="w-5 h-5 text-white" />
                    </div>
                  )}
                  <div className={`p-5 rounded-[28px] font-medium leading-relaxed shadow-sm ${
                    msg.type === 'ai' 
                    ? 'bg-white border border-slate-200 text-slate-800 rounded-bl-none' 
                    : 'bg-primary-600 text-white rounded-br-none shadow-xl shadow-primary-600/10'
                  }`}>
                    {msg.text}
                  </div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
          <div ref={chatEndRef} />
        </div>

        {/* Feedback Overlay */}
        <AnimatePresence>
          {showFeedback && (
            <motion.div 
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className="absolute inset-4 z-40 bg-white shadow-2xl rounded-[40px] border border-slate-200 p-8 lg:p-12 overflow-y-auto"
            >
              <div className="max-w-4xl mx-auto">
                <div className="text-center mb-12">
                   <div className="w-20 h-20 bg-green-50 text-green-600 rounded-3xl flex items-center justify-center mx-auto mb-6">
                      <Award className="w-10 h-10 fill-current"/>
                   </div>
                   <h2 className="text-3xl font-black text-slate-900">Interview Analysis Report</h2>
                   <p className="text-slate-500 mt-2">Personalized feedback based on your responses.</p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
                   <ScoreCard label="Communication Score" score={7} total={10} color="text-blue-600" />
                   <ScoreCard label="Technical Depth" score={8.5} total={10} color="text-purple-600" />
                </div>

                <div className="space-y-8">
                   <div>
                      <h3 className="text-xl font-bold text-slate-900 mb-6 flex items-center space-x-2">
                        <TrendingUp className="text-green-500" />
                        <span>Key Strengths</span>
                      </h3>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                         <StrengthItem text="Confident tone during technical explanations." />
                         <StrengthItem text="Good structure in behavioral answers (STAR method)." />
                      </div>
                   </div>

                   <div>
                      <h3 className="text-xl font-bold text-slate-900 mb-6 flex items-center space-x-2">
                        <AlertCircle className="text-yellow-500" />
                        <span>Areas to Improve</span>
                      </h3>
                      <div className="bg-slate-50 p-6 rounded-3xl border border-slate-100 space-y-4">
                         <div className="flex items-start space-x-3">
                             <div className="w-2 h-2 rounded-full bg-yellow-500 mt-2 shrink-0"></div>
                             <p className="text-slate-600 font-medium">Try to be more concise in your introduction. Goal: Under 60 seconds.</p>
                         </div>
                         <div className="flex items-start space-x-3">
                             <div className="w-2 h-2 rounded-full bg-yellow-500 mt-2 shrink-0"></div>
                             <p className="text-slate-600 font-medium">Mention specific technologies when explaining the problem-solving process.</p>
                         </div>
                      </div>
                   </div>
                </div>

                <div className="mt-12 flex justify-center space-x-4">
                   <button 
                    onClick={() => { setShowFeedback(false); setMessages([{ id: 1, type: 'ai', text: "Ready for another round?" }]); }}
                    className="flex items-center space-x-2 px-8 py-4 bg-slate-200 text-slate-700 rounded-2xl font-bold hover:bg-slate-300 transition-all"
                   >
                     <RotateCcw className="w-5 h-5"/>
                     <span>Restart Interview</span>
                   </button>
                   <button className="px-8 py-4 bg-primary-600 text-white rounded-2xl font-bold hover:bg-primary-700 shadow-lg shadow-primary-600/20 transition-all">
                     Go to Dashboard
                   </button>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Input area */}
        {isInterviewActive && (
          <div className="absolute bottom-0 left-0 right-0 bg-white/80 backdrop-blur-md border-t border-slate-200 p-6">
            <div className="max-w-4xl mx-auto relative flex items-center space-x-4">
              <button 
                onClick={toggleRecording}
                className={`p-4 rounded-2xl transition-all shadow-lg ${
                  isRecording 
                  ? 'bg-red-500 text-white animate-pulse shadow-red-500/30' 
                  : 'bg-slate-100 text-slate-500 hover:bg-slate-200'
                }`}
              >
                {isRecording ? <MicOff className="w-6 h-6" /> : <Mic className="w-6 h-6" />}
              </button>
              <div className="flex-1 relative">
                <input 
                  type="text" 
                  value={inputText}
                  onChange={(e) => setInputText(e.target.value)}
                  onKeyDown={(e) => e.key === 'Enter' && handleSendMessage()}
                  placeholder={isRecording ? "Listening..." : "Type your answer here..."}
                  className="w-full bg-white border border-slate-200 rounded-3xl pl-6 pr-14 py-4 focus:ring-2 focus:ring-primary-500/20 outline-none font-medium shadow-sm"
                />
                <button 
                  onClick={handleSendMessage}
                  className="absolute right-2 top-1/2 -translate-y-1/2 w-10 h-10 bg-primary-600 text-white rounded-full flex items-center justify-center hover:bg-primary-700 transition-all"
                >
                  <Send className="w-5 h-5" />
                </button>
              </div>
            </div>
          </div>
        )}
      </main>
    </div>
  );
};

// UI Components
const ScoreCard = ({ label, score, total, color }: any) => (
  <div className="bg-white p-8 rounded-[32px] border border-slate-100 shadow-xl shadow-slate-200/50 flex flex-col items-center">
    <div className="relative w-24 h-24 mb-6">
      <svg className="w-full h-full transform -rotate-90">
        <circle cx="48" cy="48" r="42" fill="transparent" stroke="#f1f5f9" strokeWidth="8" />
        <motion.circle 
          cx="48" cy="48" r="42" fill="transparent" stroke="currentColor" strokeWidth="8" 
          strokeDasharray={264}
          initial={{ strokeDashoffset: 264 }}
          animate={{ strokeDashoffset: 264 * (1 - score/total) }}
          transition={{ duration: 1 }}
          strokeLinecap="round"
          className={color}
        />
      </svg>
      <div className="absolute inset-0 flex items-center justify-center font-black text-2xl text-slate-900">
        {score}
      </div>
    </div>
    <h4 className="font-bold text-slate-500 uppercase text-[10px] tracking-widest">{label}</h4>
  </div>
);

const StrengthItem = ({ text }: { text: string }) => (
  <div className="flex items-center space-x-3 p-4 bg-green-50 rounded-2xl border border-green-100">
    <CheckCircle className="w-5 h-5 text-green-500 shrink-0" />
    <span className="text-sm font-bold text-green-700">{text}</span>
  </div>
);

export default MockInterview;
