import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { BusFront, Wallet, Clock, MapPin, LogOut, User, Activity, CheckCircle2 } from 'lucide-react';
import apiClient from '../api/axiosConfig';

const Dashboard = () => {
    const navigate = useNavigate();
    const [student, setStudent] = useState(null);

    // ride history
    const [rideHistory, setRideHistory] = useState([])
    const [isLoadingHistory, setIsLoadingHistory] = useState(true);

    // load student data when the dashboard opens
    useEffect(() => {
        const studentData = localStorage.getItem('student_data');
        if (studentData) {
            setStudent(JSON.parse(studentData));
        }
    }, []);

    // fetch ride history after student data loaded
    useEffect(() => {
        const fetchHistory = async () => {
            if (!student) return;

            try {
                const response = await apiClient.get(`/students/booking/history?studentId=${student.id}`);
                setRideHistory(response.data);
            } catch (error) {
                console.error("Failed to fetch history:", error);
            } finally {
                setIsLoadingHistory(false);
            }
        };

        fetchHistory();
    }, [student]);// render when student changes

    // Handle Logout
    const handleLogout = () => {
        localStorage.removeItem('jwt_token');
        localStorage.removeItem('student_data');
        navigate('/login');
    };

    if (!student) return <div className="text-white text-center mt-20">Loading...</div>;

    return (
        // gradient bachground
        <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-fuchsia-500 via-purple-500 to-orange-400 p-4 font-sans text-white">

            {/* glassmorphism*/}
            <div className="w-full max-w-7xl rounded-[2.5rem] bg-black/20 backdrop-blur-xl border border-white/10 shadow-2xl overflow-hidden flex min-h-[800px]">

                {/* sidebar */}
                <div className="w-64 border-r border-white/10 p-8 flex flex-col justify-between bg-black/10">
                    <div>
                        <div className="flex items-center space-x-2 mb-16">
                            <BusFront className="w-8 h-8 text-orange-300" />
                            <span className="font-bold text-xl tracking-wider">TRANSIT</span>
                        </div>

                        <nav className="space-y-6">
                            <button className="flex items-center space-x-4 text-orange-300 font-bold w-full text-left">
                                <Activity className="w-5 h-5" />
                                <span>Overview</span>
                            </button>
                            <button className="flex items-center space-x-4 text-gray-400 hover:text-white transition-colors w-full text-left">
                                <MapPin className="w-5 h-5" />
                                <span>Book Ride</span>
                            </button>
                            <button className="flex items-center space-x-4 text-gray-400 hover:text-white transition-colors w-full text-left">
                                <Clock className="w-5 h-5" />
                                <span>History</span>
                            </button>
                            <button className="flex items-center space-x-4 text-gray-400 hover:text-white transition-colors w-full text-left">
                                <User className="w-5 h-5" />
                                <span>Profile</span>
                            </button>
                        </nav>
                    </div>

                    <button onClick={handleLogout} className="flex items-center space-x-4 text-red-400 hover:text-red-300 transition-colors w-full text-left">
                        <LogOut className="w-5 h-5" />
                        <span>Sign out</span>
                    </button>
                </div>

                {/* main */}
                <div className="flex-1 p-10 md:p-16 relative overflow-y-auto">

                    {/* Header */}
                    <div className="flex justify-between items-center mb-12">
                        <div>
                            <h1 className="text-4xl font-bold mb-2">Welcome back, {student.name.split(' ')[0]} 😀</h1>
                            <p className="text-gray-300 text-sm">Here is your campus transit overview.</p>
                        </div>

                        <div className="flex items-center space-x-3 bg-black/30 rounded-full px-5 py-2 border border-white/5">
                            <User className="w-5 h-5 text-gray-400" />
                            <span className="text-sm font-medium">{student.email}</span>
                        </div>
                    </div>

                    {/* Quick Stats Grid */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">

                        {/* Wallet Card */}
                        <div className="bg-gradient-to-r from-orange-400/80 to-pink-500/80 rounded-3xl p-8 relative overflow-hidden border border-white/20 shadow-lg">
                            <div className="absolute top-0 right-0 -mt-4 -mr-4 w-32 h-32 bg-white/10 rounded-full blur-2xl"></div>
                            <div className="flex items-center space-x-4 mb-4 relative z-10">
                                <div className="p-3 bg-black/20 rounded-full">
                                    <Wallet className="w-6 h-6 text-white" />
                                </div>
                                <h3 className="text-xl font-medium text-white/90">Transit Wallet</h3>
                            </div>
                            <p className="text-5xl font-bold tracking-tight relative z-10">
                                {student.walletBalance} <span className="text-xl font-normal opacity-80">pts</span>
                            </p>
                        </div>

                        {/* book a ride */}
                        <div className="bg-[#0a0a0a]/60 rounded-3xl p-8 border border-white/5 flex flex-col justify-center hover:bg-[#0a0a0a]/80 transition-colors cursor-pointer group">
                            <div className="flex items-center space-x-4 mb-2">
                                <div className="p-3 bg-blue-500/20 text-blue-400 rounded-full group-hover:scale-110 transition-transform">
                                    <BusFront className="w-6 h-6" />
                                </div>
                                <h3 className="text-xl font-bold">Book a Shuttle</h3>
                            </div>
                            <p className="text-gray-400 text-sm mb-6 ml-14">Check routes and reserve your seat instantly.</p>
                            <button className="ml-14 bg-white text-black px-6 py-2 rounded-full font-bold text-sm self-start hover:bg-gray-200 transition-colors">
                                Book Now
                            </button>
                        </div>

                    </div>

                    {/* History */}
                    <div className="bg-black/30 rounded-3xl p-8 border border-white/5">
                        <h3 className="text-xl font-bold mb-6">Recent Journeys</h3>
                        {isLoadingHistory ? (
                            <div className="text-center py-10 text-gray-400 animate-pulse">Loading your trips...</div>
                        ) : rideHistory.length === 0 ? (
                            <div className="text-center py-10">
                                <Clock className="w-12 h-12 text-gray-500 mx-auto mb-4 opacity-50" />
                                <p className="text-gray-400">No recent rides found.</p>
                                <p className="text-sm text-gray-500 mt-1">When you book a shuttle, your history will appear here.</p>
                            </div>
                        ) : (
                            <div className="space-y-4">
                                {/* Map through the backend data */}
                                {rideHistory.map((trip, index) => (
                                    <div key={index} className="flex items-center justify-between p-4 bg-white/5 rounded-2xl border border-white/10 hover:bg-white/10 transition-colors">

                                        <div className="flex items-center space-x-4">
                                            <div className="p-3 bg-emerald-500/20 rounded-full">
                                                <CheckCircle2 className="w-6 h-6 text-emerald-400" />
                                            </div>
                                            <div>
                                                
                                                <p className="font-bold text-lg"> {trip.startStop.name} →  {trip.endStop.name}</p>
                                                <p className="text-sm text-gray-400">
                                                    {new Date(trip.bookingTime || Date.now()).toLocaleDateString('en-US', { weekday: 'short', month: 'short', day: 'numeric' })}
                                                </p>
                                            </div>
                                        </div>

                                        <div className="text-right">
                                            <p className="font-bold text-orange-400">- {trip.fareDeducted || 0} pts</p>
                                            <p className="text-xs text-gray-500">Completed</p>
                                        </div>

                                    </div>
                                ))}
                            </div>
                        )}
                    </div>

                </div>
            </div>
        </div>
    );
};

export default Dashboard;