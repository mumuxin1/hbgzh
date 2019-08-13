<template>
  <div class="details">
    <mu-header :left="true" :back="false" :right="true" title="分润数据" icon="icon"></mu-header>
    <div class="content1">
      <div class="opt">
        <span>商家代理</span>
        <el-select v-model="proxyName.label" placeholder="请选择商家代理" filterable class="sel" @change="chang(proxyName.label)" size="small">
          <el-option v-for="item in proxyOptions" :key="item.value" :label="item.label" :value="item.value">
          </el-option>
        </el-select>
      </div>
      <div class="opt">
        <span>店&#12288&#12288铺</span>
        <el-select v-model="shopName.label" placeholder="请选择店铺" clearable class="sel" @change="shop(shopName.label)" size="small">
          <el-option v-for="item in shopOptions" :key="item.value" :label="item.label" :value="item.value">
          </el-option>
        </el-select>
      </div>
      <div class="selectDate">
        <div class="block" size="large">
          <el-date-picker v-model="startTime" align="left" type="date" :editable="false" placeholder="请选择开始时间" :picker-options="pickerOptions"  @change="getStartTime(startTime)">
          </el-date-picker>
        </div>
        <span>至</span>
        <div class="block">
          <el-date-picker v-model="endTime" align="left" type="date" :editable="false" placeholder="请选择结束时间" :picker-options="pickerOptions" @change="getEndTime(endTime)">
          </el-date-picker>
        </div>
      </div>
    </div>
    <div class="content2">
      <div class="ul" v-for="item in procydata" :key="item.value">
        <div class="li">
          <span>父代理名称</span>
          <span>{{item.parentName}}</span>
        </div>
        <div class="li">
          <span>店铺名称</span>
          <span>{{item.merchantName}}</span>
        </div>
        <div class="li">
          <span>设备使用率</span>
          <span>{{item.ratio | precent}}</span>
        </div>
        <div class="li">
          <span>分润统计</span>
          <span>{{item.dividedFee | fenzhuanyan}}</span>
        </div>
        <div class="li">
          <span>订单数量</span>
          <span>{{item.ordersNum}}单</span>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
  import Header from '../../components/header'
  import api from '@/api/api'
  import { timeFormat } from '@/utils/muxin'
  export default {
    name: 'pageDetails',
    components: {
      'mu-header': Header
    },
    data() {
      return {
        proxyOptions: [], // 商家代理
        shopOptions: [], // 店铺
        proxyName: {
          label: ''
        }, /// 代理名字
        shopName: {
          label: ''
        },
        startTime: '',
        endTime: '',
        bId: '', // 选中代理id
        merId: '', //选中店铺id
        pickerOptions: {
          // disabledDate(time) {
          //   return time.getTime() > Date.now();
          // },
          // shortcuts: [{
          //   text: '今天',
          //   onClick(picker) {
          //     picker.$emit('pick', new Date());
          //   }
          // }, {
          //   text: '昨天',
          //   onClick(picker) {
          //     const date = new Date();
          //     date.setTime(date.getTime() - 3600 * 1000 * 24);
          //     picker.$emit('pick', date);
          //   }
          // }, {
          //   text: '一周前',
          //   onClick(picker) {
          //     const date = new Date();
          //     date.setTime(date.getTime() - 3600 * 1000 * 24 * 7);
          //     picker.$emit('pick', date);
          //   }
          // }]
        },
        startTime: '',
        endTime: '',
        procydata: []
      }
    },
    created() {
      this.data_Init()
    },
    filters: {
      precent: (a) => {
        return a.toFixed(2) * 100 + '%'
      },
      fenzhuanyan: (a) => {
        return (a / 100).toFixed(2) + '元'
      }
    },
    methods: {
      chang (index) {
        this.bId = this.proxyOptions.find(el => {return el.value === index}).bId
        // 查询店铺
        this.QueryShop()
        // 查询全部店铺
        this.QueryDevicesInfo()
        this.shopName.label = ''
      },
      shop (e) {
        console.log(e)
        if (e) {
          this.merId = this.shopOptions.find(el => {return el.value === e}).merId
        console.log(this.merId)
        } else {
          this.merId = ''
        }
        // 查询全部店铺
        this.QueryDevicesInfo()
      },
      getStartTime (e) {
        if (e) {
          this.startTime = timeFormat(e, '-', 'yyyy-mm-dd')
        } else {
          this.startTime = ''
        }
        this.QueryDevicesInfo()
      },
      getEndTime (e) {
        if (e) {
          this.endTime = timeFormat(e, '-', 'yyyy-mm-dd')
        } else {
          this.endTime = ''
        }
        this.QueryDevicesInfo()
      },
      data_Init() {
        // 查询代理商家
        this.QueryProxy()
        // 查询店铺
        // this.QueryShop()
      },
      // 查询代理商家
      async QueryProxy() {
        let queryProxyRes = await api.queryProxy()
        if (queryProxyRes.msg === 'success') {
          console.log(queryProxyRes.data)
          // queryProxyRes.data.forEach((el, index) => {
          //   el.value = index
          //   el.lable =  el.name
          // })
          this.proxyOptions = queryProxyRes.data.map((el, index) => ({
            value: index,
            label: el.name,
            bId: el.bId
          }))
          console.log(this.proxyOptions)
          // this.$set('proxyOptions', this.proxyOptions)
        }
      },
      // 查询店铺
      async QueryShop() {
        
        let queryShopRes = await api.queryShop({
          query: {
            bId: this.bId
          }
        })
        if (queryShopRes.msg === 'success') {
          // queryProxyRes.data.forEach((el, index) => {
          //   el.value = index
          //   el.lable =  el.name
          // })
          this.shopOptions = queryShopRes.data.map((el, index) => ({
            value: index,
            label: el.name,
            merId: el.id
          }))
          console.log(this.shopOptions)
          // this.$set('proxyOptions', this.proxyOptions)
        }
      },
      // 查询设备使用详细信息
      async QueryDevicesInfo() {
        if (this.bId === '') return false
        let queryDevicesInfoRes = await api.queryDeviceUsersinfo({
          query: {
            page: 1,
            limit: 10,
            bId: this.bId,
            merId: this.merId,
            startTime: this.startTime,
            endTime: this.endTime
          }
        })
        if (queryDevicesInfoRes.msg === 'success') {
          if (queryDevicesInfoRes.page.totalCount > 0) {
            this.procydata = queryDevicesInfoRes.page.list
          } else {
            this.procydata= []
          }
          console.log(queryDevicesInfoRes)
          // this.$set('proxyOptions', this.proxyOptions)
        }
      }
    }
  }
</script>
<style lang="scss">
  @import '../../styles/mix.scss'; 
  // @import '../../styles/select.css';
  // @import '../../../node_modules/element-ui/lib/theme-chalk/index.css';
  .details {
    width: 100%;
    height: 100%;
    background: #f5f5f5;
    font-size: vw(30);
    color: #1c1c1c;
    position: relative;
    overflow: hidden;
    padding-bottom: 20px;
    // .box{
    //   width: 375px;
    //   height: 50px;
    //   background: red;
    // }
    .content1 {
      max-width: 100%;
      margin: vw(28);
      // background: white;
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
        /deep/ .sel {
          // flex: 8;
          // height: vw(64); // border-radius: vw(3);
          // border: vw(1) solid #d1d1d1;

          // .el-input {
          //   height: vw(60);
          //   line-height: vw(60);
          //   font-size: vw(24);

          //   .el-input__inner {
          //     height: vw(60);
          //     line-height: vw(60);
          //     margin-top: vw(1);
          //     margin-right: vw(1);
          //     background: #f5f5f5;

          //   }
          // }
          // .el-input__suffix-inner{
          //   // position: relative;
          //   top: -10px;
          // }
        }
      }
      .selectDate {
        width: 100%;
        height: vw(64);
        display: flex;
        // margin-bottom: vw(40);
        .block {
          flex: 1;
          width: 49%;
          height: 100%;
          // padding-left: vw(35);
          background: #f5f5f5;
          // border: vw(1) solid #d1d1d1;
          display: flex;
          .el-date-editor {
            width: 98%;
            height: 100%;
            font-size: vw(24);

            .el-input__inner {
              background: #f5f5f5;
              height: vw(61);
              line-height: vw(61);
              margin-top: vw(1);
              margin-right: vw(1);
              // margin-left: vw(5)
              padding-left: vw(60);
              padding-right: vw(0)
            }
            .el-input__prefix {
              position: absolute;
              top: vw(-15);
              left: vw(0);
              margin: 0;
            }
            .el-icon-date:before {
              color: #2d9efd;
            }
          }
        }
        span {
          line-height: vw(64);
          margin: 0 vw(9);
        }
      }
      
    }
    .content2{
      max-width: 100%;
      margin: vw(28);
      padding: 0 vw(20);
      max-height: 66%;
      overflow-y: scroll;
      // padding-top: vw(32);
      margin-top: 0;
      .ul {
        width: 100%;
        // border-top: vw(1) solid #d1d1d1;
        padding: 0 vw(20);
        padding-top: vw(10);
        margin-bottom: vw(35);
        padding-bottom: vw(15);
        background: white;
        border-radius: vw(10);
        .li {
          display: flex;
          justify-content: space-between;
          height: vw(90);
          &:last-child() {
            text-align: right;
          }
          span {
            line-height: vw(90);
            text-align: left;
          }
        }
      }
    }
  } 
  //select element
  // .el-select-dropdown{
  //   max-width: 300px !important;
  //   min-width: 256px !important;
  // }
  // .el-select-dropdown__item {
  //   height: vw(64) !important;
  //   span {
  //     line-height: vw(64) !important;
  //     height: vw(64) !important;
  //   }
  // }
  // datePicker element
  // .el-select-dropdown {
  //   width: 94%;
  //   height: auto;
  //   margin-right: vw(20)
  // }
  // .el-date-picker {
  //   position: absolute !important;
  //   // width: 93% !important;
  //   // height: 45%;
  //   margin: 0 auto !important;
  //   left: vw(25) !important;
  //   margin-top: vw(40);
  //   position: relative;
  //   .el-picker-panel__sidebar {
  //     // width: 15%;
  //     // height: 100%;
  //     .el-picker-panel__shortcut {
  //       width: 100%;
  //       height: vw(64);
  //     }
  //   }
  //   .el-picker-panel__body {
  //     position: absolute;
  //     width: 85%;
  //     margin-left: 15%;
  //     height: 100%;
  //     .el-date-picker__header-label {
  //       line-height: vw(64)
  //     }
  //     .el-picker-panel__icon-btn {
  //       height: vw(64);
  //     }
  //     .el-date-table {
  //       margin-top: vw(20);
  //       tr {
  //         line-height: vw(64);
  //         height: vw(64);
  //       }
  //     }
  //   }
  // }
  // .el-picker-panel__content,
  // .el-date-picker__header {
  //   width: 85% !important;
  //   height: vw(44);
  // }
  // .el-date-table__row {
  //   width: 100px;
  //   height: vw(40)
  // }
</style>
