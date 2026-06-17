import * as Icons from 'lucide-react';
import type { LucideProps } from 'lucide-react';

type IconComponent = React.ComponentType<LucideProps>;

/**
 * Render a lucide icon by its string name (icons are referenced as strings
 * in the content registry). Falls back to a neutral dot if the name is unknown.
 */
export function Icon({ name, ...props }: { name: string } & LucideProps) {
  const map = Icons as unknown as Record<string, IconComponent>;
  const Cmp = map[name] ?? Icons.Circle;
  return <Cmp {...props} />;
}
