<svelte:options tag={null} />
<script>
  import {fade} from 'svelte/transition'

  // Workaround to get events firing https://github.com/sveltejs/svelte/issues/3119
  import { createEventDispatcher } from "svelte"
  import { get_current_component } from "svelte/internal"

  const component = get_current_component()
  const svelteDispatch = createEventDispatcher()
  const dispatch = (name, detail) => {
    svelteDispatch(name, detail)
    component.dispatchEvent && component.dispatchEvent(new CustomEvent(name, { detail }))
  }

</script>

<div class="bg-codeblack border-t border-b border-gray-800" in:fade={{duration:200}}>
  <div class="container mx-auto p-2 flex">
    <div class="w-8 flex items-center">
      <i class="fas fa-plus text-white"></i>  
    </div>
    <div class="flex-1 grid grid-cols-5 gap-2">
      <button on:click={() => dispatch('convert', 'content')} class="bg-primored hover:bg-red-600" on:click={() => dispatch('delete')} id="component-remove">
        <i class="fas fa-edit"></i> 
        <span>Content</span>
      </button>
      <button on:click={() => dispatch('convert', 'component')} class="bg-primored hover:bg-red-600" on:click={() => dispatch('delete')} id="component-remove">
        <i class="fas fa-code"></i>
        <span>Component</span>
      </button>
      <button on:click={() => dispatch('convert', 'symbol')} class="bg-primored hover:bg-red-600" on:click={() => dispatch('delete')} id="component-remove">
        <i class="fas fa-clone"></i>  
        <span>Symbol</span>
      </button>
      <button on:click={() => dispatch('convert', 'section')} class="bg-primored hover:bg-red-600" on:click={() => dispatch('delete')} id="component-remove">
        <i class="fas fa-columns"></i>  
        <span>Section</span>
      </button>
      <button on:click={() => dispatch('remove')} class="border border-gray-800 hover:border-gray-800" on:click={() => dispatch('delete')} id="component-remove">
        <i class="fas fa-trash"></i>   
        <span>Remove</span>
      </button>
    </div>
  </div>
</div>

<style>
  @tailwind base;
  @tailwind components;
  @tailwind utilities;

  i {
    @apply mr-2;
  }

  button {
    @apply font-semibold flex-1 rounded-sm flex justify-center items-center p-1 text-sm text-gray-100 transition-colors duration-200;
  }
</style>