import React, { useEffect } from 'react';
import { CheckCircle, AlertCircle, XCircle, Info, X } from 'lucide-react';

export type ToastType = 'success' | 'error' | 'warning' | 'info';

interface ToastProps {
  message: string;
  type: ToastType;
  onClose: () => void;
  duration?: number;
}

const icons = {
  success: CheckCircle,
  error: XCircle,
  warning: AlertCircle,
  info: Info,
};

const styles = {
  success: 'bg-primary-50 text-primary-800 border-primary-200',
  error: 'bg-red-50 text-red-800 border-red-200',
  warning: 'bg-red-50 text-red-800 border-red-200',
  info: 'bg-primary-50 text-primary-800 border-primary-200',
};

export default function Toast({ message, type, onClose, duration = 5000 }: ToastProps) {
  useEffect(() => {
    const timer = setTimeout(() => {
      onClose();
    }, duration);

    return () => clearTimeout(timer);
  }, [duration, onClose]);

  const Icon = icons[type];

  return (
    <div className={`fixed bottom-4 right-4 z-50 animate-slide-up`}>
      <div className={`flex items-center p-4 rounded-lg border shadow-lg ${styles[type]}`}>
        <Icon className={`h-5 w-5 mr-3 flex-shrink-0 ${type === 'error' || type === 'warning' ? 'text-red-600' : 'text-primary-600'}`} />
        <p className="text-sm font-medium">{message}</p>
        <button
          onClick={onClose}
          className="ml-4 text-gray-400 hover:text-gray-600 transition-colors"
        >
          <X className="h-4 w-4" />
        </button>
      </div>
    </div>
  );
} 