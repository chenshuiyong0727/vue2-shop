<template lang="html">
  <div class="hello">
    <mt-header title="库存详情">
      <div slot="left">
        <mt-button  icon="back" @click="$router.go(-1)"></mt-button>
      </div>
    </mt-header>
    <div class="ui-flex justify-center center"
         style="width: 100vw; height: 220px;background-color: white;margin-top: -3.1px;">
      <div class="cell">
        <img
          @click="avatarShow(form.img)"
          style="width: 80vw;margin: 0 auto;"
          v-if="form.img"
          :src="form.img"
        />
      </div>
    </div>
    <section class="my-pay-3">
      <div style="padding-top: 15px;
    padding-right: 10px;
    padding-left: 10px;
    color: #333;
     display: flex;
    justify-content: space-between;
    align-items: center;
  ">
        <div>
          <strong  style="color: #333;font-size: 18px;">¥</strong>
          <strong v-if="form.thisTimeThePrice" style="color: #333;font-size: 25px;margin-left: -2px;" >{{form.thisTimeThePrice}}</strong>
          <strong v-else  style="color: #333;font-size: 25px;" v-if="!form.thisTimeThePrice && form.theirPrice">{{form.theirPrice}}</strong>
          <span style="color: #333; margin-left: -2px;">得物到手价</span>
          <span style="font-size: 15px;margin-left: 10px;text-decoration:line-through;color: #7a7a7a;" v-if="form.thisTimePrice">
          {{form.thisTimePrice}}
         </span>
          <span style="font-size: 15px;margin-left: 10px;text-decoration:line-through;color: #7a7a7a;" v-else >
          {{form.dwPrice}}
        </span>
        </div>
      <div>
          <span v-if="form.thisTimePrice"  >
          <strong class="color-danger" style="font-size: 15px;margin-right: 1px;">{{form.thisTimeProfits}}</strong>
          利润</span>
         <span   v-else>
          <strong class="color-danger" style="font-size: 15px;margin-right: 1px;">{{(form.dwPrice - (form.dwPrice * 0.075 + 38 + 8.5) - form.price - 10) | numFilter}}</strong>利润
        </span>
      </div>

      </div>
      <div style="padding-top: 0px;
    padding-right: 10px;
    padding-bottom: 5px;
    padding-left: 10px;
    display: flex;
    justify-content: space-between;
    align-items: center;
">
        <div>
            <span style="font-size: 15px;color: #7a7a7a;">
            {{form.price}}
           </span>
            <span style="color: #7a7a7a; margin-left: -2px;">入库价</span>
        </div>
        <div  v-if="form.difference && form.thisTimePrice" style="">
          变更
          <strong v-if="form.difference > 0" class="color-danger"> +{{form.difference }}</strong>
          <strong v-else class="color-success">{{form.difference }}</strong>
        </div>
      </div>
      <div style="padding-top: 0px;
    padding-right: 10px;
    padding-bottom: 5px;
    padding-left: 10px;">
        <strong style="color: #333;font-size: 15px;line-height: 22px;" @click="goodsDetail(form.goodsId, 1) ">
          {{form.goodsName}}
        </strong>
      </div>
      <div style="padding-top: 0px;
    padding-right: 10px;
    padding-bottom: 10px;
    padding-left: 10px;
  ">
        <span  style="font-size: 14px;
    background-color: #f3f2f8;
    padding: 5px;
    border-radius: 5px;">
          {{form.type | dictToDescTypeValue(20221108)}}
        </span>
      </div>
      <div style="padding-top: 0px;
    padding-right: 10px;
    padding-bottom: 10px;
    padding-left: 10px;
    display: flex;
    justify-content: space-between;
    align-items: center;
  ">
        <strong style="color: #333;font-size: 15px;">
          {{form.actNo}}
          <img @click="copyUrl(form.actNo)" style="width: 20px;margin-top: -5px;" src="../../static/img/copy6.png">
        </strong>
        <strong class="color-danger" style="font-size: 15px;">
          {{form.size}}
        </strong>
      </div>
    </section>
    <section class="my-pay-4">
      <div style="border-right-color: rgba(185, 185, 185, .14);
  border-right-style: solid;">
        <span style="color: #7a7a7a;font-size: 15px;">
          库存
        </span>
      </div>
      <div style="border-right-color: rgba(185, 185, 185, .14);
  border-right-style: solid;">
        <p>剩余</p>
        <strong>
          {{form.inventory}}
        </strong>
      </div>
      <div style="border-right-color: rgba(185, 185, 185, .14);
  border-right-style: solid;">
        <p>原库存</p>
        <strong>
          {{form.oldInventory}}
        </strong>
      </div>
      <div style="border-right-color: rgba(185, 185, 185, .14);
  border-right-style: solid;">
        <p>已上架</p>
        <strong>
          {{form.galleryCount}}
        </strong>
      </div>
      <div style="border-right-color: rgba(185, 185, 185, .14);
  border-right-style: solid;">
        <p>交易成功</p>
        <strong>
          {{form.successCount}}
        </strong>
      </div>
    </section>
    <section class="my-pay-4">
      <div style="    border-right-color: rgba(185, 185, 185, .14);
    border-right-style: solid;
    height: 12vw;
    margin-top: 26px;">
        <span style="color: #7a7a7a;font-size: 15px;">
          信息
        </span>
      </div>
      <div style="width: 75vw;">
        <span style="color: #7a7a7a;font-size: 15px;text-align: left;margin-left: 15px;">入库时间
          <span  style="color: #333;font-size: 15px;text-align: left;margin-left: 5px;">
                {{form.createTime |formateTime }}
          </span>
        </span>
        <span style="color: #7a7a7a;font-size: 15px;text-align: left;margin-left: 15px;">入库渠道
          <span  style="color: #333;font-size: 15px;text-align: left;margin-left: 5px;">
                {{form.channelId | dictToDescTypeValue(47) }}
          </span>
        </span>
        <span style="color: #7a7a7a;font-size: 15px;text-align: left;margin-left: 15px;margin-bottom: 5px;">所在库存
          <span  style="color: #333;font-size: 15px;text-align: left;margin-left: 5px;">
                {{form.warehouseId | dictToDescTypeValue(40) }}
          </span>
        </span>
      </div>
<!--      <div style="border-right-color: rgba(185, 185, 185, .14);-->
<!--  border-right-style: solid;">-->
<!--        <p>原库存</p>-->
<!--        <strong>-->
<!--          {{form.oldInventory}}-->
<!--        </strong>-->
<!--      </div>-->
<!--      <div style="border-right-color: rgba(185, 185, 185, .14);-->
<!--  border-right-style: solid;">-->
<!--        <p>已上架</p>-->
<!--        <strong>-->
<!--          {{form.galleryCount}}-->
<!--        </strong>-->
<!--      </div>-->
<!--      <div style="border-right-color: rgba(185, 185, 185, .14);-->
<!--  border-right-style: solid;">-->
<!--        <p>交易成功</p>-->
<!--        <strong>-->
<!--          {{form.successCount}}-->
<!--        </strong>-->
<!--      </div>-->
    </section>
    <div class="popContainer" v-if="pictureZoomShow" @click="pictureZoomShow = false">
      <div class="imageShow">
        <img :src="imageZoom" alt="" class="showImg">
      </div>
    </div>
<!--    <v-chose/>-->
<!--    <v-content/>-->
<!--    <v-baseline/>-->
<!--    <v-footer/>>-->
  </div>
</template>

<script>

  import {goodsInventoryApi} from '@/api/goodsInventory'
  export default {
    components:{
      // 'v-chose':Chose,
      // 'v-content':Content,
      // 'v-footer':Footer,
      // 'v-baseline':Baseline
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
      goodsDetail(id, type) {
        this.$router.push({ path: '/goodsDetail', query: { id, type } })
      },
      copyUrl(url) {
        const input = document.createElement('input')
        document.body.appendChild(input)
        input.setAttribute('value', url)
        input.select()
        if (document.execCommand('copy')) {
          document.execCommand('copy')
        }
        document.body.removeChild(input)
        this.$toast('已复制至剪切板')
      },
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
  /** {*/
  /*  !*margin: 0;*!*/
  /*  !*padding: 0;*!*/
  /*  box-sizing: border-box;*/
  /*}*/
  /*!* 这里直接设置 1rem = 50px begin *!*/
  /*html {*/
  /*  font-size: 10px;*/
  /*}*/
  /*!* 这里直接设置 1rem = 50px end *!*/
  /*html,*/
  /*body {*/
  /*  !*font-family: "微软雅黑";*!*/
  /*  !*color: #333;*!*/
  /*  !*background: #fff;*!*/
  /*}*/
  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }
  /* 这里直接设置 1rem = 50px begin */
  html {
    font-size: 50px;
  }
  /* 这里直接设置 1rem = 50px end */
  html,
  body {
    /*font-family: "微软雅黑";*/
    /*color: #333;*/
    /*background: #fff;*/
  }
  /*ul,*/
  /*li {*/
  /*  list-style: none;*/
  /*}*/
  /* 给要上拉的容器设置 begin */
  .hello {
    background-color: #f3f2f8;
    padding-top: 12vw;
    font-size: 13px;
    height: 100vh;
    overflow-y: auto;
  }
  strong{
    font-weight: 600;
  }
  /*.detail {*/
  /*  width: 100%;*/
  /*  padding-bottom: 14vw;*/
  /*}*/

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
    border-radius: 10px;
    margin-top: 15px;
    width: 92%;
    margin-left: 4%;
    background-color: #fff;
  }

  .my-pay-4 {
    margin-top: 15px;
    border-radius: 10px;
    display: -webkit-box;
    display: -ms-flexbox;
    display: flex;
    width: 92%;
    margin-left: 4%;
    padding: 2vw 0;
    background-color: #fff;
    .bd();

    > div {
      display: block;
      width: 20%;
      color: #999;
      text-align: center;

      > span {
        font-size: 22px;
        margin-top: 2.3vw;
        display: block;
        text-align: center;
      }

      p {
        color: #8c8a8a;font-size: 14px; margin-top: 3px;margin-bottom: 4px;
      }
      strong {
        color: #333;font-size: 15px;
      }
    }
  }
</style>
