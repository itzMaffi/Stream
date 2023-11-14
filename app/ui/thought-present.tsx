import { sono } from './fonts';
import { FaBookOpen } from 'react-icons/fa6';
import moment from 'moment';
import prisma from '../lib/db';
import Link from 'next/link';

const COLS = 30;
const ROWS = 15;
const MAX_LENGTH = COLS * ROWS;

export default async function ThoughtPresent({ id }: { id: string }) {
  const thought = await prisma.thought.findUnique({
    where: {
      id: id,
    },
  });

  return (
    <div className="m-4 relative snap-center shrink-0 group">
      <p className="py-2 text-slate-400">
        {moment(thought?.createdAt).format('ddd MMM D YYYY hh:mm A')}
      </p>
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
        href={`/dashboard/history/${id}/visit`}
        className="absolute bottom-2 right-2 px-4 py-2 flex items-center gap-1 md:invisible md:group-hover:visible p-2 bg-stream-500 hover:bg-stream-600 rounded-2xl text-white font-medium"
      >
        <FaBookOpen />
        <p>Open</p>
      </Link>
    </div>
  );
}
