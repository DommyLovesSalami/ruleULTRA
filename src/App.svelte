<script lang="ts">
  import {mount, onMount, unmount} from 'svelte';
  // import FavoriteTagsMenu from './components/favoriteTagMenu.svelte';
  import './lib/linter/lint';

  onMount(() => {
    if (window.location.pathname !== '/') return;

    const staticIndex = document.getElementById('static-index');
    if (!staticIndex || !staticIndex.parentNode) return;

    // const wrapper = document.createElement('div');
    // wrapper.id = 'wrapper';
    //
    // staticIndex.parentNode.insertBefore(wrapper, staticIndex);
    // wrapper.appendChild(staticIndex);

    // const target = document.createElement('div');
    // target.id = 'favorite-tags-header';
    // wrapper.appendChild(target);
    //
    // const component = mount(FavoriteTagsMenu, {target});

    // return () => {
    //   // unmount(component);
    //   wrapper.remove();
    // };
  });
</script>

<style lang="sass">
  $text-color: hsl(114, 56%, 77%)
  $border-style: 1px solid $text-color

  :global(body)
    background: #101010 !important

  :global(#static-index)
    display: flex
    flex-direction: column
    align-items: center

  :global(p),
  :global(li),
  :global(.tag-search > h5:nth-child(1)),
  :global(.sidebar > div:nth-child(10) > h5:nth-child(1))
    color: $text-color !important

  :global(h2),
  :global(h3),
  :global(h4)
    color: $text-color !important

  :global(a:link),
  :global(a:visited),
  :global(a:hover),
  :global(a:active)
    margin-bottom: 10px !important
    color: $text-color !important

  :global(#tags),
  :global(.awesomplete > input:nth-child(1))
    background-color: #30432c !important
    border: $border-style !important
    color: white !important
    margin-top: 12px !important
    margin-bottom: 12px !important

  :global(div.space:nth-child(4) > form:nth-child(1) > input:nth-child(2)),
  :global(.tag-search > form:nth-child(2) > input:nth-child(3))
    background-color: #30432c !important
    color: white !important
    border: $border-style !important
    margin-bottom: 10px !important

  :global(.post .body),
  :global(#tag-sidebar .tag-count)
    color: white !important


  :global(#subnavbar)
    background-color: #363636 !important

  :global(.awesomplete > ul:nth-child(2) > li)
    color: black !important
    font-weight: 600 !important

    //My style stuff lamo
  :global(#wrapper)
    display: flex
    flex-direction: row
    align-items: center

  :global(#favorite-tags-header)
    align-items: center
    display: flex
    flex-direction: row
    justify-content: space-between
    height: 100%
    padding-top: 12px
</style>
