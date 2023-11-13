import Link from 'next/link';
import { FaPenToSquare, FaClockRotateLeft } from 'react-icons/fa6';

const links = [
  { name: 'New', href: '/dashboard', icon: FaPenToSquare },
  { name: 'History', href: '/dashboard/history', icon: FaClockRotateLeft },
];

export default function NavLinks() {
  return (
    <>
      {links.map((link) => {
        const LinkIcon = link.icon;
        return (
          <Link
            key={link.name}
            href={link.href}
            className="p-4 rounded-2xl flex items-center bg-stream-50 text-stream-800"
          >
            <LinkIcon className="me-2" />
            <p className='font-medium'>{link.name}</p>
          </Link>
        );
      })}
    </>
  );
}
