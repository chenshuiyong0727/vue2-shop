<template>
  <div class="hello">
    <mt-header :title="titleName">
      <div slot="left">
        <mt-button icon="back" @click="$router.go(-1)"></mt-button>
      </div>
    </mt-header>
<!--    <div class="fenlei_top zuoyouduiqi">-->
<!--      <div class="fenlei_top_left">-->
<!--        <el-date-picker style="width: 44vw ;background-color: white"-->
<!--                        popper-class="popperClass1"-->
<!--                        v-model="queryParam.createTimeFrom" value-format="yyyy-MM"-->
<!--                        type="month" placeholder="时间开始" @change="getPage">-->
<!--        </el-date-picker>-->
<!--      </div>-->
<!--      <div style="margin-right: 6px;margin-left: 6px;">-->
<!--        <span>至</span>-->
<!--      </div>-->
<!--      <div class="fenlei_top_left">-->
<!--        <el-date-picker style="width: 44vw"-->
<!--                        v-model="queryParam.createTimeTo" value-format="yyyy-MM"-->
<!--                        type="month" placeholder="时间结束" @change="getPage">-->
<!--        </el-date-picker>-->
<!--      </div>-->
<!--    </div>-->
    <div class="fenlei_top zuoyouduiqi">
      <div class="fenlei_top_left">
        <div  @click="chosseTime(1)">
          <el-date-picker style="width: 44vw" readonly="readonly"
                          v-model="queryParam.createTimeFrom"
                          value-format="yyyy-MM-dd" type="date"
                          placeholder="开始时间"></el-date-picker>
        </div>
      </div>
      <div style="margin-right: 6px;margin-left: 6px;">
        <span>至</span>
      </div>
      <div class="fenlei_top_left">
        <div  @click="chosseTime(2)">
          <el-date-picker style="width: 44vw" readonly="readonly"
                          v-model="queryParam.createTimeTo"
                          value-format="yyyy-MM-dd" type="date"
                          placeholder="结束时间"></el-date-picker>
        </div>
      </div>
    </div>
    <mt-datetime-picker
      v-model="pickerValue"
      type="date"
      ref="picker"
      :startDate="new Date(2022, 3, 1 )"
      year-format="{value} 年"
      month-format="{value} 月"
      date-format="{value} 日"
      @confirm="handleConfirm">
    </mt-datetime-picker>
    <div style="padding-top: 70px">
      <div class="dingdans_item" v-for="(item,index) in tableData" :key="index">
        <div v-if="item.actNo == '合计'"  style="    height: 50px;
    padding-top: 20px;">
          <div class="dingdans_top" >
            <div class="dingdans_top_left" style="    padding-left: 5px;
    font-size: 15px;">
             <p>
               <span>合计入库 ：</span> <strong>{{item.oldInventory}}</strong>
<!--               <span  style="margin-left: 20px">合计入库金额 ：</span> <strong>{{item.inventoryAmount}}</strong>-->
             </p>
              <p style="margin-top: 5px">
                <span>合计入库金额 ：</span> <strong>{{item.inventoryAmount}}</strong>
<!--                <mt-button style="margin-left: 40px;"-->
<!--                  type="primary"-->
<!--                  size="small"-->
<!--                  @click="getPage"> 搜索-->
<!--                </mt-button>-->
                <el-link
                  style="margin-left: 40px;"
                  type="primary"
                  size="small"
                  @click="jumpDetail(months )">查看库存
                </el-link>
              </p>
            </div>
<!--            <div class="dingdans_top_right">-->
<!--              尺码：<strong class="color-danger">{{item.size }}</strong>-->
<!--            </div>-->
          </div>
        </div>
        <div v-else>

          <div class="dingdans_con_dw">
            <div class="dingdans_con_left_dw"
                 @click="avatarShow(item.img)">
              <img :src="item.img" >
<!--              <p class="mark_dw">-->
<!--              <span class="text_dw">-->
<!--                {{ item.type | dictToDescTypeValue(20221108) }}-->
<!--              </span>-->
<!--              </p>-->
            </div>
            <div class="diangdans_con_right_dw">
              <div class="dingdans_con_right_top_dw" @click="goodsDetail(item.goodsId, 1,item.spuId)">
              <span>
                {{item.goodsName | sizeFilterNum(40) }}
              </span>
              </div>
              <div class="dingdans_con_right_top_dw_1 zuoyouduiqi" style="font-weight: 400;">
                <div>
                  入库价
                  <span  class="color-danger" >{{item.price}} </span>
                  入库总额
                  <span  class="color-danger" >{{item.inventoryAmount}} </span>
                  得物价
                  <span  class="color-danger" >{{item.dwPrice}} </span>
                </div>
              </div>

              <div class="dingdans_con_right_top_dw_1 zuoyouduiqi">
                <div>
                   <span @click="WarehouseDetail(item.goodsId ,item.actNo ,item.imgUrl,item.img )">
              {{item.actNo}}
              </span>
                  <img @click="copyUrl(item.actNo)" style="width: 20px;margin-bottom: 8px;"
                       src="../../../static/img/copy6.png">
                </div>
                <div>
                  <span style="font-weight: 400">尺码</span>
                  <span >{{item.size}} </span>
                </div>
              </div>
              <div class="dingdans_con_right_top_dw_1 zuoyouduiqi" style="font-weight: 400;margin-top: -5px;">
                <div>
                  库存
                  <span  class="color-danger" >{{item.inventory}} </span>
                  <span style="text-decoration:line-through;color: #7a7a7a;" >{{item.oldInventory }} </span>
                </div>
                <div>
                  交易成功
                  <span>{{item.successCount}} </span>
                  ，上架
                  <span  >{{item.galleryCount }} </span>
                </div>
              </div>
            </div>
          </div>
          <div class="dingdans_bottom_dw">
            <div class="dingdans_top_left_dw">
              预计利润
              <span  class="color-danger" >{{(item.dwPrice - (item.dwPrice * 0.075 + 38 + 8.5) - item.price - 10) | numFilter}}</span>
            </div>
            <!--          操作栏-->
            <div class="dingdans_top_right_dw">
              <span> {{item.createTime |formateTime }}</span>
            </div>
          </div>
<!--          <div1 class="dingdans_top">-->
<!--            <div class="dingdans_top_left">-->
<!--              货号：<strong @click="WarehouseDetail(item.goodsId ,item.actNo ,item.imgUrl,item.img )" style="color: #409EFF"> {{item.actNo}} </strong>-->
<!--            </div>-->
<!--            <div class="dingdans_top_right">-->
<!--              尺码：<strong class="color-danger">{{item.size }}</strong>-->
<!--            </div>-->
<!--          </div1>-->
<!--          <div1 class="dingdans_con">-->
<!--            <div v-if="item.img" :src="item.img" class="dingdans_con_left" @click="avatarShow(item.img)">-->
<!--            <img :src="item.img">-->
<!--          </div>-->
<!--          <div v-if="!item.img && item.imgUrl" :src="item.img" class="dingdans_con_left" @click="avatarShow(fileUrl+ item.imgUrl)">-->
<!--            <img :src="fileUrl + item.imgUrl">-->
<!--          </div>-->
<!--            <div class="diangdans_con_right">-->
<!--              <div class="dingdans_con_right_top">-->
<!--                原库存：<strong>{{item.oldInventory}} </strong> 库存：<strong>{{item.inventory}}</strong> 交易成功：<strong>{{item.successCount}}</strong> 上架：<strong>{{item.galleryCount}}</strong>-->
<!--              </div>-->
<!--              <div class="dingdans_con_right_down">-->
<!--                入库价：<strong>{{item.price}}</strong>-->
<!--                入库总额：<strong>{{item.inventoryAmount}}</strong>-->
<!--                入库价：<strong>{{item.dwPrice}}</strong>-->
<!--              </div>-->
<!--              <div style="-->
<!--            margin-bottom: -7vw;-->
<!--    font-size: 3.5vw;-->
<!--    margin-top: -1vw;">-->
<!--                <span >预计利润：<strong class="color-danger">{{(item.dwPrice - (item.dwPrice * 0.075 + 38 + 8.5) - item.price - 10) | numFilter}}</strong></span>-->
<!--                <strong> {{item.createTime |formateTime }}</strong>-->
<!--              </div>-->
<!--            </div>-->
<!--          </div1>-->
        </div>
      </div>
    </div>
    <div class="popContainer" v-if="pictureZoomShow" @click="pictureZoomShow = false">
      <div class="imageShow">
        <img :src="imageZoom" alt="" class="showImg">
      </div>
    </div>
    <div v-if="!tableData.length" class="to-the-bottom-1" >
      <p>
        <img src="../../../static/img/new/empity_7.png" style="width: 60vw;">
      </p>
      <p>
        <span>暂无相关数据</span>
      </p>
    </div>
<!--    <p style="padding: 0.5rem 0;" class="to-the-bottom">{{emtityMsg}}</p>-->
  </div>
</template>
<script>
  import Baseline from '@/common/_baseline.vue'
  import Footer from '@/common/_footer.vue'
  import {reportApi} from '@/api/report'


  export default {
    components: {
      'v-baseline': Baseline,
      'v-footer': Footer
    },
    name: "HelloWorld",
    data() {
      return {
        pickerValue:new Date(),
        pickerValueType: '',
        pictureZoomShow: false,
        imageZoom: '',
        fileUrl: fileUrl,
        months: '',
        titleName: '入库报表',
        emtityMsg: '没有更多了',
        queryParam: {
          createTimeFrom: '',
          createTimeTo: ''
        },
        tableData: [],
      }
    },
    mounted() {

    },
    created() {
      const { months } = this.$route.query
      this.months = months
      if (this.months) {
        this.titleName = this.months + ' ' + this.titleName
        this.queryParam.createTimeFrom = this.months
        this.queryParam.createTimeTo = this.months
        this.getPage()
      }

    },
    methods: {
      chosseTime(pickerValueType) {
        this.pickerValueType = pickerValueType
        this.$refs.picker.open();
      },
      handleConfirm(val) {
        let year = new Date(val).getFullYear()
        let month = new Date(val).getMonth() + 1
        if (month < 10 ){
          month = '0' + month
        }
        let day = new Date(val).getDate()
        if (day < 10 ){
          day = '0' + day
        }
        let res = year + '-' +month + '-' + day
        if(this.pickerValueType == 1) {
          this.queryParam.createTimeFrom = res
        }else {
          this.queryParam.createTimeTo = res
        }
        this.getPage()
      },
      keyupSubmit() {
        document.onkeydown = (e) => {
          let _key = window.event.keyCode
          if (_key === 13) {
            this.getPage()
          }
        }
      },
      avatarShow(e) {
        this.imageZoom = e
        this.pictureZoomShow = true
      },
      WarehouseDetail(goodsId , actNo,imgUrl,img) {
        this.$router.push({ path: '/WarehouseDetail', query: {goodsId, actNo ,imgUrl,img} })
      },
      goodsDetail(id, flag,spuId) {
        this.$router.push({ path: '/goodsDetail', query: { id, flag } })
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
      jumpDetail(months) {
        this.$router.push({ path: '/store', query: { months }})
      },
      getPage() {
        reportApi.putInStorageDayDetail(this.queryParam).then(res => {
          if (res.subCode === 1000) {
            this.tableData = res.data ? res.data : []
            if (this.tableData.length == 0) {
              this.emtityMsg = '暂无相关数据'
            } else {
              this.emtityMsg = '没有更多了'
            }
          } else {
            this.$toast(res.subMsg)
          }
        })
      }
    }
  };
</script>

<style>

  @import '../../assets/index/style.css';

  strong {
    font-weight: 600;
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
  }

  /* 给要上拉的容器设置 begin */
  .hello {
    background-color: #f3f2f8;
    padding-top: 12vw;
    font-size: 13px;
    height: 100vh;
    overflow-y: auto;
  }




  .mint-header-button{
    -webkit-box-flex: .5;
    -ms-flex: .5;
    flex: 0;
  }

</style>
