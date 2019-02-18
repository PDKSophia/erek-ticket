/**
 * 首页
 *
 * @summary
 * @author PDK
 *
 * Created at     : 2019-02-18
 * Last modified  : 2019-02-18
 */
import Taro, { Component } from '@tarojs/taro'
import { View, ScrollView, Input, Swiper, SwiperItem, Image } from '@tarojs/components'
import PropTypes from 'prop-types'
import { connect } from '@tarojs/redux'
import { tiggerSaveUserInfo } from '../../store/actions/user'
import { authLogin, handleHttpResponse } from '../../service/api'
import { savePhoneSystem } from '../../store/actions/global'
import { SwiperImage, RecommendPositon } from '../../utils/app'
import AuthModal from '../../components/AuthModal'
import Divider from '../../components/Divider'
import TextMore from '../../components/TextMore'
import RecommendListName from '../../components/RecommendListName'
import BusIcon from '../../assets/busIcon.png'
import MovieIcon from '../../assets/movieIcon.png'
import TrainIcon from '../../assets/trainIcon.png'
import PlaneIcon from '../../assets/planeIcon.png'
import SwiperCover from '../../assets/swiper_bg.png'
import './index.scss'

class Index extends Component {
  static propTypes = {
    saveUserInfo: PropTypes.func, // 保存用户信息
    saveUserPhoneSystem: PropTypes.func // 保存用户信息
  }

  state = {
    showAuthModal: false, // 决定是否显示获取用户信息的授权弹框
    userMoney: 1000,
    gridArr: [
      {
        iconPath: PlaneIcon,
        text: '飞机',
        pathUrl: ''
      },
      {
        iconPath: TrainIcon,
        text: '火车票',
        pathUrl: ''
      },
      {
        iconPath: BusIcon,
        text: '汽车票',
        pathUrl: 'wallet'
      },
      {
        iconPath: MovieIcon,
        text: '电影票',
        pathUrl: ''
      }
    ]
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
        console.log(res)
        _this.props.saveUserPhoneSystem(res)
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

  handleChangeUrl = _url => {
    if (_url !== 'ticketcode' && _url !== 'wallet') {
      Taro.showToast({
        title: '该专区正开发中',
        duration: 2000,
        icon: 'none'
      })
    } else {
      Taro.navigateTo({
        url: `/pages/${_url}/index`
      })
    }
  }

  handleRecommendChange = index => {
    console.log('选择', index)
  }

  render() {
    const { gridArr, showAuthModal } = this.state
    return (
      <View className='index_pager_2'>
        <Image className='swiper-cover' src={SwiperCover} alt='底图' />
        <View className='swiper-search'>
          <Input className='search-text' type='text' placeholder='火车票 / 电影票 / 优惠券' />
        </View>
        <View className='swiper-image'>
          <Swiper
            className='swiper-container'
            indicatorColor='#999'
            indicatorActiveColor='#333'
            circular
            autoplay
            interval='1500'
          >
            {SwiperImage.map((item, index) => {
              return (
                <SwiperItem key={index}>
                  <Image className='cover-image' style={{ width: '100%', height: '100%' }} src={item} />
                </SwiperItem>
              )
            })}
          </Swiper>
        </View>
        <View className='index_pager_grid'>
          <View className='index_pager_grid_container'>
            {gridArr.map((item, index) => {
              return (
                <View className='flex-cell' key={index} onClick={this.handleChangeUrl.bind(this, item.pathUrl)}>
                  <Image className='grid_iconPath' src={item.iconPath} />
                  <View className='grid_text'>{item.text}</View>
                </View>
              )
            })}
          </View>
        </View>
        <View className='index_pager_divider'>
          <Divider height='1px' />
        </View>
        <View className='index_pager_recommend'>
          <TextMore title='当季旅游地' />
          <ScrollView className='course-name' scrollX scrollWithAnimation>
            <View class='course-container'>
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
        <View className='index_pager_price'>
          <TextMore title='特价专区' subtitle='最适合你的出行价格' />
          <ScrollView className='course-name' scrollX scrollWithAnimation>
            <View class='course-container'>
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
        {showAuthModal && <AuthModal onCloseAuthModal={this.closeAuthModal} />}
      </View>
    )
  }
}

const mapStateToProps = () => {
  return {}
}

const mapDispatchToProps = dispatch => {
  return {
    saveUserInfo: jsondata => {
      dispatch(tiggerSaveUserInfo(jsondata))
    },
    saveUserPhoneSystem: phoneSystem => {
      dispatch(savePhoneSystem(phoneSystem))
    }
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Index)
