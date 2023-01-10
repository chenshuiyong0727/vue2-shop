<template lang="html">
  <!-- gotoRouter:点击后路由跳转到与id名相同的route.name所对应的路径 -->
  <footer class="footer" @click.stop='gotoRouter'>
    <mt-tabbar v-model="selected" fixed style="height: 15vw;">
      <mt-button @click="gotoIndex" style="    margin-left: 87px;
    margin-top: 9px;" type="primary">
        <img src="../../../static/img/index_2.png" height="25" width="25" slot="icon">
        回到首页
      </mt-button>
      <mt-button @click="gotoAdd(null,3)" style="margin-left: 5px;
    margin-top: 9px;" type="primary">
        <img src="../../../static/img/add.png" height="20" width="20" slot="icon">
        新增
      </mt-button>
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
        selected: '',
      }
    },
    methods: {
      gotoIndex(row) {
        this.$router.push({ path: '/'})
      },
      gotoAdd(id, type) {
        this.$router.push({ path: '/goodsAdd', query: { id, type } })
      },
    }
  }
</script>

<style lang="less" scoped>
  @import '../../assets/fz.less';
  @import '../../assets/index/style.css';

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
        color: @c2;
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
