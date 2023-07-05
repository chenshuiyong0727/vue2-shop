<template>
  <div class="hello">
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
            <strong v-if="item.goodsName"
                    @click="scanCode(item.goodsId, 1) "
                    style="color: #409EFF">
              {{item.goodsName | sizeFilter }}
            </strong>
            <strong v-else  @click="scanCode(item.goodsId, 1) " style="color: #409EFF">
              {{item.actNo}}
            </strong>
          </div>
          <div class="dingdans_top_right">
            尺码：<strong
            class="color-danger"
          > {{item.size}}</strong>
          </div>
        </div>
        <div class="dingdans_con">
          <div  :src="item.img" class="dingdans_con_left" @click="avatarShow(item.img)">
            <img :src="item.img">
          </div>
          <div class="diangdans_con_right" style="    margin-top: 30px;">
            <div class="dingdans_con_right_top" style="margin-top: -28px;">
              货号：<strong style="color: #409EFF"  @click="jumpactNo(item.actNo)">{{item.actNo}} </strong>
              类型：<strong style="color: #409EFF" > {{ item.type | dictToDescTypeValue(20221108) }}</strong>
            </div>
            <div class="dingdans_con_right_down" style="margin-bottom: 0px;">
<!--              <span>备注：<strong>{{item.remark}}</strong></span>-->
              入库价：<strong  class="color-danger">{{item.inPutPrice}} </strong>
              得物价：<strong  class="color-danger">{{item.price}} </strong>
            </div>
            <div class="dingdans_con_right_down"  style="margin-bottom: -10px;">
              到手价：<strong  class="color-danger">{{item.thisTimeThePrice}} </strong>
              利润：<strong  class="color-danger">{{item.thisTimeProfits}} </strong>
            </div>
<!--            <div style="-->
<!--            margin-bottom: -7vw;-->
<!--    font-size: 3.5vw;-->
<!--    margin-top: -1vw;">-->
<!--              <strong> {{item.createTime |formateTime }}</strong>-->
<!--              <mt-button-->
<!--                style="margin-left: 5.1vw;"-->
<!--                type="primary"-->
<!--                size="small"-->
<!--                @click="goDetail(item.id , 1)">查看</mt-button>-->
<!--              <mt-button-->
<!--                type="primary"-->
<!--                size="small"-->
<!--                @click="goDetail(item.id ,2)">修改</mt-button>-->
<!--            </div>-->
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
<!--        <mt-field label="状态" style="margin-top: 11vw;">-->
<!--            <select class="select100" v-model="queryParam.type" @change="changeSystem" >-->
<!--               <option :disabled="true" value="" selected>请选择类型</option>-->
<!--              <option v-for="x in typeList" :value="x.fieldValue">{{x.fieldName}}</option>-->
<!--            </select>-->
<!--        </mt-field>-->
        <mt-field label="尺码" placeholder="请输入尺码"  v-model="queryParam.size"  style="margin-top: 11vw;"></mt-field>
        <mt-field label="类型" >
            <select class="select100" v-model="queryParam.type" @change="changeSystem" >
          <option :disabled="true" value="" selected>请选择类型</option>
              <option v-for="x in typeList" :value="x.fieldValue">{{x.fieldName}}</option>
            </select>
        </mt-field>
        <mt-field label="利润开始"  placeholder="利润开始"  v-model="queryParam.priceFrom" ></mt-field>
        <mt-field label="利润结束"  placeholder="利润结束"  v-model="queryParam.priceTo" ></mt-field>
      </section>
    </mt-popup>
    <div class="popContainer" v-if="pictureZoomShow" @click="pictureZoomShow = false">
      <div class="imageShow">
        <img :src="fileUrl + imageZoom" alt="" width="100%" height="100%">
      </div>
    </div>
    <div style="
    right: 15px;
    bottom: 10vw;
    position: absolute;
    text-align: center;
    ">
      <mt-button  @click="goDetail(null,3)"  style="margin-left: 5px;
    border-radius: 100%;
    margin-top: 0px;
    height: 55px;
    width: 55px;" type="primary">
        <img src="../../static/img/add.png" height="30" width="30" slot="icon">
      </mt-button>
    </div>
<!--    <v-footer></v-footer>-->
  </div>
</template>
<script>
  import Baseline from '@/common/_baseline.vue'
  import Footer from '@/common/_footer.vue'
  import { goodsBusinessApi } from '@/api/goodsBusiness'
  export default {
    components: {
      'v-baseline': Baseline,
      'v-footer': Footer
    },
    name: "HelloWorld",
    data() {
      return {
        orderData2: '',
        isShowDialog2: false,
        titleName: '营销',
        emtityMsg: '人家是有底线的 -.-',
        pictureZoomShow: false,
        imageZoom: '',
        fileUrl: fileUrl,
        queryParam: {
          type: '',
          keyword: '',
          goodsId: '',
          sizeId: '',
          size: '',
          priceFrom: 50,
          priceTo: '',
          pageSize: 20,
          pageNum: 1
        },
        typeList: [],
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
      goDetail(id, type) {
        this.$router.push({ path: '/otherAdd', query: { id, type } })
      },
      getPage() {
        goodsBusinessApi.page(this.queryParam).then(res => {
          if (res.subCode === 1000) {
            this.tableData = res.data ? res.data.list : []
            this.totalCount = res.data ? res.data.pageInfo.totalCount : 0
            if (this.totalCount == 0) {
              this.allLoaded = true;
              this.emtityMsg = '暂无相关数据 -.-'
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
      },
      loadData(p_status) {
        // 第一次加载或者下拉刷新最新数据
        if (p_status === "refresh") {
          this.tableData = [];
        }
        goodsBusinessApi.page(this.queryParam).then(res => {
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
        this.getPage()
      },
      resetHandle() {
        this.queryParam = {
          keyword: '',
          goodsId: '',
          type: '',
          sizeId: '',
          size: '',
          priceFrom: 50,
          priceTo: '',
          pageSize: 20,
          pageNum: 1
        }
        this.titleName = '营销'
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
      scanCode(id, type) {
        this.$router.push({ path: '/scanCode', query: { id, type } })
      },
      jumpactNo(actNo) {
        this.$router.push({ path: '/store', query: { actNo } })
      },
      avatarShow(e) {
        this.imageZoom = e
        this.pictureZoomShow = true
      },
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
