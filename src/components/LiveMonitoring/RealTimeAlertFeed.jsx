import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, AlertTriangle, AlertCircle, Info, CheckCircle } from 'lucide-react';

export default function RealTimeAlertFeed({ alerts = [], onDismiss, maxVisible = 5 }) {
  const [visibleAlerts, setVisibleAlerts] = useState(alerts.slice(0, maxVisible));
  const [filteredAlerts, setFilteredAlerts] = useState(alerts);
  const [selectedSeverity, setSelectedSeverity] = useState('all');
  const [selectedState, setSelectedState] = useState('all');

  useEffect(() => {
    let filtered = [...alerts];

    if (selectedSeverity !== 'all') {
      filtered = filtered.filter(a => a.severity === selectedSeverity);
    }

    if (selectedState !== 'all') {
      filtered = filtered.filter(a => a.state === selectedState);
    }

    setFilteredAlerts(filtered);
    setVisibleAlerts(filtered.slice(0, maxVisible));
  }, [alerts, selectedSeverity, selectedState, maxVisible]);

  const getAlertIcon = (type) => {
    switch (type) {
      case 'fraud':
        return <AlertTriangle size={18} className="text-red-500" />;
      case 'system':
        return <AlertCircle size={18} className="text-yellow-500" />;
      case 'verification':
        return <Info size={18} className="text-blue-500" />;
      case 'success':
        return <CheckCircle size={18} className="text-green-500" />;
      default:
        return <Info size={18} className="text-gray-500" />;
    }
  };

  const getSeverityColor = (severity) => {
    switch (severity) {
      case 'critical':
        return 'border-red-500 bg-red-900/20';
      case 'high':
        return 'border-orange-500 bg-orange-900/20';
      case 'medium':
        return 'border-yellow-500 bg-yellow-900/20';
      case 'low':
        return 'border-blue-500 bg-blue-900/20';
      default:
        return 'border-gray-500 bg-gray-800/20';
    }
  };

  const getSeverityLabel = (severity) => {
    const labels = {
      critical: 'CRITICAL',
      high: 'HIGH',
      medium: 'MEDIUM',
      low: 'LOW',
    };
    return labels[severity] || severity.toUpperCase();
  };

  const uniqueStates = Array.from(new Set(alerts.map(a => a.state))).sort();
  const severities = ['critical', 'high', 'medium', 'low'];

  return (
    <div className="space-y-4">
      {/* Filters */}
      <div className="flex gap-2 flex-wrap">
        <div className="flex gap-2">
          <span className="text-xs text-gray-400 self-center font-semibold">Severity:</span>
          <select
            value={selectedSeverity}
            onChange={e => setSelectedSeverity(e.target.value)}
            className="px-2 py-1 bg-gray-700 border border-gray-600 rounded text-xs hover:border-saffron transition"
          >
            <option value="all">All</option>
            {severities.map(s => (
              <option key={s} value={s}>
                {getSeverityLabel(s)}
              </option>
            ))}
          </select>
        </div>

        <div className="flex gap-2">
          <span className="text-xs text-gray-400 self-center font-semibold">State:</span>
          <select
            value={selectedState}
            onChange={e => setSelectedState(e.target.value)}
            className="px-2 py-1 bg-gray-700 border border-gray-600 rounded text-xs hover:border-saffron transition"
          >
            <option value="all">All States</option>
            {uniqueStates.map(state => (
              <option key={state} value={state}>
                {state}
              </option>
            ))}
          </select>
        </div>

        <div className="ml-auto text-xs text-gray-400 self-center">
          {filteredAlerts.length} alerts
        </div>
      </div>

      {/* Alerts List */}
      <div className="space-y-2 max-h-96 overflow-y-auto">
        <AnimatePresence>
          {visibleAlerts.length > 0 ? (
            visibleAlerts.map((alert, idx) => (
              <motion.div
                key={`${alert.id}-${idx}`}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 20 }}
                transition={{ delay: idx * 0.05 }}
                className={`border-l-4 p-3 rounded-lg ${getSeverityColor(alert.severity)} hover:shadow-lg transition`}
              >
                <div className="flex gap-3 items-start">
                  {/* Icon */}
                  <div className="flex-shrink-0 mt-0.5">
                    {getAlertIcon(alert.type)}
                  </div>

                  {/* Content */}
                  <div className="flex-1 min-w-0">
                    <div className="flex justify-between items-start gap-2">
                      <div>
                        <p className="text-sm font-semibold text-white truncate">{alert.message}</p>
                        <p className="text-xs text-gray-400 mt-0.5">{alert.state}</p>
                      </div>
                      <div className="flex gap-1 items-center flex-shrink-0">
                        <span className={`text-xs px-2 py-1 rounded font-bold ${
                          alert.severity === 'critical' ? 'bg-red-500/30 text-red-300' :
                          alert.severity === 'high' ? 'bg-orange-500/30 text-orange-300' :
                          alert.severity === 'medium' ? 'bg-yellow-500/30 text-yellow-300' :
                          'bg-blue-500/30 text-blue-300'
                        }`}>
                          {getSeverityLabel(alert.severity)}
                        </span>
                        <button
                          onClick={() => onDismiss?.(alert.id)}
                          className="hover:bg-white/10 p-1 rounded transition"
                        >
                          <X size={14} />
                        </button>
                      </div>
                    </div>
                    <p className="text-xs text-gray-500 mt-1">{alert.timestamp}</p>
                  </div>
                </div>
              </motion.div>
            ))
          ) : (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-center py-8 text-gray-400"
            >
              <CheckCircle size={32} className="mx-auto mb-2 opacity-50" />
              <p>No alerts matching filter</p>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Load More */}
      {filteredAlerts.length > maxVisible && (
        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          onClick={() => setVisibleAlerts(filteredAlerts)}
          className="w-full py-2 text-xs font-semibold text-saffron border border-saffron rounded hover:bg-saffron/10 transition"
        >
          Load {filteredAlerts.length - visibleAlerts.length} more alerts
        </motion.button>
      )}
    </div>
  );
}
