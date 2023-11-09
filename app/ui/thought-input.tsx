'use client'

import { sono } from "./fonts"
import { ChangeEvent, KeyboardEvent } from 'react';

const COLS = 30;
const ROWS = 15;
const MAX_LENGTH = COLS * ROWS;

export default function ThoughtInput() {

  function handleKeyDown(event: KeyboardEvent<HTMLTextAreaElement>) {

    switch (event.key) {
      case 'Enter':
        event.preventDefault();
        if (event.currentTarget.value.length < MAX_LENGTH) {
          event.currentTarget.value = event.currentTarget.value + ' '.repeat(COLS - (event.currentTarget.value.length % COLS));
        }
        break;
      case 'Tab':
        event.preventDefault();
        if (event.currentTarget.value.length < MAX_LENGTH) {
          event.currentTarget.value = event.currentTarget.value + ' '.repeat(Math.min(4, MAX_LENGTH - event.currentTarget.value.length));
        }
        break;
      default:
        break;
    }

  }

  return (
    <textarea className={`rounded-md p-4 shadow-lg focus:outline-none resize-none ${sono.className}  text-lg break-all whitespace-break-spaces`} cols={COLS} rows={ROWS} maxLength={MAX_LENGTH} onKeyDown={handleKeyDown} wrap="hard" autoComplete="off" autoCorrect="off" autoFocus={true}></textarea>
  )
}