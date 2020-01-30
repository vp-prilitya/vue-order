<template>
  <div id="app">
    <div id="nav">
      <div>
        <b-navbar type="light" variant="light">
          <b-navbar-brand href="#">Vue Order</b-navbar-brand>
        </b-navbar>
      </div>
    </div>
    <router-view />
  </div>
</template>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
}

body{
  background-color: red;
}
</style>
