/**
 * @Author: PDK
 * @Date:   2019-04-24
 * @desc 火车票模块redux
 * @Last modified by:   PDK
 * @Last modified time:  2019-05-03
 */
import { PlaneList } from '@utils/app'
import { retrieveTrainLine, createTrainOrder } from '@service/api'

const types = {
  SET_TRAIN_LIST: 'train/SET_TRAIN_LIST',
  SET_FROM_CITYNAME: 'train/SET_FROM_CITYNAME',
  SET_TO_CITYNAME: 'train/SET_TO_CITYNAME',
  SET_START_TIME: 'train/SET_START_TIME',
  CLEAR_DATA: 'train/CLEAR_DATA',
  SET_LINE_DATA: 'train/SET_LINE_DATA',
  SET_CURRENT_ORDER: 'train/SET_CURRENT_ORDER'
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
  },
  // 搜索火车班次
  retrieveSearchLine(payload) {
    return async dispatch => {
      try {
        const data = await retrieveTrainLine(payload)
        let jsonArray = data.map(item => {
          return {
            ...item,
            prefix: JSON.parse(item.prefix),
            record: JSON.parse(item.prefix).ticket,
            startDay: item.startTime.substring(5, 10),
            endDay: item.arriveTime.substring(5, 10),
            startDate: item.startTime.substring(11, 16),
            endDate: item.arriveTime.substring(11, 16)
          }
        })
        dispatch(this.setLineData(jsonArray))
      } catch (err) {
        throw err
      }
    }
  },
  setLineData(data) {
    return { type: types.SET_LINE_DATA, payload: data }
  },
  // 创建订单
  createOrderReserveAsync(payload) {
    return async dispatch => {
      try {
        const data = await createTrainOrder(payload)
        dispatch(this.setCurrentOrder(data))
      } catch (err) {
        throw err
      }
    }
  },
  setCurrentOrder(data) {
    return { type: types.SET_CURRENT_ORDER, payload: data }
  }
}

const initialState = {
  list: [],
  fromCityName: '西安',
  toCityName: '上海',
  startTime: '2019-05-10',
  lineList: [], // 火车列表
  pageNum: 1,
  pageSize: 10,
  curOrder: {} // 当前创建的订单
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
    case types.SET_LINE_DATA:
      return {
        ...state,
        lineList: [...payload]
      }
    case types.SET_CURRENT_ORDER:
      return {
        ...state,
        curOrder: { ...payload }
      }
    default:
      return state
  }
}