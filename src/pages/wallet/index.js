/**
 * 我的钱包 页面
 *
 * @summary
 * @author PDK
 *
 * Created at     : 2019-02-21
 * Last modified  : 2019-04-30
 */
import Taro, { Component } from '@tarojs/taro'
import PropTypes from 'prop-types'
import { connect } from '@tarojs/redux'
import { Block, View } from '@tarojs/components'
import MainButton from '../../components/MainButton'
import styles from './index.module.css'

class Wallet extends Component {
  static propTypes = {
    changeFetchUserInfo: PropTypes.func
  }
  static defaultProps = {}

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
    const { money, score } = this.props.user
    return (
      <Block>
        <View className={styles.container}>
          <View className={styles.mask} />
          <View className={styles.modal}>
            <View className={styles.title}>你目前剩余额度 (元)</View>
            <View className={styles.value}>{money}</View>
            <View className={styles.title}>你当前可用积分 (分)</View>
            <View className={styles.value}>{score}</View>
          </View>
        </View>
        <View className={styles.action}>
          <View className={styles.flex}>
            <MainButton
              text='充值'
              color='secondary'
              size='normal'
              width='75%'
              onHandleClick={this.handleRechargeMoney}
            />
          </View>
          <View className={styles.flex}>
            <MainButton
              text='赚积分'
              color='primary'
              size='normal'
              width='75%'
              onHandleClick={this.handleEarnIntegral}
            />
          </View>
        </View>
      </Block>
    )
  }
}

const mapStateToProps = ({ user }) => ({
  ...user
})

export default connect(mapStateToProps)(Wallet)