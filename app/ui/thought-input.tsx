'use client';

import { sono } from './fonts';
import { FaArrowDown, FaXmark } from 'react-icons/fa6';
import {
  ChangeEvent,
  KeyboardEvent,
  MouseEvent,
  useState,
  startTransition,
  useRef,
} from 'react';
import Link from 'next/link';
import { saveThought } from '../lib/actions';
import { Snapshot } from '../lib/types/snapshot';

const COLS = 30;
const ROWS = 15;
const MAX_LENGTH = COLS * ROWS;

export default function ThoughtInput() {
  const [thought, setThought] = useState('');
  const [disabled, setDisabled] = useState(true);
  const timelineRef = useRef<Snapshot[]>([]);
  const recorder = useRef({ recording: false, startTime: -1 });

  function resetState() {
    recorder.current.recording = false;
    recorder.current.startTime = -1;
    setThought('');
    setDisabled(true);
    timelineRef.current = [];
  }

  function handleChange(event: ChangeEvent<HTMLTextAreaElement>) {
    const thoughtString = event.target.value;

    if (!recorder.current.recording) {
      recorder.current.recording = true;
      recorder.current.startTime = Date.now();
      timelineRef.current.push({ ms: 0, text: thoughtString });
      setDisabled(false);
    }

    if (recorder.current.recording)
      timelineRef.current.push({
        ms: Date.now() - recorder.current.startTime,
        text: thoughtString,
      });

    setThought(thoughtString);
  }

  function handleKeyDown(event: KeyboardEvent<HTMLTextAreaElement>) {
    const thoughtString = event.currentTarget.value;

    switch (event.key) {
      case 'Enter':
        event.preventDefault();
        if (thoughtString.length < MAX_LENGTH) {
          event.currentTarget.value =
            thoughtString + ' '.repeat(COLS - (thoughtString.length % COLS));
        }
        break;
      case 'Tab':
        event.preventDefault();
        if (thoughtString.length < MAX_LENGTH) {
          event.currentTarget.value =
            thoughtString +
            ' '.repeat(Math.min(4, MAX_LENGTH - thoughtString.length));
        }
        break;
      default:
        break;
    }
  }

  function handleSave(event: MouseEvent<HTMLButtonElement>) {
    event.preventDefault();

    startTransition(() => {
      saveThought(timelineRef.current, thought).then(() => {
        resetState();
      });
    });
  }

  function handleDiscard(event: MouseEvent<HTMLButtonElement>) {
    event.preventDefault();
    resetState();
  }

  return (
    <div className="flex flex-col">
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
        autoFocus={true}
      ></textarea>
      <div className="my-8 flex justify-between">
        <button
          className="px-4 py-2 flex items-center gap-1 bg-red-400 hover:bg-red-500 disabled:bg-slate-200 rounded-2xl text-white font-medium"
          onClick={handleDiscard}
        >
          <FaXmark className="text-xl" />
          <p>Discard</p>
        </button>
        <button
          className="px-4 py-2 flex items-center gap-1 bg-stream-500 hover:bg-stream-600 disabled:bg-slate-200 rounded-2xl text-white disabled:text-slate-400 font-medium"
          onClick={handleSave}
          disabled={disabled}
        >
          <FaArrowDown />
          <p>Save</p>
        </button>
      </div>
    </div>
  );
}
