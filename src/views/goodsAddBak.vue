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
            style="height: 62vw"
            class="select100"
            v-if="form.imgUrl"
            :src="fileUrl + form.imgUrl"
          />
          <el-button :disabled="type == 1 " type="primary"  v-if="!form.imgUrl" size="small">上传图片</el-button >
          <el-button :disabled="type == 1 " type="primary"  v-if="form.imgUrl"  size="small">重新上传</el-button >
          <a :disabled="type == 1 " type="primary"  v-if="!form.imgUrl" size="small" @click="uploadMaterial">拍摄图片</a>
          <a :disabled="type == 1 " type="primary"  v-if="form.imgUrl" size="small" @click="uploadMaterial">重新拍摄</a>
        </el-upload>
      </mt-field>
<!--      <button @click="uploadMaterial()">-->
<!--       <input type="file" capture="user" accept="image/*" style="display:none;" ref="file" @click="e => {e.target.value = '';} " @change="getFileData"/>-->
<!--      </button>-->

      <input type="file" capture="user" accept="image/*" style="display:none" ref="file1" @click="e => {e.target.value = '';} " @change="getFileData"/>

<!--      <input type="file" id="photo" capture="user" accept="image/*" name="photo" :data="uploadData" @change="handleImageSuccess" />-->
      <mt-field label="类型">
          <select class="select100" v-model="form.type"  :disabled="type == 1 ">
            <option :disabled="true" value="" selected>请选择类型</option>
            <option v-for="x in typeList" :value="x.fieldValue">{{x.fieldName}}</option>
          </select>
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
import axios from 'axios'
import * as imageConversion from 'image-conversion'
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
      fileSize: 2,
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
        brand: '耐克',
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
    uploadMaterial() {
      this.$refs.file1.dispatchEvent(new MouseEvent("click"));
    },
    // 触发上传材料文件
    async getFileData() {
      let inputFile = this.$refs.file1.files[0];
      let filename = inputFile.name;
      let index = filename.lastIndexOf(".")
      filename = filename.substring(0, index)
      console.info(filename)
      let overSize = inputFile.size / 1024 / 1024
      console.info(overSize)
      if (overSize > 1) {
         inputFile = await imageConversion.compressAccurately(inputFile, 200)
        // inputFile = blob
        // this.$message.error('上传文件大小不能超过'+this.fileSize+'MB!')
      }
      overSize = inputFile.size / 1024 / 1024
      console.info(overSize)

      // let index = filename.lastIndexOf(".");
      // let suffix = filename.substring(index,filename.length).toLowerCase();
      // let isMarch = this.acceptType.indexOf(suffix) !== -1;
      // // let overSize = file.size / 1024 / 1024 < this.fileSize;
      // if (!isMarch) {
      //   this.$message.error(this.typeDesc)
      // }
      // 此处应向后台请求 后台保存上传文件名称返回fileId作为文件标识
      let param = {
        fileId: filename,
        file: inputFile
      };
      // this.uploadFile(param);
      this.uploadImg(param);
    },
    // async afterRead(file) {
    //   // 此时可以自行将文件上传至服务器
    //   console.log(file)
    //   file.status = 'uploading'
    //   file.message = '上传中...'
    //   // 将图片精确压缩到600kb
    //   const blob = await imageConversion.compressAccurately(file.file, 600)
    //   // Blob转FormData
    //   const formdata = new FormData()
    //   // append第三个参数为可选项，此处本项目接口需要
    //   formdata.append('file', blob, file.file.name)
    //   // 调用fileUpload接口
    //   const { code, data } = await fileUpload(formdata)
    //   // 此处code为接口定义状态码，本项目成功为0
    //   if (code === 0) {
    //     file.status = 'done'
    //     file.message = '上传成功'
    //     console.log(data)
    //   } else {
    //     file.status = 'failed'
    //     file.message = '上传失败'
    //   }
    // },
    // compressFile(file) {
    //   return new Promise((resolve, reject) => {
    //     new ImageCompressor(file, {
    //       quality: 0.6, //压缩质量
    //       checkOrientation: false, //图片翻转，默认为false
    //       success(result) {
    //         resolve(result);
    //       },
    //       error(e) {
    //         reject()
    //       }
    //     })
    //   })
    // },
    // async uploadMaterialImg(imgFile) {
    //   let This = this
    //   let file = await this.compressFile(imgFile)
    //   let formData = new FormData()
    //   formData.append('file', file)
    //   uploadMaterial(formData).then(res => {
    //     if (res.code == 200) {
    //       This.fileList.push({
    //         isImage: true,
    //         id: res.data.ossId,
    //         url: res.data.ossUrl,
    //         ossNameNew: res.data.ossNameNew,
    //         imagePath: res.data.ossUrl,
    //         imageName: res.data.ossName,
    //         imageType: This.materialsObj.materialsType
    //       })
    //
    //     } else {
    //       This.$toast(res.message)
    //     }
    //   }).catch(error => {
    //     This.$toast(error)
    //   })
    // },
    uploadImg(param) {
      let formData = new FormData();
      formData.set("actNo", param.fileId);
      formData.set("file", param.file);
      // Promise.all(this.promise).then(() => {
        let reopt = {
          method: 'post',
          url: '/gw/op/v1/file/uploadFileMinio',
          headers: {
            'Content-Type' : 'multipart/form-data'
          },
          data: formData
        }
        axios.request(reopt).then(res => {
          console.info(res)
          if (res.status === 200) {
            let data = res.data
        // console.info(data.code)
        // console.info(data.sub_code)
            if (data.code !== 1 ||data.sub_code != 1000) {
              this.$toast('上传失败')
            } else {
              this.$toast(data.sub_msg)
              this.form.imgUrl = data.data
            }
            // let picNetPath = res.request.responseURL.split('?')[0]
            // this.$emit('uploadSuccess', picNetPath)
            // 添加日志信息
            // this.uploadDoLog(picNetPath)
          } else {
            this.$toast('上传失败')
            // this.uploadError()
          }
        })
      // })
    },
    // 最后上传
    uploadFile(param) {
      let formData = new FormData();
      formData.set("actNo", param.fileId);
      formData.set("file", param.file);
      fileApi.upload({ formData }).then(res => {
        if (res.subCode === 1000) {
          this.$toast(res.subMsg)
          this.form.imgUrl = res.data.url
        } else {
          this.$toast(res.subMsg)
        }
      })
      // fileApi.upload({
      //   formData
      // }).then((res) => {
      //   console.info(res)
      //   this.$toast(res.subMsg);
      //   // if (res.subCode === 1000) {
      //   //   this.form = res.data ? res.data : {}
      //   //   this.form.sizeList = []
      //   //   this.sizeList = res.data.sizeListList
      //   //   for (let i = 0; i < res.data.sizeListList.length; i++) {
      //   //     this.form.sizeList.push(res.data.sizeListList[i][1])
      //   //   }
      //   // } else {
      //   //   this.$toast(res.subMsg)
      //   // }
      // });
    },

//     selectPhoto() {
//       let _this = this;
//       let file = document.getElementById("photo").files[0];
//       let content = null;
//       let readfile = new FileReader();
//       if (file != undefined) {
//         content = readfile.readAsDataURL(file, "UTF-8");
//         readfile.onload = function(event) {
//           content = event.target.result;
//           let blod = _this.base64ToFile(
//             content,
//             new Date().getTime() + ".png"
//           );
// //blod   手机相机拍的图片  fileChange()方法上传图片
//           _this.fileChange(blod);
//         };
//         readfile.onerror = function(event) {
//           console.log("err");
//         };
//       } else {
//         console.log("未拍照");
//       }
//     },
//
// //转为文件
//     base64ToFile(urlData, fileName) {
//       let arr = urlData.split(",");
//       let mime = arr[0].match(/:(.*?);/)[1];
//       let bytes = atob(arr[1]);
//       let n = bytes.length;
//       let ia = new Uint8Array(n);
//       while (n--) {
//         ia[n] = bytes.charCodeAt(n);
//       }
//       return new File([ia], fileName, { type: mime });
//     },
// //上传
//     async fileChange(file) {
//       if (file) {
//         let formData = new FormData();
//         formData.append("file", file);
//         formData.append("filePath", "/basicGovernance/informationAdd");
//         let { details, code } = await fileUpload(formData);
//         if (code == 200) {
//           this.idCardIdentify(details.data.filePath);
//         }
//       } else {
//         let formData = new FormData();
//         formData.append("file", this.$refs.fileUpload.files[0]);
//         formData.append("filePath", "/basicGovernance/informationAdd");
//         let { details, code } = await fileUpload(formData);
//         if (code == 200) {
//           this.idCardIdentify(details.data.filePath);
//         }
//       }
//     },
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
      if (!this.form.imgUrl) {
        this.$toast('请上传图片')
        return false
      }
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
            // this.$messagebox.confirm('添加成功！是否继续添加商品',"提示",{
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
      console.info(res)
      console.info(file)
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
