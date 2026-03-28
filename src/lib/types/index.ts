// Módulo 2: Types & Validations (Kirma CRM)

export type UserRole = 'admin' | 'project_manager' | 'sales_agent' | 'client';

export interface Profile {
  id: string;
  full_name: string | null;
  role: UserRole;
  updated_at: string;
}

export type LeadStatus = 'new' | 'contacted' | 'qualified' | 'proposed' | 'converted' | 'lost';
export type ServiceInterest = 'automatizacion' | 'plataformas' | 'ia' | 'consulta';

export interface Lead {
  id: string;
  full_name: string;
  email: string;
  company: string | null;
  service_interest: ServiceInterest | null;
  status: LeadStatus;
  created_at: string;
  created_by: string | null;
}

export interface Client {
  id: string;
  company_name: string;
  contact_id: string | null;
  lead_id: string | null;
  status: string;
  created_at: string;
}

export type ProjectType = 'rpa' | 'web_app' | 'ia_agent';
export type ProjectStatus = 'discovery' | 'design' | 'development' | 'testing' | 'completed';

export interface Project {
  id: string;
  name: string;
  client_id: string;
  type: ProjectType | null;
  budget: number | null;
  deadline: string | null;
  status: ProjectStatus;
  created_at: string;
}

export type TaskStatus = 'todo' | 'in_progress' | 'testing' | 'done';

export interface Task {
  id: string;
  project_id: string;
  title: string;
  description: string | null;
  assigned_to: string | null;
  status: TaskStatus;
  created_at: string;
}
