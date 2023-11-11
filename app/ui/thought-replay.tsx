'use client'

import { sono } from "./fonts"
import { FaArrowRotateLeft } from 'react-icons/fa6'
import moment from "moment"
import { useState } from "react";

const COLS = 30;
const ROWS = 15;
const MAX_LENGTH = COLS * ROWS;

export default function ThoughtReplay({thought}: {thought: {createdAt: Date, thoughtString: string, thoughtTimeline: string, }}) {

  const [snapshot, setSnapshot] = useState(thought.thoughtString);


  function handleReplay() {
    console.log('clicked')
  }

  return (
    <div className="flex flex-col">
      <p className="py-2 text-slate-400">{moment(thought.createdAt).format('ddd MMM D YYYY hh:mm A')}</p>
      <textarea 
        className={`rounded-md p-8 shadow-lg resize-none ${sono.className} text-lg break-all whitespace-break-spaces`} 
        cols={COLS} 
        rows={ROWS} 
        maxLength={MAX_LENGTH} 
        name="thought" 
        value={snapshot}
        disabled
      ></textarea>
      <button 
        className="my-8 mx-auto p-2 bg-teal-400 hover:bg-teal-500 rounded-full text-white font-semibold" 
        onClick={handleReplay}>
          <FaArrowRotateLeft />
      </button>
    </div>
  )
}