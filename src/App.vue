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
  import api from './api/api'
import { watch } from 'fs';
  export default {
    data() {
      return {
        showHeight: ''
      }
    },
    async created() {
      console.log('环境地址---process.env.VUE_APP_BASE_API---------》》》' + process.env.VUE_APP_BASE_API)
      console.log('app')
      // let res = await api.queryProxy()
      // if (res.msg === 'success') {
      //   this.$router.push('/details')
      // } else {
      //   this.$router.push('/login')
      // }
      // window.onload = function() {
      //   this.showHeight = document.body.height
      //   // 阻止双击放大
      //   var lastTouchEnd = 0;
      //   document.addEventListener('touchstart', function(event) {
      //     if (event.touches.length > 1) {
      //       event.preventDefault();
      //     }
      //   });
      //   document.addEventListener('touchend', function(event) {
      //     var now = (new Date()).getTime();
      //     if (now - lastTouchEnd <= 300) {
      //       event.preventDefault();
      //     }
      //     lastTouchEnd = now;
      //   }, false);
      //   // 阻止双指放大
      //   document.addEventListener('gesturestart', function(event) {
      //     event.preventDefault();
      //   });
      // }
    },
    watch: {
      
    },
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
    position: absolute;
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
