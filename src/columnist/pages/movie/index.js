/**
 * 电影列表 页面
 *
 * @summary
 * @author PDK
 *
 * Created at     : 2019-03-15
 * Last modified  : 2019-03-15
 */
import Taro, { Component } from '@tarojs/taro'
import { View, Swiper, SwiperItem, ScrollView } from '@tarojs/components'
import MovieItem from '@/columnist/components/MovieItem'
import classnames from 'classnames/bind'
import { wxGetSystemInfo } from '@service/wechat'
import { movie } from '@utils/app'
import styles from './index.module.css'

const cx = classnames.bind(styles)
class Movie extends Component {
  config = {
    navigationBarTitleText: '电影专区'
  }

  state = {
    currentTab: 0, // tab的切换
    systemInfo: {},
    scrollY: true
  }
  componentWillMount() {
    wxGetSystemInfo().then(res => {
      this.setState({
        systemInfo: { ...res }
      })
    })
  }

  componentDidMount() {}

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
    const { currentTab, scrollY } = this.state
    let transHeight = 0
    switch (this.state.systemInfo.windowWidth) {
      case 375:
        transHeight = 6
        break
      case 320:
        transHeight = 6.3
        break
      case 360:
        transHeight = 6
        break
      default:
        transHeight = 6
        break
    }
    const swiperHeight = movie.length * transHeight
    return (
      <View className={styles.container}>
        <View className={styles.tab}>
          <View className={cx('tab-item', { active: currentTab == 0 })} data-current='0' onClick={this.handleSwitchTab}>
            正在热映
          </View>
          <View className={cx('tab-item', { active: currentTab == 1 })} data-current='1' onClick={this.handleSwitchTab}>
            即将上映
          </View>
        </View>

        <Swiper
          current={currentTab}
          duration='300'
          style={{ height: `${swiperHeight}rem` }}
          onChange={this.handleCurrentswiper}
        >
          <SwiperItem>
            <ScrollView scrollY={scrollY} style={{ height: `${swiperHeight}rem` }}>
              <Block>
                {movie.map((item, index) => {
                  return <MovieItem movieItems={item} key={index} />
                })}
              </Block>
            </ScrollView>
          </SwiperItem>
          <SwiperItem>
            <ScrollView scrollY={scrollY} style={{ height: `${swiperHeight}rem` }}>
              <Block>
                {movie.map((item, index) => {
                  return <MovieItem movieItems={item} key={index} />
                })}
              </Block>
            </ScrollView>
          </SwiperItem>
        </Swiper>
      </View>
    )
  }
}

export default Movie
