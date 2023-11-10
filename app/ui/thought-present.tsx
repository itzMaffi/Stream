import { sono } from "./fonts"
import prisma from "../lib/db"

const COLS = 30;
const ROWS = 15;
const MAX_LENGTH = COLS * ROWS;

export default async function ThoughtPresent({id}: {id: string}) {

  const thought = await prisma.thought.findUnique({
    where: {
      id: id,
    }
  })

  return (
    <div className="m-4">
      <p className="py-2 text-slate-400">{thought?.createdAt.toString()}</p>
      <textarea className={`rounded-md p-4 shadow-lg focus:outline-none resize-none ${sono.className} text-lg break-all whitespace-break-spaces`} cols={COLS} rows={ROWS} maxLength={MAX_LENGTH} name="thought" defaultValue={thought?.thoughtString}disabled></textarea>
    </div>
  )
}