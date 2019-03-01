/**
 * 我的电影票
 *
 * @summary
 * @author PDK
 *
 * Created at     : 2018-02-24
 * Last modified  : 2018-03-01
 */
import Taro, { Component } from '@tarojs/taro'
import { View } from '@tarojs/components'
import ComfirmModal from '@components/ComfirmModal'
import PropTypes from 'prop-types'
import classnames from 'classnames/bind'
import styles from './index.module.css'

const cx = classnames.bind(styles)
class MovieOrderList extends Component {
  static propTypes = {
    isFetchUserMap: PropTypes.bool, // 是否需要请求
    userMap: PropTypes.object, // 用户的其他信息
    changeFetchUserInfo: PropTypes.func
  }

  static defaultProps = {
    userMap: {
      order: []
    }
  }

  config = {
    navigationBarTitleText: '我的电影票'
  }

  state = {
    openModal: false
  }

  componentDidMount() {}

  callPhoneNumber = () => {
    this.setState({
      openModal: !this.state.openModal
    })
  }

  handleOnOK = () => {
    this.callPhoneNumber()
    Taro.showToast({
      title: '加载中',
      icon: 'loading',
      duration: 1500
    })
    setTimeout(() => {
      Taro.makePhoneCall({
        phoneNumber: this.state.content.phone
      })
    }, 1500)
  }

  render() {
    return (
      <View className={styles.container}>
        <View className={cx('items')}>
          <View className={styles.cinema}>海上明珠国际影城(银泰店)</View>
          <View className={styles.content}>
            <View className={styles.mvname}>海王</View>
            <View className={styles.mvdate}>2018年12月15日 21:14-23:38 英语3D</View>
            <View className={styles.mvseat}>一号厅</View>
          </View>
          <View className={styles.code}>取票码: 89561242</View>
        </View>
        <View className={cx('items', { useClass: true })}>
          <View className={cx('cinema', { fnColor: true })}>保利国际影城(复城店)</View>
          <View className={cx('content', { fnColor: true })}>
            <View className={cx('mvname', { fnColor: true })}>复仇者联盟</View>
            <View className={cx('mvdate', { fnColor: true })}>2019年1月24日 21:14-23:38 英语3D</View>
            <View className={cx('mvseat', { fnColor: true })}>四号厅</View>
          </View>
          <View className={cx('code', { fnColor: true })}>取票码: 81658261</View>
        </View>
        <View className={cx('items', { fnClass: true })}>
          <View className={cx('cinema', { fnColor: true })}>保利国际影城(复城店)</View>
          <View className={cx('content', { fnColor: true })}>
            <View className={cx('mvname', { fnColor: true })}>阿丽塔: 战斗天使</View>
            <View className={cx('mvdate', { fnColor: true })}>2019年2月24日 21:14-23:38 英语3D</View>
            <View className={cx('mvseat', { fnColor: true })}>一号厅</View>
          </View>
          <View className={cx('code', { fnColor: true })}>取票码: 39072472</View>
        </View>
        {this.state.openModal && (
          <ComfirmModal
            type='normal'
            title='您将拨打此电话'
            onHandleCloseModal={this.callPhoneNumber}
            onHandleOkModal={this.handleOnOK}
          />
        )}
      </View>
    )
  }
}

export default MovieOrderList
