<template lang="html">
  <div class="login">
    <!--    <v-header>-->
    <!--      <h1 slot="title">商品详情</h1>-->
    <!--    </v-header>-->
    <mt-header title="商品信息">
      <div slot="left">
        <mt-button icon="back" @click="$router.go(-1)"></mt-button>
      </div>
    </mt-header>
    <div class="fenlei_top_2" v-if="type!=1">
      <input type="file" capture="user" accept="image/*" style="display:none" ref="file1"
             @click="e => {e.target.value = '';} " @change="getFileData"/>
      <el-row style="
       margin-top: 10px;
       margin-bottom: 10px;
      width: 100vw;display:flex;
       flex-direction:row;
      align-items:center;" >
         <el-col :span="6" style="text-align: right"><span>根据货号获取</span></el-col>
          <el-col :span="30" :offset="1">
            <el-input v-model.trim="form.actNo" style="width: 243px;" size="small" placeholder="请输入货号">
              <el-button type="primary" slot="append" size="small" @click="getImgUrl">手动获取</el-button>
            </el-input>
        </el-col>
      </el-row>

      <el-row style="width: 100vw;display:flex;flex-direction:row;align-items:center;" >
         <el-col :span="6" style="text-align: right"><span>根据图片获取</span></el-col>
          <el-col :span="6" :offset="1">
            <el-upload
              :disabled="type == 1 "
              class="avatar-uploader"
              action="/gw/op/v1/file/uploadFileStore"
              :show-file-list="false"
              :on-error="handleImageError"
              :on-success="handleImageSuccess"
              :before-upload="beforeImageUpload"
              :data="uploadData"
            >
              <el-button
                :disabled="type == 1 "
                size="small"
                type="primary">上传图片
              </el-button>
            </el-upload>
        </el-col>
        <el-col :span="6" >
          <el-button
            :disabled="type == 1 "
            size="small"
            type="primary"
            @click="uploadMaterial"
          >拍摄照片
          </el-button>
        </el-col>
      </el-row>
    </div>

    <section  :style="type!=1 ? 'padding-top:138px;' : 'padding-top:42px;'">

      <div v-if="form.id">
        <mt-field
          label="商品图片"
        >
          <img
            :disabled="type == 1 "
            style="margin-bottom: 20px;"
            class="select100"
            v-if="form.img"
            :src="form.img"
            @click="pictureZoomShow = true"
          />
        </mt-field>
        <mt-field
          :disabled="type == 1 "
          label="货号"
          placeholder="请输入品牌"
          type="text"
          v-model="form.actNo"
        >
        </mt-field>
        <mt-field
          :disabled="type == 1 "
          label="品牌"
          placeholder="请输入品牌"
          type="text"
          v-model="form.brand"
        >
        </mt-field>
        <mt-field
          :disabled="type == 1 "
          label="发售日期"
          placeholder="请输入发售日期"
          type="text"
          v-model="form.sellDate"
        >
        </mt-field>
        <mt-field
          :disabled="type == 1 "
          label="发售价格"
          placeholder="请输入发售价格"
          type="text"
          v-model="form.sellPrice"
        >
        </mt-field>
        <mt-field
          :disabled="type == 1 "
          label="名称"
          placeholder="请输入name"
          type="textarea"
          v-model="form.name"
          rows="3"
        >
        </mt-field>
        <mt-field
          :disabled="type == 1 "
          label="备注"
          placeholder="请输入备注"
          type="textarea"
          v-model="form.remark"
          rows="4"
        >
        </mt-field>

        <div style="
        border-bottom: 1vw solid #eee;
    font-size: 10px;
    padding-top: 2.4vw;
    padding-left: 4vw;
    padding-right: 3vw;
    background: #ffffff;" >
          <h5 style="font-size: 20px;margin-bottom: 8px;">尺码列表</h5>
            <el-table  style="margin-top: 20px;z-index: 1" border :data="tableData" @row-click="rowClick" >
              <el-table-column align="center" width="51" prop="size" label="尺码">
                <template scope="scope">
                  <a style="color: #20a0ff" @click="rowClick(scope.row)"> {{ scope.row.size }}</a>
                </template>
              </el-table-column>
              <el-table-column align="center" prop="price"  width="53" label="价格" />
              <el-table-column align="center" prop=""  label="到手">
                <template scope="scope">
                 <span  v-if="scope.row.price">
                   {{(scope.row.price - (scope.row.price * 0.075 + 38 + 8.5)) | numFilter}}
                 </span>
                </template>
              </el-table-column>
              <el-table-column align="center" prop="inventory" width="51" label="库存" />
              <el-table-column align="center" prop="inPrice" width="51" label="入库" />
              <el-table-column align="center" prop="" width="65"  fixed="right" label="利润">
                <template scope="scope">
                <span  v-if="scope.row.inPrice"
                  :style="(scope.row.price - (scope.row.price * 0.075 + 38 + 8.5) - scope.row.inPrice - 10) > 50 ? 'color: red' : ''"
                >
                {{(scope.row.price - (scope.row.price * 0.075 + 38 + 8.5) - scope.row.inPrice - 10) | numFilter}}
              </span>
                </template>
              </el-table-column>
            </el-table>
        </div>
        <div  v-if="!flag" style="    margin-left: 35vw;
      margin-top: 20px;">
          <mt-button v-if="type != 1" style="bottom: 10px"
                     type="primary"
                     @click="submit">提交
          </mt-button>
          <mt-button v-else style="bottom: 10px"
                     type="primary"
                     @click="goEdit">编辑
          </mt-button>
          <mt-button style="bottom: 10px"
                     @click="$router.go(-1)">取消
          </mt-button>
        </div>
      </div>
    </section>
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
                  <p class="color-danger">{{priceData.price}}</p>
                </div>
                <div class="overview2">
                  <p><strong>到手价</strong></p>
                  <p class="color-danger">{{priceData.theirPrice}} </p>
                </div>
              </li>
              <li  class="store-list-1-li-1">
                <div class="overview1">
                  <p><strong>年度最高</strong></p>
                  <p class="color-danger">{{priceData.price365}}</p>
                </div>
                  <div class="overview2">
                  <p><strong>到手价</strong></p>
                  <p class="color-danger">{{priceData.theirPrice365}}</p>
                </div>
              </li>
              <li  class="store-list-1-li-1">
                <div class="overview1">
                  <p><strong>半年最高</strong></p>
                  <p class="color-danger">{{priceData.price180}}</p>
                </div>
                  <div class="overview2">
                  <p><strong>到手价</strong></p>
                  <p class="color-danger">{{priceData.theirPrice180}}</p>
                </div>
              </li>
              <li  class="store-list-1-li-1">
                <div class="overview1">
                  <p><strong>30天最高</strong></p>
                  <p class="color-danger">{{priceData.price30}}</p>
                </div>
                  <div class="overview2">
                  <p><strong>到手价</strong></p>
                  <p class="color-danger">{{priceData.theirPrice30}}</p>
                </div>
              </li>
            </ul>
              <div style="text-align: center">
                <el-button :type="type30" @click="profitData(30)" size="small" round>30天走势图</el-button>
                <el-button :type="type180" @click="profitData(180)" size="small" round>半年走势图</el-button>
                <el-button :type="type365" @click="profitData(365)"size="small"  round>年度走势图</el-button>
              </div>
      <ve-line
        height="250px"
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
        <img :src="form.img" alt="" width="100%">
      </div>
    </div>
    <div v-if="type==3 && !form.id" style="
      right: 15px;
      bottom: 20vw;
      position: absolute;
      text-align: center;
    ">
      <mt-button  @click="gotoAdd(null,3)"  style="margin-left: 5px;
      border-radius: 100%;
      margin-top: 0px;
      height: 55px;
      width: 55px;"
                  type="primary">
        <img src="../../static/img/handleAdd.png" height="30" width="30" slot="icon">
      </mt-button>
    </div>
    <v-footer v-if="!flag"></v-footer>
  </div>
</template>

<script>
  import Header from '@/common/_header.vue'
  import {goodsBaseApi} from '@/api/goodsBase'
  import { goodsBaseSizeApi } from '@/api/goodsBaseSize'
  import { goodsBaseSizePriceApi } from '@/api/goodsBaseSizePrice'
  import axios from 'axios'
  import * as imageConversion from 'image-conversion'
  import Footer from '@/common/_footer.vue'
  import { hideLoading, showLoading } from '@/components/Loading/loading'

  export default {
    components: {
      'v-header': Header,
      'v-footer': Footer
    },
    data() {
      return {
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
      const {id, type,flag} = this.$route.query
      this.flag = flag
      this.id = id
      this.type = type
      this.form.id = id
      if (this.id) {
        this.getDetailById(this.id)
      }
    },
    mounted() {

    },
    methods: {
      gotoAdd(id, type) {
        this.$router.push({ path: '/goodsAdd', query: {id,type } })
      },
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
        this.getTitle()
        this.queryParam1.goodsId = this.form.id
        this.queryParam1.sizeId = row.sizeId
        this.getPriceData()
        this.isShowDialog2 = true
      },
      getTitle() {
        this.sizeTitle = '尺码：' + this.size  + ' 更新日期：' + this.date
        if (this.size) {
          this.sizeTitle = '尺码：' + this.size
        }
        if (this.date) {
          this.sizeTitle = this.sizeTitle  + ' 更新日期：' + this.date
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
            let theirPrice = res.data.price - (res.data.price * 0.075 + 38 + 8.5)
            this.priceData.theirPrice = parseFloat(theirPrice).toFixed(2)

            let theirPrice30 = res.data.price30 - (res.data.price30 * 0.075 + 38 + 8.5)
            this.priceData.theirPrice30 = parseFloat(theirPrice30).toFixed(2)

            let theirPrice180 = res.data.price180 - (res.data.price180 * 0.075 + 38 + 8.5)
            this.priceData.theirPrice180 = parseFloat(theirPrice180).toFixed(2)

            let theirPrice365 = res.data.price365 - (res.data.price365 * 0.075 + 38 + 8.5)
            this.priceData.theirPrice365 = parseFloat(theirPrice365).toFixed(2)
            this.date = this.priceData.date
            this.getTitle()
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
                  this.getTitle()
                  this.getPriceData()
                  break
                }
              }
            }
            if (totalCount < this.form.sizeList.length && this.reqCount < 5) {
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
      uploadMaterial() {
        this.$refs.file1.dispatchEvent(new MouseEvent("click"));
      },
      async beforeImageUpload(file) {
        const fileName = file.name
        const fileType = fileName.substring(fileName.lastIndexOf('.'))
        if (
          fileType === '.jpg' ||
          fileType === '.png' ||
          fileType === '.jpeg' ||
          fileType === '.bmp' ||
          fileType === '.gif'
        ) {
        } else {
          this.$toast('不是,jpeg,.png,.jpg,.bmp,.gif文件,请上传正确的图片类型')
          return false
        }
        let overSize = file.size / 1024 / 1024
        if (overSize > 1) {
          file = await imageConversion.compressAccurately(file, 200)
        }
        overSize = file.size / 1024 / 1024
        return file
      },
      // 触发上传材料文件
      async getFileData() {
        let inputFile = this.$refs.file1.files[0];
        let filename = inputFile.name;
        let index = filename.lastIndexOf(".")
        filename = filename.substring(0, index)
        let overSize = inputFile.size / 1024 / 1024
        if (overSize > 1) {
          inputFile = await imageConversion.compressAccurately(inputFile, 200)
        }
        overSize = inputFile.size / 1024 / 1024
        let param = {
          fileId: filename,
          file: inputFile
        };
        this.uploadImg(param);
      },
      uploadImg(param) {
        let formData = new FormData();
        formData.set("actNo", param.fileId);
        formData.set("file", param.file);
        let reopt = {
          method: 'post',
          url: '/gw/op/v1/file/uploadFileStore',
          headers: {
            'Content-Type': 'multipart/form-data'
          },
          data: formData
        }
        showLoading()
        axios.request(reopt).then(res => {
          hideLoading()
          if (res.status === 200) {
            let data = res.data
            if (data.code !== 1 || data.sub_code != 1000) {
              this.$toast('识别失败，请手动输入')
            } else {
              this.$toast("识别成功")
              this.form = res.data.data ? res.data.data : {}
              if (this.form.id){
                this.queryParam.goodsId = this.form.id
                this.getPage()
              }
            }
          } else {
            this.$toast('识别失败，请手动输入')
          }
        })
      },
      getDetailById(id) {
        if (id) {
          goodsBaseApi.getDetailById(id).then(res => {
            if (res.subCode === 1000) {
              this.form = res.data ? res.data : {}
              this.queryParam.goodsId = this.form.id
              this.getPage()
              this.getImgUrl()
            } else {
              this.$toast(res.subMsg)
            }
          })
        }
      },
      resetHandle() {
        this.isShowDialog2 = false
      },
      goEdit() {
        this.type = 2
      },
      getSize() {
        this.form.sizeList = []
        for (let i = 0; i < this.sizeList.length; i++) {
          this.form.sizeList.push(this.sizeList[i][1])
        }
      },
      // handleChange() {
      //   goodsBaseApi.listDropDownSizes({type: ''}, false).then(res => {
      //     if (res.subCode === 1000) {
      //       this.sizeList = res.data
      //     }
      //   })
      // },
      gotoAdd(id, type) {
        this.$router.push({path: '/goodsAdd', query: {id, type}})
      },
      gotoIndex(row) {
        this.$router.push({path: '/'})
      },
      goBack(row) {
        this.$router.push({path: '/goodsBase'})
      },
      listSysDict() {
        let sysDictList = localStorage.getItem('sysDictList') ? JSON.parse(
          localStorage.getItem('sysDictList')) : []
        this.typeList = sysDictList.filter(item => item.typeValue == 20221108)
        this.dataStatusList = sysDictList.filter(item => item.typeValue == 36)
      },
      // 登录按钮
      getImgUrl() {
        if (!this.form.actNo) {
          this.$toast('请输入货号')
          return false
        }
        let data = {actNo: this.form.actNo , sizeId: this.form.sizeId }
        goodsBaseApi.getGoodsByActNoAndSize(data).then(res => {
          if (res.subCode === 1000) {
            this.form = res.data ? res.data : {}
            this.queryParam.goodsId = this.form.id
            this.getPage()
          }else{
            this.$toast(res.subMsg)
          }
        })
      },
      async handleImageSuccess(res, file) {
        if (res.code !== 1 || res.sub_code != 1000) {
          this.$toast('识别失败，请手动输入')
        } else {
          this.$toast('识别成功')
          this.form = res.data ? res.data : {}
          if (this.form.id){
            this.queryParam.goodsId = this.form.id
            this.getPage()
          }
        }
      },
      async handleImageError(res, file) {
        this.$toast('上传失败')
      },

    }
  }

</script>

<style lang="less" scoped>
  @import '../assets/index/style.css';
  html {
    font-size: 50px;
  }
  .login {
    > section {
      .tip {
        padding: 6vw 3vw;
        color: rgb(224, 145, 71);
        letter-spacing: 2px;
        font-size: 16px;
      }
    }
  }

  .fenlei_top_2 {
    display: -ms-flexbox;
    -ms-flex-align: center;
    -ms-flex-pack: justify;
    background: #eeeeee;
    position: fixed;
    height: 94px;
    font-size: 14px;
    z-index: 99;
    margin-top: 11.6vw;
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
