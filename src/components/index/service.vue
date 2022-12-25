<template lang="html">

  <div class="service">
    <ul>
      <li><span>春节倒计时  <strong class="color-danger"> {{countDay}}</strong> {{count}} </span></li>
<!--      <li><i class="icon-ok"></i><span>无忧退货</span></li>-->
<!--      <li><i class="icon-ok"></i><span>48小时快速退款</span></li>-->
    </ul>
  </div>
</template>
<script>

  export default {
    props: {
      countDay: {
        type: String,
        default: ''
      },
      count: {
        type: String,
        default: ''
      }
    }
  }

</script>
<style lang="less" scoped>
  @import '../../assets/fz.less';
  @import '../../assets/index/style.css';
  .service {
    padding-top: 2vw;
    .bd();
    ul {
      display: -webkit-flex;
      display: -ms-flex;
      display: flex;
      justify-content: space-around;

      li {
        display: -webkit-flex;
        display: -ms-flex;
        display: flex;
        align-items: center;
        padding: 3.3vw 0;
        span {
          .fz(font-size,38);
          padding-left: 1vw;
        }
        i {
          .fz(font-size,36);
        }
      }
    }
  }

</style>
