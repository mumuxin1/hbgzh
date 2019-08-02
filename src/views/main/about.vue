<template>
  <div class="login">
    <img src="@/assets/about.png" alt="">
    
  </div>
</template>
<script>
  import Login from '../../components/login'
  import api from '@/api/api'
  import {
    STROAGE
  } from '@/utils/muxin'
  export default {
    name: 'login',
    data() {
      return {
      }
    },
    mounted() {
    }
  }
</script>
<style lang="scss" scoped>
  @import '../../styles/mix.scss';
  .login {
    width: 100%;
    overflow-y: scroll;
    height: 100%;
    img{
      width: 100%;
      height: 1340px;
    }
  }
</style>
