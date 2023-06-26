<template>
  <div class="hello">
    <mt-header :title="titleName">
<!--      <div slot="right">-->
<!--        <mt-button size="normal"  @click="isShowDialog = false" style="font-size: 16px">首页</mt-button>-->
<!--      </div>-->
      <div slot="left">
        <mt-button  icon="back" @click="$router.go(-1)"></mt-button>
      </div>
    </mt-header>
    <div class="fenlei_top">
      <div    class="fenlei_top_left">
        <input type="text" v-model.trim="queryParam.actNo" placeholder="搜索关键词（货号，商品名）" class="ins">
      </div>
      <div class="fenlei_top_right" @click="isShowDialog2 = true">
        <img src="../../static/img/search.png" height="30px;"width="30px;" >
      </div>
<!--      <div class="fenlei_top_right" >-->
<!--&lt;!&ndash;        <mt-button&ndash;&gt;-->
<!--&lt;!&ndash;          style="margin-left: -65px"&ndash;&gt;-->
<!--&lt;!&ndash;          type="primary"&ndash;&gt;-->
<!--&lt;!&ndash;          size="small"&ndash;&gt;-->
<!--&lt;!&ndash;          @click="search">搜索</mt-button>&ndash;&gt;-->
<!--        <mt-button-->
<!--          style="-->
<!--           padding-top: 1.3px;-->
<!--           margin-left: 6px;-->
<!--           width: 67px;"-->
<!--          type="primary"-->
<!--          size="small"-->
<!--          @click="isShowDialog2 = true">  <img style="margin-left: -10px;" src="../../static/img/choose.png" height="20" width="20" slot="icon">-->
<!--          <span style="margin-left: -5px;">筛选</span>-->
<!--          </mt-button>-->
<!--      </div>-->
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
      <div class="dingdans_item" style="padding-top: 0vw;padding-bottom: 4vw;" v-for="(item,index) in tableData" :key="index">
<!--        <div class="dingdans_top">-->
<!--          <div class="dingdans_top_left">-->
<!--            货号：<strong> {{item.actNo}} </strong>-->
<!--          </div>-->
<!--          <div class="dingdans_top_right">-->
<!--            尺码：<strong>{{item.size }}</strong>-->
<!--          </div>-->
<!--        </div>-->
        <div class="dingdans_con" style="padding : 0 ;">
          <div v-if="item.img" :src="item.img" class="dingdans_con_left" @click="avatarShow(item.img)">
            <img :src="item.img">
          </div>
          <div v-if="!item.img && item.imgUrl" :src="item.img" class="dingdans_con_left" @click="avatarShow(fileUrl+ item.imgUrl)">
            <img :src="fileUrl + item.imgUrl">
          </div>
          <div class="diangdans_con_right">
            <div class="dingdans_con_right_top" style="margin-top: -10px">
              <span @click="scanCode(item.id,1)" v-if="item.name"><strong> {{item.name | sizeFilterNum(50) }}</strong></span>
            </div>
            <div class="dingdans_con_right_down">
<!--              货号：-->
<!--              <strong style="color: #409EFF"  @click="jumpactNo(item.actNo)">{{item.actNo}} </strong>-->
              <span>
                <strong style="color: #409EFF"  @click="jumpactNo(item.actNo)">{{item.actNo}} </strong>
<!--               <strong style="color: #409EFF"  @click="jumpactNo(item.actNo)">{{item.actNo}} </strong>-->
<!--                  <strong @click="WarehouseDetail(item.goodsId ,item.actNo ,item.imgUrl,item.img )" style="color: #409EFF"> {{item.actNo}} </strong>-->
                 <img @click="copyUrl(item.actNo)" style="width: 20px;" src="../../static/img/copy6.png">
             </span>
              <strong> {{item.brand}}</strong>
              <strong> {{ item.type | dictToDescTypeValue(20221108) }}</strong>
            </div>
            <div style="
               margin-bottom: -12vw;
    margin-left: 20vw;
    margin-top: -3vw;">
              <el-button
                style="margin-left: 10.1vw;font-weight: 600;"
                type="text"
                class="color-danger"
                @click="storeAdd(item.id)">选择</el-button>
              <el-button
                style="margin-left: 1vw;font-weight: 600;"
                type="text"
                @click="gotoDw(item.spuId)">得物</el-button>
              <el-button
                style="margin-left: 1vw;font-weight: 600;"
                type="text"
                @click="scanCode(item.id,1)">查看</el-button>
              <el-button
                style="margin-left: 1vw;font-weight: 600;"
                type="text"
                @click="goDetail(item.id,2)">编辑</el-button>
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
<!--            <select class="select100" v-model="queryParam.type" @change="changeSystem" >-->
<!--               <option :disabled="true" value="" selected>请选择类型</option>-->
<!--              <option v-for="x in typeList" :value="x.fieldValue">{{x.fieldName}}</option>-->
<!--            </select>-->
          <el-select size="small" class="select100" v-model="queryParam.type" @change="changeSystem" >
            <el-option :disabled="true" value="" selected>请选择类型</el-option>
            <el-option
              v-for="item in typeList"
              :key="item.fieldValue"
              :label="item.fieldName"
              :value="item.fieldValue">
            </el-option>
          </el-select>
        </mt-field>
        <mt-field label="品牌" placeholder="请输入品牌"  v-model="queryParam.brand"></mt-field>
        <mt-field label="备注" placeholder="请输入备注"  v-model="queryParam.remark"></mt-field>
      </section>
    </mt-popup>
    <div class="popContainer" v-if="pictureZoomShow" @click="pictureZoomShow = false">
      <div class="imageShow">
        <img :src="imageZoom" alt="" width="100%" height="100%">
      </div>
    </div>
    <div style="
    right: 15px;
    bottom: 20vw;
    position: absolute;
    text-align: center;
    ">
      <mt-button  @click="scanCode(null,3)"  style="margin-left: 5px;
    border-radius: 100%;
    margin-top: 0px;
    height: 55px;
    width: 55px;" type="primary">
        <img src="../../static/img/add.png" height="30" width="30" slot="icon">
      </mt-button>
    </div>
    <v-footer></v-footer>
  </div>
</template>
<script>
  import Baseline from '@/common/_baseline.vue'
  import Footer from '@/common/_footer.vue'
  // import Footer from '@/components/goodsBase/_footer.vue'
  // import { goodsOrderApi } from '@/api/goodsOrder'
  import { goodsBaseApi } from '@/api/goodsBase'
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
        // mockArr: [],
        imageZoom: '',
        pictureZoomShow: true,
        // requestParam1: {
        //   poundage: '',
        //   theirPrice: '',
        //   profits: '',
        //   inventoryId: '',
        //   type: 1,
        //   num: '',
        //   shelvesPrice: ''
        // },
        // requestParam: {
        //   id: '',
        //   price: '',
        //   dwPrice: '',
        //   poundage: '',
        //   theirPrice: '',
        //   profits: '',
        //   waybillNo: '',
        //   addressId: ''
        // },
        // popupVisible: false,
        titleName: '商品',
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
          type: '',
          actNo: '',
          name: '',
          brand: '',
          remark: '',
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
        bottomStatus: "",
        allLoaded: false,
        // mockArr: [],
        // inventoryToList: [
        //   { fieldValue: 1, fieldName: '现货' }, { fieldValue: 0, fieldName: '售空' },
        //   { fieldValue: 2, fieldName: '未上架' }
        // ],
        typeList: [],
        dataStatusList: [],
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
      const { actNo } = this.$route.query
      this.queryParam.actNo = actNo
      if (this.queryParam.actNo) {
        this.search1()
      }
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
            this.getPage()
          }
        }
      },
      scanCode(id, type) {
        this.$router.push({ path: '/scanCode', query: { id, type } })
      },
      goDetail(id, type) {
        this.$router.push({ path: '/goodsAdd', query: { id, type } })
      },
      gotoDw(spuId) {
        if (!spuId){
          return
        }
        // let url = "https://www.dewu.com/router/product/ProductDetail?spuId=";
        let url = "https://m.dewu.com/router/product/ProductDetail?spuId=";
        window.location.href = url + spuId;
      },
      storeAdd(goodsId) {
        this.$router.push({ path: '/storeAdd', query: { goodsId } })
      },
      jumpactNo(actNo) {
        this.$router.push({ path: '/store', query: { actNo } })
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
      getPage() {
        goodsBaseApi.page(this.queryParam).then(res => {
          if (res.subCode === 1000) {
            this.tableData = res.data ? res.data.list : []
            this.totalCount = res.data ? res.data.pageInfo.totalCount : 0
            if (this.totalCount == 0) {
              this.allLoaded = true;
              this.emtityMsg = '暂无相关商品 -.-'
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
        this.typeList = sysDictList.filter(item => item.typeValue == 20221108)
        this.dataStatusList = sysDictList.filter(item => item.typeValue == 36)
      },
      loadData(p_status) {
        // 第一次加载或者下拉刷新最新数据
        if (p_status === "refresh") {
          this.tableData = [];
        }
        goodsBaseApi.page(this.queryParam).then(res => {
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
        if (!this.queryParam.actNo ) {
          this.$toast('请输入货号')
          return
        }
        this.queryParam.pageNum = 1
        this.allLoaded = false;
        this.getPage()
      },
      changeSystem() {
        let sysDictList = localStorage.getItem('sysDictList') ? JSON.parse(
          localStorage.getItem('sysDictList')) : []
        let res = sysDictList.filter(
          item => item.typeValue == 20221108 && item.fieldValue == this.queryParam.status)
        this.titleName = res.length ? res[0].fieldName : ''
        this.titleName = this.titleName + '商品'
      },
      // changeSystem() {
      //   let res = this.inventoryToList.filter(
      //     item => item.fieldValue == this.queryParam.inventory)
      //   this.titleName = res.length ? res[0].fieldName : ''
      //   this.titleName = this.titleName + '商品'
      // },
      search1() {
        this.queryParam.pageNum = 1
        this.allLoaded = false;
        this.isShowDialog2 = false
        this.getPage()
      },
      resetHandle() {
        this.queryParam = {
          id: '',
          type: '',
          actNo: '',
          name: '',
          brand: '',
          remark: '',
          pageSize: 20,
          pageNum: 1
        }
        this.titleName = '商品'
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
      // keyup1() {
      //   // let theirPrice =
      //   //   +  this.requestParam.dwPrice - (this.requestParam.dwPrice * 0.075 + 38 + 8.5)
      //   // // let theirPrice = this.requestParam.theirPrice - 10
      //   // //   - this.theirPrice.price
      //   // this.requestParam.profits = parseFloat(theirPrice).toFixed(2)
      //   //
      //   // let profits = this.requestParam.theirPrice - 10
      //   //   - this.requestParam.price
      //   // this.requestParam.profits = parseFloat(profits).toFixed(2)
      //
      //   let poundage = this.requestParam.dwPrice * 0.075 + 38 + 8.5
      //   this.requestParam.poundage = parseFloat(poundage).toFixed(2)
      //
      //   let theirPrice =  this.requestParam.dwPrice
      //     - (this.requestParam.dwPrice * 0.075 + 38 + 8.5)
      //   this.requestParam.theirPrice = parseFloat(theirPrice).toFixed(2)
      //
      //   let profits = this.requestParam.theirPrice - 10
      //     - this.requestParam.price
      //   this.requestParam.profits = parseFloat(profits).toFixed(2)
      // },
      // keyup2() {
      //   // let theirPrice =
      //   //   +  this.requestParam.dwPrice - (this.requestParam.dwPrice * 0.075 + 38 + 8.5)
      //   // // let theirPrice = this.requestParam.theirPrice - 10
      //   // //   - this.theirPrice.price
      //   // this.requestParam.profits = parseFloat(theirPrice).toFixed(2)
      //   //
      //   // let profits = this.requestParam.theirPrice - 10
      //   //   - this.requestParam.price
      //   // this.requestParam.profits = parseFloat(profits).toFixed(2)
      //
      //   let poundage = this.requestParam1.shelvesPrice * 0.075 + 38 + 8.5
      //   this.requestParam1.poundage = parseFloat(poundage).toFixed(2)
      //
      //   let theirPrice =  this.requestParam1.shelvesPrice
      //     - (this.requestParam1.shelvesPrice * 0.075 + 38 + 8.5)
      //   this.requestParam1.theirPrice = parseFloat(theirPrice).toFixed(2)
      //
      //   let profits = this.requestParam1.theirPrice - 10
      //     - this.orderData1.price
      //   this.requestParam1.profits = parseFloat(profits).toFixed(2)
      //
      //   if (this.requestParam1.num > this.orderData1.inventory - this.orderData1.galleryCount) {
      //     this.requestParam1.num = this.orderData1.inventory - this.orderData1.galleryCount
      //   }
      // },
      // confirmHandle1() {
      //   if (!this.requestParam1.num) {
      //     this.$messagebox("上架数量错误");
      //     // this.$toast('上架数量错误')
      //     return
      //   }
      //   if (this.requestParam1.num > this.orderData1.inventory) {
      //     this.$messagebox('上架数量大于当前库存')
      //     return
      //   }
      //   let data = {}
      //   data.inventoryId = this.requestParam1.inventoryId
      //   data.type = this.requestParam1.type
      //   data.num = this.requestParam1.num
      //   data.shelvesPrice = this.requestParam1.shelvesPrice
      //   goodsInventoryApi.shelvesGoods(data).then(res => {
      //     this.$toast(res.subMsg)
      //     if (res.subCode === 1000) {
      //       this.getPage()
      //       this.isShowDialog1 = false
      //     }
      //   })
      // },
      // confirmHandle() {
      //   // 利润= 到手价-运费-原价
      //   // // 出售
      //   // goodsOrderApi.sellGoods(this.requestParam).then(res => {
      //   //   this.$toast(res.subMsg)
      //   //   if (res.subCode === 1000) {
      //   //     this.getPage()
      //   //     this.isShowDialog = false
      //   //   }
      //   // })
      //   // goodsInventoryApi.update(this.requestParam).then(res => {
      //   //   this.$toast(res.subMsg)
      //   //   if (res.subCode === 1000) {
      //   //     this.getPage()
      //   //     this.isShowDialog = false
      //   //   }
      //   // })
      // },
      // updateAddress() {
      //   goodsOrderApi.update(this.requestParam1).then(res => {
      //     this.$toast(res.subMsg)
      //     if (res.subCode === 1000) {
      //       this.getPage()
      //       this.isShowDialog1 = false
      //     }
      //   })
      // },
      // changeStatusDialog1(row) {
      //   this.orderData1 = row
      //   this.requestParam1.inventoryId = this.orderData1.id
      //   this.requestParam1.num = this.orderData1.inventory - this.orderData1.galleryCount
      //   this.requestParam1.shelvesPrice = this.orderData1.dwPrice
      //   this.isShowDialog1 = true
      // },
      // handleClick(orderData) {
      //   this.orderData = orderData
      //   this.requestParam.id = this.orderData.id
      //   this.requestParam.price = this.orderData.price
      //   this.requestParam.dwPrice = this.orderData.dwPrice
      //   this.requestParam.waybillNo = this.orderData.waybillNo
      //   this.requestParam.addressId = this.orderData.addressId
      //   // let poundage = this.requestParam.dwPrice * 0.075 + 38 + 8.5
      //   // this.requestParam.poundage = parseFloat(poundage).toFixed(2)
      //   if (!this.orderData.poundage) {
      //     let poundage = this.requestParam.dwPrice * 0.075 + 38 + 8.5
      //     this.requestParam.poundage = parseFloat(poundage).toFixed(2)
      //   } else {
      //     this.requestParam.poundage = this.orderData.poundage
      //   }
      //   if (!this.orderData.theirPrice) {
      //     let theirPrice =  this.requestParam.dwPrice
      //       - (this.requestParam.dwPrice * 0.075 + 38 + 8.5)
      //     this.requestParam.theirPrice = parseFloat(theirPrice).toFixed(2)
      //   } else {
      //     this.requestParam.theirPrice = this.orderData.theirPrice
      //   }
      //   if (!this.orderData.profits) {
      //     let profits = this.requestParam.theirPrice - 10
      //       - this.requestParam.price
      //     this.requestParam.profits = parseFloat(profits).toFixed(2)
      //   } else {
      //     this.requestParam.profits = this.orderData.profits
      //   }
      //   this.isShowDialog = true
      // }
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
    width: 84vw;
    /*width: 5.7rem;*/
    padding: 0.2rem;

  }
</style>
