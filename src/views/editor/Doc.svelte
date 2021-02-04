<script lang="ts">
  import _ from 'lodash'
  import Section from './Layout/Section.svelte'
  import {wrapper as siteWrapper} from '../../stores/data/draft'
  import {wrapper as pageWrapper} from '../../stores/app/activePage'

  export let content

</script>

<div class="primo-page" style="border-top: 56px solid rgb(20,20,20)">
  {#each content as section, i (section.id)}
    <Section {section} bind:content />
  {/each}
  {@html $pageWrapper.below.final}
  {@html $siteWrapper.below.final}
</div>

<style>
  .primo-page:hover section-buttons {
    @apply opacity-100; 
    user-select: initial;
    pointer-events: none;
  }
  section-buttons {
    @apply absolute opacity-0 bottom-0 right-0 transition-opacity duration-200;
    z-index: 100;
    user-select: none;
  }
</style>