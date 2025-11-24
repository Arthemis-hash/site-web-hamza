// src/components/ui/Card.jsx
import { clsx } from 'clsx';

export const Card = ({ children, className, hover = false, ...props }) => {
  return (
    <div
      className={clsx(
        'bg-white rounded-2xl shadow-lg p-6 border border-gray-100',
        hover && 'hover:shadow-xl hover:-translate-y-1 transition-all duration-300 cursor-pointer',
        className
      )}
      {...props}
    >
      {children}
    </div>
  );
};

