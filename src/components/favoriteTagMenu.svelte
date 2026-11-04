<script lang="ts">
  import { favoriteTags } from '../store/UserStore';
</script>

<div id="favorite-tags-menu">
  <h3>Favorite Tags</h3>

  {#each $favoriteTags as tag}
    <span class="tag">{tag}</span>
  {/each}
</div>

<style lang="sass">
  $text-color: hsl(114, 56%, 77%)
  $border-style: 1px solid $text-color

  #favorite-tags-menu
    color: $text-color
    height: auto
    margin-top: 20px
    padding: 5px
    border-radius: 3px

  .tag
    margin-right: 8px
</style>
