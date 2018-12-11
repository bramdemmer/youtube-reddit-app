<template>
  <div id="app">
    <div id="nav">
      <router-link to="/">Home</router-link> |
      <router-link to="/about">About</router-link>
    </div>
    <router-view/>
  </div>
</template>

<style lang="scss">
@import 'node-normalize-scss/_normalize.scss'; // node modules start with ~

@font-face {
  font-family: roboto;
  src:
    url('assets/fonts/roboto-regular.woff2') format('woff2'),
    url('assets/fonts/roboto-regular.woff') format('woff');
  font-weight: 600;
  font-style: bold;
}

#app {
  font-family: roboto, 'Avenir', Helvetica, Arial, sans-serif;
  color: #2c3e50;
}
#nav {
  padding: 30px;
  a {
    font-weight: bold;
    color: #2c3e50;
    &.router-link-exact-active {
      color: #42b983;
    }
  }
}
</style>
