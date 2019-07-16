<template>
  <div class="details">
    <mu-header :left="true" :right="true" title="分润数据" icon="icon"></mu-header>
    <div class="content">
      <div class="opt">
        <span>商家代理</span>
        <el-select v-model="value" placeholder="请选择商家代理" class="sel">
          <el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value" size="medium">
          </el-option>
        </el-select>
      </div>
      <div class="opt">
        <span>店  &#12288  铺</span>
        <el-select v-model="value" placeholder="请选择店铺" class="sel">
          <el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value">
          </el-option>
        </el-select>
      </div>
      <div class="">
         <div class="block">
          <span class="demonstration">默认</span>
          <el-date-picker
            v-model="value1"
            type="date"
            placeholder="选择日期">
          </el-date-picker>
        </div>
      </div>
      <div class="ul">
        <div class="li">
          <span>设备使用率</span>
          <span>xx</span>
        </div>
        <div class="li">
          <span>设备使用率</span>
          <span>xxx</span>
        </div>
        <div class="li">
          <span>设备数量</span>
          <span>aaa</span>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import Header from '../../components/header'

export default {
  name: 'details',
  components: {
    'mu-header': Header
  },
  data () {
    return {
      options: [{
        value: '选项1',
        label: '黄金糕'
      }, {
        value: '选项2',
        label: '双皮奶'
      }, {
        value: '选项3',
        label: '蚵仔煎'
      }, {
        value: '选项4',
        label: '龙须面'
      }, {
        value: '选项5',
        label: '北京烤鸭'
      }],
      value: '',
      value1: ''
    }
  }
}
</script>
<style lang="scss" scoped>
  @import '../../styles/mix.scss';
  @import '../../../node_modules/element-ui/lib/theme-chalk/index.css';
  .details {
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;
    background: #f5f5f5;
    font-size: vw(30);
    color: #1c1c1c;
    .content {
      max-width: 100%;
      margin: vw(28);
      background: white;
      padding: 0 vw(20);
      padding-top: vw(32);
      .opt {
        display: flex;
        margin-bottom: vw(45);
        span {
          height: vw(64);
          line-height: vw(64);
          font-size: vw(30);
          color: #1c1c1c;
          flex: 2;
          text-align: left;

        }
        /deep/ .sel{
          flex: 8;
          height: vw(64);
          border-radius: vw(5);
          border: vw(1) solid #b12121;
          .el-input{
            height: vw(64);
            .el-input__inner{
              height: vw(64);
            }
          }
        }
         

      }
      .ul{
        width: 100%;
        border-top: vw(1) solid #d1d1d1;
        padding: 0 vw(20);
        padding-top: vw(10);
        padding-bottom: vw(15);
        .li{
          display: flex;
          justify-content: space-between;
          height: vw(90);
          &:last-child() {
             text-align: right;
          }
          span{
            line-height: vw(90);
            text-align: left;
          }
        }
      }
    }
  }
  
</style>
