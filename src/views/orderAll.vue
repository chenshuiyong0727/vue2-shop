<template>
  <div class="hello" ref="hello">
    <mt-header title="订单">
      <div slot="left">
        <mt-button icon="back" @click="$router.go(-1)"></mt-button>
      </div>
    </mt-header>
    <!--    <div style=" width: 35px;height: 35px;position: fixed;left: 10px;top: 18px;z-index: 999;" @click="$router.go(-1)">-->
    <!--      <img width="100%" src="../../static/img/topBack.png" alt="" />-->
    <!--    </div>-->
    <div class="fenlei_top">
      <div class="fenlei_top_left">
        <input type="text" v-model.trim="queryParam.keyword" placeholder="搜索关键词（货号，商品名）"
               class="ins">
      </div>
      <div class="fenlei_top_right" @click="isShowDialog2 = true">
        <img src="../../static/img/search.png" height="30px;" width="30px;">
      </div>
    </div>
    <div class="searchList">
      <span style="margin-right: 6vw;" :class="!queryParam.status ? 'activity' : ''" @click="searchStatus">全部</span>
      <span style="margin-right: 6vw;" :class="queryParam.status==3 ? 'activity' : ''" @click="searchStatus(3)">待发货</span>
      <span style="margin-right: 6vw;" :class="queryParam.status==4 ? 'activity' : ''" @click="searchStatus(4)">已发货</span>
      <span style="margin-right: 6vw;" :class="queryParam.status==5 ? 'activity' : ''" @click="searchStatus(5)">运输中</span>
      <span style="margin-right: 6vw;" :class="queryParam.status==6 ? 'activity' : ''" @click="searchStatus(6)">已收货</span>
      <span style="margin-right: 6vw;" :class="queryParam.status==11 ? 'activity' : ''" @click="searchStatus(11)">已入库</span>
      <span style="margin-right: 6vw;" :class="queryParam.status==2 ? 'activity' : ''" @click="searchStatus(2)">已上架</span>
      <span style="margin-right: 6vw;" :class="queryParam.status==7 ? 'activity' : ''" @click="searchStatus(7)">成功</span>
      <span style="margin-right: 0px;" :class="queryParam.status==8 ? 'activity' : ''" @click="searchStatus(8)">瑕疵</span>
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
      <div class="dingdans_item" v-for="(item,index) in tableData" :key="index">
        <div class="dingdans_top">
          <div class="dingdans_top_left">
            <strong>{{item.orderNo }}</strong>
          </div>
          <div class="dingdans_top_right">
            <strong v-if="item.status == 7" class="color-success">{{ item.status |
              dictToDescTypeValue(37) }} </strong>
            <strong v-else-if="[3,4,5,6,8].includes(item.status)" class="color-danger">{{
              item.status | dictToDescTypeValue(37) }} </strong>
            <strong v-else>{{ item.status | dictToDescTypeValue(37) }} </strong>
          </div>
        </div>
        <div class="dingdans_con">
          <div style="width: 30px;   display: flex;align-items: center;" v-if="showSd">
            <el-checkbox :checked="item.checked" @change="changeChecked(item.id)"></el-checkbox>
            <!--            <strong style="margin-left: 6px;">{{index + 1}}</strong>-->
          </div>
          <div v-if="item.img" :src="item.img" class="dingdans_con_left wrap"
               @click="avatarShow(item.img)">
            <img :src="item.img" style="margin-top: 25px;">
            <p class="mark">
              <span class="text">
                {{ item.saleType | dictToDescTypeValue(46) }}
              </span>
            </p>
          </div>
          <div v-if="!item.img && item.imgUrl" :src="item.img" class="dingdans_con_left"
               @click="avatarShow(fileUrl+ item.imgUrl)">
            <img :src="fileUrl + item.imgUrl">
          </div>
          <div class="diangdans_con_right">
            <div class="dingdans_con_right_top">
             <span>
               <strong style="color: #409EFF"
                       @click="jumpactNo(item.actNo)">{{item.actNo}} </strong>
                 <img @click="copyUrl(item.actNo)" style="width: 20px;"
                      src="../../static/img/copy6.png">
             </span>
              尺码：<strong>{{item.size}}</strong>
              入库价：<strong>{{item.price}}</strong>
              <!--              <span>-->
              <!--                 -->
              <!--              </span>-->
            </div>
            <div class="dingdans_con_right_down" style="margin-bottom: 1vw;margin-top: 1vw;">
              <span v-if="[2,11].includes(item.status)">最低售价：<strong class="color-danger">{{item.thisTimePrice}}</strong></span>
              <span v-if="[2,11].includes(item.status)">
                预估利润：<strong class="color-danger">{{item.thisTimeProfits}}</strong>
              </span>
              <span v-else>
                <span v-if="item.profits">利润：<strong class="color-danger">{{item.profits}}</strong></span>
              </span>
            </div>
            <div class="dingdans_con_right_down" style="margin-bottom: 0vw;">
              售价：<strong>{{item.shelvesPrice}}</strong>
              <span v-if="item.theirPrice">到手：<strong>{{item.theirPrice}}</strong></span>
            </div>
            <div class="dingdans_con_right_down" style="margin-bottom: 0vw;" v-if="item.addressId">
              <span>{{ item.addressId | dictToDescTypeValue(38) }} </span>
            </div>
            <div v-if="item.status == 3" class="dingdans_con_right_down_2_1">
              <span>  截止时间
                 <strong style="font-size: 12px;" class="color-danger"> {{item.deliveryDeadlineTime | formateTime('{y}-{m}-{d} {h}:{i}')  }}</strong>
              </span>
              <el-button
                type="text"
                style="font-weight: 600;padding-left: 5px;"
                @click="handleClick(item)">修改
              </el-button>
              <el-dropdown trigger="click" style="margin-left: 1px;">
                <span class="el-dropdown-link">
                  更多<i class="el-icon-arrow-down el-icon--right"
                       style="font-weight: 600; margin-left: 2px;"></i>
                </span>
                <el-dropdown-menu slot="dropdown">
                  <el-dropdown-item type="text" class="color-danger" @click.native="goDel(item.id)">
                    删除
                  </el-dropdown-item>
                  <el-dropdown-item type="text" @click.native="gotoDw(item.spuId)">得物
                  </el-dropdown-item>
                  <el-dropdown-item type="text" @click.native="gotoWl(item)">物流
                  </el-dropdown-item>
                  <el-dropdown-item type="text" @click.native="goDetail(item.id)">详情
                  </el-dropdown-item>
                </el-dropdown-menu>
              </el-dropdown>
            </div>
            <div v-else class="dingdans_con_right_down_2">
              <el-button
                type="text"
                style="font-weight: 600;padding-left: 118px;   margin-top: -16px;"
                @click="handleClick(item )">修改
              </el-button>
              <el-dropdown trigger="click" style="margin-left: 1px;">
                <span class="el-dropdown-link">
                  更多<i class="el-icon-arrow-down el-icon--right"
                       style="font-weight: 600; margin-left: 2px;"></i>
                </span>
                <el-dropdown-menu slot="dropdown">
                  <el-dropdown-item type="text" class="color-danger" @click.native="goDel(item.id)">
                    删除
                  </el-dropdown-item>
                  <el-dropdown-item type="text" @click.native="gotoDw(item.spuId)">得物
                  </el-dropdown-item>
                  <el-dropdown-item type="text" @click.native="gotoWl(item)">物流
                  </el-dropdown-item>
                  <el-dropdown-item type="text" @click.native="goDetail(item.id)">详情
                  </el-dropdown-item>
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
    <p v-if="allLoaded" class="to-the-bottom">{{emtityMsg}}</p>
    <mt-popup
      position="bottom"
      v-model="isShowDialog">
      <mt-header title="修改">
        <div slot="right">
          <mt-button size="normal" @click="isShowDialog = false" style="font-size: 16px">关闭
          </mt-button>
        </div>
        <div slot="left">
          <mt-button size="normal" @click="confirmHandle" style="font-size: 16px">确定</mt-button>
        </div>
      </mt-header>
      <section style="height: 148vw;width: 100vw">
        <mt-field label="货号" style="margin-top: 11vw;" v-model="orderData.actNo"
                  :disabled="true"></mt-field>
        <mt-field label="尺码" v-model="orderData.size" :disabled="true"></mt-field>
        <mt-field label="运单号" placeholder="请输入运单号" v-model="requestParam.waybillNo"></mt-field>
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
        <mt-field label="销售类型">
          <el-select size="small" class="select100" v-model="requestParam.saleType">
            <el-option label="销售类型" value=""></el-option>
            <el-option
              v-for="item in saleTypeList"
              :key="item.fieldValue"
              :label="item.fieldName"
              :value="+item.fieldValue">
            </el-option>
          </el-select>
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
          <mt-button size="normal" @click="isShowDialogWl = false" style="font-size: 16px">关闭
          </mt-button>
        </div>
      </mt-header>
      <div class="wlInfo">
        <p><span style="color: #979a9e">顺丰速运 :</span>  <span>{{requestParamWl.waybillNo}}</span>
          <el-button
          type="text"
          style="font-weight: 600;padding-left: 5px;padding-top: 0px;padding-bottom: 0px;"
          @click="copyUrl(requestParamWl.waybillNo )">复制
        </el-button>
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
    <mt-popup
      v-model="isShowDialog1">
      <mt-header title="修改地址">
        <div slot="right">
          <mt-button size="normal" @click="isShowDialog1 = false" style="font-size: 16px">关闭
          </mt-button>
        </div>
        <div slot="left">
          <mt-button size="normal" @click="updateAddress" style="font-size: 16px">确定</mt-button>
        </div>
      </mt-header>
      <section style="height: 85vw;width: 80vw">
        <mt-field label="货号" style="margin-top: 11vw;" v-model="orderData1.actNo"
                  :readonly="1==1"></mt-field>
        <mt-field label="尺码" v-model="orderData1.size" :readonly="1==1"></mt-field>
        <mt-field label="运费" placeholder="请输入运费" type="number"
                  v-model="requestParam1.freight"></mt-field>
        <mt-field label="运单号" placeholder="请输入运单号" v-model="requestParam1.waybillNo"></mt-field>
        <mt-field label="地址">
            
          <el-select size="small" class="select80" v-model="requestParam1.addressId">
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
      <mt-header title="筛选">
        <div slot="right">
          <mt-button size="normal" @click="resetHandle" style="font-size: 16px"> 重置（关闭）</mt-button>
        </div>
        <div slot="left">
          <mt-button size="normal" @click="search1" style="font-size: 16px">确定</mt-button>
        </div>
      </mt-header>
      <section style="height: 100vw;width: 100vw">
        <mt-field label="状态" style="margin-top: 12vw;">
          <el-select size="small" class="select100" v-model="queryParam.status"
                     @change="changeSystem">
            <el-option label="状态" value=""></el-option>
            <el-option
              v-for="item in statusList"
              :key="item.fieldValue"
              :label="item.fieldName"
              :value="+item.fieldValue">
            </el-option>
          </el-select>
        </mt-field>
        <mt-field label="类型">
            <el-select size="small" class="select100" v-model="queryParam.goodType" >
          <el-option :disabled="true" value="" selected>请选择类型</el-option>
          <el-option
            v-for="item in typeList"
            :key="item.fieldValue"
            :label="item.fieldName"
            :value="item.fieldValue">
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
          <el-select size="small" class="select100" v-model="queryParam.saleType"
                     @change="changeSystem1">
            <el-option label="销售类型" value=""></el-option>
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
        <mt-field label="运单号" placeholder="请输入运单号" v-model="queryParam.waybillNo"></mt-field>
        <mt-field label="订单号" placeholder="请输入订单号" v-model="queryParam.orderNo"></mt-field>
        <mt-field label="尺码" placeholder="请输入尺码" v-model="queryParam.size"></mt-field>
      </section>
    </mt-popup>
    <mt-popup
      v-model="isShowDialog3">
      <mt-header title="闪电直发">
        <div slot="right">
          <mt-button size="normal" @click="isShowDialog3 = false" style="font-size: 16px">关闭
          </mt-button>
        </div>
        <div slot="left">
          <mt-button size="normal" @click="confirmHandle3" style="font-size: 16px">确定</mt-button>
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
            
          <el-select size="small" class="select100" v-model="requestParam3.addressId">
            <el-option :disabled="true" value="" selected>请选择仓库</el-option>
            <el-option
              v-for="item in addressList"
              :key="item.fieldValue"
              :label="item.fieldName"
              :value="+item.fieldValue">
            </el-option>
              
          </el-select>
        </mt-field>
        <mt-field label="销售类型">
            
          <el-select size="small" class="select100" v-model="requestParam3.saleType">
            <el-option :disabled="true" value="" selected>请选择销售类型</el-option>
            <el-option
              v-for="item in saleTypeList"
              :key="item.fieldValue"
              :label="item.fieldName"
              :value="+item.fieldValue">
            </el-option>
              
          </el-select>
        </mt-field>
        <mt-field label="状态">
            
          <el-select size="small" class="select100" v-model="requestParam3.status">
            <el-option :disabled="true" value="" selected>请选择状态</el-option>
            <el-option
              v-for="item in statusList"
              :key="item.fieldValue"
              :label="item.fieldName"
              :value="+item.fieldValue">
            </el-option>
              
          </el-select>
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
        <img :src="imageZoom" alt="" width="100%" height="100%">
      </div>
    </div>
    <!--    <div style="-->
    <!--    bottom: 120;-->
    <!--    position: absolute;-->
    <!--    text-align: center;-->
    <!--    ">-->
    <!--      &lt;!&ndash;      <mt-button  @click="goGoodsBase"  style="margin-left: 5px;&ndash;&gt;-->
    <!--      &lt;!&ndash;    border-radius: 100%;&ndash;&gt;-->
    <!--      &lt;!&ndash;    margin-top: 0px;&ndash;&gt;-->
    <!--      &lt;!&ndash;    height: 55px;&ndash;&gt;-->
    <!--      &lt;!&ndash;    width: 55px;" type="primary">&ndash;&gt;-->
    <!--      &lt;!&ndash;        <img src="../../static/img/add.png" height="30" width="30" slot="icon">&ndash;&gt;-->
    <!--      &lt;!&ndash;      </mt-button>&ndash;&gt;-->
    <!--      <el-button v-if="checkAll" v-model="checkAll" @click="checkedAll" style="    margin-left: 115px;margin-bottom: 10px;" type="primary">反选</el-button>-->
    <!--      <el-button v-else v-model="checkAll" @click="checkedAll" style="    margin-left: 115px;margin-bottom: 10px;" type="primary">全选</el-button>-->
    <!--      <el-button  type="primary" @click="sdzf" >闪电直发</el-button>-->
    <!--      &lt;!&ndash;      <el-button  @click="$router.go(-1)" >取消</el-button>&ndash;&gt;-->
    <!--    </div>-->
    <div style="
    right: 15px;
    bottom: 20vw;
    position: fixed;
    text-align: center;
    ">
      <el-button v-if="showSd && checkAll" v-model="checkAll" @click="checkedAll">反选</el-button>
      <el-button v-if="showSd && !checkAll" v-model="checkAll" @click="checkedAll"
                 style="margin-bottom: 10px;" type="primary">全选
      </el-button>
      <el-button v-if="showSd" type="primary" style="margin-right: 17px" @click="sdzf">闪电直发
      </el-button>
      <mt-button @click="showSdClick()" :class="showSd ? 'zhihui' : ''" style="margin-left: 5px;
    border-radius: 100%;
    margin-top: 0px;
    height: 55px;
    width: 55px;" type="primary">
        <img src="../../static/img/sd1.png" height="30" width="30" slot="icon">
      </mt-button>
    </div>
    <v-footer></v-footer>
  </div>
</template>
<script>
  import Baseline from '@/common/_baseline.vue'
  import Footer from '@/common/_footer.vue'
  import {goodsOrderApi} from '@/api/goodsOrder'
  import {parseTime} from '@/utils/index'

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
        // popupVisible: false,
        titleName: '订单',
        emtityMsg: '人家是有底线的 -.-',
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
        wlData: [],
        wlDataSize: '',
        totalCount: 1
      }
    },
    activated() {
      this.showSd = false
      this.checkAll = false
      this.keyupSubmit()
      // 新开的页面
      this.isBack = false
      if (!this.$route.meta.isBack) {
        this.listSysDict()
        this.resetData()
        //isBack 时添加中router中的元信息，判读是否要缓存
        const {actNo, status, months, orderNo, saleType} = this.$route.query
        if (saleType) {
          this.saleType = saleType
          this.queryParam.saleType = saleType
          this.changeOrder()
        }
        this.queryParam.orderNo = orderNo
        this.queryParam.keyword = actNo
        if (status) {
          this.status = +status
          this.queryParam.status = +status
        }
        this.months = months
        if (this.queryParam.keyword || this.queryParam.status || this.months
          || this.queryParam.orderNo || this.queryParam.saleType) {
          if (this.queryParam.status) {
            this.changeSystem()
          }
          if (this.months) {
            this.queryParam.successTimeFrom = this.months
            this.queryParam.successTimeTo = this.months
            this.titleName = this.months + ' 订单'
          }
        }
        this.getPage()
      } else {
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
      if (to.path == "/store" || to.path == "/orderDetail" || to.path == "/WlDetail") {
        // console.info(this.isBack)
        //当离开的时候是去库存页的时候开启缓存
        from.meta.isBack = this.isBack;
        // this.curScrollTop = document.querySelector('.mint-loadmore').scrollHeight;
      } else {
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
      keyupSubmit() {
        document.onkeydown = (e) => {
          let _key = window.event.keyCode
          if (_key === 13) {
            this.getPage()
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
      successTimeChange() {
        if (this.successTime) {
          this.queryParam.successTimeFrom = this.successTime[0]
          this.queryParam.successTimeTo = this.successTime[1]
        } else {
          this.queryParam.successTimeFrom = null
          this.queryParam.successTimeTo = null
        }
      },
      changeChecked(id) {
        this.tableData.map(item => {
          if (item.id === id) {
            if (item.checked) {
              this.delItem(id)
            } else {
              if (!this.ids.includes(id)) {
                this.ids.push(id)
              }
            }
            item.checked = !item.checked
          }
        })
      },
      getPage(type) {
        goodsOrderApi.page(this.queryParam).then(res => {
          if (res.subCode === 1000) {
            this.tableData = res.data ? res.data.list : []
            this.totalCount = res.data ? res.data.pageInfo.totalCount : 0
            if (type) {
              this.tableData.map(item => {
                this.$set(item, 'checked', this.checkAll)
                if (this.checkAll) {
                  this.ids.push(item.id)
                } else {
                  this.delItem(item.id)
                }
              })
            }
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
      searchStatus(status) {
        this.queryParam.status = status
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
          pageSize: 20,
          pageNum: 1
        }
        this.titleName = '订单'
        this.createTime = ''
        this.updateTime = ''
        this.sellTime = ''
        this.successTime = ''
        if (this.saleType) {
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
      jumpactNo(actNo) {
        this.isBack = true
        this.curScrollTop = document.querySelector('.mint-loadmore').scrollHeight;
        this.$router.push({path: '/store', query: {actNo}})
      },
      goDetail(id) {
        this.isBack = true
        this.curScrollTop = document.querySelector('.mint-loadmore').scrollHeight;
        this.$router.push({path: '/orderDetail', query: {id}})
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
      gotoDw(spuId) {
        if (!spuId) {
          return
        }
        // let url = "https://www.dewu.com/router/product/ProductDetail?spuId=";
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
        this.checkAll = !this.checkAll
        this.tableData = []
        this.getPage(1)
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
        this.requestParam.addressId = this.orderData.addressId
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
  strong {
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

  .dingdans_con_right_down_2 {
    margin-left: 13.4vw;
    margin-bottom: -2vw;
    font-size: 3.5vw;
    height: 16px;
    margin-top: -17px;
  }

  .dingdans_con_right_down_2_1 {
    margin-bottom: 1vw;
    font-size: 3.5vw;
    height: 16px;
    margin-top: -9px;
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
    background-color: #EFF3F6;
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
    margin-top: 11.6vw;
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
    width: 84vw;
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
    margin-top: -17px;

  }

  .status-time-latest {
    text-align: left;
    margin-left: 25px;
    color: #333;
    font-size: 15px;
    margin-top: -17px;
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
  .searchList {
    border-bottom: 1vw solid #eee;
    height: 5vw;
    width: 100vw;
    margin-top: 40px;
    background: #fff;
    padding: 6vw;
    position: fixed;
    z-index: 99;
    font-size: 16px;
    display: -ms-flexbox;
    display: flex;
    -webkit-box-align: center;
    -ms-flex-align: center;
    align-items: center;
    color: #A4A4A4;
    -webkit-box-pack: justify;
    -ms-flex-pack: justify;
    justify-content: space-between;
    text-align: center;
    white-space: nowrap;
    overflow-x: scroll;
    overflow-y: hidden;
    > span {
      white-space: nowrap;
      display: inline-block;
      margin-right: 6vw;
    }
  }
  .searchList::-webkit-scrollbar {
    display: none;
  }
  .activity {
    font-weight: 600;
    color: #333;
    font-size: 17px;
    text-decoration:none;
    border-bottom:1.5px solid #333333; /* #555换成链接的颜色 */
    display: inline-block;
    padding-bottom:3px;  /*这里设置你要空的距离*/
  }
</style>
