/**
 * @Author: PDK
 * @Date:   2019-02-25
 * @desc 飞机票模块redux
 * @Last modified by:   PDK
 * @Last modified time:  2019-02-25
 */
import { PlaneList } from '@utils/app'

const types = {
  SET_PLANE_LIST: 'global/SET_PLANE_LIST',
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
  clearData() {
    return { type: types.CLEAR_DATA }
  }
}

const initialState = {
  list: [],
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
    case types.CLEAR_DATA:
      return {
        ...state,
        list: []
      }
    default:
      return state
  }
}
