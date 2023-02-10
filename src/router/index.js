import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router);
//按需加载,当渲染其他页面时才加载其组件,并缓存,减少首屏加载时间
const Index = resolve => require(['@/views/Index.vue'], resolve)
const User = resolve => require(['@/views/User.vue'], resolve)
const Order = resolve => require(['@/views/OrderAll.vue'], resolve)
const orderDetail = resolve => require(['@/views/orderDetail.vue'], resolve)
const putin = resolve => require(['@/views/putin.vue'], resolve)
const putinDetail = resolve => require(['@/views/putinDetail.vue'], resolve)
const putinDayDetail = resolve => require(['@/views/putinDetail.vue'], resolve)
const sellList = resolve => require(['@/views/sellList.vue'], resolve)
const otherList = resolve => require(['@/views/otherList.vue'], resolve)
const otherAdd = resolve => require(['@/views/otherAdd.vue'], resolve)
const resetPwd = resolve => require(['@/views/resetPwd.vue'], resolve)
const storeAdd = resolve => require(['@/views/storeAdd.vue'], resolve)
const GoodsAdd = resolve => require(['@/views/goodsAdd.vue'], resolve)
const GoodsBase = resolve => require(['@/views/GoodsBase.vue'], resolve)
const Warehouse = resolve => require(['@/views/Warehouse.vue'], resolve)
const WarehouseDetail = resolve => require(['@/views/WarehouseDetail.vue'], resolve)
const OpenWarehouse = resolve => require(['@/views/OpenWarehouse.vue'], resolve)
const Login = resolve => require(['@/views/login.vue'], resolve)
const logout = resolve => require(['@/views/logout.vue'], resolve)


export default new Router({
  routes: [
    {
      path: '/',
      name: '首页',
      component: Index,
      meta: {
        requireAuth: true,  // 添加该字段，表示进入这个路由是需要登录才能进入的
      },
    },
    {
      path: '/home',
      name: '首页',
      component: Index,
      meta: {
        requireAuth: true,  // 添加该字段，表示进入这个路由是需要登录才能进入的
      },
    },
    {
      path: '/user',
      name: '用户页',
      component: User,
      meta: {
           requireAuth: true,  // 添加该字段，表示进入这个路由是需要登录才能进入的
       },
    }, {
      path: '/order',
      name: '订单',
      component: Order,
      meta: {
        requireAuth: true,  // 添加该字段，表示进入这个路由是需要登录才能进入的
      },
    }, {
      path: '/orderDetail',
      name: '订单详情',
      component: orderDetail,
      meta: {
        requireAuth: true,  // 添加该字段，表示进入这个路由是需要登录才能进入的
      },
    }, {
      path: '/store',
      name: '仓库',
      component: Warehouse,
      meta: {
        requireAuth: true,  // 添加该字段，表示进入这个路由是需要登录才能进入的
      },
    }, {
      path: '/goodsBase',
      name: '商品基本信息',
      component: GoodsBase,
      meta: {
        requireAuth: true,  // 添加该字段，表示进入这个路由是需要登录才能进入的
      },
    }, {
      path: '/goodsAdd',
      name: '商品详情',
      component: GoodsAdd,
      meta: {
        requireAuth: true,  // 添加该字段，表示进入这个路由是需要登录才能进入的
      },
    }, {
      path: '/storeAdd',
      name: '库存添加',
      component: storeAdd,
      meta: {
        requireAuth: true,  // 添加该字段，表示进入这个路由是需要登录才能进入的
      },
    }, {
      path: '/WarehouseDetail',
      name: '库存明细',
      component: WarehouseDetail,
      meta: {
        requireAuth: true,  // 添加该字段，表示进入这个路由是需要登录才能进入的
      },
    }, {
      path: '/resetPwd',
      name: '修改密码',
      component: resetPwd,
      meta: {
        requireAuth: true,  // 添加该字段，表示进入这个路由是需要登录才能进入的
      },
    }, {
      path: '/putin',
      name: '入库报表',
      component: putin,
      meta: {
        requireAuth: true,  // 添加该字段，表示进入这个路由是需要登录才能进入的
      },
      // children: [
      //   {
      //     path: 'detail',
      //     name: 'detail',
      //     component: putinDetail,
      //     meta: {  requireAuth: true }
      //   },
      //   {
      //     path: 'dayDetail',
      //     name: 'dayDetail',
      //     component: putinDayDetail,
      //     meta: {  requireAuth: true }
      //   }
      // ]
    }, {
      path: '/putinDetail',
      name: '月度入库报表',
      component: putinDetail,
      meta: {
        requireAuth: true,  // 添加该字段，表示进入这个路由是需要登录才能进入的
      },
    }, {
      path: '/sellList',
      name: '销售报表',
      component: sellList,
      meta: {
        requireAuth: true,  // 添加该字段，表示进入这个路由是需要登录才能进入的
      },
    }, {
      path: '/otherList',
      name: '其他收支',
      component: otherList,
      meta: {
        requireAuth: true,  // 添加该字段，表示进入这个路由是需要登录才能进入的
      },
    }, {
      path: '/otherAdd',
      name: '其他收支详情',
      component: otherAdd,
      meta: {
        requireAuth: true,  // 添加该字段，表示进入这个路由是需要登录才能进入的
      },
    }, {
      path: '/openstore',
      name: '仓库',
      component: OpenWarehouse,
    },{
      path: '/login',
      name: '登录页',
      component: Login
    },{
      path: '/logout',
      name: '退出登录',
      component: logout
    }
  ]
})
