/**
 * 首页
 *
 * @summary
 * @author PDK
 *
 * Created at     : 2019-02-18
 * Last modified  : 2019-03-03
 */
import Taro, { Component } from '@tarojs/taro'
import { View, ScrollView, Input, Swiper, SwiperItem, Image } from '@tarojs/components'
import PropTypes from 'prop-types'
// import classnames from 'classnames'
import { connect } from '@tarojs/redux'
import { authLogin, handleHttpResponse } from '@service/api'
import { actions as globalActions } from '@redux/global'
import { SwiperImage, RecommendPositon } from '@utils/app'
import AuthModal from '@components/AuthModal'
import IndexGrid from '@components/IndexGrid'
import TextMore from '@components/TextMore'
import RecommendListName from '@components/RecommendListName'
import SwiperCover from '@assets/swiper_bg.png'
import styles from './index.module.css'

const urlMap = {
  plane: '/columnist/pages/plane/index'
}
class Index extends Component {
  static propTypes = {
    saveUserInfo: PropTypes.func, // 保存用户信息
    saveUserPhoneSystem: PropTypes.func // 保存用户信息
  }

  state = {
    showAuthModal: false, // 决定是否显示获取用户信息的授权弹框
    userMoney: 1000
  }
  config = {
    navigationBarTitleText: '首页',
    navigationBarBackgroundColor: '#fecf03'
  }

  componentWillUnmount() {}

  componentWillMount() {
    let _this = this
    Taro.getSystemInfo({
      success: function(res) {
        _this.props.dispatch(globalActions.setPhoneSystem(res))
      }
    })
  }

  componentDidShow() {
    if (process.env.NODE_ENV !== 'development') {
      Taro.getSetting().then(res => {
        console.log(res)
        if (!res.authSetting['scope.userInfo']) {
          this.setState({
            showAuthModal: true
          })
        } else {
          Taro.checkSession()
            .then(() => {
              // 判断session是否失效，如果失效，重新发起登录
              console.log('session is ok')
              const token = Taro.getStorageSync('authToken')
              // this.login()  // 开发者工具和手机环境出现冲突，就使用这个方法重新token
              if (!token) {
                this.login()
              } else {
                Taro.getUserInfo().then(response => {
                  // 保存
                  this.props.onSaveUserInfo(response.userInfo)
                })
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
      title: '加载中...',
      mask: true
    })
    Taro.login()
      .then(res => {
        console.log('login', res)
        return authLogin(res.code)
      })
      .then(res => {
        return handleHttpResponse(res)
      })
      .then(data => {
        console.log(data)
        if (data.normalResult.code === 200) {
          this.authToken = data.loginCode
          Taro.setStorageSync('authToken', data.loginCode)
          this.setState({
            userMoney: data.money
          })
          return Taro.getUserInfo()
        } else if (data.normalResult.code === 400) {
          this.authToken = data.loginCode
          Taro.setStorageSync('authToken', data.loginCode)
          this.setState({
            userMoney: data.money
          })
          return Taro.getUserInfo()
        } else {
          throw new Error(data.msg)
        }
      })
      .then(res => {
        // 保存
        res.userInfo['money'] = this.state.userMoney
        this.props.onSaveUserInfo(res.userInfo)
      })
      .then(() => {
        Taro.hideLoading()
      })
      .catch(err => {
        Taro.hideLoading()
        Taro.showToast({
          title: err.message || err,
          icon: 'none',
          duration: 1000
        })
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

  handleRecommendChange = index => {
    console.log('选择', index)
  }

  render() {
    const { showAuthModal } = this.state
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
          <TextMore title='当季旅游地' />
          <ScrollView className={styles.remContainer} scrollX scrollWithAnimation>
            <View class={styles.remList}>
              {RecommendPositon.map((item, index) => (
                <RecommendListName
                  key={index}
                  index={index}
                  title={item.title}
                  cover={item.cover}
                  onClickRecommend={this.handleRecommendChange}
                />
              ))}
            </View>
          </ScrollView>
        </View>
        {/* 热门推荐 */}
        <View className={styles.hotContainer}>
          <TextMore title='热门推荐' subtitle='猜你喜欢这些地方' />
          <View className={styles.hotBox}>
            <View className={styles.hotCell}>
              <Image
                className={styles.hotImage}
                src='http://gw.alicdn.com/bao/uploaded/i2/3915328473/TB2vpDBpYZnBKNjSZFhXXc.oXXa_!!3915328473.jpg_220x10000Q75.jpg_.web//gw.alicdn.com/bao/uploaded/i2/3177666734/TB2beAmoJRopuFjSZFtXXcanpXa_!!3177666734.jpg_220x10000Q75.jpg_.webp'
              />
              <View className={styles.hotText}>丽江</View>
            </View>
            <View className={styles.hotCell}>
              <Image
                className={styles.hotImage}
                src='http://gw.alicdn.com/bao/uploaded/i2/3915328473/TB2vpDBpYZnBKNjSZFhXXc.oXXa_!!3915328473.jpg_220x10000Q75.jpg_.web//gw.alicdn.com/bao/uploaded/i2/3177666734/TB2beAmoJRopuFjSZFtXXcanpXa_!!3177666734.jpg_220x10000Q75.jpg_.webp'
              />
              <View className={styles.hotText}>丽江</View>
            </View>
            <View className={styles.hotCell}>
              <Image
                className={styles.hotImage}
                src='http://gw.alicdn.com/bao/uploaded/i2/3915328473/TB2vpDBpYZnBKNjSZFhXXc.oXXa_!!3915328473.jpg_220x10000Q75.jpg_.web//gw.alicdn.com/bao/uploaded/i2/3177666734/TB2beAmoJRopuFjSZFtXXcanpXa_!!3177666734.jpg_220x10000Q75.jpg_.webp'
              />
              <View className={styles.hotText}>丽江</View>
            </View>
            <View className={styles.hotCell}>
              <Image
                className={styles.hotImage}
                src='http://gw.alicdn.com/bao/uploaded/i2/3915328473/TB2vpDBpYZnBKNjSZFhXXc.oXXa_!!3915328473.jpg_220x10000Q75.jpg_.web//gw.alicdn.com/bao/uploaded/i2/3177666734/TB2beAmoJRopuFjSZFtXXcanpXa_!!3177666734.jpg_220x10000Q75.jpg_.webp'
              />
              <View className={styles.hotText}>丽江</View>
            </View>
            <View className={styles.hotCell}>
              <Image
                className={styles.hotImage}
                src='http://gw.alicdn.com/bao/uploaded/i2/3915328473/TB2vpDBpYZnBKNjSZFhXXc.oXXa_!!3915328473.jpg_220x10000Q75.jpg_.web//gw.alicdn.com/bao/uploaded/i2/3177666734/TB2beAmoJRopuFjSZFtXXcanpXa_!!3177666734.jpg_220x10000Q75.jpg_.webp'
              />
              <View className={styles.hotText}>丽江</View>
            </View>
            <View className={styles.hotCell}>
              <Image
                className={styles.hotImage}
                src='http://gw.alicdn.com/bao/uploaded/i2/3915328473/TB2vpDBpYZnBKNjSZFhXXc.oXXa_!!3915328473.jpg_220x10000Q75.jpg_.web//gw.alicdn.com/bao/uploaded/i2/3177666734/TB2beAmoJRopuFjSZFtXXcanpXa_!!3177666734.jpg_220x10000Q75.jpg_.webp'
              />
              <View className={styles.hotText}>丽江</View>
            </View>
          </View>
        </View>
        {/* 热门推荐 */}
        <View className={styles.hotContainer}>
          <TextMore title='热门推荐' subtitle='猜你喜欢这些地方' />
          <View className={styles.hotBox}>
            <View className={styles.hotCell}>
              <Image
                className={styles.hotImage}
                src='http://gw.alicdn.com/bao/uploaded/i2/3915328473/TB2vpDBpYZnBKNjSZFhXXc.oXXa_!!3915328473.jpg_220x10000Q75.jpg_.web//gw.alicdn.com/bao/uploaded/i2/3177666734/TB2beAmoJRopuFjSZFtXXcanpXa_!!3177666734.jpg_220x10000Q75.jpg_.webp'
              />
              <View className={styles.hotText}>丽江</View>
            </View>
            <View className={styles.hotCell}>
              <Image
                className={styles.hotImage}
                src='http://gw.alicdn.com/bao/uploaded/i2/3915328473/TB2vpDBpYZnBKNjSZFhXXc.oXXa_!!3915328473.jpg_220x10000Q75.jpg_.web//gw.alicdn.com/bao/uploaded/i2/3177666734/TB2beAmoJRopuFjSZFtXXcanpXa_!!3177666734.jpg_220x10000Q75.jpg_.webp'
              />
              <View className={styles.hotText}>丽江</View>
            </View>
            <View className={styles.hotCell}>
              <Image
                className={styles.hotImage}
                src='http://gw.alicdn.com/bao/uploaded/i2/3915328473/TB2vpDBpYZnBKNjSZFhXXc.oXXa_!!3915328473.jpg_220x10000Q75.jpg_.web//gw.alicdn.com/bao/uploaded/i2/3177666734/TB2beAmoJRopuFjSZFtXXcanpXa_!!3177666734.jpg_220x10000Q75.jpg_.webp'
              />
              <View className={styles.hotText}>丽江</View>
            </View>
            <View className={styles.hotCell}>
              <Image
                className={styles.hotImage}
                src='http://gw.alicdn.com/bao/uploaded/i2/3915328473/TB2vpDBpYZnBKNjSZFhXXc.oXXa_!!3915328473.jpg_220x10000Q75.jpg_.web//gw.alicdn.com/bao/uploaded/i2/3177666734/TB2beAmoJRopuFjSZFtXXcanpXa_!!3177666734.jpg_220x10000Q75.jpg_.webp'
              />
              <View className={styles.hotText}>丽江</View>
            </View>
            <View className={styles.hotCell}>
              <Image
                className={styles.hotImage}
                src='http://gw.alicdn.com/bao/uploaded/i2/3915328473/TB2vpDBpYZnBKNjSZFhXXc.oXXa_!!3915328473.jpg_220x10000Q75.jpg_.web//gw.alicdn.com/bao/uploaded/i2/3177666734/TB2beAmoJRopuFjSZFtXXcanpXa_!!3177666734.jpg_220x10000Q75.jpg_.webp'
              />
              <View className={styles.hotText}>丽江</View>
            </View>
            <View className={styles.hotCell}>
              <Image
                className={styles.hotImage}
                src='http://gw.alicdn.com/bao/uploaded/i2/3915328473/TB2vpDBpYZnBKNjSZFhXXc.oXXa_!!3915328473.jpg_220x10000Q75.jpg_.web//gw.alicdn.com/bao/uploaded/i2/3177666734/TB2beAmoJRopuFjSZFtXXcanpXa_!!3177666734.jpg_220x10000Q75.jpg_.webp'
              />
              <View className={styles.hotText}>丽江</View>
            </View>
          </View>
        </View>
        {/* 热门推荐 */}
        <View className={styles.hotContainer}>
          <TextMore title='热门推荐' subtitle='猜你喜欢这些地方' />
          <View className={styles.hotBox}>
            <View className={styles.hotCell}>
              <Image
                className={styles.hotImage}
                src='http://gw.alicdn.com/bao/uploaded/i2/3915328473/TB2vpDBpYZnBKNjSZFhXXc.oXXa_!!3915328473.jpg_220x10000Q75.jpg_.web//gw.alicdn.com/bao/uploaded/i2/3177666734/TB2beAmoJRopuFjSZFtXXcanpXa_!!3177666734.jpg_220x10000Q75.jpg_.webp'
              />
              <View className={styles.hotText}>丽江</View>
            </View>
            <View className={styles.hotCell}>
              <Image
                className={styles.hotImage}
                src='http://gw.alicdn.com/bao/uploaded/i2/3915328473/TB2vpDBpYZnBKNjSZFhXXc.oXXa_!!3915328473.jpg_220x10000Q75.jpg_.web//gw.alicdn.com/bao/uploaded/i2/3177666734/TB2beAmoJRopuFjSZFtXXcanpXa_!!3177666734.jpg_220x10000Q75.jpg_.webp'
              />
              <View className={styles.hotText}>丽江</View>
            </View>
            <View className={styles.hotCell}>
              <Image
                className={styles.hotImage}
                src='http://gw.alicdn.com/bao/uploaded/i2/3915328473/TB2vpDBpYZnBKNjSZFhXXc.oXXa_!!3915328473.jpg_220x10000Q75.jpg_.web//gw.alicdn.com/bao/uploaded/i2/3177666734/TB2beAmoJRopuFjSZFtXXcanpXa_!!3177666734.jpg_220x10000Q75.jpg_.webp'
              />
              <View className={styles.hotText}>丽江</View>
            </View>
            <View className={styles.hotCell}>
              <Image
                className={styles.hotImage}
                src='http://gw.alicdn.com/bao/uploaded/i2/3915328473/TB2vpDBpYZnBKNjSZFhXXc.oXXa_!!3915328473.jpg_220x10000Q75.jpg_.web//gw.alicdn.com/bao/uploaded/i2/3177666734/TB2beAmoJRopuFjSZFtXXcanpXa_!!3177666734.jpg_220x10000Q75.jpg_.webp'
              />
              <View className={styles.hotText}>丽江</View>
            </View>
            <View className={styles.hotCell}>
              <Image
                className={styles.hotImage}
                src='http://gw.alicdn.com/bao/uploaded/i2/3915328473/TB2vpDBpYZnBKNjSZFhXXc.oXXa_!!3915328473.jpg_220x10000Q75.jpg_.web//gw.alicdn.com/bao/uploaded/i2/3177666734/TB2beAmoJRopuFjSZFtXXcanpXa_!!3177666734.jpg_220x10000Q75.jpg_.webp'
              />
              <View className={styles.hotText}>丽江</View>
            </View>
            <View className={styles.hotCell}>
              <Image
                className={styles.hotImage}
                src='http://gw.alicdn.com/bao/uploaded/i2/3915328473/TB2vpDBpYZnBKNjSZFhXXc.oXXa_!!3915328473.jpg_220x10000Q75.jpg_.web//gw.alicdn.com/bao/uploaded/i2/3177666734/TB2beAmoJRopuFjSZFtXXcanpXa_!!3177666734.jpg_220x10000Q75.jpg_.webp'
              />
              <View className={styles.hotText}>丽江</View>
            </View>
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
