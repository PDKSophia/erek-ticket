/**
 * @Author: PDK
 * @Date:   2019-02-25
 * @desc 飞机票模块redux
 * @Last modified by:   PDK
 * @Last modified time:  2019-04-23
 */
import { PlaneList } from '@utils/app'

const types = {
  SET_PLANE_LIST: 'global/SET_PLANE_LIST',
  SET_FROM_CITY: 'global/SET_FROM_CITY',
  SET_TO_CITY: 'global/SET_TO_CITY',
  CLEAR_DATA: 'global/CLEAR_DATA'
}

export const actions = {
  setPlaneList() {
    // 发送请求获取数据
    return {
      type: types.SET_PLANE_LIST,
      payload: {
        list: [...PlaneList],
        pageNum: 1,
        pageSize: 20
      }
    }
  },
  setFromCity(cityName) {
    console.log('啊哈哈哈哈哈哈哈哈哈哈', cityName)
    return {
      type: types.SET_FROM_CITY,
      payload: cityName
    }
  },
  setToCity(cityName) {
    return {
      type: types.SET_To_CITY,
      payload: cityName
    }
  },
  clearData() {
    return { type: types.CLEAR_DATA }
  }
}

const initialState = {
  list: [],
  fromCityName: '',
  toCityName: '',
  pageNum: 1,
  pageSize: 10
}

export default function reducer(state = initialState, action) {
  const { type, payload } = action
  switch (type) {
    case types.SET_PLANE_LIST:
      return {
        ...state,
        list: [...payload.list],
        pageNum: payload.pageNum,
        pageSize: payload.pageSize
      }
    case types.SET_FROM_CITY:
      return {
        ...state,
        fromCityName: payload
      }
    case types.SET_TO_CITY:
      return {
        ...state,
        toCityName: payload
      }
    case types.CLEAR_DATA:
      return {
        ...state,
        list: []
      }
    default:
      return state
  }
}
