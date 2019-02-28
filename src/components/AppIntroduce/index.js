/**
 * 应用介绍
 *
 * @summary
 * @author PDK
 *
 * Created at     : 2018-02-24
 * Last modified  : 2018-02-28
 */
import Taro, { Component } from '@tarojs/taro'
import { View } from '@tarojs/components'
import classnames from 'classnames/bind'
import { AppConfig } from '@utils/app.js'
import styles from './index.module.css'

const cx = classnames.bind(styles)

class AppIntroduce extends Component {
  config = {
    navigationBarTitleText: '首页'
  }

  render() {
    const { APP_NAME, APP_TEXT, APP_SUMMARY } = AppConfig
    return (
      <View>
        <View className={styles.container}>
          <View className={cx('flex', 'title')}>{APP_NAME}</View>
          <View className={cx('flex', 'content')}>{APP_TEXT}</View>
          <View className={cx('flex', 'summary')}>{APP_SUMMARY}</View>
        </View>
      </View>
    )
  }
}

export default AppIntroduce
