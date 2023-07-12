<template lang="html">
  <!-- 在首页父组件发送http请求,后将数据通过props传递给子组件,可减少请求次数,减少服务器压力 -->
  <div class="hello" ref="hello">
    <mt-header title="移动仓库">
    </mt-header>
    <!--    搜索开始-->
    <div class="fenlei_top">
      <div class="fenlei_top_left">
        <el-input
          clearable
          placeholder="请输入货号/商品名"
          prefix-icon="el-icon-search"
          v-model.trim="queryParamTop.actNo">
        </el-input>
      </div>
      <div class="fenlei_top_right" @click="scanCode(1)">
        <img src="../../static/img/photo_7.png" height="30px;" width="30px;">
      </div>
    </div>
<!--    待办事项-->
    <v-orderNum :orderIofo ="orderIofo" :storeData ="storeData"/>

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
        <el-date-picker style="width: 37vw;"
                        v-model="queryParam.createTimeFrom" :value-format="valueFormat"
                        :type="dateType"  placeholder="时间开始" @change="getData1">
        </el-date-picker>
        <span style="    font-size: 15px;margin-left: 1vw;">至</span>
        <el-date-picker style="width: 37vw;    margin-right: 8vw;"
                        v-model="queryParam.createTimeTo" :value-format="valueFormat"
                        :type="dateType" placeholder="时间结束" @change="getData1">
        </el-date-picker>
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

    <v-baseline/>
    <v-footer/>
  </div>
</template>

<script>
import orderNum from '@/components/index/orderNum.vue'
import Section1 from '@/components/index/section1.vue'
import Baseline from '@/common/_baseline.vue'
import Footer from '@/common/_footer.vue'
// import index from '@/http/mock.js' //模拟数据
import { goodsOrderApi } from '@/api/goodsOrder'

export default {
  components: {
    // 'v-header': Header,
    'v-orderNum': orderNum,
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
      datas: {
        section1:{},
        section2:{},
        section3:{},
        section4:{},
        swiper:[]
      },
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
  methods: {
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
</style>
