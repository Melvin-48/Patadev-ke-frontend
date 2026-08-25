import { HTMLAttributes } from 'react';
import { cn } from '../../lib/utils';

export default function Card({ className, ...props }: HTMLAttributes<HTMLDivElement>) {
  return (
    <div className={cn('bg-white border border-line rounded p-5', className)} {...props} />
  );
}