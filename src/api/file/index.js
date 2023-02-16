import request from '@/utils/request'

export const fileApi = {
  // 获取详情
  // getImgUrl: (actNo) => request({
  //   url: '/gw/op/v1/file/getImgUrl/' + actNo,
  //   method: 'get'
  // }),
  getImgUrl: (body) => request({
    url: '/gw/op/v1/file/getImgUrl',
    method: 'get',
    params: body
  }),
  upload: (param) => request({
    url: "/gw/op/v1/file/uploadFileMinio",
    method: "post",
    data: param,
    headers: { "Content-Type": "multipart/form-data" },
    transformRequest: function(data) {
      const formData = new FormData();
      let i = data.formData.entries();
      let j = i.next();
      while (!j.done) {
        formData.set(j.value[0], j.value[1]);
        j = i.next();
      }
      return formData;
    }
  })

}
