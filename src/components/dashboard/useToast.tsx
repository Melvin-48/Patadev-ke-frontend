import { useRef, useState } from 'react';
import { Check } from 'lucide-react';

// Small self-contained toast state. Each page keeps its own toast rather than
// a global store - matches the mock dashboard's behaviour (auto-dismiss ~3s).
export function useToast() {
  const [toast, setToast] = useState('');
  const timer = useRef<number>(0);

  function notify(message: string) {
    setToast(message);
    window.clearTimeout(timer.current);
    timer.current = window.setTimeout(() => setToast(''), 2800);
  }

  return { toast, notify };
}

export function Toast({ message }: { message: string }) {
  if (!message) return null;
  return <div className="toast"><Check size={16} />{message}</div>;
}