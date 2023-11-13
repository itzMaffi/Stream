'use client';

import { sono } from './fonts';
import { FaArrowRotateLeft, FaArrowLeft, FaPause } from 'react-icons/fa6';
import moment from 'moment';
import { useEffect, useRef, useState } from 'react';
import Link from 'next/link';
import { Snapshot } from '../lib/types/snapshot';

const COLS = 30;
const ROWS = 15;
const MAX_LENGTH = COLS * ROWS;

export default function ThoughtReplay({
  thought,
}: {
  thought: {
    createdAt: Date;
    thoughtString: string;
    thoughtTimeline: Snapshot[];
  };
}) {
  const [snapshot, setSnapshot] = useState(thought.thoughtString);
  const [replaying, setReplaying] = useState(false);
  const timelineRef = useRef<Snapshot[]>([...thought.thoughtTimeline]);
  const timerRef = useRef({
    startTime: -1,
    lastPauseTime: -1,
    pauseOffset: -1,
    now: -1,
  });
  // timerRef cannot be bundled as an object in replaying because the setInterval callback will reference the initial value of the state.
  // Instead, we need to mutate the value of the property of the object, keeping the refernce intact. Additionally, it is not used for rendering.
  const intervalRef = useRef<ReturnType<typeof setInterval>>();

  useEffect(() => clearInterval(intervalRef.current), []);

  function handleReplay() {
    if (!replaying) {
      setReplaying(true);
    if (timerRef.current.startTime === -1)
      timerRef.current.startTime = Date.now();

    timerRef.current.now = Date.now();

    if (timerRef.current.lastPauseTime !== -1)
        timerRef.current.pauseOffset =
          timerRef.current.pauseOffset +
          (timerRef.current.now - timerRef.current.lastPauseTime);

      clearInterval(intervalRef.current);
      intervalRef.current = setInterval(() => {
        timerRef.current.now = Date.now();

        if (timelineRef.current[0]) {
    const currentMs =
      timerRef.current.now -
      timerRef.current.startTime -
      timerRef.current.pauseOffset;
        const currentSnapshot = timelineRef.current[0];

    if (currentMs > currentSnapshot.ms) {
      timelineRef.current.shift();
      setSnapshot(currentSnapshot.text);
}
        } else {
          clearInterval(intervalRef.current);

          setReplaying(false);
          setSnapshot(thought.thoughtString);
          timerRef.current.now = -1;
          timerRef.current.startTime = -1;
          timerRef.current.lastPauseTime = -1;
          timerRef.current.pauseOffset = -1;
          timelineRef.current = [...thought.thoughtTimeline];
        }
      }, 10);
    } else {
          clearInterval(intervalRef.current);
    timerRef.current.lastPauseTime = Date.now();
    setReplaying(false);
  }
  }

  return (
    <div className="flex flex-col">
      <p className="py-2 text-slate-400">
        {moment(thought.createdAt).format('ddd MMM D YYYY hh:mm A')}
      </p>
      <textarea
        className={`rounded-md p-8 shadow-lg resize-none ${sono.className} text-lg break-all whitespace-break-spaces`}
        cols={COLS}
        rows={ROWS}
        maxLength={MAX_LENGTH}
        name="thought"
        value={snapshot}
        disabled
      ></textarea>

      <div className="relative flex justify-center">
        <Link
          href="/history"
          className="absolute left-0 my-8 p-2 bg-teal-400 hover:bg-teal-500 rounded-full text-white text-xl font-semibold"
        >
          <FaArrowLeft />
        </Link>
        <button
          className="my-8 mx-auto p-2 bg-teal-400 hover:bg-teal-500 disabled:bg-slate-400 rounded-full text-white text-xl font-semibold"
          onClick={handleReplay}
        >
          {replaying ? <FaPause /> : <FaArrowRotateLeft />}
        </button>
      </div>
    </div>
  );
}
