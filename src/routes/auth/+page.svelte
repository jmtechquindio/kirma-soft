<script lang="ts">
  import { enhance } from '$app/forms';
  let isLogin = true;
  export let form;
</script>

<div class="min-h-screen flex items-center justify-center bg-gray-900 px-4">
  <div class="max-w-md w-full space-y-8 p-8 bg-gray-800 rounded-xl shadow-2xl border border-gray-700">
    <div>
      <h2 class="mt-6 text-center text-3xl font-extrabold text-white">
        {isLogin ? 'Iniciar sesión' : 'Crear cuenta'}
      </h2>
      <p class="mt-2 text-center text-sm text-gray-400">
        Kirma CRM & Project Hub
      </p>
    </div>

    <form class="mt-8 space-y-6" method="POST" action="?/{isLogin ? 'login' : 'signup'}" use:enhance>
      <div class="rounded-md shadow-sm -space-y-px">
        <div>
          <label for="email" class="sr-only">Email</label>
          <input id="email" name="email" type="email" required class="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-700 placeholder-gray-500 text-white bg-gray-900 rounded-t-md focus:outline-none focus:ring-orange-500 focus:border-orange-500 focus:z-10 sm:text-sm" placeholder="Email" value={form?.email ?? ''}>
        </div>
        <div>
          <label for="password" class="sr-only">Contraseña</label>
          <input id="password" name="password" type="password" required class="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-700 placeholder-gray-500 text-white bg-gray-900 rounded-b-md focus:outline-none focus:ring-orange-500 focus:border-orange-500 focus:z-10 sm:text-sm" placeholder="Contraseña">
        </div>
      </div>

      {#if form?.message}
        <p class="text-sm text-center text-orange-400">{form.message}</p>
      {/if}

      <div>
        <button type="submit" class="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-orange-600 hover:bg-orange-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-orange-500 transition-colors">
          {isLogin ? 'Acceder' : 'Registrarse'}
        </button>
      </div>
    </form>

    <div class="text-center">
      <button 
        type="button" 
        class="text-sm text-orange-500 hover:text-orange-400"
        on:click={() => isLogin = !isLogin}
      >
        {isLogin ? '¿No tienes cuenta? Registrate' : '¿Ya tienes cuenta? Inicia sesión'}
      </button>
    </div>
  </div>
</div>
