'use server'

import { Snapshot } from './types/snapshot'
import prisma from './db'

export async function saveThought(timeline: Snapshot[], thought: string) {
  await prisma.thought.create({
    data: {
      thoughtString: thought,
      thoughtTimeline: JSON.stringify(timeline)
    }
  });
}