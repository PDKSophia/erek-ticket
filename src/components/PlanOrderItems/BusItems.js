/**
 * 大巴票条目组件，展示型组件，不做任何操作
 *
 * @summary
 * @author PDK
 *
 * Created at     : 2019-02-25
 * Last modified  : 2019-02-28
 */
import Taro, { PureComponent } from '@tarojs/taro'
import { Block, View, Image, Text } from '@tarojs/components'
import BusIcon from '@assets/busIcon.png'
import classnames from 'classnames/bind'
import styles from './index.module.css'

const cx = classnames.bind(styles)

class BusItems extends PureComponent {
  componentWillMount() {}

  render() {
    return (
      <Block>
        <View className={styles.container}>
          <View className={styles.title}>
            <View className={styles.leftLabel}>
              <Image src={BusIcon} className={styles.icon} alt='' />
              <Text className={styles.text}>大巴票</Text>
            </View>
            <View className={cx('rightLaber', 'status_30')}>出票完成</View>
          </View>
          <View className={styles.content}>
            <View className={styles.leftContent}>
              <View className={styles.name}>广州 - 成都</View>
              <View className={styles.date}>2019-02-16 11:55 - 14:30</View>
              <View className={styles.tag}>川航3U8732</View>
            </View>
            <View className={styles.rightContent}>
              <Text className={styles.price}>¥ 499</Text>
            </View>
          </View>
          <View className={styles.action}>
            <View className={cx('button')}>查看详情</View>
            <View className={cx('button')}>查看详情</View>
          </View>
        </View>
        <View className={styles.container}>
          <View className={styles.title}>
            <View className={styles.leftLabel}>
              <Image src={BusIcon} className={styles.icon} alt='' />
              <Text className={styles.text}>大巴票</Text>
            </View>
            <View className={cx('rightLaber', 'status_30')}>出票完成</View>
          </View>
          <View className={styles.content}>
            <View className={styles.leftContent}>
              <View className={styles.name}>广州 - 成都</View>
              <View className={styles.date}>2019-02-16 11:55 - 14:30</View>
              <View className={styles.tag}>川航3U8732</View>
            </View>
            <View className={styles.rightContent}>
              <Text className={styles.price}>¥ 499</Text>
            </View>
          </View>
          <View className={styles.action}>
            <View className={cx('button')}>查看详情</View>
            <View className={cx('button')}>查看详情</View>
          </View>
        </View>
        <View className={styles.container}>
          <View className={styles.title}>
            <View className={styles.leftLabel}>
              <Image src={BusIcon} className={styles.icon} alt='' />
              <Text className={styles.text}>大巴票</Text>
            </View>
            <View className={cx('rightLaber', 'status_30')}>出票完成</View>
          </View>
          <View className={styles.content}>
            <View className={styles.leftContent}>
              <View className={styles.name}>广州 - 成都</View>
              <View className={styles.date}>2019-02-16 11:55 - 14:30</View>
              <View className={styles.tag}>川航3U8732</View>
            </View>
            <View className={styles.rightContent}>
              <Text className={styles.price}>¥ 499</Text>
            </View>
          </View>
          <View className={styles.action}>
            <View className={cx('button')}>查看详情</View>
            <View className={cx('button')}>查看详情</View>
          </View>
        </View>
      </Block>
    )
  }
}

export default BusItems
