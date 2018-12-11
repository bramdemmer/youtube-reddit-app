<template>
  <div class="full-width center-content">
    <img src="dist/images/png.png">
    <message name="Message component" />
    <facet-navigation name="Facet Navigation component loaded with vue" />
    <div class="right">
      <player name="Player component loaded with vue" />
    </div>
  </div>
</template>

<script>
import Player from '../components/Player/Player.vue';
import FacetNavigation from '../components/FacetNavigation/FacetNavigation.vue';
import Message from '../components/Message/Message.vue';

export default {
  components: {
    Message,
    Player,
    FacetNavigation,
  },
};
</script>
