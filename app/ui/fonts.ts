import { Comfortaa } from 'next/font/google';
import { Sono } from 'next/font/google';

export const comfortaa = Comfortaa({ subsets: ['latin'] });
export const sono = Sono({ subsets: ['latin'], fallback: ['monospace'] });
