<template>
  <div class="login">
    <div class="logo">
      <img src="../../assets/logo.png" alt="">
    </div>
    <Login class="mulogin"></Login>
  </div>
</template>
<script>
import Login from '../../components/login'
export default {
  name: 'login',
  components: {
    Login
  }
}
</script>
<style lang="scss" scoped>
@import '../../styles/mix.scss';

.login {
  background: url('../../assets/背景@3x.png') no-repeat;
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
    img{
     width: vw(455);
     height: vw(242);
    }
  }
  .mulogin{
    margin-top: vw(128)
  }
}
</style>
