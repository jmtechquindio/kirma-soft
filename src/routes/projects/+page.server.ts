import { projectService } from '$lib/services/projects';
import type { PageServerLoad } from './$types';
import { redirect } from '@sveltejs/kit';

export const load: PageServerLoad = async ({ locals: { safeGetSession } }) => {
  const { session } = await safeGetSession();
  if (!session) {
    throw redirect(303, '/auth');
  }

  const projects = await projectService.getAll();
  return { projects };
};
