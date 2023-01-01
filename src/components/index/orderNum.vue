<template lang="html">

  <div class="car">
    <div class="main">
      <h1 class="section1-title">
        待处理事务
      </h1>
      <section class="my-vip" style="margin-top: 0">
        <router-link class="my-vip-bottom ho" :to="{ path: '/order?status=2'}">
          <div>
            <img style="width: 7.9vw" src="../../../static/img/order-2.png" ></img>
          </div>
          <p>
            <span>已上架商品</span>
            <i><samp>{{orderIofo.count2}} </samp>
              <img style="width: 4.2vw" src="../../../static/img/more.png" ></img>
            </i>
<!--            <samp>{{orderIofo.count2}}</samp>-->
          </p>
        </router-link>
      </section>
      <section class="my-vip" style="margin-top: 0">
        <router-link class="my-vip-bottom ho" :to="{ path: '/order?status=3'}">
          <div>
            <img style="width: 6.2vw" src="../../../static/img/order-3.png" ></img>
          </div>
          <p>
            <span>待发货商品</span>
            <i><samp :class="orderIofo.count3 > 0 ? 'color-danger' : ''">{{orderIofo.count3}}</samp>
              <img style="width: 4.2vw" src="../../../static/img/more.png" ></img>
            </i>
          </p>
        </router-link>
      </section>
      <section class="my-vip" style="margin-top: 0">
        <router-link class="my-vip-bottom ho" :to="{ path: '/order?status=4'}">
          <div>
            <img style="width: 7.9vw" src="../../../static/img/order-4.png" ></img>
          </div>
          <p>
            <span>已发货商品</span>
            <i><samp :class="orderIofo.count4 > 0 ? 'color-danger' : ''">{{orderIofo.count4}}</samp>
              <img style="width: 4.2vw" src="../../../static/img/more.png" ></img>
            </i>
          </p>
        </router-link>
      </section>
      <section class="my-vip" style="margin-top: 0">
        <router-link class="my-vip-bottom ho" :to="{ path: '/order?status=5'}">
          <div>
            <img style="width: 6.2vw" src="../../../static/img/order-5.png" ></img>
          </div>
          <p>
            <span>已揽件商品</span>
            <i><samp  :class="orderIofo.count5 > 0 ? 'color-danger' : ''">{{orderIofo.count5}}</samp>
              <img style="width: 4.2vw" src="../../../static/img/more.png" ></img>
            </i>
          </p>
        </router-link>
      </section>
      <section class="my-vip" style="margin-top: 0">
        <router-link class="my-vip-bottom ho" :to="{ path: '/order?status=6'}">
          <div>
            <img style="width: 6.2vw" src="../../../static/img/order-6.png" ></img>
          </div>
          <p>
            <span>已收货商品</span>
            <i><samp :class="orderIofo.count6 > 0 ? 'color-danger' : ''">{{orderIofo.count6}}</samp>
              <img style="width: 4.2vw" src="../../../static/img/more.png" ></img>
            </i>
          </p>
        </router-link>
      </section>
      <section class="my-vip" style="margin-top: 0">
        <router-link class="my-vip-bottom ho" :to="{ path: '/order?status=8'}">
          <div>
            <img style="width: 6.2vw" src="../../../static/img/order-8.png" ></img>
          </div>
          <p>
            <span>瑕疵商品</span>
            <i><samp :class="orderIofo.count8 > 0 ? 'color-danger' : ''">{{orderIofo.count8}}</samp>
              <img style="width: 4.2vw" src="../../../static/img/more.png" ></img>
            </i>
          </p>
        </router-link>
      </section>
<!--      -->
<!--      <section class="my-vip" style="margin-top: 0">-->
<!--        <router-link class="my-vip-bottom ho" :to="{ path: '/order?status=4'}">-->
<!--          <div>-->
<!--            <img style="width: 6.2vw" src="../../../static/img/order-8.png" ></img>-->
<!--          </div>-->
<!--          <p>-->
<!--            <span>瑕疵商品</span>-->
<!--            <i> <samp-->
<!--          :class="orderIofo.count8 > 0 ? 'color-danger' : ''"-->
<!--          style="margin-left: 49vw">{{orderIofo.count8}} </samp>-->
<!--              <img style="width: 4.2vw" src="../../../static/img/more.png" ></img>-->
<!--            </i>-->
<!--          </p>-->
<!--        </router-link>-->
<!--      </section>-->
    </div>
  </div>
</template>

<script>
  export default {
    props: {
      orderIofo: {
        type: Object,
        default: {}
      }
    },
    components: {
    },
    // methods:{
    //   logout(){
    //     alert(1)
    //     // userContainerApi.logout().then(res => {
    //     //   if (res.subCode === 1000) {
    //     //     removeCookieByName('org_token_auth')
    //     //     removeCookieByName('refresh_org_token_auth')
    //     //     removeCookieByName('user_id')
    //     //     resetRouter()
    //     //     localStorage.clear() // remove all session
    //     //   }
    //     // })
    //   }
    // }
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
    text-align: center;
    padding: 3vw 0;
    margin-top: 4vw;
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
  .car {
    width: 100%;
    background-color: #F8FCFF;
    .header {
      width: 100%;
      height: 16vw;
      background: url(../../../static/carbg.png) center 0 #f37d0f;
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

  .icon2-service {
    .fz(font-size, 34);
  }

</style>
