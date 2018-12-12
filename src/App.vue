<template>
  <div id="app">
    <div id="nav">
      <router-link to="/">Home</router-link> |
      <router-link to="/about">About</router-link>
      <a href="https://www.reddit.com/dev/api">Reddit API</a>
      <a href="https://developers.google.com/youtube/iframe_api_reference">Youtube iframe API</a>
    </div>
    <router-view/>
  </div>
</template>

<style lang="scss">

@import 'node-normalize-scss/_normalize.scss'; // node modules start with ~

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
background: linear-gradient(143deg, $color-1, $color-2);
background-size: 400% 400%;
animation: AnimationName 46s ease infinite;
}


@keyframes AnimationName {
    0%{background-position:0% 79%}
    50%{background-position:100% 22%}
    100%{background-position:0% 79%}
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
