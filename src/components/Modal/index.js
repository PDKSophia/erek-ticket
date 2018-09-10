import Taro, { Component } from '@tarojs/taro'
import PropTypes from 'prop-types'
import { View } from '@tarojs/components'
import classnames from 'classnames'
import './index.scss'

class Modal extends Component {
  static propTypes = {
    onHandleOnOK: PropTypes.func, //点击确定
    onHandleShowModal: PropTypes.func,
    modalContent: PropTypes.object
  }

  handleOnSubmit = () => {
    this.props.onHandleOnOK(this.state.value)
  }

  // 绑定函数
  onHandleShowModal = () => {
    const { onHandleShowModal } = this.props
    onHandleShowModal()
  }
  
  handleOnCancel = () => {
    this.props.onHandleShowModal()
  }

  render () {
    return (
      <View className='mask'>
        <View class='toastbg'></View>
        <View className='modal-dialog'>
          <View className='modal-title'>{this.props.modalContent.title}</View>
          <View className='modal-input'>
            {this.props.modalContent.phone}
          </View>
          <View className='modal-button'>
            <View className={classnames(
              'main-button',
              'btn-cancel'
            )} onClick={this.handleOnCancel}
            > 取消
            </View>
            <View className={classnames(
              'main-button',
              'btn-submit'
            )} onClick={this.handleOnSubmit}
            > 确定
            </View>
          </View>
        </View>
      </View>
    )
  }
}

export default Modal
