import React, { useState } from 'react';
import { LineChart, Users, Server, Activity, UserCog, FileText, Download, Trash2, Plus } from 'lucide-react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, LineChart as RechartsLineChart, Line } from 'recharts';
import CyberButton from '../components/CyberButton';

const data = [
    { name: '08:00', students: 120 },
    { name: '09:00', students: 450 },
    { name: '10:00', students: 890 },
    { name: '11:00', students: 230 },
    { name: '12:00', students: 150 },
];

export default function AuthorityPortal() {
    const [activeTab, setActiveTab] = useState('dashboard');

    return (
        <div className="h-full flex flex-col overflow-hidden p-6 gap-6">
            {/* Top Stats Cards */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                <div className="bg-dark-900/50 border border-primary-500/30 rounded-xl p-4 flex items-center gap-4">
                    <div className="w-12 h-12 rounded-full bg-primary-500/10 flex items-center justify-center">
                        <Users className="w-6 h-6 text-primary-400" />
                    </div>
                    <div>
                        <div className="text-2xl font-bold text-white">1,842</div>
                        <div className="text-xs text-dark-400">Total Present</div>
                    </div>
                </div>
                <div className="bg-dark-900/50 border border-danger-500/30 rounded-xl p-4 flex items-center gap-4">
                    <div className="w-12 h-12 rounded-full bg-danger-500/10 flex items-center justify-center">
                        <Users className="w-6 h-6 text-danger-400" />
                    </div>
                    <div>
                        <div className="text-2xl font-bold text-white">156</div>
                        <div className="text-xs text-dark-400">Total Absent</div>
                    </div>
                </div>
                <div className="bg-dark-900/50 border border-warning-500/30 rounded-xl p-4 flex items-center gap-4">
                    <div className="w-12 h-12 rounded-full bg-warning-500/10 flex items-center justify-center">
                        <Clock className="w-6 h-6 text-warning-400" />
                    </div>
                    <div>
                        <div className="text-2xl font-bold text-white">42</div>
                        <div className="text-xs text-dark-400">Late Arrivals</div>
                    </div>
                </div>
                <div className="bg-dark-900/50 border border-success-500/30 rounded-xl p-4 flex items-center gap-4">
                    <div className="w-12 h-12 rounded-full bg-success-500/10 flex items-center justify-center">
                        <Server className="w-6 h-6 text-success-400" />
                    </div>
                    <div>
                        <div className="text-2xl font-bold text-white">99.9%</div>
                        <div className="text-xs text-dark-400">System Uptime</div>
                    </div>
                </div>
            </div>

            {/* Main Content Grid */}
            <div className="flex-1 grid grid-cols-1 lg:grid-cols-3 gap-6 overflow-hidden">

                {/* Left Col - Charts (2/3 width) */}
                <div className="lg:col-span-2 flex flex-col gap-6 overflow-hidden">
                    {/* Peak Entry Graph */}
                    <div className="flex-1 bg-dark-900/50 border border-dark-700 rounded-2xl p-6 flex flex-col">
                        <h3 className="text-lg font-semibold mb-6 flex items-center gap-2">
                            <Activity className="w-5 h-5 text-accent-400" />
                            Peak Entry Times
                        </h3>
                        <div className="flex-1 w-full min-h-[200px]">
                            <ResponsiveContainer width="100%" height="100%">
                                <RechartsLineChart data={data}>
                                    <CartesianGrid strokeDasharray="3 3" stroke="#334155" />
                                    <XAxis dataKey="name" stroke="#94a3b8" />
                                    <YAxis stroke="#94a3b8" />
                                    <Tooltip
                                        contentStyle={{ backgroundColor: '#0f172a', borderColor: '#334155', color: '#f8fafc' }}
                                        itemStyle={{ color: '#38bdf8' }}
                                    />
                                    <Line type="monotone" dataKey="students" stroke="#38bdf8" strokeWidth={3} dot={{ r: 4, fill: '#38bdf8' }} />
                                </RechartsLineChart>
                            </ResponsiveContainer>
                        </div>
                    </div>
                </div>

                {/* Staff Performance Logs */}
                <div className="h-64 bg-dark-900/50 border border-dark-700 rounded-2xl p-6 overflow-hidden flex flex-col">
                    <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
                        <FileText className="w-5 h-5 text-primary-400" />
                        Staff Performance Audit
                    </h3>
                    <div className="overflow-auto flex-1">
                        <table className="w-full text-left text-sm">
                            <thead className="text-xs text-dark-400 uppercase bg-dark-950/50 sticky top-0">
                                <tr>
                                    <th className="px-4 py-2">Staff ID</th>
                                    <th className="px-4 py-2">Action</th>
                                    <th className="px-4 py-2">Target</th>
                                    <th className="px-4 py-2">Time</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-dark-800">
                                {[1, 2, 3, 4, 5].map(i => (
                                    <tr key={i} className="hover:bg-dark-800/50">
                                        <td className="px-4 py-2 text-white">STF-00{i}</td>
                                        <td className="px-4 py-2 text-primary-300">Verified Student</td>
                                        <td className="px-4 py-2 text-dark-300">STU-2025-{100 + i}</td>
                                        <td className="px-4 py-2 text-dark-400 font-mono">10:{30 + i}:00</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>

            {/* Right Col - Management & System Health */}
            <div className="flex flex-col gap-6 overflow-hidden">

                {/* User Role Management */}
                <div className="bg-dark-900/50 border border-dark-700 rounded-2xl p-6">
                    <div className="flex items-center justify-between mb-4">
                        <h3 className="text-lg font-semibold flex items-center gap-2">
                            <UserCog className="w-5 h-5 text-warning-400" />
                            User Management
                        </h3>
                        <CyberButton size="sm" leftIcon={Plus}>Add User</CyberButton>
                    </div>
                    <div className="space-y-3">
                        {[
                            { name: 'Security Team A', role: 'Security', status: 'Active' },
                            { name: 'Exam Centre 1', role: 'Staff', status: 'Active' },
                            { name: 'Exam Centre 2', role: 'Staff', status: 'Inactive' },
                        ].map((user, i) => (
                            <div key={i} className="flex items-center justify-between p-3 bg-dark-950 rounded-xl border border-dark-800">
                                <div>
                                    <div className="text-sm font-medium text-white">{user.name}</div>
                                    <div className="text-xs text-dark-400">{user.role}</div>
                                </div>
                                <div className="flex items-center gap-2">
                                    <span className={`w-2 h-2 rounded-full ${user.status === 'Active' ? 'bg-success-500' : 'bg-dark-600'}`} />
                                    <button className="text-dark-400 hover:text-danger-400 transition-colors">
                                        <Trash2 className="w-4 h-4" />
                                    </button>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* System Health */}
                <div className="flex-1 bg-dark-900/50 border border-dark-700 rounded-2xl p-6 overflow-y-auto">
                    <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
                        <Activity className="w-5 h-5 text-success-400" />
                        System Health
                    </h3>
                    <div className="space-y-4">
                        {[
                            { label: 'Biometric API', status: 'Operational', latency: '45ms' },
                            { label: 'Camera Feeds', status: 'Operational', latency: '24ms' },
                            { label: 'Database Cluster', status: 'Operational', latency: '12ms' },
                            { label: 'Auth Service', status: 'Operational', latency: '55ms' },
                            { label: 'Notification Svc', status: 'Degraded', latency: '120ms' },
                        ].map((service, i) => (
                            <div key={i} className="flex items-center justify-between">
                                <div>
                                    <div className="text-sm font-medium text-dark-200">{service.label}</div>
                                    <div className="text-xs text-dark-500 font-mono">{service.latency}</div>
                                </div>
                                <span className={`px-2 py-1 rounded text-xs font-medium border ${service.status === 'Operational'
                                    ? 'bg-success-500/10 text-success-400 border-success-500/20'
                                    : 'bg-warning-500/10 text-warning-400 border-warning-500/20'
                                    }`}>
                                    {service.status}
                                </span>
                            </div>
                        ))}
                    </div>
                </div>

            </div>
        </div>
    );
}
