<template>
  <div class="all_orders">
    <!-- 引入头部公用模板 -->
<!--    <mt-header title="订单中心"></mt-header>-->
    <mt-header title="订单中心">
      <div slot="left">
        <mt-button  icon="back" @click="$router.go(-1)"></mt-button>
      </div>
    </mt-header>
    <div class="dingdans">
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
          <div v-if="item.img" :src="item.img" class="dingdans_con_left" @click="avatarShow(item.img)">
            <img :src="item.img">
          </div>
          <div v-if="!item.img && item.imgUrl" :src="item.img" class="dingdans_con_left" @click="avatarShow(fileUrl+ item.imgUrl)">
            <img :src="fileUrl + item.imgUrl">
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
      </mt-loadmore>
      <div slot="top" class="mint-loadmore-top">
        <span v-show="topStatus !== 'loading'" :class="{ 'rotate': topStatus === 'drop' }">松手释放↓</span>
        <span v-show="topStatus === 'loading'">加载中</span>
      </div>
      <div slot="bottom" class="mint-loadmore-bottom">
        <span
          v-show="bottomStatus !== 'loading'"
          :class="{ 'rotate': bottomStatus === 'drop' }"
        >松手释放↑</span>
        <span v-show="bottomStatus === 'loading'">加载中</span>
      </div>
      <p v-if="allLoaded" class="to-the-bottom">我是有底线的</p>
    </div>
    <mt-popup
      v-model="isShowDialog">
      <mt-header title="交易成功">
        <div slot="right">
          <mt-button size="small" @click="isShowDialog = false">关闭</mt-button>
        </div>
      </mt-header>
      <section style="height: 153vw;width: 80vw">
        <mt-field label="货号" v-model="orderData.actNo" :readonly="1==1"></mt-field>
        <mt-field label="尺码" v-model="orderData.size" :readonly="1==1"></mt-field>
        <mt-field label="地址">
            <select style="width: 40vw;font-size: 3.5vw;" v-model="requestParam.status">
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
        <div class="popupdiv" >
          <mt-button type="default" class="mt-button-div" size="normal"  @click="isShowDialog = false">取消</mt-button>
          <mt-button type="primary" class="mt-button-div" size="normal" @click="confirmHandle">确认</mt-button>
        </div>
      </section>
    </mt-popup>
    <mt-popup
      v-model="isShowDialog1">
      <mt-header title="修改地址">
        <div slot="right">
          <mt-button size="small" @click="isShowDialog1 = false">关闭</mt-button>
        </div>
      </mt-header>
      <section style="height: 90vw;width: 80vw">
        <mt-field label="货号" v-model="orderData1.actNo" :readonly="1==1"></mt-field>
        <mt-field label="尺码" v-model="orderData1.size" :readonly="1==1"></mt-field>
        <mt-field label="运费" placeholder="请输入运费"  type="number" v-model="requestParam1.freight"></mt-field>
        <mt-field label="运单号" placeholder="请输入运单号"  v-model="requestParam1.waybillNo"></mt-field>
        <mt-field label="地址">
            <select style="width: 40vw;font-size: 3.5vw;" v-model="requestParam1.addressId">
             <option :disabled="true" value="" selected>请选择</option>
              <option v-for="x in addressList" :value="x.fieldValue">{{x.fieldName}}</option>
            </select>
        </mt-field>
        <div class="popupdiv" >
          <mt-button type="default" class="mt-button-div" size="normal"  @click="isShowDialog1 = false">取消</mt-button>
          <mt-button type="primary" class="mt-button-div" size="normal" @click="updateAddress">确认</mt-button>
        </div>
      </section>
    </mt-popup>
<!--    <mt-popup v-model="popupVisible" position="bottom" class="mint-popup" style="width: 100%;height: 30%;">-->
<!--      <mt-header title="选择地址">-->
<!--        <div slot="left">-->
<!--          <mt-button size="small" @click="cancelp(1)">取消</mt-button>-->
<!--        </div>-->
<!--        <div slot="right">-->
<!--          <mt-button size="small" @click="cancelp(2)">确定</mt-button>-->
<!--        </div>-->
<!--      </mt-header>-->
<!--&lt;!&ndash;      <mt-picker  :slots="slots" @change="onValuesChange" value-key="fieldName"></mt-picker>&ndash;&gt;-->
<!--      <mt-picker :slots="slots" @change="onValuesChange" :visible-item-count="5" :show-toolbar="false"  ref="picker" value-key="fieldName"></mt-picker>-->
<!--    </mt-popup>-->
    <div class="popContainer" v-if="pictureZoomShow" @click="pictureZoomShow = false">
      <div class="imageShow">
        <img :src="fileUrl + imageZoom" alt="" width="100%" height="100%">
      </div>
    </div>
    <v-baseline></v-baseline>
    <v-footer></v-footer>
  </div>
</template>
<script>
  import Baseline from '@/common/_baseline.vue'
  import Footer from '@/common/_footer.vue'
  import { goodsOrderApi } from '@/api/goodsOrder'
  import { MessageBox } from 'mint-ui';
  export default {
    components: {
      'v-baseline': Baseline,
      'v-footer': Footer
    },
    data() {
    //   return {
    //     fileUrl: fileUrl,
    //     orders: [],
    //     newTitle: '订单中心',
    //   }
    // },
    return {
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
        pageSize: 20,
        pageNum: 1
      },
      topStatus: "",
      bottomStatus: "",
      allLoaded: false,
      mockArr: [],
      number: 0,
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
  created() {
    // const { actNo } = this.$route.query
    // this.queryParam.keyword = actNo
    // if (this.queryParam.keyword) {
    //   // this.getPage()
    // }
    let timer = setTimeout(_ => {
      clearTimeout(timer);
      this.loadData('refresh');
    }, 200);
  },
  mounted() {
    // this.getPage()
    this.listSysDict()
  },
  methods:{
    loadData(p_status) {
      // 第一次加载或者下拉刷新最新数据
      if (p_status === "refresh") {
        this.tableData = [];
      }
      goodsOrderApi.page(this.queryParam).then(res => {
        if (res.subCode === 1000) {
          let list =  res.data ? res.data.list : []
          for (let i = 0; i < list.length; i++) {
            this.tableData.push(list[i])
          }
          // this.totalCount = res.data ? res.data.pageInfo.totalCount : 0
        } else {
          this.$toast(res.subMsg)
          return false
        }
      })
      // for (let i = 0; i < 5; ) {
      //   let obj = {
      //     cover: "/static/img/logo/logo.png",
      //     title: "奥尔良鸡中翅饭",
      //     num: 1,
      //     price: 14.88
      //   };
      //   obj["id"] = this.mockArr.length + 1;
      //   if (i % 2) {
      //     obj["cover"] = "/static/img/logo/logo.png";
      //     obj["title"] = "猪扒饭";
      //     obj["num"] += 1;
      //     obj["price"] -= 1;
      //   }
      //   i++;
      //   this.mockArr.push(obj);
      // }
      // this.list = this.mockArr;
    },
    handleTopChange(p_status) {
      this.topStatus = p_status;
    },
    handleBottomChange(p_status) {
      this.bottomStatus = p_status;
    },
    loadBottom() {
      alert(1)
      // 一次下拉加载5条更多数据，使用定时器默认ajax加载
      this.loadData()
      this.number++;
      // allLoaded 设置为 true 时,表示数据已全部获取完毕不需要再出现上拉加载更多
      if (this.number === 3) {
        this.allLoaded = true;
      }
      this.$refs.loadmore.onBottomLoaded();
    },
    loadTop() {
      alert(2)
      // 默认下拉刷新最新数据
      this.loadData("refresh");
      this.number = 0;
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
      },
      getPage() {
        goodsOrderApi.page(this.queryParam).then(res => {
          if (res.subCode === 1000) {
            this.tableData = res.data ? res.data.list : []
            this.totalCount = res.data ? res.data.pageInfo.totalCount : 0
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
        // console.info(this.addressList)
        // this.slots =
        // {
        //   flex: 1,
        //   values: this.addressList,
        //   // values: [{"id":"1175188438572470272","typeValue":"38","typeName":"地址","fieldValue":"1","fieldName":"上海-龙盘路888号","sort":1},{"id":"1175188472399532032","typeValue":"38","typeName":"地址","fieldValue":"2","fieldName":"广州-山门大道700号","sort":2},{"id":"1175188504641146880","typeValue":"38","typeName":"地址","fieldValue":"3","fieldName":"四川成都-南六路1号","sort":3},{"id":"1175188529051996160","typeValue":"38","typeName":"地址","fieldValue":"4","fieldName":"湖北武汉-临空北路100号","sort":4},{"id":"1175188552649150464","typeValue":"38","typeName":"地址","fieldValue":"5","fieldName":"河北廊坊-富文道888号","sort":5},{"id":"1175188588107796480","typeValue":"38","typeName":"地址","fieldValue":"6","fieldName":"上海-彭封路333号","sort":6}],
        //   className: 'slot1',
        //   textAlign: 'center'
        // }
        // this.slots.values =  ['男','女']
        // this.slots.values = this.addressList
        // console.info(JSON.stringify(this.slots.values) )
      },
      // tab: function(index) {
      //   console.log(index)
      //   const _this = this
      //   _this.tabindex = index
      // }
    }
  }
</script>
<style scoped>

  @import '../assets/index/style.css';
  .mint-button--default.is-plain {
    border: 1px solid #409EFF;
    background-color: transparent;
    box-shadow: none;
    color: #409EFF;
  }
  .mint-button--small {
    display: inline-block;
    font-size: 4vw;
    /*padding: 0 12px;*/
    height: 6vw;
  }
  .popupdiv {
    border-top: 1vw solid #eee;
    position: fixed;
    bottom: 0;
    display: flex;
    padding-left: 25vw ;
    width: 68%;
  }
  .mt-button-div{
    margin-bottom: 3vw;margin-top: 2vw;margin-left: 1vw;margin-right: 2vw;
  }
  /*弹窗 end*/
  strong{
    font-weight: 600;
  }
  .all_orders {
    background: #ffffff !important;
    font-size: 3.5vw;
  }
  .dingdans {
    padding-left: 2%;
    width: 96%;
  }
  .dingdans_item {
    padding: 2.4vw 1.0vw;
    background: #ffffff;
    /*margin-bottom: 1.2vw;*/
    border-bottom: 1vw solid #eee;
  }

  .dingdans_top {
    font-size: 3.5vw;
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
    width: 130vw;
    padding-left: 10px;
  }

  .dingdans_con_right_down {
    margin-top: 1.4vw;
    font-size: 3.5vw;
    margin-bottom: 2vw;
  }
  .dingdans_con_right_down_1 {
    margin-left: 25vw;
    margin-bottom: -7vw;
    font-size: 3.5vw;
  }
  .color-danger {
    color: #F56C6C;
  }

  .color-success {
    color: #0fbe8f;
  }
  .mint-loadmore-top,
  .mint-loadmore-bottom {
    font-size: 0.28rem;
  }
  /* 我是有底线的 begin */
  .to-the-bottom {
    position: relative;
    color: #999999;
    font-size: 0.32rem;
    text-align: center;
    padding: 0.1rem 0;
    background: #f1eded;
  }
  .to-the-bottom::before,
  .to-the-bottom::after {
    position: absolute;
    top: 50%;
    height: 0.02rem;
    width: 25%;
    margin-top: -0.01rem;
    background: #999;
    content: "";
  }
  .to-the-bottom::before {
    left: 10%;
  }
  .to-the-bottom::after {
    right: 10%;
  }
  /* 我是有底线的 end */
</style>
