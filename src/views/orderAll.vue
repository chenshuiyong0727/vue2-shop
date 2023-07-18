<template>
  <div class="hello" ref="hello">
    <mt-header title="订单">
      <div slot="left">
        <mt-button icon="back" @click="$router.go(-1)"></mt-button>
      </div>
      <div slot="right">
        <el-dropdown trigger="click">
          <mt-button size="normal">
            <img  style="width: 25px" src="../../static/img/slh.png">
          </mt-button>
          <el-dropdown-menu slot="dropdown" >
            <el-dropdown-item type="text" @click.native="showSdClick">{{!showSd ? '批量操作' : '退出' }}</el-dropdown-item>
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
          v-model.trim="queryParam.keyword">
        </el-input>
      </div>
      <div class="fenlei_top_right" @click="gotosearch">
        <img src="../../static/img/search.png" height="30px;" width="30px;">
      </div>
    </div>
    <div class="searchList" ref="searchList">
      <span style="margin-right: 6vw;" class="aaa" :class="!queryParam.status && !queryParam.theExpire? 'activity' : ''" @click="searchStatus('')">全部</span>
      <div :style="!orderIofo.count3 ? 'margin-right: 6vw; display: flex;' : 'margin-right: 3vw;display: flex;' ">
        <span class="aaa" :class="queryParam.status==3 && !queryParam.theExpire ? 'activity' : ''" @click="searchStatus(3)">待发货</span>
        <i v-if="orderIofo.count3" class="danger-num-1">{{orderIofo.count3}}</i>
      </div>
      <div :style="!orderIofo.count4 ? 'margin-right: 6vw; display: flex;' : 'margin-right: 3vw;display: flex;' ">
        <span class="aaa" :class="queryParam.status==4 && !queryParam.theExpire ? 'activity' : ''" @click="searchStatus(4)">已发货</span>
        <i v-if="orderIofo.count4" class="danger-num-1">{{orderIofo.count4}}</i>
      </div>
      <div :style="!orderIofo.count5 ? 'margin-right: 6vw; display: flex;' : 'margin-right: 3vw;display: flex;' ">
         <span class="aaa" :class="queryParam.status==5 && !queryParam.theExpire ? 'activity' : ''" @click="searchStatus(5)">运输中</span>
        <i v-if="orderIofo.count5" class="danger-num-1">{{orderIofo.count5}}</i>
      </div>
      <div :style="!orderIofo.count6 ? 'margin-right: 6vw; display: flex;' : 'margin-right: 3vw;display: flex;' ">
        <span class="aaa" :class="queryParam.status==6 && !queryParam.theExpire ? 'activity' : ''" @click="searchStatus(6,4)">已收货</span>
        <i v-if="orderIofo.count6" class="danger-num-1">{{orderIofo.count6}}</i>
      </div>
<!--      -->
<!--      <span style="margin-right: 6vw;" class="aaa" :class="queryParam.status==4 && !queryParam.theExpire? 'activity' : ''" @click="searchStatus(4)">已发货</span>-->
<!--      <span style="margin-right: 6vw;" class="aaa" :class="queryParam.status==5 && !queryParam.theExpire? 'activity' : ''" @click="searchStatus(5)">运输中</span>-->
<!--      <span style="margin-right: 6vw;" class="aaa" :class="queryParam.status==6 && !queryParam.theExpire? 'activity' : ''" @click="searchStatus(6)">已收货</span>-->
      <span style="margin-right: 6vw;" class="aaa" :class="queryParam.status==11 && !queryParam.theExpire? 'activity' : ''" @click="searchStatus(11,4)">已入库</span>
      <span style="margin-right: 6vw;" class="aaa" :class="!queryParam.status  && queryParam.theExpire ? 'activity' : ''" @click="searchTheExpire">即将到期</span>
      <span style="margin-right: 6vw;" class="aaa" :class="queryParam.status==2 && !queryParam.theExpire ? 'activity' : ''" @click="searchStatus(2,7)">已上架</span>
      <span style="margin-right: 6vw;" class="aaa" :class="queryParam.status==7 && !queryParam.theExpire? 'activity' : ''" @click="searchStatus(7,7)">交易成功</span>
      <span style="margin-right: 0px;" class="aaa" :class="queryParam.status==8 && !queryParam.theExpire? 'activity' : ''" @click="searchStatus(8,7)">瑕疵</span>
    </div>
    <mt-loadmore
      style="margin-top: 87px;"
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
        <div class="dingdans_top_dw" :style="item.status == 3 && item.deliveryDeadlineTime ? 'border-bottom: 0;' : ''">
          <div class="dingdans_top_left_dw">
            <span>订单号:</span>
            <span>{{item.orderNo }}</span>
          </div>
          <div class="dingdans_top_right_dw">
<!--            <span>{{ item.status | dictToDescTypeValue(37) }} </span>-->
            <span v-if="item.status == 7" class="color-success">{{ item.status |
              dictToDescTypeValue(37) }} </span>
            <span v-else-if="[3,4,5,6,8].includes(item.status)" class="color-danger">{{
              item.status | dictToDescTypeValue(37) }} </span>
            <span v-else>{{ item.status | dictToDescTypeValue(37) }} </span>
          </div>
        </div>
        <div v-if="item.status == 3 && item.deliveryDeadlineTime" style="background-color: #fbfbfd;color: #333333;font-weight: 600;font-size: 13px;">
          <div style="padding: 6px;
    margin-left: 5px;">
            <img style="    width: 18px;
    margin-top: -3px;"
                 src="../../static/img/djs.png">
            <span style="font-size: 14px;margin-left: 2px;">发货仅剩：</span>
            <strong v-if=" item.days" style="font-size: 15px;">
              {{ item.days}}
            </strong>
            <span v-if=" item.days">天</span>
            <strong v-if=" item.hours" style="font-size: 15px;">
              {{ item.hours}}
            </strong>
            <span v-if=" item.hours">时 </span>
            <strong   style="font-size: 15px;">
              {{ item.minutes}}
            </strong>
            <span >分</span>
            <strong  style="font-size: 15px;">
              {{ item.seconds}}
            </strong>
            <span  >秒</span>
          </div>
        </div>
<!--        中间-->
        <div class="dingdans_con_dw">
          <div v-if="showSd" style="width: 50px;
    margin-left: -2px;
    margin-right: 2px;" >
            <el-checkbox v-model="item.checked" :checked="item.checked" @change="changeChecked(item.id)"></el-checkbox>
          </div>
          <div :src="item.img" class="dingdans_con_left_dw"
               @click="avatarShow(item.img)">
            <img :src="item.img" >
            <p class="mark_dw">
              <span class="text_dw">
                {{ item.saleType | dictToDescTypeValue(46) }}
              </span>
            </p>
          </div>
          <div class="diangdans_con_right_dw">
            <div class="dingdans_con_right_top_dw" @click="goDetail(item.id) ">
              <span>
                {{item.goodsName}}
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
            <div v-if="item.surplusDay && item.saleType ==2  && item.status !=7" style="    margin-top: 12px;margin-bottom: 5px;">
              <span v-if="item.surplusDay >12">剩余天数</span>
              <span v-if="item.surplusDay >=0 && item.surplusDay <=12" class="color-danger">剩余天数</span>
              <span v-if="item.surplusDay < 0" class="color-danger">到期天数</span>
              <span v-if="item.surplusDay >12">
                {{item.surplusDay}}
              </span>
              <strong  v-if="item.surplusDay >=0 && item.surplusDay <=12"  class="color-danger">
                {{item.surplusDay}}
              </strong>
              <strong  v-if="item.surplusDay < 0"  class="color-danger">
                {{ 0 - item.surplusDay}}
              </strong>
            </div>
            <div class="dingdans_con_right_top_dw_2">
              <div>
                 <span>
                {{item.size}}
              </span>
              </div>
              <div>
                <strong v-if="item.theirPrice && ![2,11].includes(item.status)"   style="color: #333333">
                  ¥
                </strong>
                <strong  v-if="item.theirPrice && ![2,11].includes(item.status)" style="font-size: 17px ;margin-left: -2px;color: #333333">
                  {{item.theirPrice}}
                </strong>
                <span v-if="![2,11].includes(item.status)"  style="margin-left: 3px;text-decoration:line-through;">
                  {{item.shelvesPrice}}
                </span>
                <span v-else style="margin-left: 3px;color: #333333;font-size: 15px">
                   <span style="font-size: 13px">¥</span>
                  {{item.shelvesPrice}}
                </span>
              </div>
            </div>
          </div>
        </div>
<!--底部-->
        <div class="dingdans_bottom_dw">
          <div v-if="[2,11].includes(item.status)" class="dingdans_top_left_dw">
            <span v-if="item.thisTimePrice">最低售价</span>
            <span v-if="item.thisTimePrice">{{item.thisTimePrice }} ,</span>
            <span v-if="item.thisTimeProfits" style="margin-left: 3px">预估利润</span>
            <span v-if="item.thisTimeProfits">{{item.thisTimeProfits }}</span>
          </div>
          <div v-else class="dingdans_top_left_dw">
            <span >利润</span>
            <span class="color-danger">{{item.profits }}</span>
            <span v-if="item.status == 3 && item.deliveryDeadlineTime" style="margin-left: 3px">
              <span>,</span>
              发货截止时间
            </span>
            <span v-if="item.status == 3 && item.deliveryDeadlineTime" class="dingdans_con_dw_time">
                 {{item.deliveryDeadlineTime | formateTime('{y}-{m}-{d} {h}:{i}') }}
              </span>
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
                  <el-dropdown-item type="text" @click.native="gotoDw(item.spuId)">得物</el-dropdown-item>
                  <el-dropdown-item type="text" @click.native="gotoWl(item)">查看物流</el-dropdown-item>
                  <el-dropdown-item type="text" @click.native="goodsDetail(item.goodsId, 1)">商品详情</el-dropdown-item>
<!--                  <el-dropdown-item type="text" @click.native="orderDetailnew(item.id, 1)">订单详情</el-dropdown-item>-->
                  <el-dropdown-item type="text" class="color-danger" @click.native="goDel(item.id)">删除</el-dropdown-item>
                </el-dropdown-menu>
              </el-dropdown>
            </div>
          </div>
        </div>
      </div>
      <div slot="top" class="mint-loadmore-top">
        <span v-show="topStatus !== 'loading'"
              :class="{ 'rotate': topStatus === 'drop' }">松手释放↓</span>
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
          <mt-button size="normal" @click="isShowDialog = false" style="font-size: 15px">关闭
          </mt-button>
        </div>
        <div slot="left">
          <mt-button size="normal" @click="confirmHandle" style="font-size: 15px">确定</mt-button>
        </div>
      </mt-header>
      <section style="height: 148vw;width: 100vw;    margin-bottom: 17vw;overflow-y:scroll;">
        <mt-field label="货号" style="margin-top: 11vw;" v-model="orderData.actNo"
                  :disabled="true"></mt-field>
        <mt-field label="尺码" v-model="orderData.size" :disabled="true"></mt-field>
        <mt-field label="运单号" placeholder="请输入运单号" v-model="requestParam.waybillNo"></mt-field>
        <mt-field label="地址">
<!--          <el-select size="small" class="select100" v-model="requestParam.addressId">-->
<!--            <el-option :disabled="true" value="" selected>请选择</el-option>-->
<!--            <el-option-->
<!--              v-for="item in addressList"-->
<!--              :key="item.fieldValue"-->
<!--              :label="item.fieldName"-->
<!--              :value="+item.fieldValue">-->
<!--            </el-option>-->
<!--              -->
<!--          </el-select>-->
          <select class=" select100_select select" v-model="requestParam.addressId">
            <option label="请选择地址"  value=""></option>
            <option
              v-for="item in addressList"
              :key="item.fieldValue"
              :label="item.fieldName"
              :value="+item.fieldValue">
            </option>
          </select>
        </mt-field>
        <mt-field label="状态">
<!--          <el-select size="small" class="select100" v-model="requestParam.status" @change="keyup1">-->
<!--            <el-option label="状态" value=""></el-option>-->
<!--            <el-option-->
<!--              v-for="item in statusList"-->
<!--              :key="item.fieldValue"-->
<!--              :label="item.fieldName"-->
<!--              :value="+item.fieldValue">-->
<!--            </el-option>-->
<!--          </el-select>-->

          <select class=" select100_select select" v-model="requestParam.status" @change="keyup1">
            <option label="请选择状态"  value=""></option>
            <option
              v-for="item in statusList"
              :key="item.fieldValue"
              :label="item.fieldName"
              :value="+item.fieldValue">
            </option>
          </select>
        </mt-field>
        <mt-field label="销售类型">
<!--          <el-select size="small" class="select100" v-model="requestParam.saleType">-->
<!--            <el-option label="销售类型" value=""></el-option>-->
<!--            <el-option-->
<!--              v-for="item in saleTypeList"-->
<!--              :key="item.fieldValue"-->
<!--              :label="item.fieldName"-->
<!--              :value="+item.fieldValue">-->
<!--            </el-option>-->
<!--          </el-select>-->

          <select class=" select100_select select" v-model="requestParam.saleType">
            <option label="请选择销售类型"  value=""></option>
            <option
              v-for="item in saleTypeList"
              :key="item.fieldValue"
              :label="item.fieldName"
              :value="+item.fieldValue">
            </option>
          </select>
        </mt-field>
        <mt-field label="瑕疵原因" v-if="requestParam.status == 8" placeholder="请输入瑕疵原因"
                  v-model="requestParam.reason"></mt-field>
        <mt-field label="发货截止时间">
          <el-date-picker size="small" class="select100" style="width: 62vw"
                          type="datetime" placeholder="发货截止时间"
                          v-model="requestParam.deliveryDeadlineTime"
                          value-format="yyyy-MM-dd HH:mm:ss">>
          </el-date-picker>
        </mt-field>
        <mt-field label="入库价" placeholder="请输入入库价" @keyup.native="keyup1($event)" type="number"
                  v-model="requestParam.price"></mt-field>
        <mt-field label="出售价格" placeholder="请输入出售价格" @keyup.native="keyup1($event)" type="number"
                  v-model="requestParam.shelvesPrice"></mt-field>
        <mt-field label="补贴价格" placeholder="请输入补贴价格" @keyup.native="keyup1($event)" type="number"
                  v-model="requestParam.subsidiesPrice"></mt-field>
        <mt-field label="手续费" placeholder="请输入手续费" @keyup.native="keyup1($event)" type="number"
                  v-model="requestParam.poundage"></mt-field>
        <mt-field label="运费" placeholder="请输入运费" @keyup.native="keyup1($event)" type="number"
                  v-model="requestParam.freight"></mt-field>
        <mt-field label="到手价" placeholder="请输入到手价" @keyup.native="keyup2($event)" type="number"
                  v-model="requestParam.theirPrice"></mt-field>
        <mt-field label="利润" placeholder="请输入利润" @keyup.native="keyup1($event)" type="number"
                  v-model="requestParam.profits"></mt-field>
      </section>
    </mt-popup>
    <mt-popup
      position="bottom"
      v-model="isShowDialogWl">
      <mt-header title="物流详情">
        <div slot="left">
          <mt-button size="normal" @click="isShowDialogWl = false" style="font-size: 15px">关闭
          </mt-button>
        </div>
      </mt-header>
      <div class="wlInfo">
        <p><span style="color: #979a9e">顺丰速运 :</span>  <span>{{requestParamWl.waybillNo}}</span>
<!--          <el-button-->
<!--          type="text"-->
<!--          style="font-weight: 600;padding-left: 5px;padding-top: 0px;padding-bottom: 0px;"-->
<!--          @click="copyUrl(requestParamWl.waybillNo )">复制-->
<!--        </el-button>-->
          <button class="dw-button-common-a2"  @click="copyUrl(requestParamWl.waybillNo )" style=" margin-left: 10px;   padding: 1px 5px;">复制</button>
        </p>
        <p style="margin-top: 2px;"><span style="color: #979a9e">实际金额 :</span> <span>{{requestParamWl.freight}}</span></p>
        <p style="margin-top: 2px;">
          <span style="color: #979a9e">收货地址 :</span>
          <div style="width: 56vw;
    margin-top: -17px;
    margin-left: 72px;">{{requestParamWl.receiverAddress }}</div>
        </p>
      </div>
      <div style="height: 120vw;width: 100vw;" class="rigth-content-bottom">
        <div class="package-status" style="overflow-y:scroll;">
          <div class="status-box" >
            <ul class="status-list">
              <li :class="index==0 || wlDataSize==(index+1) ? 'latest' : ''"
                  v-for="(item,index) in wlData" :key="index">
                <div
                  :class="index==0 || wlDataSize==(index+1) ? 'status-time-latest' : 'status-time-before'">
                  <strong>
                     {{item.status}}
                  </strong>
                  <span>
                     {{item.date | formateTime('{m}-{d} {h}:{i}') }}
                  </span>
                </div>
                <div
                  :class="index==0 || wlDataSize==(index+1) ? 'status-content-latest' : 'status-content-before'">
                  {{item.message}}
                </div>
                <div class="status-line"></div>
              </li>
            </ul>
          </div>
        </div>

      </div>
    </mt-popup>
<!--    <mt-popup1-->
<!--      v-model="isShowDialog1">-->
<!--      <mt-header title="修改地址">-->
<!--        <div slot="right">-->
<!--          <mt-button size="normal" @click="isShowDialog1 = false" style="font-size: 15px">关闭-->
<!--          </mt-button>-->
<!--        </div>-->
<!--        <div slot="left">-->
<!--          <mt-button size="normal" @click="updateAddress" style="font-size: 15px">确定</mt-button>-->
<!--        </div>-->
<!--      </mt-header>-->
<!--      <section style="height: 85vw;width: 80vw">-->
<!--        <mt-field label="货号" style="margin-top: 11vw;" v-model="orderData1.actNo"-->
<!--                  :readonly="1==1"></mt-field>-->
<!--        <mt-field label="尺码" v-model="orderData1.size" :readonly="1==1"></mt-field>-->
<!--        <mt-field label="运费" placeholder="请输入运费" type="number"-->
<!--                  v-model="requestParam1.freight"></mt-field>-->
<!--        <mt-field label="运单号" placeholder="请输入运单号" v-model="requestParam1.waybillNo"></mt-field>-->
<!--        <mt-field label="地址">-->
<!--            -->
<!--          <el-select size="small" class="select80" v-model="requestParam1.addressId">-->
<!--            <el-option :disabled="true" value="" selected>请选择</el-option>-->
<!--            <el-option-->
<!--              v-for="item in addressList"-->
<!--              :key="item.fieldValue"-->
<!--              :label="item.fieldName"-->
<!--              :value="+item.fieldValue">-->
<!--            </el-option>-->
<!--              -->
<!--          </el-select>-->
<!--        </mt-field>-->
<!--      </section>-->
<!--    </mt-popup1>-->
    <mt-popup
      position="bottom"
      v-model="isShowDialog2">
      <mt-header title="筛选">
        <div slot="right">
          <mt-button size="normal" @click="resetHandle" style="font-size: 15px">关闭</mt-button>
        </div>
        <div slot="left">
          <mt-button size="normal" @click="search1" style="font-size: 15px">确定</mt-button>
        </div>
      </mt-header>
      <section style="height: 100vw;width: 100vw">
        <mt-field label="状态" style="margin-top: 12vw;">
<!--          <el-select size="small" class="select100" v-model="queryParam.status">-->
<!--            <el-option label="状态" value=""></el-option>-->
<!--            <el-option-->
<!--              v-for="item in statusList"-->
<!--              :key="item.fieldValue"-->
<!--              :label="item.fieldName"-->
<!--              :value="+item.fieldValue">-->
<!--            </el-option>-->
<!--          </el-select>-->
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
        <mt-field label="商品类型">
<!--            <el-select size="small" class="select100" v-model="queryParam.goodType" >-->
<!--          <el-option :disabled="true" value="" selected>请选择商品类型</el-option>-->
<!--          <el-option-->
<!--            v-for="item in typeList"-->
<!--            :key="item.fieldValue"-->
<!--            :label="item.fieldName"-->
<!--            :value="item.fieldValue">-->
<!--          </el-option>-->
<!--            </el-select>-->

          <select class=" select100_select select" v-model="queryParam.goodType">
            <option label="请选择商品类型"  value=""></option>
            <option
              v-for="item in typeList"
              :key="item.fieldValue"
              :label="item.fieldName"
              :value="item.fieldValue">
            </option>
          </select>
        </mt-field>
        <mt-field label="地址">
            
<!--          <el-select size="small" class="select100" v-model="queryParam.addressId">-->
<!--            <el-option :disabled="true" value="" selected>请选择地址</el-option>-->
<!--            <el-option-->
<!--              v-for="item in addressList"-->
<!--              :key="item.fieldValue"-->
<!--              :label="item.fieldName"-->
<!--              :value="+item.fieldValue">-->
<!--            </el-option>-->
<!--              -->
<!--          </el-select>-->

          <select class=" select100_select select" v-model="queryParam.addressId">
            <option label="请选择地址"  value=""></option>
            <option
              v-for="item in addressList"
              :key="item.fieldValue"
              :label="item.fieldName"
              :value="+item.fieldValue">
            </option>
          </select>
        </mt-field>
        <mt-field label="销售类型">
<!--          <el-select size="small" class="select100" v-model="queryParam.saleType">-->
<!--            <el-option label="销售类型" value=""></el-option>-->
<!--            <el-option-->
<!--              v-for="item in saleTypeList"-->
<!--              :key="item.fieldValue"-->
<!--              :label="item.fieldName"-->
<!--              :value="+item.fieldValue">-->
<!--            </el-option>-->
<!--          </el-select>-->

          <select class=" select100_select select" v-model="queryParam.saleType">
            <option label="请选择销售类型"  value=""></option>
            <option
              v-for="item in saleTypeList"
              :key="item.fieldValue"
              :label="item.fieldName"
              :value="+item.fieldValue">
            </option>
          </select>
        </mt-field>
        <mt-field label="运单号" placeholder="请输入运单号" v-model="queryParam.waybillNo"></mt-field>
        <mt-field label="订单号" placeholder="请输入订单号" v-model="queryParam.orderNo"></mt-field>
        <mt-field label="尺码" placeholder="请输入尺码" v-model="queryParam.size"></mt-field>
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
      </section>
    </mt-popup>
    <mt-popup
      v-model="isShowDialog3">
      <mt-header title="批量操作">
        <div slot="right">
          <mt-button size="normal" @click="isShowDialog3 = false" style="font-size: 15px">关闭
          </mt-button>
        </div>
        <div slot="left">
          <mt-button size="normal" @click="confirmHandle3" style="font-size: 15px">确定</mt-button>
        </div>
      </mt-header>
      <section style="height: 100vw;width: 100vw">
        <mt-field label="选中数" style="margin-top: 11vw;" v-model="ids.length"
                  :disabled="true"></mt-field>
        <mt-field label="发货截止时间">
          <el-date-picker size="small" class="select100" style="width: 62vw"
                          type="datetime" placeholder="发货截止时间"
                          v-model="requestParam3.deliveryDeadlineTime"
                          value-format="yyyy-MM-dd HH:mm:ss">>
          </el-date-picker>
        </mt-field>
        <mt-field label="地址">
<!--            -->
<!--          <el-select size="small" class="select100" v-model="requestParam3.addressId">-->
<!--            <el-option :disabled="true" value="" selected>请选择仓库</el-option>-->
<!--            <el-option-->
<!--              v-for="item in addressList"-->
<!--              :key="item.fieldValue"-->
<!--              :label="item.fieldName"-->
<!--              :value="+item.fieldValue">-->
<!--            </el-option>-->
<!--              -->
<!--          </el-select>-->

          <select class=" select100_select select" v-model="requestParam3.addressId">
            <option label="请选择地址"  value=""></option>
            <option
              v-for="item in addressList"
              :key="item.fieldValue"
              :label="item.fieldName"
              :value="+item.fieldValue">
            </option>
          </select>
        </mt-field>
        <mt-field label="销售类型">
            
<!--          <el-select size="small" class="select100" v-model="requestParam3.saleType">-->
<!--            <el-option :disabled="true" value="" selected>请选择销售类型</el-option>-->
<!--            <el-option-->
<!--              v-for="item in saleTypeList"-->
<!--              :key="item.fieldValue"-->
<!--              :label="item.fieldName"-->
<!--              :value="+item.fieldValue">-->
<!--            </el-option>-->
<!--              -->
<!--          </el-select>-->

          <select class=" select100_select select" v-model="requestParam3.saleType">
            <option label="请选择销售类型"  value=""></option>
            <option
              v-for="item in saleTypeList"
              :key="item.fieldValue"
              :label="item.fieldName"
              :value="+item.fieldValue">
            </option>
          </select>
        </mt-field>
        <mt-field label="状态">
<!--            -->
<!--          <el-select size="small" class="select100" v-model="requestParam3.status">-->
<!--            <el-option :disabled="true" value="" selected>请选择状态</el-option>-->
<!--            <el-option-->
<!--              v-for="item in statusList"-->
<!--              :key="item.fieldValue"-->
<!--              :label="item.fieldName"-->
<!--              :value="+item.fieldValue">-->
<!--            </el-option>-->
<!--              -->
<!--          </el-select>-->
          <select class=" select100_select select" v-model="requestParam3.status">
            <option label="请选择状态"  value=""></option>
            <option
              v-for="item in statusList"
              :key="item.fieldValue"
              :label="item.fieldName"
              :value="+item.fieldValue">
            </option>
          </select>
        </mt-field>
        <mt-field label="免仓储费天数" placeholder="请输入免仓储费天数" type="number"
                  v-model="requestParam3.inStoreFreeDay"></mt-field>
        <mt-field label="寄售入仓时间">
          <el-date-picker size="small" class="select100" style="width: 62vw"
                          type="datetime" placeholder="闪电直发入仓时间"
                          v-model="requestParam3.inStoreTime"
                          value-format="yyyy-MM-dd HH:mm:ss">>
          </el-date-picker>
        </mt-field>
        <mt-field label="运费" placeholder="请输入运费" type="number"
                  v-model="requestParam3.freight"></mt-field>
        <mt-field label="运单号" placeholder="请输入运单号" v-model="requestParam3.waybillNo"></mt-field>

      </section>
    </mt-popup>
    <div class="popContainer" v-if="pictureZoomShow" @click="pictureZoomShow = false">
      <div class="imageShow">
        <img :src="imageZoom" alt="" class="showImg">
      </div>
    </div>
    <div v-if="showSd" style="
    bottom: 54px;
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
    margin-left: 8px;
        margin-right: 20px" @click="sdzf">批量操作
        </el-button>
      </div>
    </div>
    <v-footer></v-footer>
  </div>
</template>
<script>
  import Footer from '@/common/_footer.vue'
  import {goodsOrderApi} from '@/api/goodsOrder'
  import {parseTime} from '@/utils/index'

  export default {
    components: {
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
        showSd: false,
        checkAll: false,
        imageZoom: '',
        pictureZoomShow: true,
        requestParam1: {
          id: '',
          waybillNo: '',
          freight: '',
          addressId: ''
        },
        requestParam3: {
          ids: '',
          status: '',
          saleType: 2,
          addressId: '',
          deliveryDeadlineTime: '',
          inStoreFreeDay: '',
          inStoreTime: '',
          waybillNo: '',
          freight: ''
        },
        requestParamWl: {
          receiverAddress: '',
          addressId: '',
          waybillNo: '',
          freight: '',
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
        titleName: '订单',
        orderIofo: {},
        emtityMsg: '',
        orderData: '',
        isShowDialog: false,
        orderData1: '',
        isShowDialog1: false,
        orderData2: '',
        isShowDialog2: false,
        isShowDialog3: false,
        orderDataWl: '',
        isShowDialogWl: false,
        pictureZoomShow: false,
        imageZoom: '',
        fileUrl: fileUrl,
        saleType: '',
        typeList: [],
        queryParam: {
          id: '',
          size: '',
          saleType: '',
          keyword: '',
          orderNo: '',
          inventoryId: '',
          status: '',
          theExpire: '',
          shelvesPriceFrom: '',
          shelvesPriceTo: '',
          freightFrom: '',
          freightTo: '',
          poundageFrom: '',
          poundageTo: '',
          theirPriceFrom: '',
          theirPriceTo: '',
          addressId: '',
          goodType: '',
          waybillNo: '',
          createTimeFrom: '',
          createTimeTo: '',
          updateTimeFrom: '',
          updateTimeTo: '',
          sellTimeFrom: '',
          sellTimeTo: '',
          successTimeFrom: '',
          successTimeTo: '',
          pageSize: 10,
          pageNum: 1
        },
        successTimeFrom:'',
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
        wlData: [],
        wlDataSize: '',
        scrollNum: '',
        totalCount: 1
      }
    },
    activated() {
      this.keyupSubmit()
      // 新开的页面
      this.isBack = false
      if (!this.$route.meta.isBack) {
        this.initBatch()
        this.listSysDict()
        this.resetData()
        //isBack 时添加中router中的元信息，判读是否要缓存
        const {actNo, status, months, orderNo, saleType,theExpire,scrollNum} = this.$route.query
        if (saleType) {
          this.saleType = saleType
          this.queryParam.saleType = saleType
        }else{
          this.saleType = ''
          this.queryParam.saleType = ''
        }
        if (scrollNum){
          this.scrollNum = scrollNum
          this.tabScroll()
        }
        this.queryParam.orderNo = orderNo
        this.queryParam.keyword = actNo
        if (status) {
          this.status = +status
          this.queryParam.status = +status
        }
        if (theExpire) {
          this.queryParam.theExpire = +theExpire
        }
        this.months = months
        if (this.queryParam.keyword || this.queryParam.status || this.months
          || this.queryParam.orderNo || this.queryParam.saleType || this.queryParam.theExpire) {
          // if (this.queryParam.status) {
          //   this.changeSystem()
          // }
          if (this.months) {
            this.queryParam.successTimeFrom = this.months
            this.queryParam.successTimeTo = this.months
          }
        }
        this.getPage()
      } else {
        this.$refs.hello.scrollTop = this.curScrollTop
        if (this.scrollNum){
          this.tabScroll()
        }
      }
    },
    beforeRouteLeave(to, from, next) {
      if (to.path == "/store" || to.path == "/orderDetail" || to.path == "/WlDetail" || to.path == "/goodsDetail") {
        from.meta.isBack = this.isBack;
      } else {
        this.curScrollTop = 0
        from.meta.isBack = false;
      }
      next()
    },
    methods: {
      tabScroll(){
        let scrollNum = this.scrollNum
        let activeTab = document.querySelectorAll('.aaa');
        console.log(activeTab[scrollNum].offsetLeft);
        this.$refs.searchList.scrollLeft = activeTab[scrollNum].offsetLeft;
      },
      initBatch() {
        this.showSd = false
        this.checkAll = false
        this.ids= []
        this.tableData.forEach((obj) => (obj.checked = false));
      },
      keyupSubmit() {
        document.onkeydown = (e) => {
          let _key = window.event.keyCode
          if (_key === 13) {
            this.search1()
          }
        }
      },
      getDetailById() {
        let id = this.ids[0]
        if (id) {
          goodsOrderApi.getDetailById(id).then(res => {
            if (res.subCode === 1000) {
              this.requestParam3.deliveryDeadlineTime = res.data ? parseTime(
                res.data.deliveryDeadlineTime) : ''
              this.requestParam3.inStoreTime = res.data ? parseTime(res.data.inStoreTime) : ''
              this.requestParam3.addressId = res.data ? res.data.addressId : ''
              this.requestParam3.inStoreFreeDay = res.data ? res.data.inStoreFreeDay : ''
              this.requestParam3.freight = res.data ? res.data.freight : ''
              this.requestParam3.waybillNo = res.data ? res.data.waybillNo : ''
            } else {
              this.$toast(res.subMsg)
            }
          })
        }
      },
      selectYear () {
        this.$refs.datePicker.open();
      },
      handleConfirm (value) {
        console.log(value);
        let year = value.getFullYear();
        let month = value.getMonth() + 1;
        let date = value.getDate();
        this.queryParam.successTimeFrom = year+'-'+month+'-'+date
      },
      countdown(orderData ) {
        if (orderData.status != 3){
          return
        }
        orderData.days = 0
        orderData.hours = 0
        orderData.minutes = 0
        let deliveryDeadlineTime = orderData.deliveryDeadlineTime
        let endTime = new Date(deliveryDeadlineTime).getTime();
        let startTime = new Date().getTime();
        let totalSeconds = endTime - startTime;
        let interval = setInterval(() => {
          if (totalSeconds > 0) {
            orderData.days = Math.floor(totalSeconds / (24 * 60 * 60 * 1000));
            orderData.hours = Math.floor(
              (totalSeconds - orderData.days * 24 * 60 * 60 * 1000) / (60 * 60 * 1000)
            );
            orderData.minutes = Math.floor(
              (totalSeconds -
                orderData.days * 24 * 60 * 60 * 1000 -
                orderData.hours * 60 * 60 * 1000) /
              (60 * 1000)
            );
            orderData.seconds = Math.floor(
              (totalSeconds -
                orderData.days * 24 * 60 * 60 * 1000 -
                orderData.hours * 60 * 60 * 1000 -
                orderData.minutes * 60 * 1000) /
              1000
            );
            totalSeconds -= 1000;
            this.$forceUpdate()
          } else {
            clearInterval(interval);
          }
        }, 1000);
      },
      getPage() {
        this.initBatch()
        this.getData()
        this.emtityMsg = ''
        goodsOrderApi.page(this.queryParam).then(res => {
          if (res.subCode === 1000) {
            this.tableData = res.data ? res.data.list : []
            this.totalCount = res.data ? res.data.pageInfo.totalCount : 0
            for (let i = 0; i < this.tableData.length; i++) {
              this.countdown(this.tableData[i])
            }
            this.initBatch()
            if (this.totalCount == 0) {
              this.allLoaded = true;
              if (this.queryParam.pageNum == 1){
                this.emtityMsg = '暂无相关订单'
              }
            } else if (this.totalCount <= this.queryParam.pageSize) {
              this.allLoaded = true;
            }
          } else {
            this.$toast(res.subMsg)
          }
        })
      },
      confirmHandle3() {
        if (!this.requestParam3.deliveryDeadlineTime) {
          this.$toast('发货截止时间为空')
          return
        }
        if (!this.requestParam3.addressId) {
          this.$toast('发货地址为空')
          return
        }
        if (this.requestParam3.status == 11 && !this.requestParam3.inStoreTime) {
          this.$toast('闪电直发入仓 ，入仓时间不能为空')
          return
        }
        if (this.requestParam3.status == 11 && !this.requestParam3.inStoreFreeDay) {
          this.$toast('闪电直发入仓 ，免仓储费天数不能为空')
          return
        }
        // 闪电直发
        goodsOrderApi.updateSaleType(this.requestParam3).then(res => {
          this.$toast(res.subMsg)
          if (res.subCode === 1000) {
            this.getPage()
            this.isShowDialog3 = false
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
        this.typeList = sysDictList.filter(item => item.typeValue == 20221108)
      },
      loadData(p_status) {
        // 第一次加载或者下拉刷新最新数据
        if (p_status === "refresh") {
          this.tableData = [];
        }
        goodsOrderApi.page(this.queryParam).then(res => {
          if (res.subCode === 1000) {
            let list = res.data ? res.data.list : []
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
        if (!this.queryParam.keyword) {
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
      // changeSystem() {
      //   let sysDictList = localStorage.getItem('sysDictList') ? JSON.parse(
      //     localStorage.getItem('sysDictList')) : []
      //   let res = sysDictList.filter(
      //     item => item.typeValue == 37 && item.fieldValue == this.queryParam.status)
      //   this.titleName = res.length ? res[0].fieldName : ''
      //   this.titleName = this.titleName + '订单'
      // },
      // changeOrder() {
      //   let sysDictList = localStorage.getItem('sysDictList') ? JSON.parse(
      //     localStorage.getItem('sysDictList')) : []
      //   let res = sysDictList.filter(
      //     item => item.typeValue == 46 && item.fieldValue == this.queryParam.saleType)
      //   this.titleName = res.length ? res[0].fieldName : ''
      //   this.titleName = this.titleName + '订单'
      // },
      changeSystem1() {
        // 强制刷新
        this.$forceUpdate()
      },
      getData() {
        goodsOrderApi.orderData().then(res => {
          if (res.subCode === 1000) {
            this.orderIofo = res.data ? res.data.countDto : {}
          } else {
            this.$toast(res.subMsg)
          }
        })
      },
      search1() {
        this.queryParam.pageNum = 1
        this.allLoaded = false;
        this.isShowDialog2 = false
        this.$refs.hello.scrollTop = 0
        this.getPage()
      },
      searchStatus(status,scrollNum) {
        this.queryParam.status = status
        this.queryParam.theExpire = ''
        this.scrollNum = scrollNum
        this.search1()
      },
      gotosearch() {
        console.info('queryParam' , this.queryParam)
        this.isShowDialog2 = true
      },
      searchTheExpire() {
        this.queryParam.status = ''
        this.queryParam.theExpire = 1
        this.scrollNum = 7
        this.search1()
      },
      resetData() {
        this.queryParam = {
          id: '',
          size: '',
          keyword: '',
          orderNo: '',
          inventoryId: '',
          status: '',
          theExpire: '',
          shelvesPriceFrom: '',
          shelvesPriceTo: '',
          freightFrom: '',
          freightTo: '',
          poundageFrom: '',
          poundageTo: '',
          theirPriceFrom: '',
          goodType: '',
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
          pageSize: 10,
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
          theExpire: '',
          shelvesPriceFrom: '',
          shelvesPriceTo: '',
          freightFrom: '',
          freightTo: '',
          poundageFrom: '',
          poundageTo: '',
          theirPriceFrom: '',
          goodType: '',
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
          pageSize: 10,
          pageNum: 1
        }
        this.titleName = '订单'
        this.createTime = ''
        this.updateTime = ''
        this.sellTime = ''
        this.successTime = ''
        if (this.saleType) {
          this.queryParam.saleType = this.saleType
        }else{
          this.queryParam.saleType = ''
        }
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
        if (this.requestParam.status == 7 && !this.requestParam.freight) {
          this.$toast('请输入运费')
          return
        }
        if (this.requestParam.status == 3 && !this.requestParam.addressId) {
          this.$toast('请选择地址')
          return
        }
        if (this.requestParam.status == 8 && !this.requestParam.reason) {
          this.$toast('请输入瑕疵原因')
          return
        }
        if (this.requestParam.status == 3 && !this.requestParam.deliveryDeadlineTime) {
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
      goodsDetail(id, type) {
        this.isBack = true
        this.curScrollTop = this.$refs.hello.scrollTop
        this.$router.push({ path: '/goodsDetail', query: { id, type } })
      },
      jumpactNo(actNo) {
        this.isBack = true
        this.curScrollTop = this.$refs.hello.scrollTop
        this.$router.push({path: '/store', query: {actNo}})
      },
      goDetail(id) {
        this.isBack = true
        this.curScrollTop = this.$refs.hello.scrollTop
        this.$router.push({path: '/orderDetail', query: {id}})
      },
      orderDetailnew(id) {
        this.isBack = true
        this.curScrollTop = this.$refs.hello.scrollTop
        this.$router.push({path: '/orderDetailnew', query: {id}})
      },
      gotoDw(spuId) {
        if (!spuId) {
          return
        }
        let url = "https://m.dewu.com/router/product/ProductDetail?spuId=";
        window.location.href = url + spuId;
      },
      goDel(id) {
        this.$confirm('是否删除', "提示", {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: "warning",
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
      delItem(id) {
        for (let i = 0; i < this.ids.length; i++) {
          if (this.ids[i] === id) {
            this.ids.splice(i, 1)
          }
        }
      },
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
      showSdClick() {
        this.showSd = !this.showSd
      },
      sdzf() {
        this.requestParam3.ids = this.ids
        this.requestParam3.status = 3
        if (!this.ids.length) {
          this.$toast('请选择订单')
          return
        }
        this.getDetailById()
        this.isShowDialog3 = true
      },
      gotoWl(orderData) {
        this.requestParamWl.addressId = orderData.addressId
        this.requestParamWl.waybillNo = orderData.waybillNo
        if (!this.requestParamWl.waybillNo) {
          this.$toast('没有物流单号')
          return
        }
        goodsOrderApi.waybillNoList(this.requestParamWl).then(res => {
          if (res.subCode === 1000) {
            if (res.data.list.length) {
              this.wlDataSize = res.data.list.length
              this.requestParamWl.receiverAddress = res.data.receiverAddress
              this.requestParamWl.freight = res.data.realAmount
              this.wlData = []
              for (let i = 0; i < res.data.list.length; i++) {
                let dataInfo = res.data.list[i]
                let status = '运输中'
                if (dataInfo.message.indexOf("已收取快件") >= 0) {
                  status = '已揽件'
                } else if (dataInfo.message.indexOf("可查看签收人信息") >= 0) {
                  status = '已签收'
                }
                dataInfo.status = status
                this.wlData.push(dataInfo)
              }
              this.isShowDialogWl = true
            } else {
              this.$toast("暂无物流信息，请核对物流单号")
            }
          } else {
            this.$toast(res.subMsg)
          }
        })
      },
      handleClick(orderData) {
        this.orderData = orderData
        this.requestParam.id = this.orderData.id
        this.requestParam.saleType = this.orderData.saleType
        this.requestParam.price = this.orderData.price
        this.requestParam.shelvesPrice = this.orderData.shelvesPrice

        this.requestParam.subsidiesPrice = this.orderData.subsidiesPrice
        this.requestParam.deliveryDeadlineTime = parseTime(this.orderData.deliveryDeadlineTime)
        this.requestParam.freight = this.orderData.freight
        this.requestParam.waybillNo = this.orderData.waybillNo
        this.requestParam.addressId = this.orderData.addressId ? this.orderData.addressId :''
        if (this.orderData.status != 11) {
          this.requestParam.status = this.orderData.status + 1
        } else {
          this.requestParam.status = 6
        }
        if (this.orderData.status == 7) {
          this.requestParam.status = 7
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
  strong {
    font-weight: 600;
  }

  .mint-button--small {
    display: inline-block;
    font-size: 4vw;
    height: 6vw;
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
  }

  /* 给要上拉的容器设置 begin */
  .hello {
    background-color: #f3f2f8;
    padding-top: 12vw;
    font-size: 13px;
    height: 100vh;
    /*overflow:hidden;*/

    overflow-y: auto;
  }

  .mint-loadmore-top,
  .mint-loadmore-bottom {
    font-size: 0.28rem;
  }

  .el-date-picker.has-time .el-picker-panel__body-wrapper {
    position: relative;
    margin-right: 52px;
  }

  .wrap {
    position: relative;
  }
  .package-status {
    color: #b8b8b8;
    padding: 18px 0 0 0
  }

  .package-status .status-list {
    margin: 0;
    padding: 0;
    margin-top: -5px;
    padding-left: 7px;
    list-style: none;
  }

  .package-status .status-list li {
    border-left: 2px solid #d9d9d9;
    width: 80vw;
    text-align: left;
  }

  .package-status .status-list li:before { /* 流程点的样式 */
    content: '';
    border: 3px solid #f3f3f3;
    background-color: #d9d9d9;
    display: inline-block;
    width: 10px;
    height: 10px;
    border-radius: 10px;
    margin-left: -9px;
    margin-right: 10px
  }

  .package-status .status-list .latest:before {
    background-color: #333;
    border-color: #333;
  }

  .package-status .status-box {
    overflow: hidden
  }

  .package-status .status-list li {
    height: auto;
  }

  .package-status .status-list {
    margin-top: -8px
  }

  .package-status .status-box {
    position: relative
  }

  .package-status .status-box:before {
    content: " ";
    background-color: #f3f3f3;
    display: block;
    position: absolute;
    top: -8px;
    left: 20px;
    width: 10px;
    height: 4px
  }

  .package-status .status-list {
    margin-top: 0px;
  }

  /* .package-status .status-list .latest{border:none} */
  /* .package-status .status-list li{margin-bottom:-2px} */


  .status-list li:not(:first-child) {
    padding-top: 10px;
  }

  .status-content-before {
    text-align: left;
    margin-right: 20px;
    margin-left: 25px;
    /*margin-top: -20px;*/
  }

  .status-content-latest {
    text-align: left;
    margin-right: 20px;
    margin-left: 25px;
    color: #333;
    /*margin-top: -20px;*/
  }

  .status-time-before {
    text-align: left;
    margin-left: 25px;
    font-size: 15px;
    margin-top: -20px;

  }

  .status-time-latest {
    text-align: left;
    margin-left: 25px;
    color: #333;
    font-size: 15px;
    margin-top: -20px;
  }

  .status-line {
    padding-top: 15px;
  }

  .rigth-content-bottom {
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    justify-content: space-around;
    margin: 2px;
    /*margin-top: 16px;*/
    overflow: scroll;
  }
  .wlInfo {
    width: 80vw;
    border-bottom: 1px solid #ccc;
    margin-top: 10vw;
    text-align: left;
    margin-left: 40px;
    padding: 3vw;
    color: rgb(51, 51, 51);
    font-size: 4.2vw;
  }
</style>
