<template lang="html">
  <div class="login">
    <mt-header title="备忘录详情">
      <div slot="left">
        <mt-button  icon="back" @click="$router.go(-1)"></mt-button>
      </div>
      <div slot="right">
        <mt-button size="normal" style="font-size: 16px"  @click="submit">保存</mt-button>
      </div>
    </mt-header>
    <section style="margin-top: 70px;">
      <mt-field
        :disabled="type == 1 "
        label="事项名称"
        placeholder="请输入事项名称"
        type = "text"
        v-model = "form.name"
      >
      </mt-field>
      <mt-field label="类型">
<!--        <el-select size="small" class="select100" v-model="form.type" :disabled="type == 1 " >-->
<!--        <el-option :disabled="true" value="" selected>请选择类型</el-option>-->
<!--        <el-option-->
<!--          v-for="item in typeList"-->
<!--          :key="item.fieldValue"-->
<!--          :label="item.fieldName"-->
<!--          :value="+item.fieldValue">-->
<!--        </el-option>-->
<!--          </el-select>-->
        <select class=" select100_select select" v-model="form.type" :disabled="type == 1 ">
          <option label="请选择类型"  value=""></option>
          <option
            v-for="item in typeList"
            :key="item.fieldValue"
            :label="item.fieldName"
            :value="+item.fieldValue">
          </option>
        </select>
      </mt-field>
      <mt-field label="日历类型">
<!--        <el-select size="small" class="select100" v-model="form.dateType" :disabled="type == 1 " >-->
<!--        <el-option :disabled="true" value="" selected>请选择日历类型</el-option>-->
<!--        <el-option-->
<!--          v-for="item in dateTypeList"-->
<!--          :key="item.fieldValue"-->
<!--          :label="item.fieldName"-->
<!--          :value="+item.fieldValue">-->
<!--        </el-option>-->
<!--          </el-select>-->
        <select class=" select100_select select" v-model="form.type" :disabled="type == 1 ">
          <option label="请选择日历类型"  value=""></option>
          <option
            v-for="item in dateTypeList"
            :key="item.fieldValue"
            :label="item.fieldName"
            :value="+item.fieldValue">
          </option>
        </select>
      </mt-field>
      <mt-field
        v-if="form.type == 2 || form.dateType == 2"
        :disabled="type == 1 "
       label="时间"
        placeholder="请输入MM-dd或者yyyy-MM-dd"
        type = "text"
        v-model = "form.happenTime"
        >
      </mt-field>
      <mt-field
        v-else
        :disabled="type == 1 "
       label="时间"
        placeholder="请输入1到31数字"
        type = "text"
        v-model = "form.happenTime"
        >
      </mt-field>

      <mt-field
        :disabled="type == 1 "
        label="提醒标题"
        placeholder="请输入提醒标题"
        type = "textarea"
        v-model = "form.title"
        rows="4"
      >
      </mt-field>
      <mt-field
        :disabled="type == 1 "
        label="提醒内容"
        placeholder="请输入提醒内容"
        type = "textarea"
        v-model = "form.content"
        rows="4"
      >
      </mt-field>
    </section>
  </div>
</template>

<script>
import Header from '@/common/_header.vue'
import { memoApi } from '@/api/memo'


export default {
  components:{
    'v-header':Header
  },
  data(){
    return {
      form: {
        name: '',
        happenTime: '',
        type: 1,
        dateType: 1,
        title: '',
        content: ''
      },
      fileUrl: fileUrl,
      typeList: [],
      dateTypeList: [],
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
        memoApi.getDetailById(id).then(res => {
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
      if (!this.form.name) {
        this.$toast('名称非空')
        return false
      }
      if (!this.form.type) {
        this.$toast('类型非空')
        return false
      }
      if (!this.form.happenTime) {
        this.$toast('时间非空')
        return false
      }
      if (!this.form.dateType) {
        this.$toast('日历类型非空')
        return false
      }
      if (!this.form.title) {
        this.$toast('提醒标题非空')
        return false
      }
      if (!this.form.content) {
        this.$toast('提醒内容非空')
        return false
      }
      if(this.form.type == 1){
        let happenTime = this.form.happenTime
        if(happenTime.startsWith('0')){
          this.form.happenTime = happenTime.substring(1,happenTime.length)
        }
        const reg = /^([1-9]|[1-2][0-9]|3[0-1])$/
        if(!reg.test(this.form.happenTime)){
          this.$toast('请输入1到31数字')
          return false
        }
        if(this.form.happenTime > 31 || this.form.happenTime < 1){
          this.$toast('请输入1到31数字')
          return false
        }
        if (this.form.happenTime < 9){
          this.form.happenTime = '0'+this.form.happenTime
        }
      }else{
        let happenTime = this.form.happenTime
        const reg1 = /^(0?[1-9]|1[0-2])-(0?[1-9]|[1-2][0-9]|3[0-1])$/;
        let reg2 = /^(\d{4})-(\d{2})-(\d{2})$/
        if(!reg1.test(happenTime) && !reg2.test(happenTime)){
          this.$toast('请输入 MM-dd (07-27) 或者 yyyy-MM-dd (2018-09-19')
          return false
        }
      }
      if (this.type == 2) {
        memoApi.update(this.form).then(res => {
          if (res.subCode === 1000) {
            this.$toast('操作成功')
            this.goBack()
          } else {
            this.$toast(res.subMsg)
          }
        })
      } else {
        memoApi.add(this.form).then(res => {
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
      this.$router.push({ path: '/memo'})
    },
    listSysDict() {
      let sysDictList = localStorage.getItem('sysDictList') ? JSON.parse(
        localStorage.getItem('sysDictList')) : []
      this.typeList = sysDictList.filter(item => item.typeValue == 49)
      this.dateTypeList = sysDictList.filter(item => item.typeValue == 50)
    },
  }
}

</script>

<style lang="less" scoped>
  @import '../assets/index/style.css';

  .login {
    background-color: #ffffff;
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
