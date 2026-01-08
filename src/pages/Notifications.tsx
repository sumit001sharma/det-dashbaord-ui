import { motion } from 'framer-motion';
import { Bell, CheckCircle, AlertCircle, Info, TrendingUp, Calendar, Users, X } from 'lucide-react';
import { useState } from 'react';

interface Notification {
  id: string;
  type: 'success' | 'warning' | 'info' | 'alert';
  title: string;
  message: string;
  timestamp: string;
  read: boolean;
  category: string;
}

export default function Notifications() {
  const [notifications, setNotifications] = useState<Notification[]>([
    {
      id: '1',
      type: 'success',
      title: 'Tourism Dashboard Updated',
      message: 'Q4 2024 tourism statistics have been successfully uploaded and are now available for viewing.',
      timestamp: '2 hours ago',
      read: false,
      category: 'Data Update'
    },
    {
      id: '2',
      type: 'info',
      title: 'New FDI Report Available',
      message: 'The latest Foreign Direct Investment report for December 2024 is now available in the FDI Dashboard.',
      timestamp: '5 hours ago',
      read: false,
      category: 'Reports'
    },
    {
      id: '3',
      type: 'alert',
      title: 'System Maintenance Scheduled',
      message: 'Scheduled maintenance on January 15, 2026 from 2:00 AM to 4:00 AM GST. Some features may be temporarily unavailable.',
      timestamp: '1 day ago',
      read: false,
      category: 'System'
    },
    {
      id: '4',
      type: 'warning',
      title: 'Data Refresh Required',
      message: 'Hotel Performance metrics require manual refresh. Please update the data source connection.',
      timestamp: '2 days ago',
      read: true,
      category: 'Action Required'
    },
    {
      id: '5',
      type: 'info',
      title: 'New Entity Dashboard Coming Soon',
      message: 'Business Registration & Licensing dashboard will be available in the next release.',
      timestamp: '3 days ago',
      read: true,
      category: 'Announcements'
    },
    {
      id: '6',
      type: 'success',
      title: 'Analytics Dashboard Enhanced',
      message: 'New visualization features and filters have been added to the Analytics Dashboard.',
      timestamp: '4 days ago',
      read: true,
      category: 'Features'
    }
  ]);

  const getIcon = (type: string) => {
    switch (type) {
      case 'success': return <CheckCircle className="text-green-600" size={24} />;
      case 'warning': return <AlertCircle className="text-yellow-600" size={24} />;
      case 'info': return <Info className="text-blue-600" size={24} />;
      case 'alert': return <AlertCircle className="text-red-600" size={24} />;
      default: return <Bell className="text-gray-600" size={24} />;
    }
  };

  const getBgColor = (type: string) => {
    switch (type) {
      case 'success': return 'bg-green-50 border-green-200';
      case 'warning': return 'bg-yellow-50 border-yellow-200';
      case 'info': return 'bg-blue-50 border-blue-200';
      case 'alert': return 'bg-red-50 border-red-200';
      default: return 'bg-gray-50 border-gray-200';
    }
  };

  const markAsRead = (id: string) => {
    setNotifications(notifications.map(notif => 
      notif.id === id ? { ...notif, read: true } : notif
    ));
  };

  const markAllAsRead = () => {
    setNotifications(notifications.map(notif => ({ ...notif, read: true })));
  };

  const deleteNotification = (id: string) => {
    setNotifications(notifications.filter(notif => notif.id !== id));
  };

  const unreadCount = notifications.filter(n => !n.read).length;

  return (
    <div className="space-y-6">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-gradient-to-r from-det-primary to-primary-800 text-white rounded-xl p-6 sm:p-8 shadow-lg"
      >
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <div className="p-3 bg-white/20 rounded-lg backdrop-blur-sm">
              <Bell size={32} />
            </div>
            <div>
              <h1 className="text-2xl sm:text-3xl font-bold">Notifications</h1>
              <p className="text-white/90 mt-1">
                {unreadCount > 0 ? `${unreadCount} unread notification${unreadCount > 1 ? 's' : ''}` : 'All caught up!'}
              </p>
            </div>
          </div>
          {unreadCount > 0 && (
            <button
              onClick={markAllAsRead}
              className="px-4 py-2 bg-white/20 hover:bg-white/30 rounded-lg transition-colors text-sm font-medium backdrop-blur-sm"
            >
              Mark all as read
            </button>
          )}
        </div>
      </motion.div>

      {/* Quick Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-4 gap-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="bg-white rounded-xl p-4 shadow-md border border-gray-200"
        >
          <div className="flex items-center gap-3">
            <div className="p-2 bg-blue-50 rounded-lg">
              <Bell className="text-blue-600" size={20} />
            </div>
            <div>
              <p className="text-2xl font-bold text-det-dark">{notifications.length}</p>
              <p className="text-xs text-gray-600">Total</p>
            </div>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="bg-white rounded-xl p-4 shadow-md border border-gray-200"
        >
          <div className="flex items-center gap-3">
            <div className="p-2 bg-green-50 rounded-lg">
              <CheckCircle className="text-green-600" size={20} />
            </div>
            <div>
              <p className="text-2xl font-bold text-det-dark">{notifications.filter(n => n.type === 'success').length}</p>
              <p className="text-xs text-gray-600">Success</p>
            </div>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="bg-white rounded-xl p-4 shadow-md border border-gray-200"
        >
          <div className="flex items-center gap-3">
            <div className="p-2 bg-yellow-50 rounded-lg">
              <AlertCircle className="text-yellow-600" size={20} />
            </div>
            <div>
              <p className="text-2xl font-bold text-det-dark">{notifications.filter(n => n.type === 'warning' || n.type === 'alert').length}</p>
              <p className="text-xs text-gray-600">Alerts</p>
            </div>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="bg-white rounded-xl p-4 shadow-md border border-gray-200"
        >
          <div className="flex items-center gap-3">
            <div className="p-2 bg-purple-50 rounded-lg">
              <Info className="text-purple-600" size={20} />
            </div>
            <div>
              <p className="text-2xl font-bold text-det-dark">{unreadCount}</p>
              <p className="text-xs text-gray-600">Unread</p>
            </div>
          </div>
        </motion.div>
      </div>

      {/* Notifications List */}
      <div className="space-y-3">
        {notifications.length === 0 ? (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="bg-white rounded-xl p-12 text-center shadow-md border border-gray-200"
          >
            <Bell className="mx-auto text-gray-400 mb-4" size={48} />
            <h3 className="text-lg font-semibold text-gray-700 mb-2">No Notifications</h3>
            <p className="text-gray-500">You're all caught up! Check back later for updates.</p>
          </motion.div>
        ) : (
          notifications.map((notification, index) => (
            <motion.div
              key={notification.id}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.1 * (index + 5) }}
              className={`bg-white rounded-xl p-4 sm:p-6 shadow-md border-l-4 ${
                notification.read ? 'border-gray-300 opacity-75' : getBgColor(notification.type)
              } hover:shadow-lg transition-all duration-200`}
            >
              <div className="flex items-start gap-4">
                <div className="flex-shrink-0 mt-1">
                  {getIcon(notification.type)}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-start justify-between gap-4 mb-2">
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-1">
                        <h3 className="font-semibold text-det-dark">{notification.title}</h3>
                        {!notification.read && (
                          <span className="w-2 h-2 bg-det-primary rounded-full animate-pulse"></span>
                        )}
                      </div>
                      <span className="text-xs text-gray-500 bg-gray-100 px-2 py-1 rounded-full">
                        {notification.category}
                      </span>
                    </div>
                    <button
                      onClick={() => deleteNotification(notification.id)}
                      className="text-gray-400 hover:text-red-600 transition-colors flex-shrink-0"
                      aria-label="Delete notification"
                    >
                      <X size={18} />
                    </button>
                  </div>
                  <p className="text-gray-700 text-sm mb-3">{notification.message}</p>
                  <div className="flex items-center justify-between">
                    <span className="text-xs text-gray-500">{notification.timestamp}</span>
                    {!notification.read && (
                      <button
                        onClick={() => markAsRead(notification.id)}
                        className="text-xs text-det-primary hover:text-det-secondary font-medium transition-colors"
                      >
                        Mark as read
                      </button>
                    )}
                  </div>
                </div>
              </div>
            </motion.div>
          ))
        )}
      </div>
    </div>
  );
}
