<template lang="html">
  <div class="login">
    <mt-header title="用户详情">
      <div slot="left">
        <mt-button  icon="back" @click="$router.go(-1)"></mt-button>
      </div>
      <div slot="right">
        <mt-button size="normal" style="font-size: 16px"  @click="submit">保存</mt-button>
      </div>
    </mt-header>
    <section style="padding-top:46px">
      <mt-field
        label="头像"
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
            style="height: 30vw;width: 30vw; margin-left: -90vw;"
            class="select100"
            v-if="form.imgUrl"
            :src="fileUrl + form.imgUrl"
          />
          <el-button :disabled="type == 1 " style=" margin-left: -97vw;" type="primary"
                     v-else  size="small"
          >上传头像
          </el-button
          >
        </el-upload>
      </mt-field>
      <mt-field
        :disabled="true"
       label="账号"
        placeholder="请输入账号"
        type = "text"
        v-model = "form.userAccount"
        >
      </mt-field>
      <mt-field
        :disabled="type == 1 "
       label="用户手机"
        placeholder="请输入用户手机"
        type = "number"
        v-model = "form.userMobile"
        >
      </mt-field>
      <mt-field
        :disabled="type == 1 "
       label="姓名"
        placeholder="请输入姓名"
        type = "text"
        v-model = "form.userRealName"
        >
      </mt-field>
    </section>


  </div>
</template>

<script>
import Header from '@/common/_header.vue'
// import { goodsOtherApi } from '@/api/goodsOther'
import { userContainerApi } from '@/api/user'
import * as imageConversion from 'image-conversion'
import { hideLoading, showLoading } from '@/components/Loading/loading'

export default {
  components:{
    'v-header':Header
  },
  data(){
    return {
      form: {
        userMobile: '',
        userRealName: '',
        imgUrl: ''
      },
      fileUrl: fileUrl,
      type: ''
    }
  },
  created() {
    this.getUcUser()
  },
  methods:{
    getUcUser() {
      userContainerApi.getUcUser().then(res => {
        if (res.subCode === 1000) {
          this.form = res.data ? res.data : {}
        } else {
          this.$toast(res.subMsg)
        }
      })
    },
    // goEdit() {
    //   this.type = 2
    // },
    // gotoAdd(id, type) {
    //   this.$router.push({ path: '/goodsAdd', query: { id, type } })
    // },
    // gotoIndex() {
    //   this.$router.push({ path: '/'})
    // },
    submit() {
      if (!this.form.imgUrl) {
        this.$toast('请上传头像')
        return false
      }
      if (!this.form.userMobile) {
        this.$toast('请输入手机')
        return false
      }
      if (!this.form.userRealName) {
        this.$toast('请输入姓名')
        return false
      }
      userContainerApi.update(this.form).then(res => {
        if (res.subCode === 1000) {
          this.$toast('修改成功')
          this.$router.go(-1)
        } else {
          this.$toast(res.subMsg)
        }
      })
      // userContainerApi.update(this.form).then(res => {
      //   console.info(res)
      //   if (res.subCode === 1000) {
      //     this.$toast('操作成功')
      //   } else {
      //     this.$toast(res.subMsg)
      //   }
      // })
      //
      // userContainerApi.update(this.form).then(res => {
      //   if (res.subCode === 1000) {
      //     this.$toast('操作成功')
      //     this.goBack()
      //   } else {
      //     this.$toast(res.subMsg)
      //   }
      // })
    },
    // goBack() {
    //   this.$router.push({ path: '/otherList'})
    // },
    async handleImageSuccess(res, file) {
      hideLoading()
      this.$toast('上传成功')
      this.form.imgUrl = res.data
    },
    async handleImageError(res, file) {
      hideLoading()
      this.$toast('上传失败')
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
      showLoading()
      let overSize = file.size / 1024 / 1024
      console.info("size1",overSize)
      if (overSize > 1) {
        file = await imageConversion.compressAccurately(file, 200)
      }
      overSize = file.size / 1024 / 1024
      console.info("size2",overSize)
      return file
    },
    // beforeImageUpload(file) {
    //   const fileName = file.name
    //   const fileType = fileName.substring(fileName.lastIndexOf('.'))
    //   if (
    //     fileType === '.jpg' ||
    //     fileType === '.png' ||
    //     fileType === '.jpeg' ||
    //     fileType === '.bmp' ||
    //     fileType === '.gif'
    //   ) {
    //   } else {
    //     this.$toast(
    //       '不是,jpeg,.png,.jpg,.bmp,.gif文件,请上传正确的图片类型'
    //     )
    //     return false
    //   }
    // },
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
