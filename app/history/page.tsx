import prisma from "../lib/db";
import ThoughtPresent from "../ui/thought-present";

export default async function History() {
  
  const idObjs = await prisma.thought.findMany({
    select: {
      id: true,
    },
    orderBy: {
      createdAt: 'desc',
    },
  })

  return (
    <div className="h-full flex items-center">
      {
        idObjs && idObjs.map( idObj => <ThoughtPresent key={idObj.id} id={idObj.id}></ThoughtPresent>)
      }
    </div>
  )
  
}