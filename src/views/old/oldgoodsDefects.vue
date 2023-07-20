<template>
  <div class="hello" ref="hello">
    <mt-header :title="titleName">
      <div slot="left">
        <mt-button  icon="back" @click="$router.go(-1)"></mt-button>
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
      style="margin-top: 70px;"
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
            <strong style="color: #409EFF"  @click="jumpactOrder(item.orderNo)">{{item.orderNo}} </strong>
          </div>
          <div class="dingdans_top_right">
            <strong
            :class="item.status == 1 ? 'color-danger' : 'color-success'"
          >{{ item.status | dictToDescTypeValue(45) }} </strong>
          </div>
        </div>
        <div class="dingdans_con">
          <div class="dingdans_con_left" @click="avatarShow(item.img)">
            <img  v-bind:src="item.img" alt="" >
          </div>
          <div class="diangdans_con_right">
            <div class="dingdans_con_right_top" >
              <strong v-if="item.goodsName"
                      @click="goodsDetail(item.goodsId, 1) "
                      >
                {{item.goodsName}}
              </strong>
            </div>
            <div class="dingdans_con_right_down">
              货号：<strong style="color: #409EFF"  @click="jumpactNo(item.actNo)">{{item.actNo}} </strong>
              <strong> {{item.createTime |formateTime }}</strong>
            </div>
            <div class="dingdans_top" style="margin-bottom: -5px;">
              <el-tooltip style="width: 40vw;" :content="item.reason" placement="top">
                <strong>{{item.reason | sizeFilterNum(12) }}</strong>
              </el-tooltip>

              <el-button
                type="text"
                size="small"
                class="color-danger"
                style="font-size: 3.5vw;font-weight: 600;margin-left: 50px;"
                @click="goDel(item.id)">删除</el-button>
              <el-button
                type="text"
                size="small"
                style="font-size: 3.5vw;font-weight: 600;"
                @click="handleClick(item)">修改</el-button>
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
        <div v-if="allLoaded" class="to-the-bottom">
      <p v-if="emtityMsg != '没有更多了'">
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
          <mt-button size="normal"  style="font-size: 16px"> 重置（关闭）</mt-button>
        </div>
        <div slot="left">
          <mt-button size="normal" @click="search1" style="font-size: 15px">确定</mt-button>
        </div>
      </mt-header>
      <section style="height: 80vw;width: 100vw">
        <mt-field label="状态" style="margin-top: 11vw;">
            <select class="select100" v-model="queryParam.status"  >
               <option :disabled="true" value="" selected>请选择类型</option>
              <option v-for="x in statusList" :value="x.fieldValue">{{x.fieldName}}</option>
            </select>
        </mt-field>
        <mt-field label="订单号" placeholder="请输入订单号"  v-model="queryParam.orderNo"></mt-field>
        <mt-field label="原因" placeholder="请输入原因"  v-model="queryParam.reason"></mt-field>
<!--        <mt-field label="开始时间" type="date" placeholder="开始时间"  v-model="queryParam.createTimeFrom" ></mt-field>-->
<!--        <mt-field label="结束时间" type="date" placeholder="结束时间"  v-model="queryParam.createTimeTo" ></mt-field>-->
        <mt-field label="开始时间">
          <el-date-picker class="select100"
                          size="small"
                          v-model="queryParam.createTimeFrom" value-format="yyyy-MM-dd"
                          type="date" placeholder="开始时间">
          </el-date-picker>
        </mt-field>
        <mt-field label="结束时间">
          <el-date-picker class="select100"
                          size="small"
                          v-model="queryParam.createTimeTo" value-format="yyyy-MM-dd"
                          type="date" placeholder="结束时间">
          </el-date-picker>
        </mt-field>
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
            <select  class="select100" v-model="requestParam.status">
          <option :disabled="true" value="" selected>请选择</option>
              <option v-for="x in statusList" :value="x.fieldValue">{{x.fieldName}}</option>
            </select>
        </mt-field>
        <mt-field label="创建时间">
          <el-date-picker class="select100" style="width: 62vw"
                          type="datetime" placeholder="创建时间"
                          v-model="requestParam.createTime"
                          value-format="yyyy-MM-dd HH:mm:ss"></el-date-picker>
        </mt-field>
        <mt-field label="瑕疵原因" placeholder="请输入瑕疵原因"  v-model="requestParam.reason"  type="textarea" rows="4"></mt-field>
      </section>
    </mt-popup>
  </div>
</template>
<script>
  import Baseline from '@/common/_baseline.vue'
  import Footer from '@/common/_footer.vue'
  import { goodsDefectsApi } from '@/api/goodsDefects'
  import { parseTime } from '@/utils/index'
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
        emtityMsg: '没有更多了',
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
        goodsDefectsApi.page(this.queryParam).then(res => {
          if (res.subCode === 1000) {
            this.tableData = res.data ? res.data.list : []
            this.totalCount = res.data ? res.data.pageInfo.totalCount : 0
            if (this.totalCount == 0) {
              this.allLoaded = true;
              this.emtityMsg = '暂无相关数据'
            } else if (this.totalCount <= this.queryParam.pageSize) {
              this.allLoaded = true;
              this.emtityMsg = '没有更多了'
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
              this.emtityMsg = '没有更多了'
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
