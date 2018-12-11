<template>
  <div>
    <h3>This is the {{ name }}!</h3>
    <div class="message" />
  </div>
</template>

<script>
export default {
  props: {
    name: {
      type: String,
      required: true,
    },
  },
};
</script>

<style lang="scss">
.message {
  padding: 1rem;
  position: fixed;
  top: 0;
  right: 1rem;
  opacity: 0;
  transform: translateY(-10%);
  transition: all 250ms ease-in-out;
  background-color: cornflowerblue;
  z-index: 5;

  &.is-visible {
    opacity: 1;
    transform: translateY(1rem);
  }
}

</style>
