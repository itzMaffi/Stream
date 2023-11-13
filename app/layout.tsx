import type { Metadata } from 'next';
import { quicksand } from './ui/fonts';
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
      <body className={quicksand.className}>
        {children}
      </body>
    </html>
  );
}
