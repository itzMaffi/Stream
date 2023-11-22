import { ChangeEvent, MutableRefObject, useState } from "react";
import { Snapshot } from "../lib/types/snapshot";
import moment from "moment";

export default function Timeline({
  currentTime,
  duration,
  setElapsedTime,
  timelineRef,
}: {
  currentTime: number;
  duration: number;
  setElapsedTime: (time: number) => void;
  timelineRef: MutableRefObject<Snapshot[]>;
}) {
  function handleValueChange(el: ChangeEvent<HTMLInputElement>) {
    setElapsedTime(+el.target.value);
  }

  const timelineEvents = [...timelineRef.current];

  return (
    <>
      <div className="w-full mt-3 h-5">
        <div className="outline outline-2  outline-offset-2 outline-blue-300 bg-gray-200 rounded-lg"
          style={{
            width: "100%",
            padding: "0px 5px",
            margin: "0px 0px 0px 1px",
            pointerEvents: "none",
            position: "relative",
            zIndex:-1,
            height: "14px",
          }}
        >
          <div style={{
            position: "relative",
            width: "100%",
            height: "100%",
          }}>
          {timelineEvents.map((el) => (
            <div
              style={{
                position: "absolute",
                display: "inline",
                left: Math.floor((el.ms * 100) / duration) + "%",
                top: "-5px",
                color: "gray"
              }}
            >
              ⟟
            </div>
          ))}
          </div>
        </div>
        <input
          className="relative -top-[17px] w-full appearance-none bg-transparent [&::-webkit-slider-thumb]:bg-red-400 [&::-webkit-slider-thumb]:hover:bg-red-500 [&::-webkit-slider-thumb]:z-10 [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:w-5  [&::-webkit-slider-thumb]:h-5 [&::-webkit-slider-thumb]:rounded-full"
          onChange={handleValueChange}
          min="0"
          value={currentTime}
          max={duration.toString()}
          type="range"
        ></input>
      </div>
      <div className="flex justify-between">
      <p className="left">
      {moment(currentTime).format("mm:ss")}
      </p>
      <p className="right">
      {moment(duration).format("mm:ss")}
      </p>
      </div>
    </>
  );
}
