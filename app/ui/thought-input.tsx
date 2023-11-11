'use client'

import { sono } from "./fonts"
import { FaArrowDown, FaClockRotateLeft } from 'react-icons/fa6'
import { ChangeEvent, KeyboardEvent, MouseEvent, useState, startTransition, useRef } from 'react';
import Link from "next/link";
import { saveThought } from "../lib/actions";
import { Snapshot } from "../lib/types/snapshot";

const COLS = 30;
const ROWS = 15;
const MAX_LENGTH = COLS * ROWS;

export default function ThoughtInput() {

  const [thought, setThought] = useState("");
  const [disabled, setDisabled] = useState(true);
  const timelineRef = useRef<Snapshot[]>([]);
  const recorder = useRef({recording: false, startTime: -1});

  function handleChange(event: ChangeEvent<HTMLTextAreaElement>) {
    const thoughtString = event.target.value;

    if (!recorder.current.recording) {
      recorder.current.recording = true, 
      recorder.current.startTime = Date.now();
      timelineRef.current.push({ms: 0, text: thoughtString});
      setDisabled(false);
    }
    
    if (recorder.current.recording) timelineRef.current.push({ms: Date.now() - recorder.current.startTime, text: thoughtString});
    
    setThought(thoughtString);
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
      saveThought(timelineRef.current, thought).then(() => {
        recorder.current.recording = false;
        recorder.current.startTime = -1;
        setThought("");
        setDisabled(true);
        timelineRef.current = [];
      });
    })
  }

  return (
    <div className="flex flex-col">
      <p className="py-2 text-slate-400">New</p>
      <textarea 
        className={`rounded-md p-8 shadow-lg focus:outline-none resize-none ${sono.className}  text-lg break-all whitespace-break-spaces`} 
        cols={COLS} 
        rows={ROWS} 
        maxLength={MAX_LENGTH} 
        name="thought" 
        value={thought} 
        onKeyDown={handleKeyDown} 
        onChange={handleChange} 
        autoComplete="off" 
        autoCorrect="off" 
        spellCheck={false} 
        autoFocus={true}>
      </textarea>
      <div className="relative flex justify-center">
        <button 
          className="my-8 p-2 bg-teal-400 hover:bg-teal-500 disabled:bg-slate-400 rounded-full text-white text-xl font-semibold " 
          onClick={handleSave}
          disabled={disabled}>
            <FaArrowDown className="stroke-1"/>
        </button>
        <Link 
          href="/history"
          className="absolute right-0 my-8 p-2 bg-teal-400 hover:bg-teal-500 rounded-full text-white text-xl font-semibold">
          <FaClockRotateLeft />
        </Link>
      </div>
    </div>
  )
}