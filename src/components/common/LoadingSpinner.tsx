interface LoadingSpinnerProps {
  className?: string;
}

export function LoadingSpinner({
  className = '',
}: LoadingSpinnerProps) {
  return (
    <div
      className={`flex items-center justify-center py-12 ${className}`}
      role="status"
      aria-label="Loading"
    >
      <div className="h-6 w-6 border-2 border-line border-t-ink rounded-full animate-spin" />
    </div>
  );
}

export default LoadingSpinner;
