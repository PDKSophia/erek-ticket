/**
 * @Author: PDK
 * @Date:   2018-09-08
 * @Last modified by:   PDK
 * @Last modified time: 2018-09-08
*/

import Taro from '@tarojs/taro'
import CodeUrls from '../../assets/code.jpeg'
import {
  REQUEST_PAY_ORDER
} from '../constants/order'
    
export const savePhoneSystem = () => {
 
}

export const fetchRobTicketOrder = (cinemaId, movieUniqueID, seatID) => dispatch => {
  // API请求代码, 返回的数据中，cinema{id}，movie{id,uniqueId}都是后端返回的
  Taro.showLoading({
    title: '抢票中'
  })
  console.log(cinemaId, movieUniqueID, seatID)
  let response1 = {
    normalResult: {
      code: 200,
      msg: '抢票成功'
    },
    list: {
      codeUrl: CodeUrls, // 二维码地址
      ticketCode: 'gusg213iu23', // 订单号
      pushCode: '3811 2821', // 取票码
      cinema: {
        id: 1,
        name: '银都国际影城（吉利西路店)',  // 电影院名称，用于 “ 我的二维码 ” 页面显示
        location: '雨湖区九华示范区吉利西路铭鸿新衫世纪广场2栋4楼' // 电影院地址，用于 “ 我的二维码 ” 页面显示
      },
      movie: {
        id: 2,
        uniqueID: 2,
        name: '蚁人2: 黄蜂女现身',
        cover: 'https://img1.doubanio.com/view/photo/s_ratio_poster/public/p2529389608.jpg',
        time: '2019-09-09 21:33:51', // 电影播放时间
      },
      seat: {
        seatID: 300  // 位置id
      },
      isRepay: true, // 是否支付
    time: '2019-09-06 21:33:51' // 订单购票时间
    }
  }

  let response2 = {
    normalResult: {
      code: -200,
      msg: '抢票失败'
    },
    list: null
  }
  let response = Math.random() > 0.5 ? response1 : response2
  setTimeout(() => {
    if (response.normalResult.code === 200) {
      dispatch({
        type: REQUEST_PAY_ORDER,
        data: response.list
      })
      Taro.showToast({
        title: response.normalResult.msg,
        duration: 1500,
        icon: 'success'
      })
      setTimeout(() => {
        Taro.hideLoading()
        Taro.navigateTo({
          url: '/pages/seat/roborder'
        })
      }, 1500)
    } else {
      Taro.showToast({
        title: response.normalResult.msg,
        duration: 1500,
        icon: 'none'
      })
      setTimeout(() => {
        Taro.hideLoading()
      }, 1500)
    }
  }, 2000)
}