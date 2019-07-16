<template>
  <div class="MU_login">
    <div class="from">
      <img src="../assets/用户@3x.png" alt="" >
      <input type="text" placeholder="请输入用户名称">
    </div>
    <div class="from">
      <img src="../assets/密码@3x.png" alt="" >
      <input type="password" placeholder="请输入登陆密码">
    </div>
    <div class="from">
      <img src="../assets/验证码@3x.png" alt="" >
      <input type="text" placeholder="请输入验证码">
    </div>
    <div class="from">
      <img src="../assets/记住账号@3x.png" alt="" v-if="!rember">
      <img src="../assets/记住账号_选中@3x.png" alt="" v-else>
      <span>记住账号</span>
    </div>
    <div class="button-g button-p" @click="login">
      登录
    </div>
  </div>
</template>
<script>
import api from '@/api/api'
export default {
  name: 'login',
  props: {
    rember: {
      type: Boolean,
      default: false
    }
  },
  methods: {
    login () {
      console.log(api.login)
      let loginRes = api.login({
        query:{
          username: "王静",
          password: "123",
          captcha: "3gmnp",
          uuid: "1111111111"
        }
      })
      let checkCodeRes = api.picCheckCode({
        query:{
          uuid: "1111111111"
        }
      })
      if (loginRes) {
        console.log(loginRes)
        this.$router.push('/details')
      }
    }
  }
}
</script>

<style lang="scss" scoped>
@import '../styles/mix.scss';

.MU_login{
  width: vw(650);
  height: auto;
  display: flex;
  flex-direction: column;
  padding: vw(10) vw(77);
  background: white;
  border-radius: vw(7);
  margin: 0 auto;
  font-size: vw(26);
  .from{
    height: vw(110);
    border-bottom: vw(1) solid #cccccc;
    // -webkit-box-shadow: 0 1px 1px -1px rgba(0, 0, 0, 0.5);
    display: flex;
    img{
      width: vw(31);
      height: vw(38);
      align-self: flex-end;
      margin-right: vw(21);
      margin-bottom: vw(10);
    }
    &:nth-child(2) {
      img{
        height: vw(38);
      }
    }
    &:nth-child(3) {
      img{
        height: vw(28);
      }
    }
    &:nth-child(4) {
      border-bottom: 0;
      height: vw(70);
      img{
        height: vw(28);
        width: vw(28)
      }
    }
    input{
      flex: 1;
      height: vw(51);
      line-height: vw(51);
      align-self: flex-end;
    }
    span{
      align-self: flex-end;
      margin-bottom: vw(10);
      color: #cccccc;
    }
  }
  .button-p{
    width: vw(496);
    height: vw(74);
    line-height: vw(74);
    color: white;
    font-size: vw(32);
    margin-top: vw(32);
    margin-bottom: vw(66);
  }
}
</style>
