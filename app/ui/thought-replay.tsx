import { sono } from "./fonts"
import moment from "moment"

const COLS = 30;
const ROWS = 15;
const MAX_LENGTH = COLS * ROWS;

export default async function ThoughtReplay({thought}: {thought: {createdAt: Date, thoughtString: string, thoughtTimeline: string, }}) {

  return (
    <div className="flex flex-col">
      <p className="py-2 text-slate-400">{moment(thought?.createdAt).format('ddd MMM D YYYY hh:mm A')}</p>
      <textarea 
        className={`rounded-md p-8 shadow-lg resize-none ${sono.className} text-lg break-all whitespace-break-spaces`} 
        cols={COLS} 
        rows={ROWS} 
        maxLength={MAX_LENGTH} 
        name="thought" 
        defaultValue={thought?.thoughtString}
        disabled
      ></textarea>
    </div>
  )
}