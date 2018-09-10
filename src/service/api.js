import Taro from '@tarojs/taro'
// import request from './request'

const ticketUrl = ''
/**
  * 获取电影列表
  * @returns {[object]}
*/
export function requestMovieList () {
  return Taro.request({
    url: `${ticketUrl}/GetMovieList`,
    method: 'GET'
  })
}

/**
  * 获取影院列表
  * @returns {[object]}
*/
export function requestCinamaList () {
  return Taro.request({
    url: `${ticketUrl}/GetCinemaList`,
    method: 'GET'
  })
}

/**
  * 获取用户相关信息
  * @returns {[object]}
*/
export function requestUserInfo () {
  return Taro.request({
    url: `${ticketUrl}/GetUserInfo`,
    method: 'GET'
  })
}

/**
 * 使用wx.login的code获取token的接口
 * @param  {[type]} code 微信login获取的code
 * @return {[type]}
 */
export const authLogin = (code) => {
  return Taro.request({
    url: `${ticketUrl}/WxLogin`,
    method: 'POST',
    data: {
      code: code
    },
    header: {
      'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'
    }
  })
}

export const handleHttpResponse = (response) => {
  if (response.statusCode === 200) {
    return Promise.resolve(response.data)
  } else {
    return Promise.reject(`返回错误代码${response.statusCode}`)
  }
}

export default {
}