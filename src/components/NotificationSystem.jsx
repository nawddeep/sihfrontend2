import React, { useState, useEffect } from "react";
import { Bell, X, AlertTriangle, CheckCircle2, Info, XCircle } from "lucide-react";

const notificationTypes = {
  fraud_alert: { icon: AlertTriangle, color: "rose", bg: "bg-rose-950", border: "border-rose-500" },
  verification: { icon: CheckCircle2, color: "emerald", bg: "bg-emerald-950", border: "border-emerald-500" },
  info: { icon: Info, color: "sky", bg: "bg-sky-950", border: "border-sky-500" },
  error: { icon: XCircle, color: "rose", bg: "bg-rose-950", border: "border-rose-500" },
};

export default function NotificationSystem({ autoGenerate = true, interval = 8000 }) {
  const [notifications, setNotifications] = useState([]);

  useEffect(() => {
    if (!autoGenerate) return;

    const generateNotification = () => {
      const types = [
        {
          type: 'fraud_alert',
          messages: [
            'Biometric mismatch detected in Hall H-204',
            'Suspicious collaboration detected in Hall H-105',
            'Duplicate biometric used at another centre',
            'Document verification failed for STU2025EE021',
          ],
        },
        {
          type: 'verification',
          messages: [
            'Document verified successfully on blockchain',
            '5 new documents verified in the last hour',
            'All biometric checks passed for Hall H-201',
          ],
        },
        {
          type: 'info',
          messages: [
            'System maintenance scheduled for tonight',
            'New security update available',
            'Camera feed restored for CAM-06',
          ],
        },
      ];

      if (Math.random() > 0.7) {
        const category = types[Math.floor(Math.random() * types.length)];
        const message = category.messages[Math.floor(Math.random() * category.messages.length)];
        
        const newNotif = {
          id: Date.now(),
          type: category.type,
          message,
          severity: category.type === 'fraud_alert' ? 'high' : 'medium',
          timestamp: new Date().toLocaleTimeString(),
        };
        
        setNotifications(prev => [newNotif, ...prev.slice(0, 4)]);
      }
    };

    const intervalId = setInterval(generateNotification, interval);
    generateNotification(); // Generate one immediately

    return () => clearInterval(intervalId);
  }, [autoGenerate, interval]);

  const removeNotification = (id) => {
    setNotifications(prev => prev.filter(n => n.id !== id));
  };

  // addNotification can be called externally if needed
  // For now, it's only used internally via autoGenerate

  if (notifications.length === 0) return null;

  return (
    <div className="fixed top-4 right-4 z-50 space-y-2 max-w-sm w-full md:w-auto">
      {notifications.map(notif => {
        const config = notificationTypes[notif.type] || notificationTypes.info;
        const Icon = config.icon;
        
        return (
          <div
            key={notif.id}
            className={`${config.bg} border ${config.border} rounded-lg p-3 animate-slide-in shadow-lg backdrop-blur-sm`}
          >
            <div className="flex items-start gap-2">
              <Icon className={`w-4 h-4 text-${config.color}-400 mt-0.5 flex-shrink-0`} />
              <div className="flex-1 min-w-0">
                <p className="text-xs font-medium text-slate-200">{notif.message}</p>
                <p className="text-[10px] text-slate-400 mt-0.5">{notif.timestamp}</p>
              </div>
              <button
                onClick={() => removeNotification(notif.id)}
                className="flex-shrink-0 text-slate-400 hover:text-slate-200 transition-colors"
              >
                <X className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        );
      })}
    </div>
  );
}

