import { Thought } from '@prisma/client';
import prisma from '../../lib/db';
import ThoughtPresent from '../../ui/thought-present';

export default async function History() {
  const thoughts:Thought[] = await prisma.thought.findMany({
    // select: {
    //   id: true,
    // },
    orderBy: {
      createdAt: 'desc',
    },
  });

  return (
    <div className='flex flex-col'>
      <h1 className='hidden md:block px-4 py-8 z-10 sticky top-0 bg-stream-50 rounded-xl text-2xl text-stream-800'>History</h1>
      <div className="flex flex-wrap justify-center gap-8 ">
        {thoughts &&
          thoughts.map((thought) => (
            <ThoughtPresent key={thought.id} thought={thought}></ThoughtPresent>
          ))}
      </div>
    </div>
  );
}
