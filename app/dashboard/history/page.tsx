import prisma from '../../lib/db';
import ThoughtPresent from '../../ui/thought-present';

export default async function History() {
  const idObjs = await prisma.thought.findMany({
    select: {
      id: true,
    },
    orderBy: {
      createdAt: 'desc',
    },
  });

  return (
    <div className="flex flex-col">
      <h1 className="sticky top-0 z-10 hidden rounded-xl bg-stream-50 px-4 py-8 text-2xl text-stream-800 md:block">
        History
      </h1>
      <div className="flex flex-wrap justify-center gap-8 ">
        {idObjs &&
          idObjs.map((idObj) => (
            <ThoughtPresent key={idObj.id} id={idObj.id}></ThoughtPresent>
          ))}
      </div>
    </div>
  );
}
