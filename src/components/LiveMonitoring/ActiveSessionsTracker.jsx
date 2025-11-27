import React, { useState, useMemo } from 'react';
import { motion } from 'framer-motion';
import {
  PieChart,
  Pie,
  Cell,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from 'recharts';
import { Users, TrendingUp, Clock, AlertCircle } from 'lucide-react';

const CHART_COLORS = ['#FF9933', '#0066CC', '#138808', '#E74C3C', '#9B59B6', '#D4AF37'];

export default function ActiveSessionsTracker({ activeSessions = {} }) {
  const [viewMode, setViewMode] = useState('state'); // 'state' or 'status'

  const stateData = useMemo(() => {
    if (!activeSessions.byState) return [];
    return Object.entries(activeSessions.byState).map(([state, count]) => ({
      name: state,
      value: count,
    }));
  }, [activeSessions]);

  const statusData = useMemo(() => {
    if (!activeSessions.byStatus) return [];
    return Object.entries(activeSessions.byStatus).map(([status, count]) => ({
      name: status,
      value: count,
      color: {
        'In Progress': '#FF9933',
        'Waiting': '#0066CC',
        'Completed': '#138808',
        'Failed': '#E74C3C',
      }[status] || '#999999',
    }));
  }, [activeSessions]);

  const totalSessions = activeSessions.total || 0;
  const avgDuration = activeSessions.avgSessionDuration || 0;

  return (
    <div className="space-y-4">
      {/* Summary Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="bg-gray-800 p-4 rounded-lg border border-gray-700 hover:border-saffron transition"
        >
          <div className="flex justify-between items-start mb-2">
            <span className="text-sm font-semibold text-gray-400">Active Sessions</span>
            <Users size={18} className="text-saffron" />
          </div>
          <p className="text-3xl font-bold text-saffron">{totalSessions.toLocaleString()}</p>
          <p className="text-xs text-gray-500 mt-1">Real-time connected users</p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.1 }}
          className="bg-gray-800 p-4 rounded-lg border border-gray-700 hover:border-saffron transition"
        >
          <div className="flex justify-between items-start mb-2">
            <span className="text-sm font-semibold text-gray-400">Avg Duration</span>
            <Clock size={18} className="text-blue-400" />
          </div>
          <p className="text-3xl font-bold text-blue-400">{avgDuration.toFixed(0)}<span className="text-sm">m</span></p>
          <p className="text-xs text-gray-500 mt-1">Average session length</p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.2 }}
          className="bg-gray-800 p-4 rounded-lg border border-gray-700 hover:border-saffron transition"
        >
          <div className="flex justify-between items-start mb-2">
            <span className="text-sm font-semibold text-gray-400">Peak Load</span>
            <TrendingUp size={18} className="text-green-400" />
          </div>
          <p className="text-3xl font-bold text-green-400">{Math.ceil(totalSessions * 1.3).toLocaleString()}</p>
          <p className="text-xs text-gray-500 mt-1">Expected at peak hours</p>
        </motion.div>
      </div>

      {/* View Toggle */}
      <div className="flex gap-2">
        <button
          onClick={() => setViewMode('state')}
          className={`px-3 py-2 rounded-lg text-sm font-semibold transition ${
            viewMode === 'state'
              ? 'bg-gradient-to-r from-saffron to-orange-600 text-white'
              : 'bg-gray-800 border border-gray-700 text-gray-300 hover:border-saffron'
          }`}
        >
          By State
        </button>
        <button
          onClick={() => setViewMode('status')}
          className={`px-3 py-2 rounded-lg text-sm font-semibold transition ${
            viewMode === 'status'
              ? 'bg-gradient-to-r from-saffron to-orange-600 text-white'
              : 'bg-gray-800 border border-gray-700 text-gray-300 hover:border-saffron'
          }`}
        >
          By Status
        </button>
      </div>

      {/* Pie Chart */}
      {((viewMode === 'state' && stateData.length > 0) || (viewMode === 'status' && statusData.length > 0)) && (
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          className="bg-gray-800 p-4 rounded-lg border border-gray-700"
        >
          <h4 className="text-sm font-bold text-saffron mb-4">
            {viewMode === 'state' ? 'Sessions by State' : 'Sessions by Status'}
          </h4>
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={viewMode === 'state' ? stateData : statusData}
                cx="50%"
                cy="50%"
                labelLine={false}
                label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                outerRadius={80}
                fill="#8884d8"
                dataKey="value"
              >
                {(viewMode === 'state' ? stateData : statusData).map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color || CHART_COLORS[index % CHART_COLORS.length]} />
                ))}
              </Pie>
              <Tooltip
                contentStyle={{ backgroundColor: '#1a1a1a', border: '1px solid #FF9933' }}
                labelStyle={{ color: '#FFF' }}
              />
            </PieChart>
          </ResponsiveContainer>
        </motion.div>
      )}

      {/* Status Breakdown Table */}
      {statusData.length > 0 && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="bg-gray-800 p-4 rounded-lg border border-gray-700"
        >
          <h4 className="text-sm font-bold text-saffron mb-4">Session Status Breakdown</h4>
          <div className="space-y-2">
            {statusData.map((item, idx) => {
              const percentage = (item.value / totalSessions) * 100;
              return (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: idx * 0.05 }}
                  className="bg-gray-700 p-3 rounded-lg border border-gray-600"
                >
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-sm font-semibold text-gray-300">{item.name}</span>
                    <span className="text-sm font-bold" style={{ color: item.color }}>
                      {item.value.toLocaleString()}
                    </span>
                  </div>
                  <div className="h-2 bg-gray-600 rounded-full overflow-hidden">
                    <motion.div
                      initial={{ width: 0 }}
                      animate={{ width: `${percentage}%` }}
                      transition={{ duration: 0.8, delay: idx * 0.1 }}
                      className="h-full rounded-full"
                      style={{ backgroundColor: item.color }}
                    />
                  </div>
                  <div className="text-xs text-gray-500 mt-1">{percentage.toFixed(1)}% of total</div>
                </motion.div>
              );
            })}
          </div>
        </motion.div>
      )}

      {/* State Distribution Table */}
      {stateData.length > 0 && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="bg-gray-800 p-4 rounded-lg border border-gray-700"
        >
          <h4 className="text-sm font-bold text-saffron mb-4">Top States by Session Count</h4>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-gray-700">
                  <th className="text-left py-2 px-3 text-gray-400">State</th>
                  <th className="text-right py-2 px-3 text-gray-400">Sessions</th>
                  <th className="text-right py-2 px-3 text-gray-400">Percentage</th>
                </tr>
              </thead>
              <tbody>
                {stateData.sort((a, b) => b.value - a.value).map((item, idx) => {
                  const percentage = (item.value / totalSessions) * 100;
                  return (
                    <motion.tr
                      key={idx}
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ delay: idx * 0.05 }}
                      className="border-b border-gray-700 hover:bg-gray-700/50 transition"
                    >
                      <td className="py-2 px-3 text-gray-300">{item.name}</td>
                      <td className="text-right py-2 px-3 font-bold text-saffron">
                        {item.value.toLocaleString()}
                      </td>
                      <td className="text-right py-2 px-3 text-gray-400">
                        {percentage.toFixed(1)}%
                      </td>
                    </motion.tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </motion.div>
      )}

      {/* Alerts */}
      {totalSessions > 5000 && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="flex gap-3 p-4 bg-yellow-900/20 border border-yellow-700/30 rounded-lg"
        >
          <AlertCircle size={20} className="text-yellow-400 flex-shrink-0" />
          <div className="text-sm">
            <p className="font-semibold text-yellow-400">High Session Load</p>
            <p className="text-gray-400">Currently handling {totalSessions.toLocaleString()} active sessions</p>
          </div>
        </motion.div>
      )}
    </div>
  );
}
