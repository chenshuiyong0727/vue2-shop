<template lang="html">
  <section class="section1">
    <h1 class="section1-title">
        仓库值
    </h1>
    <div style="background-color: #fff">
      <ve-pie height="320px"
        :data="chartData1" :settings="chartSettings1" ></ve-pie>
    </div>
    <ul class="section1-list" style="display: ">
      <li style="width: 47%" v-if="countDay > 0">
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
          <p class="color-danger">{{form.profitsAmount}}</p>
          <p class="section1name">利润总额</p>
        </router-link>
      </li>
      <li>
        <router-link :to="{name:'销售报表'}">
          <p class="color-danger">{{form.profitsAverage}}</p>
          <p class="section1name">平均利润</p>
        </router-link>
      </li>
      <li>
        <router-link :to="{name:'仓库'}">
          <p>{{form.inventoryCost}}</p>
          <p  class="section1name">库存成本</p>
        </router-link>
      </li>
      <li>
        <router-link :to="{name:'仓库'}">
          <p v-if="form.inventoryNum  && form.goodsPutInNum">{{form.inventoryRatio}}%</p>
          <p v-else> 0%</p>
          <p class="section1name">库存比例</p>
        </router-link>
      </li>
      <li>
        <router-link :to="{name:'商品基本信息'}">
          <p>{{form.goodsNum}}</p>
          <p class="section1name">商品款式</p>
        </router-link>
      </li>
      <li>
        <router-link :to="{name:'入库报表'}">
          <p>{{form.goodsPutInNum}}</p>
          <p class="section1name">入库商品</p>
        </router-link>
      </li>
      <li>
        <router-link :to="{name:'入库报表'}">
          <p>{{form.inventoryAmount}}</p>
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
          <p>{{form.orderAmount}}</p>
          <p class="section1name">成功总额</p>
        </router-link>
      </li>
      <li>
        <router-link :to="{ path: '/order?status=7'}">
          <p>{{form.freight}}</p>
          <p class="section1name">总运费</p>
        </router-link>
      </li>
      <li>
        <router-link :to="{ path: '/order?status=7'}">
          <p>{{form.poundage}}</p>
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
    countDay: {
      type: Number,
      default: 0
    },
    count: {
      type: String,
      default: ''
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
    text-align: center;
    padding: 2vw 0;
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

  .section1-list {
    display: -ms-flex;
    display: -webkit-box;
    display: -ms-flexbox;
    /*display: flex;*/
    flex-wrap: wrap;
    -ms-flex-pack: distribute;
    justify-content: space-around;
    padding: 2vw 2vw 4vw 2vw;
    li {
      /*border-style: groove;*/
      background-color: #EEF2F7;
      width: 22.5%;
      padding: 1.6vw;
      color: #333;
      margin: 1vw;
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

  .section1-banner {
    display: block;
    width: 100vw;
    img {
      width: 100%;
      height: 24vw;
    }
  }
}
  .section1name{
    color: black;
    /*font-weight: 600;*/
  }
</style>
