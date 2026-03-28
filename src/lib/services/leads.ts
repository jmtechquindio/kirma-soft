import { supabase } from '$lib/supabase';
import type { Lead, LeadStatus, ServiceInterest } from '$lib/types';
import type { LeadInput } from '$lib/schemas';

export const leadService = {
  async getAll() {
    const { data, error } = await supabase
      .from('leads')
      .select('*')
      .order('created_at', { ascending: false });
    
    if (error) throw error;
    return data as Lead[];
  },

  async getById(id: string) {
    const { data, error } = await supabase
      .from('leads')
      .select('*')
      .eq('id', id)
      .single();
    
    if (error) throw error;
    return data as Lead;
  },

  async create(lead: LeadInput) {
    const { data, error } = await supabase
      .from('leads')
      .insert(lead)
      .select()
      .single();
    
    if (error) throw error;
    return data as Lead;
  },

  async updateStatus(id: string, status: LeadStatus) {
    const { error } = await supabase
      .from('leads')
      .update({ status })
      .eq('id', id);
    
    if (error) throw error;
  },

  async delete(id: string) {
    const { error } = await supabase
      .from('leads')
      .delete()
      .eq('id', id);
    
    if (error) throw error;
  }
};
