import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router);
//按需加载,当渲染其他页面时才加载其组件,并缓存,减少首屏加载时间
const Index = resolve => require(['@/views/Index.vue'], resolve)
const User = resolve => require(['@/views/User.vue'], resolve)
const userInfo = resolve => require(['@/views/userInfo.vue'], resolve)
const Order = resolve => require(['@/views/OrderAll.vue'], resolve)
const orderDetail = resolve => require(['@/views/orderDetail.vue'], resolve)
const putin = resolve => require(['@/views/report/putin.vue'], resolve)
const channelStorage = resolve => require(['@/views/report/channelStorage.vue'], resolve)
const sellListDetail = resolve => require(['@/views/report/sellListDetail.vue'], resolve)
const putinDetail = resolve => require(['@/views/report/putinDetail.vue'], resolve)
const putinDayDetail = resolve => require(['@/views/report/putinDayDetail.vue'], resolve)
const areaSellList = resolve => require(['@/views/report/areaSellList.vue'], resolve)
const sellList = resolve => require(['@/views/report/sellList.vue'], resolve)
const giftList = resolve => require(['@/views/giftList.vue'], resolve)
const goodsBusiness = resolve => require(['@/views/goodsBusiness.vue'], resolve)
const goodsAct = resolve => require(['@/views/goodsAct.vue'], resolve)
const otherList = resolve => require(['@/views/otherList.vue'], resolve)
const goodsDefects = resolve => require(['@/views/goodsDefects.vue'], resolve)
const otherAdd = resolve => require(['@/views/otherAdd.vue'], resolve)
const resetPwd = resolve => require(['@/views/resetPwd.vue'], resolve)
const storeAdd = resolve => require(['@/views/storeAdd.vue'], resolve)
const storeDetail = resolve => require(['@/views/storeDetail.vue'], resolve)
const GoodsAdd = resolve => require(['@/views/goodsAdd.vue'], resolve)
const GoodsBase = resolve => require(['@/views/GoodsBase.vue'], resolve)
const Warehouse = resolve => require(['@/views/Warehouse.vue'], resolve)
const WarehouseDetail = resolve => require(['@/views/WarehouseDetail.vue'], resolve)
const OpenWarehouse = resolve => require(['@/views/OpenWarehouse.vue'], resolve)
const scanCode = resolve => require(['@/views/scanCode.vue'], resolve)
const scanCodeV2 = resolve => require(['@/views/scanCodeV2.vue'], resolve)
const Login = resolve => require(['@/views/login.vue'], resolve)
const loginByCode = resolve => require(['@/views/loginByCode.vue'], resolve)
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
        keepAlive: true, // 此组件需要被缓存
        isBack:false, //用于判断上一个页面是哪个
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
        keepAlive: true, // 此组件需要被缓存
        isBack:false, //用于判断上一个页面是哪个
        requireAuth: true,  // 添加该字段，表示进入这个路由是需要登录才能进入的
      },
    }, {
      path: '/goodsBase',
      name: '商品',
      component: GoodsBase,
      meta: {
        keepAlive: true, // 此组件需要被缓存
        isBack:false, //用于判断上一个页面是哪个
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
      path: '/storeDetail',
      name: '库存详情',
      component: storeDetail,
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
      path: '/putinDayDetail',
      name: '当日入库报表',
      component: putinDayDetail,
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
      path: '/areaSellList',
      name: '区域销售报表',
      component: areaSellList,
      meta: {
        requireAuth: true,  // 添加该字段，表示进入这个路由是需要登录才能进入的
      },
    }, {
      path: '/channelStorage',
      name: '入库渠道报表',
      component: channelStorage,
      meta: {
        requireAuth: true,  // 添加该字段，表示进入这个路由是需要登录才能进入的
      },
    }, {
      path: '/sellListDetail',
      name: '月度销售报表',
      component: sellListDetail,
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
      path: '/goodsDefects',
      name: '瑕疵商品',
      component: goodsDefects,
      meta: {
        requireAuth: true,  // 添加该字段，表示进入这个路由是需要登录才能进入的
      },
    }, {
      path: '/giftList',
      name: '红包',
      component: giftList,
      meta: {
        requireAuth: true,  // 添加该字段，表示进入这个路由是需要登录才能进入的
      },
    }, {
      path: '/goodsBusiness',
      name: '营销',
      component: goodsBusiness,
      meta: {
        requireAuth: true,  // 添加该字段，表示进入这个路由是需要登录才能进入的
      },
    }, {
      path: '/goodsAct',
      name: '活动',
      component: goodsAct,
      meta: {
        keepAlive: true, // 此组件需要被缓存
        isBack:false, //用于判断上一个页面是哪个
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
      path: '/userInfo',
      name: '用户详情',
      component: userInfo,
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
      path: '/loginByCode',
      name: '验证码登录页',
      component: loginByCode
    },{
      path: '/scanCode',
      name: '扫码',
      component: scanCodeV2
    },{
      path: '/scanCodeV1',
      name: '扫码仓库',
      component: scanCode
    },{
      path: '/logout',
      name: '退出登录',
      component: logout
    }
  ]
})
