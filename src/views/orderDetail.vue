<template lang="html">
  <div class="hello">
    <mt-header title="订单详情">
      <div slot="left">
        <mt-button icon="back" @click="$router.go(-1)"></mt-button>
      </div>
    </mt-header>
    <div v-if="form.status == 3"
         style="color: white;width: 100vw; height: 140px;background-color: #2b2d3c;margin-top: -3.1px;">
      <div class="zuoyouduiqi" style="color: white; padding-top: 25px;">
        <div style="margin-left: 20px;">
          <strong style="font-size: 18px;">{{ form.status | dictToDescTypeValue(37) }}</strong>
        </div>
        <div style="margin-right: 15px;">
          <strong v-if="days" style="font-size: 18px;">
            {{days}}
          </strong>
          <span v-if="days">天</span>
          <strong v-if="hours" style="font-size: 18px;">
            {{hours}}
          </strong>
          <span v-if="hours">时 </span>
          <strong   style="font-size: 18px;">
            {{minutes}}
          </strong>
          <span >分</span>
          <strong  style="font-size: 18px;">
            {{seconds}}
          </strong>
          <span  >秒</span>
        </div>
      </div>

      <div class="zuoyouduiqi" style="color: white; padding-top: 10px;">
        <div style="margin-left: 15px;width: 69vw;">
          <span style="font-size: 13px;color: #edf0f9">
            买家已付款，请在
            {{form.deliveryDeadlineTime | formateTime }}
            之前发货并上传正确的物流单号，超时将扣除保证金。
          </span>
        </div>
        <div style="margin-right: 15px;width: 28vw;    text-align: right;    margin-top: -38px;">
        <span style="font-size: 14.5px;color: #edf0f9">
          发货剩余时间
        </span>
        </div>
      </div>
    </div>
    <div v-else-if="form.status == 7"
         style="color: white;width: 100vw; background-color: #2b2d3c;margin-top: -3.1px;    padding-bottom: 20px;">
      <div class="zuoyouduiqi" style="color: white; padding-top: 25px;">
        <div style="margin-left: 20px;">
          <strong style="font-size: 17.5px;">{{ form.status | dictToDescTypeValue(37) }}</strong>
        </div>
      </div>

      <div class="secInfodata">
        <div class="zuoyouduiqi secInfo">
          <div style="width: 69vw;">
            <strong style="font-size: 17px;">
              预计收入
            </strong>
          </div>
          <div style="width: 32vw;    text-align: right;margin-right: -2vw;">
            <strong style="font-size: 14px;">
              ¥
            </strong>
            <strong style="font-size: 20px ;margin-left: -2px;">
              {{form.theirPrice}}
            </strong>
            <img style=" margin-left: -2px;   margin-top: -9px;width: 17px;" src="../../static/img/more-dw.jpg">
          </div>
        </div>
        <div class="package-status-dw" style="overflow-y:scroll;">
          <div class="status-box-dw" >
            <ul class="status-list-dw">
              <li class="">
                <div class="status-time-before-dw zuoyouduiqi">
                  <strong style="font-size: 15.5px">
                    已到账
                  </strong>
                  <span>
                     2023-07-17 11:36:41
                  </span>
                </div>
                <div class="status-content-before-dw">
                  <div style="width: 79vw;margin-left: 21px">
                    <span >收入金额已发放至您的
                      <span class="color-dw-1">
                        钱包余额
                      </span>
                      ，请前往
                      <span class="color-dw-1">
                      结算账单
                        </span>
                      查看明细
                      </span>
                  </div>
                  <div style="font-size: 12px;margin-top: 7px;margin-left: 21px;color: #848388">
                    <span>
                      展开全部
                    </span>
                    <img style="margin-top: -2px;width: 16px;" src="../../static/img/xiala.png">
                  </div>
                </div>
                <div class="status-line-dw"></div>
              </li>
              <!--              <li1 class="latest">-->
              <!--                <div-->
              <!--                  class="status-time-latest-dw zuoyouduiqi">-->
              <!--                  <strong>-->
              <!--                    已到账-->
              <!--                  </strong>-->
              <!--                  <span>-->
              <!--                    2023-07-17 11:36:41-->
              <!--                  </span>-->
              <!--                </div>-->
              <!--                <div class="status-content-latest-dw">-->
              <!--                  收入金额已发放至您的钱包余额，请前往结算账单查看明细-->
              <!--                </div>-->
              <!--                <div class="status-line"></div>-->
              <!--              </li1>-->
            </ul>
          </div>
        </div>
        <!--        <div1 class="zuoyouduiqi secInfo1">-->
        <!--          <div style="margin-left: 15px;width: 69vw;">-->
        <!--            <strong style="font-size: 17px;">-->
        <!--              预计收入-->
        <!--            </strong>-->
        <!--          </div>-->
        <!--          <div style="margin-right: 12px;width: 32vw;    text-align: right;">-->
        <!--            <strong style="font-size: 14px;">-->
        <!--              ¥-->
        <!--            </strong>-->
        <!--            <strong style="font-size: 20px ;margin-left: -2px;">-->
        <!--              {{form.theirPrice}}-->
        <!--            </strong>-->
        <!--            <img style=" margin-left: -2px;   margin-top: -9px;width: 17px;" src="../../static/img/more-dw.jpg">-->
        <!--          </div>-->
        <!--        </div1>-->
      </div>

    </div>


    <div v-else
         style="color: white;width: 100vw; background-color: #2b2d3c;margin-top: -3.1px;">
      <div style="margin-left: 20px; padding-top: 30px;">
        <strong v-if="form.status == 4 || form.status == 5" style="font-size: 18px;">待平台收货</strong>
        <strong v-else-if="form.status == 6" style="font-size: 18px;">待平台查验鉴别</strong>
        <strong v-else="form.status == 2 || form.status == 11 || form.status == 8" style="font-size: 18px;">{{ form.status | dictToDescTypeValue(37) }}</strong>
      </div>
      <div style="margin-left: 20px; padding-top: 5px;padding-bottom: 25px;">
        <span v-if="form.status == 4 || form.status == 5 " style="font-size: 13px;color: #edf0f9">平台将在收到您的商品后进行鉴别。</span>
        <span v-if="form.status == 2 || form.status == 11 " style="font-size: 13px;color: #edf0f9">商品已上架,等待买家购买。</span>
        <span v-if="form.status == 6" style="font-size: 13px;color: #edf0f9">鉴别师正在鉴别，请耐心等待。</span>
        <span v-if="form.status == 8" style="font-size: 13px;color: #edf0f9">未通过平台鉴别，请尽快处理。</span>
      </div>
    </div>

    <div v-if="form.status == 4 || form.status ==  5 || form.status == 6 || form.status == 7"
         style="color: #333333;width: 100vw; height: 40px;background-color: white;">
      <div class="zuoyouduiqi" style="padding-top: 25px;">
        <div style="margin-left: 10px;">
          <img style="width: 28px;margin-top: -5px;"
               src="../../static/img/ysz.png">
          <strong v-if="form.status == 7" style="font-size: 15px;">查验鉴别通过</strong>
          <strong v-else style="font-size: 15px; ">{{ form.status | dictToDescTypeValue(37) }}</strong>
        </div>
        <div v-if="requestParamWl.waybillNo" style="margin-right: 15px;" @click="gotoWl">
          <span style="font-size: 15px; color: #5f6772" >查看物流</span>
          <img style="    margin-top: -6px;
    width: 18px;" src="../../static/img/more-dw.jpg">
        </div>
      </div>
    </div>
    <div  v-if="form.status == 4 || form.status == 5 || form.status == 6 || form.status == 7"
          style="color: #808082;width: 100vw; background-color: white;">
      <div class="zuoyouduiqi" style="padding-top: 17px;
          margin-bottom: 7px;
    padding-right: 19px;
    padding-bottom: 13px;
    padding-left: 25px;
    background-color: white;">
        <div style="margin-left: 17px;width: 71vw;">
          <span style="font-size: 15px; margin-left: -3px;">
            {{wldataLastDate | formateTime }}
          </span>
        </div>
      </div>
    </div>

    <div v-if="form.addressId"
         style="color: #333333;width: 100vw; height: 40px;background-color: white;">
      <div class="zuoyouduiqi" style="padding-top: 25px;">
        <div style="margin-left: 10px;">
          <img style="width: 28px;margin-top: -5px;"
               src="../../static/img/shouhuodizhi.png">
          <strong style="font-size: 15px; margin-left: -1px;">收货人：得物App白冰冰</strong>
        </div>
        <div style="margin-right: 15px;">
          <strong style="font-size: 16px;" >021-80392283</strong>
        </div>
      </div>
    </div>

    <div v-if="form.addressId"
         style="color: #808082;width: 100vw; background-color: white;margin-bottom: 7px;">
      <div class="zuoyouduiqi" style="padding-top: 15px;
    padding-right: 19px;
    padding-bottom: 13px;
    padding-left: 25px;
    background-color: white;">
        <div style="margin-left: 10px;width: 71vw;">
          <span style="font-size: 14px; margin-left: -3px;">
            {{form.addressId | dictToDescTypeValue(51)}}
          </span>
        </div>
        <div style="
    text-align: right;
    margin-top: -19px;">
          <button class="dw-button-common-a2"  @click="copyUrl(requestParamWl.waybillNo)" style="    padding: 1px 5px;">复制</button>
        </div>
      </div>
    </div>

    <div class="dingdans_item_dw" style="
    border-bottom: 0px;
">
      <div class="dingdans_con_dw">
        <div :src="form.img" class="dingdans_con_left_dw"
             @click="avatarShow(form.img)">
          <img :src="form.img" >
          <p class="mark_dw">
              <span class="text_dw">
                {{ form.saleType | dictToDescTypeValue(46) }}
              </span>
          </p>
        </div>
        <div class="diangdans_con_right_dw" style="padding-right: 3%;
    padding-left: 3%;">
          <div class="dingdans_con_right_top_dw" @click="goodsDetail(item.goodsId, 1) ">
              <span>
                {{form.goodsName}}
              </span>
          </div>
          <div class="dingdans_con_right_top_dw_1">
              <span @click="jumpactNo(form.actNo)">
              {{form.actNo}}
              </span>
            <img @click="copyUrl(form.actNo)" style="width: 20px;margin-bottom: 8px;"
                 src="../../static/img/copy6.png">
          </div>
          <div v-if="form.surplusDay && form.saleType ==2 " style="margin-bottom: 5px;">
            <span v-if="form.surplusDay >12">剩余天数</span>
            <span v-if="form.surplusDay >=0 && form.surplusDay <=12" class="color-danger">剩余天数</span>
            <span v-if="form.surplusDay < 0" class="color-danger">到期天数</span>
            <span v-if="form.surplusDay >12">
                {{form.surplusDay}}
              </span>
            <strong  v-if="form.surplusDay >=0 && form.surplusDay <=12"  class="color-danger">
              {{form.surplusDay}}
            </strong>
            <strong  v-if="form.surplusDay < 0"  class="color-danger">
              {{ 0 - form.surplusDay}}
            </strong>
          </div>
          <div class="dingdans_con_right_top_dw_2">
            <div>
                 <span>
                {{form.size}}
              </span>
            </div>
            <div>
            <span style="margin-left: 3px;color: #333333;font-size: 15px">
                   <span style="font-size: 13px">¥</span>
              <strong>{{form.shelvesPrice}}</strong>
                </span>
            </div>
          </div>
        </div>
      </div>

      <div class="dingdans_bottom_dw">
        <div v-if="[2,11].includes(form.status)" class="dingdans_top_left_dw">
          <span v-if="form.thisTimePrice">最低售价</span>
          <span v-if="form.thisTimePrice">{{form.thisTimePrice }} ,</span>
          <span v-if="form.thisTimeProfits" style="margin-left: 3px">预估利润</span>
          <span v-if="form.thisTimeProfits">{{form.thisTimeProfits }}</span>
        </div>
        <div v-else class="dingdans_top_left_dw">
          <span >利润</span>
          <span class="color-danger">{{form.profits }}</span>
        </div>
        <!--          操作栏-->
        <div class="dingdans_top_right_dw">
          <span v-if="form.theirPrice && ![2,11].includes(form.status)">预计收入</span>
          <strong v-if="form.theirPrice && ![2,11].includes(form.status)"   style="color: #333333">
            ¥
          </strong>
          <strong  v-if="form.theirPrice && ![2,11].includes(form.status)" style="font-size: 17px ;margin-left: -2px;color: #333333">
            {{form.theirPrice}}
          </strong>
        </div>
      </div>
    </div>
    <div
      style="color: #808082;width: 100vw; background-color: white;margin-top: 7px;font-size: 14px; ">
      <div  style="padding-top: 15px;
    padding-right: 19px;padding-bottom: 10px;
    padding-left: 20px;color: #333333;">
        <div style="">
          <strong>
            订单费用
          </strong>
        </div>
      </div>
      <div class="zuoyouduiqi orderInfoleft">
        <div style="width: 30vw;">
          <span>入库价：</span>
        </div>
        <div style="text-align: left; ">
          <span>¥</span>
          <span>{{form.price}}</span>
        </div>
      </div>
      <!--      <div class="zuoyouduiqi orderInfoleft">-->
      <!--        <div style="width: 30vw;">-->
      <!--          <span>出售价：</span>-->
      <!--        </div>-->
      <!--        <div style="text-align: left; ">-->
      <!--          <span>{{form.shelvesPrice}}</span>-->
      <!--        </div>-->
      <!--      </div>-->
      <div class="zuoyouduiqi orderInfoleft">
        <div style="width: 30vw;">
          <span>补贴价：</span>
        </div>
        <div style="text-align: left; ">
          <span>¥</span>
          <span>{{form.subsidiesPrice}}</span>
        </div>
      </div>
      <div class="zuoyouduiqi orderInfoleft">
        <div style="width: 30vw;">
          <span>手续费：</span>
        </div>
        <div style="text-align: left; ">
          <span>¥</span>
          <span>{{form.poundage}}</span>
        </div>
      </div>
      <div class="zuoyouduiqi orderInfoleft">
        <div style="width: 30vw;">
          <span>运费：</span>
        </div>
        <div style="text-align: left; ">
          <span>¥</span>
          <span>{{form.freight}}</span>
        </div>
      </div>
      <div class="zuoyouduiqi orderInfoleft">
        <div style="width: 30vw;">
          <span></span>
        </div>
        <div style="text-align: left; ">
        </div>
      </div>
    </div>
    <!--订单信息-->
    <div
      style="color: #808082;width: 100vw; background-color: white;margin-top: 7px;font-size: 14px; ">
      <div  style="padding-top: 15px;
    padding-right: 19px;padding-bottom: 10px;
    padding-left: 20px;color: #333333;">
        <div style="">
          <strong>
            订单信息
          </strong>
        </div>
      </div>
      <div class="zuoyouduiqi orderInfoleft">
        <div style="width: 30vw;">
          <span>订单编号：</span>
        </div>
        <div style="text-align: right; ">
          <span>{{form.orderNo}}</span>
          <button class="dw-button-common-a2"  @click="copyUrl(form.orderNo )" style=" margin-left: 3px;   padding: 1px 5px;">复制</button>
        </div>
      </div>
      <div   v-if="form.waybillNo" class="zuoyouduiqi orderInfoleft">
        <div style="width: 30vw;">
          <span>物流单号：</span>
        </div>
        <div style="text-align: right; ">
          <span>{{form.waybillNo}}</span>
          <button class="dw-button-common-a2"  @click="copyUrl(form.waybillNo )" style=" margin-left: 3px;   padding: 1px 5px;">复制</button>
        </div>
      </div>
      <div class="zuoyouduiqi orderInfoleft">
        <div style="width: 30vw;">
          <span>创建时间：</span>
        </div>
        <div style="text-align: right; ">
          <span>{{form.createTime | formateTime }}</span>
        </div>
      </div>
      <div v-if="form.sellTime" class="zuoyouduiqi orderInfoleft">
        <div style="width: 30vw;">
          <span>付款时间：</span>
        </div>
        <div style="text-align: right; ">
          <span>{{form.sellTime | formateTime }}</span>
        </div>
      </div>
      <div v-if="form.deliveryDeadlineTime" class="zuoyouduiqi orderInfoleft">
        <div style="width: 30vw;">
          <span>发货截止时间：</span>
        </div>
        <div style="text-align: right; ">
          <span>{{form.deliveryDeadlineTime | formateTime }}</span>
        </div>
      </div>
      <div v-if="form.successTime" class="zuoyouduiqi orderInfoleft">
        <div style="width: 30vw;">
          <span>交易成功时间：</span>
        </div>
        <div style="text-align: right; ">
          <span>{{form.successTime | formateTime }}</span>
        </div>
      </div>

      <div v-if="form.inStoreTime" class="zuoyouduiqi orderInfoleft">
        <div style="width: 30vw;">
          <span>入仓时间：</span>
        </div>
        <div style="text-align: right; ">
          <span>{{form.inStoreTime | formateTime }}</span>
        </div>
      </div>

      <div v-if="form.inStoreTimeEnd" class="zuoyouduiqi orderInfoleft">
        <div style="width: 30vw;">
          <span>仓储免费时间：</span>
        </div>
        <div style="text-align: right; ">
          <span>{{form.inStoreTimeEnd | formateTime }}</span>
        </div>
      </div>

      <div v-if="form.inStoreFreeDay" class="zuoyouduiqi orderInfoleft">
        <div style="width: 30vw;">
          <span>免费天数：</span>
        </div>
        <div style="text-align: right; ">
          <span>{{form.inStoreFreeDay}}</span>
        </div>
      </div>
      <div class="zuoyouduiqi orderInfoleft">
        <div style="width: 30vw;">
          <span></span>
        </div>
        <div style="text-align: left; ">
        </div>
      </div>
      <!--      <div v-if="form.status == 11" class="zuoyouduiqi orderInfoleft">-->
      <!--        <div style="width: 30vw;">-->
      <!--          <span>剩余天数：</span>-->
      <!--        </div>-->
      <!--        <div style="text-align: right; ">-->
      <!--          <span>{{form.surplusDay}}</span>-->
      <!--        </div>-->
      <!--      </div>-->

    </div>

    <div class="popContainer" v-if="pictureZoomShow" @click="pictureZoomShow = false">
      <div class="imageShow">
        <img :src="imageZoom" alt="" class="showImg">
      </div>
    </div>

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
          <!--          <el-button-->
          <!--            type="text"-->
          <!--            style="font-weight: 600;padding-left: 5px;padding-top: 0px;padding-bottom: 0px;"-->
          <!--            @click="copyUrl(requestParamWl.waybillNo )">复制-->
          <!--          </el-button>-->
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
  </div>
</template>

<script>
  import {goodsOrderApi} from '@/api/goodsOrder'
  import {parseTime} from '@/utils' // import detail from '@/http/mock.js' //模拟数据
  export default {
    components: {
    },
    data() {
      return {
        form: {},
        days: 0,
        hours: 0,
        minutes: 0,
        seconds: 0,
        imageZoom: '',
        isShowDialogWl: false,
        requestParamWl: {
          receiverAddress: '',
          addressId: '',
          waybillNo: '',
          freight: '',
        },
        wlData: [],
        wlDataSize: '',
        wldataLastDate: '',
        pictureZoomShow: false,
        fileUrl: fileUrl,
        dataStatusList: [],
        statusList: [],
        addressList: [],
        saleTypeList: [],
        type: '',
        id: '',
      }
    },
    created() {
      const {id} = this.$route.query
      // this.form = id
      if (id) {
        this.getDetailById(id)
      }
    },
    mounted() {
      this.listSysDict()
    },
    methods: {
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
        this.$router.push({path: '/store', query: {actNo}})
      },
      goodsDetail(id, type) {
        this.$router.push({ path: '/goodsDetail', query: { id, type } })
      },
      countdown(deliveryDeadlineTime) {
        let endTime = new Date(deliveryDeadlineTime).getTime();
        let startTime = new Date().getTime();
        let totalSeconds = endTime - startTime;
        let interval = setInterval(() => {
          if (totalSeconds > 0) {
            this.days = Math.floor(totalSeconds / (24 * 60 * 60 * 1000));
            this.hours = Math.floor(
              (totalSeconds - this.days * 24 * 60 * 60 * 1000) / (60 * 60 * 1000)
            );
            this.minutes = Math.floor(
              (totalSeconds -
                this.days * 24 * 60 * 60 * 1000 -
                this.hours * 60 * 60 * 1000) /
              (60 * 1000)
            );
            this.seconds = Math.floor(
              (totalSeconds -
                this.days * 24 * 60 * 60 * 1000 -
                this.hours * 60 * 60 * 1000 -
                this.minutes * 60 * 1000) /
              1000
            );
            totalSeconds -= 1000;
          } else {
            clearInterval(interval);
          }
        }, 1000);
      },
      avatarShow(e) {
        this.imageZoom = e
        this.pictureZoomShow = true
      },
      getDetailById(id) {
        if (id) {
          goodsOrderApi.getDetailById(id).then(res => {
            if (res.subCode === 1000) {
              this.form = res.data ? res.data : {}
              if (this.form.deliveryDeadlineTime) {
                this.countdown(parseTime(this.form.deliveryDeadlineTime))
              }
              if (this.form.profits && this.form.price) {
                // 利润比
                let profitsThan = (this.form.profits / this.form.price) * 100
                this.form.profitsThan = parseFloat(profitsThan).toFixed(2)
                this.form.profitsThan = this.form.profitsThan + '%'
              } else {
                this.form.profitsThan = ''
              }
              if (this.form.theirPrice && this.form.price) {
                // 预估利润
                let forecastProfits = this.form.theirPrice - this.form.price - 10
                this.form.forecastProfits = parseFloat(forecastProfits).toFixed(2)
              } else {
                this.form.forecastProfits = ''
              }
              this.form.deliveryDeadlineTime = this.form.deliveryDeadlineTime ? parseTime(
                this.form.deliveryDeadlineTime) : ''
              this.form.inStoreTimeEnd = this.form.inStoreTimeEnd ? parseTime(
                this.form.inStoreTimeEnd) : ''
              this.form.inStoreTime = this.form.inStoreTime ? parseTime(this.form.inStoreTime) : ''
              this.form.sellTime = this.form.sellTime ? parseTime(this.form.sellTime) : ''
              this.form.successTime = this.form.successTime ? parseTime(this.form.successTime) : ''
              this.form.createTime = this.form.createTime ? parseTime(this.form.createTime) : ''
              this.form.updateTime = this.form.updateTime ? parseTime(this.form.updateTime) : ''
              this.getWl()
            } else {
              this.$toast(res.subMsg)
            }
          })
        }
      },
      getWl() {
        if (!this.form.addressId || !this.form.waybillNo) {
          // this.$toast('没有物流单号')
          return
        }
        this.requestParamWl.addressId = this.form.addressId
        this.requestParamWl.waybillNo = this.form.waybillNo
        goodsOrderApi.waybillNoList(this.requestParamWl).then(res => {
          if (res.subCode === 1000) {
            if (res.data.list.length) {
              this.wlDataSize = res.data.list.length
              this.requestParamWl.receiverAddress = res.data.receiverAddress
              this.requestParamWl.freight = res.data.realAmount
              this.wlData = []
              for (let i = 0; i < res.data.list.length; i++) {
                let dataInfo = res.data.list[i]
                if (i == 0 && dataInfo && dataInfo.date){
                  this.wldataLastDate = dataInfo.date
                }
                let status = '运输中'
                if (dataInfo.message.indexOf("已收取快件") >= 0) {
                  status = '已揽件'
                } else if (dataInfo.message.indexOf("可查看签收人信息") >= 0) {
                  status = '已签收'
                }
                dataInfo.status = status
                this.wlData.push(dataInfo)
              }
              // let wldataLast = res.data.list[0]
              // if (wldataLast && wldataLast.date) {
              //   this.wldataLastDate = wldataLast.date
              // }
              // } else {
              //   this.$toast("暂无物流信息，请核对物流单号")
            }
          } else {
            this.$toast(res.subMsg)
          }
        })
      },
      gotoWl() {
        // if (!this.form.addressId || !this.form.waybillNo) {
        //   this.$toast('没有物流单号')
        //   return
        // }
        this.isShowDialogWl = true
        //
        // this.requestParamWl.addressId = this.form.addressId
        // this.requestParamWl.waybillNo = this.form.waybillNo
        // goodsOrderApi.waybillNoList(this.requestParamWl).then(res => {
        //   if (res.subCode === 1000) {
        //     if (res.data.list.length) {
        //       this.wlDataSize = res.data.list.length
        //       this.requestParamWl.receiverAddress = res.data.receiverAddress
        //       this.requestParamWl.freight = res.data.realAmount
        //       this.wlData = []
        //       for (let i = 0; i < res.data.list.length; i++) {
        //         let dataInfo = res.data.list[i]
        //         let status = '运输中'
        //         if (dataInfo.message.indexOf("已收取快件") >= 0) {
        //           status = '已揽件'
        //         } else if (dataInfo.message.indexOf("可查看签收人信息") >= 0) {
        //           status = '已签收'
        //         }
        //         dataInfo.status = status
        //         this.wlData.push(dataInfo)
        //       }
        //       this.isShowDialogWl = true
        //     } else {
        //       this.$toast("暂无物流信息，请核对物流单号")
        //     }
        //   } else {
        //     this.$toast(res.subMsg)
        //   }
        // })
      },
      gotoIndex() {
        this.$router.push({path: '/'})
      },
      goBack() {
        this.$router.push({path: '/otherList'})
      },
      listSysDict() {
        let sysDictList = localStorage.getItem('sysDictList') ? JSON.parse(
          localStorage.getItem('sysDictList')) : []
        this.addressList = sysDictList.filter(item => item.typeValue == 38)
        this.dataStatusList = sysDictList.filter(item => item.typeValue == 36)
        this.statusList = sysDictList.filter(item => item.typeValue == 37)
        this.saleTypeList = sysDictList.filter(item => item.typeValue == 46)
      },
    }
  }
</script>

<style>
  @import '../assets/index/style.css';
  /*@import '../assets/fz.less';*/
  /** {*/
  /*  !*margin: 0;*!*/
  /*  !*padding: 0;*!*/
  /*  box-sizing: border-box;*/
  /*}*/
  /*!* 这里直接设置 1rem = 50px begin *!*/
  /*html {*/
  /*  font-size: 10px;*/
  /*}*/
  /*!* 这里直接设置 1rem = 50px end *!*/
  /*html,*/
  /*body {*/
  /*  !*font-family: "微软雅黑";*!*/
  /*  !*color: #333;*!*/
  /*  !*background: #fff;*!*/
  /*}*/
  /** {*/
  /*  margin: 0;*/
  /*  padding: 0;*/
  /*  box-sizing: border-box;*/
  /*}*/

  /*!* 这里直接设置 1rem = 50px begin *!*/
  /*html {*/
  /*  font-size: 50px;*/
  /*}*/

  /*!* 这里直接设置 1rem = 50px end *!*/
  /*html,*/
  /*body {*/
  /*  !*font-family: "微软雅黑";*!*/
  /*  !*color: #333;*!*/
  /*  !*background: #fff;*!*/
  /*}*/

  /*!*ul,*!*/
  /*!*li {*!*/
  /*!*  list-style: none;*!*/
  /*!*}*!*/
  /*!* 给要上拉的容器设置 begin *!*/
  /*.hello {*/
  /*  background-color: #f3f2f8;*/
  /*  padding-top: 12vw;*/
  /*  font-size: 13px;*/
  /*  height: 100vh;*/
  /*  overflow-y: auto;*/
  /*}*/

  /*strong {*/
  /*  font-weight: 600;*/
  /*}*/

  /*.detail {*/
  /*  width: 100%;*/
  /*  padding-bottom: 14vw;*/
  /*}*/

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

  .ui-flex {
    display: -webkit-box !important;
    display: -webkit-flex !important;
    display: -ms-flexbox !important;
    display: flex !important;
    -webkit-flex-wrap: wrap;
    -ms-flex-wrap: wrap;
    flex-wrap: wrap
  }

  .ui-flex, .ui-flex *, .ui-flex :after, .ui-flex :before {
    box-sizing: border-box
  }

  .ui-flex.justify-center {
    -webkit-box-pack: center;
    -webkit-justify-content: center;
    -ms-flex-pack: center;
    justify-content: center
  }

  .ui-flex.center {
    -webkit-box-pack: center;
    -webkit-justify-content: center;
    -ms-flex-pack: center;
    justify-content: center;
    -webkit-box-align: center;
    -webkit-align-items: center;
    -ms-flex-align: center;
    align-items: center
  }

  .my-pay-3 {
    border-radius: 10px;
    margin-top: 15px;
    width: 92%;
    margin-left: 4%;
    background-color: #fff;
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
    margin-top: 10vw !important;
    text-align: left;
    margin-left: 40px !important;
    padding: 3vw !important;
    color: rgb(51, 51, 51);
    font-size: 4.2vw;
  }
  .orderInfoleft {
    padding-top: 5px;
    padding-bottom: 5px;
    padding-right: 19px;
    padding-left: 20px;
  }
  .secInfo{
    margin-top: 24px;
    padding-top: 14px;
    padding-bottom: 14px;
    width: 86vw;
    margin-left: 4vw;
    border-bottom: 1px solid #f0f0f0;
  }
  .secInfo1{
    padding-top: 14px;
    padding-bottom: 14px;
    border-bottom: 1px solid #ccc;
  }
  .secInfodata{
    margin-left: 3vw;
    border-radius: 5px;
    color: rgb(51, 51, 51);
    background-color: rgb(255, 255, 255);
    width: 94vw;
  }


  .package-status-dw {
    color: #2c2a34;
    margin-left: 15px;
    padding: 18px 0 0 0
  }

  .package-status-dw .status-list-dw {
    margin: 0;
    padding: 0;
    margin-top: -5px;
    padding-left: 9px;
    list-style: none;
  }

  .package-status-dw .status-list-dw li {
    /*border-left: 1px solid #f1f1f1;*/
    width: 84vw;
    text-align: left;
  }

  .package-status-dw .status-list-dw li:before { /* 流程点的样式 */
    content: '';
    border: 4px solid #1ba5ad;
    background-color: #ffffff;
    display: inline-block;
    width: 8px;
    height: 8px;
    border-radius: 10px;
    margin-left: -9px;
    margin-right: 10px;
  }

  .package-status-dw .status-list-dw .latest:before {
    background-color: #333;
    border-color: #333;
  }

  .package-status-dw .status-box-dw {
    overflow: hidden
  }

  .package-status-dw .status-list-dw li {
    height: auto;
  }

  .package-status-dw .status-list-dw {
    margin-top: -8px
  }

  .package-status-dw .status-box-dw {
    position: relative
  }

  .package-status-dw .status-box-dw:before {
    content: " ";
    background-color: #f3f3f3;
    display: block;
    position: absolute;
    top: -8px;
    left: 20px;
    width: 10px;
    height: 4px
  }

  .package-status-dw .status-list-dw {
    margin-top: 0px;
  }

  /* .package-status .status-list .latest{border:none} */
  /* .package-status .status-list li{margin-bottom:-2px} */


  .status-list-dw li:not(:first-child) {
    padding-top: 10px;
  }

  .status-content-before-dw {
    text-align: left;
    margin-right: 20px;
    margin-left: -1px;
    margin-top: 5px;
    font-size: 12.5px;
    border-left: 1px solid #f1f1f1;
  }

  .status-content-latest-dw {
    text-align: left;
    margin-right: 20px;
    margin-left: 21px;
    color: #333;
    /*margin-top: -20px;*/
  }

  .status-time-before-dw {
    text-align: left;
    margin-left: 21px;
    font-size: 15px;
    margin-top: -20px;

  }

  .status-time-latest-dw {
    text-align: left;
    margin-left: 25px;
    color: #333;
    font-size: 15px;
    margin-top: -20px;
  }

  .status-line-dw {
    padding-top: 15px;
  }
  .color-dw-1 {
    margin-left: -3px;
    font-weight: 600;
    color: #1ba5ad;
    /*color: #1fa7af;*/
    margin-right: -3px;
  }
</style>
