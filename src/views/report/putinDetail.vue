<template>
  <div class="hello">
    <mt-header :title="titleName">
      <div slot="left">
        <mt-button icon="back" @click="$router.go(-1)"></mt-button>
      </div>
    </mt-header>
<!--    <div class="fenlei_top zuoyouduiqi">-->
<!--      <div class="fenlei_top_left">-->
<!--        <el-date-picker style="width: 44vw ;background-color: white"-->
<!--                        popper-class="popperClass1"-->
<!--                        v-model="queryParam.createTimeFrom" value-format="yyyy-MM"-->
<!--                        type="month" placeholder="时间开始" @change="getPage">-->
<!--        </el-date-picker>-->
<!--      </div>-->
<!--      <div style="margin-right: 6px;margin-left: 6px;">-->
<!--        <span>至</span>-->
<!--      </div>-->
<!--      <div class="fenlei_top_left">-->
<!--        <el-date-picker style="width: 44vw"-->
<!--                        v-model="queryParam.createTimeTo" value-format="yyyy-MM"-->
<!--                        type="month" placeholder="时间结束" @change="getPage">-->
<!--        </el-date-picker>-->
<!--      </div>-->
<!--    </div>-->
    <div class="fenlei_top zuoyouduiqi">
      <div class="fenlei_top_left">
        <div  @click="chosseTime(1)">
          <el-date-picker style="width: 44vw" readonly="readonly"
                          v-model="queryParam.createTimeFrom"
                          value-format="yyyy-MM-dd" type="date"
                          placeholder="开始时间"></el-date-picker>
        </div>
      </div>
      <div style="margin-right: 6px;margin-left: 6px;">
        <span>至</span>
      </div>
      <div class="fenlei_top_left">
        <div  @click="chosseTime(2)">
          <el-date-picker style="width: 44vw" readonly="readonly"
                          v-model="queryParam.createTimeTo"
                          value-format="yyyy-MM-dd" type="date"
                          placeholder="结束时间"></el-date-picker>
        </div>
      </div>
    </div>
    <mt-datetime-picker
      v-model="pickerValue"
      type="date"
      ref="picker"
      :startDate="new Date(2022, 3, 1 )"
      year-format="{value} 年"
      month-format="{value} 月"
      date-format="{value} 日"
      @confirm="handleConfirm">
    </mt-datetime-picker>
    <div style="padding-top: 47px;">
      <div class="dingdans_item_rt" v-for="(item,index) in tableData" :key="index">
        <div class="dingdans_top_rt">
          <strong style="margin-left: 12px;">日期：</strong>
          <strong style="color: #409eff"
            @click="jumpDetail(item.months )"> {{item.months}} </strong>
        </div>
        <div class="dingdans_con_rt">
          <div  style="">
            <strong>
              {{item.successNum}}
            </strong>
            <p>入库数</p>
          </div>
          <div  style="">
            <strong>
              {{item.orderAmount}}
            </strong>
            <p>入库总额</p>
          </div>
          <div  >
            <strong>
              {{item.profits}}
            </strong>
            <p>已产生利润</p>
          </div>
          <div style="border-right-width: 0vw;">
            <strong>
              {{item.profitsAmount}}
            </strong>
            <p>市价总额</p>
          </div>
        </div>
        <div class="dingdans_con_rt">
          <div  >
            <strong v-if="item.successNum">
              {{item.orderAmount / item.successNum  | numFilter}}
            </strong>
            <strong v-else>
              0
            </strong>
            <p>入库均价</p>
          </div>
          <div  >
            <strong v-if="item.successNum">
              {{item.profitsAmount / item.successNum  | numFilter}}
            </strong>
            <strong v-else>
              0
            </strong>
            <p>市价均价</p>
          </div>
          <div  >
            <strong>
              {{item.inventory}}
            </strong>
            <p>剩余库存</p>
          </div>
          <div style="border-right-width: 0vw;">
            <strong>
              {{item.inventoryPrice}}
            </strong>
            <p>剩余总额</p>
          </div>
        </div>
        <div class="dingdans_con_rt">
          <div  >
            <strong>
              {{item.saleNum}}
            </strong>
            <p>已售数量</p>
          </div>
          <div  >
            <strong>
              {{item.theirPrice}}
            </strong>
            <p>出售金额</p>
          </div>
          <div  >
            <strong v-if="item.saleNum">
              {{item.profits / item.saleNum  | numFilter}}
            </strong>
            <strong v-else>0</strong>
            <p>利润均价</p>
          </div>
          <div style=" border-right-width: 0vw;">
            <strong>
              {{item.thisTimeProfits}}
            </strong>
            <p>预估利润</p>
          </div>
        </div>

      </div>
    </div>
    <div v-if="allLoaded" class="to-the-bottom-1" >
      <p>
        <img src="../../../static/img/new/empity_7.png" style="width: 60vw;">
      </p>
      <p>
        <span>暂无相关数据</span>
      </p>
    </div>
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
        pickerValue:new Date(),
        pickerValueType: '',
        allLoaded: false,
        months: '',
        titleName: '入库报表',
        emtityMsg: '没有更多了',
        queryParam: {
          createTimeFrom: '',
          createTimeTo: ''
        },
        tableData: [],
      }
    },
    mounted() {

    },
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
      chosseTime(pickerValueType) {
        this.pickerValueType = pickerValueType
        this.$refs.picker.open();
      },
      handleConfirm(val) {
        let year = new Date(val).getFullYear()
        let month = new Date(val).getMonth() + 1
        if (month < 10 ){
          month = '0' + month
        }
        let day = new Date(val).getDate()
        if (day < 10 ){
          day = '0' + day
        }
        let res = year + '-' +month + '-' + day
        if(this.pickerValueType == 1) {
          this.queryParam.createTimeFrom = res
        }else {
          this.queryParam.createTimeTo = res
        }
        this.getPage()
      },
      keyupSubmit() {
        document.onkeydown = (e) => {
          let _key = window.event.keyCode
          if (_key === 13) {
            this.getPage()
          }
        }
      },
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
        this.$router.push({ path: '/putinDayDetail', query: { months }})
      },
      getPage() {
        this.allLoaded = false
        reportApi.putInStorageDay(this.queryParam).then(res => {
          if (res.subCode === 1000) {
            this.tableData = res.data ? res.data : []
            if (this.tableData.length == 0) {
              this.emtityMsg = '暂无相关数据'
              this.allLoaded = true
            } else {
              this.emtityMsg = '没有更多了'
            }
          } else {
            this.$toast(res.subMsg)
          }
        })
      }
    }
  };
</script>

<style lang="less" scoped>
  @import '../../assets/index/rt_style.less';
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
    padding-left: 10px;
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
    background-color: #f3f2f8;
    padding-top: 12vw;
    font-size: 13px;
    height: 100vh;
    overflow-y: auto;
  }






</style>
