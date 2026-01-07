import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { RefreshCw, CheckCircle, AlertCircle } from 'lucide-react';

interface DataRefreshProps {
  onRefresh: () => Promise<void>;
  autoRefresh?: boolean;
  refreshInterval?: number; // in seconds
}

export default function DataRefresh({ 
  onRefresh, 
  autoRefresh = false, 
  refreshInterval = 300 
}: DataRefreshProps) {
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [lastRefresh, setLastRefresh] = useState<Date>(new Date());
  const [status, setStatus] = useState<'idle' | 'success' | 'error'>('idle');
  const [countdown, setCountdown] = useState(refreshInterval);

  useEffect(() => {
    if (!autoRefresh) return;

    const timer = setInterval(() => {
      setCountdown((prev) => {
        if (prev <= 1) {
          handleRefresh();
          return refreshInterval;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [autoRefresh, refreshInterval]);

  const handleRefresh = async () => {
    setIsRefreshing(true);
    setStatus('idle');
    
    try {
      await onRefresh();
      setLastRefresh(new Date());
      setStatus('success');
      setTimeout(() => setStatus('idle'), 3000);
    } catch (error) {
      setStatus('error');
      setTimeout(() => setStatus('idle'), 3000);
    } finally {
      setIsRefreshing(false);
      setCountdown(refreshInterval);
    }
  };

  const formatTime = (date: Date) => {
    return date.toLocaleTimeString('en-US', { 
      hour: '2-digit', 
      minute: '2-digit',
      second: '2-digit'
    });
  };

  const formatCountdown = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  return (
    <div className="flex items-center gap-3 p-3 bg-white border border-gray-200 rounded-lg shadow-sm">
      <button
        onClick={handleRefresh}
        disabled={isRefreshing}
        className="p-2 hover:bg-gray-100 rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
        title="Refresh data"
      >
        <motion.div
          animate={isRefreshing ? { rotate: 360 } : {}}
          transition={{ duration: 1, repeat: isRefreshing ? Infinity : 0, ease: "linear" }}
        >
          <RefreshCw size={18} className="text-det-primary" />
        </motion.div>
      </button>

      <div className="flex-1 min-w-0">
        <div className="flex items-center gap-2">
          <span className="text-xs font-medium text-gray-700">
            {isRefreshing ? 'Refreshing...' : 'Last updated'}
          </span>
          {status === 'success' && (
            <CheckCircle size={14} className="text-green-600" />
          )}
          {status === 'error' && (
            <AlertCircle size={14} className="text-red-600" />
          )}
        </div>
        <p className="text-xs text-gray-500">
          {isRefreshing ? 'Please wait...' : formatTime(lastRefresh)}
        </p>
      </div>

      {autoRefresh && (
        <div className="text-right">
          <p className="text-xs font-medium text-gray-700">Next refresh</p>
          <p className="text-xs text-det-primary font-mono">{formatCountdown(countdown)}</p>
        </div>
      )}
    </div>
  );
}
