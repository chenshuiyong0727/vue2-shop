<template>
  <div class="hello">
    <mt-header :title="actNo">
      <div slot="left">
        <mt-button  icon="back" @click="$router.go(-1)"></mt-button>
      </div>
    </mt-header>
    <div class="fenlei_top_1">
      <ul class="store-list-1" >
        <li  style="display:flex ;align-items:center; background-color: white;border: 2px solid #f1f1f1 ;" class="store-list-1-li">
          <div>
            <img
              v-if="img"
              :src="img"
              style="width: 100%;border-radius: 10px;"
              @click="avatarShow(img)"
            />
            <img
              v-if="!img && imgUrl"
              :src="fileUrl + imgUrl"
              style="width: 100%;border-radius: 10px;"
              @click="avatarShow(fileUrl + imgUrl)"
            />
<!--            <div v-if="item.img" class="dingdans_con_left" @click="avatarShow(item.img)">-->
<!--              <img :src="item.img">-->
<!--            </div>-->
<!--            <div v-if="!item.img && item.imgUrl" class="dingdans_con_left" @click="avatarShow(fileUrl+ item.imgUrl)">-->
<!--              <img :src="fileUrl + item.imgUrl">-->
<!--            </div>-->
          </div>
        </li>
        <li  class="store-list-1-li">
          <div class="overview1">
            <p><strong>库存数量</strong></p>
            <p>{{inventoryData.inventory}} / {{inventoryData.oldInventory}}</p>
          </div>
          <div class="overview2">
            <p><strong>库存成本</strong></p>
            <p>{{inventoryData.price}}</p>
          </div>
        </li>
        <li  class="store-list-1-li">
          <div class="overview1">
            <p><strong>入库总额</strong></p>
            <p>{{inventoryData.inputPrice}}</p>
          </div>
          <div class="overview2">
            <p><strong>市值总额</strong></p>
            <p>{{inventoryData.dwPrice}}</p>
          </div>
        </li>
        <li  class="store-list-1-li">
          <div class="overview1">
            <p><strong>实际利润</strong></p>
            <p>{{inventoryData.profits}}</p>
          </div>
          <div class="overview2">
            <p><strong>利润比例</strong></p>
            <p>{{(inventoryData.profits / inventoryData.inputPrice ) * 100 | numFilter}} %</p>
          </div>
        </li>
      </ul>
    </div>
    <div style="padding-top: 2rem">
      <div  class="dingdans_item" v-for="(item,index) in tableData" :key="index">
        <div class="dingdans_top">
          <div class="dingdans_top_left">
            <strong>尺码：</strong> <strong class="color-danger"> {{item.size}} </strong>
          </div>
          <div class="dingdans_top_right">
            <strong>{{ item.warehouseId | dictToDescTypeValue(40) }} </strong>
          </div>
        </div>
        <div class="dingdans_con">

          <div style="width: 25px;   display: flex;align-items: center;">
            <el-checkbox :checked="item.checked" @change="changeChecked(item.id)"></el-checkbox>
            <strong style="margin-left: 6px;">{{index + 1}}</strong>
          </div>
<!--          <div style="width: 10px;">-->
<!--            <strong>{{index + 1}}</strong>-->
<!--          </div>-->
<!--          <div style="width: 18px;">-->
<!--          </div>-->
          <div class="diangdans_con_right">
            <div class="dingdans_con_right_top">
<!--              预计利润：<strong-->
<!--              :style="item.thisTimeProfits > 50 ? 'color: #F56C6C' : ''">-->
<!--              {{item.thisTimeProfits}}</strong>-->
              <span v-if="item.thisTimePrice" >预计利润：<strong class="color-danger">{{item.thisTimeProfits}}</strong></span>
              <span v-else>预计利润：<strong class="color-danger">{{(item.dwPrice - (item.dwPrice * 0.075 + 38 + 8.5) - item.price - 10) | numFilter}}</strong></span>
              剩余库存：<strong :style="item.inventory ? 'color: #F56C6C' : ''">{{item.inventory}}</strong>
            </div>
              <div class="dingdans_con_right_top">
                原始库存：<strong >{{item.oldInventory}}</strong>
              成功数：<strong >{{item.successCount}}</strong>
              上架数：<strong >{{item.galleryCount}}</strong>
                入库价：<strong >{{item.price}}</strong>
              </div>
            <div class="dingdans_con_right_top">
              得物价：
              <strong v-if="item.thisTimePrice">{{item.thisTimePrice}}</strong>
              <strong v-else>{{item.dwPrice}}</strong>
              成功数：<strong >{{item.successCount}}</strong>
              手续费：<strong >{{(item.dwPrice * 0.075 + 38 + 8.5) | numFilter}}</strong>
            </div>
            <div class="dingdans_con_right_top">
             渠道： <strong>{{ item.channelId | dictToDescTypeValue(47) }} </strong>
              时间：<strong >{{item.createTime | formateTime }}</strong>
            </div>
            <div class="dingdans_con_right_top">
              <span v-if="item.thisTimePrice">到手：<strong>{{item.thisTimeThePrice}}</strong></span>
              <span v-if="!item.thisTimePrice && item.theirPrice">到手：<strong>{{item.theirPrice}}</strong></span>
              总入库价：<strong >{{item.price * item.oldInventory}}</strong>
              <strong @click="jumpactNo(actNo)" style="margin-left: 10vw;color: #409EFF;">查看订单</strong>
            </div>
<!--            <div class="dingdans_con_right_down" style="margin-bottom: -2vw;">-->
<!--              <span v-if="item.successNum">销售均价：<strong >{{item.orderAmount / item.successNum  | numFilter}}</strong></span>-->
<!--              <span v-else>销售均价：<strong >0</strong></span>-->
<!--              <span v-if="item.successNum">平均利润：<strong >{{item.profitsAmount / item.successNum  | numFilter}}</strong></span>-->
<!--              <span v-else>平均利润：<strong >0</strong></span>-->
<!--            </div>-->
          </div>
        </div>
      </div>
    </div>
    <div class="popContainer" v-if="pictureZoomShow" @click="pictureZoomShow = false">
      <div class="imageShow">
        <img :src="imageZoom" alt="" width="100%" height="100%">
      </div>
    </div>
    <p style="padding: 1.5rem 0;" class="to-the-bottom"></p>
    <div style="
    bottom: 0;
    position: absolute;
    text-align: center;
    ">
<!--      <mt-button  @click="goGoodsBase"  style="margin-left: 5px;-->
<!--    border-radius: 100%;-->
<!--    margin-top: 0px;-->
<!--    height: 55px;-->
<!--    width: 55px;" type="primary">-->
<!--        <img src="../../static/img/add.png" height="30" width="30" slot="icon">-->
<!--      </mt-button>-->
      <el-button size="small" v-if="checkAll" v-model="checkAll" @click="checkedAll" style="    margin-left: 65px;margin-bottom: 10px;" type="primary">反选</el-button>
      <el-button size="small" v-else v-model="checkAll" @click="checkedAll" style="    margin-left: 65px;margin-bottom: 10px;" type="primary">全选</el-button>
      <el-button size="small" type="primary" @click="handleClick" >移动仓库</el-button>
      <el-button size="small" type="primary" @click="handleClickChannel" >设置渠道</el-button>
<!--      <el-button  @click="$router.go(-1)" >取消</el-button>-->
    </div>
    <mt-popup
      v-model="isShowDialog">
      <mt-header title="移动仓库">
        <div slot="right">
          <mt-button size="normal"  @click="isShowDialog = false" style="font-size: 16px">关闭</mt-button>
        </div>
        <div slot="left">
          <mt-button size="normal" @click="confirmHandle" style="font-size: 16px">确定</mt-button>
        </div>
      </mt-header>
      <section style="height: 40vw;width: 80vw">
        <mt-field label="选中数" style="margin-top: 11vw;" v-model="ids.length" :disabled="true"></mt-field>
        <mt-field label="仓库">
            <el-select size="small" class="select80" v-model="requestParam.warehouseId"  >
              <el-option :disabled="true" value="" selected>请选择仓库</el-option>
              <el-option
                v-for="item in warehouseList"
                :key="item.fieldValue"
                :label="item.fieldName"
                :value="+item.fieldValue">
              </el-option>
            </el-select>
        </mt-field>
      </section>
    </mt-popup>
    <mt-popup
      v-model="isShowDialog1">
      <mt-header title="选择渠道">
        <div slot="right">
          <mt-button size="normal"  @click="isShowDialog1 = false" style="font-size: 16px">关闭</mt-button>
        </div>
        <div slot="left">
          <mt-button size="normal" @click="confirmHandleChannelId" style="font-size: 16px">确定</mt-button>
        </div>
      </mt-header>
      <section style="height: 40vw;width: 80vw">
        <mt-field label="选中数" style="margin-top: 11vw;" v-model="ids.length" :disabled="true"></mt-field>
        <mt-field label="渠道">
            <el-select size="small" class="select80" v-model="requestParamChannelId.channelId"  >
              <el-option :disabled="true" value="" selected>请选择渠道</el-option>
              <el-option
                v-for="item in channelIdList"
                :key="item.fieldValue"
                :label="item.fieldName"
                :value="+item.fieldValue">
              </el-option>
            </el-select>
        </mt-field>
      </section>
    </mt-popup>
  </div>
</template>
<script>
  // import Footer from '@/components/goodsBase/store_footer.vue'
  import Baseline from '@/common/_baseline.vue'
  // import Footer from '@/common/_footer.vue'
  import { goodsInventoryApi } from '@/api/goodsInventory'

  export default {
    components: {
      'v-baseline': Baseline
    },
    name: "HelloWorld",
    data() {
      return {
        requestParam: {
          ids: [],
          warehouseId: 2
        },
        requestParamChannelId: {
          ids: [],
          channelId: 2
        },
        isShowDialog: false,
        isShowDialog1: false,
        checkAll: false,
        titleName: '销售报表',
        emtityMsg: '人家是有底线的 -.-',
        imageZoom: '',
        pictureZoomShow: false,
        queryParam: {
          sort: ' c.size asc ,',
          goodsId: '',
          pageSize: 20,
          pageNum: 1
        },
        warehouseList: [],
        channelIdList: [],
        ids: [],
        actNo: '',
        fileUrl: fileUrl,
        imgUrl: '',
        img: '',
        tableData: [],
        inventoryData: {
          profits: '',
          inventory: '',
          oldInventory: '',
          inventoryCost: '',
          dwPrice: ''
        }
      }
    },
    created() {
      this.listSysDict()
      const { goodsId , actNo,imgUrl ,img} = this.$route.query
      this.actNo = actNo
      this.imgUrl = imgUrl
      this.img = img
      this.queryParam.goodsId = goodsId
      if (this.queryParam.goodsId) {
        this.getPage()
      }
    },
    methods: {
      listSysDict() {
        let sysDictList = localStorage.getItem('sysDictList') ? JSON.parse(
          localStorage.getItem('sysDictList')) : []
        this.warehouseList = sysDictList.filter(item => item.typeValue == 40)
        this.channelIdList = sysDictList.filter(item => item.typeValue == 47)
      },
      confirmHandle() {
        // let data = {}
        // data.ids = this.ids
        // data.status = this.form.type
        // data.remark = this.form.remark
        goodsInventoryApi.batchupdateStatus(this.requestParam).then((res) => {
          this.$toast(res.subMsg)
          if (res.subCode === 1000) {
            this.getPage()
            this.isShowDialog = false
          }
        })
      },
      confirmHandleChannelId() {
        goodsInventoryApi.batchupdateStatus(this.requestParamChannelId).then((res) => {
          this.$toast(res.subMsg)
          if (res.subCode === 1000) {
            this.getPage()
            this.isShowDialog1 = false
          }
        })
      },
      handleClick() {
        this.requestParam.ids = this.ids
        if (!this.ids.length ) {
          this.$toast('请选择尺码')
          return
        }
        this.isShowDialog = true
      },
      handleClickChannel() {
        this.requestParamChannelId.ids = this.ids
        if (!this.ids.length ) {
          this.$toast('请选择尺码')
          return
        }
        this.isShowDialog1 = true
      },
      checkedAll() {
        this.checkAll = !this.checkAll
        this.tableData= []
        this.getPage(1)
      },
      jumpactNo(actNo) {
        this.$router.push({ path: '/order', query: { actNo } })
      },
      avatarShow(e) {
        this.imageZoom = e
        this.pictureZoomShow = true
      },
      delItem(id) {
        for (let i = 0; i < this.ids.length; i++) {
          if (this.ids[i] === id) {
            this.ids.splice(i, 1)
          }
        }
      },
      changeChecked(id) {
        this.tableData.map(item => {
          if(item.id === id) {
            if (item.checked) {
              this.delItem(id)
            } else {
              if (!this.ids.includes(id)) {
                this.ids.push(id)
              }
            }
            item.checked = !item.checked
          }
        })
        // alert(this.ids)
        // console.info("id" ,this.ids)
      },
      getPage(type) {
        goodsInventoryApi.pageGoods(this.queryParam).then(res => {
          if (res.subCode === 1000) {
            this.tableData = res.data ? res.data.list : []
            // 将列表parkList进行遍历动态添加checked为false
            if (type) {
              this.tableData.map(item => {
                this.$set(item, 'checked', this.checkAll)
                if ( this.checkAll) {
                  this.ids.push(item.id)
                } else {
                  this.delItem(item.id)
                }
              })
            }
            this.totalCount = res.data ? res.data.pageInfo.totalCount : 0
            this.inventoryData = res.data.goodsInventoryPageVo ? res.data.goodsInventoryPageVo
              : this.inventoryData
            console.info(res.data.goodsInventoryPageVo)
            if (this.totalCount == 0) {
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

  @import '../assets/index/style.css';

  strong{
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
    background-color: #f3f2f8;
    padding-top: 12vw;
    font-size: 13px;
    height: 100vh;
    overflow-y: auto;
  }

  .fenlei_top_1 {
    border-bottom: 1vw solid #eee;
    display: flex;
    align-items: center;
    justify-content: space-between;
    height: 2rem;
    padding: 0.1rem 0.2rem;
    width: 100vw;
    background: #fff;
    position: fixed;
    top: 0;
    left: 0;
    z-index: 99;
    margin-top:11.6vw;
    /*margin-top:0.85rem;*/
  }



  .clearfix11 {
  &:after {
     visibility: hidden;
     display: block;
     font-size: 0;
     content: " ";
     clear: both;
     height: 0;
   }
  }
  .btm-distance11 {
    margin-bottom: 15px;
  }
  .overview1 {
    padding-top: 5px;
    padding-right: 3px;
    padding-bottom: 0px;
    padding-left: 3px;
  }
  .overview2 {
    padding: 3px;
  }
  .store-list-1 {
    display: -webkit-box;
  }
  .store-list-1-li {
    border-radius: 10px;
    text-align: center;
    background-color: #EEF2F7;
    width: 22%;
    color: #333;
    font-size: 13px;
    -webkit-box-sizing: border-box;
    box-sizing: border-box;
    margin-top: 0vw;
    margin-right: 2vw;
    margin-bottom: 0vw;
    margin-left: 1vw;
    padding-top: 0px;
    padding-right: 0px;
    padding-bottom: 0px;
    padding-left: 0px;
  }
</style>
