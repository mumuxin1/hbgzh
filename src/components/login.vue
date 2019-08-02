<template>
  <div class="MU_login">
    <div class="from">
      <img src="../assets/用户@3x.png" alt="">
      <input type="text" placeholder="请输入用户名称" v-model="username" @blur="blur">
    </div>
    <div class="from">
      <img src="../assets/密码@3x.png" alt="">
      <input type="password" placeholder="请输入登陆密码" v-model="password" @blur="blur">
    </div>
    <div class="from">
      <img src="../assets/验证码@3x.png" alt="">
      <input type="text" placeholder="请输入验证码" v-model="picCode" @blur="blur">
      <img :src="codeUrl" alt="" class="picCode" @click="picCode_Init" v-loading="true" element-loading-text="拼命加载中" element-loading-spinner="el-icon-loading" element-loading-background="rgba(0, 0, 0, 0.8)">
    </div>
    <div class="from">
      <img src="../assets/记住账号@3x.png" alt="" v-if="!rember" @click="remberCount">
      <img src="../assets/记住账号_选中@3x.png" alt="" v-else @click="remberCount">
      <span>记住账号</span>
    </div>
    <div :class="disLogined? 'dabled button-g button-p' : 'disabled button-g button-p'" @click="login">
      登录
    </div>
  </div>
</template>
<script>
  import api from '@/api/api'
  import {
    STROAGE
  } from '@/utils/muxin'
  import {
    MessageBox
  } from 'element-ui';
  import {
    truncate
  } from 'fs';
  export default {
    name: 'login',
    computed: {
      disLogined() {
        if (this.username === '' || this.password === '' || this.picCode === '') {
          return false
        } else {
          return true
        }
      }
    },
    data() {
      return {
        username: '',
        password: '',
        picCode: '',
        codeUrl: '', // 校验码u'r'l
        rember: false
      }
    },
    created() {
      // 获取图片验证码
      this.picCode_Init()
      // 获取初始账号密码
      this.data_init()
    },
    methods: {
      blur() {
        var speed = 1; //页面滚动距离
        let timer = setInterval(function() {
          console.log('a')
          let currentPosition = document.documentElement.scrollTop || document.body.scrollTop;
          currentPosition -= speed;
          window.scrollTo(0, currentPosition); //页面向上滚动
          currentPosition += speed; //speed变量
          window.scrollTo(0, currentPosition); //页面向下滚动
          clearInterval(timer);
        }, 1)
      },
      //  获取图片验证码
      picCode_Init() {
        function getuuid() {
          return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
            var r = Math.random() * 16 | 0,
              v = c == 'x' ? r : (r & 0x3 | 0x8);
            return v.toString(16);
          });
        }
        let uuid = getuuid()
        this.codeUrl = process.env.VUE_APP_BASE_API + '/captcha.jpg' + '?uuid=' + uuid
        // 存储uuid --->验证码 ----->登录零时身份
        STROAGE({
          type: 'setItem',
          key: 'Uuid',
          item: uuid
        })
      },
      data_init() {
        let userInfo = STROAGE({
          type: 'getItem',
          key: 'UserInfo'
        })
        userInfo = JSON.parse(userInfo)
        try {
          if (userInfo.remberCount) {
            this.username = userInfo.username
            this.password = userInfo.password
            this.rember = userInfo.remberCount
          }
        } catch (err) {
          console.log(err)
        }
      },
      login() {
        // this.open()
        if (!this.disLogined) return false
        this.$emit('login', {
          username: this.username,
          password: this.password,
          picCode: this.picCode,
          rember: this.rember
        })
      },
      open() {
        MessageBox('此操作将永久删除该文件, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning',
          center: true
        }).then(() => {
          this.$message({
            type: 'success',
            message: '删除成功!'
          });
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消删除'
          });
        });
      },
      remberCount() {
        this.rember = !this.rember
        this.$emit('remberCount', this.rember)
      }
    }
  }
</script>

<style lang="scss" scoped>
  @import '../styles/mix.scss';
  .MU_login {
    width: vw(650);
    height: auto;
    display: flex;
    flex-direction: column;
    padding: vw(10) vw(77);
    background: white;
    border-radius: vw(7);
    margin: 0 auto;
    font-size: vw(26);
    .from {
      height: vw(110);
      border-bottom: vw(0.5) solid #cccccc; // -webkit-box-shadow: 0 1px 1px -1px rgba(0, 0, 0, 0.5);
      display: flex;
      position: relative;
      .picCode {
        width: vw(192);
        height: vw(48) !important;
        position: absolute; // background: red;
        right: 0;
        bottom: 0;
        margin: 0;
      }
      img {
        width: vw(31);
        height: vw(38);
        align-self: flex-end;
        margin-right: vw(21);
        margin-bottom: vw(10);
      }
      &:nth-child(2) {
        img {
          height: vw(38);
        }
      }
      &:nth-child(3) {
        img {
          height: vw(28);
        }
      }
      &:nth-child(4) {
        border-bottom: 0;
        height: vw(70);
        img {
          height: vw(28);
          width: vw(28)
        }
      }
      input {
        flex: 1;
        height: vw(51);
        line-height: vw(51);
        align-self: flex-end;
      }
      span {
        align-self: flex-end;
        margin-bottom: vw(10);
        color: #cccccc;
      }
    }
    .button-p {
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
