/**
 * 首页
 *
 * @summary
 * @author PDK
 *
 * Created at     : 2018-09-03
 * Last modified  : 2018-09-03
 */
import Taro, { Component } from '@tarojs/taro'
import { View } from '@tarojs/components'
import PropTypes from 'prop-types'
import { connect } from '@tarojs/redux'
import { tiggerSaveUserInfo } from '../../store/actions/user'
import { savePhoneSystem } from '../../store/actions/global'
import Header from '../../components/Header'
import AuthModal from '../../components/AuthModal'
import './index.scss'
import {
  authLogin,
  handleHttpResponse
} from '../../service/api'

class Index extends Component {
  static propTypes = {
    saveUserInfo: PropTypes.func, // 保存用户信息
    saveUserPhoneSystem: PropTypes.func // 保存用户信息
  }
  static defaultProps = {
    headObj: {},
    entry: []
  }
  state = {
    headObj: {
      title: 'FOK ONE',
      content: '一款超强大的抢票系统',
      summary: '想看首映 ? 但是总抢不到票 ? 想买个情侣座 ? 但总抢不到合适的位置 ? '
    },
    showAuthModal: false, // 决定是否显示获取用户信息的授权弹框
    userMoney: 1000
  }
  config = {
    navigationBarTitleText: '首页'
  }

  componentWillUnmount () {
  }

  componentDidShow () {
    if (process.env.NODE_ENV === 'development') {
      Taro.getSetting().then((res) => {
        console.log(res)
        if (!res.authSetting['scope.userInfo']) {
          this.setState({
            showAuthModal: true
          })
        } else {
          Taro.checkSession().then(() => {  // 判断session是否失效，如果失效，重新发起登录
            console.log('session is ok')
            const token = Taro.getStorageSync('authToken')
            // this.login()  // 开发者工具和手机环境出现冲突，就使用这个方法重新token
            if (!token) {
              this.login()
            } else {
              Taro.getUserInfo().then((response) => {
                // 保存
                this.props.saveUserInfo(response.userInfo)
              })
            }
          }).catch(() => {    // session失效，重新登录
            this.login()
          })
        }
      })
    }
  }

  componentDidMount () {
    console.log('获取设备信息')
    let _this = this
    Taro.getSystemInfo({
      success: function(res) {
        _this.props.saveUserPhoneSystem(res)
      }
    })
  }

  login = () => {
    Taro.showLoading({
      title: '加载中...',
      mask: true
    })
    Taro.login().then(res => {
      console.log('login', res)
      return authLogin(res.code)
    }).then(res => {
      return handleHttpResponse(res)
    }).then(data => {
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
    }).then(res => {
      // 保存
      res.userInfo['money'] = this.state.userMoney
      this.props.saveUserInfo(res.userInfo)
    }).then(() => {
      Taro.hideLoading()
    }).catch(err => {
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

  render () {
    return (
      <View className='index'>
        <Header headObj={this.state.headObj} />
        {this.state.showAuthModal && (
          <AuthModal onCloseAuthModal={this.closeAuthModal} />
        )}
      </View>
    )
  }
}

const mapStateToProps = () => {
  return {
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    saveUserInfo: (jsondata) => {
      dispatch(tiggerSaveUserInfo(jsondata))
    },
    saveUserPhoneSystem: (phoneSystem) => {
      dispatch(savePhoneSystem(phoneSystem))
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Index)
