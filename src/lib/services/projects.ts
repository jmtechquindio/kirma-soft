import { supabase } from '$lib/supabase';
import type { Project, ProjectStatus, ProjectType } from '$lib/types';
import type { ProjectInput } from '$lib/schemas';

export const projectService = {
  async getAll() {
    const { data, error } = await supabase
      .from('projects')
      .select('*, client:client(company_name)')
      .order('created_at', { ascending: false });
    
    if (error) throw (error);
    return data as (Project & { client: { company_name: string } })[];
  },

  async getById(id: string) {
    const { data, error } = await supabase
      .from('projects')
      .select('*, tasks(*)')
      .eq('id', id)
      .single();
    
    if (error) throw (error);
    return data as (Project & { tasks: any[] });
  },

  async create(project: ProjectInput) {
    const { data, error } = await supabase
      .from('projects')
      .insert(project)
      .select()
      .single();
    
    if (error) throw (error);
    return data as Project;
  },

  async updateStatus(id: string, status: ProjectStatus) {
    const { error } = await supabase
      .from('projects')
      .update({ status })
      .eq('id', id);
    
    if (error) throw (error);
  }
};
