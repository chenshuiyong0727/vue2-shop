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
import { Popup } from 'mint-ui';
// 引入echarts
// import { VeLine } from 'v-charts-v2/lib/index.esm'
import VeLine from 'v-charts-v2/lib/line'
import VePie  from 'v-charts/lib/pie'


// 挂载到vue实例中
// Vue.prototype.$echarts = echarts
// import VCharts from 'v-charts-v2'
// import vcharts from 'v-charts'
// Vue.use(vcharts )
// Vue.use(VCharts);
Vue.use(ElementUI)
Vue.use(Mint);
Vue.config.productionTip = false
Vue.prototype.$api = api;
Vue.component(Popup.name, Popup);
Vue.component(VeLine.name, VeLine)
Vue.component(VePie.name, VePie)
// if (localStorage.getItem('org_token_auth')) {
// 用钩子函数beforeEach()对路由进行判断

router.beforeEach((to, from, next) => {
    if (to.meta.requireAuth) {  // 需要权限,进一步进行判断
      if (localStorage.getItem('org_token_auth')) {  // 通过vuex state获取当前的token是否存在
        next();
      }else {    //如果没有权限,重定向到登录页,进行登录
        next({
          path: '/login?flag=1',
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
