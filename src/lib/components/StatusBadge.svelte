<script lang="ts">
  let { status, ...props } = $props();

  const colors = {
    // Leads
    new: "bg-blue-900/50 text-blue-400 border-blue-800",
    contacted: "bg-purple-900/50 text-purple-400 border-purple-800",
    qualified: "bg-indigo-900/50 text-indigo-400 border-indigo-800",
    proposed: "bg-orange-900/50 text-orange-400 border-orange-800",
    converted: "bg-green-900/50 text-green-400 border-green-800",
    lost: "bg-red-900/50 text-red-400 border-red-800",
    // Projects
    discovery: "bg-gray-800 text-gray-400 border-gray-700",
    design: "bg-cyan-900/50 text-cyan-400 border-cyan-800",
    development: "bg-blue-900/50 text-blue-400 border-blue-800",
    testing: "bg-yellow-900/50 text-yellow-500 border-yellow-800",
    completed: "bg-emerald-900/50 text-emerald-400 border-emerald-800",
    // Tasks
    todo: "bg-gray-800 text-gray-400 border-gray-700",
    in_progress: "bg-blue-900/50 text-blue-400 border-blue-800",
    done: "bg-green-900/50 text-green-400 border-green-800"
  };

  const labels = {
    new: "Nuevo",
    contacted: "Contactado",
    qualified: "Calificado",
    proposed: "Propuesta",
    converted: "Convertido",
    lost: "Perdido",
    discovery: "Descubrimiento",
    design: "Diseño",
    development: "Desarrollo",
    testing: "Pruebas",
    completed: "Completado",
    todo: "Pendiente",
    in_progress: "En progreso",
    done: "Listo"
  };
</script>

<span 
  class="px-2.5 py-0.5 rounded-full text-xs font-semibold border {colors[status as keyof typeof colors] || colors.todo}"
  {...props}
>
  {labels[status as keyof typeof labels] || status}
</span>
