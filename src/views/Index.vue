<template lang="html">
  <!-- 在首页父组件发送http请求,后将数据通过props传递给子组件,可减少请求次数,减少服务器压力 -->
  <div class="hello" ref="hello" style="height: 100%;padding-top: 0px;    overflow: auto;">
<!--    <mt-header title="移动仓库">-->
<!--    </mt-header>-->
<!--    &lt;!&ndash;    搜索开始&ndash;&gt;-->
<!--    <div class="fenlei_top">-->
<!--      <div class="fenlei_top_left">-->
<!--        <el-input-->
<!--          clearable-->
<!--          placeholder="请输入货号/商品名"-->
<!--          prefix-icon="el-icon-search"-->
<!--          v-model.trim="queryParamTop.actNo">-->
<!--        </el-input>-->
<!--      </div>-->
<!--      <div class="fenlei_top_right" @click="scanCode(1)">-->
<!--        <img src="../../static/img/photo_7.png" height="30px;" width="30px;">-->
<!--      </div>-->
<!--    </div>-->
<!--    待办事项-->
<!--    <v-orderNum :orderIofo ="orderIofo" :storeData ="storeData"/>-->
    <div class="car1">
      <div v-if="flag">
        <mt-header   title="移动仓库">
          <div slot="left">
            <img  style="width: 21px; "  src="../../static/img/logo/logo-333-1.png">
          </div>
          <div slot="right">
            <img  @click="scanCode(1)"  style="width: 26px; "  src="../../static/img/photo2.png">
          </div>
        </mt-header>
        <div class="header" style="    margin-top: 11vw;margin-bottom: -3px;">
          <div class="my-indent-right-1" style="margin-left: 4vw;">
            <el-input
              clearable
              placeholder="请输入货号/商品名"
              prefix-icon="el-icon-search"
              v-model.trim="queryParamTop.actNo">
            </el-input>
          </div>
        </div>
      </div>

      <div  v-else style="
        padding-bottom: 40vw;
    background-image: linear-gradient(#e5f4ff, #f3f2f8);">
        <div class="zuoyouduiqi" style="padding: 2.81vw 4.8vw !important;">
          <div class="mint-header-button is-left" >
            <img style="width: 21px; "  src="../../static/img/logo/logo-333-1.png">
          </div>
          <div>
          <span style="font-size: 16px; color: black;" class="mint-header-title">
            移动仓库
          </span>
          </div>
          <div class="mint-header-button is-right" @click="scanCode(1)"  >
            <img style="width: 26px; "  src="../../static/img/photo2.png">
          </div>
        </div>
        <div class="header">
          <div class="my-indent-right-1" style="margin-left: 4vw;">
            <el-input
              clearable
              placeholder="请输入货号/商品名"
              prefix-icon="el-icon-search"
              v-model.trim="queryParamTop.actNo">
            </el-input>
          </div>
        </div>
      </div>

      <section class="my-pay-2"
               :style="!flag? 'border-bottom-style:none;margin-top: -141px;padding-top: 4vw; '
               : 'border-bottom-style:none;padding-top: 4vw; '">
        <router-link :to="{ path: '/store'}">
          <span style="    margin-top: -3px;">
             <img
               style="margin-top: 11px;
    margin-bottom: -3px;
    width: 28px;" src="../../static/img/goods-1.png"></img>
          </span>
          <p style="color: #333;font-size: 14px;    margin-top: 1px;">库存管理</p>
        </router-link>
        <img style="    margin-left: 10px;
    height: 55px;
    margin-top: 10px;" src="../../static/img/more-1.png">
        <router-link :to="{ path: '/store?today=7'}">
          <span :class="storeData.upCout > 0 ? 'color-danger-strong' : 'color-font'">{{storeData.upCout}}</span>
          <p style="color: #8c8a8a;font-size: 14px;">变更</p>
        </router-link>
        <router-link :to="{ path: '/store?today=2'}">
          <span :class="storeData.successNumLast > 0 ? 'color-danger-strong' : 'color-font'">{{storeData.successNumLast}}</span>
          <p style="color: #8c8a8a;font-size: 14px;">待上架</p>
        </router-link>
        <router-link :to="{ path: '/store?today=3'}">
          <span :class="storeData.waitMoveCout > 0 ? 'color-danger-strong' : 'color-font'">{{storeData.waitMoveCout}}</span>
          <p style="color: #8c8a8a;font-size: 14px;">待移库</p>
        </router-link>
      </section>

      <div class="main" style="">
        <h1 class="section1-title" style="border-top-style:none">
      <span style="    margin-left: 20px;">
        订单管理
      </span>
          <div class="link-top"></div>
        </h1>
        <section class="my-pay-2" style="border-bottom-style:none;">
          <router-link :to="{ path: '/order?status=3'}">
            <span :class="orderIofo.count3 > 0 ? 'color-danger-strong' : 'color-font'">{{orderIofo.count3}}</span>
            <p style="color: #8c8a8a;font-size: 14px;">待发货</p>
          </router-link>
          <router-link :to="{ path: '/order?status=4'}">
            <span :class="orderIofo.count4 > 0 ? 'color-danger-strong' : 'color-font'">{{orderIofo.count4}}</span>
            <p style="color: #8c8a8a;font-size: 14px;">已发货</p>
          </router-link>
          <router-link :to="{ path: '/order?status=5'}">
            <span :class="orderIofo.count5 > 0 ? 'color-danger-strong' : 'color-font'">{{orderIofo.count5}}</span>
            <p style="color: #8c8a8a;font-size: 14px;">运输中</p>
          </router-link>
          <router-link :to="{ path: '/order?status=6'}">
            <span :class="orderIofo.count6 > 0 ? 'color-danger-strong' : 'color-font'">{{orderIofo.count6}}</span>
            <p style="color: #8c8a8a;font-size: 14px;">已收货</p>
          </router-link>
        </section>
        <section class="my-pay-2" style="border-bottom-style:none;">
          <router-link :to="{ path: '/order?status=11&scrollNum=4'}">
            <span class="color-font">{{orderIofo.count11}}</span>
            <p style="color: #8c8a8a;font-size: 14px;">已入库</p>
          </router-link>
          <router-link :to="{ path: '/order?status=2&scrollNum=7'}">
            <span class="color-font">{{orderIofo.count2}}</span>
            <p style="color: #8c8a8a;font-size: 14px;">已上架</p>
          </router-link>
          <router-link :to="{ path: '/order?status=7&scrollNum=7'}">
            <span class="color-font">{{orderIofo.count7}}</span>
            <p style="color: #8c8a8a;font-size: 14px;">交易成功</p>
          </router-link>
          <router-link :to="{ path: '/order?status=8&scrollNum=7'}">
            <span class="color-font">{{orderIofo.count8}}</span>
            <p style="color: #8c8a8a;font-size: 14px;">瑕疵</p>
          </router-link>
        </section >
        <section  @click="order(1,6)" class="zuoyouduiqi my-pay-21" v-if="orderIofo.countTheExpire">
          <div class="wenzitupduiqi" style="margin-left: 4vw;">
            <img style="width: 30px; "  src="../../static/img/timeout_2.png">
            <span style="color: #333;font-size: 15px;margin-left: 10px">即将到期订单</span>
          </div>
          <div class="wenzitupduiqi" style="margin-right: 4vw;">
            <span class="color-font-strong" style="font-size: 25px;">{{orderIofo.countTheExpire}}</span>
            <img style="width: 20px;" src="../../static/img/more.png">
          </div>
        </section>
      </div>
    </div>
    <!--    销售走势-->
    <div style="margin-top: 4vw; background-color: #fff;height: 520px;
    width: 92vw;
    margin-left: 4vw;">
<!--      <h1 class="index-title"  style="border-top-style:none">-->
<!--        销售走势-->
<!--      </h1>-->
      <h1 class="index-title" style="border-top-style:none">
      <span >
        销售走势
      </span>
        <div class="link-top-1"></div>
      </h1>
      <ul class="index-list" style=" padding-top: 4vw" >
        <li>
          <router-link :to="{name:'销售报表'}">
            <p class="color-font"><strong>{{orderData.successNum}}</strong> </p>
            <p class="section1name" >月订单数</p>
            <p class="color-font"><strong>{{orderData.expectSuccessNum}}</strong> </p>
            <p class="section1name" >预计总数</p>
            <p :class="orderData.successNumRate<0 ? 'color-success' : 'color-danger'" >{{orderData.successNumRate}} %</p>
            <p class="section1name" >同比上月</p>
          </router-link>
        </li>
        <li>
          <router-link :to="{name:'销售报表'}">
            <p class="color-font"><strong>{{orderData.profitsAmount}}</strong> </p>
            <p class="section1name" >本月利润</p>
            <p class="color-font"><strong>{{orderData.expectProfitsAmount}}</strong> </p>
            <p class="section1name" >预计利润</p>
            <p :class="orderData.profitsAmountRate<0 ? 'color-success' : 'color-danger'" >{{orderData.profitsAmountRate}} %</p>
            <p class="section1name" >同比上月</p>
          </router-link>
        </li>
        <li>
          <router-link :to="{name:'销售报表'}">
            <p class="color-font"><strong>{{orderData.orderAmount}}</strong> </p>
            <p class="section1name" >本月总额</p>
            <p class="color-font"><strong>{{orderData.expectOrderAmount}}</strong> </p>
            <p class="section1name" >预计总额</p>
            <p :class="orderData.orderAmountRate<0 ? 'color-success' : 'color-danger'" >{{orderData.orderAmountRate}} %</p>
            <p class="section1name" >同比上月</p>
          </router-link>
        </li>
      </ul>
      <div style="
            margin-left: 30vw;
    height: 13vw;
    line-height: 6vw;">
        <el-button :type="mouthLl" @click="profitData(1)" size="small" round>月利润</el-button>
        <el-button :type="dayLl" @click="profitData(0)" size="small" round>日利润</el-button>
      </div>
      <div style="
      margin-left: 4vw;
      display: flex;
    align-items: center;
    justify-content: space-between;
    width: 92vw;">
        <div  @click="chosseTime(1)">
          <el-date-picker style="width: 37vw;" readonly="readonly"
                          v-model="queryParam.createTimeFrom" :value-format="valueFormat"
                          :type="dateType"  placeholder="时间开始">
          </el-date-picker>
        </div>
        <span style="    font-size: 15px;margin-left: 1vw;">至</span>
        <div  @click="chosseTime(2)">
          <el-date-picker style="width: 37vw;    margin-right: 8vw;" readonly="readonly"
                          v-model="queryParam.createTimeTo" :value-format="valueFormat"
                          :type="dateType" placeholder="时间结束">
          </el-date-picker>
        </div>
      </div>
      <div style="margin-top: 20px;">
        <ve-line
          v-if="dataType == 1"
          height="250px"
          :data="chartData2"
          :legend-visible="true"
          :loading="loading"
          :data-empty="dataEmpty"
          :settings="chartSettings"></ve-line>
        <ve-histogram height="250px" v-else :data="chartData2" :extend="extend" :settings="chartSettings" :legend-visible="true"></ve-histogram>
      </div>
    </div>
    <!--    仓库值-->
    <v-section1 :form="form" :countDay="countDay" :count="count":chartData1="chartData1" :orderIofo ="orderIofo" :chartSettings1="chartSettings1" />
    <mt-datetime-picker
      v-model="pickerValue"
      type="date"
      ref="picker"
      :startDate="new Date(2022, 3, 1 )"
      :endDate="new Date()"
      year-format="{value} 年"
      month-format="{value} 月"
      date-format="{value} 日"
      @confirm="handleConfirm">
    </mt-datetime-picker>
    <v-baseline/>
    <v-footer/>
  </div>
</template>

<script>
// import orderNum from '@/components/index/orderNum.vue'
import Section1 from '@/components/index/section1.vue'
import Baseline from '@/common/_baseline.vue'
import Footer from '@/common/_footer.vue'
// import index from '@/http/mock.js' //模拟数据
import { goodsOrderApi } from '@/api/goodsOrder'

export default {
  components: {
    // 'v-header': Header,
    // 'v-orderNum': orderNum,
    // 'v-service': Service,
    'v-section1': Section1,
    // 'v-section2': Section2,
    // 'v-section3': Section3,
    // 'v-section4': Section4,
    'v-baseline': Baseline,
    'v-footer': Footer
  },
  data() {
    return {
      // datas: {
      //   section1:{},
      //   // section2:{},
      //   // section3:{},
      //   // section4:{},
      //   // swiper:[]
      // },
      flag: false,
      loading: true,
      form: {},
      orderIofo: {},
      queryParam: {
        dataType: 1,
        createTimeFrom: '',
        createTimeTo: ''
      },
      queryParamTop: {
        actNo: ''
      },
      dataType: 1,
      extend: {
        // x轴的文字倾斜
        "xAxis.0.axisLabel.rotate": 45,
        yAxis: {
          //是否显示y轴线条
          axisLine: {
            show: true,
          },
          // 纵坐标网格线设置，同理横坐标
          splitLine: {
            show: false,
          },
          // 线条位置
          position: "left",
        },
        xAxis: {
          axisLine: {
            show: true,
          },
        },
        series: {
          label: { show: true, position: "top" },
        },
        //数据过多时出现横向滚动条
        dataZoom: [
          {
            show: true,
            realtime: true,
            start: 0,
            end: 50,
          },
          {
            type: "inside",
            realtime: true,
            start: 0,
            end: 50,
          },
        ],
      },
      chartData2: {
        columns: ['months', '订单数', '订单金额(千)', '利润(百)'],
        rows: []
      },
      createTime: '',
      chartSettings: {
        // xAxisType: 'time',
        area: false,
        axisSite: { right: ['profitsAmount'] },
        labelAlias: {
          'successNum': '订单数',
          'orderAmount': '订单金额(千)',
          'profitsAmount': '利润(百)'
        }
      },
      chartData: {
        columns: ['months', 'successNum', 'orderAmount', 'profitsAmount'],
        rows: []
      },
      chartSettings1: { type: 'pie' },
      chartData1: {
        columns: ['key', 'value'],
        rows: [
        ]
      },
      countDay: 0, // 倒计时
      count: '', // 倒计时
      seconds: 0, // 10天的秒数
      nowDate: '',
      nowTime: '',
      nowWeek: '',
      pickerValue:new Date(),
      pickerValueType: '',
      orderData: {},
      storeData: {},
      dateType: 'month',
      valueFormat: 'yyyy-MM',
      dayLl: 'default',
      mouthLl: 'primary',
      loading: false,
      dataEmpty: false
    }
  },
  created(){
    this.initTime()
    this.time()
    this.getData()
    this.getData1()
    this.getData2()
    this.keyupSubmit()
    // this.getData()
    // this.getData1()
  },
  mounted(){
    this.$refs.hello.onscroll = ()=>{
      this.handleScroll();
    }
  },
  methods: {

    order(theExpire,scrollNum) {
      this.$router.push({ path: '/order', query: { theExpire,scrollNum }})
    },
    handleScroll () {
      let scrollTop = this.$refs.hello.scrollTop
      console.info(scrollTop)
      if (scrollTop < 40){
        this.flag = false
      } else{
        this.flag = true
      }
    },
    keyupSubmit() {
      document.onkeydown = (e) => {
        let _key = window.event.keyCode
        if (_key === 13) {
          this.jumpGoods(this.queryParamTop.actNo)
        }
      }
    },
    jumpGoods(actNo) {
      this.$router.push({ path: '/GoodsBase', query: { actNo } })
    },
    initTime() {
      let myDate = new Date().getTime()
      let endTime = '2024/02/10 00:00:00'
      let timestamp2 = Date.parse(new Date(endTime))
      this.seconds = (timestamp2 - myDate) / 1000
    },
    countDown() {
      let d = parseInt(this.seconds / (24 * 60 * 60))
      if (d > 0) {
        // d = d < 10 ? '0' + d : d
        let h = parseInt(this.seconds / (60 * 60) % 24);
        h = h < 10 ? '0' + h : h
        let m = parseInt(this.seconds / 60 % 60);
        m = m < 10 ? '0' + m : m
        let s = parseInt(this.seconds % 60);
        s = s < 10 ? '0' + s : s
        this.count = '天' + h + '时' + m + '分' + s + '秒'
      }
      this.countDay = d
    },
    time() {
      setInterval(() => {
        this.seconds -= 1
        this.countDown()
      }, 1000)
    },
    getData() {
      goodsOrderApi.indexData().then(res => {
          if (res.subCode === 1000) {
          this.form = res.data ? res.data.commonDto : {}
          this.orderIofo = res.data ? res.data.countDto : {}
          if (this.form.inventoryCost && this.form.inventoryNum) {
            this.form.inboundAverage = parseFloat(
              this.form.inventoryCost / this.form.inventoryNum).toFixed(2)
          }
          if (this.form.successNum) {
            this.form.orderAmountAverage = parseFloat(
              this.form.orderAmount / this.form.successNum).toFixed(2)
            this.form.freightAverage = parseFloat(
              this.form.freight / this.form.successNum).toFixed(2)
            this.form.profitsAverage = parseFloat(
              this.form.profitsAmount / this.form.successNum).toFixed(2)
          }
          this.form.costAverage = parseFloat(
            this.form.inboundAverage / 1 + this.form.freightAverage / 1).toFixed(2)
          this.form.inventoryRatio = parseFloat(
            this.form.inventoryNum / this.form.goodsPutInNum * 100).toFixed(2)
          this.form.profitsProportion = parseFloat(
            this.form.profitsAverage / this.form.costAverage * 100).toFixed(2)
          // let  inventoryNum = {key: "22", value: 1393  }
          // let  successNum = {key: "23", value: 1393  }
          let  successNum = {key: "成功数量", value: this.form.successNum }
          let  inventoryNum = {key: "库存总数", value: this.form.inventoryNum }
          // let  successNum = {key: "successNum", value: this.form.successNum }
          this.chartData1.rows.push(inventoryNum)
          this.chartData1.rows.push(successNum)
        } else {
          this.$toast(res.subMsg)
        }
      })
    },
    scanCode(photo) {
      this.$router.push({ path: '/scanCode', query: { photo } })
    },
    chosseTime(pickerValueType) {
      this.pickerValueType = pickerValueType
      this.$refs.picker.open();
      if (this.dataType == 1){
        this.$refs.picker.$el.getElementsByClassName('picker-slot')[2].style.display = 'none'
      } else {
        this.$refs.picker.$el.getElementsByClassName('picker-slot')[2].style.display = ''
      }
    },
    handleConfirm(val) {
      let year = new Date(val).getFullYear()
      let month = new Date(val).getMonth() + 1
      if (month < 10 ){
        month = '0' + month
      }
      let res = year + '-' +month
      if (this.dataType == 0){
        let day = new Date(val).getDate()
        if (day < 10 ){
          day = '0' + day
        }
        res = res + '-' + day
      }
      if(this.pickerValueType == 1) {
        this.queryParam.createTimeFrom = res
      }else {
        this.queryParam.createTimeTo = res
      }
      this.getData1()
    },
    profitData(dataType) {
      this.dataType = dataType
      this.queryParam = {
        dataType: dataType,
        createTimeFrom: '',
        createTimeTo: ''
      }
      if (dataType == 1) {
        this.mouthLl = 'primary'
        this.dayLl = 'default'
        this.dateType = 'month'
        this.valueFormat = 'yyyy-MM'
      } else {
        this.mouthLl = 'default'
        this.dayLl = 'primary'
        this.dateType = 'date'
        this.valueFormat = 'yyyy-MM-dd'
      }
      this.getData1()
    },
    getData1() {
      goodsOrderApi.indexOrderData(this.queryParam).then(res => {
        if (res.subCode === 1000) {
          this.dataEmpty = false
          this.loading = false
          this.chartData.rows = res.data.rows
          this.chartData2.rows = res.data.rowsDate
          this.orderData = res.data
          if (this.orderData) {
            this.orderData.successNumRate = parseFloat(
              (this.orderData.successNum - this.orderData.successNumLast)
              / this.orderData.successNumLast * 100).toFixed(2)
            this.orderData.profitsAmountRate = parseFloat(
              (this.orderData.profitsAmount - this.orderData.profitsAmountLast)
              / this.orderData.profitsAmountLast * 100).toFixed(2)
            this.orderData.orderAmountRate = parseFloat(
              (this.orderData.orderAmount - this.orderData.orderAmountLast)
              / this.orderData.orderAmountLast * 100).toFixed(2)
            var date = new Date()
            let todaydate = date.getDate()
            let expectSuccessNum = this.orderData.successNum / (todaydate/30)
            this.orderData.expectSuccessNum = parseFloat(expectSuccessNum).toFixed(0)
            let expectProfitsAmount = this.orderData.profitsAmount / (todaydate/30)
            this.orderData.expectProfitsAmount = parseFloat(expectProfitsAmount).toFixed(2)
            let expectOrderAmount = this.orderData.orderAmount / (todaydate/30)
            this.orderData.expectOrderAmount = parseFloat(expectOrderAmount).toFixed(2)
          }
        } else {
          this.$toast(res.subMsg)
        }
      })
    },
    getData2() {
      goodsOrderApi.todaySync(this.queryParam).then(res => {
        if (res.subCode === 1000) {
          this.storeData = res.data
        } else {
          this.$toast(res.subMsg)
        }
      })
    },
  }
}
</script>


<style lang="less" scoped>
  @import '../assets/fz.less';
  @import '../assets/index/style.css';
  .mint-button--small {
    display: inline-block;
    font-size: 4vw;
    height: 6vw;
  }

  /*
   -----分割线---
  */
  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }

  /* 这里直接设置 1rem = 50px begin */
  html {
    font-size: 50px;
  }

  /* 这里直接设置 1rem = 50px end */
  html,
  body {
  }

  /* 给要上拉的容器设置 begin */
  .hello {
    background-color: #f3f2f8;
    padding-top: 12vw;
    font-size: 13px;
    height: 100vh;
    /*overflow:hidden;*/

    overflow-y: auto;
  }

  .index-title {
    .bt();
    background-color: #ffffff;
    text-align: left;
    padding: 3vw 0;
    margin-top: 4vw;
    font-size: 16px;
    color: #333;
    position: relative;
    margin-left: 20px;
    font-weight: 600;

    i {
      position: absolute;
      right: 6vw;
      top: 50%;
      .fz(font-size, 36);
      .fz(margin-top,-16);

      &::before {
        color: rgb(159, 159, 159);
      }
    }
  }
  .index-title-2 {
    .bt();
    background-color: #ffffff;
    text-align: center;
    padding: 3vw 0;
    margin-top: 4vw;
    .fz(font-size, 40);
    color: #333;
    position: relative;

    i {
      position: absolute;
      right: 6vw;
      top: 50%;
      .fz(font-size, 36);
      .fz(margin-top,-16);

      &::before {
        color: rgb(159, 159, 159);
      }
    }
  }
  .section1name{
    color: #8c8a8a;
  }
  .index-list {
    display: -ms-flex;
    display: -webkit-box;
    display: -ms-flexbox;
    /*display: flex;*/
    flex-wrap: wrap;
    -ms-flex-pack: distribute;
    justify-content: space-around;
    padding: 0vw 2vw 4vw 2vw;
    li {
      text-align: center;
      border-radius: 10px;
      background-color: #EEF2F7;
      width: 30%;
      padding: 1vw;
      color: #333;
      margin: 1.1vw;
      font-size: 4.2vw;
      -webkit-box-sizing: border-box;
      box-sizing: border-box;
      a,
      img {
        width: 100%;
        display: block;
      }
      p{
        padding-top: 1vw;
      }
    }
  }
  .my-indent-right-2 {
    /*font-size: 16px;*/
    /*color: #333;*/
    display: -webkit-box;
    display: -ms-flexbox;
    display: flex;
    -webkit-box-pack: justify;
    -ms-flex-pack: justify;
    justify-content: space-between;
    padding: 0 5vw;
    height: 10vw;
    line-height: 6vw;
    background-color: #fff;
    .bd();
    &:active {
      background-color: rgb(224, 227, 230)
    }
  }
  .link-top-1 {
    width: 98%;
    margin-left: -2vw;
    height: 1px;
    border-top: solid #E2DDDD 1.5px;
    margin-bottom: -15px;
    margin-top: 13px;
  }
  .section1-title {
    .bt();
    background-color: #ffffff;
    text-align: left;
    padding: 3vw 0;
    margin-top: 4vw;
    font-size: 16px;
    color: #333;
    position: relative;
    font-weight: 600;
    width: 92%;
    margin-left: 4%;
    i {
      position: absolute;
      right: 6vw;
      top: 50%;
      .fz(font-size, 36);
      .fz(margin-top,-16);

      &::before {
        color: rgb(159, 159, 159);
      }
    }
  }
  .car1 {
    width: 100%;
    /*overflow: auto;*/
    background-color: #f3f2f8;
    .header {
      width: 100%;
      height: 20vw;
      /*background: url(../../../static/carbg.png) center 0 #f37d0f;*/
      background-size: auto 100%;
      /*padding: 3.2vw 0;*/
      display: -webkit-box;
      display: -ms-flexbox;
      display: flex;
      -webkit-box-align: center;
      -ms-flex-align: center;
      align-items: center;
      .header-icon {
        border: .4vw solid #ffffff;
        background-color: @cl;
        margin-left: 4vw;
        -webkit-box-sizing: border-box;
        box-sizing: border-box;
        width: 14vw;
        height: 14vw;
        line-height: 16vw;
        text-align: center;
        border-radius: 50%;
        span {
          .fz(font-size, 54);
          &::before {
            color: #ffffff;
          }
        }
      }
      >span {
        margin-left: 3.2vw;
        .fz(font-size, 30);
        color: #ffffff;
        letter-spacing: .2vw;
      }
    }
    .main {
      width: 100%;
      .my-indent {
        width: 100%;
        display: block;
        -webkit-box-sizing: border-box;
        box-sizing: border-box;
        color: #333;
        display: -webkit-box;
        display: -ms-flexbox;
        display: flex;
        -webkit-box-pack: justify;
        -ms-flex-pack: justify;
        justify-content: space-between;
        padding: 0 5vw;
        height: 15vw;
        line-height: 15vw;
        background-color: #fff;
        .bd();
        &:active {
          background-color: rgb(224, 227, 230)
        }

        .my-indent-right {
          span {
            display: inline-block;
            .fz(font-size, 28);
            color: rgba(0, 0, 0, .4);
            position: relative;
          }
          i {
            position: relative;
            top: .8vw;
          }
        }
      }

      .my-pay {
        display: -webkit-box;
        display: -ms-flexbox;
        display: flex;
        width: 100%;
        padding: 2vw 0;
        background-color: #fff;
        .bd();

        >a {
          display: block;
          width: 33.33%;
          color: #999;
          text-align: center;

          >span {
            .fz(font-size, 50);
            margin-top: 2.3vw;
            display: block;
            text-align: center;
          }

          p {
            padding: 2.3vw 0;
            text-align: center;
          }
        }
      }

      .my-vip,.my-service,.my-settle {
        width: 100%;
        .mt();
        .bd();
        .bt();
        >a {
          background-color: #fff;
          display: block;
          width: 100%;
          display: -ms-flex;
          display: -webkit-box;
          display: -ms-flexbox;
          display: flex;
          height: 15vw;
          -webkit-box-align: center;
          -ms-flex-align: center;
          align-items: center;
          -webkit-box-pack: justify;
          -ms-flex-pack: justify;
          justify-content: space-between;
          padding: 0 6vw;
          -webkit-box-sizing: border-box;
          box-sizing: border-box;
          color: #333;
          &:active {
            background-color: rgb(224, 227, 230);
          }
          >div {
            -ms-flex: 2;
            -webkit-box-flex: 2;
            flex: 1.2;
            padding-top: 1.3vw;
          }

          .my-vip-top-div {
            padding-top: 0;
          }
          >p {
            -ms-flex: 10;
            -webkit-box-flex: 10;
            flex: 10;
            position: relative;
            font-size: 4.1vw;
            top: 0.7VW;
            &:active {
              background-color: rgb(224, 227, 230);
            }

            i {
              position: absolute;
              right: 0;
              top: 1.2vw;
            }
            samp {
              font-weight: 600;
              /*margin-left: 42vw;*/
              font-size: 4.5vw;
            }
          }
        }

      }
    }
  }
  /*图标大小不一，重新定义*/

  .icon-go {
    .fz(font-size, 36);
    &::before {
      color: #aba8a8;
    }
  }

  [class^="icon2-"],
  [class*=" icon2-"] {
    .fz(font-size, 50);
  }
  .link-top {
    width: 92%;
    margin-left: 4%;
    height: 1px;
    border-top: solid #E2DDDD 1.5px;
    margin-bottom: -15px;
    margin-top: 13px;
  }

  .icon2-service {
    .fz(font-size, 34);
  }
  .my-pay-2 {
    display: -webkit-box;
    display: -ms-flexbox;
    display: flex;
    width: 92%;
    margin-left: 4%;
    padding: 2vw 0;
    background-color: #fff;
    .bd();

    > a {
      display: block;
      width: 33.33%;
      color: #999;
      text-align: center;

      > span {
        font-size: 22px;
        margin-top: 2.3vw;
        display: block;
        text-align: center;
      }

      p {
        padding: 2.3vw 0;
        text-align: center;
      }
    }
  }
  .my-pay-21 {
    background-color: #fff;
    border-bottom-color: rgba(185, 185, 185, 0.14);
    border-bottom-style: solid;
    border-bottom-width: 1px;
    margin-top: 4vw;
    padding-top: 4vw;
    padding-bottom: 4vw;
    margin-left: 4vw;
    width: 92vw;
  }
</style>
