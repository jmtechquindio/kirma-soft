<script lang="ts">
  let { 
    type = "button", 
    variant = "primary", 
    size = "md", 
    children, 
    ...props 
  } = $props();

  const base = "inline-flex items-center justify-center font-medium transition-colors rounded-md focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed";
  
  const variants = {
    primary: "bg-orange-600 text-white hover:bg-orange-700 focus:ring-orange-500",
    secondary: "bg-gray-700 text-gray-100 hover:bg-gray-600 focus:ring-gray-500",
    outline: "border border-gray-600 text-gray-300 hover:bg-gray-800 focus:ring-gray-500",
    ghost: "text-gray-400 hover:text-white hover:bg-gray-800"
  };

  const sizes = {
    sm: "px-3 py-1.5 text-xs",
    md: "px-4 py-2 text-sm",
    lg: "px-6 py-3 text-base"
  };
</script>

<button 
  {type} 
  class="{base} {variants[variant as keyof typeof variants]} {sizes[size as keyof typeof sizes]}"
  {...props}
>
  {@render children()}
</button>
