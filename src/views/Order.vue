<template>
  <div class="all_orders">
    <!-- 引入头部公用模板 -->
<!--    <mt-header title="订单中心"></mt-header>-->
    <mt-header title="订单中心">
      <div slot="left">
        <mt-button  icon="back"></mt-button>
      </div>
    </mt-header>
    <div class="dingdans">
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
          <div class="dingdans_con_left">
            <img v-bind:src="fileUrl + item.imgUrl" alt="">
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
                @click="handleClick(item)">交易成功</mt-button>
              <mt-button
                type="primary"
                size="small"
                @click="changeStatusDialog1(item)">修改地址</mt-button>
            </div>
          </div>
        </div>
      </div>
    </div>
    <mt-popup
      v-model="isShowDialog">
      <mt-header title="交易成功">
        <div slot="right">
          <mt-button size="small" @click="isShowDialog = false">关闭</mt-button>
        </div>
      </mt-header>
      <section style="height: 130vw;width: 80vw">
        <mt-field label="货号" v-model="orderData.actNo" :readonly="1==1"></mt-field>
        <mt-field label="尺码" v-model="orderData.size" :readonly="1==1"></mt-field>
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
            <select style="font-size: 3.5vw;" v-model="requestParam1.addressId">
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
      // slots: '',
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
        pageSize: 10,
        pageNum: 1
      },
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
    const { actNo } = this.$route.query
    this.queryParam.keyword = actNo
    if (this.queryParam.keyword) {
      this.getPage()
    }
  },
  mounted() {
    this.getPage()
    this.listSysDict()
  },
  // computed: {
  //   slots () {
  //     let slots = [
  //       {
  //         flex: 1,
  //         values: this.addressList,
  //         className: 'slot1',
  //         textAlign: 'center'
  //       }
  //     ];
  //     return  slots
  //   }
  // },
    //
    // created: function() {
    //   this.getData()
    // },
    methods:{
      // cancelp(index){
      //   if(index===2){
      //     this.popupVisible = false ;
      //   }else{
      //     this.popupVisible = false ;
      //     this.requestParam1.addressId = ''
      //   }
      // },
      // onValuesChange(packer,val){
      //   this.requestParam1.addressId = val[0]
      // },
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
        console.info(this.addressList)
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
<style src="vue-multiselect/dist/vue-multiselect.min.css"></style>
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

  .dingdans_item {
    padding: 2.4vw 1.0vw;
    background: #ffffff;
    /*margin-bottom: 1.2vw;*/
    border-bottom: 1vw solid #eee;
  }

  .dingdans_top {
    font-size: 3.3vw;
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
    font-size: 1.2vw;
    margin-bottom: 2vw;
  }
  .dingdans_con_right_down_1 {
    margin-left: 30vw;
    margin-bottom: -7vw;
    font-size: 1.5vw;
  }
  .color-danger {
    color: #F56C6C;
  }

  .color-success {
    color: #0fbe8f;
  }

</style>
