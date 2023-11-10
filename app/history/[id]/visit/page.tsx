import prisma from "@/app/lib/db";
import ThoughtReplay from "@/app/ui/thought-replay";

export default async function Visit({params}: {params: {id: string}}) {

  const thought = await prisma.thought.findUnique({
    where: {
      id: params.id,
    },
    select: {
      thoughtString: true,
      thoughtTimeline: true,
      createdAt: true,
    }
  })

  return (
    <div className="h-full flex items-center justify-center">
      {thought && <ThoughtReplay thought={thought}></ThoughtReplay>}
    </div>
  )
}