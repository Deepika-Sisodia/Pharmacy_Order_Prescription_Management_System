import React, { useState } from 'react';
import { MapPin, Box, ShieldCheck, ChevronRight, Phone, Navigation } from 'lucide-react';

const OrderCard = ({ order, onStatusUpdate, icon }) => {
    const [showOtpInput, setShowOtpInput] = useState(false);
    const [otp, setOtp] = useState('');
    const [error, setError] = useState('');

    const handleAction = () => {
        if (order.status === 'Assigned') {
            onStatusUpdate(order.id, 'Picked Up');
        } else if (order.status === 'Picked Up') {
            if (order.isSecure) {
                setShowOtpInput(true);
            } else {
                onStatusUpdate(order.id, 'Delivered');
            }
        }
    };

    const verifyOtp = () => {
        if (otp === '1234') {
            onStatusUpdate(order.id, 'Delivered');
            setShowOtpInput(false);
            setOtp('');
            setError('');
        } else {
            setError('Invalid OTP');
        }
    };

    return (
        <div className="bg-white rounded-2xl shadow-card hover:shadow-card-hover transition-all duration-300 overflow-hidden border border-gray-100 group flex flex-col h-full">
            {/* Card Header */}
            <div className="p-5 border-b border-gray-50 bg-gray-50/50">
                <div className="flex justify-between items-start">
                    <div className="flex items-center gap-3">
                        <div className="p-2.5 bg-white rounded-xl shadow-sm border border-gray-100 group-hover:border-teal-300 group-hover:text-teal-700 transition-colors">
                            {icon}
                        </div>
                        <div>
                            <h3 className="text-base font-bold text-gray-900">{order.id}</h3>
                            <span className={`text-[11px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full inline-flex items-center gap-1 mt-1 ${order.status === 'Delivered' ? 'bg-green-100 text-green-700' :
                                order.status === 'Picked Up' ? 'bg-yellow-100 text-yellow-700' :
                                    'bg-blue-100 text-blue-700'
                                }`}>
                                {order.status}
                            </span>
                        </div>
                    </div>
                    {order.isSecure && (
                        <div className="flex items-center gap-1.5 text-teal-700 bg-teal-50 px-2.5 py-1.5 rounded-lg border border-teal-200" title="Secure Handover Required">
                            <ShieldCheck size={14} />
                            <span className="text-[10px] font-bold uppercase tracking-wider">Secure</span>
                        </div>
                    )}
                </div>
            </div>

            {/* Card Body */}
            <div className="p-5 flex-1 space-y-4">
                <div className="space-y-3">
                    <div className="flex items-start gap-3">
                        <div className="mt-1 text-gray-400"><MapPin size={18} /></div>
                        <div>
                            <p className="font-semibold text-gray-900 text-sm">{order.customerName}</p>
                            <p className="text-gray-500 text-sm leading-relaxed">{order.address}</p>
                        </div>
                    </div>

                    <div className="flex items-start gap-3">
                        <div className="mt-1 text-gray-400"><Box size={18} /></div>
                        <div className="flex-1">
                            <p className="text-xs font-medium text-gray-400 uppercase tracking-wide mb-2">Prescription Items</p>
                            <div className="flex flex-wrap gap-2">
                                {order.items.map((item, idx) => (
                                    <span key={idx} className="inline-flex items-center px-2.5 py-1 bg-gray-50 text-gray-700 rounded-md text-xs font-medium border border-gray-100">
                                        {item}
                                    </span>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Card Footer / Actions */}
            <div className="p-5 pt-0 mt-auto">
                {order.status !== 'Delivered' ? (
                    <div className="space-y-3">
                        {/* Quick Actions */}
                        <div className="flex gap-2 mb-4">
                            <button className="flex-1 py-2 flex items-center justify-center gap-2 text-sm font-medium text-gray-600 bg-gray-50 hover:bg-gray-100 rounded-lg transition-colors border border-gray-200">
                                <Phone size={16} /> Call
                            </button>
                            <button className="flex-1 py-2 flex items-center justify-center gap-2 text-sm font-medium text-gray-600 bg-gray-50 hover:bg-gray-100 rounded-lg transition-colors border border-gray-200">
                                <Navigation size={16} /> Map
                            </button>
                        </div>

                        {!showOtpInput ? (
                            <button
                                onClick={handleAction}
                                className={`w-full py-3 px-4 rounded-xl font-bold text-white shadow-md hover:shadow-lg transition-all transform active:scale-[0.98] flex items-center justify-center gap-2 ${order.status === 'Assigned'
                                    ? 'bg-teal-600 hover:bg-teal-700'
                                    : 'bg-teal-700 hover:bg-teal-800'
                                    }`}
                            >
                                {order.status === 'Assigned' ? 'Pick Up Order' : 'Complete Delivery'}
                                <ChevronRight size={18} />
                            </button>
                        ) : (
                            <div className="bg-gray-50 p-4 rounded-xl border border-gray-100 animate-in fade-in slide-in-from-bottom-2">
                                <p className="text-sm text-gray-700 font-semibold mb-3 text-center">Enter Customer OTP</p>
                                <div className="flex gap-2 mb-3">
                                    <input
                                        type="text"
                                        value={otp}
                                        onChange={(e) => setOtp(e.target.value)}
                                        placeholder="••••"
                                        maxLength={4}
                                        className="flex-1 bg-white border border-gray-200 rounded-lg px-3 py-2.5 text-center tracking-[0.5em] font-mono text-lg font-bold text-teal-700 focus:outline-none focus:ring-2 focus:ring-teal-500/20 focus:border-teal-700 transition-all"
                                        autoFocus
                                    />
                                </div>
                                {error && <p className="text-red-500 text-xs text-center mb-3 font-medium">{error}</p>}

                                <div className="flex gap-2">
                                    <button
                                        onClick={() => setShowOtpInput(false)}
                                        className="flex-1 py-2 text-xs font-medium text-gray-500 hover:text-gray-700 hover:bg-gray-100 rounded-lg transition-colors"
                                    >
                                        Cancel
                                    </button>
                                    <button
                                        onClick={verifyOtp}
                                        className="flex-[2] bg-teal-700 text-white px-4 py-2 rounded-lg hover:bg-teal-800 font-bold text-sm transition-colors shadow-sm"
                                    >
                                        Verify & Complete
                                    </button>
                                </div>
                            </div>
                        )}
                    </div>
                ) : (
                    <div className="bg-green-50 text-green-700 py-3 px-4 rounded-xl flex items-center justify-center gap-2 font-bold text-sm border border-green-100">
                        <CheckCircle size={18} />
                        Delivery Completed
                    </div>
                )}
            </div>
        </div>
    );
};

export default OrderCard;
