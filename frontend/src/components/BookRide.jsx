import React, { useState, useEffect } from 'react';
import Sidebar from './Sidebar';
import RouteSelector from './RouteSelector';
import apiClient from '../api/axiosConfig';
import { BusFront, CheckCircle2, AlertCircle } from 'lucide-react';

const BookRide = () => {
    const [student, setStudent] = useState(JSON.parse(localStorage.getItem('student_data')));
    const [stops, setStops] = useState([]);

    const [startStop, setStartStop] = useState('');
    const [endStop, setEndStop] = useState('');

    const [estimatedFare, setEstimatedFare] = useState(null);
    const [isEstimating, setIsEstimating] = useState(false);

    const [isBooking, setIsBooking] = useState(false);
    const [message, setMessage] = useState(null);

    // Load available stops when page opens
    useEffect(() => {
        const fetchStops = async () => {
            try {
                const response = await apiClient.get('/stops');
                setStops(response.data);
            } catch (error) {
                console.error("Failed to fetch stops:", error);
            }
        };
        fetchStops();
    }, []);

    //   estimate fare in real-time
    useEffect(() => {
        const getEstimate = async () => {
            if (startStop && endStop) {
                setIsEstimating(true);
                try {
                    const response = await apiClient.get('/students/booking/estimate', {
                        params: { startId: startStop, endId: endStop }
                    });

                    setEstimatedFare(response.data.farePoints || 0);

                } catch (err) {
                    console.error("Estimation failed", err);
                    setEstimatedFare(null);
                } finally {
                    setIsEstimating(false);
                }
            } else {
                setEstimatedFare(null);
            }
        };

        getEstimate();
    }, [startStop, endStop]);

    const handleBookRide = async () => {
        if (!startStop || !endStop) {
            setMessage({ type: 'error', text: 'Please select both pickup and drop-off locations.' });
            return;
        }

        setIsBooking(true);
        setMessage(null);

        try {
            const response = await apiClient.post('/students/booking/book', null, {
                params: {
                    studentId: student.id,
                    startId: startStop,
                    endId: endStop
                }
            });

            setMessage({ type: 'success', text: `Success! Ride booked. Fare deducted: ${response.data.fareDeducted} pts.` });
            const updatedStudent = { ...student, walletBalance: student.walletBalance - response.data.fareDeducted };
            setStudent(updatedStudent);
            localStorage.setItem('student_data', JSON.stringify(updatedStudent));

            setStartStop('');
            setEndStop('');
            setEstimatedFare(null);

        } catch (err) {
            const errorMsg = err.response?.data?.message || 'Failed to book the ride. Please try again.';
            setMessage({ type: 'error', text: errorMsg });
        } finally {
            setIsBooking(false);
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-fuchsia-500 via-purple-500 to-orange-400 p-4 font-sans text-white">
            <div className="w-full max-w-7xl rounded-[2.5rem] bg-black/20 backdrop-blur-xl border border-white/10 shadow-2xl overflow-hidden flex min-h-[800px]">

                <Sidebar />

                <div className="flex-1 p-10 md:p-16 relative overflow-y-auto">
                    <div className="mb-12">
                        <h1 className="text-4xl font-bold mb-2">Book a Shuttle</h1>
                        <p className="text-gray-300 text-sm">Reserve your seat and manage your transit route.</p>
                    </div>

                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">

                        {/* The Form Component */}
                        <div className="space-y-8">
                            <RouteSelector
                                stops={stops}
                                startStop={startStop} setStartStop={setStartStop}
                                endStop={endStop} setEndStop={setEndStop}
                            />

                            {/* Status Messages */}
                            {message && (
                                <div className={`p-4 rounded-2xl flex items-center space-x-3 border ${message.type === 'error' ? 'bg-red-500/20 border-red-500/50 text-red-200' : 'bg-emerald-500/20 border-emerald-500/50 text-emerald-200'}`}>
                                    {message.type === 'error' ? <AlertCircle className="w-5 h-5" /> : <CheckCircle2 className="w-5 h-5" />}
                                    <p>{message.text}</p>
                                </div>
                            )}
                        </div>

                        {/* Booking Summary Panel */}
                        <div className="bg-[#0a0a0a]/60 rounded-3xl p-8 border border-white/5 h-fit">
                            <h3 className="text-xl font-bold mb-6">Trip Summary</h3>

                            <div className="bg-black/40 rounded-2xl p-6 mb-8 border border-white/5 space-y-4">
                                <div className="flex justify-between text-gray-300">
                                    <span>Current Wallet Balance</span>
                                    <span className="font-bold text-white">{student.walletBalance} pts</span>
                                </div>
                                <div className="flex justify-between text-gray-300">
                                    <span>Estimated Fare</span>
                                    <span className="font-bold text-orange-400">{isEstimating ? 'Calculating...' : estimatedFare ? `- ${estimatedFare} pts` : '---'}</span> {/* Change this to dynamic fare if your API provides it! */}
                                </div>
                                <hr className="border-white/10" />
                                <div className="flex justify-between text-white">
                                    <span>Balance After Ride</span>
                                    <span className="font-bold text-emerald-400">{estimatedFare ? `${student.walletBalance - estimatedFare} pts` : '---'}</span>
                                </div>
                            </div>

                            <button
                                onClick={handleBookRide}
                                disabled={isBooking || !startStop || !endStop}
                                className="w-full flex items-center justify-center space-x-2 bg-gradient-to-r from-orange-300 to-pink-400 text-black font-bold text-lg rounded-full py-4 hover:opacity-90 transition-opacity shadow-lg shadow-pink-500/30 disabled:opacity-50 disabled:cursor-not-allowed"
                            >
                                <BusFront className="w-6 h-6" />
                                <span>{isBooking ? 'Processing...' : 'Confirm Booking'}</span>
                            </button>
                        </div>

                    </div>
                </div>
            </div>
        </div>
    );
};

export default BookRide;