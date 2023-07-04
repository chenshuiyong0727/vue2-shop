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
            <el-button @click="comfirm(2)" style="    border: 1px solid #333; color: #333"
                       size="small" round>账户管理</el-button>
          </span>
      </div>

    </header>
    <div class="main">
      <router-link class="my-indent" style="    margin-bottom: -10px;" :to="{ name: '订单'}">
        <span class="my-indent-left">订单</span>
        <div class="my-indent-right">
          <span style="font-weight: 500">全部</span>
          <i class="icon-go"></i>
        </div>
      </router-link>

      <section class="my-pay">
        <router-link :to="{ path: '/order?status=3'}">
          <!--                  <span class="icon2-money"></span>-->
          <img
            :class="orderIofo.count3 > 0 ? 'count3' : ''"
            style="margin-top: 10px;
    margin-bottom: -5px;
    width: 28px;" src="../../static/img/new/daifahuo.png"></img>
          <i v-if="orderIofo.count3" class="danger-num">{{orderIofo.count3}}</i>
          <p style="color: #333">待发货</p>
        </router-link>
        <router-link :to="{ path: '/order?status=4'}">
          <!--                  <span class="icon2-thecar"></span>-->
          <img
            :class="orderIofo.count4 > 0 ? 'count3' : ''"
            style="margin-top: 10px;
    margin-bottom: -5px;
    width: 28px;"
            src="../../static/img/new/fahuo.png"></img>
          <i v-if="orderIofo.count4" style="margin-left: -14px" class="danger-num">{{orderIofo.count4}}</i>
          <p style="color: #333">已发货</p>
        </router-link>
        <router-link :to="{ path: '/order?status=5'}">
          <!--                  <span class="icon2-thecar"></span>-->
          <img
            style="margin-top: 10px;
    margin-bottom: -5px;
    width: 28px;"
            :class="orderIofo.count5 > 0 ? 'count3' : ''"
            src="../../static/img/new/yilanjian.png"></img>
          <i v-if="orderIofo.count5" style="margin-left: -10px" class="danger-num">{{orderIofo.count5}}</i>
          <p style="color: #333">运输中</p>
        </router-link>
        <router-link :to="{ path: '/order?status=6'}">
          <img
            style="margin-top: 10px;
    margin-bottom: -5px;
    width: 28px;"
            :class="orderIofo.count6 > 0 ? 'count3' : ''"
            src="../../static/img/new/yishouhuo.png"></img>
          <i v-if="orderIofo.count6" style="margin-left: -10px" class="danger-num">{{orderIofo.count6}}</i>
          <p style="color: #333">已收货</p>
        </router-link>

      </section>

      <div class="my-indent" style="    margin-bottom: -10px;">
        <span class="my-indent-left">报表</span>
      </div>
      <section class="my-settle1" style="margin-top: 0;border-top-style:none">
        <router-link :to="{ name: '入库报表'}" class="my-settle1-top">
          <div>
            <img style="width: 27px;margin-bottom: 10px;" src="../../static/img/new/ruku.png"></img>
          </div>

          <p>
            <span style="color: #333">入库报表</span><i class="icon-go"></i>
          </p>
        </router-link>
        <router-link :to="{ name: '入库渠道报表'}" class="my-settle1-top">
          <div>
            <img style="width: 27px;margin-bottom: 10px;" src="../../static/img/new/qudao.png"></img>
          </div>

          <p>
            <span style="color: #333">入库渠道报表</span><i class="icon-go"></i>
          </p>
        </router-link>
        <router-link :to="{ name: '销售报表'}" class="my-settle1-bottom">
          <div>
            <img style="width: 27px;margin-bottom: 10px;" src="../../static/img/new/xiaoshou.png"></img>
          </div>
          <p>
            <span style="color: #333">销售报表</span><i class="icon-go"></i>
          </p>
        </router-link>
        <router-link :to="{ name: '区域销售报表'}" class="my-settle1-bottom">
          <div>
            <img style="width: 27px;margin-bottom: 10px;" src="../../static/img/new/quyu.png"></img>
          </div>
          <p>
            <span style="color: #333">区域销售报表</span><i class="icon-go"></i>
          </p>
        </router-link>
      </section>
      <div class="my-indent" style="    margin-bottom: -10px;">
        <span class="my-indent-left">服务</span>
        <!--        <div class="my-indent-right">-->
        <!--          <span>全部订单</span>-->
        <!--          <i class="icon-go"></i>-->
        <!--        </div>-->
      </div>
      <section class="my-pay-1" style="border-bottom-style:none">
        <router-link :to="{ name: '活动'}">
          <!--                  <span class="icon2-money"></span>-->
          <img
            style="margin-top: 7px;margin-bottom: -4px;width: 27px;"
            src="../../static/img/new/huodong.png"></img>
          <p style="color: #333">活动</p>
        </router-link>
        <router-link :to="{ name: '其他收支'}">
          <!--                  <span class="icon2-thecar"></span>-->
          <img
            style="margin-top: 7px;margin-bottom: -4px;width: 27px;"
            src="../../static/img/new/qita.png"></img>
          <p style="color: #333">其他收支</p>
        </router-link>
        <router-link :to="{ name: '瑕疵商品'}">
          <!--                  <span class="icon2-thecar"></span>-->
          <img
            style="    margin-top: 4px;
    margin-bottom: -7px;
    width: 35px;" src="../../static/img/new/xiaci.png"></img>
          <p style="color: #333">瑕疵商品</p>
        </router-link>
        <router-link :to="{ name: '红包'}">
          <img
            style="margin-top: 7px;margin-bottom: -4px;width: 27px;"
            src="../../static/img/new/hongbao.png"></img>
          <p style="color: #333">红包</p>
        </router-link>
      </section>
      <section class="my-pay-1">
        <router-link :to="{ path: '/logout?type=1'}" style="width: 25%">
          <img
            style="margin-top: 7px;margin-bottom: -4px;width: 27px;"
            src="../../static/img/setting0.png"></img>
          <p style="color: #333">设置</p>
        </router-link>
      </section>
    </div>
    <v-baseline/>
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
    background-color: #EFF3F6;
  }

  .car {
    width: 100%;
    padding-bottom: 14vw;
    background-color: #EFF3F6;
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
      width: 92vw;
      margin-left: 4vw;
      height: 100%;
      margin-bottom: 50px;
      background-color: #EFF3F6;
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
        margin-top: 10px;
        font-weight: 600;
        //.bd();

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

      .my-vip, .my-service, .my-settle1 {
        width: 100%;
        .mt();
        .bd();
        .bt();
        color: #333;
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
    margin-left: 12px;
  }

  /*.count4 {*/
  /*  margin-left: 12px;*/
  /*}*/

  /*.count5 {*/
  /*  margin-left: 10px;*/
  /*}*/

  /*.count6 {*/
  /*  margin-left: 10px;*/
  /*}*/
  .my-pay-1 {
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
</style>
