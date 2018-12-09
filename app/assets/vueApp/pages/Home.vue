<template>
  <div class="full-width center-content">
    <img src="dist/images/png.png">
    <player name="Player component loaded with vue" />
    <facet-navigation name="Facet Navigation component loaded with vue" />
  </div>
</template>

<script>
import Player from '../components/Player/Player.vue';
import FacetNavigation from '../components/FacetNavigation/FacetNavigation.vue';

export default {
  components: {
    Player,
    FacetNavigation,
  },
};
</script>
