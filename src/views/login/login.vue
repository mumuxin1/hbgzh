<template>
  <div class="login">
    <div class="logo">
    </div>
    <Login class="mulogin" @login="login" @remberCount="remberCount" ref="mulogin"></Login>
    <!-- <div>{{baseUrl}}</div> -->
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
        rember: false, // 记住密码
        fullHeight: document.documentElement.clientHeight
      }
    },
    components: {
      Login
    },
    async mounted() {
      console.log('login')

       let res = await api.queryProxy()
      if (res.msg === 'success') {
        this.$router.push('/details')
      }
      // this.$refs.mulogin.style.top = 100 + 'px'ale
      // alert(this.$refs.mulogin.styles)
      let h = 0
      console.log(this.$refs.mulogin.$el.style)
      window.onresize = () =>{
        h = this.fullHeight - document.documentElement.clientHeight
        if (h > 50) {
          this.$refs.mulogin.$el.style.top = 25 +'%'
        } else {
          this.$refs.mulogin.$el.style.top = 39 +'%'
        }
        // setInterval(() => {
        //   h+=30
        //   if (h < 300) {
        //     this.$refs.mulogin.$el. animation.translateX(-20);
        //   } else {
        //     clearInterval()
        //   }
        // }, 100);
        // // this.$refs.mulogin.$el.style.top = h + 'px'
        // // alert(this.fullHeight-document.documentElement.clientHeight)
        // // this.$refs.mulogin.style.top = this.fullHeight-document.documentElement.clientHeight + 'px'
        // let h = this.fullHeight - document.documentElement.clientHeig
      }
    },
    methods: {
      async login(data) {
        this.rember = data.rember
        let uuid = STROAGE({
          type: 'getItem',
          key: 'Uuid'
        })
        let loginRes = await api.login({
          method: 'POST',
          query: {
            username: data.username,
            password: data.password,
            captcha: data.picCode,
            uuid: uuid
          }
        })
        if (loginRes.msg === 'success') {
          console.log('loginRes-----', loginRes)
          STROAGE({
            type: 'setItem',
            key: 'UserInfo',
            item: {
              username: data.username,
              password: data.password,
              token: loginRes.token,
              remberCount: this.rember
            }
          })
        }
        this.$router.push('/details')
      },
      remberCount(item) {
        this.rember = item
      }
    }
  }
</script>
<style lang="scss" scoped>
  @import '../../styles/mix.scss';
  .login {
    background: url('../../assets/bg.png') no-repeat;
    background-size: cover;
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;
    .logo {
      width: vw(455);
      height: vw(242);
      margin: 0 auto;
      margin-top: vh(162);
      background: url('../../assets/logo.png') no-repeat;
      background-size: cover;
      position: relative;
      img {
        width: vw(455);
        height: vw(242);
      }
    }
    .mulogin {
      // margin-top: vw(128);
      position: absolute;
      top: 39%;
      left: 50%;
      margin-left: vw(-325)

    }
  }
</style>
