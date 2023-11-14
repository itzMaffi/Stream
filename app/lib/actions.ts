'use server';

import { Snapshot } from './types/snapshot';
import prisma from './db';
import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';

export async function saveThought(timeline: Snapshot[], thought: string) {
  await prisma.thought.create({
    data: {
      thoughtString: thought,
      thoughtTimeline: JSON.stringify(timeline),
    },
  });

  revalidatePath('/dashboard/history');
}

export async function deleteThought(id: string) {
  await prisma.thought.delete({ where: { id: id } });

  revalidatePath('/dashboard/history');
  redirect('/dashboard/history');
}
