/**
 * 分割线
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
import styles from './index.module.css'

export default class Divider extends Component {
  static propTypes = {
    height: PropTypes.string, // 分割线长度
    bgColor: PropTypes.string // 分割线颜色
  }

  static defaultProps = {
    height: '10px',
    bgColor: '#f5f7f9'
  }

  render() {
    const { height, bgColor } = this.props
    return <View className={styles.divider} style={{ backgroundColor: bgColor, height: height }} />
  }
}
