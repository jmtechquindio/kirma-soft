import { fail, redirect } from '@sveltejs/kit';
import type { Actions, PageServerLoad } from './$types';

export const load: PageServerLoad = async ({ locals: { safeGetSession } }) => {
  const { session } = await safeGetSession();
  if (session) {
    throw redirect(303, '/dashboard');
  }
};

export const actions: Actions = {
  login: async ({ request, locals: { supabase } }) => {
    const formData = await request.formData();
    const email = formData.get('email') as string;
    const password = formData.get('password') as string;

    const { error } = await supabase.auth.signInWithPassword({ email, password });

    if (error) {
      return fail(400, { email, message: error.message });
    }

    throw redirect(303, '/dashboard');
  },
  signup: async ({ request, locals: { supabase } }) => {
    const formData = await request.formData();
    const email = formData.get('email') as string;
    const password = formData.get('password') as string;

    const { error } = await supabase.auth.signUp({ email, password });

    if (error) {
      return fail(400, { email, message: error.message });
    }

    return { message: 'Por favor, revisa tu email para confirmar el registro.' };
  },
  logout: async ({ locals: { supabase } }) => {
    await supabase.auth.signOut();
    throw redirect(303, '/auth');
  }
};
