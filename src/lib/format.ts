// KES helpers shared across the dashboard. The platform trades exclusively in
// Kenyan Shillings, so every amount is rendered through these.
export function formatKES(amount: number): string {
  if (amount < 0) {
    return `-KES ${Math.abs(amount).toLocaleString('en-KE')}`;
  }
  return `KES ${amount.toLocaleString('en-KE')}`;
}

export function formatKESRange(min: number, max: number): string {
  return `KES ${min.toLocaleString('en-KE')} – KES ${max.toLocaleString('en-KE')}`;
}

// Compact form used on cards, e.g. "KES 720K".
export function formatKESCompact(amount: number): string {
  if (amount >= 1_000_000) {
    return `KES ${(amount / 1_000_000).toFixed(1).replace(/\.0$/, '')}M`;
  }
  if (amount >= 1_000) {
    return `KES ${(amount / 1_000).toFixed(0)}K`;
  }
  return `KES ${amount}`;
}