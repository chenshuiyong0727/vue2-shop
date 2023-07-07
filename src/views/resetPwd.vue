<template lang="html">
  <div class="login_new">
    <mt-header title="修改密码">
      <div slot="left">
        <mt-button  icon="back" @click="$router.go(-1)"></mt-button>
      </div>
    </mt-header>
    <div style="
    font-size: 10px;
    padding-top: 20vw;
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

      <section class="login_form" style="margin-top: 30px">
        <el-input
          show-password
          style="margin-top: 10px"
          placeholder="原密码"
          prefix-icon="el-icon-warning"
          type="password"
          v-model="param.oldPwd">
        </el-input>
        <el-input
          show-password
          style="margin-top: 10px"
          placeholder="新密码"
          prefix-icon="el-icon-warning"
          type="password"
          v-model="param.newPwd">
        </el-input>
        <el-input
          show-password
          style="margin-top: 10px"
          placeholder="确认密码"
          prefix-icon="el-icon-warning"
          type="password"
          v-model="param.confirmPwd">
        </el-input>
      </section>
      <div class="clearfix btm-distance">
        <el-button style="margin-top: 25px;" type="primary" @click="modifyPwd" >确认修改</el-button>
        <el-button  @click="$router.go(-1)" >取消</el-button>
                </div>
              </div>
  </div>
</template>

<script>
import Header from '@/common/_header.vue'
import { systemContainerApi } from '@/api/systemManage'
import { userContainerApi } from '@/api/user'
import { removeCookieByName } from '@/utils/auth'
import { Toast } from 'mint-ui'
export default {
  components: {
    'v-header': Header
  },
  data() {
    return {
      userName: localStorage.getItem('user_name'),
      param: {
        oldPwd: '',
        newPwd: '',
        confirmPwd: ''
      }
    }
  },
  methods: {
    // 登录按钮
    modifyPwd() {
      let userId = localStorage.getItem('user_id')
      systemContainerApi.updateUserPwd({...this.param, id: userId}).then(async res => {
        if (res.subCode === 1000) {
          this.logout()
          Toast('修改成功，即将重新登录');
        } else {
          Toast(res.subMsg)
        }
      })
    },
    logout(){
      userContainerApi.logout().then(res => {
        if (res.subCode === 1000) {
          removeCookieByName('org_token_auth')
          removeCookieByName('refresh_org_token_auth')
          removeCookieByName('user_id')
          localStorage.clear() // remove all session
          // Toast('退出登录成功');
          this.$router.push({ path: '/login' })
        }
      })
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
