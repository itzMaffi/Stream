"use client";

import {
  FaArrowRotateLeft,
  FaRegTrashCan,
  FaPause,
  FaStopwatch,
} from "react-icons/fa6";
import moment from "moment";
import { startTransition, useEffect, useRef, useState } from "react";
import { Snapshot } from "../lib/types/snapshot";
import { deleteThought } from "../lib/actions";
import TextArea from "./text-area";
import ParsedThought from "../lib/types/ParsedThought";
import Timeline from "./timeline";

const COLS = 30;
const ROWS = 15;

export default function ThoughtReplay({ thought }: { thought: ParsedThought }) {
  // TODO: Make sure all item refered to state should have a definate type!
  // "any" as a type is not allowed!
  // use `useState<T>` instead.
  // See https://www.robinwieruch.de/typescript-react-usestate/
  const [snapshot, setSnapshot] = useState(thought.thoughtString);
  const [replaying, setReplaying] = useState(false);
  const [elapsedTime, setElapsedTime] = useState(0);
  const [speed, setSpeed] = useState(1);

  const durationRef = useRef(
    thought.thoughtTimeline[thought.thoughtTimeline.length - 1]?.ms + 10 ?? 0
  );

  const timelineRef = useRef<Snapshot[]>([...thought.thoughtTimeline]);

  // TODO: Create proper type based on those parameters.
  const timerRef = useRef({
    elapsedTime: 0,
    speedModifier: 1,
  });
  // timerRef cannot be bundled as an object in replaying because the setInterval callback will reference the initial value of the state.
  // Instead, we need to mutate the value of the property of the object, keeping the refernce intact. Additionally, it is not used for rendering.
  // TODO: Consider remove or simplify intervalRef, as we don't use that in html tag
  const intervalRef = useRef<ReturnType<typeof setInterval>>();

  useEffect(() => clearInterval(intervalRef.current), []);

  function pauseReplay() {
    clearInterval(intervalRef.current);
    setReplaying(false);
  }

  function resetReplayState() {
    setReplaying(false);
    setSnapshot(thought.thoughtString);
    timerRef.current.elapsedTime = 0;
  }

  function endReplay() {
    clearInterval(intervalRef.current);
    resetReplayState();
  }

  function startReplay() {
    setReplaying(true);

    clearInterval(intervalRef.current);
    intervalRef.current = setInterval(() => {
      timerRef.current.elapsedTime =
        timerRef.current.elapsedTime + 10 * timerRef.current.speedModifier;
      const currentElapsedTime = timerRef.current.elapsedTime;

      setElapsedTime(currentElapsedTime);

      if (currentElapsedTime < durationRef.current) {
        const currentSnapshot = timelineRef.current.find(
          (value) => value.ms >= currentElapsedTime
        );

        if (currentSnapshot) {
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

  function toggleSpeed() {
    let newSpeed = 1;

    if (speed == 1) newSpeed = 1.5;

    if (speed == 1.5) newSpeed = 2;

    if (speed == 2) newSpeed = 4;

    if (speed == 4) newSpeed = 8;

    timerRef.current.speedModifier = newSpeed;
    setSpeed(newSpeed);
  }

  function onTimeChange(time: number) {
    setElapsedTime(time);
    timerRef.current.elapsedTime = time;
    const currentSnapshot = timelineRef.current.find(
      (value) => value.ms >= time
    );

    if (currentSnapshot) {
      //timelineRef.current.shift();
      setSnapshot(currentSnapshot.text);
    }
  }

  // TODO: Remove any "anytype" from the code
  return (
    <div className="flex flex-col">
      <p className="py-2 text-slate-400">
        {moment(thought.createdAt).format("ddd MMM D YYYY hh:mm A")}
      </p>
      <TextArea thought={snapshot} isDisabled={true}></TextArea>
      <Timeline
        currentTime={elapsedTime}
        setElapsedTime={onTimeChange}
        duration={durationRef.current}
        timelineRef={timelineRef}
      ></Timeline>
      <div className="my-8 flex justify-between">
        <button
          data-testid="deleteButton"
          className="px-4 py-2 flex items-center gap-1 bg-red-400 hover:bg-red-500 disabled:bg-slate-200 rounded-2xl text-white font-medium"
          onClick={handleDelete}
        >
          <FaRegTrashCan />
          <p>Delete</p>
        </button>
        <button
          data-testid="speedButton"
          className="px-4 py-2 flex items-center gap-1 bg-stream-400 hover:bg-stream-600 rounded-2xl text-white font-medium"
          onClick={toggleSpeed}
        >
          <p>{speed}x</p>
          <FaStopwatch />
        </button>
        <button
          data-testid="replaybutton"
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
