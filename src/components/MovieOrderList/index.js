/**
 * 我的电影票
 *
 * @summary
 * @author PDK
 *
 * Created at     : 2018-02-24
 * Last modified  : 2018-02-24
 */
import Taro, { Component } from '@tarojs/taro'
import { View, Image } from '@tarojs/components'
import CallPhoneModal from '@components/CallPhoneModal'
import { CallPhoeConfig } from '@utils/app.js'
import PropTypes from 'prop-types'
import './index.scss'
import PhoneImage from '../../assets/phone.png'
import TestUrl from '../../assets/code.jpeg'

class MovieOrderList extends Component {
  static propTypes = {
    isFetchUserMap: PropTypes.bool, // 是否需要请求
    userMap: PropTypes.object, // 用户的其他信息
    changeFetchUserInfo: PropTypes.func
  }

  static defaultProps = {
    userMap: {
      order: []
    }
  }

  config = {
    navigationBarTitleText: '我的电影票'
  }

  state = {
    openModal: false,
    CallPhoeConfig: {}
  }

  componentDidMount() {
    // 请求，覆盖值
    this.setState({
      CallPhoeConfig: Object.assign({}, CallPhoeConfig)
    })
  }

  callPhoneNumber = () => {
    this.setState({
      openModal: !this.state.openModal
    })
  }

  handleOnOK = () => {
    this.callPhoneNumber()
    Taro.showToast({
      title: '加载中',
      icon: 'loading',
      duration: 1500
    })
    setTimeout(() => {
      Taro.makePhoneCall({
        phoneNumber: this.state.content.phone
      })
    }, 1500)
  }

  render() {
    return (
      <View className='movielist-container'>
        <View className='movie-code-item'>
          <View className='flex_pager_container'>
            <View className='flex_pager_left'>
              <View className='movie_text'>复仇者联盟3:王二起源</View>
              <View className='movie_content'>2019-02-24 19:20</View>
              <View className='movie_content'>万达影院</View>
            </View>
            <View className='flex_pager_right'>
              <Image className='movie_cover' src={TestUrl} />
            </View>
          </View>
          <View className='movie_scan_container'>
            <View className='scan_code_title'>取电影票</View>
            <View className='code_image_push'>
              <Image className='scan_code-img' src={TestUrl} />
              <View className='bg_button_pushcode'>取票码: 8618232</View>
            </View>
          </View>
          <View className='flex_pager_container' style={{ borderBottom: 'none' }}>
            <View className='flex_pager_left' style={{ width: '80%', margin: '16px 0' }}>
              <View className='movie_text cinema-title'>万达影院</View>
              <View className='movie_content cinema-address'>四川省成都市一周国际广场</View>
            </View>
            <View className='flex_pager_right play-right' style={{ width: '20%' }}>
              <Image className='play-phone_icon' onClick={this.callPhoneNumber} src={PhoneImage} />
            </View>
          </View>
        </View>
        <View className='movie-code-item'>
          <View className='flex_pager_container'>
            <View className='flex_pager_left'>
              <View className='movie_text'>复仇者联盟3:王二起源</View>
              <View className='movie_content'>2019-02-24 19:20</View>
              <View className='movie_content'>万达影院</View>
            </View>
            <View className='flex_pager_right'>
              <Image className='movie_cover' src={TestUrl} />
            </View>
          </View>
          <View className='movie_scan_container'>
            <View className='scan_code_title'>取电影票</View>
            <View className='code_image_push'>
              <Image className='scan_code-img' src={TestUrl} />
              <View className='bg_button_pushcode'>取票码: 8618232</View>
            </View>
          </View>
          <View className='flex_pager_container' style={{ borderBottom: 'none' }}>
            <View className='flex_pager_left' style={{ width: '80%', margin: '16px 0' }}>
              <View className='movie_text cinema-title'>万达影院</View>
              <View className='movie_content cinema-address'>四川省成都市一周国际广场</View>
            </View>
            <View className='flex_pager_right play-right' style={{ width: '20%' }}>
              <Image className='play-phone_icon' onClick={this.callPhoneNumber} src={PhoneImage} />
            </View>
          </View>
        </View>
        {this.state.openModal && (
          <CallPhoneModal
            CallPhoeConfig={this.state.CallPhoeConfig}
            onToggleModal={this.callPhoneNumber}
            onHandleOnOK={this.handleOnOK}
          />
        )}
      </View>
    )
  }
}

export default MovieOrderList
