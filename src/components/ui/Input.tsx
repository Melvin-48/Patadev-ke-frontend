import { InputHTMLAttributes, forwardRef } from 'react';
import { cn } from '../../lib/utils';

const Input = forwardRef<HTMLInputElement, InputHTMLAttributes<HTMLInputElement>>(
  ({ className, ...props }, ref) => (
    <input
      ref={ref}
      className={cn(
        'w-full px-3 py-2 rounded border border-line bg-white text-ink',
        'focus:outline-none focus-visible:ring-2 focus-visible:ring-amber',
        className,
      )}
      {...props}
    />
  ),
);
Input.displayName = 'Input';
export { Input };
export default Input;
