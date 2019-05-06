/**
 * 火车票条目组件，展示型组件，不做任何操作
 *
 * @summary
 * @author PDK
 *
 * Created at     : 2019-02-25
 * Last modified  : 2019-05-06
 */
import Taro, { PureComponent } from '@tarojs/taro'
import { Block, View, Image, Text } from '@tarojs/components'
import TrainIcon from '@assets/icon/trainIcon.png'
import classnames from 'classnames/bind'
import styles from './index.module.css'

const cx = classnames.bind(styles)

class TrainItems extends PureComponent {
  state = {
    list: []
  }

  componentWillMount() {
    const { orderList } = this.props
    this.setState({
      list: [...orderList]
    })
  }
  shouldComponentUpdate(nextProps) {
    const { orderList } = nextProps
    this.setState({
      list: [...orderList]
    })
  }

  render() {
    const { list } = this.state
    return (
      <Block>
        {list.map((item, index) => {
          return (
            <View className={styles.container} key={index} onClick={() => this.props.onHandleClick(item)}>
              <View className={styles.title}>
                <View className={styles.leftLabel}>
                  <Image src={TrainIcon} className={styles.icon} alt='' />
                  <Text className={styles.text}>火车票</Text>
                </View>
                <View className={cx('rightLaber', `status_${item.status}`)}>
                  {item.status === 10 ? '出票成功' : ''}
                  {item.status === 20 ? '已完成' : ''}
                  {item.status === 30 ? '退款成功' : ''}
                </View>
              </View>
              <View className={styles.content}>
                <View className={styles.leftContent}>
                  <View className={styles.name}>
                    {item.prefix.fromCityName} - {item.prefix.toCityName}
                  </View>
                  <View className={styles.date}>
                    2019-{item.prefix.startDay} {item.prefix.startDate} - {item.prefix.endDate}
                  </View>
                  <View className={styles.tag}>{item.description}</View>
                </View>
                <View className={styles.rightContent}>
                  <Text className={styles.price}>¥ {item.record.price}</Text>
                </View>
              </View>
              <View className={styles.action}>
                <View className={cx('button')}>预定酒店</View>
                <View className={cx('button')}>接送火车</View>
                <View className={cx('button')}>查看详情</View>
              </View>
            </View>
          )
        })}
      </Block>
    )
  }
}

export default TrainItems
