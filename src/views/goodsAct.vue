<template>
  <div class="hello" ref="goodsAct">
    <mt-header title="首创奥莱活动">
      <div slot="left" v-if="isActUser !=1">
        <mt-button  icon="back" @click="$router.go(-1)"></mt-button>
      </div>
      <div slot="left" v-else>
        <mt-button  icon="back" @click="$router.push({ path: '/logout?type=1' })"></mt-button>
      </div>
    </mt-header>
    <div class="fenlei_top">
      <div    class="fenlei_top_left">
        <input type="text" v-model.trim="queryParam.keyword" placeholder="搜索关键词（货号，商品名，价格）" class="ins">
      </div>
      <div class="fenlei_top_right" >
        <mt-button
          style="margin-left: -65px"
          type="primary"
          size="small"
          @click="search">搜索</mt-button>
        <mt-button
          style="
           padding-top: 1.3px;
           margin-left: 12px;
           width: 67px;"
          type="primary"
          size="small"
          @click="isShowDialog2 = true">  <img style="margin-left: -10px;" src="../../static/img/choose.png" height="20" width="20" slot="icon">
          <span style="margin-left: -5px;">筛选</span>
          </mt-button>
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
      <div class="dingdans_item_act" v-for="(item,index) in tableData" :key="index">
<!--        <div class="dingdans_top">-->
<!--          <div class="dingdans_top_left">-->
<!--            <strong v-if="item.goodsName"-->
<!--                    @click="scanCode(item.goodsId, 1) "-->
<!--                    :style="item.goodsId ? 'color: #409EFF' : ''">-->
<!--              {{item.goodsName | sizeFilter }}-->
<!--            </strong>-->
<!--            <strong v-else  @click="scanCode(item.goodsId, 1) " :style="item.goodsId ? 'color: #409EFF' : ''">-->
<!--              {{item.actNo}}-->
<!--            </strong>-->
<!--          </div>-->
<!--          <div class="dingdans_top_right">-->
<!--            类型：<strong-->
<!--            class="color-danger"-->
<!--          > {{ item.type | dictToDescTypeValue(20221108) }}</strong>-->
<!--          </div>-->
<!--        </div>-->
        <div class="dingdans_con_act">
<!--          <div  :src="item.img" class="dingdans_con_left" @click="avatarShow(item.img)">-->
<!--            <img :src="item.img">-->
<!--          </div>-->
          <div v-if="item.img" :src="item.img" class="dingdans_con_left wrap" @click="avatarShow(item.img)">
            <img :src="item.img" style="margin-top: 25px;">
            <p class="mark1">
              <span class="text1" >
                {{ item.type | dictToDescTypeValue(20221108) }}
              </span>
            </p>
          </div>
          <div class="diangdans_con_right21" style="    margin-top: 30px;">
            <div class="dingdans_con_right_top" style="margin-top: -28px;">
              <strong v-if="item.goodsName"
                      @click="scanCode(item.goodsId, 1,item.spuId) "
                      :style="item.goodsId ? 'color: #409EFF' : ''">
                {{item.goodsName }}
              </strong>
<!--              货号：<strong style="color: #409EFF"  @click="jumpactNo(item.actNo)">{{item.actNo}} </strong>-->
<!--              价格：<strong  class="color-danger">{{item.price}} </strong>-->
<!--              类型：<strong class="color-danger"> {{ item.type | dictToDescTypeValue(20221108) }}</strong>-->
              <!--              类型：<strong style="color: #409EFF" > {{ item.type | dictToDescTypeValue(20221108) }}</strong>-->
            </div>
            <div class="dingdans_con_right_down"  style="margin-bottom: 0px;">
             <strong class="color-danger" @click="copyUrl(item.actNo)">{{item.actNo}} </strong>
<!--              <strong class="color-danger"> {{ item.type | dictToDescTypeValue(20221108) }}</strong>-->
              库存：<strong :class="item.num > 50 ? 'color-danger' : ''" >{{item.num}} </strong>
<!--              价格：<strong  >{{item.price}} </strong>-->
            </div>
            <div class="dingdans_con_right_down" style="margin-bottom: 0px;"  >
              折后价：<strong class="color-danger" >{{item.price}} </strong>
              原价：<strong  >{{item.price/0.65  | numFilter0 }} </strong>
            </div>
            <div class="dingdans_con_right_down" style="margin-bottom: 0px;"  >
              到手：<strong class="color-danger" >{{item.thisTimeThePrice}} </strong>
              周均价：<strong  >{{item.sevenAveragePrice}} </strong>
            </div>
            <div class="dingdans_con_right_down" style="margin-bottom: 0px;"  >
              利润：<strong :class="item.thisTimeProfits > 50 ? 'color-danger' : ''" >{{item.thisTimeProfits}} </strong>
              周销量：<strong :class="item.sevenSaleCount > 10 ? 'color-danger' : ''" >{{item.sevenSaleCount}} </strong>
              <span v-if="item.thisTimeProfits <= 0" style="margin-left: 20px;">垃圾</span>
              <strong v-if="item.thisTimeProfits >= 50 && item.sevenSaleCount >= 10 && item.num >= 50"
                    class="color-danger" style="margin-left: 5px;font-size: 20px;">冲冲冲</strong>
            </div>
          </div>
          <div class="diangdans_con_right22"  @click="gotoDw(item.spuId)"  style="margin-top: 10px;">
            <img src="../../static/img/dw.png" height="30px;"width="30px;" >
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
      <section style="height: 120vw;width: 100vw">
<!--        <mt-field label="状态" style="margin-top: 11vw;">-->
<!--            <select class="select100" v-model="queryParam.type" @change="changeSystem" >-->
<!--               <option :disabled="true" value="" selected>请选择类型</option>-->
<!--              <option v-for="x in typeList" :value="x.fieldValue">{{x.fieldName}}</option>-->
<!--            </select>-->
<!--        </mt-field>-->
        <mt-field label="类型" style="margin-top: 11vw;">
<!--            <select class="select100" v-model="queryParam.type" @change="changeSystem" >-->
<!--          <option :disabled="true" value="" selected>请选择类型</option>-->
<!--              <option v-for="x in typeList" :value="x.fieldValue">{{x.fieldName}}</option>-->
<!--            </select>-->
            <el-select size="small" class="select100" v-model="queryParam.type"  >
          <el-option :disabled="true" value="" selected>请选择类型</el-option>
          <el-option
            v-for="item in typeList"
            :key="item.fieldValue"
            :label="item.fieldName"
            :value="item.fieldValue">
          </el-option>
            </el-select>
        </mt-field>
        <mt-field label="排序">
<!--            <select class="select100" v-model="queryParam.type" @change="changeSystem" >-->
<!--          <option :disabled="true" value="" selected>请选择类型</option>-->
<!--              <option v-for="x in typeList" :value="x.fieldValue">{{x.fieldName}}</option>-->
<!--            </select>-->
            <el-select size="small" class="select100" v-model="queryParam.sort" >
          <el-option :disabled="true" value="" selected>请选择排序</el-option>
          <el-option
            v-for="item in sortList"
            :key="item.fieldValue"
            :label="item.fieldName"
            :value="item.fieldValue">
          </el-option>
            </el-select>
        </mt-field>
        <mt-field label="价格开始"  placeholder="价格开始" type="NUMBER" v-model="queryParam.priceFrom" ></mt-field>
        <mt-field label="价格结束"  placeholder="价格结束" type="NUMBER" v-model="queryParam.priceTo" ></mt-field>
        <mt-field label="利润开始"  placeholder="利润开始" type="NUMBER" v-model="queryParam.profitsFrom" ></mt-field>
        <mt-field label="利润结束"  placeholder="利润结束" type="NUMBER" v-model="queryParam.profitsTo" ></mt-field>
        <mt-field label="库存开始"  placeholder="库存开始" type="NUMBER" v-model="queryParam.numFrom" ></mt-field>
        <mt-field label="库存结束"  placeholder="库存结束" type="NUMBER" v-model="queryParam.numTo" ></mt-field>
        <mt-field label="销量开始"  placeholder="销量开始" type="NUMBER" v-model="queryParam.sevenSaleCountFrom" ></mt-field>
        <mt-field label="销量结束"  placeholder="销量结束" type="NUMBER" v-model="queryParam.sevenSaleCountTo" ></mt-field>
      </section>
    </mt-popup>
    <div class="popContainer" v-if="pictureZoomShow" @click="pictureZoomShow = false">
      <div class="imageShow">
        <img :src="imageZoom" alt="" width="100%" height="100%">
      </div>
    </div>
    <div style="
    right: 15px;
    bottom: 10vw;
    position: absolute;
    text-align: center;
    ">
      <mt-button  @click="goods" :class="showSd ? 'zhihui' : ''"  style="margin-left: 5px;
    border-radius: 100%;
    margin-top: 0px;
    height: 55px;
    width: 55px;" type="primary">
        <img src="../../static/img/ccc.png" height="30" width="30" slot="icon">
      </mt-button>
    </div>
<!--    <v-footer></v-footer>-->
  </div>
</template>
<script>
  import Baseline from '@/common/_baseline.vue'
  import Footer from '@/common/_footer.vue'
  import { goodsActApi } from '@/api/goodsAct'
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
        orderData2: '',
        isActUser: '',
        isShowDialog2: false,
        titleName: '首创奥莱活动',
        emtityMsg: '人家是有底线的 -.-',
        pictureZoomShow: false,
        imageZoom: '',
        showSd: false,
        fileUrl: fileUrl,
        queryParam: {
          type: '',
          sort: 1,
          keyword: '',
          priceFrom: '',
          priceTo: '',
          profitsFrom: '',
          profitsTo: '',
          numFrom: '',
          numTo: '',
          sevenSaleCountFrom: '',
          sevenSaleCountTo: '',
          pageSize: 20,
          pageNum: 1
        },
        typeList: [],
        sortList: [
          { fieldValue: '', fieldName: '请选择排序' },
          { fieldValue: 1, fieldName: '利润降序' },
          { fieldValue: 2, fieldName: '利润升序' },
          { fieldValue: 3, fieldName: '销量降序' },
          { fieldValue: 4, fieldName: '销量升序' },
          { fieldValue: 5, fieldName: '库存降序' },
          { fieldValue: 6, fieldName: '库存升序' },
          { fieldValue: 7, fieldName: '价格降序' },
          { fieldValue: 8, fieldName: '价格升序' }
        ],
        topStatus: "",
        bottomStatus: "",
        allLoaded: false,
        tableData: [],
        totalCount: 1
      }
    },
    // mounted() {
    //   this.getPage()
    //   this.listSysDict()
    // },
    activated() {
      this.isActUser =  localStorage.getItem('isActUser')
      // 新开的页面
      this.isBack = false
      if (!this.$route.meta.isBack) {
        this.queryParam.pageNum = 1
        this.getPage()
        this.listSysDict()
      } else {
        this.$refs.goodsAct.scrollTop = this.curScrollTop
      }
    },
    beforeRouteLeave(to, from, next) {
      let path = to.path
      if (path == "/scanCode") {
        from.meta.isBack = true;
      }else {
        this.curScrollTop = 0
        from.meta.isBack = false;
      }
      next()
    },
    methods: {
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
        this.$toast('已复制至系统剪切板')
      },
      gotoDw(spuId) {
        if (!spuId){
          return
        }
        // let url = "https://www.dewu.com/router/product/ProductDetail?spuId=";
        let url = "https://m.dewu.com/router/product/ProductDetail?spuId=";
        window.location.href = url + spuId;
      },
      // goDetail(id, type) {
      //   this.$router.push({ path: '/otherAdd', query: { id, type } })
      // },
      getPage() {
        goodsActApi.page(this.queryParam).then(res => {
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
        goodsActApi.page(this.queryParam).then(res => {
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
          type: '',
          sort: 1,
          keyword: '',
          priceFrom: '',
          priceTo: '',
          profitsFrom: '',
          profitsTo: '',
          numFrom: '',
          numTo: '',
          sevenSaleCountFrom: '',
          sevenSaleCountTo: '',
          pageSize: 20,
          pageNum: 1
        }
        this.titleName = '活动'
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
      goods() {
        this.showSd =  !this.showSd
        if (this.showSd){
          this.queryParam.profitsFrom = 50
          this.queryParam.sevenSaleCountFrom = 10
          this.queryParam.numFrom = 10
          this.queryParam.pageNum = 1
        } else{
          this.queryParam.profitsFrom = ''
          this.queryParam.sevenSaleCountFrom = ''
          this.queryParam.numFrom = ''
          this.queryParam.pageNum = 1
        }
        this.getPage()
      },
      scanCode(id, flag,spuId) {
        // let isActUser = localStorage.getItem('isActUser')
        if (this.isActUser == 1) {
          this.gotoDw(spuId)
          return
        }
        this.isBack = true
        this.curScrollTop = document.querySelector('.mint-loadmore').scrollHeight;
        this.$router.push({ path: '/scanCode', query: { id, flag } })
      },
      // jumpactNo(actNo) {
      //   this.$router.push({ path: '/store', query: { actNo } })
      // },
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
  .dingdans_item_act {
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

  .dingdans_con_act {
    display: flex;
    align-items: center;
    justify-content: flex-start;
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

  .diangdans_con_right21 {
    width: 110vw;
    padding-left: 10px;
  }
  .diangdans_con_right22 {
    width: 15vw;
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
    width: 76vw;
    /*width: 5.7rem;*/
    padding: 0.2rem;

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
