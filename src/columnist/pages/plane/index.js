/**
 * 飞机专栏
 *
 * @summary
 * @author PDK
 *
 * Created at     : 2019-02-28
 * Last modified  : 2019-02-28
 */
import Taro, { Component } from '@tarojs/taro'
import { Block, View, Image, Swiper, SwiperItem, ScrollView } from '@tarojs/components'
import classnames from 'classnames/bind'
import MainButton from '@components/MainButton'
import { wxGetSystemInfo } from '@service/wechat'
import planeIcon from '@assets/planeIcon.png'
import styles from './index.module.css'

const cx = classnames.bind(styles)

export default class Plane extends Component {
  config = {
    navigationBarTitleText: '飞机专栏',
    navigationBarBackgroundColor: '#fecf03'
  }
  state = {
    planeTab: 0,
    systemInfo: {}
  }
  componentWillMount() {
    wxGetSystemInfo().then(res => {
      this.setState({
        systemInfo: { ...res }
      })
    })
  }
  handleCurrentswiper = e => {
    this.setState({
      planeTab: e.detail.current
    })
  }
  handleSwitchTab = e => {
    let that = this
    if (that.state.planeTab == e.target.dataset.current) {
      return false
    } else {
      that.setState({
        planeTab: e.target.dataset.current
      })
    }
  }
  render() {
    const { systemInfo, planeTab } = this.state
    return (
      <Block>
        <View className={styles.container}>
          <View className={styles.box}>
            <View className={styles.tab}>
              <View
                className={cx('tabItems', {
                  active: planeTab == 0
                })}
                data-current='0'
                onClick={this.handleSwitchTab}
              >
                单程
              </View>
              <View
                className={cx('tabItems', {
                  active: planeTab == 1
                })}
                data-current='1'
                onClick={this.handleSwitchTab}
              >
                往返
              </View>
              <View
                className={cx('tabItems', {
                  active: planeTab == 2
                })}
                data-current='2'
                onClick={this.handleSwitchTab}
              >
                国际多程
              </View>
            </View>
            <Swiper
              current={planeTab}
              duration='300'
              style={{ clientHeight: `${systemInfo.windowHeight}px`, height: `12rem` }}
              onChange={this.handleCurrentswiper}
            >
              <SwiperItem className={styles.swiperContent}>
                <ScrollView scrollY style={{ clientHeight: `${systemInfo.windowHeight}px` }}>
                  <Block>
                    <View className={styles.swiperList}>
                      <View className={styles.text}>广州</View>
                      <Image src={planeIcon} className={styles.icon} />
                      <View className={styles.text}>成都</View>
                    </View>
                  </Block>
                  <Block>
                    <View className={styles.swiperList} style={{ height: '4rem' }}>
                      <View className={styles.secordText}>出发时间:</View>
                      <View className={styles.secordText}>2月20日</View>
                    </View>
                  </Block>
                  <Block>
                    <View className={styles.tips}>全程预定保障，易行让您更加容易出行</View>
                  </Block>
                </ScrollView>
              </SwiperItem>
              <SwiperItem className={styles.swiperContent}>
                <ScrollView scrollY style={{ clientHeight: `${systemInfo.windowHeight}px` }}>
                  <View className={styles.NotContentTip}>暂未开发此功能</View>
                </ScrollView>
              </SwiperItem>
              <SwiperItem className={styles.swiperContent}>
                <ScrollView scrollY style={{ clientHeight: `${systemInfo.windowHeight}px` }}>
                  <View className={styles.NotContentTip}>暂未开发此功能</View>
                </ScrollView>
              </SwiperItem>
            </Swiper>
          </View>
        </View>
        <View className={styles.action}>
          <MainButton text='搜索' color='primary' size='normal' />
        </View>
      </Block>
    )
  }
}
