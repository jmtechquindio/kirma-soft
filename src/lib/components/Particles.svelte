<script lang="ts">
  import { onMount } from 'svelte';

  let canvas: HTMLCanvasElement | null = $state(null);

  onMount(() => {
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let particles: any[] = [];
    let animFrameId: number;
    let W: number, H: number;

    const CONFIG = {
      count: 60,
      color: 'rgba(255, 184, 0, ',
      colorAlt: 'rgba(120, 0, 255, ',
      minSize: 1,
      maxSize: 2.5,
      minSpeed: 0.1,
      maxSpeed: 0.4,
      connectionDistance: 120,
      connectionOpacity: 0.08,
    };

    function resize() {
      if (!canvas) return;
      W = canvas.width = window.innerWidth;
      H = canvas.height = window.innerHeight;
    }

    function createParticle() {
      const useAlt = Math.random() > 0.8;
      return {
        x: Math.random() * W,
        y: Math.random() * H,
        vx: (Math.random() - 0.5) * CONFIG.maxSpeed * 2,
        vy: (Math.random() - 0.5) * CONFIG.maxSpeed * 2,
        size: CONFIG.minSize + Math.random() * (CONFIG.maxSize - CONFIG.minSize),
        opacity: 0.15 + Math.random() * 0.4,
        colorBase: useAlt ? CONFIG.colorAlt : CONFIG.color,
        opacityDir: Math.random() > 0.5 ? 1 : -1,
      };
    }

    function initParticles() {
      particles = Array.from({ length: CONFIG.count }, createParticle);
    }

    function drawConnections() {
      if (!ctx) return;
      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const dx = particles[i].x - particles[j].x;
          const dy = particles[i].y - particles[j].y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < CONFIG.connectionDistance) {
            const alpha = (1 - dist / CONFIG.connectionDistance) * CONFIG.connectionOpacity;
            ctx.beginPath();
            ctx.strokeStyle = `rgba(255, 184, 0, ${alpha})`;
            ctx.lineWidth = 0.5;
            ctx.moveTo(particles[i].x, particles[i].y);
            ctx.lineTo(particles[j].x, particles[j].y);
            ctx.stroke();
          }
        }
      }
    }

    function update() {
      if (!ctx) return;
      ctx.clearRect(0, 0, W, H);
      drawConnections();

      particles.forEach(p => {
        p.x += p.vx;
        p.y += p.vy;
        p.opacity += p.opacityDir * 0.003;

        if (p.opacity >= 0.6 || p.opacity <= 0.1) p.opacityDir *= -1;
        if (p.x < 0 || p.x > W) p.vx *= -1;
        if (p.y < 0 || p.y > H) p.vy *= -1;

        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fillStyle = `${p.colorBase}${p.opacity})`;
        ctx.fill();
      });

      animFrameId = requestAnimationFrame(update);
    }

    resize();
    initParticles();
    update();

    const handleResize = () => {
      resize();
      initParticles();
    };

    window.addEventListener('resize', handleResize, { passive: true });

    return () => {
      window.removeEventListener('resize', handleResize);
      cancelAnimationFrame(animFrameId);
    };
  });
</script>

<canvas 
  bind:this={canvas} 
  id="particleCanvas" 
  class="fixed top-0 left-0 w-full h-full pointer-events-none z-0 opacity-50"
></canvas>
