/**
 * 文字标题及跟多
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

export default class TextMore extends Component {
  static propTypes = {
    title: PropTypes.string,
    subtitle: PropTypes.string
  }

  static defaultProps = {
    title: '当地热门',
    subtitle: '探索更多目的地'
  }

  render() {
    return (
      <View className={styles.container}>
        <View className={styles.left}>{this.props.title}</View>
        <View className={styles.right}>{this.props.subtitle}</View>
      </View>
    )
  }
}
