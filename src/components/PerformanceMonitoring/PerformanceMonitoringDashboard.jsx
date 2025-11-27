import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  LineChart,
  Line,
  BarChart,
  Bar,
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
} from 'recharts';
import {
  Activity,
  AlertCircle,
  Zap,
  Database,
  Wifi,
  HardDrive,
  Clock,
  TrendingUp,
  TrendingDown,
  CheckCircle,
  RefreshCw,
} from 'lucide-react';
import {
  getAPIPerformance,
  getDatabasePerformance,
  getServerResources,
  getErrorTracking,
  getUserSessionPerformance,
  getDeploymentHistory,
  getCachePerformance,
  getUptimeSLA,
} from '../../services/performanceMonitoringService';

const GOVERNMENT_COLORS = {
  saffron: '#FF9933',
  navy: '#1C3664',
  green: '#138808',
  blue: '#0066CC',
  gold: '#D4AF37',
  light: '#F5F5F5',
  dark: '#333333',
};

const CHART_COLORS = ['#FF9933', '#0066CC', '#138808', '#E74C3C', '#9B59B6'];

export default function PerformanceMonitoringDashboard() {
  const [apiPerf, setApiPerf] = useState([]);
  const [dbPerf, setDbPerf] = useState(null);
  const [serverRes, setServerRes] = useState(null);
  const [errors, setErrors] = useState(null);
  const [userSession, setUserSession] = useState(null);
  const [deployments, setDeployments] = useState([]);
  const [cache, setCache] = useState(null);
  const [sla, setSLA] = useState(null);
  const [loading, setLoading] = useState(true);
  const [refreshInterval, setRefreshInterval] = useState(5);
  const [autoRefresh, setAutoRefresh] = useState(true);

  // Load all performance data
  useEffect(() => {
    const loadPerformanceData = async () => {
      setLoading(true);
      try {
        const [api, db, server, err, session, deploy, cacheData, upt] = await Promise.all([
          getAPIPerformance(),
          getDatabasePerformance(),
          getServerResources(),
          getErrorTracking(),
          getUserSessionPerformance(),
          getDeploymentHistory(),
          getCachePerformance(),
          getUptimeSLA(),
        ]);

        setApiPerf(api);
        setDbPerf(db);
        setServerRes(server);
        setErrors(err);
        setUserSession(session);
        setDeployments(deploy);
        setCache(cacheData);
        setSLA(upt);
      } catch (error) {
        console.error('Error loading performance data:', error);
      } finally {
        setLoading(false);
      }
    };

    loadPerformanceData();

    if (autoRefresh) {
      const interval = setInterval(loadPerformanceData, refreshInterval * 1000);
      return () => clearInterval(interval);
    }
  }, [autoRefresh, refreshInterval]);

  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen bg-gray-900">
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 2, repeat: Infinity }}
          className="w-12 h-12 border-4 border-saffron border-t-transparent rounded-full"
        />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-900 text-white p-6">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-8"
      >
        <div className="flex justify-between items-center mb-6">
          <div>
            <h1 className="text-4xl font-bold text-saffron mb-2">Performance Monitoring</h1>
            <p className="text-gray-400">Real-time system performance and resource utilization</p>
          </div>
          <div className="flex gap-3">
            <div className="flex items-center gap-2">
              <input
                type="checkbox"
                checked={autoRefresh}
                onChange={e => setAutoRefresh(e.target.checked)}
                className="w-4 h-4"
              />
              <span className="text-sm">Auto Refresh</span>
            </div>
            <select
              value={refreshInterval}
              onChange={e => setRefreshInterval(Number(e.target.value))}
              className="px-3 py-2 bg-gray-800 border border-gray-700 rounded-lg text-sm"
            >
              <option value={5}>5s</option>
              <option value={10}>10s</option>
              <option value={30}>30s</option>
              <option value={60}>60s</option>
            </select>
          </div>
        </div>

        {/* Quick Stats */}
        {sla && (
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            {[
              {
                label: 'Current Uptime',
                value: `${sla.currentUptime.toFixed(3)}%`,
                icon: CheckCircle,
                status: 'good',
              },
              {
                label: 'Target SLA',
                value: `${sla.targetSLA}%`,
                icon: Zap,
                status: 'target',
              },
              {
                label: 'Active Incidents',
                value: sla.incidents.length,
                icon: AlertCircle,
                status: sla.incidents.length > 0 ? 'warning' : 'good',
              },
              {
                label: 'System Status',
                value: 'Healthy',
                icon: Activity,
                status: 'good',
              },
            ].map((stat, idx) => {
              const Icon = stat.icon;
              const statusColor =
                stat.status === 'good'
                  ? 'text-green-500'
                  : stat.status === 'warning'
                  ? 'text-orange-500'
                  : 'text-blue-500';

              return (
                <motion.div
                  key={idx}
                  whileHover={{ y: -5 }}
                  className="bg-gray-800 p-4 rounded-lg border border-gray-700 hover:border-saffron transition"
                >
                  <div className="flex justify-between items-start mb-2">
                    <span className="text-gray-400 text-sm font-semibold">{stat.label}</span>
                    <Icon size={20} className={statusColor} />
                  </div>
                  <p className="text-2xl font-bold text-white">{stat.value}</p>
                </motion.div>
              );
            })}
          </div>
        )}
      </motion.div>

      {/* Server Resources */}
      {serverRes && (
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8"
        >
          {/* CPU */}
          <div className="bg-gray-800 p-6 rounded-lg border border-gray-700 hover:border-saffron transition">
            <div className="flex justify-between items-start mb-4">
              <span className="text-gray-400 text-sm font-semibold">CPU Usage</span>
              <Zap size={20} className="text-saffron" />
            </div>
            <p className="text-3xl font-bold text-saffron mb-2">{serverRes.cpu.usage.toFixed(1)}%</p>
            <div className="w-full h-2 bg-gray-700 rounded-full overflow-hidden mb-3">
              <motion.div
                initial={{ width: 0 }}
                animate={{ width: `${serverRes.cpu.usage}%` }}
                transition={{ duration: 1 }}
                className="h-full bg-gradient-to-r from-saffron to-orange-600"
              />
            </div>
            <p className="text-xs text-gray-500">{serverRes.cpu.cores} Cores</p>
          </div>

          {/* Memory */}
          <div className="bg-gray-800 p-6 rounded-lg border border-gray-700 hover:border-saffron transition">
            <div className="flex justify-between items-start mb-4">
              <span className="text-gray-400 text-sm font-semibold">Memory</span>
              <HardDrive size={20} className="text-blue-400" />
            </div>
            <p className="text-3xl font-bold text-blue-400 mb-2">
              {serverRes.memory.usagePercent.toFixed(1)}%
            </p>
            <div className="w-full h-2 bg-gray-700 rounded-full overflow-hidden mb-3">
              <motion.div
                initial={{ width: 0 }}
                animate={{ width: `${serverRes.memory.usagePercent}%` }}
                transition={{ duration: 1 }}
                className="h-full bg-gradient-to-r from-blue-500 to-blue-700"
              />
            </div>
            <p className="text-xs text-gray-500">
              {serverRes.memory.used}GB / {serverRes.memory.total}GB
            </p>
          </div>

          {/* Disk */}
          <div className="bg-gray-800 p-6 rounded-lg border border-gray-700 hover:border-saffron transition">
            <div className="flex justify-between items-start mb-4">
              <span className="text-gray-400 text-sm font-semibold">Disk Space</span>
              <Database size={20} className="text-green-400" />
            </div>
            <p className="text-3xl font-bold text-green-400 mb-2">{serverRes.disk.usagePercent.toFixed(1)}%</p>
            <div className="w-full h-2 bg-gray-700 rounded-full overflow-hidden mb-3">
              <motion.div
                initial={{ width: 0 }}
                animate={{ width: `${serverRes.disk.usagePercent}%` }}
                transition={{ duration: 1 }}
                className="h-full bg-gradient-to-r from-green-500 to-green-700"
              />
            </div>
            <p className="text-xs text-gray-500">{serverRes.disk.used}GB / {serverRes.disk.total}GB</p>
          </div>

          {/* Network */}
          <div className="bg-gray-800 p-6 rounded-lg border border-gray-700 hover:border-saffron transition">
            <div className="flex justify-between items-start mb-4">
              <span className="text-gray-400 text-sm font-semibold">Network</span>
              <Wifi size={20} className="text-purple-400" />
            </div>
            <p className="text-3xl font-bold text-purple-400 mb-2">{serverRes.network.bandwidth.toFixed(1)}%</p>
            <div className="space-y-2 text-xs text-gray-500">
              <div>↓ {serverRes.network.inbound.toFixed(1)} Mbps</div>
              <div>↑ {serverRes.network.outbound.toFixed(1)} Mbps</div>
            </div>
          </div>
        </motion.div>
      )}

      {/* API Performance */}
      {apiPerf.length > 0 && (
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          className="bg-gray-800 p-6 rounded-lg border border-gray-700 hover:border-saffron transition mb-8"
        >
          <h3 className="text-lg font-bold text-saffron mb-6 flex items-center gap-2">
            <Activity size={20} />
            API Endpoint Performance
          </h3>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-gray-700">
                  <th className="text-left py-3 px-4 text-gray-400">Endpoint</th>
                  <th className="text-right py-3 px-4 text-gray-400">Avg Latency</th>
                  <th className="text-right py-3 px-4 text-gray-400">Max Latency</th>
                  <th className="text-right py-3 px-4 text-gray-400">Success Rate</th>
                  <th className="text-right py-3 px-4 text-gray-400">RPS</th>
                  <th className="text-right py-3 px-4 text-gray-400">Cache Hit</th>
                </tr>
              </thead>
              <tbody>
                {apiPerf.map((api, idx) => (
                  <motion.tr
                    key={idx}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: idx * 0.05 }}
                    className="border-b border-gray-700 hover:bg-gray-700/50 transition"
                  >
                    <td className="py-3 px-4 text-gray-300">{api.endpoint}</td>
                    <td className="text-right py-3 px-4">
                      <span className="text-saffron font-semibold">{api.avgLatency}ms</span>
                    </td>
                    <td className="text-right py-3 px-4">
                      <span className="text-orange-400">{api.maxLatency}ms</span>
                    </td>
                    <td className="text-right py-3 px-4">
                      <span
                        className={`font-semibold ${
                          api.successRate > 99.5 ? 'text-green-400' : 'text-yellow-400'
                        }`}
                      >
                        {api.successRate.toFixed(2)}%
                      </span>
                    </td>
                    <td className="text-right py-3 px-4 text-blue-400">{api.requestsPerSecond}</td>
                    <td className="text-right py-3 px-4 text-purple-400">{api.cacheHitRate.toFixed(0)}%</td>
                  </motion.tr>
                ))}
              </tbody>
            </table>
          </div>
        </motion.div>
      )}

      {/* Database Performance */}
      {dbPerf && (
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8"
        >
          {/* Query Performance */}
          <div className="bg-gray-800 p-6 rounded-lg border border-gray-700 hover:border-saffron transition">
            <h3 className="text-lg font-bold text-saffron mb-4 flex items-center gap-2">
              <Database size={20} />
              Query Performance
            </h3>
            <div className="space-y-4">
              {dbPerf.queries.map((query, idx) => (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: idx * 0.1 }}
                  className="bg-gray-700 p-4 rounded-lg"
                >
                  <p className="text-sm text-gray-300 mb-2 truncate">{query.query}</p>
                  <div className="grid grid-cols-3 gap-2 text-xs">
                    <div>
                      <p className="text-gray-500">Avg Time</p>
                      <p className="text-saffron font-bold">{query.avgTime}ms</p>
                    </div>
                    <div>
                      <p className="text-gray-500">Executions</p>
                      <p className="text-blue-400 font-bold">{query.executionCount.toLocaleString()}</p>
                    </div>
                    <div>
                      <p className="text-gray-500">Slow Queries</p>
                      <p className="text-orange-400 font-bold">{query.slowQueryCount}</p>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Cache Performance */}
          {cache && (
            <div className="bg-gray-800 p-6 rounded-lg border border-gray-700 hover:border-saffron transition">
              <h3 className="text-lg font-bold text-saffron mb-4 flex items-center gap-2">
                <Zap size={20} />
                Cache Performance
              </h3>
              <div className="space-y-4">
                <div className="bg-gray-700 p-4 rounded-lg">
                  <p className="text-sm text-gray-400 mb-2">Hit Rate</p>
                  <div className="flex items-center gap-3">
                    <div className="flex-1">
                      <div className="h-2 bg-gray-600 rounded-full overflow-hidden">
                        <motion.div
                          initial={{ width: 0 }}
                          animate={{ width: `${cache.redisStats.hitRate}%` }}
                          transition={{ duration: 1 }}
                          className="h-full bg-gradient-to-r from-green-500 to-blue-500"
                        />
                      </div>
                    </div>
                    <span className="text-saffron font-bold text-sm w-12 text-right">
                      {cache.redisStats.hitRate.toFixed(1)}%
                    </span>
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-2 text-xs">
                  <div className="bg-gray-700 p-3 rounded-lg">
                    <p className="text-gray-500">Memory Used</p>
                    <p className="text-saffron font-bold">
                      {cache.redisStats.usedMemory.toFixed(0)}MB
                    </p>
                  </div>
                  <div className="bg-gray-700 p-3 rounded-lg">
                    <p className="text-gray-500">Evictions</p>
                    <p className="text-orange-400 font-bold">{cache.redisStats.evictions}</p>
                  </div>
                </div>
              </div>
            </div>
          )}
        </motion.div>
      )}

      {/* Error Tracking */}
      {errors && (
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          className="bg-gray-800 p-6 rounded-lg border border-gray-700 hover:border-saffron transition mb-8"
        >
          <h3 className="text-lg font-bold text-saffron mb-6 flex items-center gap-2">
            <AlertCircle size={20} />
            Error Tracking - Last 24 Hours
          </h3>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Error Timeline */}
            <ResponsiveContainer width="100%" height={300}>
              <AreaChart data={errors.errorTimeline}>
                <defs>
                  <linearGradient id="colorErrors" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#E74C3C" stopOpacity={0.8} />
                    <stop offset="95%" stopColor="#E74C3C" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="#444" />
                <XAxis dataKey="hour" stroke="#999" />
                <YAxis stroke="#999" />
                <Tooltip
                  contentStyle={{ backgroundColor: '#1a1a1a', border: '1px solid #FF9933' }}
                  labelStyle={{ color: '#FFF' }}
                />
                <Area
                  type="monotone"
                  dataKey="errorCount"
                  stroke="#E74C3C"
                  fillOpacity={1}
                  fill="url(#colorErrors)"
                />
              </AreaChart>
            </ResponsiveContainer>

            {/* Error Distribution */}
            <div className="space-y-3">
              {errors.errors.slice(0, 6).map((error, idx) => (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: idx * 0.05 }}
                  className="flex justify-between items-center bg-gray-700 p-3 rounded-lg"
                >
                  <span className="text-sm text-gray-300">{error.type}</span>
                  <span className="text-saffron font-bold">{error.count}</span>
                </motion.div>
              ))}
            </div>
          </div>
        </motion.div>
      )}

      {/* User Session Performance */}
      {userSession && (
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          className="bg-gray-800 p-6 rounded-lg border border-gray-700 hover:border-saffron transition mb-8"
        >
          <h3 className="text-lg font-bold text-saffron mb-6 flex items-center gap-2">
            <Activity size={20} />
            User Session Performance
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {[
              {
                label: 'Page Load Time',
                value: `${userSession.pageLoadTime}ms`,
                icon: Clock,
              },
              {
                label: 'FCP',
                value: `${userSession.firstContentfulPaint}ms`,
                icon: TrendingUp,
              },
              {
                label: 'LCP',
                value: `${userSession.largestContentfulPaint}ms`,
                icon: TrendingDown,
              },
            ].map((metric, idx) => {
              const Icon = metric.icon;
              return (
                <motion.div
                  key={idx}
                  whileHover={{ scale: 1.05 }}
                  className="bg-gray-700 p-4 rounded-lg"
                >
                  <div className="flex justify-between items-start mb-2">
                    <span className="text-gray-400 text-sm">{metric.label}</span>
                    <Icon size={18} className="text-saffron" />
                  </div>
                  <p className="text-2xl font-bold text-saffron">{metric.value}</p>
                </motion.div>
              );
            })}
          </div>
        </motion.div>
      )}

      {/* Deployment History */}
      {deployments.length > 0 && (
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          className="bg-gray-800 p-6 rounded-lg border border-gray-700 hover:border-saffron transition"
        >
          <h3 className="text-lg font-bold text-saffron mb-4 flex items-center gap-2">
            <RefreshCw size={20} />
            Recent Deployments
          </h3>
          <div className="space-y-3">
            {deployments.map((deploy, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: idx * 0.05 }}
                className="bg-gray-700 p-4 rounded-lg border border-gray-600 hover:border-saffron transition"
              >
                <div className="flex justify-between items-start">
                  <div>
                    <p className="font-bold text-saffron">{deploy.version}</p>
                    <p className="text-sm text-gray-400">{deploy.deployDate}</p>
                  </div>
                  <div className="text-right">
                    <p className="text-sm">
                      {deploy.rollback ? (
                        <span className="text-red-400 font-bold">⚠ Rolled Back</span>
                      ) : (
                        <span className="text-green-400 font-bold">✓ Successful</span>
                      )}
                    </p>
                    <p className="text-xs text-gray-400">{deploy.deployTime} min</p>
                  </div>
                </div>
                <div className="mt-2 grid grid-cols-2 gap-2 text-xs">
                  <div>
                    <p className="text-gray-500">Performance Change</p>
                    <p
                      className={`font-bold ${
                        deploy.performanceChange > 0 ? 'text-green-400' : 'text-orange-400'
                      }`}
                    >
                      {deploy.performanceChange > 0 ? '+' : ''}{deploy.performanceChange.toFixed(1)}%
                    </p>
                  </div>
                  <div>
                    <p className="text-gray-500">Users Affected</p>
                    <p className="text-saffron font-bold">{deploy.userImpact.toLocaleString()}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      )}
    </div>
  );
}
