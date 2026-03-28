<script lang="ts">
  import { page } from '$app/stores';
  import { 
    LayoutDashboard, 
    Users, 
    Briefcase, 
    Settings, 
    Database, 
    LogOut 
  } from 'lucide-svelte';
  
  const navItems = [
    { href: '/dashboard', label: 'Dashboard', icon: LayoutDashboard },
    { href: '/leads', label: 'Leads', icon: Users },
    { href: '/projects', label: 'Proyectos', icon: Briefcase },
    { href: '/clients', label: 'Clientes', icon: Database },
  ];
</script>

<aside class="w-64 bg-gray-900 border-r border-gray-800 flex flex-col h-full">
  <div class="p-6">
    <div class="flex items-center gap-3">
      <div class="w-8 h-8 bg-orange-600 rounded-lg flex items-center justify-center font-bold text-white">K</div>
      <span class="text-xl font-bold text-white tracking-tight">KIRMA CRM</span>
    </div>
  </div>

  <nav class="flex-1 px-4 space-y-1">
    {#each navItems as item}
      <a 
        href={item.href} 
        class="flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium transition-all {$page.url.pathname === item.href ? 'bg-orange-600/10 text-orange-500 border border-orange-500/20' : 'text-gray-400 hover:bg-gray-800 hover:text-white'}"
      >
        <item.icon size={20} />
        {item.label}
      </a>
    {/each}
  </nav>

  <div class="p-4 border-t border-gray-800">
    <form method="POST" action="/auth?/logout">
      <button 
        type="submit" 
        class="flex items-center gap-3 w-full px-4 py-3 text-sm font-medium text-gray-500 hover:text-red-400 hover:bg-red-900/10 rounded-lg transition-all"
      >
        <LogOut size={20} />
        Cerrar Sesión
      </button>
    </form>
  </div>
</aside>
