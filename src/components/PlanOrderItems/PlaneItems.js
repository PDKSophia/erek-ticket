/**
 * 飞机票条目组件，展示型组件，不做任何操作
 *
 * @summary
 * @author PDK
 *
 * Created at     : 2019-02-25
 * Last modified  : 2019-05-05
 */
import Taro, { PureComponent } from '@tarojs/taro'
import { Block, View, Image, Text } from '@tarojs/components'
import PlaneIcon from '@assets/icon/planeIcon.png'
import classnames from 'classnames/bind'
import styles from './index.module.css'

const cx = classnames.bind(styles)

class PlaneItems extends PureComponent {
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
            <View className={styles.container} key={index}>
              <View className={styles.title}>
                <View className={styles.leftLabel}>
                  <Image src={PlaneIcon} className={styles.icon} alt='' />
                  <Text className={styles.text}>机票</Text>
                </View>
                <View className={cx('rightLaber', `status_${item.status}`)}>
                  {item.status === 10 && '出票成功'}
                  {item.status === 20 && '已完成'}
                  {item.status === 30 && '退款成功'}
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
                  <View className={styles.price}>¥ {item.record.price}</View>
                  <View className={styles.tag}>{item.record.text}</View>
                </View>
              </View>
              <View className={styles.action}>
                <View className={cx('button')}>查看详情</View>
                <View className={cx('button')}>查看详情</View>
              </View>
            </View>
          )
        })}
      </Block>
    )
  }
}

export default PlaneItems
