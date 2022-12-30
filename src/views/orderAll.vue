<template>
  <div class="hello">
    <mt-header title="订单中心">
      <div slot="left">
        <mt-button  icon="back" @click="$router.go(-1)"></mt-button>
      </div>
    </mt-header>
    <mt-loadmore
      :top-method="loadTop"
      :bottom-method="loadBottom"
      :bottom-all-loaded="allLoaded"
      @top-status-change="handleTopChange"
      @bottom-status-change="handleBottomChange"
      :autoFill="false"
      ref="loadmore"
    >
      <div class="dingdans_item" v-for="(item,index) in tableData" :key="index">
        <div class="dingdans_top">
          <div class="dingdans_top_left">
            订单编号：<strong>{{item.orderNo}}</strong>
          </div>
          <div class="dingdans_top_right">
            状态：<strong>{{ item.status | dictToDescTypeValue(37) }} </strong>
          </div>
        </div>
        <div class="dingdans_con">
          <div class="dingdans_con_left" @click="avatarShow(item.imgUrl)">
            <img v-bind:src="fileUrl + item.imgUrl" alt="" >
          </div>
          <div class="diangdans_con_right">
            <div class="dingdans_con_right_top">
              货号：<strong>{{item.actNo}} </strong> 尺码：<strong>{{item.size}}</strong>
            </div>
            <div class="dingdans_con_right_down">
              <span v-if="item.profits">利润：<strong class="color-danger">{{item.profits}}</strong></span>
              <span v-if="item.theirPrice">到手价：<strong>{{item.theirPrice}}</strong></span>
              入库价：<strong>{{item.price}}</strong>
            </div>
            <div class="dingdans_con_right_down_1">
              <mt-button
                type="primary"
                size="small"
                @click="handleClick(item)">修改状态</mt-button>
              <mt-button
                type="primary"
                size="small"
                @click="changeStatusDialog1(item)">修改地址</mt-button>
            </div>
          </div>
        </div>
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
    <p v-if="allLoaded" class="to-the-bottom">人家是有底线的 -.-</p>
    <mt-popup
      v-model="isShowDialog">
      <mt-header title="交易成功">
        <div slot="right">
          <mt-button size="normal"  @click="isShowDialog = false" style="font-size: 16px">关闭</mt-button>
        </div>
        <div slot="left">
          <mt-button size="normal" @click="confirmHandle" style="font-size: 16px">确定</mt-button>
        </div>
      </mt-header>
      <section style="height: 135vw;width: 80vw">
        <mt-field label="货号" v-model="orderData.actNo" :readonly="true"></mt-field>
        <mt-field label="尺码" v-model="orderData.size" :readonly="true"></mt-field>
        <mt-field label="状态">
            <select style=";" v-model="requestParam.status">
              <option :disabled="true" value="" selected>请选择</option>
              <option v-for="x in statusList" :value="x.fieldValue">{{x.fieldName}}</option>
            </select>
        </mt-field>
        <mt-field label="入库价" placeholder="请输入入库价" @keyup.native="keyup1($event)" type="number" v-model="requestParam.price"></mt-field>
        <mt-field label="出售价格" placeholder="请输入出售价格" @keyup.native="keyup1($event)" type="number" v-model="requestParam.shelvesPrice"></mt-field>
        <mt-field label="补贴价格" placeholder="请输入补贴价格" @keyup.native="keyup1($event)" type="number" v-model="requestParam.subsidiesPrice"></mt-field>
        <mt-field label="手续费" placeholder="请输入手续费" @keyup.native="keyup1($event)" type="number" v-model="requestParam.poundage"></mt-field>
        <mt-field label="运费" placeholder="请输入运费" @keyup.native="keyup1($event)" type="number" v-model="requestParam.freight"></mt-field>
        <mt-field label="到手价" placeholder="请输入到手价" @keyup.native="keyup1($event)" type="number" v-model="requestParam.theirPrice"></mt-field>
        <mt-field label="利润" placeholder="请输入利润" @keyup.native="keyup1($event)" type="number" v-model="requestParam.profits"></mt-field>
<!--        <div class="popupdiv" >-->
<!--          <mt-button type="default" class="mt-button-div" size="normal"  @click="isShowDialog = false">取消</mt-button>-->
<!--          <mt-button type="primary" class="mt-button-div" size="normal" @click="confirmHandle">确认</mt-button>-->
<!--        </div>-->
      </section>
    </mt-popup>
    <mt-popup
      v-model="isShowDialog1">
      <mt-header title="修改地址" >
        <div slot="right">
          <mt-button size="normal"  @click="isShowDialog1 = false" style="font-size: 16px">关闭</mt-button>
        </div>
        <div slot="left">
          <mt-button size="normal" @click="updateAddress" style="font-size: 16px">确定</mt-button>
        </div>
      </mt-header>
      <section style="height: 85vw;width: 80vw">
        <mt-field label="货号"  v-model="orderData1.actNo" :readonly="1==1"></mt-field>
        <mt-field label="尺码" v-model="orderData1.size" :readonly="1==1"></mt-field>
        <mt-field label="运费" placeholder="请输入运费"  type="number" v-model="requestParam1.freight"></mt-field>
        <mt-field label="运单号" placeholder="请输入运单号"  v-model="requestParam1.waybillNo"></mt-field>
        <mt-field label="地址">
            <select  v-model="requestParam1.addressId">
          <option :disabled="true" value="" selected>请选择</option>
              <option v-for="x in addressList" :value="x.fieldValue">{{x.fieldName}}</option>
            </select>
        </mt-field>
      </section>
    </mt-popup>
    <div class="popContainer" v-if="pictureZoomShow" @click="pictureZoomShow = false">
      <div class="imageShow">
        <img :src="fileUrl + imageZoom" alt="" width="100%" height="100%">
      </div>
    </div>
    <v-footer></v-footer>
  </div>
</template>
<script>
  import Baseline from '@/common/_baseline.vue'
  import Footer from '@/common/_footer.vue'
  import { goodsOrderApi } from '@/api/goodsOrder'

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
          id: '',
          waybillNo: '',
          freight: '',
          addressId: ''
        },
        requestParam: {
          id: '',
          status: 7,
          price: '',
          shelvesPrice: '',
          subsidiesPrice: '',
          freight: '',
          poundage: '',
          theirPrice: '',
          profits: ''
        },
        // popupVisible: false,
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
          keyword: '',
          orderNo: '',
          inventoryId: '',
          status: '',
          shelvesPriceFrom: '',
          shelvesPriceTo: '',
          freightFrom: '',
          freightTo: '',
          poundageFrom: '',
          poundageTo: '',
          theirPriceFrom: '',
          theirPriceTo: '',
          addressId: '2',
          waybillNo: '',
          createTimeFrom: '',
          createTimeTo: '',
          updateTimeFrom: '',
          updateTimeTo: '',
          sellTimeFrom: '',
          sellTimeTo: '',
          successTimeFrom: '',
          successTimeTo: '',
          pageSize: 10,
          pageNum: 1
        },
        topStatus: "",
        bottomStatus: "",
        allLoaded: false,
        mockArr: [],
        addressList: [],
        statusList: [],
        dataStatusList: [],
        sellTime: '',
        successTime: '',
        createTime: '',
        updateTime: '',
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
      const { actNo } = this.$route.query
      this.queryParam.keyword = actNo
      if (this.queryParam.keyword) {
        this.getPage()
      }
      // let timer = setTimeout(_ => {
      //   clearTimeout(timer);
      //   this.loadData('refresh');
      // }, 200);
    },
    mounted() {
      this.getPage()
      this.listSysDict()
    },
    methods: {
      getPage() {
        goodsOrderApi.page(this.queryParam).then(res => {
          if (res.subCode === 1000) {
            this.tableData = res.data ? res.data.list : []
            this.totalCount = res.data ? res.data.pageInfo.totalCount : 0
          } else {
            this.$message.error(res.subMsg)
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
        goodsOrderApi.page(this.queryParam).then(res => {
          if (res.subCode === 1000) {
            let list =  res.data ? res.data.list : []
            if (list && list.length) {
              for (let i = 0; i < list.length; i++) {
                this.tableData.push(list[i])
              }
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
        let profits = this.requestParam.theirPrice - this.requestParam.freight
          - this.requestParam.price
        this.requestParam.profits = parseFloat(profits).toFixed(2)
      },
      confirmHandle() {
        // 利润= 到手价-运费-原价
        let profits = this.requestParam.theirPrice - this.requestParam.freight
          - this.requestParam.price
        this.requestParam.profits = parseFloat(profits).toFixed(2)

        // 出售
        goodsOrderApi.sellGoods(this.requestParam).then(res => {
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
        this.requestParam1.id = this.orderData1.id
        this.requestParam1.freight = this.orderData1.freight
        this.requestParam1.waybillNo = this.orderData1.waybillNo
        this.requestParam1.addressId = this.orderData1.addressId

        this.isShowDialog1 = true
      },
      handleClick(orderData) {
        this.orderData = orderData
        this.requestParam.id = this.orderData.id
        this.requestParam.price = this.orderData.price
        this.requestParam.shelvesPrice = this.orderData.shelvesPrice
        this.requestParam.subsidiesPrice = this.orderData.subsidiesPrice
        this.requestParam.freight = this.orderData.freight
        // let poundage = this.requestParam.shelvesPrice * 0.075 + 38 + 8.5
        // this.requestParam.poundage = parseFloat(poundage).toFixed(2)
        if (!this.orderData.poundage) {
          let poundage = this.requestParam.shelvesPrice * 0.075 + 38 + 8.5
          this.requestParam.poundage = parseFloat(poundage).toFixed(2)
        } else {
          this.requestParam.poundage = this.orderData.poundage
        }
        if (!this.orderData.theirPrice) {
          let theirPrice = this.requestParam.subsidiesPrice * 1 + this.requestParam.shelvesPrice
            - (this.requestParam.shelvesPrice * 0.075 + 38 + 8.5)
          this.requestParam.theirPrice = parseFloat(theirPrice).toFixed(2)
        } else {
          this.requestParam.theirPrice = this.orderData.theirPrice
        }
        if (!this.orderData.profits) {
          let profits = this.requestParam.theirPrice - this.requestParam.freight
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
    width: 20vw;
    height: 20vw;
  }

  .dingdans_con_left img {
    width: 100%;
    height: 100%;
  }

  .diangdans_con_right {
    padding-left: 1.3vw;
  }

  .dingdans_con_right_down {
    margin-top: 1.4vw;
    font-size: 3.5vw;
    margin-bottom: 2vw;
  }
  .dingdans_con_right_down_1 {
    margin-left: 26vw;
    margin-bottom: -7vw;
    font-size: 3.5vw;
  }
  .color-danger {
    color: #F56C6C;
  }
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
    background: #ffffff !important;
    font-size: 3.5vw;
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
