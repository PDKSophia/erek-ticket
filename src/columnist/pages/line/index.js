/**
 * 搜索列表详情页
 *
 * @summary
 * @author PDK
 *
 * Created at     : 2019-05-01
 * Last modified  : 2019-05-02
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

  state = {
    fromType: 'plane',
    currentIndex: -1
  }

  componentWillMount() {
    try {
      const { fromType, index } = this.$router.params
      this.setState({
        fromType: fromType,
        currentIndex: index
      })
    } catch (err) {
      console.log(err)
    }
  }

  render() {
    const data = this.$router.preload.curDetail
    const { fromType } = this.state
    console.log("渲染的数据为: ", data)
    return (
      <Block>
        <View className={styles.container}>
          <View className={styles.timeline}>
            <View className={cx('flex', 'line')}>
              <View>{data.prefix.fromCityName}</View>
              <View className={styles.navTitle}>
                <Text className={styles.date}>{data.startDate}</Text>
              </View>
              <View>{data.startDay}日</View>
            </View>
            {/* 飞机 */}
            {fromType === 'plane' && (
              <View className={cx('flex', 'line')}>
                <View>{data.name.split(' ')[0]}</View>
                <View className={styles.navTitle}>
                  <Text className={styles.label}>- 时刻表 -</Text>
                </View>
                <View>{data.air_company}</View>
              </View>
            )}
            {/* 火车 */}
            {fromType === 'train' && (
              <View className={cx('flex', 'line')}>
                <View>{data.name.split(' ')[1]}</View>
                <View className={styles.navTitle}>
                  <Text className={styles.label}>- 时刻表 -</Text>
                </View>
                <View>直达特快</View>
              </View>
            )}
            <View className={cx('flex', 'line')}>
              <View>{data.prefix.toCityName}</View>
              <View className={styles.navTitle}>
                <Text className={styles.date}>{data.endDate}</Text>
              </View>
              <View>{data.endDay}日</View>
            </View>
          </View>
          <View className={styles.ticketContainer}>
            {data.record.map(item => {
              return <View className={styles.tickFlex} key={item.id}>
                <View>{item.text}</View>
                <View className={styles.orange}>￥{item.price}</View>
                <View className={styles.orange}>{item.surplus}张</View>
                <View className={styles.reserve}>预定</View>
              </View>
            })}
          </View>
        </View>
      </Block>
    )
  }
}

export default Line
