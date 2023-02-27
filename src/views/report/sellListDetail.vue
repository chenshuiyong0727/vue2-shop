<template>
  <div class="hello">
    <mt-header :title="titleName">
      <div slot="left">
        <mt-button icon="back" @click="$router.go(-1)"></mt-button>
      </div>
    </mt-header>
    <div class="fenlei_top">
      <div class="fenlei_top_left">
        <el-date-picker style="width: 35vw"
                        v-model="queryParam.createTimeFrom" value-format="yyyy-MM-dd"
                        type="date" placeholder="时间开始">
        </el-date-picker>
      </div>
      <div style="width: 8vw" class="fenlei_top_left">
        <span style="margin-left: 1vw;">至</span>
      </div>
      <div class="fenlei_top_left">
        <el-date-picker style="width: 35vw"
                        v-model="queryParam.createTimeTo" value-format="yyyy-MM-dd"
                        type="date" placeholder="时间结束">
        </el-date-picker>
      </div>
      <div class="fenlei_top_right">
        <mt-button
          type="primary"
          size="small"
          @click="getPage">搜索
        </mt-button>
      </div>
    </div>
    <div style="padding-top: 0.86rem">
      <div class="dingdans_item" v-for="(item,index) in tableData" :key="index">
        <div class="dingdans_top">
          <div class="dingdans_top_left">
            <strong>月份：</strong>
            <a>
              <strong
                @click="jumpDetail(item.months )"
                :style="item.months == '合计' ? '' : 'color: #409EFF;'"> {{item.months}} </strong>
            </a>
            <!--            <strong>月份：</strong> <strong class="color-danger"> {{item.months}} </strong>-->
          </div>
        </div>
        <div class="dingdans_con">
          <div class="diangdans_con_right">
            <div class="dingdans_con_right_top">
              销售数：<strong >{{item.successNum}}</strong>
              销售金额：<strong >{{item.orderAmount}}</strong>
              利润：<strong >{{item.profitsAmount}}</strong>
            </div>
            <div class="dingdans_con_right_down" style="margin-bottom: -2vw;">
              <span v-if="item.successNum">销售均价：<strong >{{item.orderAmount / item.successNum  | numFilter}}</strong></span>
              <span v-else>销售均价：<strong >0</strong></span>
              <span v-if="item.successNum">平均利润：<strong >{{item.profitsAmount / item.successNum  | numFilter}}</strong></span>
              <span v-else>平均利润：<strong >0</strong></span>
            </div>
          </div>
        </div>
      </div>
    </div>
    <p style="padding: 0.5rem 0;" class="to-the-bottom">{{emtityMsg}}</p>
  </div>
</template>
<script>
  import Baseline from '@/common/_baseline.vue'
  import Footer from '@/common/_footer.vue'
  import {reportApi} from '@/api/report'

  export default {
    components: {
      'v-baseline': Baseline,
      'v-footer': Footer
    },
    name: "HelloWorld",
    data() {
      return {
        months: '',
        titleName: '销售报表',
        emtityMsg: '人家是有底线的 -.-',
        queryParam: {
          createTimeFrom: '',
          createTimeTo: ''
        },
        tableData: [],
      }
    },
    // mounted() {
    //   this.getPage()
    // },
    created() {
      const { months } = this.$route.query
      this.months = months
      if (this.months) {
        this.titleName = this.months + ' ' + this.titleName
        this.months = this.months + '-01'
        let to = this.getNextMonth(this.months)
        this.queryParam.createTimeFrom = this.months
        this.queryParam.createTimeTo = to
        this.getPage()
      }
    },
    methods: {
      getNextMonth(date) {
        let arr = date.split('-')
        let year = arr[0] // 获取当前日期的年份
        let month = arr[1] // 获取当前日期的月份
        let day = arr[2] // 获取当前日期的日
        let year2 = year
        let month2 = parseInt(month) + 1
        if (month2 === 13) {
          year2 = parseInt(year2) + 1
          month2 = 1
        }
        let day2 = day
        let days2 = new Date(year2, month2, 0)
        days2 = days2.getDate()
        if (day2 > days2) {
          day2 = days2
        }
        if (month2 < 10) {
          month2 = '0' + month2
        }
        let m = year2 + '-' + month2 + '-' + day2
        return m
      },
      jumpDetail(months) {
        this.$router.push({ path: '/order', query: { months }})
      },
      getPage() {
        reportApi.sellListDay(this.queryParam).then(res => {
          if (res.subCode === 1000) {
            this.tableData = res.data ? res.data : []
            if (this.tableData.length == 0) {
              this.emtityMsg = '暂无相关数据 -.-'
            } else {
              this.emtityMsg = '人家是有底线的 -.-'
            }
          } else {
            this.$toast(res.subMsg)
          }
        })
      }
    }
  };
</script>

<style>

  @import '../../assets/index/style.css';

  strong {
    font-weight: 600;
  }

  .dingdans_item {
    padding: 2.4vw 1.2vw;
    background: #ffffff;
    border-bottom: 1vw solid #eee;
    padding-right: 3%;
    padding-left: 3%;
  }

  .dingdans_top {
    font-size: 3.68vw;
    height: 3.88vw;
    line-height: 3.88vw;
    display: flex;
    align-items: center;
    justify-content: space-between;
  }

  .dingdans_con {
    display: flex;
    align-items: center;
    justify-content: flex-start;
    padding: 1.3vw 0;
  }

  .dingdans_con_left {
    width: 35vw;
    height: 20vw;
    display: flex;
  }

  .dingdans_con_left img {
    width: 100%;
    margin: auto;
    border-radius: 10px;
  }

  .diangdans_con_right {
    width: 130vw;
    padding-left: 1.3vw;
  }

  .dingdans_con_right_down {
    margin-top: 1.4vw;
    font-size: 13px;
    margin-bottom: 2vw;
  }

  /*.dingdans_con_right_down_1 {*/
  /*  !*margin-left: 55vw;*!*/
  /*  margin-bottom: -7vw;*/
  /*  font-size: 3.5vw;*/
  /*  margin-top: -1vw;*/
  /*}*/
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
    background-color: #F8FCFF;
    padding-top: 12vw;
    font-size: 13px;
    height: 100vh;
    overflow-y: auto;
  }

  .fenlei_top {
    display: flex;
    align-items: center;
    justify-content: space-between;
    height: 0.88rem;
    padding: 0.1rem 0.2rem;
    width: 100vw;
    background: #eeeeee;
    position: fixed;
    top: 0;
    left: 0;
    z-index: 99;
    margin-top: 11.6vw;
    /*margin-top:0.85rem;*/
  }

  .fenlei_top_right {
    font-size: 0.32rem;
    color: #353535;
    width: 2rem;
    text-align: center;
  }

  .ins {
    writing-mode: horizontal-tb !important;
    font-style: ;
    font-variant-ligatures: ;
    font-variant-caps: ;
    font-variant-numeric: ;
    font-variant-east-asian: ;
    font-weight: ;
    font-stretch: ;
    font-size: ;
    font-family: ;
    text-rendering: auto;
    color: fieldtext;
    letter-spacing: normal;
    word-spacing: normal;
    line-height: normal;
    text-transform: none;
    text-indent: 0px;
    text-shadow: none;
    display: inline-block;
    text-align: start;
    appearance: auto;
    -webkit-rtl-ordering: logical;
    cursor: text;
    background-color: field;
    margin: 0em;
    padding: 1px 2px;
    border-width: 2px;
    border-style: inset;
    border-color: -internal-light-dark(rgb(118, 118, 118), rgb(133, 133, 133));
    border-image: initial;
    border: 0;
    outline: none;
    width: 76vw;
    /*width: 5.7rem;*/
    padding: 0.2rem;

  }
</style>
