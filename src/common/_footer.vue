<template lang="html">
  <!-- gotoRouter:点击后路由跳转到与id名相同的route.name所对应的路径 -->
  <footer class="footer" @click.stop='gotoRouter'>
    <mt-tabbar v-model="selected" fixed>
      <mt-tab-item id="首页">
        <img style="width: 6.9vw" :src="index_img" ></img>
        <!--        <img style="width: 6.9vw" src="../../static/img/index_1.png" ></img>-->
        <p :style="blue1">首页</p>
      </mt-tab-item>
      <mt-tab-item id="订单">
        <img style="width: 6.9vw"  :src="order_img" ></img>
        <p :style="blue2">订单</p>
      </mt-tab-item>
      <mt-tab-item id="商品">
        <img style="width: 6.9vw"  :src="goods_img" ></img>
        <p :style="blue5">商品</p>
      </mt-tab-item>
<!--      <mt-tab-item id="扫码">-->
<!--        <img style="width: 11vw"  src="../../static/img/score3.png" ></img>-->
<!--      </mt-tab-item>-->
      <mt-tab-item id="仓库">
        <img style="width: 6.9vw" :src="store_img"></img>
        <p :style="blue3">仓库</p>
      </mt-tab-item>
      <mt-tab-item id="用户页">
        <img style="width: 6.9vw" :src="person_img"></img>
        <p :style="blue4">我的</p>
      </mt-tab-item>
      <!--    <mt-tab-item id="购物车页">-->
      <!--      <i slot="icon" class="icon-car"></i>-->
      <!--      购物车-->
      <!--    </mt-tab-item>-->
      <!--    <mt-tab-item id="用户页">-->
      <!--      <i slot="icon" class="icon-user"></i>-->
      <!--      我的-->
      <!--    </mt-tab-item>-->
    </mt-tabbar>
  </footer>
</template>

<script>
  export default {
    methods: {
      gotoRouter() {
        this.$router.push({
          name: this.selected
        })
      }
    },
    data() {
      return {
        //对应mt-tab-item 的id值
        blue1: 'color:#409EFF;margin-top: 1vw;',
        blue2: 'margin-top: 1vw;',
        blue3: 'margin-top: 1vw;',
        blue4: 'margin-top: 1vw;',
        blue5: 'margin-top: 1vw;',
        selected: '',
        index_img: '../../static/img/index_1.png',
        order_img: '../../static/img/order_0.png',
        store_img: '../../static/img/store_0.png',
        person_img: '../../static/img/person_0.png',
        goods_img: '../../static/img/good_0.png',
      }
    },
    mounted() {

      //获取当前路由名称，根据该名称给当前footer添加is-selected
      let Rname = this.$route.name;
      switch (Rname) {
        case '首页':
          this.selected = '首页';
          this.index_img= '../../static/img/index_1.png'
          this.order_img= '../../static/img/order_0.png'
          this.store_img= '../../static/img/store_0.png'
          this.person_img= '../../static/img/person_0.png'
          this.goods_img= '../../static/img/good_0.png'
          this.blue1= 'color:#409EFF;margin-top: 1vw;'
          this.blue2= 'margin-top: 1vw;'
          this.blue3= 'margin-top: 1vw;'
          this.blue4= 'margin-top: 1vw;'
          this.blue5= 'margin-top: 1vw;'
          break;
        case '订单':
          this.selected = '订单';
          this.order_img= '../../static/img/order_1.png'
          this.index_img= '../../static/img/index_0.png'
          this.store_img= '../../static/img/store_0.png'
          this.person_img= '../../static/img/person_0.png'
          this.goods_img= '../../static/img/good_0.png'
          this.blue2= 'color:#409EFF;margin-top: 1vw;'
          this.blue1= 'margin-top: 1vw;'
          this.blue3= 'margin-top: 1vw;'
          this.blue4= 'margin-top: 1vw;'
          this.blue5= 'margin-top: 1vw;'
          break;
        case '仓库':
          this.selected = '仓库';
          this.store_img= '../../static/img/store_1.png'
          this.order_img= '../../static/img/order_0.png'
          this.index_img= '../../static/img/index_0.png'
          this.person_img= '../../static/img/person_0.png'
          this.goods_img= '../../static/img/good_0.png'
          this.blue3= 'color:#409EFF;margin-top: 1vw;'
          this.blue1= 'margin-top: 1vw;'
          this.blue2= 'margin-top: 1vw;'
          this.blue4= 'margin-top: 1vw;'
          this.blue5= 'margin-top: 1vw;'
          break;
        case '用户页':
          this.person_img= '../../static/img/person_1.png'
          this.store_img= '../../static/img/store_0.png'
          this.order_img= '../../static/img/order_0.png'
          this.index_img= '../../static/img/index_0.png'
          this.goods_img= '../../static/img/good_0.png'
          this.selected = '用户页';
          this.blue4= 'color:#409EFF;margin-top: 1vw;'
          this.blue1= 'margin-top: 1vw;'
          this.blue2= 'margin-top: 1vw;'
          this.blue3= 'margin-top: 1vw;'
          this.blue5= 'margin-top: 1vw;'
          break;
        case '商品':
          this.goods_img= '../../static/img/good_1.png'
          this.person_img= '../../static/img/person_0.png'
          this.store_img= '../../static/img/store_0.png'
          this.order_img= '../../static/img/order_0.png'
          this.index_img= '../../static/img/index_0.png'
          this.selected = '商品';
          this.blue5= 'color:#409EFF;margin-top: 1vw;'
          this.blue1= 'margin-top: 1vw;'
          this.blue2= 'margin-top: 1vw;'
          this.blue3= 'margin-top: 1vw;'
          this.blue4= 'margin-top: 1vw;'
          break;
      }
    }

  }
</script>

<style lang="less" scoped>
  @import '../assets/fz.less';
  @import '../assets/index/style.css';

  .mint-tab-item-label:hover {
    color:#333;
  }
  .footer {
    .mint-tabbar {
      background-color: #fff;
      background-image: none;
      box-shadow: 0 0 2.2vw 0 hsla(0, 6%, 50%, .13);
      -webkit-box-shadow: 0 0 2.2vw 0 hsla(0, 6%, 50%, .13);
      .is-selected {
        color: #666;
        background-color: #fff;
        i {
          &::before {
            color: @c2;
          }
        }
      }
      i {
        .fz(font-size, 42);
      }
    }
  }
</style>
