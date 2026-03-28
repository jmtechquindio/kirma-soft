import { supabase } from '$lib/supabase';
import type { Task, TaskStatus } from '$lib/types';
import type { TaskInput } from '$lib/schemas';

export const taskService = {
  async getByProject(projectId: string) {
    const { data, error } = await supabase
      .from('tasks')
      .select('*')
      .eq('project_id', projectId)
      .order('created_at', { ascending: true });
    
    if (error) throw (error);
    return data as Task[];
  },

  async create(task: TaskInput) {
    const { data, error } = await supabase
      .from('tasks')
      .insert(task)
      .select()
      .single();
    
    if (error) throw (error);
    return data as Task;
  },

  async updateStatus(id: string, status: TaskStatus) {
    const { error } = await supabase
      .from('tasks')
      .update({ status })
      .eq('id', id);
    
    if (error) throw (error);
  },

  async delete(id: string) {
    const { error } = await supabase
      .from('tasks')
      .delete()
      .eq('id', id);
    
    if (error) throw (error);
  }
};
