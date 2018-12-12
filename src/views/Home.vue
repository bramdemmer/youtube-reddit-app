<template>
  <div class="home">
    <message />
    <player />
    <facet-navigation />
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
