import Taro from '@tarojs/taro'
import request from './request'

const baseUrl =
  process.env.NODE_ENV === 'production' ? 'https://www.pengdaokuan.cn/' : 'http://localhost:2442/wapp' // 接口URL前缀

// 用户模块
/**
 * @desc 通过code换取openId，返回token
 * @param  {Object} options
 * @return {[type]}
 */
export const authToken = options => {
  return request({
    url: `${baseUrl}/api/login/oauth-code`,
    method: 'POST',
    data: options,
    header: {
      'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'
    }
  }, Taro.request, false)
}
/**
 * @desc 获取用户相关信息
 */
export async function retrieveUserInfo() {
  return await request({
    url: `${baseUrl}/api/login/get-info`,
    method: 'GET'
  })
}
/**
 * @desc 获取当季旅游地列表
 */
export async function retrieveTravelList() {
  return await request({
    url: `${baseUrl}/api/city/travel/get-all`,
    method: 'GET'
  })
}
/**
 * @desc 获取当季旅游地列表
 */
export async function retrieveRecommendList() {
  return await request({
    url: `${baseUrl}/api/city/recommend/get-all`,
    method: 'GET'
  })
}
/**
 * @desc 获取当季旅游地列表
 */
export async function retrieveStyleList() {
  return await request({
    url: `${baseUrl}/api/city/style/get-all`,
    method: 'GET'
  })
}
export const handleHttpResponse = response => {
  if (response.statusCode === 200) {
    return Promise.resolve(response.data)
  } else {
    return Promise.reject(`返回错误代码${response.statusCode}`)
  }
}

export default {}
