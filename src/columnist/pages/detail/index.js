/**
 * 飞机专栏
 *
 * @summary
 * @author PDK
 *
 * Created at     : 2019-04-28
 * Last modified  : 2019-04-28
 */
import Taro, { Component } from '@tarojs/taro'
import { Block, View, Image, Swiper, SwiperItem, ScrollView, Picker } from '@tarojs/components'
import classnames from 'classnames/bind'
import { connect } from '@tarojs/redux'
import { actions as globalActions } from '@redux/global'
import MainButton from '@components/MainButton'
import { wxGetSystemInfo } from '@service/wechat'
import PlaneIcon from '@assets/icon/planeIcon.png'
import TrainIcon from '@assets/icon/trainIcon.png'
import BusIcon from '@assets/icon/busIcon.png'
import styles from './index.module.css'

const cx = classnames.bind(styles)

class Detail extends Component {
  config = {
    navigationBarTitleText: '快买票鸭',
    navigationBarBackgroundColor: '#fecf03'
  }

  state = {
    tab: 0,
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
      tab: e.detail.current
    })
  }

  handleSwitchTab = e => {
    let that = this
    if (that.state.tab == e.target.dataset.current) {
      return false
    } else {
      that.setState({
        tab: e.target.dataset.current
      })
    }
  }

  // 选择时间
  onDateChange = e => {
    this.props.dispatch(globalActions.setStartTime(e.detail.value))
  }

  // 选择城市
  handleChangeCity = typeCity => {
    Taro.navigateTo({
      url: `/columnist/pages/city/index?fromUrl=detail&typeCity=${typeCity}`
    })
  }

  // 提示
  handleTipsWarning = () => {
    const { toCityName } = this.props
    Taro.showToast({
      title: `不可修改，目的地: ${toCityName}`,
      icon: 'none',
      duration: 1500
    })
  }

  render() {
    const { systemInfo, tab } = this.state
    const { fromCityName, toCityName, startTime } = this.props
    return (
      <Block>
        <View className={styles.container}>
          <View className={styles.box}>
            <View className={styles.tab}>
              <View
                className={cx('tabItems', {
                  active: tab == 0
                })}
                data-current='0'
                onClick={this.handleSwitchTab}
              >
                飞机
              </View>
              <View
                className={cx('tabItems', {
                  active: tab == 1
                })}
                data-current='1'
                onClick={this.handleSwitchTab}
              >
                火车
              </View>
              <View
                className={cx('tabItems', {
                  active: tab == 2
                })}
                data-current='2'
                onClick={this.handleSwitchTab}
              >
                大巴
              </View>
            </View>
            <Swiper
              current={tab}
              duration='300'
              style={{ clientHeight: `${systemInfo.windowHeight}px`, height: `12rem` }}
              onChange={this.handleCurrentswiper}
            >
              <SwiperItem className={styles.swiperContent}>
                <ScrollView scrollY style={{ clientHeight: `${systemInfo.windowHeight}px` }}>
                  <Block>
                    <View className={styles.swiperList}>
                      <View className={styles.text} onClick={() => this.handleChangeCity('fromCity')}>{fromCityName}</View>
                      <Image src={PlaneIcon} className={styles.icon} />
                      <View className={cx('text', 'disableAddress')} onClick={this.handleTipsWarning}>{toCityName}</View>
                    </View>
                  </Block>
                  <Block>
                    <View className={styles.swiperList} style={{ height: '4rem' }}>
                      <View className={styles.secordText}>出发时间:</View>
                      <View className={styles.secordText}>
                        <Picker mode='date' onChange={this.onDateChange}>
                          <View className='picker'>
                            {startTime}
                          </View>
                        </Picker>
                      </View>
                    </View>
                  </Block>
                  <Block>
                    <View className={styles.tips}>全程预定保障，易行让您更加容易出行</View>
                  </Block>
                </ScrollView>
              </SwiperItem>
              <SwiperItem className={styles.swiperContent}>
                <ScrollView scrollY style={{ clientHeight: `${systemInfo.windowHeight}px` }}>
                  <Block>
                    <View className={styles.swiperList}>
                      <View className={styles.text} onClick={() => this.handleChangeCity('fromCity')}>{fromCityName}</View>
                      <Image src={TrainIcon} className={styles.icon} />
                      <View className={cx('text', 'disableAddress')} onClick={this.handleTipsWarning}>{toCityName}</View>
                    </View>
                  </Block>
                  <Block>
                    <View className={styles.swiperList} style={{ height: '4rem' }}>
                      <View className={styles.secordText}>出发时间:</View>
                      <View className={styles.secordText}>
                        <Picker mode='date' onChange={this.onDateChange}>
                          <View className='picker'>
                            {startTime}
                          </View>
                        </Picker>
                      </View>
                    </View>
                  </Block>
                  <Block>
                    <View className={styles.tips}>全程预定保障，易行让您更加容易出行</View>
                  </Block>
                </ScrollView>
              </SwiperItem>
              <SwiperItem className={styles.swiperContent}>
                <ScrollView scrollY style={{ clientHeight: `${systemInfo.windowHeight}px` }}>
                  <Block>
                    <View className={styles.swiperList}>
                      <View className={styles.text} onClick={() => this.handleChangeCity('fromCity')}>{fromCityName}</View>
                      <Image src={BusIcon} className={styles.icon} />
                      <View className={cx('text', 'disableAddress')} onClick={this.handleTipsWarning}>{toCityName}</View>
                    </View>
                  </Block>
                  <Block>
                    <View className={styles.swiperList} style={{ height: '4rem' }}>
                      <View className={styles.secordText}>出发时间:</View>
                      <View className={styles.secordText}>
                        <Picker mode='date' onChange={this.onDateChange}>
                          <View className='picker'>
                            {startTime}
                          </View>
                        </Picker>
                      </View>
                    </View>
                  </Block>
                  <Block>
                    <View className={styles.tips}>全程预定保障，易行让您更加容易出行</View>
                  </Block>
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

const mapStateToProps = ({ global }) => ({
  ...global
})

export default connect(mapStateToProps)(Detail)
