import { cn } from '../../lib/utils';

/* Initials + colour pairs for the avatar ring */
const AVATARS = [
  { initials: 'AK', bg: 'bg-primary/20',  text: 'text-primary'   },
  { initials: 'LM', bg: 'bg-amber/20',    text: 'text-amber-dark' },
  { initials: 'PO', bg: 'bg-success/20',  text: 'text-success'    },
  { initials: 'TN', bg: 'bg-navy/15',     text: 'text-navy'       },
];

export default function TrustIndicator() {
  return (
    <div className="flex items-center gap-3">
      {/* Avatar ring */}
      <div className="flex -space-x-2">
        {AVATARS.map(({ initials, bg, text }) => (
          <span
            key={initials}
            className={cn(
              'w-7 h-7 rounded-full border-2 border-white flex items-center justify-center',
              'text-[9px] font-bold',
              bg,
              text,
            )}
          >
            {initials}
          </span>
        ))}
      </div>

      {/* Copy */}
      <p className="text-[12px] text-muted leading-snug">
        Trusted by <span className="font-semibold text-navy">businesses &amp; developers</span>{' '}
        across Kenya
      </p>
    </div>
  );
}
