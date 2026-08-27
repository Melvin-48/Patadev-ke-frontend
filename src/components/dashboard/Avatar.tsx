interface AvatarProps {
  initials: string;
  color?: 'blue' | 'amber' | 'green';
  small?: boolean;
}

// Colored initial circle used for people (and, soon, accounts). Colors come
// from the mock dashboard palette: blue, amber, green.
export default function Avatar({ initials, color = 'blue', small = false }: AvatarProps) {
  return (
    <span className={`avatar avatar-${color} ${small ? 'avatar-small' : ''}`}>
      {initials}
    </span>
  );
}