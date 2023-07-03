<template lang="html">
  <section class="section1" style="padding-top: 0vw;
    width: 92vw;
    margin-left: 4vw;">
    <h1 class="section1-title"  style="border-top-style:none">
      <span style="    margin-left: 20px;">仓库值
      </span>
    </h1>
    <div style="background-color: #fff">
      <ve-pie height="320px"
        :data="chartData1" :settings="chartSettings1" ></ve-pie>
    </div>
    <ul class="section1-list" style="
    display: -webkit-box;
    flex-wrap: wrap;
    padding-top: 0vw;
    padding-right: 1vw;
    padding-bottom: 0vw;
    padding-left: 1vw;
">
      <li style="width: 47.6%"  @click="chunjie">
        <router-link :to="{name:''}">
          <p><strong class="color-danger"> {{countDay}}</strong>{{count}}</p>
          <p class="section1name">春节倒计时</p>
        </router-link>
      </li>
      <li>
        <router-link :to="{name:'仓库'}">
          <p class="color-danger">{{form.inventoryNum}}</p>
          <p class="section1name" >库存总数</p>
        </router-link>
      </li>
      <li>
        <router-link :to="{name:'销售报表'}">
          <p class="color-danger">{{form.profitsAmount | numFilterTo0}}</p>
          <p class="section1name">利润总额</p>
        </router-link>
      </li>
    </ul>
    <ul class="section1-list" style="
    padding-top: 0vw;
    padding-right: 1vw;
    padding-bottom: 0vw;
    padding-left: 1vw;">
    <li>
        <router-link :to="{name:'销售报表'}">
          <p class="color-danger">{{form.profitsAverage}}</p>
          <p class="section1name">平均利润</p>
        </router-link>
      </li>
      <li>
        <router-link :to="{name:'仓库'}">
          <p class="color-danger">{{form.inventoryCost | numFilterTo0}}</p>
          <p  class="section1name">库存成本</p>
        </router-link>
      </li>
      <li>
        <router-link :to="{name:'仓库'}">
          <p class="color-danger" v-if="form.inventoryNum  && form.goodsPutInNum">{{form.inventoryRatio}}%</p>
          <p v-else> 0%</p>
          <p  class="section1name">库存比例</p>
        </router-link>
      </li>
      <li>
        <router-link :to="{name:'商品'}">
          <p class="color-danger">{{form.goodsNum}}</p>
          <p class="section1name">商品款式</p>
        </router-link>
      </li>
    </ul>
    <ul class="section1-list" style="
    display: -webkit-box;
    flex-wrap: wrap;
    padding: 0vw 1vw;">
      <li>
        <router-link :to="{ path: '/store?warehouseId=2'}">
          <p class="color-danger">{{form.ytInventory | numFilterTo0}}</p>
          <p class="section1name">云头库存</p>
        </router-link>
      </li>
      <li>
        <router-link :to="{ path: '/store?warehouseId=2'}">
          <p class="color-danger">{{form.ytAmount}}</p>
          <p class="section1name">云头货值</p>
        </router-link>
      </li>
      <li>
        <router-link :to="{ path: '/store?warehouseId=1'}">
          <p class="color-danger">{{form.qpInventory }}</p>
          <p class="section1name">前埔库存</p>
        </router-link>
      </li>
      <li>
        <router-link :to="{ path: '/store?warehouseId=1'}">
          <p class="color-danger">{{form.qpAmount | numFilterTo0}}</p>
          <p class="section1name">前埔货值</p>
        </router-link>
      </li>
    </ul>
    <ul class="section1-list" style="
    display: -webkit-box;
    flex-wrap: wrap;
    padding: 0vw 1vw;">
      <li>
        <router-link :to="{name:'入库报表'}">
          <p>{{form.goodsPutInNum}}</p>
          <p class="section1name">入库商品</p>
        </router-link>
      </li>
      <li>
        <router-link :to="{name:'入库报表'}">
          <p>{{form.inventoryAmount | numFilterTo0}}</p>
          <p class="section1name">入库总额</p>
        </router-link>
      </li>
      <li>
        <router-link :to="{name:'销售报表'}">
          <p>{{form.successNum}}</p>
          <p class="section1name">交易成功</p>
        </router-link>
      </li>
      <li>
        <router-link :to="{name:'销售报表'}">
          <p>{{form.orderAmount | numFilterTo0}}</p>
          <p class="section1name">成功总额</p>
        </router-link>
      </li>
    </ul>
    <ul class="section1-list" style="
    display: -webkit-box;
    flex-wrap: wrap;
    padding: 0vw 1vw;">
      <li>
        <router-link :to="{ path: '/order?status=7'}">
          <p>{{form.freight |numFilterTo0}}</p>
          <p class="section1name">总运费</p>
        </router-link>
      </li>
      <li>
        <router-link :to="{ path: '/order?status=7'}">
          <p>{{form.poundage | numFilterTo0}}</p>
          <p class="section1name">手续费</p>
        </router-link>
      </li>
      <li>
        <router-link :to="{name:'其他收支'}">
          <p>{{form.otherRevenue}}</p>
          <p class="section1name">其他收支</p>
        </router-link>
      </li>
      <li>
        <router-link :to="{name:'入库报表'}">
          <p>{{form.inboundAverage}}</p>
          <p class="section1name">库存均价</p>
        </router-link>
      </li>
    </ul>
    <ul class="section1-list" style="
    display: -webkit-box;
    flex-wrap: wrap;
    padding: 0vw 1vw;">
      <li>
        <router-link :to="{name:'销售报表'}">
          <p>{{form.orderAmountAverage}}</p>
          <p class="section1name">成功均价</p>
        </router-link>
      </li>
      <li>
        <router-link :to="{ path: '/order?status=7'}">
          <p>{{form.freightAverage}}</p>
          <p class="section1name">运费均价</p>
        </router-link>
      </li>
      <li>
        <router-link :to="{ path: '/order?status=7'}">
          <p>{{form.costAverage}}</p>
          <p class="section1name">成本均价</p>
        </router-link>
      </li>
      <li>
        <router-link :to="{ path: '/order?status=7'}">
          <p>{{form.profitsProportion}}%</p>
          <p class="section1name">利润比例</p>
        </router-link>
      </li>
    </ul>
    <ul class="section1-list" style="
    display: -webkit-box;
    flex-wrap: wrap;
    padding: 0vw 1vw;
    padding-bottom: 5vw;
    ">
      <li>
        <router-link :to="{name:'瑕疵商品'}">
          <p>{{form.defectsNum}}</p>
          <p class="section1name">瑕疵数</p>
        </router-link>
      </li>
      <li>
        <router-link :to="{ name:'销售报表'}">
          <p>{{form.passRatio}} % </p>
          <p class="section1name">通过比例</p>
        </router-link>
      </li>
      <li>
        <router-link :to="{  path: '/order?saleType=2'}">
          <p>{{orderIofo.countSd}}</p>
          <p class="section1name">闪电直发</p>
        </router-link>
      </li>
      <li>
        <router-link :to="{  path: '/order?status=11'}">
          <p>{{orderIofo.count11}}</p>
          <p class="section1name">寄售入库</p>
        </router-link>
      </li>
    </ul>
<!--  <router-link :to="{ name: '详情页'}"  class="section1-banner">-->
<!--    <img v-lazy="banner">-->
<!--  </router-link>-->
  </section>
</template>

<script>
import { Lazyload } from 'mint-ui';

export default {
  props: {
    chartSettings1: {
      type: Object,
      default: {}
    },
    chartData1: {
      type: Object,
      default: {}
    },
    form: {
      type: Object,
      default: {}
    },
    orderIofo: {
      type: Object,
      default: {}
    },
    countDay: {
      type: Number,
      default: 0
    },
    count: {
      type: String,
      default: ''
    }
  },
  methods:{
    chunjie(){
      var url = 'http://www.093700.com/chunjie.html'
      window.location.href = url
    }
  }
}

</script>

<style lang="less" scoped>
@import "../../assets/fz.less";
@import "../../assets/index/style.css";
.section1 {
  .pt();
  .section1-title {
    .bt();
    background-color: #ffffff;
    text-align: left;
    padding: 3vw 0;
    margin-top: 4vw;
    font-size: 16px;
    color: #333;
    position: relative;
    /*margin-left: 20px;*/
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

  .section1-list {
    display: -ms-flex;
    display: -webkit-box;
    display: -ms-flexbox;
    flex-wrap: wrap;
    -ms-flex-pack: distribute;
    justify-content: space-around;
    padding: 2vw 2vw 4vw 2vw;
    li {
      border-radius: 10px;
      background-color: #EEF2F7;
      width: 22.7%;
      padding: 1.6vw;
      color: #333;
      margin: 1vw;
      font-size: 15px;
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

  .section1-banner {
    display: block;
    width: 100vw;
    img {
      width: 100%;
      height: 24vw;
    }
  }
  padding-top: 6vw
}
  .section1name{
    color: black;
    /*font-weight: 600;*/
  }
</style>
