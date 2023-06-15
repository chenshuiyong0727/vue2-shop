<template>
  <div class="hello" ref="hello">
    <mt-header :title="titleName">
      <div slot="left">
        <mt-button  icon="back" @click="$router.go(-1)"></mt-button>
      </div>
    </mt-header>
    <div class="fenlei_top">
      <div    class="fenlei_top_left">
        <input type="text" v-model.trim="queryParam.keyword" placeholder="搜索关键词（货号，商品名）" class="ins">
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
      <div class="dingdans_item" v-for="(item,index) in tableData" :key="index">
        <div class="dingdans_top">
          <div class="dingdans_top_left">
            <strong>{{item.orderNo }}</strong>
          </div>
          <div class="dingdans_top_right">
            <strong v-if="item.status == 7" class="color-success" >{{ item.status | dictToDescTypeValue(37) }} </strong>
            <strong v-else-if="[3,4,5,6,8].includes(item.status)" class="color-danger" >{{ item.status | dictToDescTypeValue(37) }} </strong>
            <strong v-else>{{ item.status | dictToDescTypeValue(37) }} </strong>
          </div>
        </div>
        <div class="dingdans_con">
          <div v-if="item.img" :src="item.img" class="dingdans_con_left wrap" @click="avatarShow(item.img)">
            <img :src="item.img" style="margin-top: 25px;">
            <p class="mark" v-if="item.saleType != 1">
              <span class="text" >
                {{ item.saleType | dictToDescTypeValue(46) }}
              </span>
            </p>
          </div>
          <div v-if="!item.img && item.imgUrl" :src="item.img" class="dingdans_con_left" @click="avatarShow(fileUrl+ item.imgUrl)">
            <img :src="fileUrl + item.imgUrl">
          </div>
          <div class="diangdans_con_right">
            <div class="dingdans_con_right_top">
              货号：<strong style="color: #409EFF"  @click="jumpactNo(item.actNo)">{{item.actNo}} </strong>
              尺码：<strong>{{item.size}}</strong>
              <span>
                 售价：<strong>{{item.shelvesPrice}}</strong>
              </span>
            </div>
            <div class="dingdans_con_right_down" style="margin-bottom: 1vw;margin-top: 1vw;">
              <div  v-if="[2,11].includes(item.status)">
                最低售价：<strong class="color-danger">{{item.thisTimePrice}}</strong>
                预估利润：<strong class="color-danger">{{item.thisTimeProfits}}</strong>
              </div>
              <div v-else>
                <span v-if="item.profits">利润：<strong class="color-danger">{{item.profits}}</strong></span>
              </div>
              <span v-if="item.theirPrice">到手：<strong>{{item.theirPrice}}</strong></span>
              入库价：<strong>{{item.price}}</strong>
            </div>
            <div  class="dingdans_con_right_down" style="margin-bottom: 1vw;margin-top: 1vw;" v-if="item.addressId">
              <strong  v-if="item.status == 3" style="font-size: 12px;" class="color-danger"> {{item.deliveryDeadlineTime |formateTime }}</strong>
              <strong style="font-size: 12px;" >{{ item.addressId | dictToDescTypeValue(38) }} </strong>
            </div>
            <div class="dingdans_con_right_down_1">
              <mt-button
                type="primary"
                size="small"
                @click="jumpactNo(item.actNo)">库存</mt-button>
              <mt-button
                type="primary"
                size="small"
                @click="goDetail(item.id)">详情</mt-button>
              <mt-button
                type="primary"
                size="small"
                @click="handleClick(item)">修改</mt-button>
              <mt-button
                type="danger"
                size="small"
                @click="goDel(item.id)">删除</mt-button>
<!--              <mt-button-->
<!--                type="primary"-->
<!--                size="small"-->
<!--                @click="changeStatusDialog1(item)">修改地址</mt-button>-->
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
      v-model="isShowDialog">
      <mt-header title="修改">
        <div slot="right">
          <mt-button size="normal"  @click="isShowDialog = false" style="font-size: 16px">关闭</mt-button>
        </div>
        <div slot="left">
          <mt-button size="normal" @click="confirmHandle" style="font-size: 16px">确定</mt-button>
        </div>
      </mt-header>
      <section style="height: 147vw;width: 100vw">
        <mt-field label="货号" style="margin-top: 11vw;" v-model="orderData.actNo" :disabled="true"></mt-field>
        <mt-field label="尺码" v-model="orderData.size" :disabled="true"></mt-field>
        <mt-field label="运单号" placeholder="请输入运单号"  v-model="requestParam.waybillNo"></mt-field>
        <mt-field label="地址">
            <el-select size="small" class="select100" v-model="requestParam.addressId">
            <el-option :disabled="true" value="" selected>请选择</el-option>
            <el-option
              v-for="item in addressList"
              :key="item.fieldValue"
              :label="item.fieldName"
              :value="+item.fieldValue">
            </el-option>
<!--              <el-option v-for="x in addressList" :value="x.fieldValue">{{x.fieldName}}</el-option>-->
            </el-select>
        </mt-field>
        <mt-field label="状态">
          <el-select size="small" class="select100" v-model="requestParam.status">
            <el-option label="状态" value=""></el-option>
            <el-option
              v-for="item in statusList"
              :key="item.fieldValue"
              :label="item.fieldName"
              :value="+item.fieldValue">
            </el-option>
          </el-select>
        </mt-field>
        <mt-field label="瑕疵原因" v-if="requestParam.status == 8" placeholder="请输入瑕疵原因"  v-model="requestParam.reason"></mt-field>
        <mt-field label="发货截止时间">
          <el-date-picker size="small" class="select100" style="width: 62vw"
                          type="datetime" placeholder="发货截止时间"
                          v-model="requestParam.deliveryDeadlineTime"
                          value-format="yyyy-MM-dd HH:mm:ss">></el-date-picker>
        </mt-field>
        <mt-field label="入库价" placeholder="请输入入库价" @keyup.native="keyup1($event)" type="number" v-model="requestParam.price"></mt-field>
        <mt-field label="出售价格" placeholder="请输入出售价格" @keyup.native="keyup1($event)" type="number" v-model="requestParam.shelvesPrice"></mt-field>
        <mt-field label="补贴价格" placeholder="请输入补贴价格" @keyup.native="keyup1($event)" type="number" v-model="requestParam.subsidiesPrice"></mt-field>
        <mt-field label="手续费" placeholder="请输入手续费" @keyup.native="keyup1($event)" type="number" v-model="requestParam.poundage"></mt-field>
        <mt-field label="运费" placeholder="请输入运费" @keyup.native="keyup1($event)" type="number" v-model="requestParam.freight"></mt-field>
        <mt-field label="到手价" placeholder="请输入到手价" @keyup.native="keyup2($event)" type="number" v-model="requestParam.theirPrice"></mt-field>
        <mt-field label="利润" placeholder="请输入利润" @keyup.native="keyup1($event)" type="number" v-model="requestParam.profits"></mt-field>
      </section>
    </mt-popup>
    <mt-popup
      v-model="isShowDialog1">
      <mt-header title="修改地址" >
        <div slot="right">
          <mt-button size="normal"  @click="isShowDialog1 = false" style="font-size: 16px">关闭</mt-button>
        </div>
        <div slot="left">
          <mt-button size="normal" @click="updateAddress" style="font-size: 16px">确定</mt-button>
        </div>
      </mt-header>
      <section style="height: 85vw;width: 80vw">
        <mt-field label="货号" style="margin-top: 11vw;" v-model="orderData1.actNo" :readonly="1==1"></mt-field>
        <mt-field label="尺码" v-model="orderData1.size" :readonly="1==1"></mt-field>
        <mt-field label="运费" placeholder="请输入运费"  type="number" v-model="requestParam1.freight"></mt-field>
        <mt-field label="运单号" placeholder="请输入运单号"  v-model="requestParam1.waybillNo"></mt-field>
        <mt-field label="地址">
            <el-select size="small"class="select80" v-model="requestParam1.addressId">
              <el-option :disabled="true" value="" selected>请选择</el-option>
<!--              <el-option v-for="x in addressList" :value="x.fieldValue">{{x.fieldName}}</el-option>-->
              <el-option
                v-for="item in addressList"
                :key="item.fieldValue"
                :label="item.fieldName"
                :value="+item.fieldValue">
              </el-option>
            </el-select>
        </mt-field>
      </section>
    </mt-popup>
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
      <section style="height: 90vw;width: 100vw">
        <mt-field label="状态" style="margin-top: 12vw;">
          <el-select size="small" class="select100" v-model="queryParam.status" @change="changeSystem">
            <el-option  label="状态" value=""></el-option>
            <el-option
              v-for="item in statusList"
              :key="item.fieldValue"
              :label="item.fieldName"
              :value="+item.fieldValue">
            </el-option>
          </el-select>
        </mt-field>
        <mt-field label="地址">
            <el-select size="small" class="select100" v-model="queryParam.addressId">
               <el-option :disabled="true" value="" selected>请选择地址</el-option>
<!--              <el-option v-for="x in addressList" :value="x.fieldValue">{{x.fieldName}}</el-option>-->
              <el-option
                v-for="item in addressList"
                :key="item.fieldValue"
                :label="item.fieldName"
                :value="+item.fieldValue">
              </el-option>
            </el-select>
        </mt-field>
        <mt-field label="销售类型">
          <el-select size="small" class="select100" v-model="queryParam.saleType" @change="changeSystem1">
            <el-option  label="销售类型" value=""></el-option>
            <el-option
              v-for="item in saleTypeList"
              :key="item.fieldValue"
              :label="item.fieldName"
              :value="+item.fieldValue">
            </el-option>
          </el-select>
        </mt-field>
<!--        <mt-field label="成功开始时间" type="date" placeholder="成功开始时间"  v-model="queryParam.successTimeFrom" ></mt-field>-->
<!--        <mt-field label="成功结束时间" type="date" placeholder="成功结束时间"  v-model="queryParam.successTimeTo" ></mt-field>-->
        <mt-field label="成功开始时间">
          <el-date-picker class="select100"
                          size="small"
                          v-model="queryParam.successTimeFrom" value-format="yyyy-MM-dd"
                          type="date" placeholder="成功开始时间">
          </el-date-picker>
        </mt-field>
        <mt-field label="成功结束时间">
          <el-date-picker class="select100"
                          size="small"
                          v-model="queryParam.successTimeTo" value-format="yyyy-MM-dd"
                          type="date" placeholder="成功结束时间">
          </el-date-picker>
        </mt-field>
        <mt-field label="运单号" placeholder="请输入运单号"  v-model="queryParam.waybillNo"></mt-field>
        <mt-field label="订单号" placeholder="请输入订单号"  v-model="queryParam.orderNo"></mt-field>
        <mt-field label="尺码" placeholder="请输入尺码"  v-model="queryParam.size"></mt-field>
      </section>
    </mt-popup>
    <div class="popContainer" v-if="pictureZoomShow" @click="pictureZoomShow = false">
      <div class="imageShow">
        <img :src="imageZoom" alt="" width="100%" height="100%">
      </div>
    </div>
    <v-footer></v-footer>
  </div>
</template>
<script>
  import Baseline from '@/common/_baseline.vue'
  import Footer from '@/common/_footer.vue'
  import { goodsOrderApi } from '@/api/goodsOrder'
  import { parseTime } from '@/utils/index'

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
        mockArr: [],
        imageZoom: '',
        pictureZoomShow: true,
        requestParam1: {
          id: '',
          waybillNo: '',
          freight: '',
          addressId: ''
        },
        requestParam: {
          id: '',
          status: '',
          saleType: '',
          price: '',
          shelvesPrice: '',
          deliveryDeadlineTime: '',
          subsidiesPrice: '',
          freight: '',
          poundage: '',
          theirPrice: '',
          profits: '',
          waybillNo: '',
          reason: '色差',
          addressId: ''
        },
        // popupVisible: false,
        titleName: '订单',
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
        saleType: '',
        queryParam: {
          id: '',
          size: '',
          saleType: '',
          keyword: '',
          orderNo: '',
          inventoryId: '',
          status: '',
          shelvesPriceFrom: '',
          shelvesPriceTo: '',
          freightFrom: '',
          freightTo: '',
          poundageFrom: '',
          poundageTo: '',
          theirPriceFrom: '',
          theirPriceTo: '',
          addressId: '',
          waybillNo: '',
          createTimeFrom: '',
          createTimeTo: '',
          updateTimeFrom: '',
          updateTimeTo: '',
          sellTimeFrom: '',
          sellTimeTo: '',
          successTimeFrom: '',
          successTimeTo: '',
          pageSize: 20,
          pageNum: 1
        },
        topStatus: "",
        bottomStatus: "",
        allLoaded: false,
        mockArr: [],
        addressList: [],
        statusList: [],
        dataStatusList: [],
        saleTypeList: [],
        sellTime: '',
        successTime: '',
        startDate: new Date(),
        createTime: '',
        updateTime: '',
        months: '',
        status: '',
        selectedId: [],
        ids: [],
        tableData: [],
        totalCount: 1
      }
    },
    activated() {
      // 新开的页面
      this.isBack = false
      if (!this.$route.meta.isBack) {
        this.listSysDict()
        this.resetData()
        //isBack 时添加中router中的元信息，判读是否要缓存
        const { actNo,status,months,orderNo ,saleType} = this.$route.query
        if (saleType ) {
          this.saleType = saleType
          this.queryParam.saleType = saleType
          this.changeOrder()
        }
        this.queryParam.orderNo = orderNo
        this.queryParam.keyword = actNo
        if (status){
          this.status = + status
          this.queryParam.status = + status
        }
        this.months = months
        if (this.queryParam.keyword || this.queryParam.status || this.months || this.queryParam.orderNo|| this.queryParam.saleType) {
          if(this.queryParam.status){
            this.changeSystem()
          }
          if (this.months) {
            this.queryParam.successTimeFrom = this.months
            this.queryParam.successTimeTo = this.months
            this.titleName = this.months + ' 订单'
          }
        }
        this.getPage()
      }else {
        this.$refs.hello.scrollTop = this.curScrollTop
      }
    },
    // beforeRouteEnter(to, from, next) {
    //   // console.info('beforeRouteEnter')
    //   this.$refs.loadmore.scrollTo(0, 1000);
    //
    //   // next(vm => {
    //   //   console.info('beforeRouteEnter')
    //   //   // window.scroll(0, 1000 )
    //   //   this.$refs.loadmore.scrollTo(0, 1000);
    //   //
    //   //   // document.documentElement.scrollTop = 10000
    //   //   // 回到原来的位置
    //   //   // const position = JSON.parse(localStorage.getItem('position'))
    //   //   // console.info(position)
    //   //   // // document.querySelector('.dingdans_item').scrollTop = position
    //   //   // // let recruitScrollY = this.$store.state.recruitScrollY
    //   //   // window.scroll(0, position)
    //   // })
    // },
    // beforeRouteLeave(to, from, next) {
    //   console.info('beforeRouteLeave')
    //   // 保存离开页面时的位置
    //   const position = document.querySelector('.dingdans_item').scrollTop
    //   window.sessionStorage.setItem('position', JSON.stringify(position))
    //   next()
    // },
    beforeRouteLeave(to, from, next) {
      // let position = window.scrollY //记录离开页面的位置
      // console.info("position1" , position)
      // if (position == null)
      // position = document.querySelector('.dingdans_item').scrollTop
      // console.info("position2" , position)
      // localStorage.setItem('position', JSON.stringify(position)
      // this.scrollTop = document.documentElement.scrollTop || document.body.scrollTop
      // this.curScrollTop = document.documentElement.scrollTop || window.pageYOffset || document.body.scrollTop || 0

      // console.info('beforeRouteLeave' , document.documentElement.scrollTop )
      // console.info('beforeRouteLeave' , window.pageYOffset )
      // console.info('beforeRouteLeave' , document.body.scrollTop )
      // var scrollTop = document.querySelector(".mint-loadmore").scrollTop;
      // let clientHeight = document.querySelector(".mint-loadmore").clientHeight;
      // var scrollview = document.querySelector('.mint-loadmore').scrollHeight;
      // console.log(scrollTop,"scrollTop");
      // console.log(clientHeight,"clientHeight");
      // console.log(scrollview,"scrollview");
      if (to.path == "/store" || to.path  =="/orderDetail") {
        // console.info(this.isBack)
        //当离开的时候是去库存页的时候开启缓存
        from.meta.isBack = this.isBack;
        // this.curScrollTop = document.querySelector('.mint-loadmore').scrollHeight;
      }else {
        this.curScrollTop = 0
        from.meta.isBack = false;
      }
      // this.$store.commit('changeRecruitScrollY', position) //离开路由时把位置存起来
      next()
    },
    // beforeRouteEnter(to, from, next) {
    //   console.info('beforeRouteEnter' +to.name )
    //   // if (to.name === 'NewRecruit') {//跳转的的页面的名称是"NewRecruit",这里就相当于我们listview页面，或者原始页面
    //     let recruitScrollY = this.$store.state.recruitScrollY
    //     window.scroll(0, recruitScrollY)
    //   // }
    // },
    methods: {
      successTimeChange() {
        if (this.successTime) {
          this.queryParam.successTimeFrom = this.successTime[0]
          this.queryParam.successTimeTo = this.successTime[1]
        } else {
          this.queryParam.successTimeFrom = null
          this.queryParam.successTimeTo = null
        }
      },
      getPage() {
        goodsOrderApi.page(this.queryParam).then(res => {
          if (res.subCode === 1000) {
            this.tableData = res.data ? res.data.list : []
            this.totalCount = res.data ? res.data.pageInfo.totalCount : 0
            if (this.totalCount == 0) {
              this.allLoaded = true;
              this.emtityMsg = '暂无相关订单 -.-'
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
        this.addressList = sysDictList.filter(item => item.typeValue == 38)
        this.statusList = sysDictList.filter(item => item.typeValue == 37)
        this.dataStatusList = sysDictList.filter(item => item.typeValue == 36)
        this.saleTypeList = sysDictList.filter(item => item.typeValue == 46)
      },
      loadData(p_status) {
        // 第一次加载或者下拉刷新最新数据
        if (p_status === "refresh") {
          this.tableData = [];
        }
        goodsOrderApi.page(this.queryParam).then(res => {
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
          this.$toast('请输入关键字')
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
          item => item.typeValue == 37 && item.fieldValue == this.queryParam.status)
        this.titleName = res.length ? res[0].fieldName : ''
        this.titleName = this.titleName + '订单'
      },
      changeOrder() {
        let sysDictList = localStorage.getItem('sysDictList') ? JSON.parse(
          localStorage.getItem('sysDictList')) : []
        let res = sysDictList.filter(
          item => item.typeValue == 46 && item.fieldValue == this.queryParam.saleType)
        this.titleName = res.length ? res[0].fieldName : ''
        this.titleName = this.titleName + '订单'
      },
      changeSystem1() {
        this.$forceUpdate()
      },
      search1() {
        this.queryParam.pageNum = 1
        this.allLoaded = false;
        this.isShowDialog2 = false
        this.getPage()
      },
      resetData() {
        this.queryParam ={
          id: '',
          size: '',
          keyword: '',
          orderNo: '',
          inventoryId: '',
          status: '',
          shelvesPriceFrom: '',
          shelvesPriceTo: '',
          freightFrom: '',
          freightTo: '',
          poundageFrom: '',
          poundageTo: '',
          theirPriceFrom: '',
          theirPriceTo: '',
          addressId: '',
          waybillNo: '',
          createTimeFrom: '',
          createTimeTo: '',
          updateTimeFrom: '',
          updateTimeTo: '',
          sellTimeFrom: '',
          sellTimeTo: '',
          successTimeFrom: '',
          successTimeTo: '',
          pageSize: 20,
          pageNum: 1
         }
        this.allLoaded = false;
        this.isShowDialog2 = false
      },
      resetHandle() {
        this.queryParam = {
          id: '',
          keyword: '',
          size: '',
          orderNo: '',
          inventoryId: '',
          status: '',
          shelvesPriceFrom: '',
          shelvesPriceTo: '',
          freightFrom: '',
          freightTo: '',
          poundageFrom: '',
          poundageTo: '',
          theirPriceFrom: '',
          theirPriceTo: '',
          addressId: '',
          waybillNo: '',
          createTimeFrom: '',
          createTimeTo: '',
          updateTimeFrom: '',
          updateTimeTo: '',
          sellTimeFrom: '',
          sellTimeTo: '',
          successTimeFrom: '',
          successTimeTo: '',
          pageSize: 20,
          pageNum: 1
        }
        this.titleName = '订单'
        this.createTime = ''
        this.updateTime = ''
        this.sellTime = ''
        this.successTime = ''
        if(this.saleType) {
          this.queryParam.saleType = this.saleType
        }
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
      keyup1() {
        let poundage = this.requestParam.shelvesPrice * 0.075 + 38 + 8.5
        this.requestParam.poundage = parseFloat(poundage).toFixed(2)

        let theirPrice = this.requestParam.subsidiesPrice * 1 + this.requestParam.shelvesPrice
          - (this.requestParam.shelvesPrice * 0.075 + 38 + 8.5)
        this.requestParam.theirPrice = parseFloat(theirPrice).toFixed(2)

        let profits = this.requestParam.theirPrice - this.requestParam.freight
          - this.requestParam.price
        this.requestParam.profits = parseFloat(profits).toFixed(2)
      },
      keyup2() {
        let poundage = this.requestParam.shelvesPrice * 0.075 + 38 + 8.5
        this.requestParam.poundage = parseFloat(poundage).toFixed(2)

        let profits = this.requestParam.theirPrice - this.requestParam.freight
          - this.requestParam.price
        this.requestParam.profits = parseFloat(profits).toFixed(2)
      },
      confirmHandle() {
        if(this.requestParam.status == 7 && !this.requestParam.freight) {
          this.$toast('请输入运费')
          return
        }
        if(this.requestParam.status == 3 && !this.requestParam.addressId) {
          this.$toast('请选择地址')
          return
        }
        if(this.requestParam.status == 8 && !this.requestParam.reason) {
          this.$toast('请输入瑕疵原因')
          return
        }
        if(this.requestParam.status == 3 && !this.requestParam.deliveryDeadlineTime) {
          this.$toast('发货截止时间为空')
          return
        }
        // 利润= 到手价-运费-原价
        let profits = this.requestParam.theirPrice - this.requestParam.freight
          - this.requestParam.price
        this.requestParam.profits = parseFloat(profits).toFixed(2)

        goodsOrderApi.sellGoods(this.requestParam).then(res => {
          this.$toast(res.subMsg)
          if (res.subCode === 1000) {
            this.getPage()
            this.isShowDialog = false
          }
        })
      },
      updateAddress() {
        goodsOrderApi.update(this.requestParam1).then(res => {
          this.$toast(res.subMsg)
          if (res.subCode === 1000) {
            this.getPage()
            this.isShowDialog1 = false
          }
        })
      },
      changeStatusDialog1(row) {
        this.orderData1 = row
        this.requestParam1.id = this.orderData1.id
        this.requestParam1.freight = this.orderData1.freight
        this.requestParam1.waybillNo = this.orderData1.waybillNo
        this.requestParam1.addressId = this.orderData1.addressId

        this.isShowDialog1 = true
      },
      jumpactNo(actNo) {
        this.isBack = true
        this.curScrollTop = document.querySelector('.mint-loadmore').scrollHeight;
        this.$router.push({ path: '/store', query: { actNo } })
      },
      goDetail(id) {
        this.isBack = true
        this.curScrollTop = document.querySelector('.mint-loadmore').scrollHeight;
        this.$router.push({ path: '/orderDetail', query: { id } })
      },
      // goDel(id) {
      //   this.$confirm('是否删除', '提示', {
      //     confirmButtonText: '确定',
      //     cancelButtonText: '取消',
      //     type: 'warning'
      //   }).then(() => {
      //     goodsOrderApi.delById(id).then(res => {
      //       if (res.subCode === 1000) {
      //         this.$message.success(res.subMsg)
      //         this.getPage()
      //       } else {
      //         this.$message.error(res.subMsg)
      //       }
      //     })
      //   })
      // },
      goDel(id) {
        this.$confirm('是否删除',"提示",{
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type:"warning",
        }).then(() => {
          goodsOrderApi.delById(id).then(res => {
            this.$toast(res.subMsg)
            if (res.subCode === 1000) {
              this.getPage()
            }
          })
        }).catch(() => {
        })
      },

      handleClick(orderData) {
        this.orderData = orderData
        this.requestParam.id = this.orderData.id
        this.requestParam.price = this.orderData.price
        this.requestParam.shelvesPrice = this.orderData.shelvesPrice

        this.requestParam.subsidiesPrice = this.orderData.subsidiesPrice
        this.requestParam.deliveryDeadlineTime = parseTime(this.orderData.deliveryDeadlineTime)
        this.requestParam.freight = this.orderData.freight
        this.requestParam.waybillNo = this.orderData.waybillNo
        this.requestParam.addressId = this.orderData.addressId
        if (this.orderData.status != 11) {
          this.requestParam.status = this.orderData.status + 1
        } else{
          this.requestParam.status = 6
        }
        if (!this.orderData.poundage) {
          let poundage = this.requestParam.shelvesPrice * 0.075 + 38 + 8.5
          this.requestParam.poundage = parseFloat(poundage).toFixed(2)
        } else {
          this.requestParam.poundage = this.orderData.poundage
        }
        if (!this.orderData.theirPrice) {
          let theirPrice = this.requestParam.subsidiesPrice * 1 + this.requestParam.shelvesPrice
            - (this.requestParam.shelvesPrice * 0.075 + 38 + 8.5)
          this.requestParam.theirPrice = parseFloat(theirPrice).toFixed(2)
        } else {
          this.requestParam.theirPrice = this.orderData.theirPrice
        }
        if (!this.orderData.profits) {
          let profits = this.requestParam.theirPrice - this.requestParam.freight
            - this.requestParam.price
          this.requestParam.profits = parseFloat(profits).toFixed(2)
        } else {
          this.requestParam.profits = this.orderData.profits
        }
        this.isShowDialog = true
      }
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
  .dingdans_con_right_down_1 {
    margin-left: 9vw;
    margin-bottom: -2vw;
    font-size: 3.5vw;
  }
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
    /*overflow:hidden;*/

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
  .el-date-picker.has-time .el-picker-panel__body-wrapper {
    position: relative;
    margin-right: 52px;
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
  .mark {
    position: absolute;
    top: 0;
    left: 0;
    margin: 0;
  }

  .mark:before {
    content: "";
    position: absolute;
    top: 0;
    left: 0;
    z-index: 1;
    border-right-style: solid;
    border-bottom-style: solid;
    border-left-style: solid;
    border-right-width: 30px;
    border-bottom-width: 16px;
    border-left-width: 20px;
  }

  .text {
    color: white;
    display: inline-block;
    position: absolute;
    left: 0;
    z-index: 1;
    font-size: 11px;
    text-transform: uppercase;
    width: 51px;
    text-align: center;
    margin-top: 2.1px;
  }
</style>
