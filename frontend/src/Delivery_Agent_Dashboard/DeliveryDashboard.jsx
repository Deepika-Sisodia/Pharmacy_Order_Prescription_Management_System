import React, { useState } from 'react';
import OrderCard from './OrderCard';
import { Package, Truck, CheckCircle, Search, Bell, User, Menu } from 'lucide-react';

const DeliveryDashboard = () => {
    const [orders, setOrders] = useState([
        {
            id: 'ORD-001',
            customerName: 'John Doe',
            address: '123 Main St, Springfield',
            items: ['Paracetamol', 'Vitamin C'],
            status: 'Picked Up',
            isSecure: true,
        },
        {
            id: 'ORD-002',
            customerName: 'Jane Smith',
            address: '456 Oak Ave, Metropolis',
            items: ['Ibuprofen'],
            status: 'Assigned',
            isSecure: false,
        },
        {
            id: 'ORD-003',
            customerName: 'Alice Johnson',
            address: '789 Pine Ln, Gotham',
            items: ['Amoxicillin', 'Cough Syrup'],
            status: 'Picked Up',
            isSecure: true,
        },
    ]);

    const handleStatusUpdate = (orderId, newStatus) => {
        setOrders(orders.map(order =>
            order.id === orderId ? { ...order, status: newStatus } : order
        ));
    };

    const getStatusIcon = (status) => {
        switch (status) {
            case 'Assigned': return <Package className="w-5 h-5 text-blue-600" />;
            case 'Picked Up': return <Truck className="w-5 h-5 text-yellow-600" />;
            case 'Delivered': return <CheckCircle className="w-5 h-5 text-green-600" />;
            default: return <Package className="w-5 h-5" />;
        }
    };

    return (
        <div className="min-h-screen bg-background font-sans text-text-primary">
            {/* Top Navigation Bar */}
            <header className="bg-white shadow-sm sticky top-0 z-20 border-b border-gray-200">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
                    <div className="flex items-center gap-4">
                        <Menu className="w-6 h-6 text-gray-600 lg:hidden" />
                        <div className="flex items-center gap-2">
                            {/* Logo Placeholder */}
                            <div className="w-8 h-8 bg-teal-700 rounded-lg flex items-center justify-center text-white font-bold">
                                <span className="text-lg">P</span>
                            </div>
                            <span className="text-xl font-bold text-teal-700 tracking-tight hidden sm:block">PharmaTech</span>
                        </div>
                    </div>

                    <div className="flex items-center gap-6">
                        <div className="hidden md:flex items-center gap-6 text-sm font-medium text-gray-600">
                            <span className="hover:text-teal-700 cursor-pointer">Dashboard</span>
                            <span className="hover:text-teal-700 cursor-pointer">History</span>
                            <span className="hover:text-teal-700 cursor-pointer">Earnings</span>
                        </div>
                        <div className="flex items-center gap-4">
                            <button className="relative p-2 text-gray-500 hover:bg-gray-100 rounded-full transition-colors">
                                <Bell className="w-6 h-6" />
                                <span className="absolute top-1.5 right-1.5 w-2.5 h-2.5 bg-red-500 rounded-full border-2 border-white"></span>
                            </button>
                            <div className="w-9 h-9 rounded-full bg-teal-100 flex items-center justify-center text-teal-700 font-semibold cursor-pointer hover:bg-teal-200 transition-colors">
                                <User className="w-5 h-5" />
                            </div>
                        </div>
                    </div>
                </div>
            </header>

            {/* Hero Section */}
            <div className="bg-teal-700 text-white py-12 px-4 relative overflow-hidden">
                <div className="absolute top-0 right-0 w-64 h-64 bg-white/5 rounded-full -translate-y-1/2 translate-x-1/3 blur-3xl"></div>
                <div className="absolute bottom-0 left-0 w-48 h-48 bg-teal-600/20 rounded-full translate-y-1/3 -translate-x-1/4 blur-2xl"></div>

                <div className="max-w-7xl mx-auto relative z-10">
                    <p className="text-white text-lg mb-2">
                        You have <span className="font-bold">{orders.filter(o => o.status !== 'Delivered').length} active orders</span> assigned to you today. Deliver smiles and essential medicines safely.
                    </p>

                    {/* Search Bar in Hero */}
                    <div className="mt-6 max-w-2xl relative">
                        <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                            <Search className="h-5 w-5 text-gray-400" />
                        </div>
                        <input
                            type="text"
                            className="block w-full pl-11 pr-4 py-4 bg-white text-gray-900 rounded-xl shadow-lg focus:ring-2 focus:ring-teal-500 focus:outline-none transition-shadow"
                            placeholder="Search by Order ID, Customer Name, or Address..."
                        />
                    </div>
                </div>
            </div>

            {/* Main Content */}
            <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 -mt-8 relative z-10">
                <div className="flex items-center justify-between mb-6">
                    <h2 className="text-xl font-bold text-gray-800">Assigned Deliveries</h2>
                    <div className="flex gap-2">
                        <select className="bg-white border border-gray-200 text-sm rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-teal-500">
                            <option>All Status</option>
                            <option>Assigned</option>
                            <option>Picked Up</option>
                        </select>
                    </div>
                </div>

                <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                    {orders.map(order => (
                        <OrderCard
                            key={order.id}
                            order={order}
                            onStatusUpdate={handleStatusUpdate}
                            icon={getStatusIcon(order.status)}
                        />
                    ))}
                </div>
            </main>
        </div>
    );
};

export default DeliveryDashboard;
