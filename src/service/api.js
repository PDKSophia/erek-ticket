import Taro from '@tarojs/taro'
import request from './request'

const baseUrl = process.env.NODE_ENV === 'production' ? 'https://www.pengdaokuan.cn/' : 'http://localhost:2442/wapp' // 接口URL前缀

// 用户模块
/**
 * @desc 通过code换取openId，返回token
 * @param  {Object} options
 * @return {[type]}
 */
export const authToken = options => {
  return request(
    {
      url: `${baseUrl}/api/login/oauth-code`,
      method: 'POST',
      data: options,
      header: {
        'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'
      }
    },
    Taro.request,
    false
  )
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
 * @desc 获取热门推荐列表
 */
export async function retrieveRecommendList() {
  return await request({
    url: `${baseUrl}/api/city/recommend/get-all`,
    method: 'GET'
  })
}

/**
 * @desc 获取旅游主题列表
 */
export async function retrieveStyleList() {
  return await request({
    url: `${baseUrl}/api/city/style/get-all`,
    method: 'GET'
  })
}

/**
 * @desc 获取飞机航班列表
 */
export async function retrievePlaneLine(payload) {
  return await request({
    url: `${baseUrl}/api/search/plane-line/get-all`,
    method: 'GET',
    data: payload
  })
}

/**
 * @desc 获取火车班次列表
 */
export async function retrieveTrainLine(payload) {
  return await request({
    url: `${baseUrl}/api/search/train-line/get-all`,
    method: 'GET',
    data: payload
  })
}

/**
 * @desc 获取大巴班次列表
 */
export async function retrieveBusLine(payload) {
  return await request({
    url: `${baseUrl}/api/search/bus-line/get-all`,
    method: 'GET',
    data: payload
  })
}

/**
 * @desc 创建飞机订单
 * @param {Object} payload
 */
export async function createPlaneOrder(payload) {
  return request(
    {
      url: `${baseUrl}/api/order/plane/add`,
      method: 'POST',
      data: payload
    },
    Taro.request,
    true
  )
}

/**
 * @desc 创建火车订单
 * @param {Object} payload
 */
export async function createTrainOrder(payload) {
  return request(
    {
      url: `${baseUrl}/api/order/train/add`,
      method: 'POST',
      data: payload
    },
    Taro.request,
    true
  )
}

/**
 * @desc 创建大巴订单
 * @param {Object} payload
 */
export async function createBusOrder(payload) {
  return request(
    {
      url: `${baseUrl}/api/order/bus/add`,
      method: 'POST',
      data: payload
    },
    Taro.request,
    true
  )
}

/**
 * @desc 获取当前用户飞机所有订单
 */
export async function retrieveOrderPlane() {
  return await request({
    url: `${baseUrl}/api/order/plane/get-all`,
    method: 'GET'
  })
}

/**
 * @desc 获取当前用户火车所有订单获
 */
export async function retrieveOrderTrain() {
  return await request({
    url: `${baseUrl}/api/order/train/get-all`,
    method: 'GET'
  })
}

/**
 * @desc 获取当前用户大巴所有订单获
 */
export async function retrieveOrderBus() {
  return await request({
    url: `${baseUrl}/api/order/bus/get-all`,
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
