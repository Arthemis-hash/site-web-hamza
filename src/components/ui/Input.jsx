// src/components/ui/Input.jsx
import { forwardRef } from 'react';
import { clsx } from 'clsx';

export const Input = forwardRef(({ 
  label, 
  error, 
  className, 
  type = 'text',
  ...props 
}, ref) => {
  return (
    <div className="form-group">
      {label && (
        <label className="form-label">
          {label}
        </label>
      )}
      <input
        ref={ref}
        type={type}
        className={clsx(
          'input-field',
          error && 'border-red-500 focus:ring-red-500',
          className
        )}
        {...props}
      />
      {error && (
        <p className="form-error">{error}</p>
      )}
    </div>
  );
});

Input.displayName = 'Input';