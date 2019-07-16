<template>
  <div id="app">
    <transition name="fade-effect" mode="in-out">
      <keep-alive :include="['home']">
        <router-view/>
      </keep-alive>
    </transition>
  </div>
</template>
<script>
export default {
  created () {
    this.$router.push('/login')
  }
}
</script>

<style lang="scss">
  @import './styles/mix.scss';

#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  width: 100%;
  height: 100%;
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
