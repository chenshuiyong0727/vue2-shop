<template>
  <div class="hello" ref="hello">
    <mt-header title="Nike">
      <div slot="right">
        <mt-button size="normal" style="font-size: 15px; color: black" @click="resetHandle" >重置</mt-button>
      </div>
    </mt-header>
<!--    <div class="fenlei_top">-->
<!--      <div    class="fenlei_top_left">-->
<!--        <input type="text" v-model.trim="queryParam.actNo" placeholder="请输入货号/商品名" class="ins">-->
<!--      </div>-->
<!--      <div class="fenlei_top_right" @click="isShowDialog2 = true">-->
<!--        <img src="../../static/img/search.png" height="30px;"width="30px;" >-->
<!--      </div>-->
<!--    </div>-->
    <div class="fenlei_top">
      <div class="fenlei_top_left">
        <el-input
          clearable
          placeholder="请输入货号/商品名"
          prefix-icon="el-icon-search"
          v-model.trim="queryParam.actNo">
        </el-input>
      </div>
      <div class="fenlei_top_right" @click="isShowDialog2 = true">
        <img src="../../static/img/search.png" height="30px;" width="30px;">
      </div>
    </div>
    <mt-loadmore
      style="padding-top: 0.86rem"
      :top-method="loadTop"
      :bottom-method="loadBottom"
      :bottom-all-loaded="allLoaded"
      @top-status-change="handleTopChange"
      @bottom-status-change="handleBottomChange"
      :autoFill="false"
      ref="loadmore"
    >
      <div class="dingdans_item_dw"
            v-for="(item,index) in tableData"
            :key="index"
      >
        <div class="dingdans_con_dw" style="padding: 0px;">
          <div class="dingdans_con_left_dw"
               @click="avatarShow(item.img)">
            <img :src="item.img" >
          </div>
          <div class="diangdans_con_right_dw">
            <div class="dingdans_con_right_top_dw">
              <span>
                {{item.goodsName | sizeFilterNum(40) }}
              </span>
            </div>
            <div class="dingdans_con_right_top_dw_1 zuoyouduiqi">
              <span>
              {{item.actNo}}
              </span>
              <span>
             尺码： {{item.size}}
              </span>
            </div>
          </div>
        </div>
        <!--底部-->
      </div>

      <div slot="top" class="mint-loadmore-top">
        <span v-show="topStatus !== 'loading'" :class="{ 'rotate': topStatus === 'drop' }">松手释放↓</span>
        <span v-show="topStatus === 'loading'">加载中</span>
      </div>
      <div slot="bottom" class="mint-loadmore-bottom">
        <span
          v-if="bottomStatus !== 'loading'"
          :class="{ 'rotate': bottomStatus === 'drop' }"
        >松手释放↑</span>
        <span v-if="bottomStatus === 'loading'">加载中</span>
      </div>
    </mt-loadmore>
    <mt-popup
      position="bottom"
      v-model="isShowDialog2">
      <mt-header title="筛选" >
        <div slot="right">
          <mt-button size="normal"  @click="resetHandle" style="font-size: 15px">关闭</mt-button>
        </div>
        <div slot="left">
          <mt-button size="normal" @click="search1" style="font-size: 15px">确定</mt-button>
        </div>
      </mt-header>
      <section style="height: 80vw;width: 100vw">
        <mt-field label="状态" >
            <select class="select100" v-model="queryParam.inventory" @change="changeSystem" :disabled="true">
          <option :disabled="true" value="" selected>请选择状态</option>
              <option v-for="x in inventoryToList" :value="x.fieldValue">{{x.fieldName}}</option>
            </select>
        </mt-field>
        <mt-field label="尺码" placeholder="请输入尺码"  v-model="queryParam.size"></mt-field>
      </section>
    </mt-popup>
    <div v-if="!tableData.length" class="to-the-bottom-1">
      <p v-if="emtityMsg">
        <img src="../../static/img/new/empity_7.png" style="width: 60vw;">
      </p>
      <p>
        <span>{{emtityMsg}}</span>
      </p>
    </div>
    <div class="popContainer" v-if="pictureZoomShow" @click="pictureZoomShow = false">
      <div class="imageShow">
        <img :src="imageZoom" alt="" class="showImg">
      </div>
    </div>
  </div>
</template>
<script>
  import Baseline from '@/common/_baseline.vue'
  import Footer from '@/common/_footer.vue'
  import { goodsOrderApi } from '@/api/goodsOrder'
  import { goodsInventoryApi } from '@/api/goodsInventory'


  import {
    MessageBox
  } from "mint-ui";
  export default {
    components: {
      'v-baseline': Baseline,
      'v-footer': Footer
    },
    name: "HelloWorld",
    data() {
      return {
        topStatus: "",
        bottomStatus: "",
        allLoaded: false,
        mockArr: [],
        imageZoom: '',

        pictureZoomShow: true,
        requestParam1: {
          poundage: '',
          theirPrice: '',
          profits: '',
          inventoryId: '',
          type: 1,
          num: '',
          shelvesPrice: ''
        },
        requestParam: {
          id: '',
          price: '',
          dwPrice: '',
          poundage: '',
          theirPrice: '',
          profits: '',
          waybillNo: '',
          addressId: ''
        },
        // popupVisible: false,
        titleName: '商品',
        emtityMsg: '没有更多了',
        orderData: '',
        isShowDialog: false,
        orderData1: '',
        isShowDialog1: false,
        orderData2: '',
        isShowDialog2: false,
        pictureZoomShow: false,
        imageZoom: '',
        fileUrl: fileUrl,
        queryParam: {
          id: '',
          inventory: 1,
          inventoryFrom: '',
          inventoryTo: '',
          size: '',
          actNo: '',
          goodsId: '',
          pageSize: 20,
          pageNum: 1
        },
        // queryParam: {
        //   id: '',
        //   size: '',
        //   keyword: '',
        //   orderNo: '',
        //   inventoryId: '',
        //   status: '',
        //   dwPriceFrom: '',
        //   dwPriceTo: '',
        //   poundageFrom: '',
        //   poundageTo: '',
        //   theirPriceFrom: '',
        //   theirPriceTo: '',
        //   addressId: '',
        //   waybillNo: '',
        //   createTimeFrom: '',
        //   createTimeTo: '',
        //   updateTimeFrom: '',
        //   updateTimeTo: '',
        //   sellTimeFrom: '',
        //   sellTimeTo: '',
        //   successTimeFrom: '',
        //   successTimeTo: '',
        //   pageSize: 20,
        //   pageNum: 1
        // },
        topStatus: "",
        isShowPrice: "",
        bottomStatus: "",
        allLoaded: false,
        mockArr: [],
        addressList: [],
        inventoryToList: [
          { fieldValue: 1, fieldName: '现货' }, { fieldValue: 0, fieldName: '售空' },
          { fieldValue: 2, fieldName: '未上架' }
        ],
        statusList: [],
        dataStatusList: [],
        sellTime: '',
        successTime: '',
        startDate: new Date(),
        createTime: '',
        updateTime: '',
        status: '',
        selectedId: [],
        ids: [],
        tableData: [],
        totalCount: 1
      }
    },
    // created() {
    //   // ajax 模拟初始加载, 使用定时器默认ajax加载
    //   let timer = setTimeout(_ => {
    //     clearTimeout(timer);
    //     this.loadData('refresh');
    //   }, 200);
    // },
    created() {
      const { actNo,size } = this.$route.query
      this.queryParam.actNo = actNo
      this.queryParam.size = size
      if (this.queryParam.actNo || this.queryParam.size) {
        this.search1()
      }
            this.keyupSubmit()

    },
    mounted() {

      this.getPage()
      this.listSysDict()
    },
    methods: {
      keyupSubmit() {
        document.onkeydown = (e) => {
          let _key = window.event.keyCode
          if (_key === 13) {
            this.search1()
          }
        }
      },
      successTimeChange() {
        if (this.successTime) {
          this.queryParam.successTimeFrom = this.successTime[0]
          this.queryParam.successTimeTo = this.successTime[1]
        } else {
          this.queryParam.successTimeFrom = null
          this.queryParam.successTimeTo = null
        }
      },
      getPage() {
        this.emtityMsg = ''
        goodsInventoryApi.pageOpen(this.queryParam).then(res => {
          if (res.subCode === 1000) {
            this.tableData = res.data ? res.data.list : []
            this.totalCount = res.data ? res.data.pageInfo.totalCount : 0
            if (this.totalCount == 0) {
              this.allLoaded = true;
              if (this.queryParam.pageNum == 1){
                this.emtityMsg = '暂无相关商品'
              }
            } else if (this.totalCount <= this.queryParam.pageSize) {
              this.allLoaded = tr
            }
          } else {
            this.$toast(res.subMsg)
          }
        })
      },
      listSysDict() {
        let sysDictList = localStorage.getItem('sysDictList') ? JSON.parse(
          localStorage.getItem('sysDictList')) : []
        this.addressList = sysDictList.filter(item => item.typeValue == 38)
        this.statusList = sysDictList.filter(item => item.typeValue == 37)
        this.dataStatusList = sysDictList.filter(item => item.typeValue == 36)
      },
      loadData(p_status) {
        // 第一次加载或者下拉刷新最新数据
        if (p_status === "refresh") {
          this.tableData = [];
        }
        if (this.queryParam.inventory == 1) {
          this.queryParam.inventoryFrom = 1
          this.queryParam.inventoryTo = ''
        } else if (this.queryParam.inventory == 0) {
          this.queryParam.inventoryFrom = ''
          this.queryParam.inventoryTo = 0
        } else {
          this.queryParam.inventoryFrom = ''
          this.queryParam.inventoryTo = ''
        }
        goodsInventoryApi.pageGoods(this.queryParam).then(res => {
          if (res.subCode === 1000) {
            let list =  res.data ? res.data.list : []
            if (list && list.length) {
              for (let i = 0; i < list.length; i++) {
                this.tableData.push(list[i])
              }
              setTimeout(()=>{
                let ht2 = (this.$refs.hello.scrollTop)*1 +475
                this.$refs.hello.scrollTop = ht2
              },100)
            } else {
              this.allLoaded = true;
              this.$toast('没有更多了')
            }
          } else {
            this.$toast(res.subMsg)
            return false
          }
        })
      },
      search() {
        if (!this.queryParam.actNo ) {
          this.$toast('请输入货号')
          return
        }
        this.queryParam.pageNum = 1
        this.allLoaded = false;
        this.getPage()
      },
      // 日期
      open(picker) {
        this.$refs[picker].open();
      },
      changeSystem() {
        let res = this.inventoryToList.filter(
          item => item.fieldValue == this.queryParam.inventory)
        this.titleName = res.length ? res[0].fieldName : ''
        this.titleName = this.titleName + '仓库'
      },
      search1() {
        this.queryParam.pageNum = 1
        this.allLoaded = false;
        this.isShowDialog2 = false
        this.$refs.hello.scrollTop = 0
        this.getPage()
      },
      resetHandle() {
        this.queryParam = {
          id: '',
          inventory: 1,
          inventoryFrom: '',
          inventoryTo: '',
          size: '',
          actNo: '',
          goodsId: '',
          pageSize: 20,
          pageNum: 1
        }
        this.titleName = '仓库'
        this.changeSystem()
        this.search1()
      },
      handleTopChange(p_status) {
        this.topStatus = p_status;
      },
      handleBottomChange(p_status) {
        this.bottomStatus = p_status;
      },
      loadBottom() {
        // 一次下拉加载5条更多数据，使用定时器默认ajax加载
        this.loadData()
        this.queryParam.pageNum++;
        this.$refs.loadmore.onBottomLoaded();
      },
      loadTop() {
        // 默认下拉刷新最新数据
        this.loadData("refresh");
        this.queryParam.pageNum = 0
        this.allLoaded = false;
        this.$refs.loadmore.onTopLoaded();
      },
      avatarShow(e) {
        this.imageZoom = e
        this.pictureZoomShow = true
      },
      keyup1() {
        // let theirPrice =
        //   +  this.requestParam.dwPrice - (this.requestParam.dwPrice * 0.075 + 38 + 8.5)
        // // let theirPrice = this.requestParam.theirPrice - 10
        // //   - this.theirPrice.price
        // this.requestParam.profits = parseFloat(theirPrice).toFixed(2)
        //
        // let profits = this.requestParam.theirPrice - 10
        //   - this.requestParam.price
        // this.requestParam.profits = parseFloat(profits).toFixed(2)

        let poundage = this.requestParam.dwPrice * 0.075 + 38 + 8.5
        this.requestParam.poundage = parseFloat(poundage).toFixed(2)

        let theirPrice =  this.requestParam.dwPrice
          - (this.requestParam.dwPrice * 0.075 + 38 + 8.5)
        this.requestParam.theirPrice = parseFloat(theirPrice).toFixed(2)

        let profits = this.requestParam.theirPrice - 10
          - this.requestParam.price
        this.requestParam.profits = parseFloat(profits).toFixed(2)
      },
      keyup2() {
        // let theirPrice =
        //   +  this.requestParam.dwPrice - (this.requestParam.dwPrice * 0.075 + 38 + 8.5)
        // // let theirPrice = this.requestParam.theirPrice - 10
        // //   - this.theirPrice.price
        // this.requestParam.profits = parseFloat(theirPrice).toFixed(2)
        //
        // let profits = this.requestParam.theirPrice - 10
        //   - this.requestParam.price
        // this.requestParam.profits = parseFloat(profits).toFixed(2)

        let poundage = this.requestParam1.shelvesPrice * 0.075 + 38 + 8.5
        this.requestParam1.poundage = parseFloat(poundage).toFixed(2)

        let theirPrice =  this.requestParam1.shelvesPrice
          - (this.requestParam1.shelvesPrice * 0.075 + 38 + 8.5)
        this.requestParam1.theirPrice = parseFloat(theirPrice).toFixed(2)

        let profits = this.requestParam1.theirPrice - 10
          - this.orderData1.price
        this.requestParam1.profits = parseFloat(profits).toFixed(2)

        if (this.requestParam1.num > this.orderData1.inventory - this.orderData1.galleryCount) {
          this.requestParam1.num = this.orderData1.inventory - this.orderData1.galleryCount
        }
      },
      confirmHandle1() {
        if (!this.requestParam1.num) {
          this.$toast("上架数量错误");
          // this.$toast('上架数量错误')
          return
        }
        if (this.requestParam1.num > this.orderData1.inventory) {
          this.$toast('上架数量大于当前库存')
          return
        }
        let data = {}
        data.inventoryId = this.requestParam1.inventoryId
        data.type = this.requestParam1.type
        data.num = this.requestParam1.num
        data.shelvesPrice = this.requestParam1.shelvesPrice
        goodsInventoryApi.shelvesGoods(data).then(res => {
          this.$toast(res.subMsg)
          if (res.subCode === 1000) {
            this.getPage()
            this.isShowDialog1 = false
          }
        })
      },
      confirmHandle() {
        // 利润= 到手价-运费-原价
        // // 出售
        // goodsOrderApi.sellGoods(this.requestParam).then(res => {
        //   this.$toast(res.subMsg)
        //   if (res.subCode === 1000) {
        //     this.getPage()
        //     this.isShowDialog = false
        //   }
        // })
        goodsInventoryApi.update(this.requestParam).then(res => {
          this.$toast(res.subMsg)
          if (res.subCode === 1000) {
            this.getPage()
            this.isShowDialog = false
          }
        })
      },
      updateAddress() {
        goodsOrderApi.update(this.requestParam1).then(res => {
          this.$toast(res.subMsg)
          if (res.subCode === 1000) {
            this.getPage()
            this.isShowDialog1 = false
          }
        })
      },
      changeStatusDialog1(row) {
        this.orderData1 = row
        this.requestParam1.inventoryId = this.orderData1.id
        this.requestParam1.num = this.orderData1.inventory - this.orderData1.galleryCount
        this.requestParam1.shelvesPrice = this.orderData1.dwPrice
        this.isShowDialog1 = true
      },
      handleClick(orderData) {
        this.orderData = orderData
        this.requestParam.id = this.orderData.id
        this.requestParam.price = this.orderData.price
        this.requestParam.dwPrice = this.orderData.dwPrice
        this.requestParam.waybillNo = this.orderData.waybillNo
        this.requestParam.addressId = this.orderData.addressId
        // let poundage = this.requestParam.dwPrice * 0.075 + 38 + 8.5
        // this.requestParam.poundage = parseFloat(poundage).toFixed(2)
        if (!this.orderData.poundage) {
          let poundage = this.requestParam.dwPrice * 0.075 + 38 + 8.5
          this.requestParam.poundage = parseFloat(poundage).toFixed(2)
        } else {
          this.requestParam.poundage = this.orderData.poundage
        }
        if (!this.orderData.theirPrice) {
          let theirPrice =  this.requestParam.dwPrice
            - (this.requestParam.dwPrice * 0.075 + 38 + 8.5)
          this.requestParam.theirPrice = parseFloat(theirPrice).toFixed(2)
        } else {
          this.requestParam.theirPrice = this.orderData.theirPrice
        }
        if (!this.orderData.profits) {
          let profits = this.requestParam.theirPrice - 10
            - this.requestParam.price
          this.requestParam.profits = parseFloat(profits).toFixed(2)
        } else {
          this.requestParam.profits = this.orderData.profits
        }
        this.isShowDialog = true
      }
    }
  };
</script>

<style>

  @import '../assets/index/style.css';

  /*.mint-button--default.is-plain {*/
  /*  border: 1px solid #409EFF;*/
  /*  background-color: transparent;*/
  /*  box-shadow: none;*/
  /*  color: #409EFF;*/
  /*}*/
  /*.popupdiv {*/
  /*  border-top: 1vw solid #eee;*/
  /*  display: flex;*/
  /*  padding-left: 22vw ;*/
  /*}*/
  /*.mt-button-div{*/
  /*  margin-bottom: 3vw;margin-top: 2vw;margin-left: 1vw;margin-right: 2vw;*/
  /*}*/
  /*弹窗 end*/

  /*.all_orders {*/
  /*  background: #ffffff !important;*/
  /*  font-size: 3.5vw;*/
  /*}*/
  /*.dingdans {*/
  /*  padding-left: 2%;*/
  /*  width: 96%;*/
  /*}*/
  strong{
    font-weight: 600;
  }
  .mint-button--small {
    display: inline-block;
    font-size: 4vw;
    height: 6vw;
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
  /* 给要上拉的容器设置 end */
  /*.fl {*/
  /*  float: left;*/
  /*}*/
  /*.fr {*/
  /*  float: right;*/
  /*}*/
  /*.clearfix::before,*/
  /*.clearfix::after {*/
  /*  content: "";*/
  /*  display: block;*/
  /*  overflow: hidden;*/
  /*  clear: both;*/
  /*  visibility: hidden;*/
  /*}*/
  /*li {*/
  /*  background: #fff;*/
  /*}*/
  /*.order-intr {*/
  /*  position: relative;*/
  /*  padding: 0.3rem 0.4rem;*/
  /*  width: calc(100% - 0.6rem);*/
  /*  margin: 0.4rem auto;*/
  /*  border: 0.02rem solid #666;*/
  /*  border-radius: 0.16rem;*/
  /*}*/
  /*.order-intr img {*/
  /*  width: 3rem;*/
  /*  height: 2.4rem;*/
  /*}*/
  /*.title {*/
  /*  margin-left: 0.24rem;*/
  /*  text-align: left;*/
  /*}*/
  /*.title h3 {*/
  /*  font-size: 0.4rem;*/
  /*}*/
  /*.title p {*/
  /*  font-size: 0.3rem;*/
  /*}*/
  /*.price {*/
  /*  position: absolute;*/
  /*  right: 0.3rem;*/
  /*  bottom: 0.3rem;*/
  /*  font-size: 0.5rem;*/
  /*  color: #fe696b;*/
  /*}*/
  .mint-loadmore-top,
  .mint-loadmore-bottom {
    font-size: 0.28rem;
  }





</style>
