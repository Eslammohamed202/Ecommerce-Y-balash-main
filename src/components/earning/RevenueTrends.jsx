'use client';
import React, { useState } from 'react';
import {
    BarChart,
    Bar,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    Legend,
    ResponsiveContainer,
} from 'recharts';

const data = [
    { month: 'Jan', lifetime: 8.7, cost: 8.5 },
    { month: 'Feb', lifetime: 8.4, cost: 8.6 },
    { month: 'Mar', lifetime: 8.5, cost: 8.1 },
    { month: 'Apr', lifetime: 8.1, cost: 8.3 },
    { month: 'May', lifetime: 8.7, cost: 8.3 },
    { month: 'Jun', lifetime: 8.5, cost: 8.2 },
];

const RevenueTrends = () => {
    const [activeTab, setActiveTab] = useState('Revenue');

    return (
        <div className="bg-white p-4 rounded-xl shadow-md container mt-12 mb-12">
            <div className="flex items-center justify-between mb-4">
                <h2 className="text-lg font-semibold text-[#1C573E]">Revenue Trends</h2>
                <div className="flex gap-2 text-sm font-medium">
                    <button
                        className={`px-3 py-1 rounded ${activeTab === 'Revenue' ? 'bg-[#1C573E] text-white' : 'text-gray-600'
                            }`}
                        onClick={() => setActiveTab('Revenue')}
                    >
                        Revenue
                    </button>
                    <button
                        className={`px-3 py-1 rounded ${activeTab === 'Orders' ? 'bg-[#1C573E] text-white' : 'text-gray-600'
                            }`}
                        onClick={() => setActiveTab('Orders')}
                    >
                        Orders
                    </button>
                </div>
            </div>

            <ResponsiveContainer width="100%" height={350}>
                <BarChart data={data} barSize={20}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="month" />
                    <YAxis domain={[8.0, 8.8]} unit="m" />
                    <Tooltip />
                    <Legend />
                    <Bar
                        dataKey="lifetime"
                        fill="#1C573E"
                        name="Lifetime Value"
                        radius={[10, 10, 0, 0]}
                    />
                    <Bar

                        dataKey="cost"
                        fill="#FFCC29"
                        name="Customer Cost"
                        radius={[10, 10, 0, 0]}
                    />
                </BarChart>
            </ResponsiveContainer>

        </div>
    );
};

export default RevenueTrends;
