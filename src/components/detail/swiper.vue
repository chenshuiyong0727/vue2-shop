<template lang="html">
    <div class="swiper">
      <img style="width: 100vw;"
           src="https://cdn.poizon.com/pro-img/origin-img/20220212/b70c2a9f04d442d6bf4f8d9061d01d5e.jpg">
    </div>

</template>

<script>
export default {
  computed: {
    swiper () {
      return this.$store.state.detail.productDatas.swiper
    }
  }
}
</script>

<style lang="less" scoped>
@import "../../assets/fz.less";
@import "../../assets/index/style.css";

.swiper {
  width: 100%;
  position: relative;

  .mint-swipe {
    width: 100%;
    height: 100vw;
    img {
      display: block;
      width: 100%;
      height: 100%;
    }
  }

  .back {
    width: 7vw;
    height: 7vw;
    position: absolute;
    left: 4vw;
    top: 2vw;
    background-color: rgba(0, 0, 0, 0.4);
    border-radius: 50%;
    text-align: center;
    span {
      display: inline-block;
      line-height: 7vw;
      .fz(font-size,40);
      transform: rotate(-180deg);
      &::before {
        color: #fff;
      }
    }

    &:active {
      transform: scale(1.3);
    }
  }
}
</style>
