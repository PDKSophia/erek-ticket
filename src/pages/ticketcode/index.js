/**
 * 我的二维码 页面
 *
 * @summary
 * @author PDK
 *
 * Created at     : 2018-09-06
 * Last modified  : 2018-09-06
 */
import Taro, { Component } from '@tarojs/taro'
import { View, Image } from '@tarojs/components'
import PropTypes from 'prop-types'
import { connect } from '@tarojs/redux'
import { changeUserFlag } from '../../store/actions/user'
import './index.scss'
import PhoneImage from '../../assets/phone.png'
import CallPhoneModal from '../../components/Modal'

class Ticketcode extends Component {
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
    navigationBarTitleText: '我的二维码'
  }

  state = {
    showModal: false,
    modalContent: {
      title: '你将拨打此电话',
      phone: '18976078869'
    }
  }

  componentDidShow () {
    if (!this.props.isFetchUserMap) {
      console.log('需要请求')
      this.props.changeFetchUserInfo()
    }
    console.log(this.props.userMap)
  }

  handleShowModal = () => {
    this.setState({
      showModal: !this.state.showModal
    })
  }

  callPhoneNumber = () => {
    this.setState({
      showModal: !this.state.showModal
    })
  }

  handleOnOK = () => {
    this.handleShowModal()
    Taro.showToast({
      title: '加载中',
      icon: 'loading',
      duration: 1500
    })
    setTimeout(() => {
      Taro.makePhoneCall({
        phoneNumber: this.state.modalContent.phone
      })
    }, 1500)
  }
  render () {
    return (
      <View className='code'>
        {this.props.userMap.order.map((ord, keys) => {
          return <View className='ticket-code-item' key={keys}>
            <View className='flex-box_code'>
              <View className='movie_left-code'>
                <View className='ticket-title-text'>{ord.movie.name}</View>
                <View className='ticket-content-text'>{ord.movie.time}</View>
                <View className='ticket-content-text'>{ord.cinema.name}</View>
              </View>
              <View className='movie_right-code'>
                <Image className='movie_cover-image' src={ord.movie.cover} />
              </View>
            </View>
            <View className='ticket-scan-code'>
              <View className='scan-code_title'>取电影票</View>
              <View className='code_image_push'>
                <Image className='scan_code-img' src={ord.codeUrl} />
                <View className='bg_button_pushcode'>取票码: {ord.pushCode}</View>
              </View>
            </View>
            <View className='flex-box_code' style={{ borderBottom: 'none' }}>
              <View className='movie_left-code' style={{ width: '80%', margin: '16px 0' }}>
                <View className='ticket-title-text cinema-title'>{ord.cinema.name}</View>
                <View className='ticket-content-text cinema-address'>{ord.cinema.location}</View>
              </View>
              <View className='movie_right-code play-right' style={{ width: '20%' }}>
                <Image className='play-phone_icon' onClick={this.callPhoneNumber} src={PhoneImage} />
              </View>
            </View>
          </View>
        })}
        {this.state.showModal&&<CallPhoneModal 
          modalContent={this.state.modalContent}
          onHandleShowModal={this.handleShowModal}
          onHandleOnOK={this.handleOnOK} 
        />}
      </View>
    )
  }
}
const mapStateToProps = (state) => {
  let isFetchUserMap = state.user.isFetchUserMap
  let userMap = state.user.userMap
  return {
    isFetchUserMap,
    userMap
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    changeFetchUserInfo: () => {
      dispatch(changeUserFlag())
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Ticketcode)
