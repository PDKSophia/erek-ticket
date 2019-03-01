/**
 * 对话框组件
 *
 * @summary
 * @author PDK
 *
 * Created at     : 2018-02-19
 * Last modified  : 2018-03-01
 */

import Taro, { Component } from '@tarojs/taro'
import { View, Textarea, Block } from '@tarojs/components'
import PropTypes from 'prop-types'
import classnames from 'classnames/bind'
import styles from './index.module.css'

const cx = classnames.bind(styles)

class ComfirmModal extends Component {
  static propTypes = {
    title: PropTypes.string, // 弹窗标题
    type: PropTypes.oneOf([
      'normal', // 正常弹窗
      'entry' // 内容输入
    ]),
    content: PropTypes.string,
    cancleText: PropTypes.string,
    okText: PropTypes.string,
    onHandleCloseModal: PropTypes.func,
    onHandleOkModal: PropTypes.func
  }
  static defaultProps = {
    type: 'entry',
    title: '标题',
    content: '18976078869',
    cancleText: 'No',
    okText: 'Yes'
  }

  state = {
    value: ''
  }

  handleCloseModal = () => {
    this.props.onHandleCloseModal()
  }
  handleSubmitModal = () => {
    const { type } = this.props
    if (type === 'normal') {
      this.props.onHandleOkModal('normal', true, '')
    } else {
      if (!this.state.value) {
        Taro.showToast({
          title: '请输入内容',
          icon: 'none',
          duration: 1500
        })
      } else {
        this.props.onHandleOkModal('entry', true, this.state.value)
      }
    }
  }
  handleChangeValue = e => {
    this.setState({
      value: e.detail.value
    })
  }

  handleStopPropagation = e => {
    e.stopPropagation()
  }

  render() {
    const { title, type, content, cancleText, okText } = this.props
    let queComponent = null
    if (type === 'normal') {
      queComponent = <View className={styles.contentText}>{content}</View>
    } else {
      queComponent = (
        <View className={styles.textarea}>
          <Textarea
            value={this.state.value}
            onInput={this.handleChangeValue}
            className={styles.entryText}
            placeholder='请输入内容'
          />
        </View>
      )
    }
    return (
      <Block>
        <View className={styles.mask} onClick={this.handleCloseModal}>
          <View className={styles.modal} onClick={this.handleStopPropagation}>
            <View className={styles.title}>{title}</View>
            {queComponent}
            <View className={styles.button}>
              <View className={cx('btn-main', 'cancle')} onClick={this.handleCloseModal}>
                {cancleText}
              </View>
              <View className={cx('btn-main', 'submit')} onClick={this.handleSubmitModal}>
                {okText}
              </View>
            </View>
          </View>
        </View>
      </Block>
    )
  }
}

export default ComfirmModal
