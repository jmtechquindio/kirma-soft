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
    MessageSquare,
    ExternalLink,
    LineChart,
    Shield,
    Gem,
    Cpu,
    Network,
    MousePointer2
  } from 'lucide-svelte';

  let { form } = $props();
  let loading = $state(false);
  let success = $state(false);

  // Stats Counters (Static for now, matches legacy)
  const stats = [
    { label: 'Procesos automatizados', value: '50', suffix: '+' },
    { label: 'Satisfacción cliente', value: '98', suffix: '%' },
    { label: 'Más productividad', value: '3', suffix: 'x' }
  ];

  const services = [
    {
      id: '01',
      title: 'Automatización de Procesos',
      desc: 'Workflows inteligentes, integración de APIs, bots de automatización e IA para eliminar tareas repetitivas.',
      features: ['RPA y bots inteligentes', 'Integración de sistemas legacy', 'Workflows con n8n/Make/Zapier'],
      metric: '-60%',
      metricLabel: 'tiempo manual',
      icon: Zap
    },
    {
      id: '02',
      title: 'Soluciones Tecnológicas',
      featured: true,
      desc: 'Plataformas digitales personalizadas y sistemas empresariales que conectan a tus equipos y datos.',
      features: ['Aplicaciones web y móviles', 'Dashboards y analytics', 'Arquitecturas cloud-native'],
      metric: '+45%',
      metricLabel: 'eficiencia operativa',
      icon: Layers
    },
    {
      id: '03',
      title: 'Innovación con IA',
      desc: 'Soluciones de inteligencia artificial avanzada que aprenden de tus datos y optimizan decisiones.',
      features: ['Modelos de IA personalizados', 'NLP y procesamiento de docs', 'Agentes autónomos (LLMs)'],
      metric: '100%',
      metricLabel: 'escalable',
      icon: Bot
    }
  ];

  const cases = [
    {
      id: '01',
      tags: ['RPA', 'Automatización'],
      title: 'Automatización Empresarial',
      desc: 'Implementación de RPA y bots para eliminar procesos manuales repetitivos con sincronización automática.',
      metrics: [
        { label: 'Tiempo manual', value: '-60%' },
        { label: 'Velocidad proceso', value: 'x3' },
        { label: 'Errores humanos', value: '0' }
      ]
    },
    {
      id: '02',
      tags: ['Plataforma', 'Digital'],
      title: 'Plataformas Digitales',
      desc: 'Ecosistemas digitales que conectan equipos y departamentos en tiempo real con dashboards inteligentes.',
      metrics: [
        { label: 'Eficiencia equipo', value: '+45%' },
        { label: 'Silos de datos', value: '-80%' },
        { label: 'Escalabilidad', value: '∞' }
      ]
    }
  ];

  const whyKirma = [
    { icon: '⚡', title: 'Optimización Real', desc: 'Medimos cada mejora con KPIs concretos. Demostramos con datos.' },
    { icon: '💰', title: 'Reducción de Costos', desc: 'ROI positivo desde los primeros meses de implementación.' },
    { icon: '🔗', title: 'Integración Total', desc: 'Conectamos tus herramientas actuales sin fricción tecnológica.' },
    { icon: '🎯', title: 'Personalización', desc: 'No usamos plantillas. Diseñamos desde cero para tus objetivos.' },
    { icon: '🚀', title: 'Innovación', desc: 'Adoptamos las últimas tecnologías de IA para mantenerte adelante.' },
    { icon: '🛡️', title: 'Soporte', desc: 'Acompañamiento continuo post-lanzamiento. Somos tu socio.' }
  ];
</script>

<svelte:head>
  <title>KIRMA | Innovación Tecnológica & Automatización</title>
  <meta name="description" content="Diseñamos soluciones tecnológicas y automatizamos procesos para que las empresas evolucionen." />
</svelte:head>

<div class="relative min-h-screen selection:bg-accent selection:text-black">
  <Particles />

  <!-- Navigation -->
  <nav id="navbar" class="fixed top-0 left-0 right-0 z-[1000] h-20 transition-all border-b border-white/5 bg-[#050507]/80 backdrop-blur-xl">
    <div class="container mx-auto px-6 h-full flex items-center justify-between">
      <a href="/" class="flex items-center gap-3 group">
        <div class="relative w-9 h-9 flex items-center justify-center">
            <!-- Original Logo SVG -->
            <svg viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg" class="w-full h-full animate-spin-slow">
                <circle cx="20" cy="20" r="18" stroke="url(#logoGrad)" stroke-width="2"/>
                <circle cx="20" cy="20" r="10" stroke="url(#logoGrad)" stroke-width="1.5" stroke-dasharray="3 2"/>
                <circle cx="20" cy="20" r="4" fill="url(#logoGrad)"/>
                <path d="M20 2 A18 18 0 0 1 38 20" stroke="url(#logoGrad)" stroke-width="2.5" stroke-linecap="round"/>
                <defs>
                  <linearGradient id="logoGrad" x1="2" y1="2" x2="38" y2="38" gradientUnits="userSpaceOnUse">
                    <stop offset="0%" stop-color="#FFB800"/>
                    <stop offset="100%" stop-color="#FF6B00"/>
                  </linearGradient>
                </defs>
            </svg>
        </div>
        <span class="text-xl font-black text-white tracking-tighter">KIRMA</span>
      </a>
      
      <div class="hidden md:flex items-center gap-1">
        <a href="#services" class="px-4 py-2 text-sm font-medium text-gray-400 hover:text-white transition-all rounded-lg hover:bg-white/5">Servicios</a>
        <a href="#casos" class="px-4 py-2 text-sm font-medium text-gray-400 hover:text-white transition-all rounded-lg hover:bg-white/5">Casos</a>
        <a href="#proceso" class="px-4 py-2 text-sm font-medium text-gray-400 hover:text-white transition-all rounded-lg hover:bg-white/5">Proceso</a>
        <a href="#nosotros" class="px-4 py-2 text-sm font-medium text-gray-400 hover:text-white transition-all rounded-lg hover:bg-white/5">Nosotros</a>
        <a href="#contact" class="ml-4 px-5 py-2.5 bg-gradient-to-r from-accent to-accent-orange rounded-lg text-sm font-bold text-black shadow-lg shadow-accent/20 hover:scale-105 active:scale-95 transition-all">
          Contacto
        </a>
      </div>
    </div>
  </nav>

  <!-- Hero Section -->
  <header class="relative min-h-screen flex items-center justify-center pt-20 overflow-hidden">
    <!-- Glow Effects (matches legacy) -->
    <div class="absolute inset-0 pointer-events-none overflow-hidden" aria-hidden="true">
        <div class="absolute top-[-10%] left-1/2 -translate-x-1/2 w-[600px] h-[600px] bg-accent/20 blur-[100px] rounded-full animate-pulse-slow"></div>
        <div class="absolute bottom-[10%] left-[-5%] w-[400px] h-[400px] bg-purple-600/10 blur-[80px] rounded-full"></div>
        <div class="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20 brightness-50"></div>
    </div>

    <div class="container mx-auto px-6 text-center relative z-10">
      <div class="inline-flex items-center gap-2 px-4 py-1.5 bg-accent/10 border border-accent/20 rounded-full text-[10px] font-mono font-bold text-accent mb-10 tracking-[0.2em] uppercase animate-fade-in">
        <span class="w-1.5 h-1.5 bg-accent rounded-full animate-pulse"></span>
        Automate. Build. Innovate.
      </div>
      
      <h1 class="text-5xl md:text-8xl font-black text-white mb-8 leading-[0.9] tracking-tight">
        Innovación tecnológica<br />
        <span class="gradient-text">& automatización</span>
      </h1>
      
      <p class="text-lg md:text-xl text-gray-400 max-w-2xl mx-auto mb-12 leading-relaxed">
        Diseñamos soluciones tecnológicas y automatizamos procesos para que las empresas evolucionen al siguiente nivel.
      </p>
      
      <div class="flex flex-wrap items-center justify-center gap-5 mb-20 animate-fade-in-up">
        <a href="#services" class="px-10 py-5 bg-gradient-to-r from-accent to-accent-orange text-black font-black rounded-xl shadow-2xl shadow-accent/20 hover:scale-105 transition-all flex items-center gap-2">
          Explorar soluciones <ArrowRight size={18} />
        </a>
        <a href="#contact" class="px-10 py-5 bg-white/5 border border-white/10 text-white font-bold rounded-xl hover:bg-white/10 transition-all">
          Solicitar asesoría
        </a>
      </div>

      <!-- Stats Grid -->
      <div class="max-w-4xl mx-auto glass-card rounded-2xl p-8 flex flex-wrap justify-center items-center gap-12 md:gap-20">
        {#each stats as stat}
            <div class="text-center">
                <div class="text-4xl font-black gradient-text mb-1">{stat.value}{stat.suffix}</div>
                <div class="text-xs font-bold text-gray-500 uppercase tracking-widest">{stat.label}</div>
            </div>
        {/each}
      </div>
    </div>

    <div class="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-3 opacity-50">
        <div class="w-px h-12 bg-gradient-to-b from-transparent via-accent to-transparent animate-bounce"></div>
        <span class="text-[10px] font-mono uppercase tracking-[0.3em]">scroll</span>
    </div>
  </header>

  <!-- Technology Section (Intro) -->
  <section id="tecnologia" class="py-32 border-t border-white/5">
    <div class="container mx-auto px-6">
        <div class="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
            <div class="order-2 lg:order-1 relative">
                <div class="grid grid-cols-2 gap-4">
                    <div class="glass-card p-6 rounded-2xl translate-y-4 hover:translate-y-0 transition-all duration-500">
                        <div class="text-3xl mb-4">⚡</div>
                        <div class="text-[10px] font-mono text-gray-500 uppercase tracking-widest">Automatización</div>
                    </div>
                    <div class="glass-card p-6 rounded-2xl hover:-translate-y-4 transition-all duration-500">
                        <div class="text-3xl mb-4">🧠</div>
                        <div class="text-[10px] font-mono text-gray-500 uppercase tracking-widest">I.A. Avanzada</div>
                    </div>
                    <div class="glass-card p-6 rounded-2xl translate-y-8 hover:translate-y-4 transition-all duration-500">
                        <div class="text-3xl mb-4">🔗</div>
                        <div class="text-[10px] font-mono text-gray-500 uppercase tracking-widest">Integración API</div>
                    </div>
                    <div class="glass-card p-6 rounded-2xl translate-y-4 hover:translate-y-0 transition-all duration-500">
                        <div class="text-3xl mb-4">📊</div>
                        <div class="text-[10px] font-mono text-gray-500 uppercase tracking-widest">Analytics</div>
                    </div>
                </div>
            </div>
            <div class="order-1 lg:order-2">
                <div class="flex items-center gap-3 mb-6">
                    <div class="w-10 h-px bg-accent"></div>
                    <span class="text-[10px] font-mono font-bold text-accent uppercase tracking-widest">Nuestra misión</span>
                </div>
                <h2 class="text-4xl md:text-6xl font-black text-white mb-8 leading-tight">
                    Tecnología que <br />
                    <span class="gradient-text">transforma</span>
                </h2>
                <p class="text-gray-400 text-lg leading-relaxed mb-6">
                    En KIRMA creemos que la tecnología debe trabajar para las personas, no al revés. Combinamos inteligencia artificial, automatización avanzada y desarrollo de plataformas digitales para mejorar la productividad.
                </p>
                <p class="text-gray-400 text-lg leading-relaxed">
                    Cada proyecto es único. Analizamos tu contexto, diseñamos soluciones a medida y las implementamos con métricas claras de impacto.
                </p>
            </div>
        </div>
    </div>
  </section>

  <!-- Services Section -->
  <section id="services" class="py-32 bg-white/[0.02]">
    <div class="container mx-auto px-6 text-center max-w-4xl mb-20">
        <div class="flex items-center justify-center gap-3 mb-6">
            <div class="w-10 h-px bg-accent"></div>
            <span class="text-[10px] font-mono font-bold text-accent uppercase tracking-widest">Lo que hacemos</span>
            <div class="w-10 h-px bg-accent"></div>
        </div>
        <h2 class="text-4xl md:text-6xl font-black text-white mb-6">Nuestros <span class="gradient-text">Servicios</span></h2>
        <p class="text-gray-400 text-lg">Soluciones integrales diseñadas para maximizar el rendimiento y la eficiencia de tu empresa.</p>
    </div>

    <div class="container mx-auto px-6">
      <div class="grid grid-cols-1 md:grid-cols-3 gap-8">
        {#each services as service}
          <div class="group p-10 glass-card rounded-[2rem] hover:border-accent/40 transition-all duration-500 hover:-translate-y-2 relative overflow-hidden {service.featured ? 'border-accent/30 bg-accent/[0.02]' : ''}">
            {#if service.featured}
                <div class="absolute top-0 right-0 p-6">
                    <span class="text-[9px] font-black bg-accent text-black px-3 py-1 rounded-full uppercase tracking-widest">Popular</span>
                </div>
            {/if}
            <div class="w-14 h-14 bg-accent/10 rounded-2xl flex items-center justify-center text-accent mb-8 group-hover:bg-accent group-hover:text-black transition-all">
              <service.icon size={28} />
            </div>
            <div class="text-[10px] font-mono text-gray-500 mb-2">{service.id}</div>
            <h3 class="text-2xl font-bold text-white mb-4">{service.title}</h3>
            <p class="text-gray-400 text-sm leading-relaxed mb-8">
              {service.desc}
            </p>
            <ul class="space-y-4 mb-10 border-t border-white/5 pt-8">
              {#each service.features as feature}
                <li class="flex items-center gap-3 text-xs text-gray-400 group-hover:text-white transition-colors">
                    <Check size={14} class="text-accent" /> {feature}
                </li>
              {/each}
            </ul>
            <div class="p-4 bg-accent/5 rounded-xl border border-accent/10 flex items-baseline gap-2">
                <span class="text-2xl font-black text-accent">{service.metric}</span>
                <span class="text-[10px] font-bold text-gray-500 uppercase tracking-widest">{service.metricLabel}</span>
            </div>
          </div>
        {/each}
      </div>
    </div>
  </section>

  <!-- Use Cases Section -->
  <section id="casos" class="py-32">
    <div class="container mx-auto px-6 mb-20 text-center md:text-left">
        <div class="flex items-center gap-3 mb-6 justify-center md:justify-start">
            <div class="w-10 h-px bg-accent"></div>
            <span class="text-[10px] font-mono font-bold text-accent uppercase tracking-widest">Resultados reales</span>
        </div>
        <h2 class="text-4xl md:text-6xl font-black text-white">Casos de <span class="gradient-text">Uso</span></h2>
    </div>

    <div class="container mx-auto px-6 space-y-8">
      {#each cases as kase}
        <div class="group relative glass-card p-10 rounded-3xl border-white/5 hover:border-accent/20 transition-all overflow-hidden">
            <div class="flex flex-col lg:flex-row gap-10 items-center">
                <div class="text-5xl font-black text-white/5 font-mono">{kase.id}</div>
                <div class="flex-1">
                    <div class="flex gap-2 mb-4">
                        {#each kase.tags as tag}
                            <span class="text-[9px] font-mono font-bold text-gray-500 border border-white/10 px-2 py-1 rounded uppercase tracking-widest">{tag}</span>
                        {/each}
                    </div>
                    <h3 class="text-3xl font-bold text-white mb-4">{kase.title}</h3>
                    <p class="text-gray-400 max-w-2xl leading-relaxed">{kase.desc}</p>
                </div>
                <div class="grid grid-cols-1 sm:grid-cols-3 gap-6 w-full lg:w-auto">
                    {#each kase.metrics as metric}
                        <div class="text-center p-4 rounded-2xl bg-white/5 border border-white/5">
                            <div class="text-2xl font-black text-accent">{metric.value}</div>
                            <div class="text-[9px] font-bold text-gray-500 uppercase tracking-widest mt-1">{metric.label}</div>
                        </div>
                    {/each}
                </div>
            </div>
            <div class="absolute bottom-6 right-6 opacity-0 group-hover:opacity-100 transition-all translate-x-4 group-hover:translate-x-0">
                <ArrowRight size={24} class="text-accent" />
            </div>
        </div>
      {/each}
    </div>
  </section>

  <!-- Why Section -->
  <section id="why" class="py-32 border-t border-white/5">
    <div class="container mx-auto px-6 text-center mb-20">
        <div class="flex items-center justify-center gap-3 mb-6">
            <div class="w-10 h-px bg-accent"></div>
            <span class="text-[10px] font-mono font-bold text-accent uppercase tracking-widest">Ventajas competitivas</span>
            <div class="w-10 h-px bg-accent"></div>
        </div>
        <h2 class="text-4xl md:text-6xl font-black text-white mb-6">¿Por qué <span class="gradient-text">KIRMA</span>?</h2>
    </div>

    <div class="container mx-auto px-6">
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {#each whyKirma as item}
                <div class="glass-card p-10 rounded-3xl hover:-translate-y-1 transition-all">
                    <div class="text-4xl mb-6">{item.icon}</div>
                    <h3 class="text-xl font-bold text-white mb-4">{item.title}</h3>
                    <p class="text-gray-500 text-sm leading-relaxed">{item.desc}</p>
                </div>
            {/each}
        </div>
    </div>
  </section>

  <!-- Process Section -->
  <section id="proceso" class="py-32 bg-white/[0.01]">
    <div class="container mx-auto px-6 mb-20">
        <div class="flex items-center gap-3 mb-6">
            <div class="w-10 h-px bg-accent"></div>
            <span class="text-[10px] font-mono font-bold text-accent uppercase tracking-widest">Metodología</span>
        </div>
        <h2 class="text-4xl md:text-6xl font-black text-white">Nuestro <span class="gradient-text">Proceso</span></h2>
    </div>

    <div class="container mx-auto px-6 relative space-y-12">
        <!-- Steps -->
        {#each [
            { id: '01', icon: MousePointer2, title: 'Diagnóstico', desc: 'Analizamos tus procesos actuales e identificamos cuellos de botella.', dur: '~1-2 semanas' },
            { id: '02', icon: Cpu, title: 'Diseño', desc: 'Desarrollamos la arquitectura y el plan detallado de implementación.', dur: '~1-3 semanas' },
            { id: '03', icon: Network, title: 'Implementación', desc: 'Construimos con metodología ágil y entregas iterativas.', dur: '~2-8 semanas' },
            { id: '04', icon: Zap, title: 'Optimización', desc: 'Monitoreamos y ajustamos continuamente la solución.', dur: 'Continuo' }
        ] as step}
            <div class="relative pl-12 md:pl-0">
                <div class="md:grid md:grid-cols-[1fr_auto_1fr] items-center gap-10">
                    <div class="hidden md:block text-right">
                        <div class="text-3xl font-black text-white/5 italic">{step.id}</div>
                    </div>
                    <div class="absolute left-0 top-0 md:relative w-12 h-12 rounded-full bg-accent text-black flex items-center justify-center font-black shadow-[0_0_20px_rgba(255,184,0,0.3)] shrink-0 z-10">
                        <step.icon size={20} />
                    </div>
                    <div class="glass-card p-8 rounded-3xl">
                        <h3 class="text-xl font-bold text-white mb-2">{step.title}</h3>
                        <p class="text-gray-400 text-sm mb-4 leading-relaxed">{step.desc}</p>
                        <span class="text-[9px] font-mono font-bold text-accent uppercase tracking-[0.2em]">{step.dur}</span>
                    </div>
                </div>
            </div>
        {/each}
    </div>
  </section>

  <!-- Contact Section -->
  <section id="contact" class="py-32 overflow-hidden relative">
    <div class="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-accent/5 blur-[120px] rounded-full pointer-events-none"></div>

    <div class="container mx-auto px-6">
      <div class="grid grid-cols-1 lg:grid-cols-2 gap-24 items-center">
        <div>
            <div class="flex items-center gap-3 mb-6">
                <div class="w-10 h-px bg-accent"></div>
                <span class="text-[10px] font-mono font-bold text-accent uppercase tracking-widest">Hablemos</span>
            </div>
            <h2 class="text-5xl md:text-7xl font-black text-white mb-8 leading-tight">
                Inicia tu <br /> <span class="gradient-text">Proyecto</span>
            </h2>
            <p class="text-gray-400 mb-12 text-lg">
                Cuéntanos tu desafío. En menos de 24 horas tendrás una respuesta con una propuesta inicial de cómo podríamos ayudarte.
            </p>
          
            <div class="space-y-8 mb-12">
                <div class="flex items-center gap-6 group">
                    <div class="w-12 h-12 glass-card rounded-2xl flex items-center justify-center text-accent group-hover:bg-accent group-hover:text-black transition-all duration-500">
                        <Mail size={22} />
                    </div>
                    <div>
                        <div class="text-[10px] font-mono font-bold text-gray-500 uppercase tracking-widest mb-1">Escríbenos</div>
                        <span class="text-white font-bold text-lg">contacto@kirma.soft</span>
                    </div>
                </div>
                <div class="flex items-center gap-6 group">
                    <div class="w-12 h-12 glass-card rounded-2xl flex items-center justify-center text-accent group-hover:bg-accent group-hover:text-black transition-all duration-500">
                        <Zap size={22} />
                    </div>
                    <div>
                        <div class="text-[10px] font-mono font-bold text-gray-500 uppercase tracking-widest mb-1">Respuesta rápida</div>
                        <span class="text-white font-bold text-lg">Asesoría gratuita</span>
                    </div>
                </div>
            </div>

            <!-- WhatsApp Direct Card (Legacy Restoration) -->
            <div class="p-8 bg-[#25d366]/5 border border-[#25d366]/20 rounded-3xl flex items-center gap-6">
                <div class="w-12 h-12 bg-[#25d366] rounded-xl flex items-center justify-center text-white shadow-lg shadow-[#25d366]/20">
                    <MessageSquare size={24} />
                </div>
                <div>
                    <h4 class="font-bold text-white mb-1">¿Prefieres chat rápido?</h4>
                    <a href="https://wa.me/573212257107" target="_blank" class="text-sm font-bold text-[#25d366] hover:underline flex items-center gap-1">
                        Escríbenos al WhatsApp <ArrowRight size={14} />
                    </a>
                </div>
            </div>
        </div>

        <div class="relative">
            <!-- Form Card -->
            <div class="bg-white/[0.03] border border-white/5 p-10 rounded-[2.5rem] backdrop-blur-2xl shadow-3xl relative z-10 overflow-hidden">
                <div class="absolute inset-0 bg-gradient-to-br from-accent/5 to-transparent pointer-events-none"></div>

                {#if form?.success}
                    <div class="text-center py-20 animate-scale-in">
                        <div class="w-24 h-24 bg-accent rounded-full flex items-center justify-center text-black mx-auto mb-8 shadow-3xl shadow-accent/20">
                            <Check size={48} strokeWidth={3} />
                        </div>
                        <h3 class="text-3xl font-black text-white mb-4 tracking-tight">¡Mensaje Enviado!</h3>
                        <p class="text-gray-400">Te contactaremos en menos de 24 horas.</p>
                        <button 
                            onclick={() => location.reload()}
                            class="mt-10 px-8 py-3 glass-card rounded-xl text-xs font-bold text-accent uppercase tracking-widest hover:bg-accent/10 transition-all"
                        >
                            Enviar otro →
                        </button>
                    </div>
                {:else}
                    <form 
                        method="POST" 
                        action="?/createLead"
                        use:enhance={() => {
                            loading = true;
                            return async ({ update }) => {
                                loading = false;
                                update();
                            };
                        }}
                        class="space-y-6 relative z-10"
                    >
                        <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div class="space-y-2">
                                <label for="name" class="text-[10px] font-bold text-gray-500 uppercase tracking-widest ml-1">Nombre</label>
                                <div class="relative">
                                    <User class="absolute left-4 top-4 text-gray-600" size={16} />
                                    <input 
                                        id="name"
                                        name="name" 
                                        type="text" 
                                        placeholder="Tu nombre" 
                                        required
                                        class="w-full bg-[#050507] border border-white/5 rounded-xl py-4 pl-12 pr-4 text-sm text-white focus:border-accent ring-0 outline-none transition-all placeholder:text-gray-700"
                                    />
                                </div>
                            </div>
                            <div class="space-y-2">
                                <label for="email" class="text-[10px] font-bold text-gray-500 uppercase tracking-widest ml-1">Email</label>
                                <div class="relative">
                                    <Mail class="absolute left-4 top-4 text-gray-600" size={16} />
                                    <input 
                                        id="email"
                                        name="email" 
                                        type="email" 
                                        placeholder="tu@empresa.com" 
                                        required
                                        class="w-full bg-[#050507] border border-white/5 rounded-xl py-4 pl-12 pr-4 text-sm text-white focus:border-accent ring-0 outline-none transition-all placeholder:text-gray-700"
                                    />
                                </div>
                            </div>
                        </div>

                        <div class="space-y-2">
                            <label for="company" class="text-[10px] font-bold text-gray-500 uppercase tracking-widest ml-1">Empresa</label>
                            <div class="relative">
                                <Building class="absolute left-4 top-4 text-gray-600" size={16} />
                                <input 
                                    id="company"
                                    name="company" 
                                    type="text" 
                                    placeholder="Nombre de tu empresa" 
                                    class="w-full bg-[#050507] border border-white/5 rounded-xl py-4 pl-12 pr-4 text-sm text-white focus:border-accent ring-0 outline-none transition-all placeholder:text-gray-700"
                                />
                            </div>
                        </div>

                        <div class="space-y-2">
                            <label for="service" class="text-[10px] font-bold text-gray-500 uppercase tracking-widest ml-1">Interés principal</label>
                            <div class="relative">
                                <Layers class="absolute left-4 top-4 text-gray-600" size={16} />
                                <select 
                                    id="service"
                                    name="service" 
                                    class="w-full bg-[#050507] border border-white/5 rounded-xl py-4 pl-12 pr-10 text-sm text-white focus:border-accent ring-0 outline-none transition-all appearance-none"
                                >
                                    <option value="">Selecciona un servicio...</option>
                                    <option value="automatizacion">Automatización de Procesos</option>
                                    <option value="plataformas">Soluciones Tecnológicas</option>
                                    <option value="ia">Innovación con IA</option>
                                    <option value="consulta">Consultoría Tecnológica</option>
                                </select>
                                <div class="absolute right-4 top-4 pointer-events-none text-gray-600">
                                    <ArrowRight size={16} class="rotate-90" />
                                </div>
                            </div>
                        </div>

                        <div class="space-y-2">
                            <label for="message" class="text-[10px] font-bold text-gray-500 uppercase tracking-widest ml-1">Mensaje</label>
                            <textarea 
                                id="message"
                                name="message" 
                                placeholder="Cuéntanos brevemente sobre tu proyecto o desafío..." 
                                rows="4" 
                                required
                                class="w-full bg-[#050507] border border-white/5 rounded-xl p-5 text-sm text-white focus:border-accent ring-0 outline-none transition-all placeholder:text-gray-700 resize-none"
                            ></textarea>
                        </div>

                        <button 
                            type="submit" 
                            disabled={loading}
                            class="w-full py-5 bg-gradient-to-r from-accent to-accent-orange disabled:from-gray-800 disabled:to-gray-900 text-black font-black rounded-2xl shadow-2xl shadow-accent/20 hover:scale-[1.02] active:scale-[0.98] transition-all flex items-center justify-center gap-3"
                        >
                            {loading ? 'Procesando...' : 'Enviar Mensaje'}
                            {#if !loading}<ArrowRight size={20} />{/if}
                        </button>

                        <div class="text-center">
                            <p class="text-[9px] font-mono text-gray-600 uppercase tracking-widest">Respuesta garantizada en menos de 24 horas</p>
                        </div>
                    </form>
                {/if}
            </div>
        </div>
      </div>
    </div>
  </section>

  <!-- Footer -->
  <footer class="py-20 border-t border-white/5 relative bg-white/[0.01]">
    <div class="container mx-auto px-6">
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-16 mb-20">
        <div class="col-span-1 md:col-span-2 lg:col-span-1">
            <a href="/" class="flex items-center gap-3 mb-8">
                <div class="w-8 h-8 flex items-center justify-center">
                    <svg viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg" class="w-full h-full">
                        <circle cx="20" cy="20" r="18" stroke="url(#logoGradFooter)" stroke-width="2"/>
                        <circle cx="20" cy="20" r="4" fill="url(#logoGradFooter)"/>
                        <defs>
                          <linearGradient id="logoGradFooter" x1="2" y1="2" x2="38" y2="38" gradientUnits="userSpaceOnUse">
                            <stop offset="0%" stop-color="#FFB800"/>
                            <stop offset="100%" stop-color="#FF6B00"/>
                          </linearGradient>
                        </defs>
                    </svg>
                </div>
                <span class="text-xl font-black text-white tracking-tighter">KIRMA</span>
            </a>
            <p class="text-gray-500 text-sm leading-relaxed mb-6">
                Innovación tecnológica y automatización de procesos para empresas que quieren evolucionar.
            </p>
            <div class="text-[10px] font-mono text-accent uppercase tracking-[0.3em]">Automate. Build. Innovate.</div>
        </div>

        <div>
            <h4 class="text-white font-bold mb-8 uppercase text-xs tracking-widest">Navegación</h4>
            <ul class="space-y-4">
                <li><a href="#services" class="text-gray-500 hover:text-accent text-sm transition-all focus:outline-none focus:text-accent">Servicios</a></li>
                <li><a href="#casos" class="text-gray-500 hover:text-accent text-sm transition-all focus:outline-none focus:text-accent">Casos de uso</a></li>
                <li><a href="#proceso" class="text-gray-500 hover:text-accent text-sm transition-all focus:outline-none focus:text-accent">Metodología</a></li>
                <li><a href="#nosotros" class="text-gray-500 hover:text-accent text-sm transition-all focus:outline-none focus:text-accent">Nosotros</a></li>
            </ul>
        </div>

        <div>
            <h4 class="text-white font-bold mb-8 uppercase text-xs tracking-widest">Legal</h4>
            <ul class="space-y-4">
                <li><a href="/" class="text-gray-500 hover:text-accent text-sm transition-all focus:outline-none">Privacidad</a></li>
                <li><a href="/" class="text-gray-500 hover:text-accent text-sm transition-all focus:outline-none">Términos</a></li>
                <li><a href="/" class="text-gray-500 hover:text-accent text-sm transition-all focus:outline-none">Cookies</a></li>
            </ul>
        </div>

        <div>
            <h3 class="text-white font-bold mb-8 uppercase text-xs tracking-widest">Contacto</h3>
            <p class="text-gray-500 text-sm mb-6">¿Listo para el siguiente nivel?</p>
            <a href="#contact" class="inline-flex px-6 py-3 bg-white/5 border border-white/10 rounded-xl text-xs font-bold text-accent uppercase tracking-widest hover:bg-accent hover:text-black transition-all">
                Reserva tu cita
            </a>
        </div>
      </div>

      <div class="flex flex-col md:flex-row items-center justify-between gap-6 border-t border-white/5 pt-12">
        <p class="text-gray-600 text-[10px] font-mono uppercase tracking-widest">© 2026 Kirma Soft. Todos los derechos reservados.</p>
        <div class="flex gap-6">
            <!-- Socials would go here -->
        </div>
      </div>
    </div>
  </footer>

  <!-- WhatsApp Float Button (Official Restoration) -->
  <a 
    href="https://wa.me/573212257107" 
    target="_blank" 
    rel="noopener noreferrer"
    class="fixed bottom-6 right-6 w-16 h-16 bg-[#25d366] rounded-full flex items-center justify-center text-white shadow-2xl shadow-[#25d366]/40 hover:scale-110 active:scale-95 transition-all z-[1000] rotate-0 group"
    aria-label="Contactar por WhatsApp"
  >
    <div class="absolute -top-12 right-0 bg-white text-black text-[10px] font-bold px-3 py-1.5 rounded-lg shadow-xl opacity-0 group-hover:opacity-100 transition-all pointer-events-none whitespace-nowrap">
        ¡Hablemos por WhatsApp!
    </div>
    <svg viewBox="0 0 24 24" width="32" height="32" fill="currentColor">
        <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.888-.788-1.488-1.761-1.663-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51a12.8 12.8 0 0 0-.57-.01c-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 0 1-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 0 1-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 0 1 2.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0 0 12.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 0 0 5.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 0 0-3.48-8.413Z"/>
    </svg>
  </a>
</div>

<style>
  :global(html) {
    scroll-behavior: smooth;
    background-color: #050507;
  }
  
  .animate-spin-slow {
    animation: spin 8s linear infinite;
  }

  .animate-pulse-slow {
    animation: pulse-glow 4s ease-in-out infinite;
  }

  @keyframes spin {
    from { transform: rotate(0deg); }
    to { transform: rotate(360deg); }
  }

  @keyframes pulse-glow {
    0%, 100% { opacity: 0.15; transform: scale(1) translateX(-50%); }
    50% { opacity: 0.25; transform: scale(1.1) translateX(-50%); }
  }

  @keyframes fadeIn {
    from { opacity: 0; }
    to { opacity: 1; }
  }

  @keyframes fadeInUp {
    from { opacity: 0; transform: translateY(20px); }
    to { opacity: 1; transform: translateY(0); }
  }

  @keyframes scaleIn {
    from { opacity: 0; transform: scale(0.9); }
    to { opacity: 1; transform: scale(1); }
  }

  .animate-fade-in { animation: fadeIn 1s ease both; }
  .animate-fade-in-up { animation: fadeInUp 1s ease both; }
  .animate-scale-in { animation: scaleIn 0.8s ease both; }
</style>
