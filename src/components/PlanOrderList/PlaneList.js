/**
 * 飞机票列表页面
 *
 * @summary
 * @author PDK
 *
 * Created at     : 2019-02-24
 * Last modified  : 2019-02-25
 */
import Taro, { Component } from '@tarojs/taro'
import { View, Block, Swiper, SwiperItem, ScrollView } from '@tarojs/components'
import { actions as planeActions } from '@redux/plane'
import PropTypes from 'prop-types'
import classnames from 'classnames'
import { connect } from '@tarojs/redux'
import PlaneItems from '@components/PlanOrderItems/PlaneItems'
import './index.scss'

class PlaneList extends Component {
  static propTypes = {
    fromType: PropTypes.string,
    phoneSystem: PropTypes.object // 设备信息
  }

  static defaultProps = {
    fromType: 'plane'
  }

  state = {
    currentTab: 0 // tab的切换
  }
  componentWillMount() {
    console.log(this.props)
    const { dispatch } = this.props
    try {
      dispatch(planeActions.setPlaneList())
    } catch (err) {
      console.log('error')
    }
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
    switch (this.props.phoneSystem.windowWidth) {
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
    // const swiperHeight = this.props.list.length * transHeight
    const swiperHeight = 3 * transHeight
    return (
      <Block>
        <View className='planlist-container'>
          <View className='planlist-tab'>
            <View
              className={classnames('tab-list', {
                active: this.state.currentTab == 0
              })}
              data-current='0'
              onClick={this.handleSwitchTab}
            >
              全部
            </View>
            <View
              className={classnames('tab-list', {
                active: this.state.currentTab == 1
              })}
              data-current='1'
              onClick={this.handleSwitchTab}
            >
              待出票
            </View>
            <View
              className={classnames('tab-list', {
                active: this.state.currentTab == 2
              })}
              data-current='2'
              onClick={this.handleSwitchTab}
            >
              已出票
            </View>
            <View
              className={classnames('tab-list', {
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
            className='swiper-box'
            duration='300'
            style={{ clientHeight: `${this.props.phoneSystem.windowHeight}px`, height: `${swiperHeight}rem` }}
            onChange={this.handleCurrentswiper}
          >
            <SwiperItem className='swiper-content'>
              <ScrollView
                scrollY={this.state.scrollY}
                style={{ clientHeight: `${this.props.phoneSystem.windowHeight}px` }}
              >
                <View className='swiper-list'>
                  <PlaneItems />
                </View>
              </ScrollView>
            </SwiperItem>
            <SwiperItem className='swiper-content'>
              <ScrollView scrollY={this.state.scrollY} style={{ clientHeight: `${this.state.winHeight}px` }}>
                <View className='swiper-list'>2</View>
              </ScrollView>
            </SwiperItem>
            <SwiperItem className='swiper-content'>
              <ScrollView scrollY={this.state.scrollY} style={{ clientHeight: `${this.state.winHeight}px` }}>
                <View className='swiper-list'>3</View>
              </ScrollView>
            </SwiperItem>
            <SwiperItem className='swiper-content'>
              <ScrollView scrollY={this.state.scrollY} style={{ clientHeight: `${this.state.winHeight}px` }}>
                <View className='swiper-list'>4</View>
              </ScrollView>
            </SwiperItem>
          </Swiper>
        </View>
      </Block>
    )
  }
}

const mapStateToProps = state => {
  let phoneSystem = state.global.phoneSystem
  return {
    phoneSystem,
    ...state.plane
  }
}
export default connect(mapStateToProps)(PlaneList)
