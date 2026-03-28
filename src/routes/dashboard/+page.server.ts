import { supabase } from '$lib/supabase';
import type { PageServerLoad } from './$types';
import { redirect } from '@sveltejs/kit';

export const load: PageServerLoad = async ({ locals: { safeGetSession } }) => {
  const { session } = await safeGetSession();
  if (!session) {
    throw redirect(303, '/auth');
  }

  const [leadsCount, projectsCount, tasksCount] = await Promise.all([
    supabase.from('leads').select('*', { count: 'exact', head: true }),
    supabase.from('projects').select('*', { count: 'exact', head: true }),
    supabase.from('tasks').select('*', { count: 'exact', head: true, filter: (query) => query.neq('status', 'done') })
  ]);

  return {
    stats: {
      leads: leadsCount.count || 0,
      projects: projectsCount.count || 0,
      activeTasks: tasksCount.count || 0,
    }
  };
};
