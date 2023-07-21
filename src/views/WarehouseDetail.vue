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
    <div style="margin-top: 130px;">
        <div class="dingdans_item_other" v-for="(item,index) in tableData" :key="index">
          <div class="dingdans_top_other zuoyouduiqi" style="border-left: 0px;">
            <div  style="width: 50px;
    margin-left: -2px;
    margin-right: 2px;" >
              <el-checkbox v-model="item.checked" :checked="item.checked" @change="changeChecked(item.id)"></el-checkbox>
            </div>
            <div style="margin-right: 12px;" @click="goDetail(item.id , 1)" >
              <strong>尺码：</strong>
              <strong style="color: #409eff"> {{item.size}} </strong>
            </div>
<!--            <div>-->
<!--              <strong style="margin-right: 12px;">-->
<!--                {{ item.warehouseId | dictToDescTypeValue(40) }}-->
<!--              </strong>-->
<!--            </div>-->
          </div>
          <div class="dingdans_con_other bt1" @click="goDetail(item.id , 1)" >
            <div  class="dingdans_top_common_other_left" style="width: 39vw">
              <span>剩余库存：</span>
            </div>
            <div   class="dingdans_top_common_other">
              <span >{{item.inventory }}</span>
            </div>
          </div>
          <div style="margin-top: 10px;" class="dingdans_con_other bt1" @click="goDetail(item.id , 1)" >
            <div class="dingdans_top_common_other_left" style="width: 39vw">
              <span>原始库存：</span>
            </div>
            <div class="dingdans_top_common_other">
              <span >{{ item.oldInventory }}</span>
            </div>
          </div>
          <div style="margin-top: 10px;" class="dingdans_con_other bt1" @click="goDetail(item.id , 1)" >
            <div class="dingdans_top_common_other_left" style="width: 39vw">
              <span>入库渠道：</span>
            </div>
            <div class="dingdans_top_common_other">
              <span >{{ item.channelId | dictToDescTypeValue(47) }}</span>
            </div>
          </div>
          <div style="margin-top: 10px;" class="dingdans_con_other bt1" @click="goDetail(item.id , 1)" >
            <div class="dingdans_top_common_other_left" style="width: 39vw">
              <span>所在仓库：</span>
            </div>
            <div class="dingdans_top_common_other">
              <span >  {{ item.warehouseId | dictToDescTypeValue(40) }}</span>
            </div>
          </div>
        </div>
    </div>
    <div class="popContainer" v-if="pictureZoomShow" @click="pictureZoomShow = false">
      <div class="imageShow">
        <img :src="imageZoom" alt="" class="showImg">
      </div>
    </div>
    <p style="padding: 24px 0;" class="to-the-bottom"></p>
<!--    <div style="-->
<!--    bottom: 0;-->
<!--    position: absolute;-->
<!--    text-align: center;-->
<!--    ">-->
<!--&lt;!&ndash;      <mt-button  @click="goGoodsBase"  style="margin-left: 5px;&ndash;&gt;-->
<!--&lt;!&ndash;    border-radius: 100%;&ndash;&gt;-->
<!--&lt;!&ndash;    margin-top: 0px;&ndash;&gt;-->
<!--&lt;!&ndash;    height: 55px;&ndash;&gt;-->
<!--&lt;!&ndash;    width: 55px;" type="primary">&ndash;&gt;-->
<!--&lt;!&ndash;        <img src="../../static/img/add.png" height="30" width="30" slot="icon">&ndash;&gt;-->
<!--&lt;!&ndash;      </mt-button>&ndash;&gt;-->
<!--      <el-button size="small" v-if="checkAll" v-model="checkAll" @click="checkedAll" style="    margin-left: 65px;margin-bottom: 10px;" type="primary">反选</el-button>-->
<!--      <el-button size="small" v-else v-model="checkAll" @click="checkedAll" style="    margin-left: 65px;margin-bottom: 10px;" type="primary">全选</el-button>-->
<!--      <el-button size="small" type="primary" @click="handleClick" >移动仓库</el-button>-->
<!--      <el-button size="small" type="primary" @click="handleClickChannel" >设置渠道</el-button>-->
<!--&lt;!&ndash;      <el-button  @click="$router.go(-1)" >取消</el-button>&ndash;&gt;-->
<!--    </div>-->

    <div  style="
    bottom: 0px;
    position: fixed;
    text-align: center;
    width: 100vw;
    background-color: white;
    border-top: 1px solid rgb(243, 242, 248);
    display: flex;
    justify-content: space-between;
    align-items: center;
   ">
      <div style="margin-left: 20px;">
        <el-checkbox :checked="checkAll" v-model="checkAll"  @change="checkedAll" style="color: #666">
          全选
        </el-checkbox>
      </div>
      <div>
        <span>已选</span>
        <span class="color-url" style=" font-size: 17px;font-weight: bolder">{{ids.length}}</span>
        <el-button   type="primary" round size="small" style="
        margin-top: 8px;
    margin-bottom: 8px;
    margin-left: 8px;" @click="handleClick">移动仓库
        </el-button>
        <el-button   type="primary" round size="small" style="
        margin-top: 8px;
    margin-bottom: 8px;
    margin-left: 8px;
        margin-right: 10px" @click="handleClickChannel">设置渠道
        </el-button>
      </div>
    </div>


    <mt-popup
      v-model="isShowDialog">
      <mt-header title="移动仓库">
        <div slot="right">
          <mt-button size="normal"  @click="isShowDialog = false" style="font-size: 15px">关闭</mt-button>
        </div>
        <div slot="left">
          <mt-button size="normal" @click="confirmHandle" style="font-size: 15px">确定</mt-button>
        </div>
      </mt-header>
      <section style="height: 40vw;width: 80vw">
        <mt-field label="选中数" style="margin-top: 11vw;" v-model="ids.length" :disabled="true"></mt-field>
        <mt-field label="仓库">
<!--            <el-select size="small" class="select80" v-model="requestParam.warehouseId"  >-->
<!--              <el-option :disabled="true" value="" selected>请选择仓库</el-option>-->
<!--              <el-option-->
<!--                v-for="item in warehouseList"-->
<!--                :key="item.fieldValue"-->
<!--                :label="item.fieldName"-->
<!--                :value="+item.fieldValue">-->
<!--              </el-option>-->
<!--            </el-select>-->
          <select class=" select80_select select"v-model="requestParam.warehouseId">
            <option label="请选择仓库"  value=""></option>
            <option
              v-for="item in warehouseList"
              :key="item.fieldValue"
              :label="item.fieldName"
              :value="+item.fieldValue">
            </option>
          </select>
        </mt-field>
      </section>
    </mt-popup>
    <mt-popup
      v-model="isShowDialog1">
      <mt-header title="选择渠道">
        <div slot="right">
          <mt-button size="normal"  @click="isShowDialog1 = false" style="font-size: 15px">关闭</mt-button>
        </div>
        <div slot="left">
          <mt-button size="normal" @click="confirmHandleChannelId" style="font-size: 15px">确定</mt-button>
        </div>
      </mt-header>
      <section style="height: 40vw;width: 80vw">
        <mt-field label="选中数" style="margin-top: 11vw;" v-model="ids.length" :disabled="true"></mt-field>
        <mt-field label="渠道">
<!--            <el-select size="small" class="select80" v-model="requestParamChannelId.channelId"  >-->
<!--              <el-option :disabled="true" value="" selected>请选择渠道</el-option>-->
<!--              <el-option-->
<!--                v-for="item in channelIdList"-->
<!--                :key="item.fieldValue"-->
<!--                :label="item.fieldName"-->
<!--                :value="+item.fieldValue">-->
<!--              </el-option>-->
<!--            </el-select>-->
          <select class=" select80_select select"v-model="requestParamChannelId.channelId">
            <option label="请选择渠道"  value=""></option>
            <option
              v-for="item in channelIdList"
              :key="item.fieldValue"
              :label="item.fieldName"
              :value="+item.fieldValue">
            </option>
          </select>
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
        emtityMsg: '没有更多了',
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
      this.initBatch()
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
      initBatch() {
        this.checkAll = false
        this.ids= []
        this.tableData.forEach((obj) => (obj.checked = false));
      },
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
      // checkedAll() {
      //   this.checkAll = !this.checkAll
      //   this.tableData= []
      //   this.getPage(1)
      // },
      checkedAll() {
        this.ids= []
        this.tableData.map(item => {
          if (this.checkAll) {
            this.ids.push(item.id)
          } else {
            this.delItem(item.id)
          }
        })
        this.tableData.forEach((obj) => (obj.checked = this.checkAll));
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
      // changeChecked(id) {
      //   this.tableData.map(item => {
      //     if(item.id === id) {
      //       if (item.checked) {
      //         this.delItem(id)
      //       } else {
      //         if (!this.ids.includes(id)) {
      //           this.ids.push(id)
      //         }
      //       }
      //       item.checked = !item.checked
      //     }
      //   })
      // },
      goDetail(id) {
        this.$router.push({path: '/storeDetail', query: {id}})
      },
      changeChecked(id) {
        this.tableData.map(item => {
          if (item.id === id) {
            if (item.checked) {
              this.ids.push(item.id)
            } else {
              this.delItem(item.id)
            }
          }
        })
        let idLength = this.ids.length
        let totalLength = this.queryParam.pageNum * this.queryParam.pageSize
        if (idLength == totalLength){
          this.checkAll = true
        }else{
          this.checkAll = false
        }
      },
      getPage() {
        this.initBatch()
        goodsInventoryApi.pageGoods(this.queryParam).then(res => {
          if (res.subCode === 1000) {
            this.tableData = res.data ? res.data.list : []
            this.initBatch()
            // 将列表parkList进行遍历动态添加checked为false
            // if (type) {
            //   this.tableData.map(item => {
            //     this.$set(item, 'checked', this.checkAll)
            //     if ( this.checkAll) {
            //       this.ids.push(item.id)
            //     } else {
            //       this.delItem(item.id)
            //     }
            //   })
            // }
            this.totalCount = res.data ? res.data.pageInfo.totalCount : 0
            this.inventoryData = res.data.goodsInventoryPageVo ? res.data.goodsInventoryPageVo
              : this.inventoryData
            if (this.totalCount == 0) {
              this.emtityMsg = '暂无相关数据'
            } else {
              this.emtityMsg = '没有更多了'
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

  /*.fenlei_top_1 {*/
  /*  border-bottom: 1vw solid #eee;*/
  /*  display: flex;*/
  /*  align-items: center;*/
  /*  justify-content: space-between;*/
  /*  height: 2rem;*/
  /*  padding: 0.1rem 0.2rem;*/
  /*  width: 100vw;*/
  /*  background: #fff;*/
  /*  position: fixed;*/
  /*  top: 30px;*/
  /*  left: 0;*/
  /*  z-index: 99;*/
  /*  margin-top:11.6vw;*/
  /*  !*margin-top:0.85rem;*!*/
  /*}*/
  .fenlei_top_1 {
    border-bottom: 1vw solid #eee;
    display: -webkit-box;
    display: -ms-flexbox;
    display: flex;
    -webkit-box-align: center;
    -ms-flex-align: center;
    align-items: center;
    -webkit-box-pack: justify;
    -ms-flex-pack: justify;
    justify-content: space-between;
    height: 109px;
    padding: 0.1rem 0.2rem;
    width: 100vw;
    background: #fff;
    position: fixed;
    top: 24px;
    left: 0;
    z-index: 99;
    margin-top: 11.6vw;
    border-top: 1vw solid #f1f1f1;
    /* margin-top: 0.85rem; */
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
