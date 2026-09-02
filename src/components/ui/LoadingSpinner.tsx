import React from 'react';

export interface LoadingSpinnerProps
  extends React.HTMLAttributes<HTMLDivElement> {}

export function LoadingSpinner({
  className = '',
  ...props
}: LoadingSpinnerProps) {
  return (
    <div
      role="status"
      aria-label="Loading"
      className={`inline-block h-5 w-5 animate-spin rounded-full border-2 border-current border-t-transparent ${className}`}
      {...props}
    />
  );
}

export default LoadingSpinner;
