import request from '@/utils/request'

export const reportApi = {
  // 获取数据列表
  putInStorage: (body) => request({
    url: '/gw/op/v1/report/putInStorage',
    method: 'get',
    loading: false,
    params: body
  }),
  // 获取数据列表
  channelStorage: (body) => request({
    url: '/gw/op/v1/report/channelStorage',
    method: 'get',
    loading: false,
    params: body
  }),
  sellList: (body) => request({
    url: '/gw/op/v1/report/sellList',
    method: 'get',
    params: body,
    loading: false
  }),
  areaSellList: (body) => request({
    url: '/gw/op/v1/report/areaSellList',
    method: 'get',
    params: body,
    loading: false
  }),
  // 获取数据列表
  putInStorageDay: (body) => request({
    url: '/gw/op/v1/report/putInStorageDay',
    method: 'get',
    params: body,
    loading: false
  }),
  // 获取数据列表
  putInStorageDayDetail: (body) => request({
    url: '/gw/op/v1/report/putInStorageDayDetail',
    method: 'get',
    params: body,
    loading: false
  }),
  sellListDay: (body) => request({
    url: '/gw/op/v1/report/sellListDay',
    method: 'get',
    params: body,
    loading: false
  })

}
