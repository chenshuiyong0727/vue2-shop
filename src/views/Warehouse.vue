<template>
  <div class="hello" ref="hello">
    <mt-header title="仓库">
      <div slot="left">
        <mt-button  icon="back" @click="$router.go(-1)"></mt-button>
      </div>
      <div slot="right">
        <el-dropdown trigger="click" style="margin-left: 1px;">
           <mt-button size="normal">
            <img  style="width: 25px" src="../../static/img/slh.png">
          </mt-button>
          <el-dropdown-menu slot="dropdown" >
            <el-dropdown-item type="text" @click.native="goGoodsBase">商品入库</el-dropdown-item>
            <el-dropdown-item type="text" @click.native="syncOldPriceToNew1">确认变更</el-dropdown-item>
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
      <div :style="!storeData.upCout ? 'margin-right: 6vw; display: flex;' : 'margin-right: 4vw;display: flex;' ">
        <span style="" :class="queryParam.inventory==1 && queryParam.today==7 ? 'activity' : ''" @click="searchStatus(1,7)">变更</span>
        <i v-if="storeData.upCout" class="danger-num-1">{{storeData.upCout}}</i>
      </div>
      <div :style="!storeData.successNumLast ? 'margin-right: 6vw; display: flex;' : 'margin-right: 4vw;display: flex;' ">
        <span style="" :class="queryParam.inventory==1 && queryParam.today==2 ? 'activity' : ''" @click="searchStatus(1,2)">待上架</span>
        <i v-if="storeData.successNumLast" class="danger-num-1">{{storeData.successNumLast}}</i>
      </div>
      <span style="margin-right: 6vw;" :class="queryParam.inventory==1 && !queryParam.today ? 'activity' : ''" @click="searchStatus(1)">现货</span>
<!--      <span style="" :class="queryParam.inventory==1 && queryParam.today==7 ? 'activity' : ''" @click="searchStatus(1,7)">变更</span>-->
<!--      <span style="" :class="queryParam.inventory==1 && queryParam.today==2 ? 'activity' : ''" @click="searchStatus(1,2)">待上架</span>-->
<!--      <span style="" :class="queryParam.inventory==1 && queryParam.today==3 ? 'activity' : ''" @click="searchStatus(1,3)">待移库</span>-->
      <div :style="!storeData.waitMoveCout ? 'margin-right: 6vw; display: flex;' : 'margin-right: 4vw;display: flex;' ">
        <span style="" :class="queryParam.inventory==1 && queryParam.today==3 ? 'activity' : ''" @click="searchStatus(1,3)">待移库</span>
        <i v-if="storeData.waitMoveCout" class="danger-num-1">{{storeData.waitMoveCout}}</i>
      </div>
      <span style="margin-right: 6vw;" :class="queryParam.inventory==0 ? 'activity' : ''" @click="searchStatus(0)">售空</span>
    </div>
<!--    列表-->
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
        <!--        头部-->
        <div class="dingdans_top_dw">
          <div class="dingdans_top_left_dw">
            <span>入库时间:</span>
            <span>{{item.createTime |formateTime}}</span>
          </div>
          <div class="dingdans_top_right_dw" v-if="item.difference && item.thisTimePrice">
            变更
            <strong style="font-size: 13px" v-if="item.difference > 0" class="color-danger"> +{{item.difference }}</strong>
            <strong style="font-size: 13px" v-else class="color-success">{{item.difference }}</strong>
          </div>
        </div>
        <!--        中间-->
        <div class="dingdans_con_dw">
          <div :src="item.img" class="dingdans_con_left_dw"
               @click="avatarShow(item.img)">
            <img :src="item.img" >
            <p class="mark_dw">
              <span class="text_dw">
                {{ item.channelId | dictToDescTypeValue(47) }}
              </span>
            </p>
          </div>
          <div class="diangdans_con_right_dw">
            <div class="dingdans_con_right_top_dw" @click="goDetail(item.id) ">
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
            <div v-if="item.warehouseId" style="    margin-bottom: 10px;">
              <span  class="dingdans_con_dw_address">
                {{item.warehouseId | dictToDescTypeValue(40)}}
              </span>
            </div>
            <div class="dingdans_con_right_top_dw_2">
              <div>
                 <span>
                {{item.size}} × {{item.inventory}}
              </span>
              </div>
              <div>
                <strong style="color: #333333">
                  ¥
                </strong>
                <strong  v-if="item.thisTimeThePrice" style="font-size: 17px ;margin-left: -2px;color: #333333">
                  {{item.thisTimeThePrice}}
                </strong>
                <strong v-if="!item.thisTimeThePrice && item.theirPrice" style="font-size: 17px ;margin-left: -2px;color: #333333">
                  {{item.theirPrice}}
                </strong>
                <span v-if="item.thisTimePrice" style="margin-left: 3px;text-decoration:line-through;">
                  {{item.thisTimePrice}}
                </span>
                <span v-else style="margin-left: 3px;text-decoration:line-through;">
                  {{item.dwPrice}}
                </span>
<!--                <span style="margin-left: 3px;color: #333333;font-size: 15px">-->
<!--                   <span style="font-size: 13px">¥</span>-->
<!--                  {{item.price}}-->
<!--                </span>-->
              </div>
            </div>
          </div>
        </div>
        <!--底部-->
        <div class="dingdans_bottom_dw">
          <div class="dingdans_top_left_dw">
            <span >入库价</span>
            <span class="color-danger">{{item.price}}</span>
            <span >, 预估利润</span>
            <span :class="item.thisTimeProfits>= 0 ? 'color-danger': 'color-success'"  v-if="item.thisTimePrice" >{{item.thisTimeProfits }}</span>
            <span class="color-danger"  v-else  :class="(item.dwPrice - (item.dwPrice * 0.075 + 38 + 8.5) - item.price - 10)>= 0 ? 'color-danger': 'color-success'">
              {{(item.dwPrice - (item.dwPrice * 0.075 + 38 + 8.5) - item.price - 10) | numFilter}}
            </span>
<!--            <span v-if="item.status == 3 && item.deliveryDeadlineTime" style="margin-left: 3px">-->
<!--              <span>,</span>-->
<!--              发货截止时间-->
<!--            </span>-->
<!--            <span v-if="item.status == 3 && item.deliveryDeadlineTime" class="dingdans_con_dw_time">-->
<!--                 {{item.deliveryDeadlineTime | formateTime('{y}-{m}-{d} {h}:{i}') }}-->
<!--              </span>-->
          </div>
          <!--          操作栏-->
          <div class="dingdans_top_right_dw">
            <div class="dingdans_con_right_down_2_1">
              <el-dropdown trigger="click" style="margin-left: 1px;">
                <button
                  class="dw-button-common">操作
                </button>
                <el-dropdown-menu slot="dropdown" >
                  <el-dropdown-item type="text" @click.native="goodsDetail(item.goodsId, 1) ">商品详情</el-dropdown-item>
                  <el-dropdown-item type="text" @click.native="WarehouseDetail(item.goodsId ,item.actNo ,item.img )">库存信息</el-dropdown-item>
                  <el-dropdown-item type="text" @click.native="handleClick(item)">修改</el-dropdown-item>
                  <el-dropdown-item type="text" @click.native="gotoDw(item.spuId)">得物</el-dropdown-item>
                  <el-dropdown-item type="text" @click.native="jumpactNo(item.actNo)">订单</el-dropdown-item>
                  <el-dropdown-item type="text" v-if="item.inventory > item.galleryCount" @click.native="changeStatusDialog1(item)">上架</el-dropdown-item>
                  <el-dropdown-item type="text" @click.native="goDel(item.id)">删除</el-dropdown-item>
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
      v-model="isShowDialog">
      <mt-header title="修改">
        <div slot="right">
          <mt-button size="normal"  @click="isShowDialog = false" style="font-size: 15px">关闭</mt-button>
        </div>
        <div slot="left">
          <mt-button size="normal" @click="confirmHandle" style="font-size: 15px">确定</mt-button>
        </div>
      </mt-header>
      <section style="height: 130vw;width: 100vw">
        <mt-field label="货号" style="margin-top: 11vw;" v-model="orderData.actNo" :disabled="true"></mt-field>
<!--        <mt-field label="* 尺码" v-model="orderData.size" :disabled="true"></mt-field>-->
        <mt-field label="* 尺码">
<!--            <el-select size="small" class="select80" v-model="requestParam.sizeId"  >-->
<!--              <el-option :disabled="true" value="" selected>请选择</el-option>-->
<!--              <el-option-->
<!--                v-for="item in sizeList"-->
<!--                :key="item.id"-->
<!--                :label="item.size"-->
<!--                :value="item.id">-->
<!--              </el-option>-->
<!--            </el-select>-->
          <select class=" select100_select select"v-model="requestParam.sizeId">
            <option label="请选择尺码"  value=""></option>
            <option
              v-for="item in sizeList"
              :key="item.id"
              :label="item.size"
              :value="item.id">
            </option>
          </select>
        </mt-field>
        <mt-field label="* 原始库存" placeholder="请输入原始库存" type="number" v-model="requestParam.oldInventory"></mt-field>
        <mt-field label="* 剩余库存" placeholder="请输入剩余库存" type="number" v-model="requestParam.inventory"></mt-field>
        <mt-field label="* 入库价" placeholder="请输入入库价" @keyup.native="keyup1($event)" type="number" v-model="requestParam.price"></mt-field>
        <mt-field label="* 出售价格" placeholder="请输入出售价格" @keyup.native="keyup1($event)" type="number" v-model="requestParam.dwPrice"></mt-field>
<!--        <mt-field label="* 入库时间" type="datetime" placeholder="选择入库时间"  v-model="requestParam.createTime" ></mt-field>-->
        <mt-field label="* 入库时间">
          <div @click="chosseTime()">
            <el-date-picker class="select100" style="width: 62vw" readonly="readonly"
                            type="datetime" placeholder="选择入库时间"
                            v-model="requestParam.createTime"
                            value-format="yyyy-MM-dd HH:mm:ss"></el-date-picker>
          </div>
        </mt-field>
        <mt-field label="手续费" :disabled="true" v-model="requestParam.poundage"></mt-field>
        <mt-field label="到手价" :disabled="true" v-model="requestParam.theirPrice"></mt-field>
        <mt-field label="利润" :disabled="true" v-model="requestParam.profits"></mt-field>
      </section>
    </mt-popup>
    <mt-popup
      v-model="isShowDialog1">
      <mt-header title="上架">
        <div slot="right">
          <mt-button size="normal"  @click="isShowDialog1 = false" style="font-size: 15px">关闭</mt-button>
        </div>
        <div slot="left">
          <mt-button size="normal" @click="confirmHandle1" style="font-size: 15px">确定</mt-button>
        </div>
      </mt-header>
      <section style="height: 130vw;width: 80vw">
        <mt-field label="货号" style="margin-top: 11vw;" v-model="orderData1.actNo" :disabled="true"></mt-field>
        <mt-field label="尺码" v-model="orderData1.size" :disabled="true"></mt-field>
        <mt-field label="当前库存" v-model="orderData1.inventory" :disabled="true"></mt-field>
        <mt-field label="已上架数量" v-model="orderData1.galleryCount" :disabled="true"></mt-field>
        <mt-field label="入库价" v-model="orderData1.price" :disabled="true"></mt-field>
        <mt-field label="* 上架数量" placeholder="请输入上架数量"  @keyup.native="keyup2($event)" type="number" v-model="requestParam1.num"></mt-field>
        <mt-field label="* 出售价格" placeholder="请输入出售价格" @keyup.native="keyup2($event)" type="number" v-model="requestParam1.shelvesPrice"></mt-field>
        <mt-field label="手续费" :disabled="true" v-model="requestParam1.poundage"></mt-field>
        <mt-field label="到手价" :disabled="true" v-model="requestParam1.theirPrice"></mt-field>
        <mt-field label="利润" :disabled="true" v-model="requestParam1.profits"></mt-field>
      </section>
    </mt-popup>
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
      <section style="height: 120vw;width: 100vw">
        <mt-field label="排序" style="margin-top: 11vw;">
<!--            <select class="select100" v-model="queryParam.sort" @change="changeSystem" >-->
<!--          <option :disabled="true" value="" selected>请选择排序</option>-->
<!--              <option v-for="x in sortList" :value="x.fieldValue">{{x.fieldName}}</option>-->
<!--            </select>-->
<!--            <el-select size="small" class="select100" v-model="queryParam.sort"  >-->
<!--              <el-option :disabled="true" value="" selected>请选择排序</el-option>-->
<!--              <el-option-->
<!--                v-for="item in sortList"-->
<!--                :key="item.fieldValue"-->
<!--                :label="item.fieldName"-->
<!--                :value="item.fieldValue">-->
<!--              </el-option>-->
<!--            </el-select>-->
          <select class=" select100_select select"v-model="queryParam.sort">
            <option label="请选择类型"  value=""></option>
            <option
              v-for="item in sortList"
              :key="item.fieldValue"
              :label="item.fieldName"
              :value="item.fieldValue">
            </option>
          </select>
        </mt-field>
        <mt-field label="状态">
<!--            <select class="select100" v-model="queryParam.inventory" @change="changeSystem" >-->
<!--              <option :disabled="true" value="" selected>请选择状态</option>-->
<!--              <option v-for="x in inventoryToList" :value="x.fieldValue">{{x.fieldName}}</option>-->
<!--            </select>-->
<!--            <el-select size="small" class="select100" v-model="queryParam.inventory" @change="changeSystem"  >-->
<!--              <el-option :disabled="true" value="" selected>请选择状态</el-option>-->
<!--              <el-option-->
<!--                v-for="item in inventoryToList"-->
<!--                :key="item.fieldValue"-->
<!--                :label="item.fieldName"-->
<!--                :value="item.fieldValue">-->
<!--              </el-option>-->
<!--            </el-select>-->
          <select class=" select100_select select"v-model="queryParam.inventory">
            <option label="请选择状态"  value=""></option>
            <option
              v-for="item in inventoryToList"
              :key="item.fieldValue"
              :label="item.fieldName"
              :value="item.fieldValue">
            </option>
          </select>
        </mt-field>
        <mt-field label="仓库">
          <select class=" select100_select select" v-model="queryParam.warehouseId">
            <option label="请选择类型"  value=""></option>
            <option
              v-for="item in warehouseList"
              :key="item.fieldValue"
              :label="item.fieldName"
              :value="+item.fieldValue">
            </option>
          </select>
        </mt-field>
        <mt-field label="类型">
<!--            <el-select size="small" class="select100" v-model="queryParam.goodType" >-->
<!--          <el-option :disabled="true" value="" selected>请选择商品类型</el-option>-->
<!--          <el-option-->
<!--            v-for="item in typeList"-->
<!--            :key="item.fieldValue"-->
<!--            :label="item.fieldName"-->
<!--            :value="item.fieldValue">-->
<!--          </el-option>-->
<!--            </el-select>-->
          <select class=" select100_select select"v-model="queryParam.goodType">
            <option label="请选择商品类型"  value=""></option>
            <option
              v-for="item in typeList"
              :key="item.fieldValue"
              :label="item.fieldName"
              :value="item.fieldValue">
            </option>
          </select>
        </mt-field>
        <mt-field label="渠道">
<!--            <el-select size="small" class="select100" v-model="queryParam.channelId"  >-->
<!--              <el-option :disabled="true" value="" selected>请选择渠道</el-option>-->
<!--              <el-option-->
<!--                v-for="item in channelIdList"-->
<!--                :key="item.fieldValue"-->
<!--                :label="item.fieldName"-->
<!--                :value="+item.fieldValue">-->
<!--              </el-option>-->
<!--            </el-select>-->

          <select class=" select100_select select" v-model="queryParam.channelId">
            <option label="请选择渠道"  value=""></option>
            <option
              v-for="item in channelIdList"
              :key="item.fieldValue"
              :label="item.fieldName"
              :value="+item.fieldValue">
            </option>
          </select>

        </mt-field>
        <mt-field label="特殊条件">
<!--            <select class="select100" v-model="queryParam.today" @change="changeSystem" >-->
<!--              <option :disabled="true" value="" selected>请选择特殊条件</option>-->
<!--              <option v-for="x in todayList" :value="x.fieldValue">{{x.fieldName}}</option>-->
<!--            </select>-->
<!--            <el-select size="small" class="select100" v-model="queryParam.today"  >-->
<!--              <el-option :disabled="true" value="" selected>请选择特殊条件</el-option>-->
<!--              <el-option-->
<!--                v-for="item in todayList"-->
<!--                :key="item.fieldValue"-->
<!--                :label="item.fieldName"-->
<!--                :value="item.fieldValue">-->
<!--              </el-option>-->
<!--            </el-select>-->
          <select class=" select100_select select"v-model="queryParam.today">
            <option label="请选择特殊条件"  value=""></option>
            <option
              v-for="item in todayList"
              :key="item.fieldValue"
              :label="item.fieldName"
              :value="item.fieldValue">
            </option>
          </select>
        </mt-field>
        <mt-field label="尺码" placeholder="请输入尺码"  v-model="queryParam.size"></mt-field>
<!--        <mt-field label="入库开始时间">-->
<!--          <el-date-picker class="select100"-->
<!--                          size="small"-->
<!--                          v-model="queryParam.createTimeFrom" value-format="yyyy-MM-dd"-->
<!--                          type="date" placeholder="入库开始时间">-->
<!--          </el-date-picker>-->
<!--        </mt-field>-->
<!--        <mt-field label="入库结束时间">-->
<!--          <el-date-picker class="select100"-->
<!--                          size="small"-->
<!--                          v-model="queryParam.createTimeTo" value-format="yyyy-MM-dd"-->
<!--                          type="date" placeholder="入库结束时间">-->
<!--          </el-date-picker>-->
<!--        </mt-field>-->
<!--        <mt-field label="同步开始时间" type="date" placeholder="同步开始时间"  v-model="queryParam.syncTimeFrom" ></mt-field>-->
<!--        <mt-field label="同步结束时间" type="date" placeholder="同步结束时间"  v-model="queryParam.syncTimeTo" ></mt-field>-->
        <mt-field label="入库开始时间" type="date" placeholder="入库开始时间"  v-model="queryParam.createTimeFrom" ></mt-field>
        <mt-field label="入库结束时间" type="date" placeholder="入库结束时间"  v-model="queryParam.createTimeTo" ></mt-field>
      </section>
    </mt-popup>
    <div class="popContainer" v-if="pictureZoomShow" @click="pictureZoomShow = false">
      <div class="imageShow">
        <img :src="imageZoom" alt="" class="showImg">
      </div>
    </div>
<!--    <div style="-->
<!--    right: 15px;-->
<!--    bottom: 20vw;-->
<!--    position: absolute;-->
<!--    text-align: center;-->
<!--    ">-->
<!--      <mt-button v-if="initToday !=7 "  @click="goGoodsBase"  style="margin-left: 5px;-->
<!--    border-radius: 100%;-->
<!--    margin-top: 0px;-->
<!--    height: 55px;-->
<!--    width: 55px;" type="primary">-->
<!--        <img src="../../static/img/add.png" height="30" width="30" slot="icon">-->
<!--      </mt-button>-->
<!--      <mt-button v-else @click="syncOldPriceToNew1"  style="margin-left: 5px;-->
<!--    border-radius: 100%;-->
<!--    margin-top: 0px;-->
<!--    height: 55px;-->
<!--    width: 55px;" type="primary">-->
<!--        <img src="../../static/img/querenjiangjia.png" height="30" width="30" slot="icon">-->
<!--      </mt-button>-->
<!--    </div>-->
    <v-footer></v-footer>
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
  import {goodsOrderApi} from '@/api/goodsOrder'
  import {goodsInventoryApi} from '@/api/goodsInventory'
  import { goodsBaseApi } from '@/api/goodsBase'
  import { parseTime,formatDateMin } from '@/utils/index'

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
        requestParam1: {
          poundage: '',
          theirPrice: '',
          profits: '',
          inventoryId: '',
          type: 1,
          num: '',
          shelvesPrice: ''
        },
        sizeList:'',
        requestParam: {
          id: '',
          createTime: '',
          sizeId: '',
          oldInventory: '',
          inventory: '',
          price: '',
          dwPrice: '',
          poundage: '',
          theirPrice: '',
          profits: '',
          waybillNo: '',
          addressId: ''
        },
        // popupVisible: false,
        // titleName: '仓库',
        emtityMsg: '',
        orderData: '',
        isShowDialog: false,
        orderData1: '',
        isShowDialog1: false,
        orderData2: '',
        isShowDialog2: false,
        pictureZoomShow: false,
        imageZoom: '',
        typeList: [],
        fileUrl: fileUrl,
        today: '',
        storeData: {},
        queryParam: {
          today: '',
          syncTimeFrom: '',
          syncTimeTo: '',
          createTimeFrom: '',
          createTimeTo: '',
          id: '',
          warehouseId: '',
          goodType: '',
          channelId: '',
          inventory: 1,
          sort:'',
          inventoryFrom: '',
          inventoryTo: '',
          size: '',
          actNo: '',
          goodsId: '',
          pageSize: 10,
          pageNum: 1
        },
        topStatus: "",
        bottomStatus: "",
        allLoaded: false,
        warehouseList: [],
        channelIdList: [],
        addressList: [],
        todayList: [],
        // todayList: [
        //   { fieldValue: 1, fieldName: '今日更新' },
        //   { fieldValue: 2, fieldName: '待上架商品' },
        //   { fieldValue: 3, fieldName: '待移库商品' },
        //   { fieldValue: 4, fieldName: '涨价商品' },
        //   { fieldValue: 5, fieldName: '降价商品' },
        //   { fieldValue: 6, fieldName: '售空商品' },
        //   { fieldValue: 7, fieldName: '变更商品' },
        // ],
        inventoryToList: [
          { fieldValue: 1, fieldName: '现货' }, { fieldValue: 0, fieldName: '售空' },
          { fieldValue: 2, fieldName: '未上架' }
        ],
        sortList: [
          { fieldValue: ' TRUNCATE(g.price - (g.price * 0.075 + 38 + 8.5) - a.price - 10 , 2 ) asc ,', fieldName: '利润升序' },
          { fieldValue: ' TRUNCATE(g.price - (g.price * 0.075 + 38 + 8.5) - a.price - 10 , 2 ) desc ,', fieldName: '利润降序' },
          { fieldValue: '(g.price - a.dw_price ) desc  ,', fieldName: '涨价降序' },
          { fieldValue: '(g.price - a.dw_price ) asc  ,', fieldName: '降价降序' },
          { fieldValue: 'c.size asc ,', fieldName: '尺码升序' },
          { fieldValue: 'c.size desc ,', fieldName: '尺码降序' },
          { fieldValue: 'a.price asc ,', fieldName: '入库价升序' },
          { fieldValue: 'a.price desc ,', fieldName: '入库价降序' },
          { fieldValue: 'g.price asc ,', fieldName: '市场价升序' },
          { fieldValue: 'g.price desc ,', fieldName: '市场价降序' },
          { fieldValue: 'a.inventory asc ,', fieldName: '库存升序' },
          { fieldValue: 'a.inventory desc ,', fieldName: '库存降序' },
          { fieldValue: ' TRUNCATE(g.price - (g.price * 0.075 + 38 + 8.5),2 ) desc ,', fieldName: '到手降序' },
          { fieldValue: ' TRUNCATE(g.price - (g.price * 0.075 + 38 + 8.5),2 ) asc ,', fieldName: '到手升序' },
          { fieldValue: 'a.create_time asc ,', fieldName: '入库时间升序' },
          { fieldValue: 'a.create_time desc ,', fieldName: '入库时间降序' },

        ],
        statusList: [],
        dataStatusList: [],
        sellTime: '',
        successTime: '',
        startDate: new Date(),
        createTime: '',
        updateTime: '',
        status: '',
        selectedId: [],
        ids: [],
        tableData: [],
        totalCount: 1
      }
    },
    // created() {
    //   // ajax 模拟初始加载, 使用定时器默认ajax加载
    //   let timer = setTimeout(_ => {
    //     clearTimeout(timer);
    //     this.loadData('refresh');
    //   }, 200);
    // },
    // created() {
    //   const { actNo,size,months,today } = this.$route.query
    //   this.queryParam.size = size
    //   this.queryParam.actNo = actNo
    //   this.queryParam.today = today
    //   this.months = months
    //   if (this.queryParam.actNo || this.queryParam.size || this.months ||  this.queryParam.today ) {
    //     if (this.months) {
    //       this.queryParam.createTimeFrom = this.months
    //       this.queryParam.createTimeTo = this.months
    //       this.titleName = this.months + ' ' + this.titleName
    //     }
    //     if (this.queryParam.today == 1) {
    //       this.titleName = '今日更新'
    //     }
    //     if (this.queryParam.today == 2) {
    //       this.titleName = '待上架商品'
    //     }
    //     if (this.queryParam.today == 3) {
    //       this.titleName = '待移库商品'
    //     }
    //     if (this.queryParam.today == 4) {
    //       this.titleName = '涨价商品'
    //     }
    //     if (this.queryParam.today == 5) {
    //       this.titleName = '降价商品'
    //     }
    //     if (this.queryParam.today == 6) {
    //       this.titleName = '售空商品'
    //     }
    //     if (this.queryParam.today == 7) {
    //       this.titleName = '变更商品'
    //     }
    //     this.search1()
    //   }
    // },
    // mounted() {
    //   this.getPage()
    //   this.handleChange()
    //   this.listSysDict()
    // },
    activated() {
      this.keyupSubmit()

      // 新开的页面
        this.isBack = false
        if (!this.$route.meta.isBack) {
        this.handleChange()
        this.listSysDict()
        this.resetData()
        //isBack 时添加中router中的元信息，判读是否要缓存
        // const { actNo,status,months } = this.$route.query
        // this.queryParam.keyword = actNo
        // this.status = status
        // this.queryParam.status = status
        // this.months = months
        // if (this.queryParam.keyword || this.queryParam.status || this.months) {
        //   if(this.queryParam.status){
        //     this.changeSystem()
        //   }
        //   if (this.months) {
        //     this.queryParam.successTimeFrom = this.months
        //     this.queryParam.successTimeTo = this.months
        //     this.titleName = this.months + ' 订单'
        //   }
        //   // this.search1()
        // }
        const { actNo,size,months ,warehouseId,channelId,today} = this.$route.query
        this.queryParam.size = size ? size : ''
        this.queryParam.actNo = actNo ? actNo : ''
        this.queryParam.warehouseId = warehouseId ? warehouseId : ''
        this.queryParam.channelId = channelId ? channelId : ''
        this.queryParam.today = today ? today : ''
        this.initToday = today ? today : ''
        this.months = months ? months : ''
        if (this.queryParam.actNo || this.queryParam.size || this.queryParam.warehouseId ||this.queryParam.channelId ||  this.months||  this.queryParam.today) {
          if (this.months) {
            this.queryParam.createTimeFrom = this.months
            this.queryParam.createTimeTo = this.months
            // this.titleName = this.months + ' ' + this.titleName
          }
          // this.search1()
        }
        // if (this.queryParam.warehouseId == 1) {
        //   this.titleName = '前埔库存'
        // }else if (this.queryParam.warehouseId == 2) {
        //   this.titleName = '云头库存'
        // }else if (this.queryParam.channelId == 1) {
        //   this.titleName = '线下'
        // }else if (this.queryParam.channelId == 2) {
        //   this.titleName = '线上'
        // }
        // if (this.queryParam.today == 1) {
        //   this.titleName = '今日更新'
        // }
        // if (this.queryParam.today == 2) {
        //   this.titleName = '待上架商品'
        // }
        // if (this.queryParam.today == 3) {
        //   this.titleName = '待移库商品'
        // }
        // if (this.queryParam.today == 4) {
        //   this.titleName = '涨价商品'
        // }
        // if (this.queryParam.today == 5) {
        //   this.titleName = '降价商品'
        // }
        // if (this.queryParam.today == 6) {
        //   this.titleName = '售空商品'
        // }
        // if (this.queryParam.today == 7) {
        //   this.titleName = '变更商品'
        // }
        this.getPage()
      }else {
        this.$refs.hello.scrollTop = this.curScrollTop
      }
    },
    beforeRouteLeave(to, from, next) {
      if (to.path == "/goodsBase"
        || to.path  =="/order"
        || to.path  =="/storeDetail"
        || to.path  =="/WarehouseDetail"
        || to.path  =="/goodsDetail") {
        from.meta.isBack = this.isBack;
        // this.curScrollTop = this.$refs.hello.scrollTop
      }else {
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
      handleChange() {
        goodsBaseApi.listDropDownSizes({ type: '' }, false).then(res => {
          if (res.subCode === 1000) {
            this.sizeList = res.data
          }
        })
      },
      goGoodsBase() {
        this.isBack = true
        this.$router.push({ path: '/goodsBase'})
      },
      syncOldPriceToNew1() {
        goodsBaseApi.syncOldPriceToNew().then(res => {
          this.$toast(res.subMsg)
          if (res.subCode === 1000) {
            this.getPage()
            this.isShowDialog1 = false
          }
        })
      },
      successTimeChange() {
        if (this.successTime) {
          this.queryParam.successTimeFrom = this.successTime[0]
          this.queryParam.successTimeTo = this.successTime[1]
        } else {
          this.queryParam.successTimeFrom = null
          this.queryParam.successTimeTo = null
        }
      },
      getData2() {
        goodsOrderApi.todaySync({}).then(res => {
          if (res.subCode === 1000) {
            this.storeData = res.data
          } else {
            this.$toast(res.subMsg)
          }
        })
      },
      getPage() {
        if (this.queryParam.inventory == 1) {
          this.queryParam.inventoryFrom = 1
          this.queryParam.inventoryTo = ''
        } else if (this.queryParam.inventory == 0) {
          this.queryParam.inventoryFrom = ''
          this.queryParam.inventoryTo = 0
        } else {
          this.queryParam.inventoryFrom = ''
          this.queryParam.inventoryTo = ''
        }
        this.getData2()
        this.emtityMsg = ''
        goodsInventoryApi.pageGoods(this.queryParam).then(res => {
          if (res.subCode === 1000) {
            this.tableData = res.data ? res.data.list : []
            this.totalCount = res.data ? res.data.pageInfo.totalCount : 0
            if (this.totalCount == 0) {
              this.allLoaded = true;
              if (this.queryParam.pageNum == 1){
                this.emtityMsg = '暂无相关库存'
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
        this.addressList = sysDictList.filter(item => item.typeValue == 38)
        this.statusList = sysDictList.filter(item => item.typeValue == 37)
        this.dataStatusList = sysDictList.filter(item => item.typeValue == 36)
        this.warehouseList = sysDictList.filter(item => item.typeValue == 40)
        this.channelIdList = sysDictList.filter(item => item.typeValue == 47)
        this.todayList = sysDictList.filter(item => item.typeValue == 44)
        this.typeList = sysDictList.filter(item => item.typeValue == 20221108)

      },
      loadData(p_status) {
        // 第一次加载或者下拉刷新最新数据
        if (p_status === "refresh") {
          this.tableData = [];
        }
        if (this.queryParam.inventory == 1) {
          this.queryParam.inventoryFrom = 1
          this.queryParam.inventoryTo = ''
        } else if (this.queryParam.inventory == 0) {
          this.queryParam.inventoryFrom = ''
          this.queryParam.inventoryTo = 0
        } else {
          this.queryParam.inventoryFrom = ''
          this.queryParam.inventoryTo = ''
        }
        goodsInventoryApi.pageGoods(this.queryParam).then(res => {
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
      // 日期
      // open(picker) {
      //   this.$refs[picker].open();
      // },
      chosseTime() {
        this.$refs.requestParamCreateTime.open()
      },
      handleConfirmDate(val) {
        let res = formatDateMin(val)
        this.requestParam.createTime = res
      },
      // changeSystem() {
      //   let res = this.inventoryToList.filter(
      //     item => item.fieldValue == this.queryParam.inventory)
      //   this.titleName = res.length ? res[0].fieldName : ''
      //   this.titleName = this.titleName + '仓库'
      // },
      search1() {
        this.queryParam.pageNum = 1
        this.allLoaded = false;
        this.isShowDialog2 = false
        this.$refs.hello.scrollTop = 0
        this.getPage()
      },
      resetData() {
        this.queryParam = {
          warehouseId: '',
          channelId: '',
          createTimeFrom: '',
          createTimeTo: '',
          syncTimeFrom: '',
          syncTimeTo: '',
          goodType: '',
          id: '',
          sort:'',
          inventory: 1,
          inventoryFrom: '',
          inventoryTo: '',
          size: '',
          actNo: '',
          goodsId: '',
         pageSize: 10,
          pageNum: 1
        }
        this.allLoaded = false;
        this.isShowDialog2 = false
      },
      resetHandle() {
        this.queryParam = {
          warehouseId: '',
          channelId: '',
          syncTimeFrom: '',
          goodType: '',
          syncTimeTo: '',
          createTimeFrom: '',
          createTimeTo: '',
          id: '',
          sort:'',
          inventory: 1,
          inventoryFrom: '',
          inventoryTo: '',
          size: '',
          actNo: '',
          goodsId: '',
         pageSize: 10,
          pageNum: 1
        }
        // this.titleName = '仓库'
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
      searchStatus(status,today) {
        this.queryParam.inventory = status
        this.queryParam.today = today
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
      keyup1() {
        // let theirPrice =
        //   +  this.requestParam.dwPrice - (this.requestParam.dwPrice * 0.075 + 38 + 8.5)
        // // let theirPrice = this.requestParam.theirPrice - 10
        // //   - this.theirPrice.price
        // this.requestParam.profits = parseFloat(theirPrice).toFixed(2)
        //
        // let profits = this.requestParam.theirPrice - 10
        //   - this.requestParam.price
        // this.requestParam.profits = parseFloat(profits).toFixed(2)

        let poundage = this.requestParam.dwPrice * 0.075 + 38 + 8.5
        this.requestParam.poundage = parseFloat(poundage).toFixed(2)

        let theirPrice =  this.requestParam.dwPrice
          - (this.requestParam.dwPrice * 0.075 + 38 + 8.5)
        this.requestParam.theirPrice = parseFloat(theirPrice).toFixed(2)

        let profits = this.requestParam.theirPrice - 10
          - this.requestParam.price
        this.requestParam.profits = parseFloat(profits).toFixed(2)
      },
      keyup2() {
        // let theirPrice =
        //   +  this.requestParam.dwPrice - (this.requestParam.dwPrice * 0.075 + 38 + 8.5)
        // // let theirPrice = this.requestParam.theirPrice - 10
        // //   - this.theirPrice.price
        // this.requestParam.profits = parseFloat(theirPrice).toFixed(2)
        //
        // let profits = this.requestParam.theirPrice - 10
        //   - this.requestParam.price
        // this.requestParam.profits = parseFloat(profits).toFixed(2)

        let poundage = this.requestParam1.shelvesPrice * 0.075 + 38 + 8.5
        this.requestParam1.poundage = parseFloat(poundage).toFixed(2)

        let theirPrice =  this.requestParam1.shelvesPrice
          - (this.requestParam1.shelvesPrice * 0.075 + 38 + 8.5)
        this.requestParam1.theirPrice = parseFloat(theirPrice).toFixed(2)

        let profits = this.requestParam1.theirPrice - 10
          - this.orderData1.price
        this.requestParam1.profits = parseFloat(profits).toFixed(2)

        if (this.requestParam1.num > this.orderData1.inventory - this.orderData1.galleryCount) {
          this.requestParam1.num = this.orderData1.inventory - this.orderData1.galleryCount
        }
      },
      confirmHandle1() {
        if (!this.requestParam1.num) {
          this.$toast("上架数量错误");
          // this.$toast('上架数量错误')
          return
        }
        if (this.requestParam1.num > this.orderData1.inventory) {
          this.$toast('上架数量大于当前库存')
          return
        }
        let data = {}
        data.inventoryId = this.requestParam1.inventoryId
        data.type = this.requestParam1.type
        data.num = this.requestParam1.num
        data.shelvesPrice = this.requestParam1.shelvesPrice
        goodsInventoryApi.shelvesGoods(data).then(res => {
          this.$toast(res.subMsg)
          if (res.subCode === 1000) {
            this.getPage()
            this.isShowDialog1 = false
          }
        })
      },
      confirmHandle() {
        if (this.requestParam.oldInventory < this.requestParam.inventory) {
          // this.$toast('原始库存小于剩余库存')
          this.$toast('原始库存小于剩余库存')
          return
        }
        this.requestParam.createTime = this.requestParam.createTime ? parseTime(this.requestParam.createTime) : ''
        goodsInventoryApi.update(this.requestParam).then(res => {
          if (res.subCode === 1000) {
            this.$toast(res.subMsg)
            this.getPage()
            this.isShowDialog = false
          }else {
            this.$toast(res.subMsg);
          }
        })
      },
      updateAddress() {
        goodsOrderApi.update(this.requestParam1).then(res => {
          this.$toast(res.subMsg)
          if (res.subCode === 1000) {
            this.getPage()
            this.isShowDialog1 = false
          }else {
            this.$toast(res.subMsg);
          }
        })
      },
      jumpactNo(actNo) {
        this.isBack = true
        this.curScrollTop = this.$refs.hello.scrollTop
        this.$router.push({ path: '/order', query: { actNo } })
      },
      goDetail(id) {
        this.isBack = true
        this.curScrollTop = this.$refs.hello.scrollTop
        this.$router.push({path: '/storeDetail', query: {id}})
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
        // let url = "https://www.dewu.com/router/product/ProductDetail?spuId=";
        let url = "https://m.dewu.com/router/product/ProductDetail?spuId=";
        window.location.href = url + spuId;
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
      WarehouseDetail(goodsId , actNo,img) {
        this.isBack = true
        this.curScrollTop = this.$refs.hello.scrollTop
        this.$router.push({ path: '/WarehouseDetail', query: {goodsId, actNo ,img} })
      },
      changeStatusDialog1(row) {
        this.orderData1 = row
        this.requestParam1.inventoryId = this.orderData1.id
        this.requestParam1.num = this.orderData1.inventory - this.orderData1.galleryCount
        this.requestParam1.shelvesPrice = this.orderData1.dwPrice

        let poundage = this.requestParam1.shelvesPrice * 0.075 + 38 + 8.5
        this.requestParam1.poundage = parseFloat(poundage).toFixed(2)

        let theirPrice =  this.requestParam1.shelvesPrice
          - (this.requestParam1.shelvesPrice * 0.075 + 38 + 8.5)
        this.requestParam1.theirPrice = parseFloat(theirPrice).toFixed(2)

        let profits = this.requestParam1.theirPrice - 10
          - this.orderData1.price
        this.requestParam1.profits = parseFloat(profits).toFixed(2)
        this.isShowDialog1 = true
      },
      goDel(id) {
        this.$confirm('是否删除',"提示",{
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type:"warning",
        }).then(() => {
          goodsInventoryApi.delById(id).then(res => {
            this.$toast(res.subMsg)
            if (res.subCode === 1000) {
              this.getPage()
            }
          })
        }).catch(() => {
          // alert(" b" + id)
          // this.goBack()
        })
        // this.$confirm('是否删除', '提示', {
        //   confirmButtonText: '确定',
        //   cancelButtonText: '取消',
        //   type: 'warning'
        // }).then(() => {
        //   alert(id)
        //   // goodsInventoryApi.delById(id).then(res => {
        //   //   if (res.subCode === 1000) {
        //   //     this.$message.success(res.subMsg)
        //   //     this.pageGoods()
        //   //   } else {
        //   //     this.$message.error(res.subMsg)
        //   //   }
        //   // })
        // })
      },
      handleClick(orderData) {
        this.orderData = orderData
        this.requestParam.id = this.orderData.id
        this.requestParam.sizeId = this.orderData.sizeId
        console.info(this.orderData.createTime)
        this.requestParam.createTime = parseTime(this.orderData.createTime)
        console.info(this.requestParam.createTime)
        this.requestParam.oldInventory = this.orderData.oldInventory
        this.requestParam.inventory = this.orderData.inventory
        this.requestParam.price = this.orderData.price
        this.requestParam.dwPrice = this.orderData.dwPrice
        this.requestParam.waybillNo = this.orderData.waybillNo
        this.requestParam.addressId = this.orderData.addressId
        // let poundage = this.requestParam.dwPrice * 0.075 + 38 + 8.5
        // this.requestParam.poundage = parseFloat(poundage).toFixed(2)
        if (!this.orderData.poundage) {
          let poundage = this.requestParam.dwPrice * 0.075 + 38 + 8.5
          this.requestParam.poundage = parseFloat(poundage).toFixed(2)
        } else {
          this.requestParam.poundage = this.orderData.poundage
        }
        if (!this.orderData.theirPrice) {
          let theirPrice =  this.requestParam.dwPrice
            - (this.requestParam.dwPrice * 0.075 + 38 + 8.5)
          this.requestParam.theirPrice = parseFloat(theirPrice).toFixed(2)
        } else {
          this.requestParam.theirPrice = this.orderData.theirPrice
        }
        if (!this.orderData.profits) {
          let profits = this.requestParam.theirPrice - 10
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





  .store-list {
    display: -ms-flex;
    display: -webkit-box;
    display: -ms-flexbox;
    /*display: flex;*/
    flex-wrap: wrap;
    -ms-flex-pack: distribute;
    justify-content: space-around;
    padding: 2vw 2vw 4vw 2vw;
  li {
    text-align: center;
    /*border-style: groove;*/
    background-color: #EEF2F7;
    width: 31%;
    padding: 1vw;
    color: #333;
    margin: 1.1vw;
    font-size: 4.5vw;
    -webkit-box-sizing: border-box;
    box-sizing: border-box;
  a,
  img {
    width: 100%;
    display: block;
  }
  p{
    padding-top: 1vw;
  }
  }
  }
  .section1name{
    color: black;
  }
  .wrap {
    position: relative;
  }
  .mark2 {
    position: absolute;
    top: 5px;
    left: 0;
    margin: 0;
  }

  .mark2:before {
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
