<script lang="ts">
  import { enhance } from '$app/forms';
  import Particles from '$lib/components/Particles.svelte';
  import { 
    Zap, 
    Bot, 
    Layers, 
    ArrowRight, 
    Check, 
    Mail, 
    User, 
    Building, 
    MessageSquare 
  } from 'lucide-svelte';

  let { form } = $props();
  let loading = $state(false);
  let success = $state(false);

  // Estados de validación rápida
  let errors = $derived(form?.errors || {});
</script>

<svelte:head>
  <title>KIRMA | Automatización e IA para Empresas</title>
</svelte:head>

<div class="relative min-h-screen">
  <Particles />

  <!-- Navigation (Desktop) -->
  <nav id="navbar" class="fixed top-0 left-0 right-0 z-[1000] h-20 transition-all border-b border-white/5 bg-black/50 backdrop-blur-xl">
    <div class="container mx-auto px-6 h-full flex items-center justify-between">
      <a href="/" class="flex items-center gap-2">
        <div class="w-8 h-8 bg-orange-600 rounded-lg flex items-center justify-center font-bold text-white">K</div>
        <span class="text-xl font-bold text-white tracking-tight">KIRMA</span>
      </a>
      
      <div class="hidden md:flex items-center gap-8">
        <a href="#services" class="text-sm font-medium text-gray-400 hover:text-white transition-colors">Servicios</a>
        <a href="#why" class="text-sm font-medium text-gray-400 hover:text-white transition-colors">Por qué Kirma</a>
        <a href="#contact" class="px-4 py-2 bg-gradient-to-r from-orange-500 to-orange-600 rounded-lg text-sm font-bold text-white shadow-lg shadow-orange-500/20 hover:scale-105 active:scale-95 transition-all">
          Empezar Proyecto
        </a>
      </div>
    </div>
  </nav>

  <!-- Hero Section -->
  <header id="hero" class="relative pt-32 pb-20 overflow-hidden">
    <div class="container mx-auto px-6 text-center">
      <div class="inline-flex items-center gap-2 px-4 py-1.5 bg-orange-500/10 border border-orange-500/20 rounded-full text-xs font-mono text-orange-400 mb-8 animate-fade-in">
        <span class="w-2 h-2 bg-orange-500 rounded-full animate-pulse"></span>
        AUTOMATE · BUILD · INNOVATE
      </div>
      
      <h1 class="text-5xl md:text-7xl font-black text-white mb-6 leading-tight tracking-tight">
        Lleva tu empresa al <br />
        <span class="bg-gradient-to-r from-orange-400 to-orange-600 bg-clip-text text-transparent">Siguiente Nivel</span>
      </h1>
      
      <p class="text-lg text-gray-400 max-w-2xl mx-auto mb-10 leading-relaxed">
        Soluciones de automatización, inteligencia artificial y desarrollo de plataformas diseñadas para escalar tu impacto y optimizar tus costos.
      </p>
      
      <div class="flex flex-wrap items-center justify-center gap-4">
        <a href="#contact" class="px-8 py-4 bg-orange-600 hover:bg-orange-500 text-white font-bold rounded-xl shadow-xl shadow-orange-900/20 transition-all">
          Reservar Consulta
        </a>
        <a href="/dashboard" class="px-8 py-4 bg-gray-900 border border-gray-800 text-white font-bold rounded-xl hover:bg-gray-800 transition-all">
          Acceso CRM
        </a>
      </div>
    </div>
  </header>

  <!-- Services Grid -->
  <section id="services" class="py-20 bg-black/20">
    <div class="container mx-auto px-6">
      <div class="text-center mb-16">
        <span class="text-xs font-bold text-orange-500 uppercase tracking-widest">Servicios</span>
        <h2 class="text-3xl md:text-5xl font-bold text-white mt-4">Nuestra Especialidad</h2>
      </div>

      <div class="grid grid-cols-1 md:grid-cols-3 gap-8">
        <!-- Service 1 -->
        <div class="group p-8 bg-gray-900/40 border border-gray-800 rounded-2xl hover:border-orange-500/50 transition-all hover:translate-y-[-8px]">
          <div class="w-12 h-12 bg-orange-600/10 rounded-xl flex items-center justify-center text-orange-500 mb-6 font-bold">
            <Bot />
          </div>
          <h3 class="text-xl font-bold text-white mb-4">Agentes de IA</h3>
          <p class="text-gray-400 text-sm leading-relaxed mb-6">
            Bots inteligentes que atienden clientes, generan leads y optimizan procesos 24/7 sin errores.
          </p>
          <ul class="space-y-3 text-sm text-gray-500">
            <li class="flex items-center gap-2"><Check size={14} class="text-orange-500" /> WhatsApp & Web</li>
            <li class="flex items-center gap-2"><Check size={14} class="text-orange-500" /> GPT-4 Integration</li>
          </ul>
        </div>

        <!-- Service 2 -->
        <div class="group p-8 bg-gray-950/60 border border-orange-500/30 rounded-2xl shadow-2xl shadow-orange-500/5 hover:translate-y-[-8px] transition-all relative overflow-hidden">
          <div class="absolute top-0 right-0 p-4">
            <span class="text-[10px] font-bold bg-orange-500 text-black px-2 py-0.5 rounded-full uppercase">Popular</span>
          </div>
          <div class="w-12 h-12 bg-orange-600 rounded-xl flex items-center justify-center text-white mb-6 font-bold shadow-lg shadow-orange-500/20">
            <Zap />
          </div>
          <h3 class="text-xl font-bold text-white mb-4">Automatización</h3>
          <p class="text-gray-300 text-sm leading-relaxed mb-6">
            Conectamos tus herramientas favoritas (n8n, Make, Zapier) para crear flujos de trabajo autónomos.
          </p>
          <ul class="space-y-3 text-sm text-gray-400">
            <li class="flex items-center gap-2"><Check size={14} class="text-orange-500" /> CRM Auto-Sync</li>
            <li class="flex items-center gap-2"><Check size={14} class="text-orange-500" /> Email Marketing Bots</li>
          </ul>
        </div>

        <!-- Service 3 -->
        <div class="group p-8 bg-gray-900/40 border border-gray-800 rounded-2xl hover:border-orange-500/50 transition-all hover:translate-y-[-8px]">
          <div class="w-12 h-12 bg-orange-600/10 rounded-xl flex items-center justify-center text-orange-500 mb-6 font-bold">
            <Layers />
          </div>
          <h3 class="text-xl font-bold text-white mb-4">Plataformas SaaS</h3>
          <p class="text-gray-400 text-sm leading-relaxed mb-6">
            Desarrollamos dashboards y aplicaciones web personalizadas con las tecnologías más modernas.
          </p>
          <ul class="space-y-3 text-sm text-gray-500">
            <li class="flex items-center gap-2"><Check size={14} class="text-orange-500" /> UX/UI Premium</li>
            <li class="flex items-center gap-2"><Check size={14} class="text-orange-500" /> Escalabilidad Total</li>
          </ul>
        </div>
      </div>
    </div>
  </section>

  <!-- Contact Section -->
  <section id="contact" class="py-20">
    <div class="container mx-auto px-6">
      <div class="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
        <div>
          <h2 class="text-4xl md:text-6xl font-black text-white mb-8 leading-tight">
            ¿Listo para <br /> <span class="text-orange-500">Transformar?</span>
          </h2>
          <p class="text-gray-400 mb-12 text-lg">
            Déjanos tus datos y nos pondremos en contacto contigo en menos de 24 horas para una consultoría inicial gratuita.
          </p>
          
          <div class="space-y-6">
            <div class="flex items-center gap-4 group">
              <div class="w-10 h-10 bg-gray-900 border border-gray-800 rounded-lg flex items-center justify-center text-orange-500 group-hover:bg-orange-600 group-hover:text-white transition-all">
                <Mail size={20} />
              </div>
              <span class="text-gray-300 font-medium">contacto@kirma.soft</span>
            </div>
            <!-- Mas info... -->
          </div>
        </div>

        <div class="bg-gray-900/80 border border-gray-800 p-8 rounded-3xl backdrop-blur-xl shadow-2xl">
          {#if form?.success}
            <div class="text-center py-10 animate-fade-in">
              <div class="w-20 h-20 bg-orange-600 rounded-full flex items-center justify-center text-white mx-auto mb-6 shadow-2xl shadow-orange-500/40">
                <Check size={40} strokeWidth={3} />
              </div>
              <h3 class="text-2xl font-bold text-white mb-2">¡Mensaje Enviado!</h3>
              <p class="text-gray-400">Gracias por contactarnos. Pronto estaremos hablando.</p>
              <button 
                onclick={() => success = false}
                class="mt-8 text-orange-500 hover:text-white font-bold transition-colors"
              >
                Enviar otro →
              </button>
            </div>
          {:else}
            <form 
              method="POST" 
              use:enhance={() => {
                loading = true;
                return async ({ update }) => {
                  loading = false;
                  update();
                };
              }}
              class="space-y-4"
            >
              <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div class="space-y-1">
                  <div class="relative">
                    <User class="absolute left-3 top-3 text-gray-600" size={18} />
                    <input 
                      name="name" 
                      type="text" 
                      placeholder="Nombre completo" 
                      required
                      class="w-full bg-black border border-gray-800 rounded-xl py-3 pl-10 pr-4 text-white focus:border-orange-600 outline-none transition-all"
                    />
                  </div>
                  {#if errors.full_name}
                    <p class="text-xs text-red-500 ml-1">{errors.full_name[0]}</p>
                  {/if}
                </div>

                <div class="space-y-1">
                  <div class="relative">
                    <Mail class="absolute left-3 top-3 text-gray-600" size={18} />
                    <input 
                      name="email" 
                      type="email" 
                      placeholder="Correo electrónico" 
                      required
                      class="w-full bg-black border border-gray-800 rounded-xl py-3 pl-10 pr-4 text-white focus:border-orange-600 outline-none transition-all"
                    />
                  </div>
                  {#if errors.email}
                    <p class="text-xs text-red-500 ml-1">{errors.email[0]}</p>
                  {/if}
                </div>
              </div>

              <div class="relative">
                <Building class="absolute left-3 top-3 text-gray-600" size={18} />
                <input 
                  name="company" 
                  type="text" 
                  placeholder="Empresa (opcional)" 
                  class="w-full bg-black border border-gray-800 rounded-xl py-3 pl-10 pr-4 text-white focus:border-orange-600 outline-none transition-all"
                />
              </div>

              <div class="relative">
                <Layers class="absolute left-3 top-3 text-gray-600" size={18} />
                <select 
                  name="service" 
                  class="w-full bg-black border border-gray-800 rounded-xl py-3 pl-10 pr-4 text-white focus:border-orange-600 outline-none transition-all appearance-none"
                >
                  <option value="">Interés principal...</option>
                  <option value="automatizacion">Automatización de Procesos</option>
                  <option value="plataformas">Desarrollo de Plataformas</option>
                  <option value="ia">Implementación de IA</option>
                  <option value="consulta">Consultoría Tecnológica</option>
                </select>
              </div>

              <div class="relative">
                <MessageSquare class="absolute left-3 top-3 text-gray-600" size={18} />
                <textarea 
                  name="message" 
                  placeholder="Cuéntanos brevemente sobre tu proyecto..." 
                  rows="4" 
                  class="w-full bg-black border border-gray-800 rounded-xl py-3 pl-10 pr-4 text-white focus:border-orange-600 outline-none transition-all"
                ></textarea>
              </div>

              <button 
                type="submit" 
                disabled={loading}
                class="w-full py-4 bg-orange-600 hover:bg-orange-500 disabled:bg-gray-800 text-white font-black rounded-2xl shadow-xl shadow-orange-900/20 transition-all flex items-center justify-center gap-2"
              >
                {loading ? 'Procesando...' : 'Enviar Mensaje'}
                {#if !loading}<ArrowRight size={20} />{/if}
              </button>
            </form>
          {/if}
        </div>
      </div>
    </div>
  </section>

  <!-- Footer -->
  <footer class="py-12 border-t border-gray-900 bg-black/40">
    <div class="container mx-auto px-6 text-center">
      <div class="flex items-center justify-center gap-2 mb-6">
        <div class="w-6 h-6 bg-orange-600 rounded-md flex items-center justify-center font-bold text-white text-xs">K</div>
        <span class="text-sm font-bold text-white tracking-widest uppercase">Kirma Soft</span>
      </div>
      <p class="text-gray-600 text-xs">© 2026 Kirma Soft. Todos los derechos reservados. Expertos en Automatización e IA.</p>
    </div>
  </footer>
</div>

<style>
  :global(html) {
    scroll-behavior: smooth;
  }
</style>
