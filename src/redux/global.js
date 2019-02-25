/**
 * @Author: PDK
 * @Date:   2019-02-25
 * @desc 全局模块redux
 * @Last modified by:   PDK
 * @Last modified time:  2019-02-25
 */
const types = {
  SET_PHONE_SYSTEM: 'global/SET_PHONE_SYSTEM'
}

export const actions = {
  setPhoneSystem(jsondata) {
    return { type: types.SET_PHONE_SYSTEM, payload: jsondata }
  }
}

const initialState = {
  phoneSystem: {}
}

export default function reducer(state = initialState, action) {
  const { type, payload } = action
  switch (type) {
    case types.SET_PHONE_SYSTEM:
      return {
        ...state,
        phoneSystem: payload
      }
    default:
      return state
  }
}
