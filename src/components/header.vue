<template>
  <div class="header">
    <div class="statusBar"></div>
    <div class="betw">
      <div class="head-left" v-if="left">
        <slot name="setLeft"></slot>
        <div class="back" v-if="back" @click="$router.back()">
          <img src="../assets/返回@3x.png" />
        </div>
        <div class="text" v-if="leftText" @click="goBackHander">
          {{leftText}}
        </div>
      </div>
      <div class="head-right" v-if="right">
        <slot name="setRight"></slot>
        <div class="icon" v-if="icon" @click="logOut">
          <img src="../assets/切换账号@3x.png" />
        </div>
      </div>
    </div>
    <div class="head-center" v-if="title">
      {{title}}
      <slot name="title"></slot>
    </div>
  </div>
</template>
<script>
  import { STROAGE } from '@/utils/muxin'

export default {
  name: 'Muheader',
  props: {
    left: {
      type: Boolean,
      default: false
    },
    title: {
      type: String,
      default: ''
    },
    right: {
      type: Boolean,
      default: false
    },
    back: {
      type: Boolean,
      default: true
    },
    icon: {
      type: Boolean,
      default: false
    },
    leftText: {
      type: String,
      default: ''
    }
  },
  methods: {
    logOut () {
      console.log('ss')
      this.$router.push('/')
      STROAGE({
        type: 'clear'
      })
    }
  },
}
</script>
<style lang="scss" scoped>
  @import '../styles/mix.scss';
  .header {
    width: 100%;
    height: vw(85);
    position: relative;
    background: #2d9efd;
  }
  .betw {
    width: 100%;
    height: vw(85);
    padding: 0 vw(30);
    display: flex;
    position: absolute;
    justify-content: space-between;
    top: 0;
    .head-left .back{
      height: vw(85);
      display: flex;
      img{
        width: vw(23);
        height: vw(42);
        align-self: center;
      }
    }
    .head-right {
      display: flex;
      .icon {
        display: flex;
        img{
          width: vw(42);
          height: vw(42);
          align-self: center;
        }
      }
    }

  }
  .head-center {
    width: 80%;
    height: vw(85);
    margin: 0 auto;
    position: absolute;
    top: 0;
    left: 10%;
    line-height: vw(85);
    color: white;
    font-size: vw(36)
  }
</style>
