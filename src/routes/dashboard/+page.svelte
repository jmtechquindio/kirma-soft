<script lang="ts">
  import type { PageData } from './$types';
  import StatCard from '$lib/components/StatCard.svelte';
  import { Users, Briefcase, CheckCircle, Clock } from 'lucide-svelte';
  
  let { data }: { data: PageData } = $props();
</script>

<div class="space-y-8">
  <div>
    <h1 class="text-3xl font-bold text-white">Resumen Operativo</h1>
    <p class="text-gray-400">Panel central de Kirma CRM & Project Hub.</p>
  </div>

  <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
    <StatCard 
      title="Leads Totales" 
      value={data.stats.leads} 
      trend={12}
    >
      {#snippet icon()}
        <Users size={24} />
      {/snippet}
    </StatCard>

    <StatCard 
      title="Proyectos Activos" 
      value={data.stats.projects} 
      trend={5}
    >
      {#snippet icon()}
        <Briefcase size={24} />
      {/snippet}
    </StatCard>

    <StatCard 
      title="Tareas Pendientes" 
      value={data.stats.activeTasks} 
      trend={-2}
    >
      {#snippet icon()}
        <Clock size={24} />
      {/snippet}
    </StatCard>
  </div>

  <div class="grid grid-cols-1 lg:grid-cols-2 gap-8">
    <div class="bg-gray-800 border border-gray-700 rounded-xl p-6 shadow-xl">
      <h3 class="text-lg font-semibold text-white mb-4">Actividad Reciente</h3>
      <div class="space-y-4">
        <p class="text-sm text-gray-500 italic">No hay actividad reciente registrada en las últimas 24 horas.</p>
      </div>
    </div>
    
    <div class="bg-gray-800 border border-gray-700 rounded-xl p-6 shadow-xl">
      <h3 class="text-lg font-semibold text-white mb-4">Próximas Entregas</h3>
      <div class="space-y-4">
        <p class="text-sm text-gray-500 italic">No hay fechas límite próximas registradas.</p>
      </div>
    </div>
  </div>
</div>
