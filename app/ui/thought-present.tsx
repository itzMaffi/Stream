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
    <div className="relative m-4 shrink-0 snap-center">
      <p className="py-2 text-slate-400">
        {moment(thought?.createdAt).format('ddd MMM D YYYY hh:mm A')}
      </p>
      <textarea
        className={`resize-none rounded-md p-8 shadow-lg ${sono.className} whitespace-break-spaces break-all md:text-lg`}
        cols={COLS}
        rows={ROWS}
        maxLength={MAX_LENGTH}
        name="thought"
        defaultValue={thought?.thoughtString}
        disabled
      ></textarea>
      <Link
        href={`/dashboard/history/${id}/visit`}
        className="absolute bottom-2 right-2 flex items-center gap-1 rounded-2xl bg-stream-500 p-2 px-4 py-2 font-medium text-white hover:bg-stream-600"
      >
        <FaBookOpen />
        <p>Open</p>
      </Link>
    </div>
  );
}
