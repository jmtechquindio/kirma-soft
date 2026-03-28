<script lang="ts">
  let { title, value, trend, icon } = $props();

  const trendColor = trend > 0 ? "text-green-400" : "text-red-400";
</script>

<div class="p-6 bg-gray-800 border border-gray-700 rounded-xl shadow-lg">
  <div class="flex items-center justify-between">
    <div>
      <p class="text-sm font-medium text-gray-400 uppercase tracking-wider">{title}</p>
      <h3 class="mt-2 text-3xl font-bold text-white">{value}</h3>
    </div>
    <div class="p-3 bg-gray-700/50 rounded-lg text-orange-500">
      {@render icon?.()}
    </div>
  </div>
  
  {#if trend !== undefined}
    <div class="mt-4 flex items-center gap-1 text-sm {trendColor}">
      <span>{trend > 0 ? '↑' : '↓'} {Math.abs(trend)}%</span>
      <span class="text-gray-500 text-xs">vs mes anterior</span>
    </div>
  {/if}
</div>
