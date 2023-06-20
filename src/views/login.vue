<template lang="html">
  <div class="login">
    <mt-header title="移动仓库">
    </mt-header>
    <div style="
    font-size: 10px;
    padding-top: 13.4vw;
    padding-left: 0vw;
    max-width: 264px!important;
    max-height: 494px!important;
    margin: 42px auto!important;
    width: 100%!important;
    height: 336px!important;
    display: flex;
    flex-direction: column;
    align-items: center;
" >
      <div>
        <img style="
        margin-left: 72px;
        margin-top: 20px;
    margin-bottom: -3px;
    width: 14.2vw;
    display: block;
    top: 0px;
    left: 0px;
" src="../../static/img/logo/logo.png" ></img>
        <h5 style="font-size: 25px; font-weight: 600; margin-top: 17px;">欢迎来到移动仓库</h5>
      </div>

      <section style="margin-top: 30px">
        <el-input
          placeholder="请输入账号"
          prefix-icon="el-icon-s-custom"
          v-model = "loginForm.loginAccount"
          :readonly = '!toggle'
          :disableClear = '!toggle'>
        </el-input>
        <el-input
          show-password
          style="margin-top: 10px"
          placeholder="请输入密码"
          prefix-icon="el-icon-warning"
          type="password"
          v-model="loginForm.loginPassword"
          :readonly='!toggle'
          :disableClear = '!toggle'>
        </el-input>
      </section>
      <div class="clearfix btm-distance">
        <el-button style="margin-top: 25px;    width: 50vw;" type="primary" @click="login" v-if='toggle'>登录</el-button>
                </div>
              </div>

  </div>
</template>

<script>
import Header from '@/common/_header.vue'
import { deepCopy, encrypt } from '@/utils'
import { initSysDict } from '@/utils/initRequest'
import { userContainerApi } from '@/api/user'

import { Toast } from 'mint-ui'
export default {
  components:{
    'v-header':Header
  },
  data(){
    return {
      loginForm: {
        loginAccount: '',
        loginPassword: '',
        accountType: 1,
        loginSystem: '12'
        // verifyCode: ''
      },
      // account:'',
      // password:'',
      // flag: '',
      toggle:!this.$store.state.login.token
    }
  },
  // created() {
  //   const { flag } = this.$route.query
  //   this.flag = flag
  // },
  mounted() {
    if (localStorage.getItem('org_token_auth')) {
      Toast('您处于登录状态，自动为您跳转到首页');
      this.$router.push({ path: '/'})
    }
  },
  methods:{
    // 登录按钮
    login(){
      if(this.loginForm.loginAccount=="" || this.loginForm.loginPassword=="") {
        // Toast('登录成功,存储token,跳转网页');
        // this.toggle = false;
        // this.$store.commit('CHANGE_TOKEN',1);
      // }else {
      //   this.$toast("账号密码不能为空")
        Toast('账号密码不能为空');
        return
      }
      let loginInfo = deepCopy(this.loginForm)
      loginInfo.loginPassword = encrypt(loginInfo.loginPassword, '58d10555a17a4039')
      userContainerApi.login(loginInfo).then(res => {
        if (res.subCode === 1000) {
          Toast("登录成功")
          if (res.data) {
            const { data } = res
            localStorage.setItem('functionList',
              JSON.stringify(data.functionList))
            localStorage.setItem('org_token_auth', data.token)
            localStorage.setItem('tokenExpireTime', data.tokenExpireTime)
            localStorage.setItem('projectList', JSON.stringify(data.projectList))
            localStorage.setItem('systemList', JSON.stringify(data.systemList))
            // commit('SET_TOKEN', data.token)
            // // commit('SET_SESSION_ID', data.sessionId)
            // commit('SET_USER_ID', data.userId)
            // commit('SET_NAME', data.userAccount)
            // localStorage.setItem('org_token_auth', data.token)
            // localStorage.setItem('session_id', data.sessionId)
            localStorage.setItem('refresh_org_token_auth', data.refreshToken)
            localStorage.setItem('user_id', data.userId)
            localStorage.setItem('user_name', data.userAccount)
            localStorage.setItem('isActUser', data.isActUser)
            if (data.isActUser == 1) {
              initSysDict().then(() => {
                this.$router.push({ path: '/goodsAct' })
              })
            } else{
              this.gotopath()
            }
          }
        } else {
          Toast(res.subMsg)
        // this.$toast(res.subMsg)
      }
    })
      // this.$store.dispatch('user/login', loginInfo).then((res) => {
      //   // this.loading = false
      //   if (res.data) {
      //     // 初始化字典
      //     this.gotopath()
      //   } else {
      //     this.$toast(res.subMsg)
      //     this.refreshCodeHandle()
      //   }
      // }).catch(() => {
      //   this.loading = false
      // })
      //
      // setTimeout(()=>{
      //   this.$router.replace({
      //     path: 'user'
      //   })
      // },1000);
      // 登录成
    },
    gotopath() {
      initSysDict().then(() => {
        // let functionList = JSON.parse(localStorage.getItem('functionList'))
        // // console.info(functionList)
        // const allRouter = functionList.filter(item => item.functionType == '1' && item.route)
        // allRouter.sort((a, b) => {
        //   return a.sort - b.sort
        // })
        // const isHasRouterAuth = functionList.filter(
        //   item => item.functionType == '1' && item.route && item.route == this.redirect)
        // if (!isHasRouterAuth.length) {
        //   this.redirect = allRouter[0].route
        // }
        this.$router.push({ path: '/' })
      })
    },
    //退出登录按钮
    logout(){
      Toast('退出登录成功,清除token');
      this.$store.commit('CHANGE_TOKEN',0);
      this.toggle = true;
      this.loginAccount = '';
      this.password = '';

    }
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
.login {
  >section {
    .tip {
      color:rgb(224, 145, 71);
      letter-spacing: 2px;
      font-size: 16px;
    }
  }
}
</style>
