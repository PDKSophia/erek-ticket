/**
 * 拨打电影Modal
 *
 * @summary
 * @author PDK
 *
 * Created at     : 2018-02-24
 * Last modified  : 2018-02-24
 */
import Taro, { Component } from '@tarojs/taro'
import PropTypes from 'prop-types'
import { View } from '@tarojs/components'
import classnames from 'classnames'
import './index.scss'

class CallPhoneModal extends Component {
  static propTypes = {
    onHandleOnOK: PropTypes.func,
    onToggleModal: PropTypes.func,
    CallPhoeConfig: PropTypes.object // 显示内容
  }

  handleOnSubmit = () => {
    this.props.onHandleOnOK(this.state.value)
  }

  handleOnCancel = () => {
    this.props.onToggleModal()
  }

  render() {
    return (
      <View className='modal_pager_mask'>
        <View className='modal_pager_container'>
          <View className='modal_pager_title'>{this.props.CallPhoeConfig.title}</View>
          <View className='modal_pager_content'>{this.props.CallPhoeConfig.phone}</View>
          <View className='modal_pager_button'>
            <View className={classnames('main-button', 'btn-cancel')} onClick={this.handleOnCancel}>
              {this.props.CallPhoeConfig.cancleText}
            </View>
            <View className={classnames('main-button', 'btn-submit')} onClick={this.handleOnSubmit}>
              {this.props.CallPhoeConfig.okText}
            </View>
          </View>
        </View>
      </View>
    )
  }
}

export default CallPhoneModal
