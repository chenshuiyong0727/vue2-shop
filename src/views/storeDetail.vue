<template lang="html">
  <div class="detail">
    <mt-header title="库存详情">
      <div slot="left">
        <mt-button  icon="back" @click="$router.go(-1)"></mt-button>
      </div>
    </mt-header>
    <div class="ui-flex justify-center center"
         style="margin-top: 12vw; width: 100vw; height: 220px;background-color: white">
      <div class="cell">
        <img
          @click="avatarShow(form.img)"
          :disabled="true "
          style="width: 80vw;margin: 0 auto;"
          v-if="form.img"
          :src="form.img"
        />
      </div>
    </div>
    <section class="my-pay-3" style="border-bottom-style:none;">
      <div>
        <span>1</span>
        <p style="color: #8c8a8a;font-size: 14px;">待发货</p>
      </div>
      <div>
        <span>12</span>
        <p style="color: #8c8a8a;font-size: 14px;">待发货</p>
      </div>
      <div>
        <span>13</span>
        <p style="color: #8c8a8a;font-size: 14px;">待发货</p>
      </div>
      <div>
        <span>14</span>
        <p style="color: #8c8a8a;font-size: 14px;">待发货</p>
      </div>
    </section>

    <v-chose/>
    <v-content/>
    <v-baseline/>
    <v-footer/>>
  </div>
</template>

<script>
  import Chose from '@/components/detail/chose.vue'
  import Content from '@/components/detail/content.vue'
  import Footer from '@/components/detail/footer.vue'
  import Baseline from '@/common/_baseline.vue'
  import {goodsInventoryApi} from '@/api/goodsInventory'
  import detail from '@/http/mock.js' //模拟数据
  export default {
    components:{
      'v-chose':Chose,
      'v-content':Content,
      'v-footer':Footer,
      'v-baseline':Baseline
    },

    beforeCreate(){
      this.$store.dispatch('setDatas');
    },
    data(){
      return {
        form: {
        },
        imageZoom: '',
        pictureZoomShow: false,
        addressList: [],
        statusList: [],
        warehouseList: [],
        channelIdList: [],
        todayList: ''
      }
    },
    created() {
      const { id } = this.$route.query
      if (id) {
        this.getDetailById(id)
      }
    },
    mounted() {
      this.listSysDict()
    },
    methods:{
      avatarShow(e) {
        this.imageZoom = e
        this.pictureZoomShow = true
      },
      getDetailById(id) {
        if (id) {
          goodsInventoryApi.getDetailById(id).then(res => {
            if (res.subCode === 1000) {
              this.form = res.data ? res.data : {}
            } else {
              this.$toast(res.subMsg)
            }
          })
        }
      },
      listSysDict() {
        let sysDictList = localStorage.getItem('sysDictList') ? JSON.parse(
          localStorage.getItem('sysDictList')) : []
        this.addressList = sysDictList.filter(item => item.typeValue == 38)
        this.statusList = sysDictList.filter(item => item.typeValue == 37)
        this.warehouseList = sysDictList.filter(item => item.typeValue == 40)
        this.channelIdList = sysDictList.filter(item => item.typeValue == 47)
        this.todayList = sysDictList.filter(item => item.typeValue == 44)
      },
    }
  }
</script>

<style lang="less" scoped>
  @import '../assets/index/style.css';
  @import '../assets/fz.less';
  .detail {
    width: 100%;
    padding-bottom: 14vw;
  }

.ui-flex {
  display: -webkit-box !important;
  display: -webkit-flex !important;
  display: -ms-flexbox !important;
  display: flex !important;
  -webkit-flex-wrap: wrap;
  -ms-flex-wrap: wrap;
  flex-wrap: wrap
}

  .ui-flex, .ui-flex *, .ui-flex :after, .ui-flex :before {
    box-sizing: border-box
  }

  .ui-flex.justify-center {
    -webkit-box-pack: center;
    -webkit-justify-content: center;
    -ms-flex-pack: center;
    justify-content: center
  }
  .ui-flex.center {
    -webkit-box-pack: center;
    -webkit-justify-content: center;
    -ms-flex-pack: center;
    justify-content: center;
    -webkit-box-align: center;
    -webkit-align-items: center;
    -ms-flex-align: center;
    align-items: center
  }
  .my-pay-3 {
    border-radius: 5px;
    margin-top: 15px;
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
</style>
