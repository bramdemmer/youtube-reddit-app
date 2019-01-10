<template>
  <div id="app">
    <router-view/>
  </div>
</template>

<style lang="scss">
@import 'node-normalize-scss/_normalize.scss';

$color-1: #ffca28;
$color-2: #00796b;

@font-face {
  font-family: roboto;
  src:
    url('assets/fonts/roboto-regular.woff2') format('woff2'),
    url('assets/fonts/roboto-regular.woff') format('woff');
  font-weight: 600;
  font-style: bold;
}

html {
  font-family: roboto, 'Avenir', Helvetica, Arial, sans-serif;
  color: #2c3e50;
  background: #fefefe;
}

</style>

<script>
export default {

};
</script>
