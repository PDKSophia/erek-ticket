/**
 * @Author: PDK
 * @Date:   2018-09-08
 * @Last modified by:   PDK
 * @Last modified time: 2018-09-08
 */
import {
  SAVE_SYSTEM_PHONE,
  FROM_CINEMA_TO_ORDER,
  FROM_MOVIE_TO_ORDER,
  RECEIVE_ALL_SEAT_LIST
} from '../constants/global'

export const savePhoneSystem = phoneSystem => dispatch => {
  dispatch({
    type: SAVE_SYSTEM_PHONE,
    data: phoneSystem
  })
}

export const dealCinemaToOrderTicket = order => dispatch => {
  dispatch({
    type: FROM_CINEMA_TO_ORDER,
    data: order
  })
}

export const dealMovieToOrderTicket = order => dispatch => {
  dispatch({
    type: FROM_MOVIE_TO_ORDER,
    data: order
  })
}
export const fetchAllSeatList = (cinemaId, movieId) => dispatch => {
  // API请求代码
  let response = {
    seatlist: {
      cinemaID: cinemaId, // 当前电影院的ID
      cinema_movieID: movieId, // 电影的uniqueID
      list: [
        {
          seatID: 1,
          status: false // 没被选
        },
        {
          seatID: 2,
          status: false // 已被选
        },
        {
          seatID: 3,
          status: false // 没被选
        },
        {
          seatID: 4,
          status: true // 已被选
        },
        {
          seatID: 5,
          status: false // 没被选
        },
        {
          seatID: 6,
          status: false // 已被选
        },
        {
          seatID: 7,
          status: false // 没被选
        },
        {
          seatID: 8,
          status: true // 已被选
        },
        {
          seatID: 9,
          status: true // 没被选
        },
        {
          seatID: 10,
          status: true // 已被选
        },
        {
          seatID: 11,
          status: false // 没被选
        },
        {
          seatID: 12,
          status: true // 已被选
        },
        {
          seatID: 13,
          status: false // 没被选
        },
        {
          seatID: 14,
          status: true // 已被选
        },
        {
          seatID: 15,
          status: false // 没被选
        },
        {
          seatID: 16,
          status: true // 已被选
        },
        {
          seatID: 17,
          status: true // 没被选
        },
        {
          seatID: 18,
          status: true // 已被选
        },
        {
          seatID: 19,
          status: false // 没被选
        },
        {
          seatID: 20,
          status: true // 没被选
        },
        {
          seatID: 21,
          status: false // 没被选
        },
        {
          seatID: 22,
          status: false // 已被选
        },
        {
          seatID: 23,
          status: true // 没被选
        },
        {
          seatID: 24,
          status: true // 已被选
        },
        {
          seatID: 25,
          status: false // 没被选
        },
        {
          seatID: 26,
          status: false // 已被选
        },
        {
          seatID: 27,
          status: true // 没被选
        },
        {
          seatID: 28,
          status: false // 已被选
        },
        {
          seatID: 29,
          status: false // 没被选
        },
        {
          seatID: 30,
          status: true // 已被选
        },
        {
          seatID: 31,
          status: false // 没被选
        },
        {
          seatID: 32,
          status: true // 已被选
        },
        {
          seatID: 33,
          status: true // 没被选
        },
        {
          seatID: 34,
          status: true // 已被选
        },
        {
          seatID: 35,
          status: false // 没被选
        },
        {
          seatID: 36,
          status: false // 已被选
        },
        {
          seatID: 37,
          status: true // 没被选
        },
        {
          seatID: 38,
          status: false // 已被选
        },
        {
          seatID: 39,
          status: false // 没被选
        },
        {
          seatID: 40,
          status: false // 没被选
        }
      ]
    }
  }
  dispatch({
    type: RECEIVE_ALL_SEAT_LIST,
    data: response
  })
}
