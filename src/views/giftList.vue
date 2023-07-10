<template>
  <div class="hello" ref="hello">
    <mt-header :title="titleName">
      <div slot="left">
        <mt-button  icon="back" @click="$router.go(-1)"></mt-button>
      </div>
      <div slot="right">
        <mt-button size="normal" style="font-size: 16px"  @click="handleClick1">新增</mt-button>
      </div>
    </mt-header>
<!--    <div class="fenlei_top">-->
<!--      <div    class="fenlei_top_left">-->
<!--        <input type="text" v-model.trim="queryParam.name" placeholder="搜索姓名" class="ins">-->
<!--      </div>-->
<!--      <div class="fenlei_top_right" @click="isShowDialog2 = true">-->
<!--        <img src="../../static/img/search.png" height="30px;"width="30px;" >-->
<!--      </div>-->
<!--    </div>-->
    <div class="fenlei_top">
      <div class="fenlei_top_left">
        <el-input
          clearable
          placeholder="请输入姓名"
          prefix-icon="el-icon-search"
          v-model.trim="queryParam.name">
        </el-input>
      </div>
      <div class="fenlei_top_right" @click="isShowDialog2 = true">
        <img src="../../static/img/search.png" height="30px;" width="30px;">
      </div>
    </div>
    <div class="fenlei_top_1_1">
      <ul class="store-list-1_1" >

        <li  class="store-list-1-li_1" v-for="(item,index) in headerData" :key="index">
          <div class="overview1">
            <p><strong> {{item.name}}</strong></p>
            <p>  {{item.num}}/{{item.price}}</p>
          </div>
        </li>

      </ul>
    </div>
    <div style="padding-top: 3.86rem">
      <div  class="dingdans_item" v-for="(item,index) in tableData" :key="index">
        <div class="dingdans_top">
          <div class="dingdans_top_left" style="     display: flex;
    justify-content: space-between;
    align-items: center;">
            <div style="width: 15vw">
              <strong> {{item.name}} </strong>
            </div>
            <div  style="width: 15vw">
              <strong style="margin-left: 10px"> {{item.price}} </strong>
            </div>
            <div  style="width: 15vw">
              <strong style="margin-left: 10px"> {{item.type | dictToDescTypeValue(41)}} </strong>
            </div>
            <div  style="width: 30vw">
              <strong style="margin-left: 10px"> {{item.label | dictToDescTypeValue(42)}} </strong>
            </div>
            <div  style="width: 30vw;   display: flex;
    flex-direction: column;align-self: flex-end;">
            <el-button
              type="text"
              style=""
              @click="handleClick(item)">修改</el-button>
            </div>
          </div>
        </div>
      </div>
    </div>
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
            <select class="select100" v-model="queryParam.type">
               <option :disabled="true" value="" selected>请选择类型</option>
              <option v-for="x in typeList" :value="x.fieldValue">{{x.fieldName}}</option>
            </select>
        </mt-field>
        <mt-field label="关系">
            <select class="select100" v-model="queryParam.label">
               <option :disabled="true" value="" selected>请选择关系</option>
              <option v-for="x in labelList" :value="x.fieldValue">{{x.fieldName}}</option>
            </select>
        </mt-field>
      </section>
    </mt-popup>
    <mt-popup
      v-model="isShowDialog">
      <mt-header title="修改">
        <div slot="right">
          <mt-button size="normal"  @click="isShowDialog = false" style="font-size: 16px">关闭</mt-button>
        </div>
        <div slot="left">
          <mt-button size="normal" @click="confirmHandle" style="font-size: 16px">确定</mt-button>
        </div>
      </mt-header>
      <section style="height: 80vw;width: 80vw">
        <mt-field label="姓名"  placeholder="请输入姓名"  style="margin-top: 11vw;" v-model="requestParam.name"></mt-field>
        <mt-field label="金额" placeholder="请输入金额" type="number" v-model="requestParam.price"></mt-field>
        <mt-field label="关系">
            <select class="select80" v-model="requestParam.label">
          <option :disabled="true" value="" selected>请选择</option>
              <option v-for="x in labelList" :value="x.fieldValue">{{x.fieldName}}</option>
            </select>
        </mt-field>
        <mt-field label="类型">
            <select  class="select80" v-model="requestParam.type">
          <option :disabled="true" value="" selected>请选择</option>
              <option v-for="x in typeList" :value="x.fieldValue">{{x.fieldName}}</option>
            </select>
        </mt-field>
      </section>
    </mt-popup>
<!--    <div class="popContainer" v-if="pictureZoomShow" @click="pictureZoomShow = false">-->
<!--      <div class="imageShow">-->
<!--        <img :src="fileUrl + imageZoom" alt="" width="100%" height="100%">-->
<!--      </div>-->
<!--    </div>-->
<!--    <div style="-->
<!--    right: 15px;-->
<!--    bottom: 10vw;-->
<!--    position: absolute;-->
<!--    text-align: center;-->
<!--    ">-->
<!--      <mt-button  @click="handleClick1"  style="margin-left: 5px;-->
<!--    border-radius: 100%;-->
<!--    margin-top: 0px;-->
<!--    height: 55px;-->
<!--    width: 55px;" type="primary">-->
<!--        <img src="../../static/img/add.png" height="30" width="30" slot="icon">-->
<!--      </mt-button>-->
<!--    </div>-->
<!--    <v-footer></v-footer>-->
  </div>
</template>
<script>
  import Baseline from '@/common/_baseline.vue'
  import Footer from '@/common/_footer.vue'
  import { giftApi } from '@/api/gift'
  export default {
    components: {
      'v-baseline': Baseline,
      'v-footer': Footer
    },
    name: "HelloWorld",
    data() {
      return {
        isShowDialog: false,
        orderData2: '',
        isShowDialog2: false,
        titleName: '红包',
        emtityMsg: '没有更多了',
        // pictureZoomShow: false,
        // imageZoom: '',
        // fileUrl: fileUrl,
        queryParam: {
          name: '',
          type: '',
          label: '',
          priceFrom: '',
          priceTo: '',
          updateTimeFrom: '',
          updateTimeTo: '',
          pageSize: 100,
          pageNum: 1
        },
        requestParam: {
          id: '',
          name: '',
          price: '',
          type: 1,
          label: 1
        },
        typeList: [],
        labelList: [],
        dataStatusList: [],
        topStatus: "",
        bottomStatus: "",
        allLoaded: false,
        tableData: [],
        headerData: [],
        totalCount: 1
      }
    },
    created() {
      const { months } = this.$route.query
      if (months) {
        this.queryParam.label = +months
        this.getPage()
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
      handleClick(orderData) {
        this.requestParam.id = orderData.id
        this.requestParam.name = orderData.name
        this.requestParam.price = orderData.price
        this.requestParam.type = orderData.type
        this.requestParam.label = orderData.label
        this.isShowDialog = true
      },
      handleClick1() {
        this.requestParam = {
          id: '',
            name: '',
            price: '',
            type: 1,
            label: 1
        },
        this.isShowDialog = true
      },
      confirmHandle() {
        if(!this.requestParam.name) {
          this.$toast('请输入姓名')
          return
        }
        if(!this.requestParam.price) {
          this.$toast('请输入价格')
          return
        }
        if(!this.requestParam.type) {
          this.$toast('请选择类型')
          return
        }
        if(!this.requestParam.label) {
          this.$toast('请选择关系')
          return
        }
        if (this.requestParam.id) {
          giftApi.update(this.requestParam).then(res => {
            this.$toast(res.subMsg)
            if (res.subCode === 1000) {
              this.getPage()
              this.isShowDialog = false
            }
          })
        } else {
          giftApi.add(this.requestParam).then(res => {
            this.$toast(res.subMsg)
            if (res.subCode === 1000) {
              this.getPage()
              this.isShowDialog = false
            }
          })
        }
        //
        // // 利润= 到手价-运费-原价
        // let profits = this.requestParam.theirPrice - this.requestParam.freight
        //   - this.requestParam.price
        // this.requestParam.profits = parseFloat(profits).toFixed(2)
        //
        // goodsOrderApi.sellGoods(this.requestParam).then(res => {
        //   this.$toast(res.subMsg)
        //   if (res.subCode === 1000) {
        //     this.getPage()
        //     this.isShowDialog = false
        //   }
        // })
      },
      getPage() {
        giftApi.page(this.queryParam).then(res => {
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
        giftApi.data().then(res => {
          if (res.subCode === 1000) {
            this.headerData = res.data
          } else {
            this.$toast(res.subMsg)
          }
        })
      },
      listSysDict() {
        let sysDictList = localStorage.getItem('sysDictList') ? JSON.parse(
          localStorage.getItem('sysDictList')) : []
        this.typeList = sysDictList.filter(item => item.typeValue == 41)
        this.labelList = sysDictList.filter(item => item.typeValue == 42)
      },
      loadData(p_status) {
        // 第一次加载或者下拉刷新最新数据
        if (p_status === "refresh") {
          this.tableData = [];
        }
        giftApi.page(this.queryParam).then(res => {
          if (res.subCode === 1000) {
            let list =  res.data ? res.data.list : []
            if (list && list.length) {
              for (let i = 0; i < list.length; i++) {
                this.tableData.push(list[i])
              }
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
        if (!this.queryParam.name ) {
          this.$toast('请输入姓名')
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
      // changeSystem() {
      //   let sysDictList = localStorage.getItem('sysDictList') ? JSON.parse(
      //     localStorage.getItem('sysDictList')) : []
      //   let res = sysDictList.filter(
      //     item => item.typeValue == 39 && item.fieldValue == this.queryParam.status)
      //   this.titleName = res.length ? res[0].fieldName : ''
      //   this.titleName = this.titleName
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
          name: '',
          type: '',
          label: '',
          priceFrom: '',
          priceTo: '',
          updateTimeFrom: '',
          updateTimeTo: '',
          pageSize: 100,
          pageNum: 1
        }
        this.titleName = '红包'
        // this.changeSystem()
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
      // avatarShow(e) {
      //   this.imageZoom = e
      //   this.pictureZoomShow = true
      // },
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






  .fenlei_top_1_1 {
    border-bottom: 1vw solid #eee;
    display: flex;
    align-items: center;
    justify-content: space-between;
    height: 3rem;
    padding: 0.1rem 0.2rem;
    width: 100vw;
    background: #fff;
    position: fixed;
    top: 0;
    left: 0;
    z-index: 99;
    margin-top:23.6vw;
  }
  .store-list-1_1 {
    /*display: -webkit-box;*/
    display: flex;
    flex-wrap: wrap;
  }
  .store-list-1-li_1{
    border-radius: 10px;
    text-align: center;
    background-color: #EEF2F7;
    color: #333;
    font-size: 13px;
    -webkit-box-sizing: border-box;
    box-sizing: border-box;
    margin-top: 2px;
    margin-right: 6px;
    margin-bottom: 5px;
    margin-left: 4px;
    width: 75px;
  }
  .overview1 {
    padding-top: 5px;
    padding-right: 3px;
    padding-bottom: 1px;
    padding-left: 3px;
  }
  .overview2 {
    padding: 3px;
  }
</style>
