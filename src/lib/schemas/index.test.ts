import { describe, it, expect } from 'vitest';
import { LeadSchema, ProjectSchema } from './index';

describe('Validation Schemas', () => {
  it('should validate a correct lead', () => {
    const lead = {
      full_name: 'Juan Perez',
      email: 'juan@example.com',
      company: 'Kirma Soft',
      status: 'new'
    };
    const result = LeadSchema.safeParse(lead);
    expect(result.success).toBe(true);
  });

  it('should fail on invalid email', () => {
    const lead = {
      full_name: 'Juan Perez',
      email: 'not-an-email',
    };
    const result = LeadSchema.safeParse(lead);
    expect(result.success).toBe(false);
  });

  it('should fail if project name is too short', () => {
    const project = {
      name: 'ABC',
      client_id: '550e8400-e29b-41d4-a716-446655440000',
      status: 'discovery'
    };
    const result = ProjectSchema.safeParse(project);
    expect(result.success).toBe(false);
  });
});
