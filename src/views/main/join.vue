<template>
  <div class="join" ref="mulogin">
    <mu-header :left="true" :back="false" :right="false" title="合作加盟" icon="icon"></mu-header>
    <div class="content1" >
      <img src="@/assets/navbar@3x.png" alt="" class="img">
      <p> 经济共享，合作共赢，一起瓜分百亿共享充电市场 好项目不怕自担风险，双重承诺给加盟商定心丸
      </p>
      <span>加盟热线：400-628-1388</span>
      <span>周一至周五 9:00-17:30</span>
      <span>
    总部地址：广东省湛江市赤坎区新春路三巷2号</span>
      <span class="tit">代理商申请</span>
      <div class="from">
        <span>姓       名</span>
        <input type="text" placeholder="请输入您的姓名" v-model="useName" maxlength="30" @blur="blur" @focus="focus">
      </div>
      <div class="from">
        <span>联系方式</span>
        <input type="text" placeholder="请输入您的电话或邮箱" v-model="pm" maxlength="40" @blur="blur"@focus="focus">
      </div>
      <div class="from">
        <span>联系地址</span>
        <input type="text" placeholder="请输入联系地址" v-model="adress" maxlength="40" @blur="blur" @focus="focus">
      </div>
      <div class="from">
        <span>备注(选填)</span>
        <input type="text" placeholder="" v-model="des" @blur="blur" @focus="focus">
      </div>
      <div class="from">
        <span>图形验证码</span>
        <input type="text" placeholder="请输入验证码" v-model="code" @focus="focus" @blur="blur">
        <div id="verificationCode" class="verificationCode">
          <canvas id="verifyCanvas"></canvas>
          <img @click="changeChecknum" id="code_img">
        </div>
      </div>
      <!-- <span>{{code}}</span> -->
      
    </div>
    <div @click="submitF" v-if="!loading">
      <el-tooltip :content="tipContent" placement="top" class="button-g button" :disabled="disabled">
        <el-button>立即申请</el-button>
      </el-tooltip>
    </div>
    <el-button type="primary" :loading="true" class="button button-g" v-else>提交中...</el-button>
  </div>
</template>

<script>
  import Header from '../../components/header'
  import api from '@/api/api'
  import {
    Checknum
  } from '@/utils/gVerify.js'
  import {
    timeFormat
  } from '@/utils/muxin'
  import { MessageBox } from 'element-ui';
  export default {
    name: 'join',
    components: {
      'mu-header': Header
    },
    data() {
      return {
        codeUrl: null,
        code: '',
        getCode: '',
        tipContent: '', // 提示消息
        disabled: false,
        file: null,
        loading: false,
        useName: '',
        pm: '',
        adress: '',
        des: '',
      }
    },
    mounted() {
      console.log('join')

      this.changeChecknum()
      let h = 0
      window.onresize = () =>{
      console.log(this.$refs.mulogin.$el.style)
        alert(1)
        h = this.fullHeight - document.documentElement.clientHeight
        if (h > 50) {
          this.$refs.mulogin.$el.style.top = 25 +'%'
        } else {
          this.$refs.mulogin.$el.style.top = -70 +'%'
        }
      }
    },
    methods: {
      data_Init() {
        // 查询代理商家
        this.QueryProxy()
        // 查询店铺
        // this.QueryShop()
      },
      focus () {
        // console.log(this.$parent)
          // this.$parent.$el.style.top = -20 +'%'
          // this.$parent

      },
      blur () {
// this.$refs.mulogin.style.top = 9 +'%'
      },
      submitF () {
        if (this.name === '') {
          this.tipContent = '请输入您的姓名'
          return false
        }
        if (!(/^1[3456789]\d{9}$/.test(this.pm)) && !/^([a-zA-Z0-9]+[_|\_|\.]?)*[a-zA-Z0-9]+@([a-zA-Z0-9]+[_|\_|\.]?)*[a-zA-Z0-9]+\.[a-zA-Z]{2,3}$/.test(this.pm)) {
          this.tipContent = '请输入正确的电话或邮箱'
          return false
        }
        if (this.adress === '') {
          this.tipContent = '请输入联系地址'
          return false
        }
        console.log(this.code, this.getCode)
        if (this.code.toUpperCase() !== this.getCode) {
          this.tipContent = '验证码错误'
          this.changeChecknum()
          return false
        }
        this.disabled = true
        this.joinapply()
      },
      changeChecknum() {
        this.getCode = Checknum('code_img', 'verifyCanvas');
      },
      async joinapply() {
        let queryShopRes = await api.joinapply({
            method: 'POST',
            query: {
              address: this.adress,
              contact: this.pm,
              name: this.useName,
              remark: this.des,
              returnVisit: 1
            
          }
        })
        if (queryShopRes.code === 0) {
          // this.$router.go(-1)
          // alert(1)
          // window.close()
          MessageBox({
          title: '成功',
          type:'success',
          confirmButtonText: '确定',
          center: true
        })
        }
      },
    }
  }
</script>
<style lang="scss">
  @import '../../styles/mix.scss'; 
  // @import '../../styles/select.css';
  // @import '../../../node_modules/element-ui/lib/theme-chalk/index.css';
  .join {
    width: 100%;
    height: 100%;
    background: #f5f5f5;
    font-size: vw(26);
    color: #3a5d75;
    position: relative;
    overflow: hidden;
    // position: relative;
    // padding-bottom: 20px;
    .content1 {
      max-width: 100%;
      margin: vw(0) vw(64); // background: white;
      padding: 0 vw(20); // padding-top: vw(32);
      display: flex;
      flex-direction: column;
      align-items: center;
      // position: absolute;
      // top: 7%;
      .img {
        width: vw(391);
        height: vh(361);
        margin-top: vh(10)
      }
      p {
        font-size: vw(26);
        line-height: vw(52); // color: #3a5d75;
        margin-top: vw(20);
        margin-bottom: vh(20);
        text-align: left;
        width: 100%;
      }
      span {
        margin-bottom: vh(18);
        text-align: left;
        width: 100%;
      }
      .tit {
        margin-top: vh(30);
        text-align: center;
        font-size: vw(30);
        margin-bottom: 0;
        display: inline-block;
      }
      .from {
        width: 100%;
        height: vh(70);
        display: flex;
        align-items: flex-end;
        span {
          width: 25%;
          margin: 0;
        }
        input {
          flex: 1;
          height: vh(60);
          border-bottom: vh(1) solid #8e8e8e;
          width: 65%;
        }
        .picCode {
          width: vw(192);
          height: vh(48) !important; // position: absolute; // background: red;
          margin-left: vw(10);
        }
      }
    }
    #verificationCode{
      width:vw(130);
      height: vh(42);
      position: relative;
      img{
        @extend #verificationCode;
        position: relative;
        // top: vh(-45)
      }
    }
    #verifyCanvas {
      @extend #verificationCode;
      position: relative;
        bottom: vh(5)
    }
    .button {
      height: vh(72);
      line-height: vh(72);
      margin: vh(48) vh(30);
      color: white;
      border-radius: vh(36);
    }
    .el-button {
      width: 92%;
      padding: 0;
      margin: 0 auto;
      margin-top: vw(40);
      // position: absolute;
      // bottom: vh(60);
      // left: 50%;
      // margin-left: -150px;
      height: vw(72) !important;
      line-height: vw(72) !important;
      background: #2d9efd !important;

    }
    .is-loading {
      background: #2d9efd !important;
      color: #ffffff !important;
      font-size: 18px !important;
    }
  }
</style>
