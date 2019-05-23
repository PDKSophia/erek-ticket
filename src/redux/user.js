/**
 * @Author: PDK
 * @Date:   2019-04-12
 * @desc 用户模块redux
 * @Last modified by:   PDK
 * @Last modified time:  2019-04-12
 */
import { retrieveUserInfo, updateUserFields } from '@service/api'

const types = {
  SET_USER_INFO: 'user/SET_USER_INFO',
  CREATE_PASSENGER: 'user/CREATE_PASSENGER',
  UPDATE_PASSENGER: 'user/UPDATE_PASSENGER',
  DELETE_PASSENGER: 'user/DELETE_PASSENGER',
  SET_PASSENGER_ITEM: 'user/SET_PASSENGER_ITEM',
  DELETE_PASSENGER_ITEM: 'user/DELETE_PASSENGER_ITEM',
  CLEAR_ORDER_PASSENGER: 'user/CLEAR_ORDER_PASSENGER'
}

export const actions = {
  setUserInfo(data) {
    return { type: types.SET_USER_INFO, payload: data }
  },
  retrieveUserInfo() {
    return async dispatch => {
      // 发送请求
      try {
        const data = await retrieveUserInfo()
        dispatch(this.setUserInfo(data))
      } catch (err) {
        throw err
      }
    }
  },
  createPassenger(data) {
    return { type: types.CREATE_PASSENGER, payload: data }
  },
  updatePassenger(data, index) {
    return { type: types.UPDATE_PASSENGER, payload: data, index: index }
  },
  deletePassenger(index) {
    return { type: types.DELETE_PASSENGER, payload: index }
  },
  // 保存乘客列表
  savePassengerList(prefix) {
    return async dispatch => {
      // 发送请求
      try {
        const data = await updateUserFields(prefix)
        dispatch(this.setUserInfo(data))
      } catch (err) {
        throw err
      }
    }
  },
  setPassengerItem(data) {
    return { type: types.SET_PASSENGER_ITEM, payload: data }
  },
  deletePassengerItem(index) {
    return { type: types.DELETE_PASSENGER_ITEM, payload: index }
  },
  clearOrderPassenger() {
    return { type: types.CLEAR_ORDER_PASSENGER }
  }
}

const initialState = {
  user: {},
  orderPassengerList: []
}

export default function reducer(state = initialState, action) {
  const { type, payload } = action
  switch (type) {
    case types.SET_USER_INFO:
      return {
        ...state,
        user: { ...payload }
      }
    case types.CREATE_PASSENGER:
      var prefix = {}
      // 1.尝试解析prefix
      try {
        prefix = JSON.parse(state.user.prefix)
        // 2.判断是否有乘客列表
        if (prefix.hasOwnProperty('passengerList')) {
          // 3. 添加新乘客
          prefix.passengerList.push(payload)
        } else {
          // 4. 定义新属性
          Object.defineProperty(prefix, 'passengerList', {
            value: [],
            writable: true,
            enumerable: true,
            configurable: true
          })
          prefix.passengerList.push(payload)
        }
      } catch (err) {
        prefix = {
          passengerList: []
        }
        prefix.passengerList.push(payload)
      }
      let cUser = {
        ...state.user,
        prefix: JSON.stringify(prefix)
      }
      return {
        ...state,
        user: { ...cUser }
      }
    case types.UPDATE_PASSENGER:
      let uPrefix = JSON.parse(state.user.prefix)
      const { index } = action
      uPrefix.passengerList[index] = { ...payload }
      let uUser = {
        ...state.user,
        prefix: JSON.stringify(uPrefix)
      }
      return {
        ...state,
        user: { ...uUser }
      }
    case types.DELETE_PASSENGER:
      let dPrefix = JSON.parse(state.user.prefix)
      dPrefix.passengerList.splice(payload, 1)
      let dUser = {
        ...state.user,
        prefix: JSON.stringify(dPrefix)
      }
      return {
        ...state,
        user: { ...dUser }
      }
    case types.SET_PASSENGER_ITEM:
      let orderPassList = [...state.orderPassengerList]
      let hasMap = {}
      // 1.空数组直接添加
      orderPassList.push(payload)
      // 2. 通过reduce去重
      orderPassList = orderPassList.reduce((current, next) => {
        hasMap[next.nickname] ? '' : hasMap[next.nickname]
        current.push(next)
        return current
      }, [])
      return {
        ...state,
        orderPassengerList: [...orderPassList]
      }
    case types.DELETE_PASSENGER_ITEM:
      let delPassList = [...state.orderPassengerList]
      delPassList.splice(payload, 1)
      return {
        ...state,
        orderPassengerList: [...delPassList]
      }
    case types.CLEAR_ORDER_PASSENGER:
      return {
        ...state,
        orderPassengerList: []
      }
    default:
      return state
  }
}
