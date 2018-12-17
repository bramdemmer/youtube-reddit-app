<template>
<div class="youtube-player">
  <div id="player" />
  <div class="reddit-filters">

    <facet-filter name="limit" :type="jsonData.filterType.limit" label="Max videos"/>
    <facet-filter name="sort" :type="jsonData.filterType.sort" label="Sort by"/>

    <facet-filter name="time" :type="jsonData.filterType.time" label="Since"/>
     <!--v-show="" if sort is top/controversial -->
  </div>
</div>
</template>

<script>
import jsonData from '@/assets/data/subreddits.json';
import FacetFilter from '@/components/FacetFilter.vue';

export default {
  components: {
    FacetFilter,
  },
  data() {
    return {
      jsonData,
    };
  },
};
</script>

<style lang="scss">
  .youtube-player {
    position: fixed;
    top: 1rem;
    right: 1rem;
    max-width: calc(100% - 2rem);
  }
</style>
