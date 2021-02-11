<script>
  import {CodeMirror} from '../../../components'

  export let headEmbed

</script>
  
<CodeMirror bind:value={headEmbed} mode="xml" CodeMirrorOptions={{ htmlMode: true }} style="height:10rem" />
