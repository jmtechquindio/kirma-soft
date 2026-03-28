import { describe, it, expect, vi } from 'vitest';
import { leadService } from './leads';
import { LeadSchema } from '../schemas';

// Mock del cliente de Supabase
vi.mock('../supabase', () => ({
  supabase: {
    from: vi.fn(() => ({
      insert: vi.fn((data) => ({
        select: vi.fn(() => ({
          single: vi.fn().mockResolvedValue({ data: { id: 'mock-id', ...data }, error: null })
        }))
      }))
    }))
  }
}));

describe('Simulación de Captura de Lead (Functional)', () => {
  it('debe procesar correctamente un envío válido del formulario', async () => {
    // 1. Datos que vendrían del formulario de la Landing Page
    const mockFormData = {
      full_name: 'Santiago Kirma',
      email: 'santiago@kirma.soft',
      company: 'Kirma Automation',
      service_interest: 'automatizacion'
    };

    // 2. Validación con Schema (como en +page.server.ts)
    const validation = LeadSchema.safeParse(mockFormData);
    expect(validation.success).toBe(true);

    // 3. Ejecución del servicio
    if (validation.success) {
      const result = await leadService.create(validation.data);
      expect(result).toBeDefined();
      expect(result.full_name).toBe(mockFormData.full_name);
    }
  });

  it('debe fallar si el email no es válido (Simulación de Error de Usuario)', () => {
    const invalidData = {
      full_name: 'Test Error',
      email: 'no-es-email',
      service_interest: 'ia'
    };

    const validation = LeadSchema.safeParse(invalidData);
    expect(validation.success).toBe(false);
    
    if (!validation.success) {
      const fieldErrors = validation.error.flatten().fieldErrors;
      expect(fieldErrors.email).toBeDefined();
      if (fieldErrors.email) {
        expect(fieldErrors.email[0]).toBe('Email no válido');
      }
    }
  });
});
