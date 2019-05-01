/**
 * @Author: PDK
 * @Date:   2019-04-24
 * @desc 火车票模块redux
 * @Last modified by:   PDK
 * @Last modified time:  2019-04-24
 */
import { PlaneList } from '@utils/app'

const types = {
  SET_TRAIN_LIST: 'train/SET_TRAIN_LIST',
  SET_FROM_CITYNAME: 'train/SET_FROM_CITYNAME',
  SET_TO_CITYNAME: 'train/SET_TO_CITYNAME',
  SET_START_TIME: 'train/SET_START_TIME',
  CLEAR_DATA: 'train/CLEAR_DATA'
}

export const actions = {
  setPlaneList() {
    // 发送请求获取数据
    return {
      type: types.SET_TRAIN_LIST,
      payload: {
        list: [...PlaneList],
        pageNum: 1,
        pageSize: 20
      }
    }
  },
  setFromCity(jsondata) {
    return { type: types.SET_FROM_CITYNAME, payload: jsondata }
  },
  setToCity(jsondata) {
    return { type: types.SET_TO_CITYNAME, payload: jsondata }
  },
  setStartTime(jsondata) {
    return { type: types.SET_START_TIME, payload: jsondata }
  },
  clearData() {
    return { type: types.CLEAR_DATA }
  }
}

const initialState = {
  list: [],
  fromCityName: '西安',
  toCityName: '上海',
  startTime: '2019-05-10',
  pageNum: 1,
  pageSize: 10
}

export default function reducer(state = initialState, action) {
  const { type, payload } = action
  switch (type) {
    case types.SET_TRAIN_LIST:
      return {
        ...state,
        list: [...payload.list],
        pageNum: payload.pageNum,
        pageSize: payload.pageSize
      }
    case types.SET_FROM_CITYNAME:
      return {
        ...state,
        fromCityName: payload
      }
    case types.SET_TO_CITYNAME:
      return {
        ...state,
        toCityName: payload
      }
    case types.SET_START_TIME:
      return {
        ...state,
        startTime: payload
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