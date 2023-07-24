<template lang="html">
  <div class="login_new" >
    <mt-header :title="title">
      <div slot="left">
        <mt-button  icon="back" @click="$router.go(-1)"></mt-button>
      </div>
    </mt-header>
    <div style="
    font-size: 10px;
    padding-top: 15vw;
    padding-left: 4vw;
    max-width: 264px!important;
    max-height: 494px!important;
    margin: 42px auto!important;
    width: 100%!important;
    height: 336px!important;
    display: flex;
    flex-direction: column;
    align-items: center;
" >
      <h5 style="font-size: 15px;margin-top: 40px;color: #999;">当前账号</h5>
      <h5 style="font-size: 35px; font-weight: 600; margin-top: 20px;">{{
         userName ? userName : '系统用户'
        }}</h5>
      <div class="clearfix btm-distance" v-if="type == 1">
        <el-button style="margin-top: 42px;" type="primary" @click="comfirm">退出登录</el-button>
        <el-button  @click="comfirm1">切换账号</el-button>
      </div>
      <div class="clearfix btm-distance" v-else>
        <el-button style="margin-top: 42px;" type="primary" @click="comfirm2">修改密码</el-button>
      </div>
    </div>


  </div>
</template>

<script>
import Header from '@/common/_header.vue'
import { userContainerApi } from '@/api/user'
import { removeCookieByName } from '@/utils/auth'
import { changeTitle } from '@/utils/index'

import { Toast } from 'mint-ui'
export default {
  components:{
    'v-header':Header
  },
  created() {
    const { type } = this.$route.query
    this.type = type
    if (this.type == 2) {
      this.title = '账户管理'
    }
  },
  mounted() {
    changeTitle()
  },
  data(){
    return {
      type:'1',
      title: '账号设置',
      userName: localStorage.getItem('user_name')
    }
  },
  methods:{
    //退出登录按钮
    logout(){
      userContainerApi.logout().then(res => {
        if (res.subCode === 1000) {
          removeCookieByName('org_token_auth')
          removeCookieByName('refresh_org_token_auth')
          removeCookieByName('user_id')
          localStorage.clear() // remove all session
          Toast('退出登录成功');
          this.$router.push({ path: '/login' })
        }
      })
    },
    comfirm(){
      this.$confirm('确认退出登录',"提示",{
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type:"warning",
      }).then(() => {
        this.logout()
        // this.gotoAdd(null,3)
      }).catch(() => {
        // this.goBack()
      })
    },
    comfirm1(){
      this.$confirm('确认切换账号',"提示",{
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type:"warning",
      }).then(() => {
        this.logout()
        // this.gotoAdd(null,3)
      }).catch(() => {
        // this.goBack()
      })
    },
    comfirm2(){
        this.$router.push({ path: '/resetPwd'})
    },

  }
}

</script>

<style lang="less" scoped>
  @import '../assets/fz.less';
  @import '../assets/index/style.css';
  @import '../assets/user/icon/carstyle.css';
  * {
    /*margin: 0;*/
    /*padding: 0;*/
    box-sizing: border-box;
  }
  /* 这里直接设置 1rem = 50px begin */
  html {
    font-size: 10px;
  }
  /* 这里直接设置 1rem = 50px end */
  html,
  body {
    /*font-family: "微软雅黑";*/
    /*color: #333;*/
    /*background: #fff;*/
  }
/*.login {*/
/*  >section {*/
/*    .tip {*/
/*      padding: 6vw 3vw;*/
/*      color:rgb(224, 145, 71);*/
/*      letter-spacing: 2px;*/
/*      font-size: 16px;*/
/*    }*/
/*  }*/
/*}*/
  .clearfix {
    &:after {
      visibility: hidden;
      display: block;
      font-size: 0;
      content: " ";
      clear: both;
      height: 0;
    }
  }
</style>
