import React from 'react';

export interface BadgeProps
  extends React.HTMLAttributes<HTMLSpanElement> {
  tone?: string;
  variant?:
    | 'default'
    | 'primary'
    | 'secondary'
    | 'success'
    | 'warning'
    | 'danger'
    | 'outline';
}

export const Badge = React.forwardRef<HTMLSpanElement, BadgeProps>(
  (
    {
      children,
      variant = 'default',
      tone,
      className = '',
      ...props
    },
    ref,
  ) => {
    const base =
      'inline-flex items-center rounded-full px-2.5 py-1 text-xs font-semibold';

    const variants: Record<string, string> = {
      default: 'bg-gray-100 text-gray-800',
      primary: 'bg-blue-100 text-blue-800',
      secondary: 'bg-gray-100 text-gray-800',
      success: 'bg-green-100 text-green-800',
      warning: 'bg-yellow-100 text-yellow-800',
      danger: 'bg-red-100 text-red-800',
      outline: 'border border-gray-300 text-gray-700 bg-white',
    };

    return (
      <span
        ref={ref}
        className={`${base} ${variants[variant]} ${className}`}
        {...props}
      >
        {children}
      </span>
    );
  },
);

Badge.displayName = 'Badge';

export default Badge;

