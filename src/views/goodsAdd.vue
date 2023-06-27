<template lang="html">
  <div class="login">
    <!--    <v-header>-->
    <!--      <h1 slot="title">商品详情</h1>-->
    <!--    </v-header>-->
    <mt-header title="商品详情">
      <div slot="left">
        <mt-button  icon="back" @click="$router.go(-1)"></mt-button>
      </div>
    </mt-header>
    <section style="padding-top:46px">
      <mt-field
        label="图片"
      >
        <el-upload
          :disabled="type == 1 "
          class="avatar-uploader"
          action="/gw/op/v1/file/uploadFileMinio"
          :show-file-list="false"
          :on-error="handleImageError"
          :on-success="handleImageSuccess"
          :before-upload="beforeImageUpload"
          :data="uploadData"
        >
          <img
            :disabled="type == 1 "
            style="margin-bottom: 20px;"
            class="select100"
            v-if="form.imgUrl"
            :src="fileUrl + form.imgUrl"
          />
          <el-button :disabled="type == 1 " type="primary" class="select100" v-show="!form.imgUrl" size="small"
          >上传图片
          </el-button
          >
        </el-upload>
      </mt-field>
      <mt-field label="类型">
<!--          <select class="select100" v-model="form.type"  :disabled="type == 1 ">-->
<!--        <option :disabled="true" value="" selected>请选择类型</option>-->
<!--            <option v-for="x in typeList" :value="x.fieldValue">{{x.fieldName}}</option>-->
<!--          </select>-->
          <el-select size="small" class="select100" v-model="form.type" :disabled="type == 1 " >
        <el-option :disabled="true" value="" selected>请选择类型</el-option>
        <el-option
          v-for="item in typeList"
          :key="item.fieldValue"
          :label="item.fieldName"
          :value="item.fieldValue">
        </el-option>
          </el-select>
      </mt-field>
      <mt-field
        :disabled="type == 1 "
        label="货号"
        placeholder="请输入货号"
        type = "text"
        v-model = "form.actNo"
      >
        <mt-button
          :disabled="type == 1 "
          size="small"
          type="primary"
          @click="getImgUrl(form.actNo)">获取图片</mt-button>
      </mt-field>
      <mt-field
        :disabled="type == 1 "
        label="品牌"
        placeholder="请输入品牌"
        type = "text"
        v-model = "form.brand"
      >
      </mt-field>
      <mt-field
        :disabled="type == 1 "
        label="名称"
        placeholder="请输入名称"
        type = "text"
        v-model = "form.name"
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
        label="备注"
        placeholder="请输入备注"
        type = "textarea"
        v-model = "form.remark"
        rows="4"
      >
      </mt-field>
      <mt-field
        label="尺码"
      >
        <el-cascader  ref="owner" :disabled="type == 1 " v-model="sizeList"
                      :options="options" @change="getSize" :show-all-levels="true"
                      :props="props" size="small"
                      style="width: 62vw;display:inline-block"></el-cascader>
      </mt-field>
    </section>
    <div style="    margin-left: 20vw;
    margin-top: 20px;">
      <mt-button v-if="type != 1" style="bottom: 10px"
                 type="primary"
                 @click="submit">提交</mt-button>
      <mt-button v-else style="bottom: 10px"
                 type="primary"
                 @click="goEdit">编辑</mt-button>
      <mt-button style="bottom: 10px"
                 @click="$router.go(-1)">取消</mt-button>
      <mt-button style="bottom: 10px"
                 type="primary"
                 @click="gotoIndex">回到首页</mt-button>
    </div>


  </div>
</template>

<script>
  import Header from '@/common/_header.vue'
  import { fileApi } from '@/api/file'
  import { goodsBaseApi } from '@/api/goodsBase'
  export default {
    components:{
      'v-header':Header
    },
    data(){
      return {
        props: {
          lazy: false,
          multiple: true
        },
        sizeList: [],
        type: '',
        id: '',
        options: [],
        uploadData: {},
        fileUrl: fileUrl,
        typeList: [],
        form: {
          type: '01',
          actNo: '',
          name: '',
          imgUrl: '',
          sellPrice: '',
          sellDate: '',
          brand: 'Nike',
          remark: '',
          sizeList: []
        },
      }
    },
    created() {
      const { id, type } = this.$route.query
      this.id = id
      this.type = type
      this.form.id = id
      if (this.id) {
        this.getDetailById(this.id)
      }
    },
    mounted() {
      this.init()
    },
    methods:{
      getDetailById(id) {
        if (id) {
          goodsBaseApi.getDetailById(id).then(res => {
            if (res.subCode === 1000) {
              this.form = res.data ? res.data : {}
              this.form.sizeList = []
              this.sizeList = res.data.sizeListList
              for (let i = 0; i < res.data.sizeListList.length; i++) {
                this.form.sizeList.push(res.data.sizeListList[i][1])
              }
            } else {
              this.$toast(res.subMsg)
            }
          })
        }
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

      init() {
        this.listSysDict()
        let typeList = this.typeList
        let options = []
        for (let i = 0; i < typeList.length; i++) {
          goodsBaseApi.listDropDownSizes({ type: typeList[i].fieldValue }, false).then(res => {
            if (res.subCode === 1000) {
              options.push({
                label: typeList[i].fieldName,
                value: typeList[i].fieldValue,
                children: res.data.map(item => {
                  return {
                    value: item.id,
                    label: item.size
                  }
                })
              })
            }
          })
        }
        this.options = options
      },
      gotoAdd(id, type) {
        this.$router.push({ path: '/goodsAdd', query: { id, type } })
      },
      gotoIndex(row) {
        this.$router.push({ path: '/'})
      },
      submit() {
        if (!this.form.type) {
          this.$toast('类型非空')
          return false
        }
        if (!this.form.actNo) {
          this.$toast('货号非空')
          return false
        }
        // if (!this.form.imgUrl) {
        //   this.$toast('请上传图片')
        //   return false
        // }
        if (!this.form.sizeList.length) {
          this.$toast('请选择尺码')
          return false
        }
        if (this.type == 2) {
          goodsBaseApi.update(this.form).then(res => {
            if (res.subCode === 1000) {
              this.$toast('操作成功')
              this.goBack()
            } else {
              this.$toast(res.subMsg)
            }
          })
        } else {
          goodsBaseApi.add(this.form).then(res => {
            if (res.subCode === 1000) {
              this.$toast('添加成功，即将返回列表')
              this.goBack()
              // this.$confirm('添加成功！是否继续添加商品',"提示",{
              //   confirmButtonText: '确定',
              //   cancelButtonText: '取消',
              //   type:"warning",
              // }).then(() => {
              //   this.gotoAdd(null,3)
              // }).catch(() => {
              //   this.goBack()
              // })
            } else {
              this.$toast(res.subMsg)
            }
          })
        }
      },
      goBack(row) {
        this.$router.push({ path: '/goodsBase'})
      },
      listSysDict() {
        let sysDictList = localStorage.getItem('sysDictList') ? JSON.parse(
          localStorage.getItem('sysDictList')) : []
        this.typeList = sysDictList.filter(item => item.typeValue == 20221108)
        this.dataStatusList = sysDictList.filter(item => item.typeValue == 36)
      },
      // 登录按钮
      getImgUrl(actNo) {
        if (!actNo) {
          this.$toast('请输入货号')
          return false
        }
        fileApi.getImgUrl({ actNo }).then(res => {
          if (res.subCode === 1000) {
            this.$toast(res.subMsg)
            this.form.imgUrl = res.data.url
          } else {
            this.$toast(res.subMsg)
          }
        })
      },
      async handleImageSuccess(res, file) {
        this.$toast('上传成功')
        this.form.imgUrl = res.data
      },
      async handleImageError(res, file) {
        this.$toast('上传失败')
      },
      beforeImageUpload(file) {
        if (!this.form.actNo) {
          this.$toast('请输入货号')
          return false
        }
        this.uploadData = { actNo: this.form.actNo } // 上传携带的参数名
        if (!this.uploadData.actNo) {
          this.$toast('请输入货号')
          return false
        }
        const fileName = file.name
        const fileType = fileName.substring(fileName.lastIndexOf('.'))
        // jpeg,.png,.jpg,.bmp,.gif
        if (
          fileType === '.jpg' ||
          fileType === '.png' ||
          fileType === '.jpeg' ||
          fileType === '.bmp' ||
          fileType === '.gif'
        ) {
          // 不处理
        } else {
          this.$toast(
            '不是,jpeg,.png,.jpg,.bmp,.gif文件,请上传正确的图片类型'
          )
          return false
        }
      },
    }
  }

</script>

<style lang="less" scoped>
  @import '../assets/index/style.css';

  .login {
    >section {
      .tip {
        padding: 6vw 3vw;
        color:rgb(224, 145, 71);
        letter-spacing: 2px;
        font-size: 16px;
      }
    }
  }

</style>
