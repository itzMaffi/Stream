import type { Metadata } from 'next'
import { inter } from './ui/fonts'
import './ui/globals.css'

export const metadata: Metadata = {
  title: 'Stream',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={inter.className}>{children}</body>
    </html>
  )
}

