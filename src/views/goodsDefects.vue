<template>
  <div class="hello" ref="hello">
    <mt-header title="瑕疵商品">
      <div slot="left">
        <mt-button  icon="back" @click="$router.go(-1)"></mt-button>
      </div>
      <div slot="right">
        <mt-button size="normal" style="font-size: 15px; color: black" @click="resetHandle" >重置</mt-button>
      </div>
    </mt-header>
<!--    <div class="fenlei_top">-->
<!--      <div    class="fenlei_top_left">-->
<!--        <input type="text" v-model.trim="queryParam.keyword" placeholder="请输入货号/商品名" class="ins">-->
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
          v-model.trim="queryParam.keyword">
        </el-input>
      </div>
      <div class="fenlei_top_right" @click="isShowDialog2 = true">
        <img src="../../static/img/search.png" height="30px;" width="30px;">
      </div>
    </div>
    <mt-loadmore
      style="margin-top: 72px;"
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
        <!--        头部-->
        <div class="dingdans_top_dw">
          <div class="dingdans_top_left_dw">
            <span>订单号:</span>
            <span>{{item.orderNo }}</span>
          </div>
          <div class="dingdans_top_right_dw">
            <span>{{ item.status | dictToDescTypeValue(45) }} </span>
          </div>
        </div>
        <!--        中间-->
        <div class="dingdans_con_dw">
          <div v-if="showSd" style="width: 50px;
    margin-left: -2px;
    margin-right: 2px;" >
            <el-checkbox v-model="item.checked" :checked="item.checked" @change="changeChecked(item.id)"></el-checkbox>
          </div>
          <div class="dingdans_con_left_dw"
               @click="avatarShow(item.img)">
            <img :src="item.img" >
<!--            <p class="mark_dw">-->
<!--              <span class="text_dw">-->
<!--                {{ item.saleType | dictToDescTypeValue(46) }}-->
<!--              </span>-->
<!--            </p>-->
          </div>
          <div class="diangdans_con_right_dw">
            <div class="dingdans_con_right_top_dw" @click="goodsDetail(item.goodsId, 1) ">
              <span>
                {{item.goodsName | sizeFilterNum(40) }}
              </span>
            </div>
            <div class="dingdans_con_right_top_dw_1">
              <span @click="jumpactNo(item.actNo)">
              {{item.actNo}}
              </span>
              <img @click="copyUrl(item.actNo)" style="width: 20px;margin-bottom: 8px;"
                   src="../../static/img/copy6.png">
            </div>
            <div v-if="item.addressId" style="    margin-bottom: 10px;">
              <span  class="dingdans_con_dw_address">
                {{item.addressId | dictToDescTypeValue(38)}}
              </span>
            </div>
            <div class="dingdans_con_right_top_dw_2">
              <div>
                 <span>
                {{item.size}}
              </span>
              </div>
              <div>
                <strong v-if="item.shelvesPrice"   style="color: #333333">
                  ¥
                </strong>
                <strong  v-if="item.shelvesPrice" style="font-size: 17px ;margin-left: -2px;color: #333333">
                  {{item.shelvesPrice}}
                </strong>
                <span  style="margin-left: 3px;text-decoration:line-through;">
                  {{item.price}}
                </span>
              </div>
            </div>
          </div>
        </div>
        <!--底部-->
        <div class="dingdans_bottom_dw">
          <div class="dingdans_top_left_dw">
            <el-tooltip :content="item.reason" placement="top">
              <span style="color: #333333">{{item.reason | sizeFilterNum(20) }}</span>
            </el-tooltip>
          </div>
          <!--          操作栏-->
          <div class="dingdans_top_right_dw">
            <div class="dingdans_con_right_down_2_1">
              <el-dropdown trigger="click" style="margin-left: 1px;">
                <button
                  class="dw-button-common">操作
                </button>
                <el-dropdown-menu slot="dropdown" >
                  <el-dropdown-item type="text" @click.native="handleClick(item)">修改</el-dropdown-item>
                  <el-dropdown-item type="text" class="color-danger" @click.native="goDel(item.id)">删除</el-dropdown-item>
                </el-dropdown-menu>
              </el-dropdown>
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
    <div v-if="allLoaded" class="to-the-bottom-1" style="padding:0">
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
          <mt-button size="normal"  @click="resetHandle" style="font-size: 15px">关闭</mt-button>
        </div>
        <div slot="left">
          <mt-button size="normal" @click="search1" style="font-size: 15px">确定</mt-button>
        </div>
      </mt-header>
      <section style="height: 80vw;width: 100vw">
        <mt-field label="状态" style="margin-top: 11vw;">
<!--            <select class="select100" v-model="queryParam.status"  >-->
<!--               <option :disabled="true" value="" selected>请选择类型</option>-->
<!--              <option v-for="x in statusList" :value="x.fieldValue">{{x.fieldName}}</option>-->
<!--            </select>-->
<!--            <el-select size="small" class="select100" v-model="queryParam.status"  >-->
<!--          <el-option :disabled="true">请选择状态</el-option>-->
<!--          <el-option-->
<!--            v-for="item in statusList"-->
<!--            :key="item.fieldValue"-->
<!--            :label="item.fieldName"-->
<!--            :value="+item.fieldValue">-->
<!--          </el-option>-->
<!--            </el-select>-->

          <select class=" select100_select select" v-model="queryParam.status">
            <option label="请选择状态"  value=""></option>
            <option
              v-for="item in statusList"
              :key="item.fieldValue"
              :label="item.fieldName"
              :value="+item.fieldValue">
            </option>
          </select>
        </mt-field>
        <mt-field label="订单号" placeholder="请输入订单号"  v-model="queryParam.orderNo"></mt-field>
        <mt-field label="原因" placeholder="请输入原因"  v-model="queryParam.reason"></mt-field>
        <mt-field label="开始时间" type="date" placeholder="开始时间"  v-model="queryParam.createTimeFrom" ></mt-field>
        <mt-field label="结束时间" type="date" placeholder="结束时间"  v-model="queryParam.createTimeTo" ></mt-field>
<!--        <mt-field label="开始时间">-->
<!--          <el-date-picker class="select100"-->
<!--                          size="small"-->
<!--                          v-model="queryParam.createTimeFrom" value-format="yyyy-MM-dd"-->
<!--                          type="date" placeholder="开始时间">-->
<!--          </el-date-picker>-->
<!--        </mt-field>-->
<!--        <mt-field label="结束时间">-->
<!--          <el-date-picker class="select100"-->
<!--                          size="small"-->
<!--                          v-model="queryParam.createTimeTo" value-format="yyyy-MM-dd"-->
<!--                          type="date" placeholder="结束时间">-->
<!--          </el-date-picker>-->
<!--        </mt-field>-->
      </section>
    </mt-popup>
    <div class="popContainer" v-if="pictureZoomShow" @click="pictureZoomShow = false">
      <div class="imageShow">
        <img :src="imageZoom" alt="" class="showImg">
      </div>
    </div>
    <mt-popup
      position="bottom"
      v-model="isShowDialog">
      <mt-header title="修改">
        <div slot="right">
          <mt-button size="normal"  @click="isShowDialog = false" style="font-size: 15px">关闭</mt-button>
        </div>
        <div slot="left">
          <mt-button size="normal" @click="confirmHandle" style="font-size: 15px">确定</mt-button>
        </div>
      </mt-header>
      <section style="height: 80vw;width: 100vw">
        <mt-field label="货号" style="margin-top: 11vw;" v-model="orderData.actNo" :disabled="true"></mt-field>
        <mt-field label="尺码" v-model="orderData.size" :disabled="true"></mt-field>
        <mt-field label="状态">
<!--            <select  class="select100" v-model="requestParam.status">-->
<!--          <option :disabled="true" value="" selected>请选择</option>-->
<!--              <option v-for="x in statusList" :value="x.fieldValue">{{x.fieldName}}</option>-->
<!--            </select>-->
<!--            <el-select size="small" class="select100" v-model="requestParam.status">-->
<!--          <el-option :disabled="true">请选择状态</el-option>-->
<!--          <el-option-->
<!--            v-for="item in statusList"-->
<!--            :key="item.fieldValue"-->
<!--            :label="item.fieldName"-->
<!--            :value="+item.fieldValue">-->
<!--          </el-option>-->
<!--            </el-select>-->

          <select class=" select100_select select" v-model="requestParam.status">
            <option label="请选择状态"  value=""></option>
            <option
              v-for="item in statusList"
              :key="item.fieldValue"
              :label="item.fieldName"
              :value="+item.fieldValue">
            </option>
          </select>
        </mt-field>
        <mt-field label="创建时间">
          <div @click="chosseTime()">
             <el-date-picker class="select100" style="width: 62vw" readonly="readonly"
                          type="datetime" placeholder="创建时间"
                          v-model="requestParam.createTime"
                          value-format="yyyy-MM-dd HH:mm:ss"></el-date-picker>
          </div>
        </mt-field>
        <mt-field label="瑕疵原因" placeholder="请输入瑕疵原因"  v-model="requestParam.reason"  type="textarea" rows="4"></mt-field>
      </section>
    </mt-popup>

    <mt-datetime-picker
      v-model="requestParam.createTime"
      type="datetime"
      year-format="{value}"
      month-format="{value}"
      date-format="{value}"
      hour-format="{value}"
      minute-format="{value}"
      second-format="{value}"
      ref="requestParamCreateTime"
      :startDate="new Date(2022, 3, 1 )"
      @confirm="handleConfirmDate">
    </mt-datetime-picker>
  </div>
</template>
<script>
  import Baseline from '@/common/_baseline.vue'
  import Footer from '@/common/_footer.vue'
  import { goodsDefectsApi } from '@/api/goodsDefects'
  import {parseTime ,formatDateMin} from '@/utils/index'
  export default {
    components: {
      'v-baseline': Baseline,
      'v-footer': Footer
    },
    name: "HelloWorld",
    data() {
      return {
        orderData: '',
        isShowDialog: false,
        requestParam: {
          id: '',
          reason: '',
          status: '',
          createTime: ''
        },
        orderData2: '',
        isShowDialog2: false,
        titleName: '瑕疵商品',
        emtityMsg: '',
        pictureZoomShow: false,
        imageZoom: '',
        fileUrl: fileUrl,
        queryParam: {
          reason: '',
          createTimeFrom: '',
          createTimeTo: '',
          keyword: '',
          priceFrom: '',
          priceTo: '',
          orderNo: '',
          shelvesPriceFrom: '',
          shelvesPriceTo: '',
          status: '',
          pageSize: 20,
          pageNum: 1
        },
        typeList: [],
        statusList: [],
        topStatus: "",
        bottomStatus: "",
        allLoaded: false,
        tableData: [],
        totalCount: 1
      }
    },
    mounted() {
      this.getPage()
      this.listSysDict()
      this.keyupSubmit()
    },
    methods: {
      chosseTime() {
        this.$refs.requestParamCreateTime.open()
      },
      handleConfirmDate(val) {
        let res = formatDateMin(val)
        this.requestParam.createTime = res
      },
      keyupSubmit() {
        document.onkeydown = (e) => {
          let _key = window.event.keyCode
          if (_key === 13) {
            this.search1()
          }
        }
      },
      confirmHandle() {
        if(!this.requestParam.status) {
          this.$toast('请选择状态')
          return
        }
        if(!this.requestParam.createTime) {
          this.$toast('请输入创建时间')
          return
        }
        if(!this.requestParam.reason) {
          this.$toast('请输入瑕疵原因')
          return
        }
        this.requestParam.createTime = this.requestParam.createTime ? parseTime(this.requestParam.createTime) : ''
        goodsDefectsApi.update(this.requestParam).then(res => {
          this.$toast(res.subMsg)
          if (res.subCode === 1000) {
            this.getPage()
            this.isShowDialog = false
          }
        })
      },
      goDetail(id, type) {
        this.$router.push({ path: '/otherAdd', query: { id, type } })
      },
      getPage() {
        this.emtityMsg = ''
        goodsDefectsApi.page(this.queryParam).then(res => {
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
        this.dataStatusList = sysDictList.filter(item => item.typeValue == 36)
        this.typeList = sysDictList.filter(item => item.typeValue == 20221108)
        this.statusList = sysDictList.filter(item => item.typeValue == 45)
      },
      loadData(p_status) {
        if (p_status === "refresh") {
          this.tableData = [];
        }
        goodsDefectsApi.page(this.queryParam).then(res => {
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
        if (!this.queryParam.keyword ) {
          this.$toast('请输入关键词')
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
          item => item.typeValue == 39 && item.fieldValue == this.queryParam.status)
        this.titleName = res.length ? res[0].fieldName : ''
        this.titleName = this.titleName
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
          type: '',
          actNo: '',
          name: '',
          brand: '',
          remark: '',
          priceFrom: '',
          priceTo: '',
          createTimeFrom: '',
          createTimeTo: '',
          updateTimeFrom: '',
          updateTimeTo: '',
          pageSize: 20,
          pageNum: 1
        }
        this.titleName = '瑕疵商品'
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
      goodsDetail(id, type) {
        this.$router.push({ path: '/goodsDetail', query: { id, type } })
      },
      // 复制链接
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
      jumpactNo(actNo) {
        this.$router.push({ path: '/store', query: { actNo } })
      },
      jumpactOrder(orderNo) {
        this.$router.push({ path: '/order', query: { orderNo } })
      },
      goDel(id) {
        this.$confirm('是否删除',"提示",{
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type:"warning",
        }).then(() => {
          goodsDefectsApi.delById(id).then(res => {
            this.$toast(res.subMsg)
            if (res.subCode === 1000) {
              this.getPage()
            }
          })
        }).catch(() => {
        })
      },
      gotoDw(spuId) {
        if (!spuId) {
          return
        }
        let url = "https://m.dewu.com/router/product/ProductDetail?spuId=";
        window.location.href = url + spuId;
      },
      handleClick(row) {
        this.orderData = row
        this.requestParam.status = row.status
        this.requestParam.reason = row.reason
        this.requestParam.createTime = parseTime(row.createTime)
        this.requestParam.id = row.id
        this.isShowDialog = true
      }
    }
  };
</script>

<style>

  @import '../assets/index/style.css';

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
