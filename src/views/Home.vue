<template>
  <div class="home">
    <img alt="Vue logo" src="../assets/images/logo.png">
    <message name="Message component" />
    <player name="Player component loaded with vue" />
    <facet-navigation name="Facet Navigation component loaded with vue" />
  </div>
</template>

<script>
// @ is an alias to /src
import Player from '@/components/Player.vue';
import FacetNavigation from '@/components/FacetNavigation.vue';
import Message from '@/components/Message.vue';

export default {
  name: 'home',
  components: {
    Message,
    Player,
    FacetNavigation,
  },
};
</script>
