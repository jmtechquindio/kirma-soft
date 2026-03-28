import { leadService } from '$lib/services/leads';
import { LeadSchema } from '$lib/schemas';
import { fail } from '@sveltejs/kit';
import type { Actions, RequestEvent } from '@sveltejs/kit';

export const actions: Actions = {
  default: async ({ request }: RequestEvent) => {
    const formData = await request.formData();
    const data = {
      full_name: formData.get('name') as string,
      email: formData.get('email') as string,
      company: formData.get('company') as string,
      service_interest: formData.get('service') as any,
      message: formData.get('message') as string, // Aunque no está en el schema de Lead, lo capturaremos si es necesario
    };

    // Validar con Zod
    const result = LeadSchema.safeParse(data);

    if (!result.success) {
      return fail(400, { 
        data, 
        errors: result.error.flatten().fieldErrors 
      });
    }

    try {
      await leadService.create(result.data);
      return { success: true };
    } catch (error: any) {
      return fail(500, { 
        data, 
        message: 'Error al guardar el lead. Por favor, intenta de nuevo.' 
      });
    }
  }
};
