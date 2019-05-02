/**
 * 首页
 *
 * @summary
 * @author PDK
 *
 * Created at     : 2019-02-18
 * Last modified  : 2019-03-14
 */
import Taro, { Component } from '@tarojs/taro'
import { View, ScrollView, Input, Swiper, SwiperItem, Image } from '@tarojs/components'
import { connect } from '@tarojs/redux'
import { authToken } from '@service/api'
import { wxGetSystemInfo } from '@service/wechat'
import { actions as globalActions } from '@redux/global'
import { actions as userActions } from '@redux/user'
import { SwiperImage } from '@utils/app'
import AuthModal from '@components/AuthModal'
import IndexGrid from '@components/IndexGrid'
import TextMore from '@components/TextMore'
import SwiperCover from '@assets/swiper_bg.png'
import RecommendListName from '@components/RecommendListName'
import styles from './index.module.css'

const urlMap = {
  plane: '/columnist/pages/plane/index'
}
class Index extends Component {
  state = {
    showAuthModal: false, // 决定是否显示获取用户信息的授权弹框
    userMoney: 1000
  }
  config = {
    navigationBarTitleText: '首页',
    navigationBarBackgroundColor: '#fecf03'
  }

  async componentWillMount() {
    wxGetSystemInfo()
      .then(res => {
        this.props.dispatch(globalActions.setPhoneSystem(res))
      })
      .catch(err => {
        console.log(err)
      })
    await this.props.dispatch(globalActions.retrieveTravelCityAsync())
    await this.props.dispatch(globalActions.retrieveRecommendCityAsync())
    await this.props.dispatch(globalActions.retrieveStylesCityAsync())
  }

  componentDidShow() {
    if (process.env.NODE_ENV === 'development') {
      Taro.getSetting().then(res => {
        if (!res.authSetting['scope.userInfo']) {
          this.setState({
            showAuthModal: true
          })
        } else {
          Taro.checkSession()
            .then(() => {
              // 判断session是否失效，如果失效，重新发起登录
              const token = Taro.getStorageSync('authToken')
              // this.login()  // 开发者工具和手机环境出现冲突，就使用这个方法重新token
              if (!token) {
                this.login()
              } else {
                this.props.dispatch(userActions.retrieveUserInfo())
              }
            })
            .catch(() => {
              // session失效，重新登录
              this.login()
            })
        }
      })
    }
  }

  login = () => {
    Taro.showLoading({
      title: '加载中',
      mask: true
    })
    Taro.login()
      .then(async res => {
        const code = res.code
        const user = await Taro.getUserInfo()
        let options = {
          nickname: user.userInfo.nickName,
          avatar: user.userInfo.avatarUrl,
          code: code
        }
        return authToken(options)
      })
      .then(async result => {
        await Taro.setStorageSync('authToken', result.token)
        this.props.dispatch(userActions.retrieveUserInfo())
      })
      .then(
        () => {
          Taro.hideLoading()
        },
        () => {
          Taro.hideLoading()
        }
      )
  }

  relaunch = () => {
    Taro.reLaunch({
      url: '/pages/index/index'
    })
  }

  closeAuthModal = () => {
    this.setState({
      showAuthModal: false
    })
    this.login()
  }

  handleChangeUrl = type => {
    if (!urlMap[type]) {
      Taro.showToast({
        title: '功能陆续开放中，敬请期待~',
        icon: 'none'
      })
    } else {
      Taro.navigateTo({
        url: urlMap[type]
      })
    }
  }

  handleToCityPosition = item => {
    this.props.dispatch(globalActions.setCurrentCity(item))
    Taro.navigateTo({
      url: `/pages/detail/index?cityId=${item.id}&cityName=${item.city_name}`
    })
  }

  render() {
    const { showAuthModal } = this.state
    const { recommendList, stylesList, travelList } = this.props
    return (
      <View className={styles.container}>
        <Image className={styles.cover} src={SwiperCover} alt='bgLogo' />
        <View className={styles.searchContainer}>
          <Input className={styles.searchText} type='text' placeholder='火车票 / 电影票 / 优惠券' />
        </View>
        <View className={styles.swiperContainer}>
          <Swiper
            className={styles.swiperBox}
            indicatorColor='#999'
            indicatorActiveColor='#333'
            circular
            autoplay
            interval='1500'
          >
            {SwiperImage.map((item, index) => {
              return (
                <SwiperItem key={index}>
                  <Image className={styles.swiperImages} style={{ width: '100%', height: '100%' }} src={item} />
                </SwiperItem>
              )
            })}
          </Swiper>
        </View>
        <IndexGrid />
        <View className={styles.recommend}>
          <TextMore title='热门推荐' />
          <ScrollView className={styles.remContainer} scrollX scrollWithAnimation>
            <View class={styles.remList}>
              {recommendList.map((item, index) => (
                <RecommendListName
                  key={index}
                  index={index}
                  title={item.city_name}
                  cover={item.city_cover}
                  onClickRecommend={() => this.handleToCityPosition(item)}
                />
              ))}
            </View>
          </ScrollView>
        </View>
        {/* 当季旅游地 */}
        <View className={styles.hotContainer}>
          <TextMore title='当季旅游地' subtitle='猜你喜欢这些地方' />
          <View className={styles.hotBox}>
            {travelList.map(item => {
              return (
                <View className={styles.hotCell} key={item.id} onClick={() => this.handleToCityPosition(item)}>
                  <Image className={styles.hotImage} src={item.city_cover} />
                  <View className={styles.hotText}>{item.city_name}</View>
                  <View className={styles.hotSummary}>{item.city_summary}</View>
                </View>
              )
            })}
          </View>
        </View>
        {/* 每日福利 */}
        <View className={styles.hotContainer}>
          <TextMore title='每日福利' subtitle='福利天天领' />
          <View className={styles.welfareContainer}>
            <View className={styles.welfareItems}>
              <View className={styles.welfateText}>影院特惠</View>
              <Image
                className={styles.movieCover}
                src='http://gw.alicdn.com/bao/uploaded/i2/3915328473/TB2vpDBpYZnBKNjSZFhXXc.oXXa_!!3915328473.jpg_220x10000Q75.jpg_.web//gw.alicdn.com/bao/uploaded/i2/3177666734/TB2beAmoJRopuFjSZFtXXcanpXa_!!3177666734.jpg_220x10000Q75.jpg_.webp'
              />
            </View>
            <View className={styles.welfareItems}>
              <View className={styles.welfateText}>特价机票</View>
              <Image
                className={styles.planeCover}
                src='http://gw.alicdn.com/bao/uploaded/i2/3915328473/TB2vpDBpYZnBKNjSZFhXXc.oXXa_!!3915328473.jpg_220x10000Q75.jpg_.web//gw.alicdn.com/bao/uploaded/i2/3177666734/TB2beAmoJRopuFjSZFtXXcanpXa_!!3177666734.jpg_220x10000Q75.jpg_.webp'
              />
              <Image
                className={styles.planeCover}
                src='http://gw.alicdn.com/bao/uploaded/i2/3915328473/TB2vpDBpYZnBKNjSZFhXXc.oXXa_!!3915328473.jpg_220x10000Q75.jpg_.web//gw.alicdn.com/bao/uploaded/i2/3177666734/TB2beAmoJRopuFjSZFtXXcanpXa_!!3177666734.jpg_220x10000Q75.jpg_.webp'
              />
            </View>
            <View className={styles.welfareMore}>更多</View>
          </View>
        </View>
        {/* 旅游主题 */}
        <View className={styles.travelContainer}>
          <TextMore title='旅游主题' subtitle='来场说走就走的旅行' />
          <View className={styles.travelBox}>
            {stylesList.map(item => {
              return (
                <View className={styles.travelCell} key={item.id} onClick={() => this.handleToCityPosition(item)}>
                  <Image className={styles.travelImage} src={item.city_cover} />
                  <View className={styles.travelText}>{item.city_name}</View>
                </View>
              )
            })}
          </View>
        </View>
        {showAuthModal && <AuthModal onCloseAuthModal={this.closeAuthModal} />}
      </View>
    )
  }
}

const mapStateToProps = ({ global }) => ({
  ...global
})

export default connect(mapStateToProps)(Index)
