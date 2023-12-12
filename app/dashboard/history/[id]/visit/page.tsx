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
    <div className="flex h-full flex-col">
      <Link
        href={'/dashboard/history'}
        className="sticky top-0 hidden items-center rounded-xl bg-stream-50 px-4 py-8 text-2xl text-stream-800 md:flex"
      >
        <FaAngleLeft />
        <h1>History</h1>
      </Link>
      <div className="flex grow items-center justify-center">
        {parsedThought && (
          <ThoughtReplay thought={parsedThought}></ThoughtReplay>
        )}
      </div>
    </div>
  );
}
