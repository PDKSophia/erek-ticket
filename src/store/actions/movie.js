/**
 * @Author: PDK
 * @Date:   2018-08-31
 * @Last modified by:   PDK
 * @Last modified time: 2018-08-31
 */
import Taro from '@tarojs/taro'
import {
  REQUEST_MOVIE_LIST,
  RECEIVE_MOVIE_LIST,
  TIGGER_SAVE_CURRENT_MOVIE,
  REQUEST_CINEMA_LIST,
  RECEIVE_CINEMA_LIST,
  TIGGER_SAVE_CURRENT_CINEMA
} from '../constants/movie'
import { requestMovieList, requestCinamaList } from '../../service/api'

export const requestMovie = () => ({
  type: REQUEST_MOVIE_LIST
})

export const receiveMovieList = (jsondata, order) => ({
  type: RECEIVE_MOVIE_LIST,
  data: jsondata,
  order: order
})

export const fetchDouBanMoviList = () => dispatch => {
  requestMovieList().then(res => {
    let response = res.data
    if (response.normalResult.code === 200) {
      dispatch(requestMovie())
      dispatch(receiveMovieList(response.movieList))
    } else {
      Taro.showToast({
        title: response.normalResult.msg,
        duration: 1500
      })
    }
  })
}

export const tiggerSaveCurrentMovie = jsondata => dispatch => {
  dispatch({
    type: TIGGER_SAVE_CURRENT_MOVIE,
    data: jsondata
  })
}

export const requestCinema = () => ({
  type: REQUEST_CINEMA_LIST
})

export const receiveCinemaList = jsondata => ({
  type: RECEIVE_CINEMA_LIST,
  data: jsondata
})

export const fetchAllCinemaList = () => dispatch => {
  requestCinamaList().then(res => {
    let response = res.data
    if (response.normalResult.code === 200) {
      dispatch(requestCinema())
      dispatch(receiveCinemaList(response.cinemaList))
    } else {
      Taro.showToast({
        title: response.normalResult.msg,
        duration: 1500
      })
    }
  })
}

export const tiggerSaveCurrentCinema = jsondata => dispatch => {
  dispatch({
    type: TIGGER_SAVE_CURRENT_CINEMA,
    data: jsondata
  })
}
