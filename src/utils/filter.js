import Vue from 'vue'
import { commonApi } from '@/api/common'
import DICT_KEYS from '@/utils/staticEnum'
import { parseTime } from './index'

let sysDictList = localStorage.getItem('sysDictList') ? JSON.parse(
  localStorage.getItem('sysDictList')) : []
if (!sysDictList.length) {
  commonApi.listSysDict().then(res => {
    if (res.subCode === 1000) {
      sysDictList = res.data
      localStorage.setItem('sysDictList', JSON.stringify(res.data))
    } else {
      this.$toast(res.subMsg)
    }
  })
}
Vue.filter('dictToDesc', (value, type) => {
  let res = sysDictList.filter(
    item => item.typeValue == DICT_KEYS[type] && item.fieldValue == value)
  return res.length ? res[0].fieldName : '--'
})
Vue.filter('dictToDescTypeValue', (value, type) => {
  let res = sysDictList.filter(
    item => item.typeValue == type && item.fieldValue == value)
  return res.length ? res[0].fieldName : '--'
})
Vue.filter('numFilter', (value) => {
  // 截取当前数据到小数点后两位
  let realVal = parseFloat(value).toFixed(2)
  return realVal
})
Vue.filter('sizeFilter', (value) => {
  // 截取当前数据到小数点后两位
  if (!value || value.length < 27) {
    return value
  }
  let realVal = value.substring(0,27) + '...'
  return realVal
})
Vue.filter('sizeFilterNum', (value , num) => {
  // 截取当前数据到小数点后两位
  if (!value || value.length < num) {
    return value
  }
  let realVal = value.substring(0,num) + '...'
  return realVal
})


Vue.filter('formateTime', parseTime)
