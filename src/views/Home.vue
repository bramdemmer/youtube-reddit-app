<template>
  <div class="grid">
    <div class="grid__item">
    <facet-navigation />
    </div>
    <div class="grid__item">
      <message />
      <player />
    </div>
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

<style lang="scss">
.grid {
  display: flex;
  width: 100%;
  flex-flow: row wrap;

  &__item {
    width: 100%;
    @media (min-width: 50rem) {
      width: 50%;
    }
  }
}
</style>
