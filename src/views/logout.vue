<template lang="html">
  <div class="login">
    <v-header>
      <h1 slot="title">设置</h1>
    </v-header>
    <mt-button
     plain
     size="large"
     @click="logout">退出登录</mt-button>

  </div>
</template>

<script>
import Header from '@/common/_header.vue'
import { userContainerApi } from '@/api/user'
import { removeCookieByName } from '@/utils/auth'
import { Toast } from 'mint-ui'
export default {
  components:{
    'v-header':Header
  },
  data(){
    return {
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
