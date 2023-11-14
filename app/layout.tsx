import type { Metadata } from 'next';
import { comfortaa } from './ui/fonts';
import './ui/globals.css';

export const metadata: Metadata = {
  title: 'Stream',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={`${comfortaa.className}`}>
        {children}
      </body>
    </html>
  );
}
