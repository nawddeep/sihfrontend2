import React, { createContext, useContext, useState, useCallback } from 'react';

/**
 * NotificationContext
 * Centralized notification management for the entire application.
 * Any component can call useNotification() to add/remove notifications.
 */
const NotificationContext = createContext();

export const NotificationProvider = ({ children }) => {
  const [notifications, setNotifications] = useState([]);
  const MAX_NOTIFICATIONS = 5;

  /**
   * Add a new notification
   * @param {string} severity - 'info', 'success', 'warning', 'error'
   * @param {string} message - Notification message
   * @param {string} relatedEntity - Optional entity ID for context
   * @param {number} duration - Auto-remove after duration (ms), 0 for manual only
   */
  const addNotification = useCallback(
    (severity, message, relatedEntity = null, duration = 5000) => {
      const id = `notif-${Date.now()}-${Math.random()}`;

      const newNotification = {
        id,
        severity, // 'info', 'success', 'warning', 'error'
        message,
        relatedEntity,
        timestamp: new Date().toLocaleTimeString('en-IN'),
      };

      setNotifications((prev) => {
        const updated = [newNotification, ...prev];
        // Cap at MAX_NOTIFICATIONS
        return updated.slice(0, MAX_NOTIFICATIONS);
      });

      // Auto-remove after duration if specified
      if (duration > 0) {
        setTimeout(() => {
          removeNotification(id);
        }, duration);
      }

      return id;
    },
    []
  );

  /**
   * Remove a notification by ID
   */
  const removeNotification = useCallback((id) => {
    setNotifications((prev) => prev.filter((n) => n.id !== id));
  }, []);

  /**
   * Clear all notifications
   */
  const clearAll = useCallback(() => {
    setNotifications([]);
  }, []);

  const value = {
    notifications,
    addNotification,
    removeNotification,
    clearAll,
  };

  return (
    <NotificationContext.Provider value={value}>
      {children}
    </NotificationContext.Provider>
  );
};

/**
 * Hook to access notification context
 */
export const useNotification = () => {
  const context = useContext(NotificationContext);
  if (!context) {
    throw new Error('useNotification must be used within NotificationProvider');
  }
  return context;
};

export default NotificationContext;
