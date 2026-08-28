import { ButtonHTMLAttributes } from 'react';
import { cn } from '../../lib/utils';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'danger';
}

export default function Button({ variant = 'primary', className, ...props }: ButtonProps) {
  const variants = {
    primary: 'bg-ink text-paper hover:bg-ink/90',
    secondary: 'bg-transparent text-ink border border-line hover:bg-line/40',
    danger: 'bg-danger text-paper hover:bg-danger/90',
  };

  return (
    <button
      className={cn(
        'px-4 py-2 rounded font-medium text-sm transition-colors',
        'focus:outline-none focus-visible:ring-2 focus-visible:ring-amber focus-visible:ring-offset-2',
        'disabled:opacity-50 disabled:cursor-not-allowed',
        variants[variant],
        className,
      )}
      {...props}
    />
  );
}
