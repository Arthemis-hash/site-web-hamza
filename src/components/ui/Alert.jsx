// src/components/ui/Alert.jsx
import { clsx } from 'clsx';
import { AlertTriangle, CheckCircle, Info, XCircle } from 'lucide-react';

export const Alert = ({ 
  children, 
  variant = 'info', 
  className,
  ...props 
}) => {
  const variants = {
    info: {
      container: 'bg-blue-50 border-blue-200 text-blue-800',
      icon: Info,
    },
    success: {
      container: 'bg-green-50 border-green-200 text-green-800',
      icon: CheckCircle,
    },
    warning: {
      container: 'bg-yellow-50 border-yellow-200 text-yellow-800',
      icon: AlertTriangle,
    },
    error: {
      container: 'bg-red-50 border-red-200 text-red-800',
      icon: XCircle,
    },
  };

  const { container, icon: Icon } = variants[variant];

  return (
    <div
      className={clsx(
        'flex items-start space-x-3 p-4 border rounded-lg',
        container,
        className
      )}
      {...props}
    >
      <Icon className="w-5 h-5 flex-shrink-0 mt-0.5" />
      <div className="flex-1">{children}</div>
    </div>
  );
};

