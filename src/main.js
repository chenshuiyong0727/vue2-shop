import Vue from 'vue'
import App from './App'
import router from './router'
import store from '@/vuex/store.js'   //vuex
import api from '@/http/api.js'       //http请求
import '@/utils/filter'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import Mint from 'mint-ui';    //移动端UI
import 'mint-ui/lib/style.css'
// import VeLine from 'v-charts-v2/lib/line'
import VeLine from 'v-charts/lib/line'
import VePie  from 'v-charts/lib/pie'
import VeHistogram from 'v-charts/lib/histogram.common'

import Vconsole from 'vconsole'
let vConsole = new Vconsole()
Vue.use(vConsole);
Vue.use(ElementUI);
Vue.use(Mint);
Vue.config.productionTip = false
Vue.prototype.$api = api;
Vue.component(VeLine.name, VeLine)
Vue.component(VePie.name, VePie)
Vue.component(VeHistogram.name,VeHistogram)

router.beforeEach((to, from, next) => {
    if (to.meta.requireAuth) {  // 需要权限,进一步进行判断
      if (localStorage.getItem('org_token_auth')) {  // 通过vuex state获取当前的token是否存在
        next();
      }else {    //如果没有权限,重定向到登录页,进行登录
        next({
          path: '/login',
          // path: '/login?flag=1',
          // query: {redirect: to.fullPath}  // 将跳转的路由path作为参数，登录成功后跳转到该路由
        })
      }
    }
    else { //不需要权限 直接跳转
      next();
    }
})


/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  template: '<App/>',
  components: { App }
})
