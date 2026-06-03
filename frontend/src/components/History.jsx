import React, { useEffect, useState } from 'react';
import Sidebar from './Sidebar';
import apiClient from '../api/axiosConfig';
import { CheckCircle2, Clock } from 'lucide-react';

const History = () => {
    const [student] = useState(JSON.parse(localStorage.getItem('student_data')));
    const [rideHistory, setRideHistory] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const fetchHistory = async () => {
            if (!student) return;
            try {
                const response = await apiClient.get(`/students/booking/history?studentId=${student.id}`);
                setRideHistory(response.data);
            } catch (error) {
                console.error("Failed to fetch history:", error);
            } finally {
                setIsLoading(false);
            }
        };
        fetchHistory();
    }, [student]);

    return (
        <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-fuchsia-500 via-purple-500 to-orange-400 p-4 font-sans text-white">
            <div className="w-full max-w-7xl rounded-[2.5rem] bg-black/20 backdrop-blur-xl border border-white/10 shadow-2xl overflow-hidden flex min-h-[800px]">

                <Sidebar />

                <div className="flex-1 p-10 md:p-16 relative overflow-y-auto max-h-[800px]">
                    <div className="mb-10">
                        <h1 className="text-4xl font-bold mb-2">Transit History</h1>
                        <p className="text-gray-300 text-sm">A complete record of all your campus journeys.</p>
                    </div>

                    <div className="bg-black/30 rounded-3xl p-8 border border-white/5">
                        {isLoading ? (
                            <div className="text-center py-10 text-gray-400 animate-pulse">Loading all trips...</div>
                        ) : rideHistory.length === 0 ? (
                            <div className="text-center py-10">
                                <Clock className="w-12 h-12 text-gray-500 mx-auto mb-4 opacity-50" />
                                <p className="text-gray-400">No rides found in your history.</p>
                            </div>
                        ) : (
                            <div className="space-y-4">
                                {rideHistory.map((trip, index) => (
                                    <div key={index} className="flex items-center justify-between p-4 bg-white/5 rounded-2xl border border-white/10 hover:bg-white/10 transition-colors">
                                        <div className="flex items-center space-x-4">
                                            <div className="p-3 bg-emerald-500/20 rounded-full">
                                                <CheckCircle2 className="w-6 h-6 text-emerald-400" />
                                            </div>
                                            <div>
                                                <p className="font-bold text-lg">{trip.startStop.name} → {trip.endStop.name}</p>
                                                <p className="text-sm text-gray-400">
                                                    {new Date(trip.bookingTime || Date.now()).toLocaleDateString('en-US', { weekday: 'short', month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit' })}
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

export default History;