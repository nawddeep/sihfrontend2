/**
 * Live Exam Monitor Component
 * 
 * Real-time monitoring dashboard showing live exam statistics,
 * alerts, geographic distribution, and system health
 */

import React, { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Activity,
  AlertTriangle,
  BarChart3,
  Map,
  RefreshCw,
  Download,
  Pause,
  Play,
  Zap,
  Users,
  CheckCircle,
  Clock,
} from 'lucide-react';
import {
  getLiveExamStats,
  getRealTimeAlerts,
  getSystemHealth,
  getActiveSessions,
  subscribeLiveUpdates,
} from '../../services/liveMonitoringService';

export default function LiveExamMonitor() {
  const [stats, setStats] = useState(null);
  const [alerts, setAlerts] = useState([]);
  const [health, setHealth] = useState(null);
  const [sessions, setSessions] = useState(null);
  const [isLive, setIsLive] = useState(true);
  const [lastUpdate, setLastUpdate] = useState(new Date());
  const [loading, setLoading] = useState(true);

  // Initialize data
  useEffect(() => {
    const initializeData = async () => {
      try {
        const [statsData, alertsData, healthData, sessionsData] = await Promise.all([
          getLiveExamStats(),
          getRealTimeAlerts(),
          getSystemHealth(),
          getActiveSessions(),
        ]);

        setStats(statsData);
        setAlerts(alertsData);
        setHealth(healthData);
        setSessions(sessionsData);
        setLastUpdate(new Date());
        setLoading(false);
      } catch (error) {
        console.error('Error initializing live monitor:', error);
        setLoading(false);
      }
    };

    initializeData();
  }, []);

  // Subscribe to live updates
  useEffect(() => {
    if (!isLive) return;

    const unsubscribe = subscribeLiveUpdates((data) => {
      setStats(data.stats);
      setAlerts(data.alerts);
      setHealth(data.health);
      setLastUpdate(new Date());
    }, 2000);

    return unsubscribe;
  }, [isLive]);

  if (loading) {
    return (
      <div className="p-6 text-center">
        <div className="inline-flex items-center gap-2 text-blue-600">
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ duration: 2, repeat: Infinity }}
          >
            <Activity className="w-5 h-5" />
          </motion.div>
          <span>Loading live data...</span>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex items-center justify-between"
      >
        <div>
          <h2 className="text-2xl font-bold text-govNavy-700 flex items-center gap-2">
            <Activity className="w-6 h-6 text-blue-600" />
            Live Exam Monitor
          </h2>
          <p className="text-sm text-govGray-600 mt-1">
            Real-time updates • Last refreshed: {lastUpdate.toLocaleTimeString()}
          </p>
        </div>

        <div className="flex gap-2">
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => setIsLive(!isLive)}
            className={`px-4 py-2 rounded-lg font-semibold flex items-center gap-2 transition-colors ${
              isLive
                ? 'bg-green-600 text-white hover:bg-green-700'
                : 'bg-gray-300 text-gray-700 hover:bg-gray-400'
            }`}
          >
            {isLive ? (
              <>
                <Pause className="w-4 h-4" />
                Pause
              </>
            ) : (
              <>
                <Play className="w-4 h-4" />
                Resume
              </>
            )}
          </motion.button>

          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="px-4 py-2 rounded-lg font-semibold flex items-center gap-2 bg-blue-600 text-white hover:bg-blue-700 transition-colors"
          >
            <Download className="w-4 h-4" />
            Export
          </motion.button>
        </div>
      </motion.div>

      {/* Live Stats Grid */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="grid grid-cols-2 md:grid-cols-4 gap-4"
      >
        {[
          {
            label: 'Active Exams',
            value: stats?.activeExams,
            icon: Activity,
            color: 'blue',
          },
          {
            label: 'Total Students',
            value: stats?.totalStudents,
            icon: Users,
            color: 'green',
          },
          {
            label: 'Verified Today',
            value: stats?.verifiedToday,
            icon: CheckCircle,
            color: 'emerald',
          },
          {
            label: 'Frauds Detected',
            value: stats?.fraudsDetected,
            icon: AlertTriangle,
            color: 'red',
          },
        ].map((item, idx) => {
          const Icon = item.icon;
          const colorClass = {
            blue: 'bg-blue-50 border-blue-300 text-blue-700',
            green: 'bg-green-50 border-green-300 text-green-700',
            emerald: 'bg-emerald-50 border-emerald-300 text-emerald-700',
            red: 'bg-red-50 border-red-300 text-red-700',
          }[item.color];

          return (
            <motion.div
              key={item.label}
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: idx * 0.1 }}
              className={`p-4 rounded-lg border-2 ${colorClass}`}
            >
              <div className="flex items-center gap-2 mb-2">
                <Icon className="w-5 h-5" />
                <span className="text-xs font-semibold uppercase">{item.label}</span>
              </div>
              <motion.div
                key={item.value}
                animate={{ scale: [1, 1.1, 1] }}
                transition={{ duration: 0.3 }}
                className="text-2xl font-bold"
              >
                {item.value?.toLocaleString() || '—'}
              </motion.div>
            </motion.div>
          );
        })}
      </motion.div>

      {/* Real-Time Alert Feed */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="bg-white rounded-lg border border-gray-300 p-6"
      >
        <div className="flex items-center gap-2 mb-4">
          <Zap className="w-5 h-5 text-orange-600" />
          <h3 className="font-bold text-lg text-govNavy-700">Real-Time Alerts</h3>
          <span className="ml-auto text-xs bg-orange-100 text-orange-700 px-2 py-1 rounded-full">
            {alerts.length} active
          </span>
        </div>

        <div className="space-y-2 max-h-64 overflow-y-auto">
          <AnimatePresence>
            {alerts.map((alert, idx) => (
              <motion.div
                key={alert.id}
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 10 }}
                className={`p-3 rounded-lg border-l-4 text-xs ${
                  alert.severity === 'critical'
                    ? 'bg-red-50 border-red-500 text-red-900'
                    : alert.severity === 'high'
                    ? 'bg-orange-50 border-orange-500 text-orange-900'
                    : 'bg-yellow-50 border-yellow-500 text-yellow-900'
                }`}
              >
                <div className="flex items-start justify-between gap-2">
                  <div className="flex-1">
                    <p className="font-semibold">{alert.type}</p>
                    <p className="text-xs opacity-75 mt-1">
                      {alert.state} • {alert.centre} • {alert.description}
                    </p>
                  </div>
                  <span className="text-xs font-mono">
                    {new Date(alert.timestamp).toLocaleTimeString()}
                  </span>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
      </motion.div>

      {/* System Health */}
      {health && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="bg-white rounded-lg border border-gray-300 p-6"
        >
          <h3 className="font-bold text-lg text-govNavy-700 mb-4">System Health</h3>

          <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
            {[
              { label: 'CPU Usage', value: health.cpu, max: 100 },
              { label: 'Memory', value: health.memory, max: 100 },
              { label: 'Disk Space', value: health.diskSpace, max: 100 },
              { label: 'Network Latency', value: health.networkLatency, max: 200, unit: 'ms' },
              { label: 'Error Rate', value: health.errorRate, max: 1, unit: '%' },
              { label: 'Cache Hit Rate', value: health.cacheHitRate, max: 100, unit: '%' },
            ].map((metric) => (
              <div key={metric.label} className="space-y-2">
                <div className="flex justify-between text-xs font-medium">
                  <span className="text-gray-700">{metric.label}</span>
                  <span className="text-gray-900 font-bold">
                    {metric.value.toFixed(1)}{metric.unit || ''}
                  </span>
                </div>
                <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
                  <motion.div
                    className={`h-full transition-all ${
                      metric.value > metric.max * 0.8
                        ? 'bg-red-500'
                        : metric.value > metric.max * 0.5
                        ? 'bg-yellow-500'
                        : 'bg-green-500'
                    }`}
                    initial={{ width: 0 }}
                    animate={{ width: `${(metric.value / metric.max) * 100}%` }}
                    transition={{ duration: 0.5 }}
                  />
                </div>
              </div>
            ))}
          </div>
        </motion.div>
      )}

      {/* Active Sessions */}
      {sessions && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="bg-white rounded-lg border border-gray-300 p-6"
        >
          <div className="flex items-center gap-2 mb-4">
            <Users className="w-5 h-5 text-blue-600" />
            <h3 className="font-bold text-lg text-govNavy-700">Active Sessions</h3>
            <span className="ml-auto text-xs bg-blue-100 text-blue-700 px-2 py-1 rounded-full font-semibold">
              {sessions.total.toLocaleString()}
            </span>
          </div>

          <div className="grid grid-cols-2 gap-4">
            {Object.entries(sessions.byStatus).map(([status, count]) => (
              <div key={status} className="p-4 bg-gray-50 rounded-lg border border-gray-200">
                <p className="text-xs text-gray-600 mb-2">{status}</p>
                <p className="text-2xl font-bold text-govNavy-700">
                  {count.toLocaleString()}
                </p>
              </div>
            ))}
          </div>
        </motion.div>
      )}
    </div>
  );
}
