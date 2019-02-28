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
import classnames from 'classnames/bind'
import PropTypes from 'prop-types'
import styles from './index.module.css'

const cx = classnames.bind(styles)

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
        <View className={cx('text', 'left')}>{this.props.title}</View>
        <View className={cx('text', 'right')}>{this.props.subtitle}</View>
      </View>
    )
  }
}
