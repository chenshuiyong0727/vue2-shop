<template>
  <div class="hello">
    <mt-header :title="titleName">
      <div slot="left">
        <mt-button  icon="back" @click="$router.go(-1)"></mt-button>
      </div>
    </mt-header>
    <div class="fenlei_top">
      <div    class="fenlei_top_left">
        <input type="text" v-model.trim="queryParam.name" placeholder="搜索商品名称" class="ins">
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
      <div class="dingdans_item" v-for="(item,index) in tableData" :key="index">
        <div class="dingdans_top">
          <div class="dingdans_top_left">
            商品名称：<strong> {{item.name}} </strong>
          </div>
          <div class="dingdans_top_right">
            类型：<strong
            :class="item.type == 2 ? 'color-danger' : 'color-success'"
          >{{ item.type | dictToDescTypeValue(39) }} </strong>
          </div>
        </div>
        <div class="dingdans_con">
          <div v-if="item.imgUrl" class="dingdans_con_left" @click="avatarShow(item.imgUrl)">
            <img  v-bind:src="fileUrl + item.imgUrl" alt="" >
          </div>
          <div v-else class="dingdans_con_left">
            <img src="../../static/img/other2.png">
          </div>
          <div class="diangdans_con_right">
            <div class="dingdans_con_right_top" style="margin-top: -28px;">
              金额：<strong  class="color-danger">{{item.price}} </strong>
              <span v-if="item.actNo">货号：<strong>{{item.actNo}}</strong></span>
              <span v-if="item.brand">品牌：<strong>{{item.brand}}</strong></span>
            </div>
            <div class="dingdans_con_right_down">
              <span>备注：<strong>{{item.remark}}</strong></span>
            </div>
            <div style="
            margin-bottom: -14vw;
    font-size: 3.5vw;
    margin-top: -1vw;">
              <strong> {{item.createTime |formateTime }}</strong>
              <el-button
                style="margin-left: 5.1vw;font-size: 3.5vw;font-weight: 600;"
                type="text"
                size="small"
                @click="goDetail(item.id , 1)">查看</el-button>
              <el-button
                type="text"
                style="font-size: 3.5vw;font-weight: 600;"
                size="small"
                @click="goDetail(item.id ,2)">修改</el-button>
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
        <mt-field label="类型" style="margin-top: 11vw;">
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
  import { goodsOtherApi } from '@/api/goodsOther'
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
        titleName: '其他收支',
        emtityMsg: '人家是有底线的 -.-',
        pictureZoomShow: false,
        imageZoom: '',
        fileUrl: fileUrl,
        queryParam: {
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
        goodsOtherApi.page(this.queryParam).then(res => {
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
        this.typeList = sysDictList.filter(item => item.typeValue == 39)
      },
      loadData(p_status) {
        // 第一次加载或者下拉刷新最新数据
        if (p_status === "refresh") {
          this.tableData = [];
        }
        goodsOtherApi.page(this.queryParam).then(res => {
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
        if (!this.queryParam.name ) {
          this.$toast('请输入名称')
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
        this.titleName = '其他收支'
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
