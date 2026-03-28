<script lang="ts">
  import type { PageData } from './$types';
  import StatusBadge from '$lib/components/StatusBadge.svelte';
  import Button from '$lib/components/Button.svelte';
  
  let { data }: { data: PageData } = $props();
</script>

<div class="space-y-6">
  <div class="flex items-center justify-between">
    <div>
      <h1 class="text-2xl font-bold text-white">Gestión de Leads</h1>
      <p class="text-sm text-gray-400">Administra los prospectos y solicitudes entrantes.</p>
    </div>
    <Button variant="primary">
      <span class="mr-2">+</span> Nuevo Lead
    </Button>
  </div>

  <div class="overflow-hidden bg-gray-800 border border-gray-700 rounded-xl">
    <table class="min-w-full divide-y divide-gray-700">
      <thead class="bg-gray-700/50">
        <tr>
          <th class="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">Lead</th>
          <th class="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">Empresa</th>
          <th class="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">Interés</th>
          <th class="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">Estado</th>
          <th class="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">Fecha</th>
          <th class="px-6 py-3 text-right text-xs font-medium text-gray-400 uppercase tracking-wider">Acciones</th>
        </tr>
      </thead>
      <tbody class="divide-y divide-gray-700 bg-gray-800">
        {#each data.leads as lead}
          <tr class="hover:bg-gray-700/30 transition-colors">
            <td class="px-6 py-4 whitespace-nowrap">
              <div class="text-sm font-medium text-white">{lead.full_name}</div>
              <div class="text-xs text-gray-400">{lead.email}</div>
            </td>
            <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-300">
              {lead.company || '-'}
            </td>
            <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-300 capitalize">
              {lead.service_interest || 'General'}
            </td>
            <td class="px-6 py-4 whitespace-nowrap">
              <StatusBadge status={lead.status} />
            </td>
            <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-400">
              {new Date(lead.created_at).toLocaleDateString()}
            </td>
            <td class="px-6 py-4 whitespace-nowrap text-right text-sm">
              <Button variant="ghost" size="sm">Detalle</Button>
            </td>
          </tr>
        {:else}
          <tr>
            <td colspan="6" class="px-6 py-10 text-center text-gray-500 italic">
              No se encontraron leads registrados.
            </td>
          </tr>
        {/each}
      </tbody>
    </table>
  </div>
</div>
