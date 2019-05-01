/**
 * 搜索列表详情页
 *
 * @summary
 * @author PDK
 *
 * Created at     : 2019-05-01
 * Last modified  : 2019-05-01
 */
import Taro, { Component } from '@tarojs/taro'
import { Block, View, Text } from '@tarojs/components'
import classnames from 'classnames/bind'
import styles from './index.module.css'
const cx = classnames.bind(styles)

class Line extends Component {
  config = {
    navigationBarTitleText: '查看详情',
    navigationBarBackgroundColor: '#fecf03'
  }

  render() {
    return (
      <Block>
        <View className={styles.container}>
          <View className={styles.timeline}>
            <View className={cx('flex', 'line')}>
              <View>长沙</View>
              <View className={styles.navTitle}>
                <Text className={styles.date}>07:42</Text>
              </View>
              <View>05-04日</View>
            </View>
            <View className={cx('flex', 'line')}>
              <View>HU2971</View>
              <View className={styles.navTitle}>
                <Text className={styles.label}>- 时刻表 -</Text>
              </View>
              <View>中国南方航空</View>
            </View>
            <View className={cx('flex', 'line')}>
              <View>长沙</View>
              <View className={styles.navTitle}>
                <Text className={styles.date}>11:54</Text>
              </View>
              <View>05-04日</View>
            </View>
          </View>
        </View>
      </Block>
    )
  }
}

export default Line
