import React, { useState, useEffect, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  BarChart,
  Bar,
  LineChart,
  Line,
  PieChart,
  Pie,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  AreaChart,
  Area,
  ScatterChart,
  Scatter,
} from 'recharts';
import {
  Download,
  TrendingUp,
  TrendingDown,
  Calendar,
  RefreshCw,
  BarChart3,
  PieChart as PieChartIcon,
  LineChart as LineChartIcon,
  ArrowUpRight,
  ArrowDownRight,
} from 'lucide-react';
import {
  getTrendData,
  getStateAnalytics,
  getDocumentTypeDistribution,
  getVerificationPipeline,
  getPerformanceMetrics,
  generateComparativeReport,
  exportAnalyticsToPDF,
  getPredictiveAnalytics,
} from '../../services/analyticsService';

const GOVERNMENT_COLORS = {
  saffron: '#FF9933',
  navy: '#1C3664',
  green: '#138808',
  blue: '#0066CC',
  gold: '#D4AF37',
  light: '#F5F5F5',
  dark: '#333333',
};

const CHART_COLORS = ['#FF9933', '#0066CC', '#138808', '#D4AF37', '#E74C3C', '#9B59B6'];

export default function AnalyticsDashboard() {
  const [trendData, setTrendData] = useState([]);
  const [stateData, setStateData] = useState([]);
  const [docDistribution, setDocDistribution] = useState([]);
  const [pipeline, setPipeline] = useState(null);
  const [performance, setPerformance] = useState(null);
  const [predictive, setPredictive] = useState(null);
  const [period, setPeriod] = useState('24h');
  const [loading, setLoading] = useState(true);
  const [exporting, setExporting] = useState(false);
  const [comparison, setComparison] = useState(null);

  // Load all analytics data
  useEffect(() => {
    const loadAnalytics = async () => {
      setLoading(true);
      try {
        const [
          trends,
          states,
          docs,
          pipe,
          perf,
          pred,
        ] = await Promise.all([
          getTrendData(period),
          getStateAnalytics(),
          getDocumentTypeDistribution(),
          getVerificationPipeline(),
          getPerformanceMetrics(),
          getPredictiveAnalytics(),
        ]);

        setTrendData(trends.dataPoints);
        setStateData(states);

        // Calculate percentages for doc distribution
        const total = docs.reduce((sum, d) => sum + d.count, 0);
        setDocDistribution(
          docs.map(d => ({
            ...d,
            percentage: ((d.count / total) * 100).toFixed(1),
          }))
        );

        setPipeline(pipe);
        setPerformance(perf);
        setPredictive(pred);
      } catch (error) {
        console.error('Error loading analytics:', error);
      } finally {
        setLoading(false);
      }
    };

    loadAnalytics();
  }, [period]);

  // Calculate summary statistics
  const summaryStats = useMemo(() => {
    if (!trendData.length) return null;

    const totalVer = trendData.reduce((sum, d) => sum + d.verifications, 0);
    const totalFraud = trendData.reduce((sum, d) => sum + d.fraudDetections, 0);
    const avgSuccess = (trendData.reduce((sum, d) => sum + d.successRate, 0) / trendData.length).toFixed(1);

    return {
      totalVerifications: totalVer,
      totalFraudDetections: totalFraud,
      fraudRate: ((totalFraud / totalVer) * 100).toFixed(2),
      avgSuccessRate: avgSuccess,
    };
  }, [trendData]);

  // Handle export
  const handleExport = async () => {
    setExporting(true);
    try {
      const result = await exportAnalyticsToPDF({
        trends: trendData,
        states: stateData,
        pipeline,
      });
      console.log('Export successful:', result);
    } finally {
      setExporting(false);
    }
  };

  // Handle period comparison
  const handleComparison = async () => {
    const periods = ['24h', '7d', '30d'];
    const currentIndex = periods.indexOf(period);
    const nextPeriod = periods[(currentIndex + 1) % periods.length];
    const comp = await generateComparativeReport(period, nextPeriod);
    setComparison(comp);
  };

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
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-4xl font-bold text-saffron mb-2">Analytics Dashboard</h1>
            <p className="text-gray-400">Comprehensive verification and fraud detection analytics</p>
          </div>
          <div className="flex gap-3">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={handleExport}
              disabled={exporting}
              className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-saffron to-orange-600 rounded-lg hover:shadow-lg hover:shadow-saffron/50 transition disabled:opacity-50"
            >
              <Download size={18} />
              {exporting ? 'Exporting...' : 'Export PDF'}
            </motion.button>
          </div>
        </div>
      </motion.div>

      {/* Period Selector */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="mb-6 flex gap-2"
      >
        {['24h', '7d', '30d'].map(p => (
          <motion.button
            key={p}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => setPeriod(p)}
            className={`px-4 py-2 rounded-lg font-semibold transition ${
              period === p
                ? 'bg-gradient-to-r from-saffron to-orange-600 shadow-lg shadow-saffron/50'
                : 'bg-gray-800 hover:bg-gray-700 border border-gray-700'
            }`}
          >
            {p}
          </motion.button>
        ))}
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={handleComparison}
          className="px-4 py-2 rounded-lg font-semibold bg-gray-800 hover:bg-gray-700 border border-gray-700 transition flex items-center gap-2"
        >
          <TrendingUp size={16} />
          Compare
        </motion.button>
      </motion.div>

      {/* Summary Stats */}
      {summaryStats && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8"
        >
          {[
            {
              label: 'Total Verifications',
              value: summaryStats.totalVerifications.toLocaleString(),
              icon: BarChart3,
              color: 'saffron',
            },
            {
              label: 'Fraud Detections',
              value: summaryStats.totalFraudDetections,
              icon: TrendingDown,
              color: 'navy',
            },
            {
              label: 'Fraud Rate',
              value: `${summaryStats.fraudRate}%`,
              icon: AlertTriangle,
              color: 'green',
            },
            {
              label: 'Success Rate',
              value: `${summaryStats.avgSuccessRate}%`,
              icon: TrendingUp,
              color: 'blue',
            },
          ].map((stat, idx) => {
            const Icon = stat.icon;
            return (
              <motion.div
                key={idx}
                whileHover={{ y: -5 }}
                className="bg-gray-800 p-4 rounded-lg border border-gray-700 hover:border-saffron transition"
              >
                <div className="flex justify-between items-start mb-3">
                  <span className="text-gray-400 text-sm font-semibold">{stat.label}</span>
                  <Icon size={20} className={`text-${stat.color}`} style={{color: GOVERNMENT_COLORS[stat.color]}} />
                </div>
                <p className="text-2xl font-bold text-white">{stat.value}</p>
              </motion.div>
            );
          })}
        </motion.div>
      )}

      {/* Trend Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
        {/* Verification Trend */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          className="bg-gray-800 p-6 rounded-lg border border-gray-700 hover:border-saffron transition"
        >
          <h3 className="text-lg font-bold text-saffron mb-4 flex items-center gap-2">
            <LineChartIcon size={20} />
            Verification Trend
          </h3>
          <ResponsiveContainer width="100%" height={300}>
            <AreaChart data={trendData}>
              <defs>
                <linearGradient id="colorVer" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#FF9933" stopOpacity={0.8} />
                  <stop offset="95%" stopColor="#FF9933" stopOpacity={0} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="#444" />
              <XAxis dataKey="time" stroke="#999" />
              <YAxis stroke="#999" />
              <Tooltip
                contentStyle={{ backgroundColor: '#1a1a1a', border: '1px solid #FF9933' }}
                labelStyle={{ color: '#FFF' }}
              />
              <Area
                type="monotone"
                dataKey="verifications"
                stroke="#FF9933"
                fillOpacity={1}
                fill="url(#colorVer)"
              />
            </AreaChart>
          </ResponsiveContainer>
        </motion.div>

        {/* Success vs Fraud Rate */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          className="bg-gray-800 p-6 rounded-lg border border-gray-700 hover:border-saffron transition"
        >
          <h3 className="text-lg font-bold text-saffron mb-4 flex items-center gap-2">
            <LineChartIcon size={20} />
            Success vs Fraud Rate
          </h3>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={trendData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#444" />
              <XAxis dataKey="time" stroke="#999" />
              <YAxis stroke="#999" />
              <Tooltip
                contentStyle={{ backgroundColor: '#1a1a1a', border: '1px solid #FF9933' }}
                labelStyle={{ color: '#FFF' }}
              />
              <Legend />
              <Line
                type="monotone"
                dataKey="successRate"
                stroke="#138808"
                strokeWidth={2}
                dot={false}
              />
              <Line
                type="monotone"
                dataKey="fraudDetections"
                stroke="#FF0000"
                strokeWidth={2}
                dot={false}
              />
            </LineChart>
          </ResponsiveContainer>
        </motion.div>
      </div>

      {/* State Analytics */}
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="bg-gray-800 p-6 rounded-lg border border-gray-700 hover:border-saffron transition mb-8"
      >
        <h3 className="text-lg font-bold text-saffron mb-4 flex items-center gap-2">
          <BarChart3 size={20} />
          State-wise Performance
        </h3>
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={stateData.slice(0, 8)}>
            <CartesianGrid strokeDasharray="3 3" stroke="#444" />
            <XAxis dataKey="state" stroke="#999" angle={-45} textAnchor="end" height={80} />
            <YAxis stroke="#999" />
            <Tooltip
              contentStyle={{ backgroundColor: '#1a1a1a', border: '1px solid #FF9933' }}
              labelStyle={{ color: '#FFF' }}
            />
            <Legend />
            <Bar dataKey="verifications" fill="#FF9933" radius={[8, 8, 0, 0]} />
            <Bar dataKey="fraudRate" fill="#E74C3C" radius={[8, 8, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </motion.div>

      {/* Document Type Distribution */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          className="bg-gray-800 p-6 rounded-lg border border-gray-700 hover:border-saffron transition"
        >
          <h3 className="text-lg font-bold text-saffron mb-4 flex items-center gap-2">
            <PieChartIcon size={20} />
            Document Type Distribution
          </h3>
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={docDistribution}
                dataKey="count"
                nameKey="type"
                cx="50%"
                cy="50%"
                outerRadius={80}
                label
              >
                {docDistribution.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={CHART_COLORS[index % CHART_COLORS.length]} />
                ))}
              </Pie>
              <Tooltip
                contentStyle={{ backgroundColor: '#1a1a1a', border: '1px solid #FF9933' }}
                labelStyle={{ color: '#FFF' }}
              />
            </PieChart>
          </ResponsiveContainer>
        </motion.div>

        {/* Verification Pipeline */}
        {pipeline && (
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-gray-800 p-6 rounded-lg border border-gray-700 hover:border-saffron transition"
          >
            <h3 className="text-lg font-bold text-saffron mb-4 flex items-center gap-2">
              <BarChart3 size={20} />
              Verification Pipeline
            </h3>
            <div className="space-y-3">
              {pipeline.stages.map((stage, idx) => (
                <div key={idx}>
                  <div className="flex justify-between mb-1">
                    <span className="text-sm font-semibold text-gray-300">{stage.name}</span>
                    <span className="text-sm text-saffron font-bold">{stage.percentage.toFixed(1)}%</span>
                  </div>
                  <div className="h-2 bg-gray-700 rounded-full overflow-hidden">
                    <motion.div
                      initial={{ width: 0 }}
                      animate={{ width: `${stage.percentage}%` }}
                      transition={{ duration: 1, delay: idx * 0.1 }}
                      className="h-full bg-gradient-to-r from-saffron to-orange-600 rounded-full"
                    />
                  </div>
                </div>
              ))}
            </div>
          </motion.div>
        )}
      </div>

      {/* Performance Metrics */}
      {performance && (
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          className="bg-gray-800 p-6 rounded-lg border border-gray-700 hover:border-saffron transition mb-8"
        >
          <h3 className="text-lg font-bold text-saffron mb-6 flex items-center gap-2">
            <BarChart3 size={20} />
            System Performance
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {[
              { label: 'System Uptime', value: `${performance.systemUptime.toFixed(2)}%`, unit: 'uptime' },
              { label: 'Avg Response Time', value: `${performance.avgResponseTime}ms`, unit: 'latency' },
              { label: 'Cache Hit Rate', value: `${performance.cacheHitRate.toFixed(1)}%`, unit: 'cache' },
              { label: 'Error Rate', value: `${performance.errorRate.toFixed(2)}%`, unit: 'errors' },
            ].map((metric, idx) => (
              <motion.div
                key={idx}
                whileHover={{ scale: 1.05 }}
                className="bg-gray-700 p-4 rounded-lg border border-gray-600"
              >
                <p className="text-gray-400 text-sm mb-2">{metric.label}</p>
                <p className="text-2xl font-bold text-saffron">{metric.value}</p>
              </motion.div>
            ))}
          </div>
        </motion.div>
      )}

      {/* Comparison View */}
      <AnimatePresence>
        {comparison && (
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            className="bg-gray-800 p-6 rounded-lg border border-gray-700 mb-8"
          >
            <h3 className="text-lg font-bold text-saffron mb-6 flex items-center gap-2">
              <TrendingUp size={20} />
              {comparison.period1} vs {comparison.period2} Comparison
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {comparison.metrics.map((metric, idx) => {
                const isPositive = metric.change >= 0;
                return (
                  <motion.div
                    key={idx}
                    whileHover={{ scale: 1.05 }}
                    className="bg-gray-700 p-4 rounded-lg"
                  >
                    <p className="text-gray-400 text-sm mb-3">{metric.name}</p>
                    <div className="flex justify-between items-end">
                      <div>
                        <p className="text-sm text-gray-500">{comparison.period1}</p>
                        <p className="text-lg font-bold text-saffron">{metric.period1.toLocaleString()}</p>
                      </div>
                      <div>
                        <p className="text-sm text-gray-500">{comparison.period2}</p>
                        <p className="text-lg font-bold text-blue-400">{metric.period2.toLocaleString()}</p>
                      </div>
                    </div>
                    <div className="mt-3 flex items-center gap-2">
                      {isPositive ? (
                        <ArrowUpRight size={16} className="text-green-500" />
                      ) : (
                        <ArrowDownRight size={16} className="text-red-500" />
                      )}
                      <span
                        className={`text-sm font-bold ${
                          isPositive ? 'text-green-500' : 'text-red-500'
                        }`}
                      >
                        {isPositive ? '+' : ''}{metric.change.toFixed(2)}%
                      </span>
                    </div>
                  </motion.div>
                );
              })}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Predictive Analytics */}
      {predictive && (
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          className="bg-gray-800 p-6 rounded-lg border border-gray-700 hover:border-saffron transition"
        >
          <h3 className="text-lg font-bold text-saffron mb-6 flex items-center gap-2">
            <TrendingUp size={20} />
            Predictive Analytics
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {[
              {
                title: 'Tomorrow Prediction',
                data: predictive.tomorrowPrediction,
              },
              {
                title: 'Next 7 Days Prediction',
                data: predictive.weekPrediction,
              },
            ].map((pred, idx) => (
              <motion.div
                key={idx}
                whileHover={{ scale: 1.02 }}
                className="bg-gray-700 p-4 rounded-lg border border-gray-600"
              >
                <h4 className="text-blue-400 font-bold mb-4">{pred.title}</h4>
                <div className="space-y-3">
                  <div>
                    <p className="text-gray-400 text-sm mb-1">Period</p>
                    <p className="text-white font-semibold">{pred.data.date}</p>
                  </div>
                  <div>
                    <p className="text-gray-400 text-sm mb-1">Predicted Verifications</p>
                    <p className="text-saffron font-bold text-lg">{pred.data.predictedVerifications.toLocaleString()}</p>
                  </div>
                  <div>
                    <p className="text-gray-400 text-sm mb-1">Predicted Fraud Rate</p>
                    <p className="text-orange-400 font-bold text-lg">{pred.data.predictedFraudRate.toFixed(2)}%</p>
                  </div>
                  <div>
                    <p className="text-gray-400 text-sm mb-1">Confidence</p>
                    <div className="flex items-center gap-2">
                      <div className="flex-1 h-2 bg-gray-600 rounded-full overflow-hidden">
                        <motion.div
                          initial={{ width: 0 }}
                          animate={{ width: `${pred.data.confidence}%` }}
                          transition={{ duration: 1 }}
                          className="h-full bg-gradient-to-r from-green-500 to-blue-500"
                        />
                      </div>
                      <span className="text-green-400 font-bold text-sm">{pred.data.confidence.toFixed(1)}%</span>
                    </div>
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

// Icon component placeholder
const AlertTriangle = ({ size = 24, className = '' }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    className={className}
  >
    <path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3.05h16.94a2 2 0 0 0 1.71-3.05L13.71 3.86a2 2 0 0 0-3.42 0z" />
    <line x1="12" y1="9" x2="12" y2="13" />
    <line x1="12" y1="17" x2="12.01" y2="17" />
  </svg>
);
