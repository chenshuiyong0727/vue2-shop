<template lang="html">
  <div class="login">
    <mt-header title="其他收支详情">
      <div slot="left">
        <mt-button  icon="back" @click="$router.go(-1)"></mt-button>
      </div>
      <div slot="right">
        <mt-button size="normal" style="font-size: 16px"  @click="submit">保存</mt-button>
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
        >
          <img
            :disabled="type == 1 "
            style="height: 62vw"
            class="select100"
            v-if="form.imgUrl"
            :src="fileUrl + form.imgUrl"
          />
          <el-button :disabled="type == 1 " type="text" class="select100" v-show="!form.imgUrl"  style=" margin-left: -108vw;"
          >上传图片
          </el-button
          >
        </el-upload>
      </mt-field>
      <mt-field label="类型">
<!--          <select class="select100" v-model="form.type"  :disabled="type == 1 ">-->
<!--            <option :disabled="true" value="" selected>请选择类型</option>-->
<!--            <option v-for="x in typeList" :value="x.fieldValue">{{x.fieldName}}</option>-->
<!--          </select>-->
<!--          <el-select size="small" class="select100" v-model="form.type" :disabled="type == 1 " >-->
<!--        <el-option :disabled="true" value="" selected>请选择类型</el-option>-->
<!--        <el-option-->
<!--          v-for="item in typeList"-->
<!--          :key="item.fieldValue"-->
<!--          :label="item.fieldName"-->
<!--          :value="+item.fieldValue">-->
<!--        </el-option>-->
<!--          </el-select>-->
        <select class=" select100_select select" v-model="form.type" :disabled="type == 1 " >
          <option label="请选择类型"  value=""></option>
          <option
            v-for="item in typeList"
            :key="item.fieldValue"
            :label="item.fieldName"
            :value="+item.fieldValue">
          </option>
        </select>
      </mt-field>
      <mt-field
        :disabled="type == 1 "
       label="货号"
        placeholder="请输入货号"
        type = "text"
        v-model = "form.actNo"
        >
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
       label="金额"
        placeholder="请输入金额"
        type = "number"
        v-model = "form.price"
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
    </section>
<!--    <div style="    margin-left: 20vw;-->
<!--    margin-top: 20px;">-->
<!--      <mt-button v-if="type != 1" style="bottom: 10px"-->
<!--        type="primary"-->
<!--        @click="submit">提交</mt-button>-->
<!--      <mt-button v-else style="bottom: 10px"-->
<!--        type="primary"-->
<!--        @click="goEdit">编辑</mt-button>-->
<!--      <mt-button style="bottom: 10px"-->
<!--        @click="$router.go(-1)">取消</mt-button>-->
<!--      <mt-button style="bottom: 10px"-->
<!--        type="primary"-->
<!--        @click="gotoIndex">回到首页</mt-button>-->
<!--    </div>-->


  </div>
</template>

<script>
import Header from '@/common/_header.vue'
import { goodsOtherApi } from '@/api/goodsOther'

export default {
  components:{
    'v-header':Header
  },
  data(){
    return {
      form: {
        type: 2,
        actNo: '',
        name: '',
        imgUrl: '',
        brand: '',
        remark: '',
        price: ''
      },
      fileUrl: fileUrl,
      typeList: [],
      dataStatusList: [],
      type: '',
      id: '',
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
    this.listSysDict()
  },
  methods:{
    getDetailById(id) {
      if (id) {
        goodsOtherApi.getDetailById(id).then(res => {
          if (res.subCode === 1000) {
            this.form = res.data ? res.data : {}
          } else {
            this.$toast(res.subMsg)
          }
        })
      }
    },
    goEdit() {
      this.type = 2
    },
    gotoAdd(id, type) {
      this.$router.push({ path: '/goodsAdd', query: { id, type } })
    },
    gotoIndex() {
      this.$router.push({ path: '/'})
    },
    submit() {
      if (!this.form.type) {
        this.$toast('类型非空')
        return false
      }
      if (!this.form.price) {
        this.$toast('金额非空')
        return false
      }
      if (!this.form.name) {
        this.$toast('名称非空')
        return false
      }
      if (this.form.price > 0 && this.form.type == 2) {
        this.form.price = 0 - this.form.price
      }
      if (this.type == 2) {
        goodsOtherApi.update(this.form).then(res => {
          if (res.subCode === 1000) {
            this.$toast('操作成功')
            this.goBack()
          } else {
            this.$toast(res.subMsg)
          }
        })
      } else {
        goodsOtherApi.add(this.form).then(res => {
          if (res.subCode === 1000) {
            this.$toast('添加成功，即将返回列表')
            this.goBack()
          } else {
            this.$toast(res.subMsg)
          }
        })
      }
    },
    goBack() {
      this.$router.push({ path: '/otherList'})
    },
    listSysDict() {
      let sysDictList = localStorage.getItem('sysDictList') ? JSON.parse(
        localStorage.getItem('sysDictList')) : []
      this.typeList = sysDictList.filter(item => item.typeValue == 39)
      this.dataStatusList = sysDictList.filter(item => item.typeValue == 36)
    },
    async handleImageSuccess(res, file) {
      this.$toast('上传成功')
      this.form.imgUrl = res.data
    },
    async handleImageError(res, file) {
      this.$toast('上传失败')
    },
    beforeImageUpload(file) {
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
