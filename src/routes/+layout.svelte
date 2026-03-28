<script lang="ts">
  import "../app.css";
  import "../legacy.css";
  import Sidebar from "$lib/components/Sidebar.svelte";
  import { page } from "$app/stores";
  
  let { data, children } = $props();
  
  const isAuthPage = $derived($page.url.pathname === '/auth');
  const session = $derived(data.session);
</script>

<div class="flex h-screen overflow-hidden bg-gray-950">
  {#if session && !isAuthPage}
    <Sidebar />
    <main class="flex-1 overflow-y-auto p-8">
      {@render children()}
    </main>
  {:else}
    <main class="flex-1 overflow-y-auto w-full">
      {@render children()}
    </main>
  {/if}
</div>
