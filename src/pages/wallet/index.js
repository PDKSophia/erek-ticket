/**
 * 我的钱包 页面
 *
 * @summary
 * @author PDK
 *
 * Created at     : 2019-02-21
 * Last modified  : 2019-02-21
 */
import Taro, { Component } from '@tarojs/taro'
import PropTypes from 'prop-types'
import { View } from '@tarojs/components'
import MainButton from '../../components/MainButton'
import './index.scss'

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
    navigationBarTitleText: '我的钱包',
    navigationBarBackgroundColor: '#fecf03'
  }

  state = {}

  handleRechargeMoney = () => {
    Taro.showToast({
      title: '暂不支持充值',
      duration: 2000,
      icon: 'none'
    })
  }

  handleEarnIntegral = () => {
    Taro.showToast({
      title: '该专区正开发中',
      duration: 2000,
      icon: 'none'
    })
  }

  render() {
    return (
      <View>
        <View className='wallet-box'>
          <View className='wallet-mask' />
          <View className='wallet-money'>
            <View className='normal-title'>你目前剩余额度 (元)</View>
            <View className='wallet-number'>86412</View>
            <View className='normal-title'>你当前可用积分 (分)</View>
            <View className='wallet-number'>6512</View>
          </View>
        </View>
        <View className='wallet-action'>
          <View className='wallet-flex'>
            <MainButton text='充值' type='review' size='normal' width='75%' onClick={this.handleRechargeMoney} />
          </View>
          <View className='wallet-flex'>
            <MainButton text='赚积分' type='begin' size='normal' width='75%' onClick={this.handleEarnIntegral} />
          </View>
        </View>
      </View>
    )
  }
}

export default Wallet
