/**
 * 我的钱包 页面
 *
 * @summary
 * @author PDK
 *
 * Created at     : 2018-09-06
 * Last modified  : 2018-09-06
 */
import Taro, { Component } from '@tarojs/taro'
import PropTypes from 'prop-types'
import { View, Image } from '@tarojs/components'
import { connect } from '@tarojs/redux'
import { changeUserFlag } from '../../store/actions/user'
import './index.scss'
import PaySuccess from '../../assets/paysuccess.png'
import PayFail from '../../assets/payfail.png'

class Wallet extends Component {
  static propTypes = {
    isFetchUserMap: PropTypes.bool, // 是否需要请求
    userMap: PropTypes.object, // 用户的其他信息
    changeFetchUserInfo: PropTypes.func
  }
  static defaultProps = {
    userMap: {
      money: '',
      order: []
    }
  }

  config = {
    navigationBarTitleText: '我的钱包'
  }

  state = {
    
  }

  componentDidShow () {
    if (!this.props.isFetchUserMap) {
      console.log('需要请求')
      this.props.changeFetchUserInfo()
    }
    console.log(this.props.userMap)
  }

  render () {
    return (
      <View>
        <View className='wallet-box'>
          <View className='wallet-mask'>
          </View>
          <View className='wallet-money'>
            <View className='normal-title'>你目前剩余额度 (元)</View>
            <View className='wallet-number'>{this.props.userMap.money}</View>
          </View>
        </View>
        <View style={{ height: '15px', backgroundColor: '#f5f5f5' }}></View>
        <View className='order-list'>
          <View className='ordertitle'>所有流水账单</View>
          {this.props.userMap.order.map((ord, index) => {
            return <View className='orderbox' key={index}>
                <View className='order-code'>订单号 : {ord.ticketCode}</View>
                <View className='order-time'>时间 : {ord.time}</View>
                <View className='order-status'>{ord.isRepay === true ? <Image className='pay-icon' src={PaySuccess} /> : <Image className='pay-icon' src={PayFail} />}</View>
            </View>
          })}
        </View>
      </View>
    )
  }
}

const mapStateToProps = (state) => {
  let isFetchUserMap = state.user.isFetchUserMap
  let userMap = state.user.userMap
  return {
    isFetchUserMap,
    userMap
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    changeFetchUserInfo: () => {
      dispatch(changeUserFlag())
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Wallet)