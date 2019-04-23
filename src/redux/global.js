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
  RETRIEVE_STYLES_CITY: 'global/RETRIEVE_STYLES_CITY'
}

export const actions = {
  setPhoneSystem(jsondata) {
    return { type: types.SET_PHONE_SYSTEM, payload: jsondata }
  },
  setTravelList(data) {
    return { type: types.RETRIEVE_TRAVEL_CITY, payload: data }
  },
  setRecommendList(data) {
    return { type: types.RETRIEVE_RECOMMEND_CITY, payload: data }
  },
  setStyleList(data) {
    return { type: types.RETRIEVE_STYLES_CITY, payload: data }
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
  }
}

const initialState = {
  phoneSystem: {},
  travelList: [],
  recommendList: [],
  stylesList: []
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
        travelList: [...payload.list]
      }
    case types.RETRIEVE_RECOMMEND_CITY:
      return {
        ...state,
        recommendList: [...payload.list]
      }
    case types.RETRIEVE_STYLES_CITY:
      return {
        ...state,
        stylesList: [...payload.list]
      }
    default:
      return state
  }
}
