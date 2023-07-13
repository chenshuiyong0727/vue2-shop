<template>
  <div class="hello">
    <mt-header title="入库渠道报表">
      <div slot="left">
        <mt-button icon="back" @click="$router.go(-1)"></mt-button>
      </div>
    </mt-header>
    <div class="fenlei_top">
      <div class="fenlei_top_left">
        <el-date-picker style="width: 42vw"
                        v-model="queryParam.createTimeFrom" value-format="yyyy-MM-dd"
                        type="month" placeholder="时间开始" @change="getPage">
        </el-date-picker>
      </div>
      <div style="width: 8vw" class="fenlei_top_left">
        <span style="margin-right: 2vw;margin-left: 1vw;">至</span>
      </div>
      <div class="fenlei_top_left">
        <el-date-picker style="width: 42vw"
                        v-model="queryParam.createTimeTo" value-format="yyyy-MM-dd"
                        type="month" placeholder="时间结束" @change="getPage">
        </el-date-picker>
      </div>
<!--      <div class="fenlei_top_right">-->
<!--        <mt-button-->
<!--          type="primary"-->
<!--          size="small"-->
<!--          @click="getPage">搜索-->
<!--        </mt-button>-->
<!--      </div>-->
    </div>

    <div style="padding-top: 0.86rem">
      <div class="dingdans_item_rt" v-for="(item,index) in tableData" :key="index">
        <div class="dingdans_top_rt">
          <strong style="margin-left: 12px;"
            v-if="item.months == '合计'"> {{item.months}} </strong>
          <strong v-else style="margin-left: 12px;"> {{item.months | dictToDescTypeValue(47)  }} </strong>
<!--          <strong-->
<!--            @click="jumpDetail(item.months )"> {{item.months}} </strong>-->
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
          <div style="    border-right-width: 0vw;">
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
    <div v-if="!tableData.length" class="to-the-bottom-1" >
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
        allLoaded: false,
        titleName: '入库渠道报表',
        emtityMsg: '没有更多了',
        queryParam: {
          createTimeFrom: '',
          createTimeTo: ''
        },
        tableData: [],
      }
    },
    mounted() {
      this.getPage()
    },
    methods: {
      keyupSubmit() {
        document.onkeydown = (e) => {
          let _key = window.event.keyCode
          if (_key === 13) {
            this.getPage()
          }
        }
      },
      jumpDetail(months) {
        this.$router.push({ path: '/putinDetail', query: { months }})
      },
      getPage() {
        this.allLoaded = false
        reportApi.channelStorage(this.queryParam).then(res => {
          if (res.subCode === 1000) {
            this.tableData = res.data ? res.data : []
            if (this.tableData.length == 0) {
              this.emtityMsg = '暂无相关数据'
              this.allLoaded = false
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
