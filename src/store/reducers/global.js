/**
 * @Author: PDK
 * @Date:   2018-08-31
 * @Last modified by:   PDK
 * @Last modified time: 2018-08-31
 */
import {
  SAVE_SYSTEM_PHONE,
  FROM_CINEMA_TO_ORDER,
  FROM_MOVIE_TO_ORDER,
  RECEIVE_ALL_SEAT_LIST
} from '../constants/global'
  
const INITIAL_STATE = {
  phoneSystem: {}, // 用户信息
  cinemaUnderMovie: {}, // 当前订单
  currentSeatList: {} // 该影院下的某部电影的位置
}
    
export default function global (state = INITIAL_STATE, action) {
  switch (action.type) {
    case SAVE_SYSTEM_PHONE :
      return {
        ...state,
        phoneSystem: action.data
      }
    case FROM_CINEMA_TO_ORDER :
      return {
        ...state,
        cinemaUnderMovie: action.data
      }
    case FROM_MOVIE_TO_ORDER :
      return {
        ...state,
        cinemaUnderMovie: action.data
      }
    case RECEIVE_ALL_SEAT_LIST :
      return {
        ...state,
        currentSeatList: action.data
      }
    default :
      return {
        ...state
      }
  }
}