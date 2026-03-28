<script lang="ts">
  import type { PageData } from './$types';
  import StatusBadge from '$lib/components/StatusBadge.svelte';
  import Button from '$lib/components/Button.svelte';
  
  let { data }: { data: PageData } = $props();
</script>

<div class="space-y-6">
  <div class="flex items-center justify-between">
    <div>
      <h1 class="text-2xl font-bold text-white">Proyectos Activos</h1>
      <p class="text-sm text-gray-400">Estado de desarrollo y automatizaciones en curso.</p>
    </div>
    <Button variant="primary">
      <span class="mr-2">+</span> Nuevo Proyecto
    </Button>
  </div>

  <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
    {#each data.projects as project}
      <div class="bg-gray-800 border border-gray-700 rounded-xl p-6 hover:border-orange-500/50 transition-all shadow-lg group">
        <div class="flex justify-between items-start mb-4">
          <StatusBadge status={project.status} />
          <span class="text-xs text-gray-500 font-mono uppercase tracking-widest">{project.type}</span>
        </div>
        
        <h3 class="text-xl font-bold text-white mb-2 group-hover:text-orange-400 transition-colors">
          {project.name}
        </h3>
        
        <p class="text-sm text-gray-400 mb-6">
          Cliente: <span class="text-gray-200">{project.client?.company_name || 'Desconocido'}</span>
        </p>
        
        <div class="flex items-center justify-between text-xs text-gray-500 border-t border-gray-700 pt-4">
          <div>
            Entrega: <span class="text-gray-300">{project.deadline ? new Date(project.deadline).toLocaleDateString() : 'Por definir'}</span>
          </div>
          <a href="/projects/{project.id}" class="text-orange-500 hover:text-orange-400 font-medium">Ver detalles →</a>
        </div>
      </div>
    {:else}
      <div class="col-span-full py-20 text-center bg-gray-800 border border-gray-700 rounded-xl">
        <p class="text-gray-500 italic">No hay proyectos activos registrados.</p>
      </div>
    {/each}
  </div>
</div>
