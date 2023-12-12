'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { FaPenToSquare, FaClockRotateLeft } from 'react-icons/fa6';
import clsx from 'clsx';

const links = [
  { name: 'New', href: '/dashboard', icon: FaPenToSquare },
  { name: 'History', href: '/dashboard/history', icon: FaClockRotateLeft },
];

export default function NavLinks() {
  const pathname = usePathname();
  return (
    <>
      {links.map((link) => {
        const LinkIcon = link.icon;
        return (
          <Link
            key={link.name}
            href={link.href}
            className={clsx(
              'flex flex-1 items-center rounded-2xl bg-stream-50 p-4 text-stream-800',
              { 'bg-stream-500 text-white': pathname === link.href }
            )}
          >
            <LinkIcon className="me-2" />
            <p className="font-medium">{link.name}</p>
          </Link>
        );
      })}
    </>
  );
}
