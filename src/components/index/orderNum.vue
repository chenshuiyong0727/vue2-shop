<template lang="html">

  <div class="car1" style="  padding-top: 28px;">
    <div class="main">
      <section class="my-pay-2" style="border-bottom-style:none;
         padding-top: 6vw;
         border-bottom-style: none; margin-left: 0;width: 100vw;">
        <router-link :to="{ path: '/store'}">
          <span style="    margin-top: -3px;">
             <img
               style="margin-top: 11px;
    margin-bottom: -3px;
    width: 28px;" src="../../../static/img/goods-1.png"></img>
          </span>
          <p style="color: #333;font-size: 14px;    margin-top: 1px;">库存管理</p>
        </router-link>
        <img style="    margin-left: 10px;
    height: 55px;
    margin-top: 10px;" src="../../../static/img/more-1.png">
        <router-link :to="{ path: '/store?today=7'}">
          <span :class="storeData.upCout > 0 ? 'color-danger-strong' : 'color-font'">{{storeData.upCout}}</span>
          <p style="color: #8c8a8a;font-size: 14px;">变更</p>
        </router-link>
        <router-link :to="{ path: '/store?today=2'}">
          <span :class="storeData.successNumLast > 0 ? 'color-danger-strong' : 'color-font'">{{storeData.successNumLast}}</span>
          <p style="color: #8c8a8a;font-size: 14px;">待上架</p>
        </router-link>
        <router-link :to="{ path: '/store?today=3'}">
          <span :class="storeData.waitMoveCout > 0 ? 'color-danger-strong' : 'color-font'">{{storeData.waitMoveCout}}</span>
          <p style="color: #8c8a8a;font-size: 14px;">待移库</p>
        </router-link>
      </section>
      <h1 class="section1-title" style="border-top-style:none">
      <span style="    margin-left: 20px;">
        订单管理
      </span>
        <div class="link-top"></div>
      </h1>
      <section class="my-pay-2" style="border-bottom-style:none;">
        <router-link :to="{ path: '/order?status=3'}">
          <span :class="orderIofo.count3 > 0 ? 'color-danger-strong' : 'color-font'">{{orderIofo.count3}}</span>
          <p style="color: #8c8a8a;font-size: 14px;">待发货</p>
        </router-link>
        <router-link :to="{ path: '/order?status=4'}">
          <span :class="orderIofo.count4 > 0 ? 'color-danger-strong' : 'color-font'">{{orderIofo.count4}}</span>
          <p style="color: #8c8a8a;font-size: 14px;">已发货</p>
        </router-link>
        <router-link :to="{ path: '/order?status=5'}">
          <span :class="orderIofo.count5 > 0 ? 'color-danger-strong' : 'color-font'">{{orderIofo.count5}}</span>
          <p style="color: #8c8a8a;font-size: 14px;">运输中</p>
        </router-link>
        <router-link :to="{ path: '/order?status=6'}">
          <span :class="orderIofo.count6 > 0 ? 'color-danger-strong' : 'color-font'">{{orderIofo.count6}}</span>
          <p style="color: #8c8a8a;font-size: 14px;">已收货</p>
        </router-link>
      </section>
      <section class="my-pay-2" style="border-bottom-style:none;">
        <router-link :to="{ path: '/order?status=11&scrollNum=4'}">
          <span class="color-font">{{orderIofo.count11}}</span>
          <p style="color: #8c8a8a;font-size: 14px;">已入库</p>
        </router-link>
        <router-link :to="{ path: '/order?status=2&scrollNum=7'}">
          <span class="color-font">{{orderIofo.count2}}</span>
          <p style="color: #8c8a8a;font-size: 14px;">已上架</p>
        </router-link>
        <router-link :to="{ path: '/order?status=7&scrollNum=7'}">
          <span class="color-font">{{orderIofo.count7}}</span>
          <p style="color: #8c8a8a;font-size: 14px;">交易成功</p>
        </router-link>
        <router-link :to="{ path: '/order?status=8&scrollNum=7'}">
          <span class="color-font">{{orderIofo.count8}}</span>
          <p style="color: #8c8a8a;font-size: 14px;">瑕疵</p>
        </router-link>
      </section >
        <section  @click="order(1,6)" class="my-pay-21" v-if="orderIofo.countTheExpire">
          <div style="width: 78vw ;display:flex;
flex-direction:row;
align-items:center;">
            <img style="width: 30px;margin-left: 4vw; "  src="../../../static/img/timeout_2.png">
            <span style="color: #333;font-size: 15px;margin-left: 10px">即将到期订单</span>
          </div>
          <div style="display:flex;
flex-direction:row;
align-items:center;">
            <span class="color-font-strong" style="font-size: 25px;">{{orderIofo.countTheExpire}}</span>
            <img style="width: 20px;" src="../../../static/img/more.png">
          </div>
        </section>
    </div>
  </div>
</template>

<script>
  export default {
    props: {
      orderIofo: {
        type: Object,
        default: {}
      },
      storeData: {
        type: Object,
        default: {}
      }
    },
    components: {
    },
    methods:{
      order(theExpire,scrollNum) {
        this.$router.push({ path: '/order', query: { theExpire,scrollNum }})
      },
    }
  }
</script>

<style lang="less" scoped>
  @import '../../assets/fz.less';
  @import '../../assets/index/style.css';
  @import '../../assets/user/icon/carstyle.css';
  /* 这里直接设置 1rem = 50px begin */
  html {
    font-size: 10px;
  }
  /* 这里直接设置 1rem = 50px end */
  html,
  .section1-title {
    .bt();
    background-color: #ffffff;
    text-align: left;
    padding: 3vw 0;
    margin-top: 4vw;
    font-size: 16px;
    color: #333;
    position: relative;
    font-weight: 600;
    width: 92%;
    margin-left: 4%;
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
  .car1 {
    width: 100%;
    /*background-color: #6ae9ff;*/
    background-color: #f3f2f8;
    .header {
      width: 100%;
      height: 16vw;
      /*background: url(../../../static/carbg.png) center 0 #f37d0f;*/
      background-size: auto 100%;
      padding: 3.2vw 0;
      display: -webkit-box;
      display: -ms-flexbox;
      display: flex;
      -webkit-box-align: center;
      -ms-flex-align: center;
      align-items: center;
      .header-icon {
        border: .4vw solid #ffffff;
        background-color: @cl;
        margin-left: 4vw;
        -webkit-box-sizing: border-box;
        box-sizing: border-box;
        width: 14vw;
        height: 14vw;
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
      >span {
        margin-left: 3.2vw;
        .fz(font-size, 30);
        color: #ffffff;
        letter-spacing: .2vw;
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

        >a {
          display: block;
          width: 33.33%;
          color: #999;
          text-align: center;

          >span {
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

      .my-vip,.my-service,.my-settle {
        width: 100%;
        .mt();
        .bd();
        .bt();
        >a {
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
          color: #333;
          &:active {
            background-color: rgb(224, 227, 230);
          }
          >div {
            -ms-flex: 2;
            -webkit-box-flex: 2;
            flex: 1.2;
            padding-top: 1.3vw;
          }

          .my-vip-top-div {
            padding-top: 0;
          }
          >p {
            -ms-flex: 10;
            -webkit-box-flex: 10;
            flex: 10;
            position: relative;
            font-size: 4.1vw;
            top: 0.7VW;
            &:active {
              background-color: rgb(224, 227, 230);
            }

            i {
              position: absolute;
              right: 0;
              top: 1.2vw;
            }
            samp {
              font-weight: 600;
              /*margin-left: 42vw;*/
              font-size: 4.5vw;
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
  .link-top {
    width: 92%;
    margin-left: 4%;
    height: 1px;
    border-top: solid #E2DDDD 1.5px;
    margin-bottom: -15px;
    margin-top: 13px;
  }

  .icon2-service {
    .fz(font-size, 34);
  }
  .my-pay-2 {
    display: -webkit-box;
    display: -ms-flexbox;
    display: flex;
    width: 92%;
    margin-left: 4%;
    padding: 2vw 0;
    background-color: #fff;
    .bd();

    > a {
      display: block;
      width: 33.33%;
      color: #999;
      text-align: center;

      > span {
        font-size: 22px;
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
  .my-pay-21 {
    display: -webkit-box;
    display: -ms-flexbox;
    display: flex;
    background-color: #fff;
    border-bottom-color: rgba(185, 185, 185, 0.14);
    border-bottom-style: solid;
    border-bottom-width: 1px;
    margin-top: 4vw;
    padding-top: 4vw;
    padding-bottom: 4vw;
    margin-left: 4vw;
    width: 92vw;
  }
</style>
