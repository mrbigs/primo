<script>
  import { createEventDispatcher } from 'svelte'
  const dispatch = createEventDispatcher()

  import axios from 'axios'
  export let field
  if (!field.options) {
    field = {
      ...field,
      value: {},
      options: {
        url: ''
      }
    }
  } 

  $: console.log(field)

  async function getEndpoint() {
    console.log('fetching', field.options)
    const res = await axios.get(field.options.url)
    if (res && res.data) {
      console.log(res)
      field.value = res.data
      dispatch('input')
    }
  }

</script>

<label class="p-2 flex text-sm bg-gray-100 border-t border-gray-200">
  <span class="px-2">{field.label}</span>
  <input 
    on:input={getEndpoint}
    bind:value={field.options.url}
    type="url" 
    class="flex-1 border-b-2 border-gray-200 bg-gray-100 pl-2 outline-none"
  />
</label>