<template>
  <div class="hello" ref="hello">
    <mt-header :title="titleName">
      <div slot="left">
        <mt-button  icon="back" @click="$router.go(-1)"></mt-button>
      </div>
      <div slot="right">
        <el-dropdown trigger="click" style="margin-left: 1px;">
          <mt-button size="normal" style="font-size: 16px; color: #656b79" >管理</mt-button>
          <el-dropdown-menu slot="dropdown" >
            <el-dropdown-item type="text" @click.native="scanCode(null,3)">智能添加</el-dropdown-item>
            <el-dropdown-item type="text" @click.native="resetHandle">重置</el-dropdown-item>
          </el-dropdown-menu>
        </el-dropdown>
      </div>
    </mt-header>
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

    <div class="searchList">
      <span style="margin-right: 6vw;" :class="!queryParam.type ? 'activity' : ''" @click="searchStatus('')">全部</span>
      <span style="margin-right: 6vw;" :class="queryParam.type=='01' ? 'activity' : ''" @click="searchStatus('01')">男鞋</span>
      <span style="margin-right: 6vw;" :class="queryParam.type=='02' ? 'activity' : ''" @click="searchStatus('02')">女鞋</span>
      <span style="margin-right: 6vw;" :class="queryParam.type=='03' ? 'activity' : ''" @click="searchStatus('03')">男女</span>
      <span style="margin-right: 6vw;" :class="queryParam.type=='11' ? 'activity' : ''" @click="searchStatus('11')">服装</span>
      <span style="margin-right: 6vw;" :class="queryParam.type=='05' ? 'activity' : ''" @click="searchStatus('05')">大童</span>
      <span style="margin-right: 6vw;" :class="queryParam.type=='07' ? 'activity' : ''" @click="searchStatus('07')">中童</span>
      <span style="margin-right: 6vw;" :class="queryParam.type=='04' ? 'activity' : ''" @click="searchStatus('04')">幼童</span>
      <span style="margin-right: 6vw;" :class="queryParam.type=='06' ? 'activity' : ''" @click="searchStatus('06')">婴童</span>
      <span style="margin-right: 6vw;" :class="queryParam.type=='20' ? 'activity' : ''" @click="searchStatus('20')">包包</span>
      <span style="margin-right: 6vw;" :class="queryParam.type=='21' ? 'activity' : ''" @click="searchStatus('21')">帽子</span>
    </div>
    <mt-loadmore
      style="padding-top: 87px"
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
              :style="tableData.length==(index+1) ? 'margin-bottom: 56px;' : ''"
      >
        <div class="dingdans_con_dw">
          <div :src="item.img" class="dingdans_con_left_dw"
               @click="avatarShow(item.img)">
            <img :src="item.img" >
            <p class="mark_dw">
              <span class="text_dw">
                {{ item.type | dictToDescTypeValue(20221108) }}
              </span>
            </p>
          </div>
          <div class="diangdans_con_right_dw">
            <div class="dingdans_con_right_top_dw" @click="goodsDetail(item.id, 1) ">
              <span>
                {{item.name}}
              </span>
            </div>
            <div class="dingdans_con_right_top_dw_1">
              <span @click="jumpactNo(item.actNo)">
              {{item.actNo}}
              </span>
              <img @click="copyUrl(item.actNo)" style="width: 20px;margin-bottom: 8px;"
                   src="../../static/img/copy6.png">
            </div>
            <div class="dingdans_con_right_top_dw_2" style="margin-bottom: -10px;">
              <div  v-if="item.brand">
                   <span  class="dingdans_con_dw_address">
                    {{item.brand}}
                  </span>
              </div>
              <div class="dingdans_top_right_dw">
                <div class="dingdans_con_right_down_2_1">
                  <el-dropdown trigger="click" style="margin-left: 1px;">
                    <button
                      class="dw-button-common">操作
                    </button>
                    <el-dropdown-menu slot="dropdown" >
                      <el-dropdown-item type="text" @click.native="storeAdd(item.id)">选择</el-dropdown-item>
                      <el-dropdown-item type="text" @click.native="gotoDw(item.spuId)">得物</el-dropdown-item>
                      <el-dropdown-item type="text" @click.native="goodsDetail(item.id,1)">详情</el-dropdown-item>
                    </el-dropdown-menu>
                  </el-dropdown>
                </div>
              </div>
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
    <div v-if="allLoaded" class="to-the-bottom-1">
      <p v-if="emtityMsg">
        <img src="../../static/img/new/empity_7.png" style="width: 60vw;">
      </p>
      <p>
        <span>{{emtityMsg}}</span>
      </p>
    </div>
    <mt-popup
      position="bottom"
      v-model="isShowDialog2">
      <mt-header title="筛选" >
        <div slot="right">
          <mt-button size="normal"  @click="resetHandle" style="font-size: 16px">关闭</mt-button>
        </div>
        <div slot="left">
          <mt-button size="normal" @click="search1" style="font-size: 16px">确定</mt-button>
        </div>
      </mt-header>
      <section style="height: 80vw;width: 100vw">
        <mt-field label="类型" style="margin-top: 11vw;">
          <el-select size="small" class="select100" v-model="queryParam.type" @change="changeSystem" >
            <el-option :disabled="true">请选择类型</el-option>
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
        <img :src="imageZoom" alt="" class="showImg">
      </div>
    </div>
    <v-footer></v-footer>
  </div>
</template>
<script>
  import Baseline from '@/common/_baseline.vue'
  import Footer from '@/common/_footer.vue'
  import { goodsBaseApi } from '@/api/goodsBase'
  export default {
    components: {
      'v-baseline': Baseline,
      'v-footer': Footer
    },
    name: "HelloWorld",
    data() {
      return {
        isBack: false, //记录滚动条位置对象
        curScrollTop: 0, //记录滚动条位置对象
        topStatus: "",
        bottomStatus: "",
        allLoaded: false,
        imageZoom: '',
        pictureZoomShow: true,
        titleName: '商品',
        emtityMsg: '',
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
          pageSize: 10,
          pageNum: 1
        },
        topStatus: "",
        bottomStatus: "",
        allLoaded: false,
        typeList: [],
        dataStatusList: [],
        status: '',
        selectedId: [],
        ids: [],
        tableData: [],
        totalCount: 1
      }
    },
    activated() {
      this.keyupSubmit()
      // 新开的页面
      this.isBack = false
      if (this.$route.meta.isBack) {
        this.$refs.hello.scrollTop = this.curScrollTop
      }else{
        const { actNo } = this.$route.query
        this.queryParam.actNo = actNo
        this.listSysDict()
        this.search1()
      }
    },
    beforeRouteLeave(to, from, next) {
      if (to.path == "/store" || to.path == "/storeAdd" || to.path == "/scanCode" || to.path == "/goodsDetail") {
        from.meta.isBack = this.isBack;
      } else {
        this.curScrollTop = 0
        from.meta.isBack = false;
      }
      next()
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
      scanCode(id, type) {
        this.isBack = true
        this.curScrollTop = this.$refs.hello.scrollTop
        this.$router.push({ path: '/scanCode', query: { id, type } })
      },
      goodsDetail(id, type) {
        this.isBack = true
        this.curScrollTop = this.$refs.hello.scrollTop
        this.$router.push({ path: '/goodsDetail', query: { id, type } })
      },
      gotoDw(spuId) {
        if (!spuId){
          return
        }
        let url = "https://m.dewu.com/router/product/ProductDetail?spuId=";
        window.location.href = url + spuId;
      },
      storeAdd(goodsId) {
        this.isBack = true
        this.curScrollTop = this.$refs.hello.scrollTop
        this.$router.push({ path: '/storeAdd', query: { goodsId } })
      },
      jumpactNo(actNo) {
        this.isBack = true
        this.curScrollTop = this.$refs.hello.scrollTop
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
        this.emtityMsg = ''
        goodsBaseApi.page(this.queryParam).then(res => {
          if (res.subCode === 1000) {
            this.tableData = res.data ? res.data.list : []
            this.totalCount = res.data ? res.data.pageInfo.totalCount : 0
            if (this.totalCount == 0) {
              this.allLoaded = true;
              if (this.queryParam.pageNum == 1){
                this.emtityMsg = '暂无相关商品'
              }
            } else if (this.totalCount <= this.queryParam.pageSize) {
              this.allLoaded = true;
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
      changeSystem() {
        let sysDictList = localStorage.getItem('sysDictList') ? JSON.parse(
          localStorage.getItem('sysDictList')) : []
        let res = sysDictList.filter(
          item => item.typeValue == 20221108 && item.fieldValue == this.queryParam.type)
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
        this.$refs.hello.scrollTop = 0
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
          pageSize: 10,
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
      searchStatus(type) {
        this.queryParam.type = type
        this.search1()
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





  .wrap {
    position: relative;
  }
  .mark1 {
    position: absolute;
    top: 0;
    left: 0;
    margin: 0;
  }

  .mark1:before {
    content: "";
    position: absolute;
    top: 0;
    left: 0;
    z-index: 1;
    border-right-style: solid;
    border-bottom-style: solid;
    border-left-style: solid;
    border-right-width: 10px;
    border-bottom-width: 16px;
    border-left-width: 20px;
  }

  .text1 {
    color: white;
    display: inline-block;
    position: absolute;
    left: 0;
    z-index: 1;
    font-size: 11px;
    text-transform: uppercase;
    width: 30px;
    text-align: center;
    margin-top: 2.1px;
  }
</style>
