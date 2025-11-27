import React, { useState } from 'react';
import { Shield, AlertTriangle, Lock, Unlock, Clock, UserX, Search, Filter, AlertOctagon, FileText, X } from 'lucide-react';
import CyberButton from '../components/CyberButton';

export default function SecurityPortal() {
    const [isLockdown, setIsLockdown] = useState(false);
    const [showIncidentForm, setShowIncidentForm] = useState(false);
    const [gateStatus, setGateStatus] = useState({ main: 'open', side: 'locked' });

    const [logs, setLogs] = useState([
        { id: 1, time: '10:45:22', event: 'Entry Granted', user: 'STU001 - Aarav Patel', gate: 'Main Gate A', status: 'success' },
        { id: 2, time: '10:44:10', event: 'Entry Denied', user: 'Unknown ID', gate: 'Side Gate B', status: 'danger' },
        { id: 3, time: '10:42:05', event: 'Entry Granted', user: 'STU004 - Ananya Singh', gate: 'Main Gate A', status: 'success' },
        { id: 4, time: '10:40:00', event: 'Blacklist Alert', user: 'BL-882 - Suspicious Device', gate: 'Library Entrance', status: 'critical' },
        { id: 5, time: '10:38:15', event: 'Entry Granted', user: 'CEN005 - Staff Member', gate: 'Staff Gate', status: 'success' },
    ]);

    const toggleGate = (gate) => {
        setGateStatus(prev => ({
            ...prev,
            [gate]: prev[gate] === 'open' ? 'locked' : 'open'
        }));
    };

    return (
        <div className="h-full flex flex-col md:flex-row overflow-hidden relative">
            {/* Main Feed - Timeline Layout */}
            <div className="flex-1 flex flex-col p-4 md:p-6 gap-6 overflow-hidden">

                {/* Header & Controls */}
                <div className="flex items-center justify-between">
                    <h2 className="text-xl font-bold flex items-center gap-2">
                        <Shield className="w-6 h-6 text-primary-400" />
                        Security Feed
                    </h2>
                    <div className="flex gap-2">
                        <CyberButton variant="outline" size="sm" leftIcon={Filter}>Filter</CyberButton>
                        <CyberButton variant="outline" size="sm" leftIcon={Search}>Search</CyberButton>
                        <CyberButton
                            variant="default"
                            size="sm"
                            leftIcon={FileText}
                            onClick={() => setShowIncidentForm(true)}
                        >
                            Report Incident
                        </CyberButton>
                    </div>
                </div>

                {/* Gate Entry Logs (Timeline) */}
                <div className="flex-1 overflow-y-auto pr-2 space-y-4">
                    {logs.map((log) => (
                        <div key={log.id} className={`relative pl-6 pb-6 border-l-2 ${log.status === 'critical' ? 'border-danger-500' :
                                log.status === 'danger' ? 'border-warning-500' : 'border-primary-500/30'
                            } last:border-0`}>
                            <div className={`absolute -left-[9px] top-0 w-4 h-4 rounded-full border-2 ${log.status === 'critical' ? 'bg-danger-900 border-danger-500' :
                                    log.status === 'danger' ? 'bg-warning-900 border-warning-500' : 'bg-dark-900 border-primary-500'
                                }`} />

                            <div className={`p-4 rounded-xl border ${log.status === 'critical' ? 'bg-danger-900/20 border-danger-500/50' :
                                    log.status === 'danger' ? 'bg-warning-900/10 border-warning-500/30' : 'bg-dark-900/50 border-dark-700'
                                } hover:bg-dark-800/50 transition-colors`}>
                                <div className="flex justify-between items-start mb-1">
                                    <span className={`text-sm font-bold ${log.status === 'critical' ? 'text-danger-400' :
                                            log.status === 'danger' ? 'text-warning-400' : 'text-primary-300'
                                        }`}>{log.event}</span>
                                    <span className="text-xs text-dark-400 font-mono flex items-center gap-1">
                                        <Clock className="w-3 h-3" /> {log.time}
                                    </span>
                                </div>
                                <div className="text-sm text-govNavy-700 mb-1">{log.user}</div>
                                <div className="text-xs text-dark-400">{log.gate}</div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            {/* Sidebar - Alerts & Actions */}
            <div className="w-full md:w-80 bg-dark-950/80 border-l border-dark-800 p-4 flex flex-col gap-6 overflow-y-auto">

                {/* Emergency Lockdown */}
                <div className={`p-5 rounded-2xl border-2 transition-all duration-300 ${isLockdown
                        ? 'bg-danger-900/30 border-danger-500 shadow-glow-danger'
                        : 'bg-dark-900 border-dark-700'
                    }`}>
                    <div className="flex items-center justify-between mb-3">
                        <h3 className={`font-bold ${isLockdown ? 'text-danger-400' : 'text-dark-200'}`}>
                            Emergency Lockdown
                        </h3>
                        {isLockdown ? <Lock className="w-5 h-5 text-danger-500" /> : <Unlock className="w-5 h-5 text-dark-400" />}
                    </div>
                    <p className="text-xs text-dark-400 mb-4">
                        {isLockdown
                            ? 'SYSTEM LOCKED. All gates secured. No entries permitted.'
                            : 'System normal. Gates operating automatically.'}
                    </p>
                    <button
                        onClick={() => setIsLockdown(!isLockdown)}
                        className={`w-full py-3 rounded-xl font-bold text-sm transition-all ${isLockdown
                                ? 'bg-danger-500 text-govNavy-700 hover:bg-danger-600 shadow-lg shadow-danger-500/20'
                                : 'bg-dark-800 text-dark-300 hover:bg-dark-700 hover:text-govNavy-700'
                            }`}
                    >
                        {isLockdown ? 'DISABLE LOCKDOWN' : 'ACTIVATE LOCKDOWN'}
                    </button>
                </div>

                {/* Manual Gate Control */}
                <div className="bg-dark-900 border border-dark-700 rounded-2xl p-4">
                    <h3 className="text-sm font-semibold text-dark-200 mb-3">Gate Controls</h3>
                    <div className="space-y-3">
                        <div className="flex items-center justify-between p-3 bg-dark-950 rounded-xl border border-dark-800">
                            <span className="text-xs font-medium text-dark-300">Main Gate A</span>
                            <button
                                onClick={() => toggleGate('main')}
                                className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${gateStatus.main === 'open'
                                        ? 'bg-success-500/20 text-success-400 border border-success-500/30'
                                        : 'bg-danger-500/20 text-danger-400 border border-danger-500/30'
                                    }`}
                            >
                                {gateStatus.main === 'open' ? 'OPEN' : 'CLOSED'}
                            </button>
                        </div>
                        <div className="flex items-center justify-between p-3 bg-dark-950 rounded-xl border border-dark-800">
                            <span className="text-xs font-medium text-dark-300">Side Gate B</span>
                            <button
                                onClick={() => toggleGate('side')}
                                className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${gateStatus.side === 'open'
                                        ? 'bg-success-500/20 text-success-400 border border-success-500/30'
                                        : 'bg-danger-500/20 text-danger-400 border border-danger-500/30'
                                    }`}
                            >
                                {gateStatus.side === 'open' ? 'OPEN' : 'CLOSED'}
                            </button>
                        </div>
                    </div>
                </div>

                {/* Blacklist Alert */}
                <div className="bg-dark-900 border border-dark-700 rounded-2xl p-4">
                    <h3 className="text-sm font-semibold text-dark-200 mb-3 flex items-center gap-2">
                        <UserX className="w-4 h-4 text-danger-400" />
                        Recent Alerts
                    </h3>
                    <div className="space-y-3">
                        <div className="bg-danger-500/10 border border-danger-500/20 rounded-lg p-3">
                            <div className="flex items-start gap-3">
                                <AlertTriangle className="w-4 h-4 text-danger-400 shrink-0 mt-0.5" />
                                <div>
                                    <div className="text-xs font-bold text-danger-300 mb-1">Blacklisted Device</div>
                                    <p className="text-[11px] text-danger-200/70 leading-tight">
                                        MAC Address match found at Library Entrance. Security team dispatched.
                                    </p>
                                    <div className="mt-2 text-[10px] text-danger-400/50">2 mins ago</div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Active Personnel */}
                <div className="flex-1">
                    <h3 className="text-xs font-semibold text-dark-400 uppercase tracking-wider mb-3">Active Units</h3>
                    <div className="space-y-2">
                        {[1, 2, 3].map((unit) => (
                            <div key={unit} className="flex items-center justify-between p-2 rounded-lg bg-dark-900/50 border border-dark-800">
                                <div className="flex items-center gap-2">
                                    <div className="w-2 h-2 rounded-full bg-success-500" />
                                    <span className="text-xs text-dark-300">Unit Alpha-{unit}</span>
                                </div>
                                <span className="text-[10px] text-dark-500">Patrol</span>
                            </div>
                        ))}
                    </div>
                </div>

            </div>

            {/* Incident Reporting Modal */}
            {showIncidentForm && (
                <div className="absolute inset-0 z-50 bg-dark-950/90 backdrop-blur-sm flex items-center justify-center p-4">
                    <div className="bg-dark-900 border border-primary-500/30 rounded-2xl w-full max-w-md shadow-2xl shadow-primary-500/10">
                        <div className="flex items-center justify-between p-4 border-b border-dark-800">
                            <h3 className="text-lg font-semibold flex items-center gap-2">
                                <AlertOctagon className="w-5 h-5 text-warning-400" />
                                Report Incident
                            </h3>
                            <button
                                onClick={() => setShowIncidentForm(false)}
                                className="text-dark-400 hover:text-govNavy-700 transition-colors"
                            >
                                <X className="w-5 h-5" />
                            </button>
                        </div>
                        <div className="p-6 space-y-4">
                            <div className="space-y-2">
                                <label className="text-sm text-dark-300">Incident Type</label>
                                <select className="w-full bg-dark-950 border border-dark-700 rounded-lg px-4 py-2 focus:border-primary-500 focus:outline-none text-sm">
                                    <option>Unauthorized Access Attempt</option>
                                    <option>Theft / Lost Property</option>
                                    <option>Physical Altercation</option>
                                    <option>Suspicious Activity</option>
                                    <option>Other</option>
                                </select>
                            </div>
                            <div className="space-y-2">
                                <label className="text-sm text-dark-300">Location</label>
                                <input type="text" className="w-full bg-dark-950 border border-dark-700 rounded-lg px-4 py-2 focus:border-primary-500 focus:outline-none text-sm" placeholder="e.g. Main Gate, Library" />
                            </div>
                            <div className="space-y-2">
                                <label className="text-sm text-dark-300">Description</label>
                                <textarea className="w-full bg-dark-950 border border-dark-700 rounded-lg px-4 py-2 focus:border-primary-500 focus:outline-none text-sm h-24 resize-none" placeholder="Describe the incident..." />
                            </div>
                        </div>
                        <div className="p-4 border-t border-dark-800 flex justify-end gap-3">
                            <CyberButton variant="ghost" onClick={() => setShowIncidentForm(false)}>Cancel</CyberButton>
                            <CyberButton className="bg-warning-500 hover:bg-warning-600 text-dark-950">Log Incident</CyberButton>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}
