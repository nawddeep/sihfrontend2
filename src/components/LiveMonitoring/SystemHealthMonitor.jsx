import React from 'react';
import { motion } from 'framer-motion';
import { Activity, Zap, HardDrive, Wifi, Gauge } from 'lucide-react';

export default function SystemHealthMonitor({ systemHealth = {} }) {
  const getHealthStatus = (usage) => {
    if (usage >= 80) return { status: 'critical', color: 'text-red-500' };
    if (usage >= 60) return { status: 'warning', color: 'text-orange-500' };
    return { status: 'healthy', color: 'text-green-500' };
  };

  const metrics = [
    {
      label: 'CPU Usage',
      value: systemHealth.cpu || 45,
      icon: Activity,
      unit: '%',
      color: 'from-saffron to-orange-600',
    },
    {
      label: 'Memory Usage',
      value: systemHealth.memory || 62,
      icon: HardDrive,
      unit: '%',
      color: 'from-blue-500 to-blue-700',
    },
    {
      label: 'Disk Usage',
      value: systemHealth.disk || 48,
      icon: HardDrive,
      unit: '%',
      color: 'from-green-500 to-green-700',
    },
    {
      label: 'Network Latency',
      value: systemHealth.latency || 35,
      icon: Wifi,
      unit: 'ms',
      color: 'from-purple-500 to-purple-700',
    },
    {
      label: 'DB Connections',
      value: systemHealth.connections || 85,
      icon: Gauge,
      unit: '/100',
      color: 'from-pink-500 to-pink-700',
    },
    {
      label: 'Error Rate',
      value: systemHealth.errorRate || 0.5,
      icon: Activity,
      unit: '%',
      color: 'from-red-500 to-red-700',
    },
  ];

  return (
    <div className="space-y-4">
      {/* Main Metrics Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {metrics.map((metric, idx) => {
          const Icon = metric.icon;
          const health = getHealthStatus(metric.value);
          const percentage = Math.min(100, (metric.value / 100) * 100);

          return (
            <motion.div
              key={idx}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: idx * 0.05 }}
              whileHover={{ scale: 1.02 }}
              className="bg-gray-800 p-4 rounded-lg border border-gray-700 hover:border-saffron transition"
            >
              {/* Header */}
              <div className="flex justify-between items-start mb-3">
                <span className="text-sm font-semibold text-gray-300">{metric.label}</span>
                <Icon size={18} className={health.color} />
              </div>

              {/* Value */}
              <div className="mb-3">
                <p className={`text-3xl font-bold bg-gradient-to-r ${metric.color} bg-clip-text text-transparent`}>
                  {metric.value.toFixed(metric.unit === 'ms' ? 0 : 1)}<span className="text-lg">{metric.unit}</span>
                </p>
              </div>

              {/* Progress Bar */}
              <div className="space-y-1">
                <div className="h-2 bg-gray-700 rounded-full overflow-hidden">
                  <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: `${percentage}%` }}
                    transition={{ duration: 1, ease: 'easeOut' }}
                    className={`h-full bg-gradient-to-r ${metric.color} rounded-full`}
                  />
                </div>
                <div className="flex justify-between items-center">
                  <span className={`text-xs font-bold ${health.color} capitalize`}>
                    {health.status}
                  </span>
                  <span className="text-xs text-gray-500">
                    {percentage.toFixed(0)}%
                  </span>
                </div>
              </div>
            </motion.div>
          );
        })}
      </div>

      {/* Detailed Status */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="bg-gray-800 p-4 rounded-lg border border-gray-700"
      >
        <h4 className="text-sm font-bold text-saffron mb-3">System Status Overview</h4>
        <div className="space-y-2">
          {[
            { label: 'System Uptime', value: '99.95%', status: 'healthy' },
            { label: 'Response Time', value: '150ms avg', status: 'healthy' },
            { label: 'Cache Hit Rate', value: '87.3%', status: 'healthy' },
            { label: 'Active Sessions', value: '3,247', status: 'healthy' },
            { label: 'Request Queue', value: '12ms', status: 'healthy' },
            { label: 'Last Incident', value: '2 days ago', status: 'healthy' },
          ].map((item, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: idx * 0.05 }}
              className="flex justify-between items-center p-2 bg-gray-700/50 rounded border border-gray-600/50 hover:border-saffron/30 transition"
            >
              <span className="text-sm text-gray-400">{item.label}</span>
              <div className="flex items-center gap-2">
                <span className="text-sm font-semibold text-saffron">{item.value}</span>
                <div className="w-2 h-2 rounded-full bg-green-500" />
              </div>
            </motion.div>
          ))}
        </div>
      </motion.div>

      {/* Alert Rules */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="bg-gray-800 p-4 rounded-lg border border-gray-700"
      >
        <h4 className="text-sm font-bold text-saffron mb-3">Health Alerts</h4>
        <div className="space-y-2">
          {systemHealth.cpu > 80 && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="flex gap-3 p-3 bg-red-900/20 border border-red-700/30 rounded"
            >
              <div className="w-2 h-2 rounded-full bg-red-500 flex-shrink-0 mt-1" />
              <div className="text-xs">
                <p className="font-semibold text-red-400">High CPU Usage</p>
                <p className="text-gray-400">CPU is at {systemHealth.cpu}%</p>
              </div>
            </motion.div>
          )}
          {systemHealth.memory > 80 && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="flex gap-3 p-3 bg-orange-900/20 border border-orange-700/30 rounded"
            >
              <div className="w-2 h-2 rounded-full bg-orange-500 flex-shrink-0 mt-1" />
              <div className="text-xs">
                <p className="font-semibold text-orange-400">High Memory Usage</p>
                <p className="text-gray-400">Memory is at {systemHealth.memory}%</p>
              </div>
            </motion.div>
          )}
          {systemHealth.errorRate > 1 && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="flex gap-3 p-3 bg-yellow-900/20 border border-yellow-700/30 rounded"
            >
              <div className="w-2 h-2 rounded-full bg-yellow-500 flex-shrink-0 mt-1" />
              <div className="text-xs">
                <p className="font-semibold text-yellow-400">Elevated Error Rate</p>
                <p className="text-gray-400">Error rate is at {systemHealth.errorRate}%</p>
              </div>
            </motion.div>
          )}
          {!systemHealth.cpu || systemHealth.cpu <= 60 && systemHealth.memory <= 60 && systemHealth.errorRate <= 1 && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="flex gap-3 p-3 bg-green-900/20 border border-green-700/30 rounded"
            >
              <div className="w-2 h-2 rounded-full bg-green-500 flex-shrink-0 mt-1" />
              <div className="text-xs">
                <p className="font-semibold text-green-400">All Systems Healthy</p>
                <p className="text-gray-400">No active alerts</p>
              </div>
            </motion.div>
          )}
        </div>
      </motion.div>
    </div>
  );
}
