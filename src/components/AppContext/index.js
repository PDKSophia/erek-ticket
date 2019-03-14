/**
 * 介绍
 *
 * @summary
 * @author PDK
 *
 * Created at     : 2018-02-24
 * Last modified  : 2018-03-14
 */
import Taro, { Component } from '@tarojs/taro'
import { View } from '@tarojs/components'
import classnames from 'classnames/bind'
import styles from './index.module.css'
import PropTypes from 'prop-types'

const cx = classnames.bind(styles)

class AppIntroduce extends Component {
  render() {
    const { name, text, summary } = this.props
    return (
      <View>
        <View className={styles.container}>
          <View className={cx('flex', 'title')}>{name}</View>
          <View className={cx('flex', 'content')}>{text}</View>
          <View className={cx('flex', 'summary')}>{summary}</View>
        </View>
      </View>
    )
  }
}

AppIntroduce.proptypes = {
  name: PropTypes.string,
  text: PropTypes.string,
  summary: PropTypes.string
}

export default AppIntroduce
