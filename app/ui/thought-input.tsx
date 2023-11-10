'use client'

import { sono } from "./fonts"
import { ChangeEvent, KeyboardEvent, MouseEvent, useState, startTransition, useRef } from 'react';
import { saveThought } from "../lib/actions";
import { Snapshot } from "../lib/types/snapshot";

const COLS = 30;
const ROWS = 15;
const MAX_LENGTH = COLS * ROWS;

export default function ThoughtInput() {

  const [recorder, setRecorder] = useState({recording: false, startTime: -1});
  const [thought, setThought] = useState("");
  const timelineRef = useRef<Snapshot[]>([]);

  function handleChange(event: ChangeEvent<HTMLTextAreaElement>) {
    const thoughtString = event.target.value;

    setThought(thoughtString);

    if (!recorder.recording) {
      setRecorder({recording: true, startTime: Date.now()});
      timelineRef.current.push({ms: 0, text: thoughtString});
    }

    if (recorder.recording) timelineRef.current.push({ms: Date.now() - recorder.startTime, text: thoughtString});
  }

  function handleKeyDown(event: KeyboardEvent<HTMLTextAreaElement>) {
    let thoughtString = event.currentTarget.value;

    switch (event.key) {
      case 'Enter':
        event.preventDefault();
        if (thoughtString.length < MAX_LENGTH) {
          event.currentTarget.value = thoughtString + ' '.repeat(COLS - (thoughtString.length % COLS));
        }
        break;
      case 'Tab':
        event.preventDefault();
        if (thoughtString.length < MAX_LENGTH) {
          event.currentTarget.value = thoughtString + ' '.repeat(Math.min(4, MAX_LENGTH - thoughtString.length));
        }
        break;
      default:
        break;
    }
  }

  function handleSave(event: MouseEvent<HTMLButtonElement>) {
    event.preventDefault();

    startTransition( ()=> {
      saveThought(timelineRef.current, thought);
      timelineRef.current = [];
      setRecorder({recording: false, startTime: -1});
      setThought("");
    })
  }

  return (
    <div className="flex flex-col">
      <textarea className={`rounded-md p-4 shadow-lg focus:outline-none resize-none ${sono.className}  text-lg break-all whitespace-break-spaces`} cols={COLS} rows={ROWS} maxLength={MAX_LENGTH} name="thought" value={thought} onKeyDown={handleKeyDown} onChange={handleChange} autoComplete="off" autoCorrect="off" spellCheck={false} autoFocus={true}></textarea>
      <button type="submit" className="my-8" onClick={handleSave}>Save</button>
    </div>
  )
}