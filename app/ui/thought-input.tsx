'use client'

import { sono } from "./fonts"
import { ChangeEvent, KeyboardEvent, use, useRef, useState } from 'react';

const COLS = 30;
const ROWS = 15;
const MAX_LENGTH = COLS * ROWS;

type Snapshot = {
  ms: number
  text: string
}

export default function ThoughtInput() {

  const [recorder, setRecorder] = useState({recording: false, startTime: -1});
  const timelineRef = useRef<Snapshot[]>([])

  function handleChange(event: ChangeEvent<HTMLTextAreaElement>) {

    if (!recorder.recording) {
      setRecorder(prevRecorder => ({...prevRecorder, recording: true, startTime: Date.now()}));
      timelineRef.current.push({ms: 0, text: event.target.value});
    }

    if (recorder.recording) timelineRef.current.push({ms: Date.now() - recorder.startTime, text: event.target.value});
    console.log(timelineRef.current);
  }

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
    <div className="flex flex-col">
      <textarea className={`rounded-md p-4 shadow-lg focus:outline-none resize-none ${sono.className}  text-lg break-all whitespace-break-spaces`} cols={COLS} rows={ROWS} maxLength={MAX_LENGTH} onKeyDown={handleKeyDown} onChange={handleChange} wrap="hard" autoComplete="off" autoCorrect="off" autoFocus={true}></textarea>
      <button className="my-8 ">Stop</button>
    </div>
  )
}