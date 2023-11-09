'use client'

import { sono } from "./fonts"
import { ChangeEvent, KeyboardEvent, MouseEventHandler, useRef, useState } from 'react';
import { saveThought } from "../lib/actions";

const COLS = 30;
const ROWS = 15;
const MAX_LENGTH = COLS * ROWS;

type Snapshot = {
  ms: number
  text: string
}

export default function ThoughtInput() {

  const [recorder, setRecorder] = useState({recording: false, startTime: -1});
  const [thought, setThought] = useState("");
  const timelineRef = useRef<Snapshot[]>([])

  function handleChange(event: ChangeEvent<HTMLTextAreaElement>) {
    setThought(event.target.value);

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
    <form className="flex flex-col" action={saveThought}>
      <textarea className={`rounded-md p-4 shadow-lg focus:outline-none resize-none ${sono.className}  text-lg break-all whitespace-break-spaces`} cols={COLS} rows={ROWS} maxLength={MAX_LENGTH} name="thought"  value={thought} onKeyDown={handleKeyDown} onChange={handleChange} autoComplete="off" autoCorrect="off" spellCheck={false} autoFocus={true}></textarea>
      <button type="submit" className="my-8">Save</button>
    </form>
  )
}