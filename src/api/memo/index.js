import request from '@/utils/request'
export const memoApi = {
  // 获取数据列表
  page: (body) => request({
    url: '/gw/op/v1/memo',
    method: 'get',
    loading: false,
    params: body
  }),
  // 批量删除
  batchdelete: (body) => request({
    url: '/gw/op/v1/memo/batch/remove',
    method: 'put',
    data: body
  }),

  // 删除(某项)
  delById: (id) => request({
    url: '/gw/op/v1/memo/' + id,
    method: 'delete'
  }),
  // 更新状态
  changeStatus: (body) => request({
    url: '/gw/op/v1/memo/status',
    method: 'put',
    data: body
  }),

  // 获取详情
  getDetailById: (id) => request({
    url: '/gw/op/v1/memo/' + id,
    loading: false,
    method: 'get'
  }),
  // 获取详情
  copy: (id) => request({
    url: '/gw/op/v1/memo/copy/' + id,
    method: 'get'
  }),
  // 新增
  add: (body) => request({
    url: '/gw/op/v1/memo',
    method: 'post',
    data: body
  }),
  // 更新
  update: (body) => request({
    url: '/gw/op/v1/memo',
    method: 'put',
    data: body
  })

}
