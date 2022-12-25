<template lang="html">
  <!-- 在首页父组件发送http请求,后将数据通过props传递给子组件,可减少请求次数,减少服务器压力 -->
  <div class="index">
    <mt-header title="首页">
<!--      <router-link :to="{name:''}" slot="right">-->
<!--        <mt-button icon="search"></mt-button>-->
<!--      </router-link>-->
    </mt-header>
<!--    <v-header/>-->
<!--    <v-swiper :swiperData="datas.swiper"/>-->
    <v-service :countDay="countDay" :count="count"/>
    <v-section1 :list="datas.section1.list" :banner='datas.section1.banner'/>
    <v-section2 :list="datas.section2.list" :banner='datas.section2.banner'/>
    <v-section3/>
    <v-section4 :list="datas.section4.list" :banner='datas.section4.banner'/>
    <v-baseline/>
    <v-footer/>
  </div>
</template>

<script>
import Header from '@/components/index/header.vue'
import Swiper from '@/components/index/swiper.vue'
import Service from '@/components/index/service.vue'
import Section1 from '@/components/index/section1.vue'
import Section2 from '@/components/index/section2.vue'
import Section3 from '@/components/index/section3.vue'
import Section4 from '@/components/index/section4.vue'
import Baseline from '@/common/_baseline.vue'
import Footer from '@/common/_footer.vue'
import index from '@/http/mock.js' //模拟数据
import { goodsOrderApi } from '@/api/goodsOrder'

export default {
  components: {
    'v-header': Header,
    'v-swiper': Swiper,
    'v-service': Service,
    'v-section1': Section1,
    'v-section2': Section2,
    'v-section3': Section3,
    'v-section4': Section4,
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
      countDay: '0', // 倒计时
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
  beforeCreate() {
    this.$api({
      method: 'post',
      url: '/index'
    }).then((response) => {
      this.datas = response.data;
    }).catch(function(error) {
      console.info(error)
    })
  },

  created(){
    this.initTime()
    this.time()
    this.getData()
  },
  methods: {
    initTime() {
      let myDate = new Date().getTime()
      let endTime = '2023-01-22 00:00:00'
      let timestamp2 = Date.parse(new Date(endTime))
      this.seconds = (timestamp2 - myDate) / 1000
    },
    countDown() {
      let d = parseInt(this.seconds / (24 * 60 * 60))
      d = d < 10 ? '0' + d : d
      let h = parseInt(this.seconds / (60 * 60) % 24);
      h = h < 10 ? '0' + h : h
      let m = parseInt(this.seconds / 60 % 60);
      m = m < 10 ? '0' + m : m
      let s = parseInt(this.seconds % 60);
      s = s < 10 ? '0' + s : s
      this.count = '天 ' + h + '时' + m + '分' + s + '秒'
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
        } else {
          this.$message.error(res.subMsg)
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
          this.$message.error(res.subMsg)
        }
      })
    },
  }
}
</script>


<style lang="less" scoped>
  @import '../assets/fz.less';
  @import '../assets/index/style.css';
  .mint-header {
    padding: 6.8vw 4.8vw;
    background-color: #fff;
    color: #333!important;
    .fz(font-size, 40)!important;
  }
.index {
    width: 100%;
    padding-bottom: 14vw;
    background-color: #F8FCFF;
}
</style>
