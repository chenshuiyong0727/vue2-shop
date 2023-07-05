<template>
  <div class="hello">
    <mt-header :title="titleName">
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
      <div class="dingdans_item" v-for="(item,index) in tableData" :key="index">
        <div class="dingdans_top">
          <div class="dingdans_top_left">
<!--            <strong>渠道：</strong>-->
              <strong
                v-if="item.months == '合计'"> {{item.months}} </strong>
              <strong v-else> {{item.months | dictToDescTypeValue(47)  }} </strong>
          </div>
        </div>
        <div class="dingdans_con">
          <div class="diangdans_con_right">
            <div class="dingdans_con_right_top">
              入库数：<strong>{{item.successNum}}</strong>
              入库总额：<strong>{{item.orderAmount}}</strong>
              市价总额：<strong>{{item.profitsAmount}}</strong>
              <span v-if="item.successNum">入库均价：<strong>{{item.orderAmount / item.successNum  | numFilter}}</strong></span>
              <span v-else>入库均价：<strong>0</strong></span>
              <span v-if="item.successNum">市价均价：<strong>{{item.profitsAmount / item.successNum  | numFilter}}</strong></span>
              <span v-else>市价均价：<strong>0</strong></span>
              剩余库存：<strong>{{item.inventory}}</strong>
              剩余库存总额：<strong>{{item.inventoryPrice}}</strong>
              已售数量：<strong>{{item.saleNum}}</strong>
              出售金额：<strong>{{item.theirPrice}}</strong>
              已产生利润：<strong>{{item.profits}}</strong>
              利润均价：<strong>{{item.profits / item.saleNum  | numFilter}}</strong>
              预估利润：<strong>{{item.thisTimeProfits}}</strong>
            </div>
<!--            <div class="dingdans_con_right_down" style="margin-bottom: -2vw;">-->
<!--              <span v-if="item.successNum">入库均价：<strong>{{item.orderAmount / item.successNum  | numFilter}}</strong></span>-->
<!--              <span v-else>入库均价：<strong>0</strong></span>-->
<!--              <span v-if="item.successNum">市价均价：<strong>{{item.profitsAmount / item.successNum  | numFilter}}</strong></span>-->
<!--              <span v-else>市价均价：<strong>0</strong></span>-->
<!--              剩余库存：<strong>{{item.inventory}}</strong>-->
<!--            </div>-->
<!--            <div class="dingdans_con_right_down" style="margin-bottom: -2vw;">-->
<!--              剩余库存总额：<strong>{{item.inventoryPrice}}</strong>-->
<!--              已售数量：<strong>{{item.saleNum}}</strong>-->
<!--            </div>-->
<!--            <div class="dingdans_con_right_down" style="margin-bottom: -2vw;">-->
<!--              出售金额：<strong>{{item.theirPrice}}</strong>-->
<!--              产生利润：<strong>{{item.profits}}</strong>-->
<!--            </div>-->
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
        titleName: '入库渠道报表',
        emtityMsg: '人家是有底线的 -.-',
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
        reportApi.channelStorage(this.queryParam).then(res => {
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
