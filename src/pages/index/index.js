/**
 * 首页
 *
 * @summary
 * @author PDK
 *
 * Created at     : 2019-02-18
 * Last modified  : 2019-02-25
 */
import Taro, { Component } from '@tarojs/taro'
import { View, ScrollView, Input, Swiper, SwiperItem, Image } from '@tarojs/components'
import PropTypes from 'prop-types'
import { connect } from '@tarojs/redux'
import { authLogin, handleHttpResponse } from '@service/api'
import { actions as globalActions } from '@redux/global'
import { SwiperImage, RecommendPositon } from '@utils/app'
import AuthModal from '@components/AuthModal'
import Divider from '@components/Divider'
import TextMore from '@components/TextMore'
import RecommendListName from '@components/RecommendListName'
import BusIcon from '@assets/busIcon.png'
import MovieIcon from '@assets/movieIcon.png'
import TrainIcon from '@assets/trainIcon.png'
import PlaneIcon from '@assets/planeIcon.png'
import SwiperCover from '@assets/swiper_bg.png'
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
        {/* 飞机低价 */}
        <View className='index_pager_low_way plane-way'>
          <TextMore title='飞机低价' subtitle='你想要的出行方式' />
          <View className='items-container'>
            <View className='items-items'>
              <Image
                className='items-cover'
                src='http://gw.alicdn.com/bao/uploaded/i2/3915328473/TB2vpDBpYZnBKNjSZFhXXc.oXXa_!!3915328473.jpg_220x10000Q75.jpg_.web//gw.alicdn.com/bao/uploaded/i2/3177666734/TB2beAmoJRopuFjSZFtXXcanpXa_!!3177666734.jpg_220x10000Q75.jpg_.webp'
              />
              <View className='items-content'>早鸟特惠 | 爸妈放心 | 特价机票 - 海口飞成都</View>
              <View className='items-price'>¥ 745</View>
            </View>
            <View className='items-items'>
              <Image
                className='items-cover'
                src='http://gw.alicdn.com/bao/uploaded/i7/TB1eitoBpYqK1RjSZLeuFzXppXa_012548.jpg_220x10000Q75.jpg_.webp'
              />
              <View className='items-content'>早鸟特惠 | 爸妈放心 | 特价机票 - 海口飞成都</View>
              <View className='items-price'>¥ 745</View>
            </View>
            <View className='items-items'>
              <Image
                className='items-cover'
                src='http://gw.alicdn.com/bao/uploaded/i1/2482419657/O1CN012LCxGzEseLmT8Ne_!!2482419657.jpg_220x10000Q75.jpg_.webp'
              />
              <View className='items-content'>早鸟特惠 | 爸妈放心 | 特价机票 - 海口飞成都</View>
              <View className='items-price'>¥ 745</View>
            </View>
            <View className='items-items'>
              <Image
                className='items-cover'
                src='http://gw.alicdn.com/bao/uploaded/i2/TB1aqG5CAPoK1RjSZKbBXd1IXXa_122719.jpg_220x10000Q75.jpg_.webp'
              />
              <View className='items-content'>早鸟特惠 | 爸妈放心 | 特价机票 - 海口飞成都</View>
              <View className='items-price'>¥ 745</View>
            </View>
          </View>
        </View>
        {/* 火车低价 */}
        <View className='index_pager_low_way train-way'>
          <TextMore title='火车低价' subtitle='你想要的出行方式' />
          <View className='items-container'>
            <View className='items-items'>
              <Image
                className='items-cover'
                src='http://gw.alicdn.com/bao/uploaded/i4/2157654808/O1CN01QC5O4Q1lO6mBHnilL_!!2157654808.jpg_220x10000Q75.jpg_.webp'
              />
              <View className='items-content'>早鸟特惠 | 爸妈放心 | 特价机票 - 海口飞成都</View>
              <View className='items-price'>¥ 745</View>
            </View>
            <View className='items-items'>
              <Image
                className='items-cover'
                src='http:////gw.alicdn.com/bao/uploaded/i2/TB1eJvIDpzqK1RjSZFCLjbbxVXa_021511.jpg_220x10000Q75.jpg_.webp'
              />
              <View className='items-content'>早鸟特惠 | 爸妈放心 | 特价机票 - 海口飞成都</View>
              <View className='items-price'>¥ 745</View>
            </View>
            <View className='items-items'>
              <Image
                className='items-cover'
                src='http:////gw.alicdn.com/bao/uploaded/i3/3966623111/O1CN01lMEmSH1YqsdpxZKiT_!!3966623111.jpg_220x10000Q75.jpg_.webp'
              />
              <View className='items-content'>早鸟特惠 | 爸妈放心 | 特价机票 - 海口飞成都</View>
              <View className='items-price'>¥ 745</View>
            </View>
            <View className='items-items'>
              <Image
                className='items-cover'
                src='http://gw.alicdn.com/bao/uploaded/i1/3423324490/O1CN010Qgr921j2SoJP8Ebt_!!3423324490.jpg_220x10000Q75.jpg_.webp'
              />
              <View className='items-content'>早鸟特惠 | 爸妈放心 | 特价机票 - 海口飞成都</View>
              <View className='items-price'>¥ 745</View>
            </View>
          </View>
        </View>
        {/* 大巴低价 */}
        <View className='index_pager_low_way bus-way'>
          <TextMore title='大巴低价' subtitle='你想要的出行方式' />
          <View className='items-container'>
            <View className='items-items'>
              <Image
                className='items-cover'
                src='http://gw.alicdn.com/bao/uploaded/i2/TB1c4pukFooBKNjSZPhqmU2CXXa_034531.jpg_220x10000Q75.jpg_.webp'
              />
              <View className='items-content'>早鸟特惠 | 爸妈放心 | 特价机票 - 海口飞成都</View>
              <View className='items-price'>¥ 745</View>
            </View>
            <View className='items-items'>
              <Image
                className='items-cover'
                src='http://gw.alicdn.com/bao/uploaded/i1/3679568486/O1CN012CYdTmPBbCeVPi1_!!3679568486.jpg_220x10000Q75.jpg_.webp'
              />
              <View className='items-content'>早鸟特惠 | 爸妈放心 | 特价机票 - 海口飞成都</View>
              <View className='items-price'>¥ 745</View>
            </View>
            <View className='items-items'>
              <Image
                className='items-cover'
                src='http:////gw.alicdn.com/bao/uploaded/i4/2438152926/TB2.CFgjDcCL1FjSZFPXXXZgpXa_!!2438152926.jpg_220x10000Q75.jpg_.webp'
              />
              <View className='items-content'>早鸟特惠 | 爸妈放心 | 特价机票 - 海口飞成都</View>
              <View className='items-price'>¥ 745</View>
            </View>
            <View className='items-items'>
              <Image
                className='items-cover'
                src='http:////gw.alicdn.com/bao/uploaded/i3/3903337229/O1CN0123GvdLvWU3TzIiZ_!!3903337229.jpg_220x10000Q75.jpg_.webp'
              />
              <View className='items-content'>早鸟特惠 | 爸妈放心 | 特价机票 - 海口飞成都</View>
              <View className='items-price'>¥ 745</View>
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
