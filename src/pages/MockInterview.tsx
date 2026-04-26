import { useState, useEffect, useRef } from 'react';
import Sidebar from '../components/Sidebar';
import { 
  Menu, 
  Mic, 
  MicOff, 
  Clock, 
  Award, 
  AlertCircle,
  TrendingUp,
  Video,
  RotateCcw,
  CheckCircle,
  MessageSquare,
  PhoneOff
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import toast from 'react-hot-toast';

interface Message {
  id: number;
  type: 'ai' | 'user';
  text: string;
}

const AI_IMAGE = "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&q=80&w=600&h=600";

const MockInterview = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [isRecording, setIsRecording] = useState(false);
  const [isInterviewActive, setIsInterviewActive] = useState(false);
  const [timeLeft, setTimeLeft] = useState(15 * 60); // 15 mins
  const [showFeedback, setShowFeedback] = useState(false);
  const [activeSpeaker, setActiveSpeaker] = useState<'ai' | 'user'>('ai');
  const [showChat, setShowChat] = useState(true);
  
  const chatEndRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const pipVideoRef = useRef<HTMLVideoElement>(null);
  const [stream, setStream] = useState<MediaStream | null>(null);

  // Speech Recognition setup
  const recognitionRef = useRef<any>(null);

  useEffect(() => {
    if ((window as any).webkitSpeechRecognition) {
      const recognition = new (window as any).webkitSpeechRecognition();
      recognition.continuous = false;
      recognition.interimResults = false;
      recognition.lang = 'en-US';

      recognition.onresult = (event: any) => {
        const transcript = event.results[0][0].transcript;
        if (transcript.trim()) {
           handleUserSubmit(transcript);
        }
      };

      recognition.onend = () => {
        setIsRecording(false);
      };

      recognitionRef.current = recognition;
    }
  }, [messages]); // Include messages dependency so handleUserSubmit gets latest state

  const toggleRecording = () => {
    if (!recognitionRef.current) return toast.error("Speech recognition not supported in this browser.");
    
    if (isRecording) {
      recognitionRef.current.stop();
      setIsRecording(false);
    } else {
      // Stop AI speech if it's talking
      window.speechSynthesis.cancel();
      setActiveSpeaker('user');
      try {
        recognitionRef.current.start();
        setIsRecording(true);
      } catch (e) {
        console.error(e);
      }
    }
  };

  const speakAI = (text: string) => {
    setActiveSpeaker('ai');
    if ('speechSynthesis' in window) {
      window.speechSynthesis.cancel();
      const utterance = new SpeechSynthesisUtterance(text);
      const voices = window.speechSynthesis.getVoices();
      const femaleVoice = voices.find(v => v.name.includes('Female') || v.name.includes('Samantha') || v.name.includes('Google') || v.name.includes('Zira'));
      if (femaleVoice) utterance.voice = femaleVoice;
      
      utterance.onend = () => {
        setActiveSpeaker('user');
      };
      window.speechSynthesis.speak(utterance);
    } else {
      setTimeout(() => {
        setActiveSpeaker('user');
      }, text.length * 60);
    }
  };

  const handleUserSubmit = (transcript: string) => {
    const newUserMsg: Message = { id: Date.now(), type: 'user', text: transcript };
    
    // We must use functional state update to ensure we have the latest messages array
    setMessages(prev => {
       const newMessages = [...prev, newUserMsg];
       
       // Trigger AI reply after a short delay
       setTimeout(() => {
          const aiReplies = [
            "That's a great point. Can you elaborate on a challenging technical project you worked on recently?",
            "Interesting approach. How do you usually handle disagreements within a team setting?",
            "I understand. Let's shift to some technical concepts. Briefly explain the difference between REST and GraphQL.",
            "Alright. Finally, why do you want to join our company specifically?"
          ];
          
          const userMessageCount = newMessages.filter(m => m.type === 'user').length;
          const nextAiText = aiReplies[Math.min(userMessageCount - 1, aiReplies.length - 1)];
          
          const nextAiMsg: Message = { id: Date.now() + 1, type: 'ai', text: nextAiText };
          setMessages(currentMessages => [...currentMessages, nextAiMsg]);
          speakAI(nextAiText);
       }, 1000);

       return newMessages;
    });

    setIsRecording(false);
    setActiveSpeaker('ai');
  };

  useEffect(() => {
    if (isInterviewActive && showChat) {
      chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messages, isInterviewActive, showChat]);

  useEffect(() => {
    let timer: any;
    if (isInterviewActive && timeLeft > 0) {
      timer = setInterval(() => setTimeLeft(prev => prev - 1), 1000);
    } else if (timeLeft === 0 && isInterviewActive) {
      endInterview();
    }
    return () => clearInterval(timer);
  }, [isInterviewActive, timeLeft]);

  // Camera effect
  useEffect(() => {
    const startCamera = async () => {
      try {
        const mediaStream = await navigator.mediaDevices.getUserMedia({ video: true, audio: false });
        setStream(mediaStream);
      } catch (err) {
        console.error("Error accessing camera:", err);
        toast.error("Could not access camera. Please allow camera permissions.");
      }
    };

    if (isInterviewActive) {
      startCamera();
      
      // Start initial AI greeting
      const greeting = "Hello! I'm Sarah, your AI Interviewer. Are you ready to start your mock session for the Software Engineer role?";
      setMessages([{ id: 1, type: 'ai', text: greeting }]);
      setTimeout(() => {
        speakAI(greeting);
      }, 500);

    } else {
      if (stream) {
        stream.getTracks().forEach(track => track.stop());
        setStream(null);
      }
      window.speechSynthesis.cancel();
      if (recognitionRef.current && isRecording) {
         recognitionRef.current.stop();
         setIsRecording(false);
      }
    }
    
    return () => {
       window.speechSynthesis.cancel();
    }
  }, [isInterviewActive]);

  // Sync streams to video elements
  useEffect(() => {
    if (videoRef.current && stream) {
      videoRef.current.srcObject = stream;
    }
    if (pipVideoRef.current && stream) {
      pipVideoRef.current.srcObject = stream;
    }
  }, [stream, activeSpeaker]);

  const startInterview = () => {
    setIsInterviewActive(true);
    toast.success("Interview Connected!");
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
      {/* Hide sidebar when interview is active for full call experience */}
      {!isInterviewActive && <Sidebar isMobile={false} />}
      {!isInterviewActive && <Sidebar isMobile={true} isOpen={isSidebarOpen} onClose={() => setIsSidebarOpen(false)} />}

      <main className="flex-1 min-w-0 flex flex-col relative h-full">
        {isInterviewActive ? (
          <div className="relative flex-1 bg-slate-900 overflow-hidden flex flex-col">
            
            {/* Top Header Controls (Transparent) */}
            <div className="absolute top-0 left-0 right-0 z-50 p-6 lg:p-8 flex items-center justify-between pointer-events-none">
              <div className="flex items-center space-x-3 pointer-events-auto">
                 <div className="px-4 py-2 bg-black/40 backdrop-blur-md rounded-2xl border border-white/10 flex items-center space-x-2">
                    <div className={`w-2 h-2 rounded-full ${activeSpeaker === 'ai' ? 'bg-green-500 animate-pulse' : 'bg-slate-500'}`}></div>
                    <span className="text-white font-medium text-sm">Sarah (AI)</span>
                 </div>
              </div>

              <div className="px-5 py-2 bg-black/50 backdrop-blur-md border border-white/10 text-white rounded-2xl font-black tabular-nums flex items-center space-x-2 pointer-events-auto shadow-lg">
                <Clock className="w-4 h-4 text-red-400 animate-pulse"/>
                <span>{formatTime(timeLeft)}</span>
              </div>
            </div>

            {/* Main Views Layout */}
            <div className="absolute inset-0 z-0 transition-all duration-700">
               {/* Large View */}
               {activeSpeaker === 'ai' ? (
                  <motion.div 
                     initial={{ opacity: 0 }}
                     animate={{ opacity: 1 }}
                     className="w-full h-full relative bg-slate-800"
                  >
                     <img src={AI_IMAGE} alt="AI" className="w-full h-full object-cover" />
                     <div className="absolute inset-0 bg-gradient-to-b from-black/20 via-transparent to-black/80"></div>
                  </motion.div>
               ) : (
                  <motion.div 
                     initial={{ opacity: 0 }}
                     animate={{ opacity: 1 }}
                     className="w-full h-full relative bg-black"
                  >
                     <video 
                        ref={videoRef} 
                        autoPlay 
                        muted 
                        playsInline
                        className="w-full h-full object-cover transform -scale-x-100"
                     />
                     <div className="absolute inset-0 bg-gradient-to-b from-black/20 via-transparent to-black/80"></div>
                  </motion.div>
               )}
            </div>

            {/* Picture-in-Picture (PiP) */}
            <motion.div 
               layout
               className="absolute top-24 right-6 lg:right-8 w-32 lg:w-48 aspect-[3/4] lg:aspect-video rounded-3xl overflow-hidden border-2 border-white/20 shadow-2xl z-40 bg-slate-800 transition-all duration-500"
            >
               {activeSpeaker === 'ai' ? (
                  <video 
                     ref={pipVideoRef} 
                     autoPlay 
                     muted 
                     playsInline
                     className="w-full h-full object-cover transform -scale-x-100"
                  />
               ) : (
                  <img src={AI_IMAGE} alt="AI PiP" className="w-full h-full object-cover" />
               )}
            </motion.div>

            {/* Chat Transcript Panel (Side Overlay) */}
            <AnimatePresence>
               {showChat && (
                  <motion.div 
                     initial={{ opacity: 0, x: -20 }}
                     animate={{ opacity: 1, x: 0 }}
                     exit={{ opacity: 0, x: -20 }}
                     className="absolute left-4 lg:left-8 top-24 bottom-32 w-72 lg:w-96 flex flex-col z-30 pointer-events-none"
                  >
                     <div className="flex-1 overflow-y-auto space-y-4 pr-2 pointer-events-auto scrollbar-hide" style={{ msOverflowStyle: 'none', scrollbarWidth: 'none' }}>
                        {messages.map((msg) => (
                           <motion.div 
                              initial={{ opacity: 0, y: 10 }}
                              animate={{ opacity: 1, y: 0 }}
                              key={msg.id} 
                              className={`flex ${msg.type === 'ai' ? 'justify-start' : 'justify-end'}`}
                           >
                              <div className={`p-4 rounded-2xl max-w-[85%] text-sm shadow-lg backdrop-blur-md ${
                                 msg.type === 'ai' 
                                 ? 'bg-black/60 text-white border border-white/10 rounded-tl-sm' 
                                 : 'bg-primary-600/80 text-white border border-primary-500/50 rounded-tr-sm'
                              }`}>
                                 {msg.text}
                              </div>
                           </motion.div>
                        ))}
                        <div ref={chatEndRef} />
                     </div>
                  </motion.div>
               )}
            </AnimatePresence>

            {/* Bottom Call Controls */}
            <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex items-center space-x-6 z-50">
               <button 
                  onClick={() => setShowChat(!showChat)}
                  className={`w-14 h-14 rounded-full flex items-center justify-center transition-all backdrop-blur-md border ${
                     showChat ? 'bg-white text-slate-900 border-white shadow-lg shadow-white/20' : 'bg-white/10 text-white border-white/20 hover:bg-white/20'
                  }`}
               >
                  <MessageSquare className="w-6 h-6" />
               </button>

               <button 
                  onClick={toggleRecording}
                  className={`w-20 h-20 rounded-full flex items-center justify-center transition-all shadow-xl ${
                     isRecording 
                     ? 'bg-white text-slate-900 scale-110 animate-pulse shadow-white/30' 
                     : 'bg-white/10 text-white border border-white/20 backdrop-blur-md hover:bg-white/20'
                  }`}
               >
                  {isRecording ? <Mic className="w-8 h-8" /> : <MicOff className="w-8 h-8" />}
               </button>

               <button 
                  onClick={endInterview}
                  className="w-14 h-14 rounded-full flex items-center justify-center bg-red-500 text-white hover:bg-red-600 transition-all shadow-lg shadow-red-500/30"
               >
                  <PhoneOff className="w-6 h-6" />
               </button>
            </div>

          </div>
        ) : (
          <>
             {/* Inactive State Header */}
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
                     <p className="text-[11px] font-bold text-green-600 uppercase mt-1 tracking-wider">Call Interface Ready</p>
                   </div>
                 </div>
               </div>
             </header>

             {/* Inactive State Body */}
             <div className="flex-1 overflow-y-auto p-4 lg:p-8 space-y-8 bg-slate-50">
               {!showFeedback && (
                  <div className="h-full flex flex-col items-center justify-center text-center max-w-md mx-auto">
                     <div className="w-24 h-24 bg-primary-100 rounded-full flex items-center justify-center mb-8 shadow-inner relative">
                        <div className="absolute inset-0 rounded-full border-4 border-primary-200 animate-ping opacity-20"></div>
                        <Video className="w-10 h-10 text-primary-600" />
                     </div>
                     <h3 className="text-3xl font-black text-slate-900 mb-4">Start Video Call</h3>
                     <p className="text-slate-500 font-medium mb-8 leading-relaxed">
                       You are about to start a live video call with Sarah, your AI Recruiter. Ensure your camera and microphone are working.
                     </p>
                     
                     <button 
                        onClick={startInterview}
                        className="px-8 py-4 rounded-full font-bold text-lg transition-all bg-primary-600 text-white shadow-xl shadow-primary-600/30 hover:bg-primary-700 hover:scale-105 flex items-center space-x-3"
                     >
                        <Video className="w-6 h-6" />
                        <span>Join Call Now</span>
                     </button>
                  </div>
               )}
             </div>
          </>
        )}

        {/* Feedback Overlay */}
        <AnimatePresence>
          {showFeedback && (
            <motion.div 
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className="absolute inset-4 z-50 bg-white shadow-2xl rounded-[40px] border border-slate-200 p-8 lg:p-12 overflow-y-auto"
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

                <div className="mt-12 flex flex-col sm:flex-row justify-center items-center space-y-4 sm:space-y-0 sm:space-x-4">
                   <button 
                    onClick={() => { setShowFeedback(false); setMessages([]); }}
                    className="w-full sm:w-auto flex items-center justify-center space-x-2 px-8 py-4 bg-slate-200 text-slate-700 rounded-2xl font-bold hover:bg-slate-300 transition-all"
                   >
                     <RotateCcw className="w-5 h-5"/>
                     <span>Restart Interview</span>
                   </button>
                   <button 
                     onClick={() => { setShowFeedback(false); }}
                     className="w-full sm:w-auto px-8 py-4 bg-primary-600 text-white rounded-2xl font-bold hover:bg-primary-700 shadow-lg shadow-primary-600/20 transition-all"
                   >
                     Go to Dashboard
                   </button>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

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
    <h4 className="font-bold text-slate-500 uppercase text-[10px] tracking-widest text-center">{label}</h4>
  </div>
);

const StrengthItem = ({ text }: { text: string }) => (
  <div className="flex items-center space-x-3 p-4 bg-green-50 rounded-2xl border border-green-100">
    <CheckCircle className="w-5 h-5 text-green-500 shrink-0" />
    <span className="text-sm font-bold text-green-700">{text}</span>
  </div>
);

export default MockInterview;
