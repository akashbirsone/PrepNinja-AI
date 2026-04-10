import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import LandingPage from './pages/LandingPage';
import Dashboard from './pages/Dashboard';
import AptitudeSystem from './pages/AptitudeSystem';
import MockInterview from './pages/MockInterview';
import AdminDashboard from './pages/AdminDashboard';
import Login from './pages/Login';
import Register from './pages/Register';
import Pricing from './pages/Pricing';
import ResumeBuilder from './pages/ResumeBuilder';

function App() {
  return (
    <Router>
      <Toaster position="top-right" />
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/pricing" element={<Pricing />} />
        
        {/* Protected Routes (Simulated) */}
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/aptitude/*" element={<AptitudeSystem />} />
        <Route path="/interview" element={<MockInterview />} />
        <Route path="/resume" element={<ResumeBuilder />} />
        <Route path="/admin" element={<AdminDashboard />} />
        
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </Router>
  );
}

export default App;
