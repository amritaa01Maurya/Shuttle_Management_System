import React, { useState } from 'react';
import Sidebar from './Sidebar';
import { User, Mail, Camera, Wallet } from 'lucide-react';

const Profile = () => {
    const [student] = useState(JSON.parse(localStorage.getItem('student_data')));

    if (!student) return <div className="text-white text-center mt-20">Loading...</div>;

    return (
        <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-fuchsia-500 via-purple-500 to-orange-400 p-4 font-sans text-white">
            <div className="w-full max-w-7xl rounded-[2.5rem] bg-black/20 backdrop-blur-xl border border-white/10 shadow-2xl overflow-hidden flex min-h-[800px]">

                <Sidebar />

                <div className="flex-1 p-10 md:p-16 relative overflow-y-auto">
                    <div className="mb-10">
                        <h1 className="text-4xl font-bold mb-2">My Profile</h1>
                        <p className="text-gray-300 text-sm">Manage your account details and preferences.</p>
                    </div>

                    <div className="max-w-4xl space-y-8">

                        {/*  */}
                        <div className="bg-black/30 rounded-3xl p-8 border border-white/5 relative overflow-hidden flex flex-col md:flex-row items-center md:items-start gap-8">
                            <div className="absolute top-0 right-0 w-64 h-64 bg-pink-500/10 rounded-full blur-3xl pointer-events-none"></div>

                            {/* Avatar Section */}
                            <div className="relative group">
                                <div className="w-32 h-32 rounded-full bg-gradient-to-r from-orange-300 to-pink-400 p-1">
                                    <div className="w-full h-full rounded-full bg-[#1a1a1a] flex items-center justify-center overflow-hidden">
                                        <User className="w-12 h-12 text-gray-400" />
                                    </div>
                                </div>
                                
                                <button className="absolute bottom-0 right-0 p-3 bg-white text-black rounded-full shadow-lg hover:bg-gray-200 transition-colors opacity-0 group-hover:opacity-100">
                                    <Camera className="w-4 h-4" />
                                </button>
                            </div>

                            {/* User Details */}
                            <div className="flex-1 text-center md:text-left z-10 pt-2">
                                <h2 className="text-3xl font-bold mb-1">{student.name}</h2>
                                <div className="flex items-center justify-center md:justify-start space-x-2 text-gray-400 mb-6">
                                    <Mail className="w-4 h-4" />
                                    <span>{student.email}</span>
                                </div>

                                <div className="grid grid-cols-2 gap-4 max-w-sm">
                                    <div className="bg-white/5 rounded-2xl p-4 border border-white/5">
                                        <p className="text-xs text-gray-500 mb-1">Student ID</p>
                                        <p className="font-mono font-bold text-lg">#{student.id}</p>
                                    </div>
                                    <div className="bg-white/5 rounded-2xl p-4 border border-white/5">
                                        <p className="text-xs text-gray-500 mb-1">Role</p>
                                        <p className="font-bold text-lg text-emerald-400">{student.role.replace('ROLE_', '')}</p>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Setting */}
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

                            {/* Wallet & Payment */}
                            <button className="bg-white/5 hover:bg-white/10 transition-colors rounded-3xl p-6 border border-white/5 flex items-center space-x-5 text-left group">
                                <div className="p-4 bg-orange-500/20 text-orange-400 rounded-full group-hover:scale-110 transition-transform">
                                    <Wallet className="w-6 h-6" />
                                </div>
                                <div>
                                    <h3 className="font-bold text-lg">Wallet Settings</h3>
                                    <p className="text-sm text-gray-400">Current Balance: {student.walletBalance} pts</p>
                                </div>
                            </button>

                            

                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Profile;