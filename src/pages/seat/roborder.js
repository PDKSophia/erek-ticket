/**
 * 抢票成功 页面
 *
 * @summary
 * @author PDK
 *
 * Created at     : 2018-09-10
 * Last modified  : 2018-09-10
 */
import Taro, { Component } from '@tarojs/taro'
import { View, Image } from '@tarojs/components'
import PropTypes from 'prop-types'
import { connect } from '@tarojs/redux'
import PhoneImage from '@assets/phone.png'
import CallPhoneModal from '@components/CallPhoneModal'

class Roborder extends Component {
  static propTypes = {
    robTicketOrderInfo: PropTypes.object // 抢票支付后到订单详情
  }

  static defaultProps = {
    robTicketOrderInfo: {
      pushCode: '',
      ticketCode: ''
    }
  }
  config = {
    navigationBarTitleText: '抢票订单详情'
  }

  state = {
    showModal: false,
    modalContent: {
      title: '你将拨打此电话',
      phone: '18976078869'
    }
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

  render() {
    const codeUrl = this.props.robTicketOrderInfo.codeUrl
    const coverUrl = this.props.robTicketOrderInfo.movie.cover
    return (
      <View className='code' style={{ backgroundColor: 'white' }}>
        <View className='ticket-code-item' style={{ border: '1px solid #dbdbdb' }}>
          <View className='flex-box_code'>
            <View className='movie_left-code'>
              <View className='ticket-title-text'>{this.props.robTicketOrderInfo.movie.name}</View>
              <View className='ticket-content-text'>{this.props.robTicketOrderInfo.movie.time}</View>
              <View className='ticket-content-text'>{this.props.robTicketOrderInfo.cinema.name}</View>
            </View>
            <View className='movie_right-code'>
              <Image className='movie_cover-image' src={coverUrl} />
            </View>
          </View>
          <View className='ticket-scan-code'>
            <View className='scan-code_title'>取电影票</View>
            <View className='code_image_push'>
              <Image className='scan_code-img' src={codeUrl} />
              <View className='bg_button_pushcode'>取票码: {this.props.robTicketOrderInfo.pushCode}</View>
            </View>
          </View>
          <View className='flex-box_code' style={{ borderBottom: 'none' }}>
            <View className='movie_left-code' style={{ width: '80%', margin: '16px 0' }}>
              <View className='ticket-title-text cinema-title'>{this.props.robTicketOrderInfo.cinema.name}</View>
              <View className='ticket-content-text cinema-address'>
                {this.props.robTicketOrderInfo.cinema.location}
              </View>
            </View>
            <View className='movie_right-code play-right' style={{ width: '20%' }}>
              <Image className='play-phone_icon' onClick={this.callPhoneNumber} src={PhoneImage} />
            </View>
          </View>
        </View>
        {this.state.showModal && (
          <CallPhoneModal
            modalContent={this.state.modalContent}
            onHandleShowModal={this.handleShowModal}
            onHandleOnOK={this.handleOnOK}
          />
        )}
      </View>
    )
  }
}
const mapStateToProps = state => {
  let robTicketOrderInfo = state.order.robTicketOrderInfo
  return {
    robTicketOrderInfo
  }
}

export default connect(mapStateToProps)(Roborder)
