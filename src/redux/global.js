/**
 * @Author: PDK
 * @Date:   2019-02-25
 * @desc 全局模块redux
 * @Last modified by:   PDK
 * @Last modified time:  2019-4-20
 */
import {
  retrieveTravelList,
  retrieveRecommendList,
  retrieveStyleList
} from '@service/api'

const types = {
  SET_PHONE_SYSTEM: 'global/SET_PHONE_SYSTEM',
  RETRIEVE_TRAVEL_CITY: 'global/RETRIEVE_TRAVEL_CITY',
  RETRIEVE_RECOMMEND_CITY: 'global/RETRIEVE_RECOMMEND_CITY',
  RETRIEVE_STYLES_CITY: 'global/RETRIEVE_STYLES_CITY',
  SET_FROM_CITYNAME: 'global/SET_FROM_CITYNAME',
  SET_TO_CITYNAME: 'global/SET_TO_CITYNAME',
  SET_START_TIME: 'global/SET_START_TIME',
  SET_CURRENT_CITY: 'global/SET_CURRENT_CITY'
}

const processPrefix = function (data) {
  try {
    let list = data.map(item => {
      let prefix = JSON.parse(item.prefix)
      const options = {
        ...item,
        city_score: prefix.score,
        city_visited: prefix.visited,
        city_summary: prefix.summary
      }
      return options
    })
    return list
  } catch (err) {
    return data
  }
}

export const actions = {
  setPhoneSystem(jsondata) {
    return { type: types.SET_PHONE_SYSTEM, payload: jsondata }
  },
  setTravelList(data) {
    try {
      const list = processPrefix(data.list)
      return { type: types.RETRIEVE_TRAVEL_CITY, payload: list }
    } catch (err) {
      return { type: types.RETRIEVE_TRAVEL_CITY, payload: data.list }
    }
  },
  setRecommendList(data) {
    try {
      const list = processPrefix(data.list)
      return { type: types.RETRIEVE_RECOMMEND_CITY, payload: list }
    } catch (err) {
      return { type: types.RETRIEVE_RECOMMEND_CITY, payload: data.list }
    }
  },
  setStyleList(data) {
    try {
      const list = processPrefix(data.list)
      return { type: types.RETRIEVE_STYLES_CITY, payload: list }
    } catch (err) {
      return { type: types.RETRIEVE_STYLES_CITY, payload: data.list }
    }
  },
  retrieveTravelCityAsync() {
    return async dispatch => {
      // 发送请求
      try {
        const data = await retrieveTravelList()
        dispatch(this.setTravelList(data))
      } catch (err) {
        throw err
      }
    }
  },
  retrieveRecommendCityAsync() {
    return async dispatch => {
      // 发送请求
      try {
        const data = await retrieveRecommendList()
        dispatch(this.setRecommendList(data))
      } catch (err) {
        throw err
      }
    }
  },
  retrieveStylesCityAsync() {
    return async dispatch => {
      // 发送请求
      try {
        const data = await retrieveStyleList()
        dispatch(this.setStyleList(data))
      } catch (err) {
        throw err
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
  setCurrentCity(jsondata) {
    return { type: types.SET_CURRENT_CITY, payload: jsondata }
  }
}

const initialState = {
  phoneSystem: {},
  travelList: [],
  recommendList: [],
  stylesList: [],
  fromCityName: '成都',
  toCityName: '长沙',
  startTime: '2019-04-20',
  currentCity: {}
}

export default function reducer(state = initialState, action) {
  const { type, payload } = action
  switch (type) {
    case types.SET_PHONE_SYSTEM:
      return {
        ...state,
        phoneSystem: payload
      }
    case types.RETRIEVE_TRAVEL_CITY:
      return {
        ...state,
        travelList: [...payload]
      }
    case types.RETRIEVE_RECOMMEND_CITY:
      return {
        ...state,
        recommendList: [...payload]
      }
    case types.RETRIEVE_STYLES_CITY:
      return {
        ...state,
        stylesList: [...payload]
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
    case types.SET_CURRENT_CITY:
      return {
        ...state,
        currentCity: { ...payload }
      }
    default:
      return state
  }
}
