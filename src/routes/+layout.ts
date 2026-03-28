import { createBrowserClient, isBrowser, parseCookies } from '@supabase/ssr';
import type { LayoutLoad } from './$types';
import { env } from '$env/dynamic/public';

export const ssr = false;
export const prerender = false;
export const trailingSlash = 'always';

export const load: LayoutLoad = async ({ fetch, data, depends }) => {
  depends('supabase:auth');

  const supabase = createBrowserClient(
    env.PUBLIC_SUPABASE_URL || 'https://placeholder.supabase.co',
    env.PUBLIC_SUPABASE_ANON_KEY || 'dummy-key',
    {
      global: {
        fetch,
      },
    }
  );

  const {
    data: { session },
  } = await supabase.auth.getSession();

  return { supabase, session, user: session?.user ?? null };
};
