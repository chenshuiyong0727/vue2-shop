<template lang="html">
  <div class="hello">
    <mt-header title="商品详情">
      <div slot="left">
        <mt-button  icon="back" @click="$router.go(-1)"></mt-button>
      </div>
      <div slot="right">
        <el-dropdown trigger="click" style="margin-left: 1px;">
           <mt-button size="normal">
            <img  style="width: 25px" src="../../static/img/slh.png">
          </mt-button>
          <el-dropdown-menu slot="dropdown" >
            <el-dropdown-item type="text" @click.native="getImgUrl">智能更新</el-dropdown-item>

<!--            <el-dropdown-item type="text" v-if="form.id" @click.native="scanCode(form.id,2)">智能编辑</el-dropdown-item>-->
<!--            <el-dropdown-item type="text" v-else @click.native="scanCode(null,3)">智能添加</el-dropdown-item>-->
            <el-dropdown-item type="text" v-if="form.id" @click.native="gotoAdd(form.id,2)">手动编辑</el-dropdown-item>
<!--            <el-dropdown-item type="text" v-else @click.native="gotoAdd(null,3)">手动添加</el-dropdown-item>-->
          </el-dropdown-menu>
        </el-dropdown>
      </div>
    </mt-header>
    <div class="ui-flex justify-center center"
         style="width: 100vw; height: 220px;background-color: white;margin-top: 28px;">
      <div class="cell">
        <img
          @click="avatarShow(form.img)"
          :disabled="true "
          style="width: 80vw;margin: 0 auto;"
          v-if="form.img"
          :src="form.img"
        />
      </div>
    </div>
    <section class="my-pay-3">
      <div style="padding-top: 15px;
    padding-right: 10px;
    padding-left: 10px;
    color: #333;
     display: flex;
    justify-content: space-between;
    align-items: center;
  ">
      <div>
        <strong  style="color: #333;font-size: 18px;">¥</strong>
        <strong v-if="form.sellPrice && form.sellPrice != 0" style="color: #333;font-size: 25px;margin-left: -2px;" >{{form.sellPrice}}</strong>
        <strong v-else  style="color: #333;font-size: 25px;">899</strong>
      </div>
      </div>
      <div style="padding-top: 0px;
    padding-right: 10px;
    padding-bottom: 5px;
    padding-left: 10px;">
        <strong style="color: #333;font-size: 15px;line-height: 22px;">
          {{form.name}}
        </strong>
      </div>
      <div style="padding-top: 0px;
    padding-right: 10px;
    padding-bottom: 10px;    margin-left: -2px;
    padding-left: 10px;
  ">
        <span  style="font-size: 14px;
    background-color: #f3f2f8;
    padding: 5px;
    border-radius: 5px;">
          {{form.type | dictToDescTypeValue(20221108)}}
        </span>
        <span  v-if="form.brand" style="font-size: 14px;
    background-color: #f3f2f8;
    padding: 5px;     margin-left: 7px;
    border-radius: 5px;">
          {{form.brand}}
        </span>
        <span v-if="form.sellDate" style="font-size: 14px;
    background-color: #f3f2f8;
    margin-left: 7px;
    padding: 5px;
    border-radius: 5px;">
          {{form.sellDate}}
        </span>
      </div>
      <div style="padding-top: 0px;
    padding-right: 10px;
    padding-bottom: 10px;
    padding-left: 10px;
    display: flex;
    justify-content: space-between;
    align-items: center;
  ">
        <strong style="color: #333;font-size: 15px;">
          {{form.actNo}}
          <img @click="copyUrl(form.actNo)" style="width: 20px;margin-top: -5px;" src="../../static/img/copy6.png">
        </strong>
        <strong class="color-danger" style="font-size: 15px;">
          {{form.size}}
        </strong>
      </div>
    </section>
<!--    <section class="my-pay-4-1">-->
<!--      <div style="    border-right-color: rgba(185, 185, 185, .14);-->
<!--    border-right-style: solid;-->
<!--    height: 12vw;-->
<!--    margin-top: 26px;">-->
<!--        <span style="color: #7a7a7a;font-size: 15px;">-->
<!--          信息-->
<!--        </span>-->
<!--      </div>-->
<!--      <div style="width: 75vw;">-->
<!--        <span style="color: #7a7a7a;font-size: 15px;text-align: left;margin-left: 15px;">品牌-->
<!--          <span  style="color: #333;font-size: 15px;text-align: left;margin-left: 5px;">-->
<!--                {{form.brand }}-->
<!--          </span>-->
<!--        </span>-->
<!--        <span style="color: #7a7a7a;font-size: 15px;text-align: left;margin-left: 15px;">类型-->
<!--          <span  style="color: #333;font-size: 15px;text-align: left;margin-left: 5px;">-->
<!--          {{form.type | dictToDescTypeValue(20221108)}}-->
<!--          </span>-->
<!--        </span>-->
<!--        <span style="color: #7a7a7a;font-size: 15px;text-align: left;margin-left: 15px;margin-bottom: 5px;">发售时间-->
<!--          <span  style="color: #333;font-size: 15px;text-align: left;margin-left: 5px;">-->
<!--                {{form.sellDate }}-->
<!--          </span>-->
<!--        </span>-->
<!--      </div>-->
<!--    </section>-->

<!--    <section class="my-pay-4-1">-->
<!--      <div style="border-right-color: rgba(185, 185, 185, .14);-->
<!--  border-right-style: solid;">-->
<!--        <span style="color: #7a7a7a;font-size: 15px;">-->
<!--          信息-->
<!--        </span>-->
<!--      </div>-->
<!--      <div style="border-right-color: rgba(185, 185, 185, .14);-->
<!--  border-right-style: solid;">-->
<!--        <p>品牌</p>-->
<!--        <strong>-->
<!--          {{form.brand}}-->
<!--        </strong>-->
<!--      </div>-->
<!--      <div style="border-right-color: rgba(185, 185, 185, .14);-->
<!--  border-right-style: solid;">-->
<!--        <p>类型</p>-->
<!--        <strong>-->
<!--          {{form.type | dictToDescTypeValue(20221108)}}-->
<!--        </strong>-->
<!--      </div>-->
<!--      <div style="border-right-color: rgba(185, 185, 185, .14);-->
<!--  border-right-style: solid;">-->
<!--        <p>发售时间</p>-->
<!--        <strong>-->
<!--          {{form.sellDate }}-->
<!--        </strong>-->
<!--      </div>-->
<!--    </section>-->

    <div class="my-pay-5" v-if="tableData.length">
      <div>
        <h5 style="font-size: 17px;margin-left: 15px;font-weight: 600;color: #333333">尺码列表</h5>
      </div>
      <div>

        <div class="dingdans_item_dw" style=" display: flex;    border-bottom: 2px solid #f4f3f8;
    justify-content: space-between;
    align-items: center;"
        >
          <div class="dingdans_top_dw" style="
          width: 20vw;
          font-weight: 600;
          padding-bottom: 0px;
          border-bottom: 0; color: #333333">
            <div class="dingdans_top_left_dw" style=" ">
              <span>尺码</span>
            </div>
          </div>
          <div class="dingdans_top_dw" style="
          width: 20vw;          padding-bottom: 0px;    margin-left: -8px;
                    font-weight: 600;
          border-bottom: 0; color: #333333">
            <div class="dingdans_top_left_dw" style=" ">
              <span>得物价</span>
            </div>
          </div>
          <div class="dingdans_top_dw" style="
          width: 20vw;    margin-left: 7px;      font-weight: 600;padding-bottom: 0px;
          border-bottom: 0; color: #333333">
            <div class="dingdans_top_left_dw" style=" ">
              <span>到手价</span>
            </div>
          </div>
          <div class="dingdans_top_dw" style="
          width: 15vw;       margin-left: 2px;       font-weight: 600;padding-bottom: 0px;
          border-bottom: 0; color: #333333">
            <div class="dingdans_top_left_dw" style=" ">
              <span>库存</span>
            </div>
          </div>
          <div class="dingdans_top_dw" style="
          width: 20vw;          font-weight: 600;padding-bottom: 0px;margin-right: 5px;
          border-bottom: 0; color: #333333">
            <div class="dingdans_top_left_dw" style=" ">
              <span>入库价</span>
            </div>
          </div>
          <div class="dingdans_top_dw" style="
          width: 15vw;    margin-left: 5px;        margin-right: 2px;  font-weight: 600;padding-bottom: 0px;
          border-bottom: 0; color: #333333">
            <div class="dingdans_top_left_dw" style=" ">
              <span>利润</span>
            </div>
          </div>
        </div>
        <div class="dingdans_item_dw" @click="rowClick(item)" style=" display: flex;
    justify-content: space-between;
    align-items: center;
    padding-top: 8px;
    border-bottom: 2px solid rgb(244, 243, 248);
"
                v-for="(item,index) in tableData"
                :key="index"
        >
          <div class="dingdans_top_dw" style="
          width: 20vw;padding-bottom: 0px;
          border-bottom: 0; ">
            <div class="dingdans_top_left_dw" style=" color: #7a7a7a">
              <span style="font-weight: bolder;font-size: 14px;" class="color-url">{{item.size }}</span>
            </div>
          </div>
          <div class="dingdans_top_dw" style="
          width: 20vw;padding-bottom: 0px;
          border-bottom: 0; ">
            <div class="dingdans_top_left_dw" style="color: #7a7a7a ">
              <span>¥</span>
              <span>{{item.price }}</span>
            </div>
          </div>
          <div class="dingdans_top_dw" style="
          width: 25vw;padding-bottom: 0px;
          border-bottom: 0; ">
            <div class="dingdans_top_left_dw" style="color: #7a7a7a ">
              <span v-if="item.price ">¥</span>
              <span v-if="item.price "> {{(item.price - (item.price * 0.075 + 38 + 8.5)) | numFilter}}</span>
            </div>
          </div>
          <div class="dingdans_top_dw" style="
          width: 15vw;padding-bottom: 0px;    margin-left: 5px;
          border-bottom: 0; ">
            <div class="dingdans_top_left_dw" style=" color: #7a7a7a;margin-left: 7px;">
              <span>{{item.inventory }}</span>
            </div>
          </div>
          <div class="dingdans_top_dw" style="
          width: 20vw;padding-bottom: 0px;
          border-bottom: 0; ">
            <div class="dingdans_top_left_dw" style=" color: #7a7a7a">
              <span v-if="item.inPrice ">¥</span>
              <span v-if="item.inPrice ">{{item.inPrice }}</span>
            </div>
          </div>
          <div class="dingdans_top_dw" style="
          width: 25vw;padding-bottom: 0px;
          border-bottom: 0; ">
            <div class="dingdans_top_left_dw" style="color: #7a7a7a ">
              <span v-if="item.inPrice ">¥</span>
              <span  v-if="item.inPrice"
                      :style="(item.price - (item.price * 0.075 + 38 + 8.5) - item.inPrice - 10) > 50 ? 'color: red' : ''"
               >
                {{(item.price - (item.price * 0.075 + 38 + 8.5) - item.inPrice - 10) | numFilter}}
              </span>
            </div>
          </div>
        </div>


<!--        <el-table  style="z-index: 1" border :data="tableData" @row-click="rowClick" >-->
<!--          <el-table-column align="center" width="51" prop="size" label="尺码">-->
<!--            <template scope="scope">-->
<!--              <a style="color: #20a0ff" @click="rowClick(scope.row)"> {{ scope.row.size }}</a>-->
<!--            </template>-->
<!--          </el-table-column>-->
<!--          <el-table-column align="center" prop="price"  width="53" label="价格" />-->
<!--          <el-table-column align="center" prop=""  label="到手">-->
<!--            <template scope="scope">-->
<!--                   <span  v-if="scope.row.price">-->
<!--                     {{(scope.row.price - (scope.row.price * 0.075 + 38 + 8.5)) | numFilter}}-->
<!--                   </span>-->
<!--            </template>-->
<!--          </el-table-column>-->
<!--          <el-table-column align="center" prop="inventory" width="51" label="库存" />-->
<!--          <el-table-column align="center" prop="inPrice" width="51" label="入库" />-->
<!--          <el-table-column align="center" prop="" width="65"  fixed="right" label="利润">-->
<!--            <template scope="scope">-->
<!--                  <span  v-if="scope.row.inPrice"-->
<!--                         :style="(scope.row.price - (scope.row.price * 0.075 + 38 + 8.5) - scope.row.inPrice - 10) > 50 ? 'color: red' : ''"-->
<!--                  >-->
<!--                  {{(scope.row.price - (scope.row.price * 0.075 + 38 + 8.5) - scope.row.inPrice - 10) | numFilter}}-->
<!--                </span>-->
<!--            </template>-->
<!--          </el-table-column>-->
<!--        </el-table>-->
      </div>
    </div>
<!--      <div style="border-right-color: rgba(185, 185, 185, .14);-->
<!--  border-right-style: solid;">-->
<!--        <span style="color: #7a7a7a;font-size: 15px;">-->
<!--          库存-->
<!--        </span>-->
<!--      </div>-->
<!--      <div style="border-right-color: rgba(185, 185, 185, .14);-->
<!--  border-right-style: solid;">-->
<!--        <p>剩余</p>-->
<!--        <strong>-->
<!--          {{form.inventory}}-->
<!--        </strong>-->
<!--      </div>-->
<!--      <div style="border-right-color: rgba(185, 185, 185, .14);-->
<!--  border-right-style: solid;">-->
<!--        <p>原库存</p>-->
<!--        <strong>-->
<!--          {{form.oldInventory}}-->
<!--        </strong>-->
<!--      </div>-->
<!--      <div style="border-right-color: rgba(185, 185, 185, .14);-->
<!--  border-right-style: solid;">-->
<!--        <p>已上架</p>-->
<!--        <strong>-->
<!--          {{form.galleryCount}}-->
<!--        </strong>-->
<!--      </div>-->
<!--      <div style="border-right-color: rgba(185, 185, 185, .14);-->
<!--  border-right-style: solid;">-->
<!--        <p>交易成功</p>-->
<!--        <strong>-->
<!--          {{form.successCount}}-->
<!--        </strong>-->
<!--      </div>-->
    <el-dialog
      center
      style="margin-top:1vh "
      width="100vw"
      :title="sizeTitle"
      :visible.sync="isShowDialog2"
    >
      <ul style="" class="store-list-1-1" >
        <li  class="store-list-1-li-1">
          <div class="overview1">
            <p><strong>当前价格</strong></p>
            <p class="color-url">{{priceData.price}}</p>
          </div>
          <div class="overview2">
            <p><strong>到手价</strong></p>
            <p class="color-url">{{priceData.theirPrice}} </p>
          </div>
        </li>
        <li  class="store-list-1-li-1">
          <div class="overview1">
            <p><strong>年度最高</strong></p>
            <p class="color-url">{{priceData.price365}}</p>
          </div>
          <div class="overview2">
            <p><strong>到手价</strong></p>
            <p class="color-url">{{priceData.theirPrice365}}</p>
          </div>
        </li>
        <li  class="store-list-1-li-1">
          <div class="overview1">
            <p><strong>半年最高</strong></p>
            <p class="color-url">{{priceData.price180}}</p>
          </div>
          <div class="overview2">
            <p><strong>到手价</strong></p>
            <p class="color-url">{{priceData.theirPrice180}}</p>
          </div>
        </li>
        <li  class="store-list-1-li-1">
          <div class="overview1">
            <p><strong>30天最高</strong></p>
            <p class="color-url">{{priceData.price30}}</p>
          </div>
          <div class="overview2">
            <p><strong>到手价</strong></p>
            <p class="color-url">{{priceData.theirPrice30}}</p>
          </div>
        </li>
      </ul>
      <div style="text-align: center">
        <el-button :type="type30" @click="profitData(30)" size="small" round>30天走势图</el-button>
        <el-button :type="type180" @click="profitData(180)" size="small" round>半年走势图</el-button>
        <el-button :type="type365" @click="profitData(365)"size="small"  round>年度走势图</el-button>
      </div>
      <ve-line
        height="200px"
        :data="chartData"
        :legend-visible="false"
        :loading="loading"
        :data-empty="dataEmpty"
        :settings="chartSettings"></ve-line>
      <span slot="footer" class="dialog-footer">
    </span>
    </el-dialog>
    <div class="popContainer" v-if="pictureZoomShow" @click="pictureZoomShow = false">
      <div class="imageShow">
        <img :src="imageZoom" alt="" class="showImg">
      </div>
    </div>
  </div>
</template>

<script>
  import { goodsBaseSizeApi } from '@/api/goodsBaseSize'
  import { goodsBaseSizePriceApi } from '@/api/goodsBaseSizePrice'
  import {goodsBaseApi} from '@/api/goodsBase'


  export default {
    components:{
    },
    data(){
      return {
        imageZoom: '',
        isShowDialog2: false,
        pictureZoomShow: false,
        props: {
          lazy: false,
          multiple: true
        },
        queryParam: {
          goodsId: ''
        },
        reqCount: 0,
        type30: 'primary',
        type180: 'default',
        type365: 'default',
        chartSettings: {
          xAxisType: 'time',
          area: false,
          scale: [true],
          axisSite: { right: ['date'] },
          labelAlias: {
            'price': '价格',
            'date': '日期',
          }
        },
        chartData: {
          columns: ['date', 'price'],
          rows: []
        },
        priceData: {
        },
        queryParam1: {
          goodsId: '',
          sizeId: '',
          dayNum: 30
        },
        loading: false,
        dataEmpty: false,
        sizeTitle: '',
        size: '',
        date: '',
        tableData: [],
        sizeList: [],
        fileSize: 2,
        type: '',
        id: '',
        photo: '',
        options: [],
        uploadData: {},
        fileUrl: fileUrl,
        typeList: [],
        requestParam: {
          sizeId: '',
          actNo: ''
        },
        form: {
          actNo: ''
        },
      }
    },
    created() {
      const { id } = this.$route.query
      if (id) {
        this.getDetailById(id)
      }

    },
    mounted() {

    },
    methods:{
      profitData(dayNum) {
        if (dayNum == 30) {
          this.type30 = 'primary'
          this.type180 = 'default'
          this.type365 = 'default'
        } else if (dayNum == 180) {
          this.type180 = 'primary'
          this.type30 = 'default'
          this.type365 = 'default'
        }else {
          this.type365 = 'primary'
          this.type180 = 'default'
          this.type30 = 'default'
        }
        this.queryParam1.dayNum = dayNum
        this.getPriceData()
      },
      rowClick(row) {
        this.size = row.size
        this.queryParam1.goodsId = this.form.id
        this.queryParam1.sizeId = row.sizeId
        this.getPriceData()
        this.isShowDialog2 = true
      },
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
      avatarShow(e) {
        this.imageZoom = e
        this.pictureZoomShow = true
      },
      getImgUrl() {
        let data = {actNo: this.form.actNo , sizeId: this.form.sizeId }
        goodsBaseApi.getGoodsByActNoAndSizeH5(data).then(res => {
          if (res.subCode === 1000) {
            this.form = res.data ? res.data : {}
            this.queryParam.goodsId = this.form.id
            this.getPage()
          }else{
            this.$toast(res.subMsg)
          }
        })
      },
      gotoAdd(id, type) {
        this.$router.push({ path: '/goodsAdd', query: {id,type } })
      },
      scanCode(id, type) {
        this.$router.push({ path: '/scanCode', query: { id, type } })
      },
      getDetailById(id) {
        if (id) {
          goodsBaseApi.getDetailById(id).then(res => {
            if (res.subCode === 1000) {
              this.form = res.data ? res.data : {}
              this.queryParam.goodsId = this.form.id
              this.getPage()
            } else {
              this.$toast(res.subMsg)
            }
          })
        }
      },
      getPriceData() {
        goodsBaseSizePriceApi.getPriceData(this.queryParam1).then(res => {
          if (res.subCode === 1000) {
            this.priceData = res.data
            this.dataEmpty = false
            this.loading = false
            let rows = res.data ? res.data.list : []
            this.chartData.rows = rows
            console.info(this.chartData.rows)
            let theirPrice = res.data.price - (res.data.price * 0.075 + 38 + 8.5)
            this.priceData.theirPrice = parseFloat(theirPrice).toFixed(2)

            let theirPrice30 = res.data.price30 - (res.data.price30 * 0.075 + 38 + 8.5)
            this.priceData.theirPrice30 = parseFloat(theirPrice30).toFixed(2)

            let theirPrice180 = res.data.price180 - (res.data.price180 * 0.075 + 38 + 8.5)
            this.priceData.theirPrice180 = parseFloat(theirPrice180).toFixed(2)

            let theirPrice365 = res.data.price365 - (res.data.price365 * 0.075 + 38 + 8.5)
            this.priceData.theirPrice365 = parseFloat(theirPrice365).toFixed(2)
            this.date = this.priceData.date
          } else if (res.subCode === 10086) {
          } else {
            this.$toast(res.subMsg)
          }
        })
      },
      getPage() {
        goodsBaseSizeApi.page(this.queryParam).then(res => {
          if (res.subCode === 1000) {
            this.tableData = res.data ? res.data.list : []
            let totalCount = res.data ? res.data.pageInfo.totalCount : 0
            if (this.form.sizeVoList && this.tableData) {
              for (let i = 0; i < this.tableData.length; i++) {
                if (this.tableData[i].sizeId && this.tableData[i].inventory) {
                  this.queryParam1.goodsId = this.form.id
                  this.queryParam1.sizeId = this.tableData[i].sizeId
                  this.size = this.tableData[i].size
                  this.getPriceData()
                  break
                }
              }
            }
            if (totalCount < this.form.sizeList.length && this.reqCount < 5) {
              console.info(this.reqCount)
              setTimeout(()=>{
                this.reqCount ++
                this.getPage()
              },2000)
            }
          } else {
            this.$toast(res.subMsg)
          }
        })
      },
    }
  }
</script>

<style>

  @import '../assets/index/style.css';
  /*@import '../assets/fz.less';*/
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
  strong{
    font-weight: 600;
  }
  /*.detail {*/
  /*  width: 100%;*/
  /*  padding-bottom: 14vw;*/
  /*}*/

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

  .my-pay-4-1 {
    margin-top: 15px;
    border-radius: 10px;
    display: -webkit-box;
    display: -ms-flexbox;
    display: flex;
    width: 92%;
    margin-left: 4%;
    padding: 2vw 0;
    background-color: #fff;
    border-bottom-color: rgba(185, 185, 185, .14);
    border-bottom-style: solid;
    border-bottom-width: 1px;

    > div {
      display: block;
      width: 20%;
      color: #999;
      text-align: center;

      > span {
        font-size: 22px;
        margin-top: 2.3vw;
        display: block;
        text-align: center;
      }

      p {
        color: #8c8a8a;font-size: 14px; margin-top: 3px;margin-bottom: 4px;
      }
      strong {
        color: #333;font-size: 15px;
      }
    }
  }
  .my-pay-5 {
    margin-top: 15px;
    border-radius: 10px;
    width: 92%;
    margin-left: 4%;
    padding-top: 4vw;
    background-color: #fff;
    border-bottom-color: rgba(185, 185, 185, .14);
    border-bottom-style: solid;
    border-bottom-width: 1px;
  }
  .store-list-1-1 {
    display: -webkit-box;
    margin-top: -15px;
    margin-bottom: 20px;
    text-align: center;
    margin-left: -11px;
  }
  .store-list-1-li-1 {
    border-radius: 10px;
    text-align: center;
    background-color: #EEF2F7;
    width: 24%;
    color: #333;
    font-size: 16px;
    box-sizing: border-box;
    margin-top: 0vw;
    margin-right: 2vw;
    margin-bottom: 0vw;
    margin-left: 0vw;
    padding: 3px;
  }
</style>
