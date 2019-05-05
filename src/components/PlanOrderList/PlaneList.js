/**
 * 飞机票列表页面
 *
 * @summary
 * @author PDK
 *
 * Created at     : 2019-02-24
 * Last modified  : 2019-02-28
 */
import Taro, { Component } from '@tarojs/taro'
import { View, Block, Swiper, SwiperItem, ScrollView } from '@tarojs/components'
import PropTypes from 'prop-types'
import classnames from 'classnames/bind'
import { wxGetSystemInfo } from '@service/wechat'
import PlaneItems from '@components/PlanOrderItems/PlaneItems'
import styles from './index.module.css'
import { filterKeyInOrderList } from '@utils/utils'

const cx = classnames.bind(styles)

class PlaneList extends Component {
  static propTypes = {
    fromType: PropTypes.string,
    phoneSystem: PropTypes.object // 设备信息
  }

  static defaultProps = {
    fromType: 'plane'
  }

  state = {
    currentTab: 0, // tab的切换
    systemInfo: {}, // 系统信息
    allOrder: [], // 所有订单
    finishOrder: [], // 已完成的订单
    waitOrder: [], // 待出行订单
    refundOrder: [] // 退款订单
  }
  componentWillMount() {
    wxGetSystemInfo().then(res => {
      this.setState({
        systemInfo: { ...res }
      })
    })
    this.setState({
      allOrder: [...this.props.orderList]
    })
  }

  shouldComponentUpdate(nextProps) {
    const { orderList } = nextProps
    this.setState({
      allOrder: [...orderList],
      finishOrder: [...filterKeyInOrderList(orderList, 10)],
      waitOrder: [...filterKeyInOrderList(orderList, 20)],
      refundOrder: [...filterKeyInOrderList(orderList, 30)]
    })
  }
  handleSwitchTab = e => {
    let that = this
    if (that.state.currentTab == e.target.dataset.current) {
      return false
    } else {
      that.setState({
        currentTab: e.target.dataset.current
      })
    }
  }
  handleCurrentswiper = e => {
    this.setState({
      currentTab: e.detail.current
    })
  }

  render() {
    let transHeight = 0
    switch (this.state.systemInfo.windowWidth) {
      case 375:
        transHeight = 10.8
        break
      case 320:
        transHeight = 11
        break
      case 360:
        transHeight = 10.8
        break
      default:
        transHeight = 10.8
        break
    }
    let swiperHeight = 0
    switch (this.state.currentTab) {
      case 0:
        swiperHeight = this.state.allOrder.length === 0 ? 40 : this.state.allOrder.length * transHeight
        break
      case 1:
        swiperHeight = this.state.finishOrder.length === 0 ? 40 : this.state.finishOrder.length * transHeight
        break
      case 2:
        swiperHeight = this.state.waitOrder.length === 0 ? 40 : this.state.waitOrder.length * transHeight
        break
      case 3:
        swiperHeight = this.state.refundOrder.length === 0 ? 40 : this.state.refundOrder.length * transHeight
        break
      default:
        console.log('no height')
        break
    }
    return (
      <Block>
        <View className={styles.container}>
          <View className={styles.tab}>
            <View
              className={cx('items', {
                active: this.state.currentTab == 0
              })}
              data-current='0'
              onClick={this.handleSwitchTab}
            >
              全部
            </View>
            <View
              className={cx('items', {
                active: this.state.currentTab == 1
              })}
              data-current='1'
              onClick={this.handleSwitchTab}
            >
              已完成
            </View>
            <View
              className={cx('items', {
                active: this.state.currentTab == 2
              })}
              data-current='2'
              onClick={this.handleSwitchTab}
            >
              待出行
            </View>
            <View
              className={cx('items', {
                active: this.state.currentTab == 3
              })}
              data-current='3'
              onClick={this.handleSwitchTab}
            >
              退款单
            </View>
          </View>

          <Swiper
            current={this.state.currentTab}
            duration='300'
            style={{ clientHeight: `${this.state.systemInfo.windowHeight}px`, height: `${swiperHeight}rem` }}
            onChange={this.handleCurrentswiper}
          >
            <SwiperItem className='swiper-content'>
              <ScrollView
                scrollY={this.state.scrollY}
                style={{ clientHeight: `${this.state.systemInfo.windowHeight}px` }}
              >
                <View className={styles.swiperList}>
                  <PlaneItems orderList={this.state.allOrder} />
                </View>
              </ScrollView>
            </SwiperItem>
            <SwiperItem className='swiper-content'>
              <ScrollView scrollY={this.state.scrollY} style={{ clientHeight: `${this.state.winHeight}px` }}>
                <View className={styles.swiperList}>
                  <PlaneItems orderList={this.state.finishOrder} />
                </View>
              </ScrollView>
            </SwiperItem>
            <SwiperItem className='swiper-content'>
              <ScrollView scrollY={this.state.scrollY} style={{ clientHeight: `${this.state.winHeight}px` }}>
                <View className={styles.swiperList}>
                  <PlaneItems orderList={this.state.waitOrder} />
                </View>
              </ScrollView>
            </SwiperItem>
            <SwiperItem className='swiper-content'>
              <ScrollView scrollY={this.state.scrollY} style={{ clientHeight: `${this.state.winHeight}px` }}>
                <View className={styles.swiperList}>
                  <PlaneItems orderList={this.state.refundOrder} />
                </View>
              </ScrollView>
            </SwiperItem>
          </Swiper>
        </View>
      </Block>
    )
  }
}

export default PlaneList
