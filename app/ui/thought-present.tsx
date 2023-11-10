import { sono } from "./fonts"
import { FaBookOpen } from 'react-icons/fa6'
import moment from "moment";
import prisma from "../lib/db"
import Link from "next/link";

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
    <div className="m-4 relative snap-center shrink-0 group">
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
      <Link
        href={`/history/${id}/visit`}
        className="absolute bottom-2 right-2 invisible group-hover:visible p-2 bg-teal-400 hover:bg-teal-500 rounded-full text-white font-semibold"
      ><FaBookOpen/></Link>
    </div>
  )
}