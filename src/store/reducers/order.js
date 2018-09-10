/**
 * @Author: PDK
 * @Date:   2018-08-31
 * @Last modified by:   PDK
 * @Last modified time: 2018-08-31
 */
import {
  REQUEST_PAY_ORDER
} from '../constants/order'
  
const INITIAL_STATE = {
  robTicketOrderInfo: {} // 抢票订单结果
}
    
export default function order (state = INITIAL_STATE, action) {
  switch (action.type) {
    case REQUEST_PAY_ORDER :
      return {
        ...state,
        robTicketOrderInfo: action.data
      }
    default :
      return {
        ...state
      }
  }
}