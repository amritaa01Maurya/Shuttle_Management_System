import React, { useState } from 'react';

import { ArrowLeft, ArrowRight, Mail, BusFront } from 'lucide-react';
import apiClient from '../api/axiosConfig';
import { useNavigate } from 'react-router-dom';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(''); // errors
  const [isLoading, setIsLoading] = useState(false); 
  
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);

    try {
        const response = await apiClient.post('/students/login', {
            email: email,
            password: password
        })

        const { token, student } = response.data;

        localStorage.setItem('jwt_token', token);
        localStorage.setItem('student_data', JSON.stringify(student));

        navigate('/dashboard');
        console.log("Attempting to login with:", email, password);
        

    } catch (err) {
        if (err.response && err.response.data) {
            // msg from global exception handler
            setError(err.response.data.message || 'Invalid credentials'); 
        } else {
            setError('Cannot connect to the server. Is Spring Boot running?');
        }
    } finally {
      setIsLoading(false);
    }
    
  };

  return (
    // Full screen background mesh gradient
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-fuchsia-500 via-purple-500 to-orange-400 p-4 font-sans text-white">
      
      {/* Main Glassmorphism Container */}
      <div className="relative w-full max-w-6xl rounded-[2.5rem] bg-black/20 backdrop-blur-xl border border-white/10 shadow-2xl overflow-hidden flex flex-col md:flex-row min-h-[700px]">
        
        {/* ================= LEFT SIDE: FORM ================= */}
        <div className="w-full md:w-1/2 p-10 md:p-16 flex flex-col justify-center relative z-10">
          
          {/* Logo */}
          <div className="flex items-center space-x-2 mb-12">
             <BusFront className="w-8 h-8 text-orange-300" />
             <span className="font-bold text-xl tracking-wider">TRANSIT</span>
          </div>

          <h1 className="text-4xl font-bold mb-2">Welcome back</h1>
          <p className="text-gray-300 mb-10 text-sm">Please Enter your Account details</p>

        {/* error ui */}
          {error && (
            <div className="mb-4 p-3 bg-red-500/20 border border-red-500/50 rounded-lg text-red-200 text-sm">
              {error}
            </div>
          )}

          <form onSubmit={handleLogin} className="space-y-6 max-w-sm">
            <div>
              <label className="block text-sm text-gray-300 mb-2 ml-1">Email</label>
              <input 
                type="email" 
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="student@gla.ac.in" 
                className="w-full bg-black/50 text-white rounded-full px-6 py-4 focus:outline-none focus:ring-2 focus:ring-orange-400 border border-transparent transition-all placeholder:text-gray-500"
              />
            </div>

            <div>
              <label className="block text-sm text-gray-300 mb-2 ml-1">Password</label>
              <input 
                type="password" 
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••" 
                className="w-full bg-black/50 text-white rounded-full px-6 py-4 focus:outline-none focus:ring-2 focus:ring-orange-400 border border-transparent transition-all placeholder:text-gray-500 text-2xl tracking-widest"
              />
            </div>

            <div className="flex items-center justify-between text-sm px-1">
              <label className="flex items-center space-x-2 cursor-pointer">
                <input type="checkbox" className="rounded bg-black/50 border-gray-600 text-orange-400 focus:ring-orange-400 w-4 h-4" />
                <span className="text-gray-300">Keep me logged in</span>
              </label>
              <a href="#" className="text-gray-300 hover:text-white transition-colors underline decoration-gray-500 underline-offset-4">Forgot Password</a>
            </div>

            <button 
              type="submit" 
              disabled={isLoading} // disable btn while waiting to connect
              className="w-full bg-gradient-to-r from-orange-300 to-pink-400 text-black font-bold text-lg rounded-full py-4 mt-4 hover:opacity-90 transition-opacity shadow-lg shadow-pink-500/30"
            >
              {isLoading ? 'Connecting...' : 'Sign in'}
            </button>
          </form>

          {/* Social Logins */}
          <div className="mt-12 flex space-x-4 justify-start max-w-sm">
             <button className="bg-white text-black p-3 rounded-full hover:bg-gray-200 transition-colors"><Mail className="w-6 h-6" /></button>
          </div>
        </div>


        {/* ================= RIGHT SIDE: INFO PANEL ================= */}
        {/* Hidden on small screens, shown on md and up */}
        <div className="hidden md:flex w-1/2 p-6 relative">
           <div className="w-full h-full bg-[#0a0a0a] rounded-[2rem] p-12 flex flex-col justify-between relative overflow-hidden border border-white/5">
              
              {/* Starburst Decoration (CSS approximated) */}
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 translate-y-10 w-96 h-96 opacity-30 pointer-events-none">
                 <div className="absolute inset-0 bg-gradient-to-tr from-blue-500 to-purple-500 blur-3xl rounded-full"></div>
              </div>

              <div className="relative z-10">
                <h2 className="text-5xl font-bold leading-tight mb-8">What our<br/>Students Said.</h2>
                <div className="text-6xl text-white/20 font-serif leading-none absolute -top-4 -left-4">"</div>
                <p className="text-gray-300 text-lg leading-relaxed relative z-10 pl-4 border-l-2 border-orange-400/30">
                  "Booking a shuttle to the engineering block is now easier than ever. Just check the routes and tap to ride."
                </p>
                
                <div className="mt-8">
                  <p className="font-bold text-xl">Rahul Sharma</p>
                  <p className="text-sm text-gray-400">Computer Science Dept.</p>
                </div>
              </div>

              {/* Navigation Arrows */}
              <div className="flex space-x-4 relative z-10">
                <button className="bg-pink-400/90 text-black p-4 rounded-xl hover:bg-pink-400 transition-colors">
                  <ArrowLeft className="w-6 h-6" />
                </button>
                <button className="bg-[#1a2f24] text-emerald-400 p-4 rounded-xl hover:bg-[#223d2f] transition-colors border border-emerald-900/50">
                  <ArrowRight className="w-6 h-6" />
                </button>
              </div>
           </div>

           {/* Floating Bottom Card */}
           <div className="absolute -bottom-6 -left-12 bg-white text-black p-8 rounded-[2rem] w-96 shadow-2xl z-20">
              <h3 className="text-xl font-bold mb-3 leading-snug">Optimize your campus commute today</h3>
              <p className="text-gray-600 text-sm mb-6">Join hundreds of students using the smart wallet system to navigate the university efficiently.</p>
              
              {/* Fake Avatars */}
              <div className="flex -space-x-3">
                <div className="w-10 h-10 rounded-full bg-blue-200 border-2 border-white"></div>
                <div className="w-10 h-10 rounded-full bg-pink-200 border-2 border-white"></div>
                <div className="w-10 h-10 rounded-full bg-orange-200 border-2 border-white"></div>
                <div className="w-10 h-10 rounded-full bg-gray-900 text-white flex items-center justify-center text-xs font-bold border-2 border-white">+42</div>
              </div>
           </div>
        </div>

      </div>
    </div>
  );
};

export default Login;