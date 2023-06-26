<template lang="html">

  <div class="car" style="height: 100%;font-size: 15px;">
    <mt-header title="个人中心">
      <div slot="left">
        <mt-button icon="back" @click="$router.go(-1)"></mt-button>
      </div>
    </mt-header>
    <header class="header"
            style="
              height: 80px;
    margin-top: 42px;
    background-color: #fff;
    border-bottom-color: rgba(185, 185, 185, 0.14);
    border-bottom-style: solid;
    border-bottom-width: 1px;"
    >
      <div @click="userInfo" class="header-icon" style="margin-left: 6vw;">
          <img v-if="imgUrl" style="width: 50px;height: 50px;border-radius: 100%;" :src="imgUrl">
<!--          <img v-if="form && !form.imgUrl" style="width: 50px;height: 50px;border-radius: 100%;" src="../../static/img/userimg5.jpg">-->
      </div>
      <span  @click="userInfo">{{
       form.userRealName ? form.userRealName : form.userAccount ? form.userAccount : '系统用户'
        }}</span>
      <div class="my-indent-right">
          <span style="
          margin-left: -10px;
    display: inline-block;
    font-size: 14px;
    color: rgba(0, 0, 0, 0.4);
    position: relative;">
            <el-button @click="comfirm(2)" style="    border: 1px solid #409EFF; color: #409EFF"
                       size="small" round>账户管理</el-button>
          </span>
      </div>

    </header>
    <div class="main">
      <router-link class="my-indent" :to="{ name: '订单'}">
        <span class="my-indent-left">我的订单</span>
        <div class="my-indent-right">
          <span>全部订单</span>
          <i class="icon-go"></i>
        </div>
      </router-link>

      <section class="my-pay">
        <router-link :to="{ path: '/order?status=3'}">
          <!--                  <span class="icon2-money"></span>-->
          <img
            :class="orderIofo.count3 > 0 ? 'count3' : ''"
            style="
                 margin-top: 7px;
    margin-bottom: -4px;
    width: 8.2vw;" src="../../static/img/order-3.png"></img>
          <i v-if="orderIofo.count3" class="danger-num">{{orderIofo.count3}}</i>
          <p style="color: #5e5e5e">待发货</p>
        </router-link>
        <router-link :to="{ path: '/order?status=4'}">
          <!--                  <span class="icon2-thecar"></span>-->
          <img
            :class="orderIofo.count4 > 0 ? 'count4' : ''"
            style=" margin-top: 5px;
    margin-bottom: -9px;
    width: 10.2vw;" src="../../static/img/order-4.png"></img>
          <i v-if="orderIofo.count4" style="margin-left: -14px" class="danger-num">{{orderIofo.count4}}</i>
          <p style="color: #5e5e5e">已发货</p>
        </router-link>
        <router-link :to="{ path: '/order?status=5'}">
          <!--                  <span class="icon2-thecar"></span>-->
          <img
            :class="orderIofo.count5 > 0 ? 'count5' : ''"
            style="margin-top: 7px;
    margin-bottom: -4px;
    width: 8.2vw;" src="../../static/img/order-5.png"></img>
          <i v-if="orderIofo.count5" style="margin-left: -10px" class="danger-num">{{orderIofo.count5}}</i>
          <p style="color: #5e5e5e">已揽件</p>
        </router-link>
        <router-link :to="{ path: '/order?status=6'}">
          <img
            :class="orderIofo.count6 > 0 ? 'count6' : ''"
            style="margin-top: 10px;
    margin-bottom: -3px;
    width: 7.2vw;" src="../../static/img/order-6.png"></img>
          <i v-if="orderIofo.count6" style="margin-left: -10px" class="danger-num">{{orderIofo.count6}}</i>
          <p style="color: #5e5e5e">已收货</p>
        </router-link>

      </section>
      <section class="my-settle">
        <router-link :to="{ name: '入库报表'}" class="my-settle-top">
          <div>
            <img style="width: 27px;margin-bottom: 10px;" src="../../static/img/putin1.png"></img>
          </div>

          <p>
            <span>入库报表</span><i class="icon-go"></i>
          </p>
        </router-link>
        <router-link :to="{ name: '入库渠道报表'}" class="my-settle-top">
          <div>
            <img style="width: 27px;margin-bottom: 10px;" src="../../static/img/channel5.png"></img>
          </div>

          <p>
            <span>入库渠道报表</span><i class="icon-go"></i>
          </p>
        </router-link>
        <router-link :to="{ name: '销售报表'}" class="my-settle-bottom">
          <div>
            <img style="width: 25px;margin-left: 2px;margin-bottom: 10px;" src="../../static/img/sell2.png"></img>
          </div>
          <p>
            <span>销售报表</span><i class="icon-go"></i>
          </p>
        </router-link>
        <router-link :to="{ name: '区域销售报表'}" class="my-settle-bottom">
          <div>
            <img style="width: 25px;margin-left: 2px;margin-bottom: 10px;" src="../../static/img/area6.png"></img>
          </div>
          <p>
            <span>区域销售报表</span><i class="icon-go"></i>
          </p>
        </router-link>
      </section>

      <section class="my-settle">
        <router-link :to="{ name: '活动'}" class="my-settle-top">
          <div>
            <img style="width: 29px;margin-bottom: 7px;" src="../../static/img/gift_1.png"></img>
          </div>

          <p>
            <span>活动</span><i class="icon-go"></i>
          </p>
        </router-link>
<!--        <router-link :to="{ name: '红包'}" class="my-settle-top">-->
<!--          <div>-->
<!--            <img style="width: 29px;margin-bottom: 7px;" src="../../static/img/gift_1.png"></img>-->
<!--          </div>-->

<!--          <p>-->
<!--            <span>红包</span><i class="icon-go"></i>-->
<!--          </p>-->
<!--        </router-link>-->
        <router-link :to="{ name: '其他收支'}" class="my-settle-top">
          <div>
            <img style="width: 29px;margin-bottom: 7px;" src="../../static/img/other1.png"></img>
          </div>

          <p>
            <span>其他收支</span><i class="icon-go"></i>
          </p>
        </router-link>
        <router-link :to="{ name: '瑕疵商品'}" class="my-settle-top">
          <div>
            <img style="    width: 33px;
    margin-bottom: 7px;
    margin-left: -2px;" src="../../static/img/xiaci1.png"></img>
          </div>

          <p>
            <span>瑕疵商品</span><i class="icon-go"></i>
          </p>
        </router-link>
<!--        <a @click="syncOldPriceToNew1()"  class="my-settle-bottom">-->
<!--          <div >-->
<!--            <img style="width: 29px;-->
<!--                  margin-bottom: 7px;" src="../../static/img/qrzj.png"></img>-->
<!--          </div>-->
<!--          <p>-->
<!--            <span>确认涨价</span><i class="icon-go"></i>-->
<!--          </p>-->
<!--        </a>-->
        <router-link :to="{ path: '/logout?type=1'}" class="my-settle-bottom">
          <div>
            <img style="width: 29px;
                  margin-bottom: 7px;" src="../../static/img/setting0.png"></img>
          </div>
          <p>
            <span>设置</span><i class="icon-go"></i>
          </p>
        </router-link>

      </section>
    </div>
    <v-baseline></v-baseline>
    <v-footer></v-footer>
  </div>
</template>

<script>
  // import * as mockData from '@/http/mock.js' //模拟数据
  import { goodsBaseApi } from '@/api/goodsBase'
  import {goodsOrderApi} from '@/api/goodsOrder'
  import Baseline from '@/common/_baseline.vue'
  import Footer from '@/common/_footer.vue'
  import { userContainerApi } from '@/api/user'

  export default {
    components: {
      'v-baseline': Baseline,
      'v-footer': Footer
    },
    data() {
      return {
        imgUrl: '',
        fileUrl: fileUrl,
        orderIofo: {},
        // userName: localStorage.getItem('user_name'),
        // userRealName: localStorage.getItem('userRealName')
        form: {
          userAccount: '',
          userMobile: '',
          userRealName: '',
          imgUrl: ''
        }
      }
    },

    created() {
      this.getUcUser()
      this.getData()
    },
    methods: {
      userInfo(){
        this.$router.push({ path: '/userInfo' })
      },
      comfirm(type){
        this.$router.push({ path: '/logout', query: { type } })
      },
      syncOldPriceToNew1() {
        goodsBaseApi.syncOldPriceToNew().then(res => {
          this.$toast(res.subMsg)
        })
      },
      getData() {
        goodsOrderApi.indexData().then(res => {
          if (res.subCode === 1000) {
            this.orderIofo = res.data ? res.data.countDto : {}
          } else {
            this.$toast(res.subMsg)
          }
        })
      },
      getUcUser() {
        userContainerApi.getUcUser().then(res => {
          if (res.subCode === 1000) {
            this.form = res.data ? res.data : {}
            if (this.form.imgUrl) {
              this.imgUrl = this.fileUrl + this.form.imgUrl
            }else{
              this.imgUrl = '../../static/img/userimg5.jpg'
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
  @import '../assets/user/icon/carstyle.css';

  * {
    /*margin: 0;*/
    /*padding: 0;*/
    box-sizing: border-box;
  }

  /* 这里直接设置 1rem = 50px begin */
  html {
    font-size: 10px;
  }

  /* 这里直接设置 1rem = 50px end */
  html,
  body {
    /*font-family: "微软雅黑";*/
    /*color: #333;*/
    /*background: #fff;*/
  }

  .car {
    width: 100%;
    padding-bottom: 14vw;
    background-color: #F8FCFF;
    border-top: 1vw solid #eee;
    .header {
      width: 100%;
      height: 16vw;
      /*background: url(../../static/carbg.png) center 0 #f37d0f;*/
      /*background: url(../../static/img/bg1.png) center 0 #f37d0f;*/
      background-size: auto 100%;
      padding: 3.2vw 0;
      display: -webkit-box;
      display: -ms-flexbox;
      display: flex;
      -webkit-box-align: center;
      -ms-flex-align: center;
      align-items: center;

      .header-icon {
        /*border: .4vw solid #ffffff;*/
        -webkit-box-sizing: border-box;
        box-sizing: border-box;
        /*width: 14vw;*/
        /*height: 14vw;*/
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

      > span {
        margin-left: 3.2vw;
        .fz(font-size, 30);
        color: #333;
        letter-spacing: .2vw;
        width: 50vw;
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

        > a {
          display: block;
          width: 33.33%;
          color: #999;
          text-align: center;

          > span {
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

      .my-vip, .my-service, .my-settle {
        width: 100%;
        .mt();
        .bd();
        .bt();

        > a {
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

          &:active {
            background-color: rgb(224, 227, 230);
          }

          > div {
            -ms-flex: 2;
            -webkit-box-flex: 2;
            flex: 2;
            padding-top: 1.3vw;
          }

          .my-vip-top-div {
            padding-top: 0;
          }

          > p {
            -ms-flex: 10;
            -webkit-box-flex: 10;
            flex: 10;
            position: relative;

            &:active {
              background-color: rgb(224, 227, 230);
            }

            i {
              position: absolute;
              right: 0;
              top: .4vw;
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

  .icon2-service {
    .fz(font-size, 34);
  }

  .danger-num {
    padding: 0px 6px;
    min-width: 11px;
    text-align: center;
    height: 12px;
    line-height: 12px;
    color: #fff;
    background-color: #409eff;
    font-size: 12px;
    top: 0;
    right: 0;
    border-radius: 8px;
    margin-left: -10px;
  }

  .count3 {
    margin-left: 16px;
  }

  .count4 {
    margin-left: 12px;
  }

  .count5 {
    margin-left: 10px;
  }

  .count6 {
    margin-left: 10px;
  }

</style>
