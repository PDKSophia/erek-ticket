/**
 * 推荐
 *
 * @summary
 * @author PDK
 *
 * Created at     : 2019-02-18
 * Last modified  : 2019-02-18
 */
import Taro, { Component } from '@tarojs/taro'
import { View } from '@tarojs/components'
import PropTypes from 'prop-types'
import './index.scss'

export default class Recommend extends Component {
  static propTypes = {
    height: PropTypes.string, // 分割线长度
    bgColor: PropTypes.string // 分割线颜色
  }

  static defaultProps = {
    height: '10px',
    bgColor: '#f5f7f9'
  }

  render() {
    return <View>消息</View>
  }
}
