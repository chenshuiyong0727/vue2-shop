<template lang="html">
  <!-- 在首页父组件发送http请求,后将数据通过props传递给子组件,可减少请求次数,减少服务器压力 -->
  <div class="index">
    <mt-header title="首页">
    </mt-header>
<!--    <v-service :countDay="countDay" :count="count"/>-->
    <v-section1 :form="form" :countDay="countDay" :count="count":chartData1="chartData1" :chartSettings1="chartSettings1" />
<!--    <v-section2 :list="datas.section2.list" :banner='datas.section2.banner'/>-->
    <v-orderNum :orderIofo ="orderIofo"/>
    <div style="margin-top: 17px;border-left:1px solid #DCDFE6; background-color: #fff;    height: 390px;">
      <h1 class="index-title">
        销售走势
      </h1>
      <div style="
      margin-left: 2.5vw;
      display: flex;
    align-items: center;
    justify-content: space-between;
    width: 95vw;">
          <el-date-picker style="width: 35vw;"
                          v-model="queryParam.createTimeFrom" value-format="yyyy-MM-dd"
                          type="month" placeholder="时间开始">
          </el-date-picker>
          <span style="    font-size: 15px;margin-left: 1vw;">至</span>
          <el-date-picker style="width: 35vw"
                          v-model="queryParam.createTimeTo" value-format="yyyy-MM-dd"
                          type="month" placeholder="时间结束">
          </el-date-picker>
          <mt-button
            type="primary"
            size="small"
            @click="getData1">搜索</mt-button>
      </div>
      <ul class="index-list" >
        <li>
          <router-link :to="{name:'销售报表'}">
            <p class="color-danger"><strong>{{orderData.successNum}}</strong> </p>
            <p class="section1name" >本月订单总数</p>
            <p :class="orderData.successNumRate<0 ? 'color-success' : 'color-danger'" >{{orderData.successNumRate}} %</p>
            <p class="section1name" >同比上月</p>
          </router-link>
        </li>
        <li>
          <router-link :to="{name:'销售报表'}">
            <p class="color-danger"><strong>{{orderData.profitsAmount}}</strong> </p>
            <p class="section1name" >本月订单利润</p>
            <p :class="orderData.profitsAmountRate<0 ? 'color-success' : 'color-danger'" >{{orderData.profitsAmountRate}} %</p>
            <p class="section1name" >同比上月</p>
          </router-link>
        </li>
        <li>
          <router-link :to="{name:'销售报表'}">
            <p class="color-danger"><strong>{{orderData.orderAmount}}</strong> </p>
            <p class="section1name" >本月销售总额</p>
            <p :class="orderData.orderAmountRate<0 ? 'color-success' : 'color-danger'" >{{orderData.orderAmountRate}} %</p>
            <p class="section1name" >同比上月</p>
          </router-link>
        </li>
      </ul>

      <div style="margin-top: -40px;
    margin-bottom: -10px;">
        <ve-line
          height="250px"
          :data="chartData"
          :legend-visible="false"
          :loading="loading"
          :data-empty="dataEmpty"
          :settings="chartSettings"></ve-line>
      </div>
    </div>
    <v-baseline/>
    <v-footer/>
  </div>
</template>

<script>
// import Header from '@/components/index/header.vue'
import orderNum from '@/components/index/orderNum.vue'
// import Service from '@/components/index/service.vue'
import Section1 from '@/components/index/section1.vue'
// import Section2 from '@/components/index/section2.vue'
// import Section3 from '@/components/index/section3.vue'
// import Section4 from '@/components/index/section4.vue'
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
        createTimeFrom: '',
        createTimeTo: ''
      },
      createTime: '',
      chartSettings: {
        xAxisType: 'time',
        area: false,
        axisSite: { right: ['profitsAmount'] },
        labelAlias: {
          'successNum': '订单数',
          'orderAmount': '订单金额',
          'profitsAmount': '利润'
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
      loading: false,
      dataEmpty: false
    }
  },
  created(){
    this.initTime()
    this.time()
    this.getData()
    this.getData1()
    // this.getData()
    // this.getData1()
  },
  methods: {
    initTime() {
      let myDate = new Date().getTime()
      let endTime = '2024-02-10 00:00:00'
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
    getData1() {
      goodsOrderApi.indexOrderData(this.queryParam).then(res => {
        if (res.subCode === 1000) {
          this.dataEmpty = false
          this.loading = false
          this.chartData.rows = res.data.rows
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
          }
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
.index {
    width: 100%;
    padding-bottom: 14vw;
    background-color: #F8FCFF;
}
  .index-title {
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
    color: black;
  }
  .index-list {
    display: -ms-flex;
    display: -webkit-box;
    display: -ms-flexbox;
    /*display: flex;*/
    flex-wrap: wrap;
    -ms-flex-pack: distribute;
    justify-content: space-around;
    padding: 2vw 2vw 4vw 2vw;
    li {
      text-align: center;
      /*border-style: groove;*/
      background-color: #EEF2F7;
      width: 31%;
      padding: 1vw;
      color: #333;
      margin: 1.1vw;
      font-size: 4.5vw;
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
</style>
