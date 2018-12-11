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
