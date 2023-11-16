"use client";

import { sono } from "./fonts";
import { FaArrowRotateLeft, FaRegTrashCan, FaPause } from "react-icons/fa6";
import moment from "moment";
import { startTransition, useEffect, useRef, useState } from "react";
import { Snapshot } from "../lib/types/snapshot";
import { deleteThought } from "../lib/actions";

const COLS = 30;
const ROWS = 15;
const MAX_LENGTH = COLS * ROWS;

export default function ThoughtReplay({
  thought
}: // TODO: Create proper type based on those parameters. The type can be named as IThoughtReplayProps, then use
// export default function ThoughtReplay(props: IThoughtReplayProps)...
{
  thought: {
    id: string;
    createdAt: Date;
    thoughtString: string;
    thoughtTimeline: Snapshot[];
  };
}) {
  // TODO: Make sure all item refered to state should have a definate type!
  // "any" as a type is not allowed!
  // use `useState<T>` instead.
  // See https://www.robinwieruch.de/typescript-react-usestate/
  const [snapshot, setSnapshot] = useState(thought.thoughtString);
  const [replaying, setReplaying] = useState(false);
  const timelineRef = useRef<Snapshot[]>([...thought.thoughtTimeline]);

  // TODO: Create proper type based on those parameters.
  const timerRef = useRef({
    startTime: -1,
    lastPauseTime: -1,
    pauseOffset: -1,
    now: -1
  });
  // timerRef cannot be bundled as an object in replaying because the setInterval callback will reference the initial value of the state.
  // Instead, we need to mutate the value of the property of the object, keeping the refernce intact. Additionally, it is not used for rendering.
  // TODO: Consider remove or simplify intervalRef, as we don't use that in html tag
  const intervalRef = useRef<ReturnType<typeof setInterval>>();

  useEffect(() => clearInterval(intervalRef.current), []);

  function pauseReplay() {
    clearInterval(intervalRef.current);
    timerRef.current.lastPauseTime = Date.now();
    setReplaying(false);
  }

  function initOrUpdateTimer() {
    if (timerRef.current.startTime === -1) timerRef.current.startTime = Date.now();

    timerRef.current.now = Date.now();

    if (timerRef.current.lastPauseTime !== -1)
      timerRef.current.pauseOffset = timerRef.current.pauseOffset + (timerRef.current.now - timerRef.current.lastPauseTime);
  }

  // TODO: Unit test this
  function resetReplayState() {
    setReplaying(false);
    setSnapshot(thought.thoughtString);
    timerRef.current.now = -1;
    timerRef.current.startTime = -1;
    timerRef.current.lastPauseTime = -1;
    timerRef.current.pauseOffset = -1;
    timelineRef.current = [...thought.thoughtTimeline];
  }

  // TODO: Unit test this
  function endReplay() {
    clearInterval(intervalRef.current);
    resetReplayState();
  }

  // TODO: Unit test this
  function startReplay() {
    setReplaying(true);
    initOrUpdateTimer();

    clearInterval(intervalRef.current);
    intervalRef.current = setInterval(() => {
      timerRef.current.now = Date.now();

      if (timelineRef.current[0]) {
        // TODO: Rename to `timeElapsed`. `currentMs` is ambiguous.
        const currentMs = timerRef.current.now - timerRef.current.startTime - timerRef.current.pauseOffset;
        const currentSnapshot = timelineRef.current[0];

        if (currentMs > currentSnapshot.ms) {
          timelineRef.current.shift();
          setSnapshot(currentSnapshot.text);
        }
      } else {
        endReplay();
      }
    }, 10);
  }

  // TODO: Unit test this
  function handleReplay() {
    if (!replaying) {
      startReplay();
    } else {
      pauseReplay();
    }
  }

  // TODO: Unit test this
  function handleDelete() {
    startTransition(() => {
      deleteThought(thought.id);
    });
  }

  // TODO: Remove any "anytype" from the code
  return (
    <div className="flex flex-col">
      <p className="py-2 text-slate-400">{moment(thought.createdAt).format("ddd MMM D YYYY hh:mm A")}</p>
      <textarea
        className={`rounded-md p-8 shadow-lg resize-none ${sono.className} md:text-lg break-all whitespace-break-spaces`}
        cols={COLS}
        rows={ROWS}
        maxLength={MAX_LENGTH}
        name="thought"
        value={snapshot}
        disabled
      />
      <div className="my-8 flex justify-between">
        <button
          className="px-4 py-2 flex items-center gap-1 bg-red-400 hover:bg-red-500 disabled:bg-slate-200 rounded-2xl text-white font-medium"
          onClick={handleDelete}
        >
          <FaRegTrashCan />
          <p>Delete</p>
        </button>
        <button
          className="px-4 py-2 flex items-center gap-1 bg-stream-500 hover:bg-stream-600 rounded-2xl text-white font-medium"
          onClick={handleReplay}
        >
          {replaying ? (
            <>
              <FaPause />
              <p>Pause</p>
            </>
          ) : (
            <>
              <FaArrowRotateLeft />
              <p>Replay</p>
            </>
          )}
        </button>
      </div>
    </div>
  );
}
