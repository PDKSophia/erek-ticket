// 通用工具
import Taro from '@tarojs/taro'

export const baseUrl = process.env.NODE_ENV === 'production' ? '' : '' // 接口URL前缀

/**
 * 判断一个字符串是否是Url
 * @param {String} str
 */
const isUrl = str => {
  const pattern = /^(https?|tmp):\/\//
  return pattern.test(str)
}

/**
 * 处理URL的方法
 * @param {String} url
 * @param {String} type api: 前缀为接口;
 */
export const handleUrl = (url, type = 'api') => {
  if (isUrl(url)) return url
  if (url == undefined) return ''
  switch (type) {
    case 'api':
      return baseUrl + url
    default:
      return url
  }
}

// 小程序相关的封装

export const reLaunch = async (url = '/pages/index/index') => {
  Taro.reLaunch({
    url
  })
}

/**
 * 显示提示错误的对话框，并且允许用户操作
 * @param {Error} error
 * @param {Function} callback
 */
export const showErrorModal = async (error, callback) => {
  const { code, message } = error
  await Taro.showModal({
    title: code,
    content: message,
    showCancel: false
  })
  if (typeof callback === 'function') {
    callback()
  }
}

/**
 * 使用Toast显示错误信息
 * @param {Error} error
 */
export const showErrorToast = async error => {
  const { code, message } = error
  Taro.showToast({
    title: `${code || 'Error'}: ${message}`,
    icon: 'none',
    duration: 2000
  })
}

/**
 * 显示进度
 * @param {String} message 加载文案
 * @param {Boolean} mask 是否有遮照层
 */
export const showLoading = async (message = '加载中...', mask = true) => {
  Taro.showLoading({
    title: `${message}`,
    mask
  })
}

/**
 * 关闭进度
 */
export const hideLoading = async () => {
  Taro.hideLoading()
}

/**
 * 时间戳变成类似2018-01-12这样的字符串
 * @param {Number} num 时间戳整数
 */
export function intToDateString(num) {
  if (num) {
    const date = new Date(num)
    const year = date.getFullYear()
    const month = date.getMonth() + 1
    const day = date.getDate()
    return `${year}-${month >= 10 ? month : '0' + month}-${day >= 10 ? day : '0' + day}`
  } else {
    return ''
  }
}
/**
 * 类似2018-01-12这样的字符串转化为时间戳
 */
export function dateStringToInt(str) {
  return new Date(str).getTime()
}

/**
 * 设置时间
 * @param {Date} start 时间戳
 * @param {String} date 设置 day 天后的时间
 */
export function processUnixToDate(start, day = 7) {
  var time = new Date(start)
  time.setDate(time.getDate() + day)
  var month = time.getMonth() + 1
  return `${month >= 10 ? month : '0' + month}月${time.getDate() >= 10 ? time.getDate() : '0' + time.getDate()}日`
}

/**
 * 数组去重
 * @param {Array} 数组
 */
export function reduceArray(arr) {
  let hasMap = {}
  return arr.reduce((initial, cur) => {
    hasMap[cur] ? '' : (hasMap[cur] = true && initial.push(cur))
    return initial
  }, [])
}

/**
 * 从数组中获取对应的值
 * @param {Array} 数组
 * @param {ykey} 键
 */
export function filterKeyInArray(arr, ykey) {
  return arr.filter(item => (item.label === ykey))
}