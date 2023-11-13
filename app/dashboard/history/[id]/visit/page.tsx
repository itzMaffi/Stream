import prisma from '@/app/lib/db';
import ThoughtReplay from '@/app/ui/thought-replay';

export default async function Visit({ params }: { params: { id: string } }) {
  const parsedThought = await prisma.thought
    .findUnique({
      where: {
        id: params.id,
      },
      select: {
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
    <div className="h-full flex items-center justify-center">
      {parsedThought && <ThoughtReplay thought={parsedThought}></ThoughtReplay>}
    </div>
  );
}
