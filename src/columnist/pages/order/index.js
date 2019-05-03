/**
 * 订单详情页
 *
 * @summary
 * @author PDK
 *
 * Created at     : 2019-05-03
 * Last modified  : 2019-05-03
 */
import Taro, { Component } from '@tarojs/taro'
import { Block, View, Text } from '@tarojs/components'
import classnames from 'classnames/bind'
import ArrowIcon from '@assets/icon/arrow.png'
import styles from './index.module.css'

const cx = classnames.bind(styles)

class User extends Component {
  config = {
    navigationBarTitleText: '订单详情',
    navigationBarBackgroundColor: '#fecf03'
  }

  render() {
    return (
      <Block>
        <View className={styles.container}>
          <View className={styles.gradient}>
            <View className={cx('flex', 'spaceAround')}>
              <View>😄 出票成功</View>
              <View>￥ 487</View>
            </View>
            <View className={cx('flex', 'actions')}>
              <View className={styles.tabs}>我要报销</View>
              <View className={styles.tabs}>我要退票</View>
              <View className={styles.tabs}>我要改签</View>
            </View>
          </View>
          <View className={styles.passContainer}>
            <View className={styles.titles}>班次信息</View>
            <View className={cx('flex', 'passenger')}>
              <View style={{ color: '#8a8a8a' }}>西安南-上海虹桥 G2311 直达特快</View>
            </View>
            <View className={cx('flex', 'passenger')}>
              <View>05-03日 15:32</View>
              <Image className={styles.icon} src={ArrowIcon} />
              <View>05-03日 21:42</View>
            </View>
            {/* <View className={cx('flex', 'passenger')}>
              <View>05-03日 - 05-04日</View>
              <View>到达日期</View>
            </View> */}
            <View className={cx('flex', 'passenger')}>
              <View style={{ color: '#8a8a8a' }}>西安火车南站 - 上海虹桥站</View>
            </View>
          </View>
          <View className={styles.passContainer}>
            <View className={styles.titles}>乘客信息</View>
            <View className={cx('flex', 'passenger')}>
              <View>
                彭道宽 <Text className={styles.importText}>成人票</Text>
              </View>
              <View>二等座 ￥399</View>
            </View>
            <View className={cx('flex', 'passenger')}>
              <View style={{ color: '#8a8a8a' }}>460103*******3016</View>
              <View>一等座</View>
            </View>
          </View>
          <View className={styles.passContainer}>
            <View className={styles.titles}>已购产品</View>
            <View className={cx('flex', 'passenger')}>
              <View style={{ color: '#8a8a8a' }}>接送车券 x1</View>
              <View>已购买</View>
            </View>
            <View className={cx('flex', 'passenger')}>
              <View style={{ color: '#8a8a8a' }}>极速出行 x1</View>
              <View>已购买</View>
            </View>
          </View>
          <View className={styles.passContainer}>
            <View className={styles.titles}>订单信息</View>
            <View className={cx('flex', 'passenger')}>
              <View style={{ color: '#8a8a8a' }}>订单号</View>
              <View>us7ayhx67auj18h2</View>
            </View>
            <View className={cx('flex', 'passenger')}>
              <View style={{ color: '#8a8a8a' }}>下单时间</View>
              <View>2019-05-03 17:38:32</View>
            </View>
          </View>
        </View>
      </Block>
    )
  }
}

export default User
