import type { ComponentProps } from 'react';
import { Link } from '@/i18n/navigation';

interface FooterColumnProps {
  title: string;
  links: { href: ComponentProps<typeof Link>['href']; label: string }[];
}

export default function FooterColumn({ title, links }: FooterColumnProps) {
  return (
    <div className="space-y-3">
      <h3 className="text-sm font-semibold text-foreground">{title}</h3>
      <ul className="space-y-2">
        {links.map((link) => (
          <li key={link.label}>
            <Link
              href={link.href}
              className="rounded-sm text-sm text-muted-foreground transition-colors hover:text-brand focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-card"
            >
              {link.label}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
