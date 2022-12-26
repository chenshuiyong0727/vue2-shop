<template lang="html">
  <div class="login">
    <v-header>
      <h1 slot="title">登录页</h1>
    </v-header>
    <section>
      <mt-field
       label="账号"
        placeholder="请输入账号"
        type = "text"
        v-model = "loginForm.loginAccount"
        :readonly = '!toggle'
        :disableClear = '!toggle'
        ></mt-field>
      <mt-field
       label="密码"
       placeholder="请输入密码"
       type="password"
       v-model="loginForm.loginPassword"
       :readonly='!toggle'
       :disableClear = '!toggle'
        ></mt-field>
<!--      <mt-field-->
<!--       label="验证码"-->
<!--       placeholder="请输入验证码"-->
<!--       type="text"-->
<!--       v-model="verifyCode"-->
<!--       :readonly='!toggle'-->
<!--       :disableClear = '!toggle'-->
<!--        ></mt-field>-->
<!--      <p class="tip">Tip : 账号密码随便输</p>-->
    </section>
    <mt-button
     plain
     size="large"
     @click="login"
     v-if='toggle'>登录</mt-button>
    <mt-button
     plain
     size="large"
     @click="logout"
     v-else>退出登录</mt-button>

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
      flag: '',
      toggle:!this.$store.state.login.token
    }
  },
  created() {
    const { flag } = this.$route.query
    this.flag = flag
  },
  mounted() {
    if (this.flag ===1 || this.flag === '1') {
      Toast('请先登录');
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
      //   this.$message.error("账号密码不能为空")
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
            this.gotopath()
          }
        } else {
          Toast(res.subMsg)
        // this.$message.error(res.subMsg)
      }
    })
      // this.$store.dispatch('user/login', loginInfo).then((res) => {
      //   // this.loading = false
      //   if (res.data) {
      //     // 初始化字典
      //     this.gotopath()
      //   } else {
      //     this.$message.error(res.subMsg)
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
