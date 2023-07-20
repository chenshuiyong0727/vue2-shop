<template lang="html">
  <!-- gotoRouter:点击后路由跳转到与id名相同的route.name所对应的路径 -->
  <footer class="footer">
    <mt-tabbar style="border-top: 1px solid #f3f2f8;" fixed>
      <mt-tab-item id="首页" >
        <div  @click="gotoRouter('首页')">
          <img v-if="selected == '首页'" style="width: 6.9vw" src="../../static/img/new/index_1.png" ></img>
          <img v-else style="width: 6.9vw" src="../../static/img/new/index_0.png" ></img>
          <p style="margin-top: 1vw;" :class="selected == '首页' ? 'color-url':''" >首页</p>
        </div>
      </mt-tab-item>
      <mt-tab-item id="订单">
        <div  @click="gotoRouter('订单')">
        <img v-if="selected == '订单'" style="width: 6.9vw" src="../../static/img/new/order_1.png" ></img>
        <img v-else style="width: 6.9vw" src="../../static/img/new/order_0.png" ></img>
        <p style="margin-top: 1vw;" :class="selected == '订单' ? 'color-url':''" >订单</p>
        </div>
      </mt-tab-item>
      <mt-tab-item id="商品">
        <div  @click="gotoRouter('商品')">
        <img v-if="selected == '商品'" style="width: 6.9vw" src="../../static/img/new/good_1.png" ></img>
        <img v-else style="width: 6.9vw" src="../../static/img/new/good_0.png" ></img>
        <p style="margin-top: 1vw;" :class="selected == '商品' ? 'color-url':''" >商品</p>
        </div>
      </mt-tab-item>
      <mt-tab-item id="仓库" >
        <div  @click="gotoRouter('仓库')">
        <img v-if="selected == '仓库'" style="width: 6.9vw" src="../../static/img/new/store_1.png" ></img>
        <img v-else style="width: 6.9vw" src="../../static/img/new/store_0.png" ></img>
        <p style="margin-top: 1vw;" :class="selected == '仓库' ? 'color-url':''" >仓库</p>
        </div>
      </mt-tab-item>
      <mt-tab-item id="用户页">
        <div  @click="gotoRouter('用户页')">
        <img v-if="selected == '用户页'" style="width: 6.9vw" src="../../static/img/new/person_1.png" ></img>
        <img v-else style="width: 6.9vw" src="../../static/img/new/person_0.png" ></img>
        <p style="margin-top: 1vw;" :class="selected == '用户页' ? 'color-url':''" >我的</p>
        </div>
      </mt-tab-item>
    </mt-tabbar>
  </footer>
</template>

<script>
  export default {
    methods: {
      gotoRouter(selected) {
        this.selected = selected
        this.$router.push({
          name: this.selected
        })
      }
    },
    data() {
      return {
        selected: '首页',
      }
    },
    activated() {
      //获取当前路由名称，根据该名称给当前footer添加is-selected
      let Rname = this.$route.name;

      switch (Rname) {
        case '首页':
          this.selected = '首页';
          break;
        case '订单':
          this.selected = '订单';
          break;
        case '仓库':
          this.selected = '仓库';
          break;
        case '用户页':
          this.selected = '用户页';
          break;
        case '商品':
          this.selected = '商品';
          break;
      }
    },
    created() {
      //获取当前路由名称，根据该名称给当前footer添加is-selected
      let Rname = this.$route.name;
      switch (Rname) {
        case '首页':
          this.selected = '首页';
          break;
        case '订单':
          this.selected = '订单';
          break;
        case '仓库':
          this.selected = '仓库';
          break;
        case '用户页':
          this.selected = '用户页';
          break;
        case '商品':
          this.selected = '商品';
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
      z-index: 10000000000000;
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
