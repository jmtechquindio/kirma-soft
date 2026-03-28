import { z } from 'zod';

export const LeadSchema = z.object({
  full_name: z.string().min(3, 'El nombre debe tener al menos 3 caracteres'),
  email: z.string().email('Email no válido'),
  company: z.string().optional().nullable(),
  service_interest: z.enum(['automatizacion', 'plataformas', 'ia', 'consulta']).optional().nullable(),
  status: z.enum(['new', 'contacted', 'qualified', 'proposed', 'converted', 'lost']).default('new')
});

export const ClientSchema = z.object({
  company_name: z.string().min(2, 'La empresa es obligatoria'),
  contact_id: z.string().uuid().optional().nullable(),
  lead_id: z.string().uuid().optional().nullable(),
  status: z.string().default('active')
});

export const ProjectSchema = z.object({
  name: z.string().min(5, 'El nombre del proyecto es obligatorio'),
  client_id: z.string().uuid('Cliente no válido'),
  type: z.enum(['rpa', 'web_app', 'ia_agent']).nullable(),
  budget: z.number().min(0).optional().nullable(),
  deadline: z.string().optional().nullable(),
  status: z.enum(['discovery', 'design', 'development', 'testing', 'completed']).default('discovery')
});

export const TaskSchema = z.object({
  project_id: z.string().uuid(),
  title: z.string().min(3, 'El título es obligatorio'),
  description: z.string().optional().nullable(),
  assigned_to: z.string().uuid().optional().nullable(),
  status: z.enum(['todo', 'in_progress', 'testing', 'done']).default('todo')
});

export type LeadInput = z.infer<typeof LeadSchema>;
export type ProjectInput = z.infer<typeof ProjectSchema>;
export type TaskInput = z.infer<typeof TaskSchema>;
