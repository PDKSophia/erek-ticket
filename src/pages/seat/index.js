/**
 * 选座 页面
 *
 * @summary
 * @author PDK
 *
 * Created at     : 2018-09-07
 * Last modified  : 2018-09-07
 */
import Taro, { Component } from '@tarojs/taro'
import PropTypes from 'prop-types'
import classNames from 'classnames'
import { View } from '@tarojs/components'
import { connect } from '@tarojs/redux'
import { fetchAllSeatList } from '../../store/actions/global'
import { fetchRobTicketOrder } from '../../store/actions/order'

import './index.scss'

class Seat extends Component {
  static propTypes = {
    getAllSeatList: PropTypes.func, // 获取所有的位置
    robTicket: PropTypes.func, // 发起抢票
    cinemaUnderMovie: PropTypes.array, // 当前影院某部电影下的
    currentSeatList: PropTypes.array, // 所有的座位列表
    robTicketOrderInfo: PropTypes.object // 抢票支付后到订单详情
  }
  static defaultProps = {
    cinemaUnderMovie: {
      online: []
    },
    currentSeatList: {
      seatlist: {
        list: []
      }
    },
    tiggerSeatObj: {
      seatID: 0,
      status: false
    },
    robTicketOrderInfo: {
      pushCode: '',
      ticketCode: ''
    }
  }

  state = {
    selectTime: {},
    tiggerSeatObj: {
      seatID: null,
      status: false
    }
  }
  componentWillMount () {
    Taro.setNavigationBarTitle({
      title: this.props.cinemaUnderMovie.cinemaName
    }) 
    // 发送请求，获取所有的座位信息
    this.props.getAllSeatList(this.props.cinemaUnderMovie.cinemaID, this.props.cinemaUnderMovie.id)
  }
  componentDidMount () {
    this.setState({
      selectTime: this.props.cinemaUnderMovie.online[0] // 默认时间段为第一场时间
    })

  }

  handleTiggerYouSeat = (seat) => {
    if (seat.seatID == this.state.tiggerSeatObj.seatID && this.state.tiggerSeatObj.status) {
      this.setState({
        tiggerSeatObj: {
          seatID: null,
          status: false
        }
      })
    } else if (!seat.status) {
      let newSeat = {
        seatID: seat.seatID,
        status: true,
        count: 1
      }
      this.setState({
        tiggerSeatObj: newSeat
      })
    }  else {
      Taro.showToast({
        title: '该位置不可选',
        duration: 1000,
        icon: 'none'
      })
    }
  }

  handleToPayMoney = () => {
    console.log('pay money')
    // 发起请求
    let { cinemaID, uniqueID } = this.props.cinemaUnderMovie
    this.props.robTicket(cinemaID, uniqueID, this.state.tiggerSeatObj.seatID)
    if (this.props.robTicketOrderInfo.pushCode !== undefined || this.props.robTicketOrderInfo.ticketCode !== '') {
      
    }
  }

  render () {
    const seatlistArr = this.props.currentSeatList.seatlist.list == 'undefined' ? 0 : this.props.currentSeatList.seatlist.list
    return (
      <View>
        <View className='cinema-movie-seat_box'>
          <View style={{ fontSize: '20px', color: '#333' }}>{this.props.cinemaUnderMovie.name}</View>
          <View>{this.state.selectTime.time}</View>
        </View>
        <View className='seat-box'>
          <View className='seat_left'>
            <View className='not-cube'>
              <View className='normal-seat_cube'></View>
            </View>
            <View className='seat_text'>可选</View>
          </View>
          <View className='seat_right'>
            <View className='sell-cube'>
              <View className='seller-seat_cube'></View>
            </View>
            <View className='seat_text'>已选</View>
          </View>
        </View>
        <View className='seat-choose'>
          <View className='echelon'></View>
          <View className='cinema-echelon-text'>VIP厅 银屏</View>
        </View>
        <View className='total-seat_flex'>
          {seatlistArr.map((seat, index) => {
            return <View key={index} className={classNames(
              'main_seat-style',
              {is_sell_seat: seat.status},
              {not_choose_seat: !seat.status},
              {you_choose_seat: this.state.tiggerSeatObj.status && this.state.tiggerSeatObj.seatID === seat.seatID}
            )} onClick={this.handleTiggerYouSeat.bind(this, seat)}
            ></View>
          })}
        </View>
        {this.state.tiggerSeatObj.status === true ? 
        <View className={classNames(
          'pay_money-ticket',
          'tigger_button_order'
        )} onClick={this.handleToPayMoney}
        >立即抢票</View> : <View className={classNames(
          'pay_money-ticket',
          'ban_button_order'
        )}
        >先选位置</View>}
      </View>
    )
  }
}

const mapStateToProps = (state) => {
  let cinemaUnderMovie = state.global.cinemaUnderMovie
  let currentSeatList = state.global.currentSeatList
  let robTicketOrderInfo = state.order.robTicketOrderInfo
  return {
    cinemaUnderMovie,
    currentSeatList,
    robTicketOrderInfo
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    getAllSeatList: (cinemaID, movieID) => {
      dispatch(fetchAllSeatList(cinemaID, movieID))
    },
    robTicket: (cinemaID, movieUniqueID, seatID) => {
      dispatch(fetchRobTicketOrder(cinemaID, movieUniqueID, seatID))
    }
  }
}
  
export default connect(mapStateToProps, mapDispatchToProps)(Seat)
