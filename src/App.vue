<template>
  <div id="app">
    <router-view />
  </div>
</template>

<style lang="scss">
html {
  height: 100%;
}
body {
  height: calc(100% - 10px);
}
body {
  margin: 0;
  padding: 0 10px 4px 10px;
}
#app {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
  height: 100%;
}
#nav {
  a {
    font-weight: bold;
    color: #2c3e50;

    &.router-link-exact-active {
      color: #42b983;
    }
  }
}
</style>
