import { Quicksand } from 'next/font/google'
import { Sono } from 'next/font/google'

export const quicksand = Quicksand({ subsets: ['latin'] })
export const sono = Sono({ subsets: ['latin'], fallback: ['monospace'] })