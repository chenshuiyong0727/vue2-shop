<template lang="html">
  <div class="login_new">
    <mt-header title="">
    </mt-header>
    <div style="
    font-size: 10px;
    padding-top: 15vw;
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

      <section class="login_form"  style="margin-top: 30px">
        <el-input
          placeholder="请输入账号"
          clearable
          prefix-icon="el-icon-s-custom"
          v-model = "loginForm.loginAccount"
          >
        </el-input>
        <el-input
          style="margin-top: 10px"
          clearable
          placeholder="请输入验证码"
          prefix-icon="el-icon-warning"
          v-model="loginForm.verifyCode">
          <el-button slot="append" v-if="this.countDownNum == 60 || this.countDownNum == 0" @click="getCode">{{codeText}}</el-button>
          <el-button slot="append" v-else >{{this.countDownNum}} 秒</el-button>
        </el-input>
<!--        <el-input placeholder="请输入内容" v-model="input2">-->
<!--          <template slot="append">.com</template>-->
<!--        </el-input>-->
      </section>
      <div class="clearfix btm-distance">
        <el-button style="margin-top: 25px;    width: 50vw;" type="primary" @click="login">登录</el-button>
                </div>
      <div class="clearfix btm-distance">
        <el-button style="margin-top: 15px;    width: 50vw;" type="text" @click="loginByCode">账号密码登录</el-button>
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
        // loginPassword: '',
        accountType: 1,
        loginSystem: '12',
        verifyCode: ''
      },
      countDownNum:60,
      codeText:"获取验证码",
      isSend: 0,
      // account:'',
      // password:'',
      // flag: '',
    }
  },
  // created() {
  //   const { flag } = this.$route.query
  //   this.flag = flag
  // },
  // mounted() {
  //   if (localStorage.getItem('org_token_auth')) {
  //     Toast('您处于登录状态，自动为您跳转到活动页');
  //     this.$router.push({ path: '/goodsAct'})
  //   }
  // },
  methods:{
    // 登录按钮
    loginByCode(){
      this.$router.push({ path: '/login' })
    },
    // 登录按钮
    login(){
        if(this.loginForm.loginAccount=="" || this.loginForm.verifyCode=="") {
          Toast('账号，验证码不能为空');
          return
        }
        let loginInfo = deepCopy(this.loginForm)
        // loginInfo.loginPassword = encrypt(loginInfo.loginPassword, '58d10555a17a4039')
        userContainerApi.regeditOrLogin(loginInfo).then(res => {
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
              localStorage.setItem('refresh_org_token_auth', data.refreshToken)
              localStorage.setItem('user_id', data.userId)
              localStorage.setItem('user_name', data.userAccount)
              localStorage.setItem('isActUser', data.isActUser)
              localStorage.setItem('userRealName', data.userRealName)
              if (data.isActUser == 1) {
                initSysDict().then(() => {
                  this.$router.push({ path: '/goodsAct' })
                })
              }
            }
          } else {
            Toast(res.subMsg)
        }
      })
    },
    countDown:function(){
      this.timer=setInterval(() => {
        this.countDownNum--;
        if(this.countDownNum<=0){
          clearInterval(this.timer);
        }
      },1000);
    },
    getCode(){
      if(this.loginForm.loginAccount=="") {
        Toast('验证码不能为空');
        return
      }
      let loginInfo = deepCopy(this.loginForm)
      userContainerApi.sendPhoneVal(loginInfo).then(res => {
        if (res.subCode === 1000) {
          Toast("发送成功")
          this.countDown()
        } else {
          Toast(res.subMsg)
      }
    })
    },
    //退出登录按钮
    logout(){
      Toast('退出登录成功,清除token');
      this.$store.commit('CHANGE_TOKEN',0);
      this.loginForm.loginAccount = '';
      this.loginForm.verifyCode = '';

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
