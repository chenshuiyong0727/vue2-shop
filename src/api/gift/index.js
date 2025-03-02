import request from '@/utils/request'
export const giftApi = {
  // 获取数据列表
  page: (body) => request({
    url: '/gw/op/v1/gift',
    method: 'get',
    loading: false,
    params: body
  }),
  data: () => request({
    url: '/gw/op/v1/gift/data',
    loading: false,
    method: 'get'
  }),
  // 批量删除
  batchdelete: (body) => request({
    url: '/gw/op/v1/gift/batch/remove',
    method: 'put',
    data: body
  }),

  // 删除(某项)
  delById: (id) => request({
    url: '/gw/op/v1/gift/' + id,
    method: 'delete'
  }),
  // 更新状态
  changeStatus: (body) => request({
    url: '/gw/op/v1/gift/status',
    method: 'put',
    data: body
  }),

  // 获取详情
  getDetailById: (id) => request({
    url: '/gw/op/v1/gift/' + id,
    loading: false,
    method: 'get'
  }),
  // 新增
  add: (body) => request({
    url: '/gw/op/v1/gift',
    method: 'post',
    data: body
  }),
  // 更新
  update: (body) => request({
    url: '/gw/op/v1/gift',
    method: 'put',
    data: body
  })

}
