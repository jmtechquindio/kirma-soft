<script lang="ts">
  let { 
    label, 
    error, 
    id = Math.random().toString(36).substr(2, 9), 
    ...props 
  } = $props();

  const base = "block w-full px-3 py-2 border border-gray-700 rounded-md shadow-sm placeholder-gray-500 text-white bg-gray-900 focus:outline-none focus:ring-orange-500 focus:border-orange-500 sm:text-sm transition-all";
</script>

<div class="space-y-1">
  {#if label}
    <label for={id} class="block text-sm font-medium text-gray-400">
      {label}
    </label>
  {/if}
  <input 
    {id} 
    class="{base} {error ? 'border-red-500 ring-red-500' : ''}"
    {...props}
  />
  {#if error}
    <p class="text-xs text-red-500 mt-1">{error}</p>
  {/if}
</div>
