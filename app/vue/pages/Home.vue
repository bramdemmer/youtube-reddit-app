<template>
  <div class="full-width center-content">
    <img src="dist/images/png.png">
    <WelcomeMessage name="World" />
  </div>
</template>

<script>
import WelcomeMessage from '../components/Home/WelcomeMessage.vue';

export default {
  components: {
    WelcomeMessage,
  },
};
</script>
