import prisma from '@/app/lib/db';
import ThoughtReplay from '@/app/ui/thought-replay';
import Link from 'next/link';
import { FaAngleLeft } from 'react-icons/fa6';

export default async function Visit({ params }: { params: { id: string } }) {
  const parsedThought = await prisma.thought
    .findUnique({
      where: {
        id: params.id,
      },
      select: {
        id: true,
        thoughtString: true,
        thoughtTimeline: true,
        createdAt: true,
      },
    })
    .then((thought) => {
      return (
        thought && {
          ...thought,
          thoughtTimeline: JSON.parse(thought.thoughtTimeline),
        }
      );
    });

  return (
    <div className='h-full flex flex-col'>
      <Link
        href={'/dashboard/history'}
        className="flex items-center px-4 py-8 sticky top-0 bg-stream-50 rounded-xl text-2xl text-stream-800"
      >
        <FaAngleLeft />
        <h1>History</h1>
      </Link>
      <div className="grow flex items-center justify-center">
        {parsedThought && (
          <ThoughtReplay thought={parsedThought}></ThoughtReplay>
        )}
      </div>
    </div>
  );
}
