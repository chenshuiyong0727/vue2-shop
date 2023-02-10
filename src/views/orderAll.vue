<template>
  <div class="hello">
    <mt-header :title="titleName">
      <div slot="left">
        <mt-button  icon="back" @click="$router.go(-1)"></mt-button>
      </div>
    </mt-header>
    <div class="fenlei_top">
      <div    class="fenlei_top_left">
        <input type="text" v-model.trim="queryParam.keyword" placeholder="搜索货号" class="ins">
      </div>
      <div class="fenlei_top_right" >
        <mt-button
          style="margin-left: -65px"
          type="primary"
          size="small"
          @click="search">搜索</mt-button>
        <mt-button
          style="
           padding-top: 1.3px;
           margin-left: 12px;
           width: 67px;"
          type="primary"
          size="small"
          @click="isShowDialog2 = true">  <img style="margin-left: -10px;" src="../../static/img/choose.png" height="20" width="20" slot="icon">
          <span style="margin-left: -5px;">筛选</span>
          </mt-button>
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
      <div class="dingdans_item" v-for="(item,index) in tableData" :key="index">
        <div class="dingdans_top">
          <div class="dingdans_top_left">
            <strong>{{item.orderNo}}</strong>
          </div>
          <div class="dingdans_top_right">
            <strong v-if="item.status == 7" class="color-success" >{{ item.status | dictToDescTypeValue(37) }} </strong>
            <strong v-else-if="[3,4,5,6,8].includes(item.status)" class="color-danger" >{{ item.status | dictToDescTypeValue(37) }} </strong>
            <strong v-else>{{ item.status | dictToDescTypeValue(37) }} </strong>
          </div>
        </div>
        <div class="dingdans_con">
          <div class="dingdans_con_left" @click="avatarShow(item.imgUrl)">
            <img v-bind:src="fileUrl + item.imgUrl" alt="" >
          </div>
          <div class="diangdans_con_right">
            <div class="dingdans_con_right_top">
              货号：<strong style="color: #409EFF"  @click="jumpactNo(item.actNo)">{{item.actNo}} </strong> 尺码：<strong>{{item.size}}</strong> 售价：<strong>{{item.shelvesPrice}}</strong>
            </div>
            <div class="dingdans_con_right_down">
              <span v-if="item.profits">利润：<strong class="color-danger">{{item.profits}}</strong></span>
              <span v-if="item.theirPrice">到手：<strong>{{item.theirPrice}}</strong></span>
              入库价：<strong>{{item.price}}</strong>
            </div>
            <div class="dingdans_con_right_down_1">
              <mt-button
                type="primary"
                size="small"
                @click="jumpactNo(item.actNo)">查看库存</mt-button>
              <mt-button
                type="primary"
                size="small"
                @click="goDetail(item.id)">详情</mt-button>
              <mt-button
                type="primary"
                size="small"
                @click="handleClick(item)">修改</mt-button>
<!--              <mt-button-->
<!--                type="primary"-->
<!--                size="small"-->
<!--                @click="changeStatusDialog1(item)">修改地址</mt-button>-->
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
    <p v-if="allLoaded" class="to-the-bottom">{{emtityMsg}}</p>
    <mt-popup
      v-model="isShowDialog">
      <mt-header title="修改">
        <div slot="right">
          <mt-button size="normal"  @click="isShowDialog = false" style="font-size: 16px">关闭</mt-button>
        </div>
        <div slot="left">
          <mt-button size="normal" @click="confirmHandle" style="font-size: 16px">确定</mt-button>
        </div>
      </mt-header>
      <section style="height: 130vw;width: 80vw">
        <mt-field label="货号" style="margin-top: 11vw;" v-model="orderData.actNo" :disabled="true"></mt-field>
        <mt-field label="尺码" v-model="orderData.size" :disabled="true"></mt-field>
        <mt-field label="运单号" placeholder="请输入运单号"  v-model="requestParam.waybillNo"></mt-field>
        <mt-field label="地址">
            <select class="select80" v-model="requestParam.addressId">
          <option :disabled="true" value="" selected>请选择</option>
              <option v-for="x in addressList" :value="x.fieldValue">{{x.fieldName}}</option>
            </select>
        </mt-field>
        <mt-field label="状态">
            <select  class="select80" v-model="requestParam.status">
              <option :disabled="true" value="" selected>请选择</option>
              <option v-for="x in statusList" :value="x.fieldValue">{{x.fieldName}}</option>
            </select>
        </mt-field>
        <mt-field label="入库价" placeholder="请输入入库价" @keyup.native="keyup1($event)" type="number" v-model="requestParam.price"></mt-field>
        <mt-field label="出售价格" placeholder="请输入出售价格" @keyup.native="keyup1($event)" type="number" v-model="requestParam.shelvesPrice"></mt-field>
        <mt-field label="补贴价格" placeholder="请输入补贴价格" @keyup.native="keyup1($event)" type="number" v-model="requestParam.subsidiesPrice"></mt-field>
        <mt-field label="手续费" placeholder="请输入手续费" @keyup.native="keyup1($event)" type="number" v-model="requestParam.poundage"></mt-field>
        <mt-field label="运费" placeholder="请输入运费" @keyup.native="keyup1($event)" type="number" v-model="requestParam.freight"></mt-field>
        <mt-field label="到手价" placeholder="请输入到手价" @keyup.native="keyup2($event)" type="number" v-model="requestParam.theirPrice"></mt-field>
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
        <mt-field label="货号" style="margin-top: 11vw;" v-model="orderData1.actNo" :readonly="1==1"></mt-field>
        <mt-field label="尺码" v-model="orderData1.size" :readonly="1==1"></mt-field>
        <mt-field label="运费" placeholder="请输入运费"  type="number" v-model="requestParam1.freight"></mt-field>
        <mt-field label="运单号" placeholder="请输入运单号"  v-model="requestParam1.waybillNo"></mt-field>
        <mt-field label="地址">
            <select class="select80" v-model="requestParam1.addressId">
              <option :disabled="true" value="" selected>请选择</option>
              <option v-for="x in addressList" :value="x.fieldValue">{{x.fieldName}}</option>
            </select>
        </mt-field>
      </section>
    </mt-popup>
    <mt-popup
      position="bottom"
      v-model="isShowDialog2">
      <mt-header title="筛选" >
        <div slot="right">
          <mt-button size="normal"  @click="resetHandle" style="font-size: 16px"> 重置（关闭）</mt-button>
        </div>
        <div slot="left">
          <mt-button size="normal" @click="search1" style="font-size: 16px">确定</mt-button>
        </div>
      </mt-header>
      <section style="height: 80vw;width: 100vw">
        <mt-field label="状态" style="margin-top: 11vw;">
            <select class="select100" v-model="queryParam.status" @change="changeSystem">
               <option :disabled="true" value="" selected>请选择状态</option>
              <option v-for="x in statusList" :value="x.fieldValue">{{x.fieldName}}</option>
            </select>
        </mt-field>
        <mt-field label="地址">
            <select class="select100" v-model="queryParam.addressId">
          <option :disabled="true" value="" selected>请选择地址</option>
              <option v-for="x in addressList" :value="x.fieldValue">{{x.fieldName}}</option>
            </select>
        </mt-field>
<!--        <mt-field label="成功开始时间">-->
<!--          <mt-button-->
<!--            type="primary"-->
<!--            size="small"-->
<!--            @click="open('picker1')">选择时间</mt-button>-->
<!--        </mt-field>-->
<!--        <mt-field label="成功结束时间">-->
<!--          <mt-button-->
<!--            type="primary"-->
<!--            size="small"-->
<!--            @click="open('picker1')">选择时间</mt-button>-->
<!--        </mt-field>-->
        <mt-field label="成功开始时间" type="date" placeholder="成功开始时间"  v-model="queryParam.successTimeFrom" ></mt-field>
        <mt-field label="成功结束时间" type="date" placeholder="成功结束时间"  v-model="queryParam.successTimeTo" ></mt-field>
        <mt-field label="运单号" placeholder="请输入运单号"  v-model="queryParam.waybillNo"></mt-field>
        <mt-field label="订单号" placeholder="请输入订单号"  v-model="queryParam.orderNo"></mt-field>
        <mt-field label="尺码" placeholder="请输入尺码"  v-model="queryParam.size"></mt-field>
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
          profits: '',
          waybillNo: '',
          addressId: ''
        },
        // popupVisible: false,
        titleName: '订单',
        emtityMsg: '人家是有底线的 -.-',
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
          size: '',
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
          addressId: '',
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
      const { actNo,status } = this.$route.query
      this.queryParam.keyword = actNo
      this.status = status
      this.queryParam.status = status
      if (this.queryParam.keyword || this.queryParam.status) {
        if(this.queryParam.status){
          this.changeSystem()
        }
        this.search1()
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
        goodsOrderApi.page(this.queryParam).then(res => {
          if (res.subCode === 1000) {
            this.tableData = res.data ? res.data.list : []
            this.totalCount = res.data ? res.data.pageInfo.totalCount : 0
            if (this.totalCount == 0) {
              this.allLoaded = true;
              this.emtityMsg = '暂无相关订单 -.-'
            } else if (this.totalCount <= this.queryParam.pageSize) {
              this.allLoaded = true;
              this.emtityMsg = '人家是有底线的 -.-'
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
        goodsOrderApi.page(this.queryParam).then(res => {
          if (res.subCode === 1000) {
            let list =  res.data ? res.data.list : []
            if (list && list.length) {
              for (let i = 0; i < list.length; i++) {
                this.tableData.push(list[i])
              }
            } else {
              this.allLoaded = true;
              this.emtityMsg = '人家是有底线的 -.-'
              this.$toast('没有更多了')
            }
          } else {
            this.$toast(res.subMsg)
            return false
          }
        })
      },
      search() {
        if (!this.queryParam.keyword ) {
          this.$toast('请输入关键字')
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
        let sysDictList = localStorage.getItem('sysDictList') ? JSON.parse(
          localStorage.getItem('sysDictList')) : []
        let res = sysDictList.filter(
          item => item.typeValue == 37 && item.fieldValue == this.queryParam.status)
        this.titleName = res.length ? res[0].fieldName : ''
        this.titleName = this.titleName + '订单'
      },
      search1() {
        this.queryParam.pageNum = 1
        this.allLoaded = false;
        this.isShowDialog2 = false
        this.getPage()
      },
      resetHandle() {
        this.queryParam = {
          id: '',
          keyword: '',
          size: '',
          orderNo: '',
          inventoryId: '',
          status: this.status,
          shelvesPriceFrom: '',
          shelvesPriceTo: '',
          freightFrom: '',
          freightTo: '',
          poundageFrom: '',
          poundageTo: '',
          theirPriceFrom: '',
          theirPriceTo: '',
          addressId: '',
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
        }
        this.titleName = '订单'
        this.createTime = ''
        this.updateTime = ''
        this.sellTime = ''
        this.successTime = ''
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
        // let theirPrice =  this.requestParam.subsidiesPrice * 1
        //   +  this.requestParam.shelvesPrice - (this.requestParam.shelvesPrice * 0.075 + 38 + 8.5)
        // // let theirPrice = this.requestParam.theirPrice - this.requestParam.freight
        // //   - this.theirPrice.price
        // this.requestParam.profits = parseFloat(theirPrice).toFixed(2)
        //
        // let profits = this.requestParam.theirPrice - this.requestParam.freight
        //   - this.requestParam.price
        // this.requestParam.profits = parseFloat(profits).toFixed(2)

        let poundage = this.requestParam.shelvesPrice * 0.075 + 38 + 8.5
        this.requestParam.poundage = parseFloat(poundage).toFixed(2)

        let theirPrice = this.requestParam.subsidiesPrice * 1 + this.requestParam.shelvesPrice
          - (this.requestParam.shelvesPrice * 0.075 + 38 + 8.5)
        this.requestParam.theirPrice = parseFloat(theirPrice).toFixed(2)

        let profits = this.requestParam.theirPrice - this.requestParam.freight
          - this.requestParam.price
        this.requestParam.profits = parseFloat(profits).toFixed(2)
      },
      keyup2() {
        let poundage = this.requestParam.shelvesPrice * 0.075 + 38 + 8.5
        this.requestParam.poundage = parseFloat(poundage).toFixed(2)

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
      jumpactNo(actNo) {
        this.$router.push({ path: '/store', query: { actNo } })
      },
      goDetail(id) {
        this.$router.push({ path: '/orderDetail', query: { id } })
      },
      handleClick(orderData) {
        this.orderData = orderData
        this.requestParam.id = this.orderData.id
        this.requestParam.price = this.orderData.price
        this.requestParam.shelvesPrice = this.orderData.shelvesPrice
        this.requestParam.subsidiesPrice = this.orderData.subsidiesPrice
        this.requestParam.freight = this.orderData.freight
        this.requestParam.waybillNo = this.orderData.waybillNo
        this.requestParam.addressId = this.orderData.addressId
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
    display: flex;
  }

  .dingdans_con_left img {
    width: 100%;
    margin: auto;
    border-radius: 10px;
  }

  .diangdans_con_right {
    padding-left: 1.3vw;
  }

  .dingdans_con_right_down {
    margin-top: 1.4vw;
    font-size: 13px;
    margin-bottom: 2vw;
  }
  .dingdans_con_right_down_1 {
    margin-left: 15vw;
    margin-bottom: -7vw;
    font-size: 3.5vw;
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
    background-color: #F8FCFF;
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
    margin-top:11.6vw;
    /*margin-top:0.85rem;*/
  }

  .fenlei_top_right {
    font-size: 0.32rem;
    color: #353535;
    width: 2rem;
    text-align: center;
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
    width: 76vw;
    /*width: 5.7rem;*/
    padding: 0.2rem;

  }
</style>
