/**
 * @Author: PDK
 * @Date:   2019-04-12
 * @desc 用户模块redux
 * @Last modified by:   PDK
 * @Last modified time:  2019-04-12
 */
import { retrieveUserInfo } from '@service/api'
const types = {
  SET_USER_INFO: 'global/SET_USER_INFO'
}

export const actions = {
  async setUserInfo() {
    // 发送请求
    try {
      const data = await retrieveUserInfo()
      return { type: types.SET_USER_INFO, payload: data }
    } catch (err) {
      console.log(err)
    }
  }
}

const initialState = {
  user: {}
}

export default function reducer(state = initialState, action) {
  const { type, payload } = action
  switch (type) {
    case types.SET_USER_INFO:
      return {
        ...state,
        user: payload
      }
    default:
      return state
  }
}
