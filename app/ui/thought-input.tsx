'use client'

import style from './thought-input.module.css'
import { sono } from "./fonts"
import { KeyboardEvent } from 'react';

export default function ThoughtInput() {

  function handleKeyDown(e: KeyboardEvent<HTMLTextAreaElement>) {
  
    switch (e.key) {
      case 'Enter':
        e.preventDefault();
        break;
      case 'Tab':
        e.preventDefault();
        break;
      default:
        break;
    }

  }
  
  return (
    <textarea className={`rounded-md shadow-md resize-none ${sono.className} text-lg`} cols={30} rows={15} maxLength={450} onKeyDown={handleKeyDown}></textarea>
  )
}