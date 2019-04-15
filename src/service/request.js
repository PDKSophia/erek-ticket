import Taro from '@tarojs/taro'
import { handleUrl, reLaunch } from '@utils/utils'

const codeMessage = {
  400: '请求错误',
  401: '用户没有权限(令牌、用户名、密码错误)',
  403: '禁止访问',
  404: 'Not Found',
  406: '请求格式错误',
  410: '资源已被永久删除',
  500: '服务器异常',
  502: '网关异常',
  503: '服务不可用',
  504: '网关超时'
}

async function checkStatus(response) {
  if (response.statusCode >= 200 && response.statusCode < 300) {
    return response
  }
  // 401错误弹出对话框, 重新进入小程序的登录逻辑
  if (response.statusCode == 401) {
    Taro.setStorageSync('authToken', '') // 使用clearStorageSync会导致在app.js中存储的信息丢失
    Taro.showModal({
      title: '权限提示',
      content: '用户没有访问权限或权限已过期，点击[确定]按钮将重新登录',
      showCancel: false
    }).then(() => reLaunch())
    const err = new Error('用户没有权限或权限过期')
    err.code = 401
    throw err
  } else {
    const errorText = codeMessage[response.statusCode] || response.errMsg
    const err = new Error(errorText)
    err.code = response.statusCode
    err.response = response
    throw err
  }
}

function checkCode(data) {
  if (data.code === 1) {
    return data.data
  } else {
    const err = new Error(data.msg)
    err.response = data
    err.code = data.code
    throw err
  }
}

/**
 * 发出请求，返回一个Promise
 * 错误有两种：http错误以及code不为0的错误，两种都会抛出错误
 * @param {Object} options
 * @param {Function} method 1: Taro.request(默认) 2: Taro.uploadFile
 * @param {Boolean} authorizing 是否需要携带token
 */
export default function request(options, method = Taro.request, authorizing = true) {
  let { url, header } = options
  url = handleUrl(url, 'api')
  if (authorizing) {
    const authToken = Taro.getStorageSync('authToken')
    header = {
      ...header,
      'xauthtoken': authToken
    }
  }

  return method({
    ...options,
    url,
    header
  })
    .then(checkStatus)
    .then(res => {
      /**
       * 如果返回的不是一个JSON对象，而是一个字符串，因此需要对这个字符串进行处理
       * 如果直接返回的是一个JSON对象，这个时候，JSON.parse会抛出异常，如果出现异常
       * 我们直接返回这个对象本身的值即可
       */
      try {
        return JSON.parse(res.data)
      } catch (err) {
        return res.data
      }
    })
    .then(checkCode)
}
