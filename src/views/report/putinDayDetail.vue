<template>
  <div class="hello">
    <mt-header :title="titleName">
      <div slot="left">
        <mt-button icon="back" @click="$router.go(-1)"></mt-button>
      </div>
    </mt-header>
    <div class="fenlei_top">
      <div class="fenlei_top_left">
        <el-date-picker style="width: 42vw"
                        v-model="queryParam.createTimeFrom" value-format="yyyy-MM-dd"
                        type="date" placeholder="时间开始"  @change="getPage">
        </el-date-picker>
      </div>
      <div style="width: 8vw" class="fenlei_top_left">
        <span style="margin-left: 1vw;">至</span>
      </div>
      <div class="fenlei_top_left">
        <el-date-picker style="width: 42vw"
                        v-model="queryParam.createTimeTo" value-format="yyyy-MM-dd"
                        type="date" placeholder="时间结束"  @change="getPage">
        </el-date-picker>
      </div>
<!--      <div class="fenlei_top_right">-->
<!--      </div>-->
    </div>
    <div style="padding-top: 0.86rem">
      <div class="dingdans_item" v-for="(item,index) in tableData" :key="index">
        <div v-if="item.actNo == '合计'"  style="    height: 50px;
    padding-top: 20px;">
          <div class="dingdans_top" >
            <div class="dingdans_top_left" style="    padding-left: 5px;
    font-size: 15px;">
             <p>
               <span>合计入库 ：</span> <strong>{{item.oldInventory}}</strong>
<!--               <span  style="margin-left: 20px">合计入库金额 ：</span> <strong>{{item.inventoryAmount}}</strong>-->
             </p>
              <p style="margin-top: 5px">
                <span>合计入库金额 ：</span> <strong>{{item.inventoryAmount}}</strong>
<!--                <mt-button style="margin-left: 40px;"-->
<!--                  type="primary"-->
<!--                  size="small"-->
<!--                  @click="getPage"> 搜索-->
<!--                </mt-button>-->
                <mt-button
                  style="margin-left: 40px;"
                  type="primary"
                  size="small"
                  @click="jumpDetail(months )">库存
                </mt-button>
              </p>
            </div>
<!--            <div class="dingdans_top_right">-->
<!--              尺码：<strong class="color-danger">{{item.size }}</strong>-->
<!--            </div>-->
          </div>
        </div>
        <div v-else>
          <div class="dingdans_top">
            <div class="dingdans_top_left">
              货号：<strong @click="WarehouseDetail(item.goodsId ,item.actNo ,item.imgUrl,item.img )" style="color: #409EFF"> {{item.actNo}} </strong>
            </div>
            <div class="dingdans_top_right">
              尺码：<strong class="color-danger">{{item.size }}</strong>
            </div>
          </div>
          <div class="dingdans_con">
            <div v-if="item.img" :src="item.img" class="dingdans_con_left" @click="avatarShow(item.img)">
            <img :src="item.img">
          </div>
          <div v-if="!item.img && item.imgUrl" :src="item.img" class="dingdans_con_left" @click="avatarShow(fileUrl+ item.imgUrl)">
            <img :src="fileUrl + item.imgUrl">
          </div>
            <div class="diangdans_con_right">
              <div class="dingdans_con_right_top">
                原库存：<strong>{{item.oldInventory}} </strong> 库存：<strong>{{item.inventory}}</strong> 成功：<strong>{{item.successCount}}</strong> 上架：<strong>{{item.galleryCount}}</strong>
              </div>
              <div class="dingdans_con_right_down">
                入库价：<strong>{{item.price}}</strong>
                入库总额：<strong>{{item.inventoryAmount}}</strong>
                入库价：<strong>{{item.dwPrice}}</strong>
              </div>
              <div style="
            margin-bottom: -7vw;
    font-size: 3.5vw;
    margin-top: -1vw;">
                <span >预计利润：<strong class="color-danger">{{(item.dwPrice - (item.dwPrice * 0.075 + 38 + 8.5) - item.price - 10) | numFilter}}</strong></span>
                <strong> {{item.createTime |formateTime }}</strong>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="popContainer" v-if="pictureZoomShow" @click="pictureZoomShow = false">
      <div class="imageShow">
        <img :src="imageZoom" alt="" width="100%" height="100%">
      </div>
    </div>
    <p style="padding: 0.5rem 0;" class="to-the-bottom">{{emtityMsg}}</p>
  </div>
</template>
<script>
  import Baseline from '@/common/_baseline.vue'
  import Footer from '@/common/_footer.vue'
  import {reportApi} from '@/api/report'

  export default {
    components: {
      'v-baseline': Baseline,
      'v-footer': Footer
    },
    name: "HelloWorld",
    data() {
      return {
        pictureZoomShow: false,
        imageZoom: '',
        fileUrl: fileUrl,
        months: '',
        titleName: '入库报表',
        emtityMsg: '人家是有底线的 -.-',
        queryParam: {
          createTimeFrom: '',
          createTimeTo: ''
        },
        tableData: [],
      }
    },
    // mounted() {
    //   this.getPage()
    // },
    created() {
      const { months } = this.$route.query
      this.months = months
      if (this.months) {
        this.titleName = this.months + ' ' + this.titleName
        this.queryParam.createTimeFrom = this.months
        this.queryParam.createTimeTo = this.months
        this.getPage()
      }
    },
    methods: {
      keyupSubmit() {
        document.onkeydown = (e) => {
          let _key = window.event.keyCode
          if (_key === 13) {
            this.getPage()
          }
        }
      },
      avatarShow(e) {
        this.imageZoom = e
        this.pictureZoomShow = true
      },
      WarehouseDetail(goodsId , actNo,imgUrl,img) {
        this.$router.push({ path: '/WarehouseDetail', query: {goodsId, actNo ,imgUrl,img} })
      },
      jumpDetail(months) {
        this.$router.push({ path: '/store', query: { months }})
      },
      getPage() {
        reportApi.putInStorageDayDetail(this.queryParam).then(res => {
          if (res.subCode === 1000) {
            this.tableData = res.data ? res.data : []
            if (this.tableData.length == 0) {
              this.emtityMsg = '暂无相关数据 -.-'
            } else {
              this.emtityMsg = '人家是有底线的 -.-'
            }
          } else {
            this.$toast(res.subMsg)
          }
        })
      }
    }
  };
</script>

<style>

  @import '../../assets/index/style.css';

  strong {
    font-weight: 600;
  }

  .dingdans_item {
    padding: 2.4vw 1.2vw;
    background: #ffffff;
    border-bottom: 1vw solid #eee;
    padding-right: 3%;
    padding-left: 3%;
  }

  .dingdans_top {
    font-size: 3.68vw;
    height: 3.88vw;
    line-height: 3.88vw;
    display: flex;
    align-items: center;
    justify-content: space-between;
  }

  .dingdans_con {
    display: flex;
    align-items: center;
    justify-content: flex-start;
    padding: 1.3vw 0;
  }

  .dingdans_con_left {
    width: 35vw;
    height: 20vw;
    display: flex;
  }

  .dingdans_con_left img {
    width: 100%;
    margin: auto;
    border-radius: 10px;
  }

  .diangdans_con_right {
    width: 130vw;
    padding-left: 10px;
  }

  .dingdans_con_right_down {
    margin-top: 1.4vw;
    font-size: 13px;
    margin-bottom: 2vw;
  }

  /*.dingdans_con_right_down_1 {*/
  /*  !*margin-left: 55vw;*!*/
  /*  margin-bottom: -7vw;*/
  /*  font-size: 3.5vw;*/
  /*  margin-top: -1vw;*/
  /*}*/
  /*
   -----分割线---
  */
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
  }

  /* 给要上拉的容器设置 begin */
  .hello {
    background-color: #F8FCFF;
    padding-top: 12vw;
    font-size: 13px;
    height: 100vh;
    overflow-y: auto;
  }

  .fenlei_top {
    display: flex;
    align-items: center;
    justify-content: space-between;
    height: 0.88rem;
    padding: 0.1rem 0.2rem;
    width: 100vw;
    background: #eeeeee;
    position: fixed;
    top: 0;
    left: 0;
    z-index: 99;
    margin-top: 11.6vw;
    /*margin-top:0.85rem;*/
  }

  .fenlei_top_right {
    font-size: 0.32rem;
    color: #353535;
    width: 2rem;
    text-align: center;
  }
  .mint-header-button{
    -webkit-box-flex: .5;
    -ms-flex: .5;
    flex: 0;
  }
  .ins {
    writing-mode: horizontal-tb !important;
    font-style: ;
    font-variant-ligatures: ;
    font-variant-caps: ;
    font-variant-numeric: ;
    font-variant-east-asian: ;
    font-weight: ;
    font-stretch: ;
    font-size: ;
    font-family: ;
    text-rendering: auto;
    color: fieldtext;
    letter-spacing: normal;
    word-spacing: normal;
    line-height: normal;
    text-transform: none;
    text-indent: 0px;
    text-shadow: none;
    display: inline-block;
    text-align: start;
    appearance: auto;
    -webkit-rtl-ordering: logical;
    cursor: text;
    background-color: field;
    margin: 0em;
    padding: 1px 2px;
    border-width: 2px;
    border-style: inset;
    border-color: -internal-light-dark(rgb(118, 118, 118), rgb(133, 133, 133));
    border-image: initial;
    border: 0;
    outline: none;
    width: 84vw;
    /*width: 5.7rem;*/
    padding: 0.2rem;

  }
</style>
