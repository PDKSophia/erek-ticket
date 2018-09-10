/**
 * @Author: PDK
 * @Date:   2018-08-31
 * @Last modified by:   PDK
 * @Last modified time: 2018-08-31
 */
import {
  RECEIVE_USER_INFORMATION,
  RECEIVE_GET_USER_INFO,
  REQUEST_USER_INFOMATION
} from '../constants/user'
import CodeUrls from '../../assets/code.jpeg'

const INITIAL_STATE = {
  isFetchUserMap: false, // 用于判断是否已经请求过，避免重复请求
  userObj: {}, // 用户信息
  userMap: {
    money: 2900,
    order: [
      {
        codeUrl: CodeUrls, // 二维码地址
        ticketCode: 'gusg213iu23', // 订单号
        pushCode: '3811 2821', // 取票码
        cinema: {
          id: 100,
          name: '银都国际影城（吉利西路店)',  // 电影院名称，用于 “ 我的二维码 ” 页面显示
          location: '雨湖区九华示范区吉利西路铭鸿新衫世纪广场2栋4楼' // 电影院地址，用于 “ 我的二维码 ” 页面显示
        },
        movie: {
          id: 200,
          name: '蚁人2: 黄蜂女现身',
          cover: 'https://img1.doubanio.com/view/photo/s_ratio_poster/public/p2529389608.jpg',
          time: '2019-09-09 21:33:51', // 电影播放时间
        },
        seat: {
          se1_ID: 300  // 位置id
        },
        isRepay: true, // 是否支付
        time: '2019-09-06 21:33:51' // 订单购票时间
      },
      {
        codeUrl: CodeUrls, // 二维码地址
        ticketCode: 'shdah23ish234', // 订单号
        pushCode: '2382 5821', // 取票码
        cinema: {
          id: 100,
          name: '银都国际影城（吉利西路店)',  // 电影院名称，用于 “ 我的二维码 ” 页面显示
          location: '雨湖区九华示范区吉利西路铭鸿新衫世纪广场2栋4楼' // 电影院地址，用于 “ 我的二维码 ” 页面显示
        },
        movie: {
          id: 200,
          name: '碟中谍6：全面瓦解',
          cover: 'https://img3.doubanio.com/view/photo/s_ratio_poster/public/p2529365085.jpg',
          time: '2019-09-09 21:33:51', // 电影播放时间
        },
        seat: {
          se1_ID: 300  // 位置id
        },
        isRepay: false, // 是否支付
        time: '2019-09-06 21:33:51' // 订单购票时间
      },
      {
        codeUrl: CodeUrls, // 二维码地址
        ticketCode: 'isad1312u33', // 订单号
        pushCode: '0821 4712', // 取票码
        cinema: {
          id: 100,
          name: '星影国际影城',  // 电影院名称，用于 “ 我的二维码 ” 页面显示
          location: '雨湖区韶山中路安国大厦3楼' // 电影院地址，用于 “ 我的二维码 ” 页面显示
        },
        movie: {
          id: 200,
          name: '西虹市首富',
          cover: 'https://img1.doubanio.com/view/photo/s_ratio_poster/public/p2529206747.jpg',
          time: '2019-09-09 21:33:51', // 电影播放时间
        },
        seat: {
          se1_ID: 300  // 位置id
        },
        isRepay: true, // 是否支付
        time: '2019-09-06 21:33:51' // 订单购票时间
      }
    ]
  }  
}
  
export default function movie (state = INITIAL_STATE, action) {
  switch (action.type) {
    case RECEIVE_USER_INFORMATION :
      return {
        ...state,
        userObj: Object.assign(action.data)
      }
    case RECEIVE_GET_USER_INFO :
      return {
        ...state
      }
    case REQUEST_USER_INFOMATION :
      return {
        ...state,
        isFetchUserMap: true
      }
    default:
      return state
    }
  }