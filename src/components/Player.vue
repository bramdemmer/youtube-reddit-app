<template>
  <div>
    <div class="youtube-player">
      <div id="player" />
    </div>
    <div id="nav">
      <router-link to="/">Home</router-link> |
      <router-link to="/about">About</router-link>
      <a href="https://www.reddit.com/dev/api">Reddit API</a>
      <a href="https://developers.google.com/youtube/iframe_api_reference">Youtube iframe API</a>
    </div>
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
    position: relative;
    padding-bottom: 56.25%;
    height: 0;
    overflow: hidden;
    margin-bottom: 1rem;

    iframe {
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
    }
  }
</style>
