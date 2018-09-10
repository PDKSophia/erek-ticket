/**
 * @Author: PDK
 * @Date:   2018-08-31
 * @Last modified by:   PDK
 * @Last modified time: 2018-08-31
 */
import {
  REQUEST_USER_INFOMATION,
  RECEIVE_USER_INFORMATION,
  RECEIVE_GET_USER_INFO
} from '../constants/user'
import { requestUserInfo } from '../../service/api'
  
export const tiggerSaveUserInfo = (jsondata) => dispatch => {
  dispatch({
    type: RECEIVE_USER_INFORMATION,
    data: jsondata
  })
}

export const changeUserFlag = () => dispatch => {
  dispatch({
    type: REQUEST_USER_INFOMATION
  })
}

export const receiveUserInfos = (jsondata) => ({
  type: RECEIVE_GET_USER_INFO,
  data: jsondata
})

export const fetchAuthUserInfo = () => dispatch => {
  requestUserInfo().then((res) => {
    console.log(res)
    if (res.normalResult.code === 200) {
      let newUser = {
        money: res.money,
        order: res.order
      }
      dispatch(receiveUserInfos(newUser))
    }
  })
}