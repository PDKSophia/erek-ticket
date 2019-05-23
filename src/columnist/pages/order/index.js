/**
 * 订单详情页
 *
 * @summary
 * @author PDK
 *
 * Created at     : 2019-05-03
 * Last modified  : 2019-05-23
 */
import Taro, { Component } from '@tarojs/taro'
import { Block, View, Text } from '@tarojs/components'
import classnames from 'classnames/bind'
import { connect } from '@tarojs/redux'
import ArrowIcon from '@assets/icon/arrow.png'
import styles from './index.module.css'
import { dateTZConvertString } from '@utils/utils'

const cx = classnames.bind(styles)

class Order extends Component {
  config = {
    navigationBarTitleText: '订单详情',
    navigationBarBackgroundColor: '#fecf03'
  }

  state = {
    fromType: 'plane'
  }

  componentWillMount() {
    try {
      const { fromType } = this.$router.params
      this.setState({
        fromType: fromType
      })
    } catch (err) {
      console.log(err)
    }
  }

  render() {
    const { fromType } = this.state
    const { planeState, trainState, busState } = this.props
    let data = {}
    if (fromType === 'plane') {
      data = { ...planeState.curOrder }
    } else if (fromType === 'train') {
      data = { ...trainState.curOrder }
    } else {
      data = { ...busState.curOrder }
    }
    console.log('渲染的数据是: ', data)
    const passengerList = [...data.prefix.passengerList]
    return (
      <Block>
        <View className={styles.container}>
          <View className={styles.gradient}>
            <View className={cx('flex', 'spaceAround')}>
              <View>
                😄
                {data.status === 10 ? '出票成功' : ''}
                {data.status === 20 ? '已完成' : ''}
                {data.status === 30 ? '退款成功' : ''}
              </View>
              <View>￥ {data.record.price}</View>
            </View>
            <View className={cx('flex', 'actions')}>
              <View className={styles.tabs}>我要报销</View>
              <View className={styles.tabs}>我要退票</View>
              <View className={styles.tabs}>我要改签</View>
            </View>
          </View>
          <View className={styles.passContainer}>
            <View className={styles.titles}>班次信息</View>
            <View className={cx('flex', 'flexContainer')}>
              <View className={styles.greyColor}>{data.description}</View>
            </View>
            <View className={cx('flex', 'flexContainer')}>
              <View>
                {data.prefix.startDay}日 {data.prefix.startDate}
              </View>
              <Image className={styles.icon} src={ArrowIcon} />
              <View>
                {data.prefix.endDay}日 {data.prefix.endDate}
              </View>
            </View>
            <View className={cx('flex', 'flexContainer')}>
              <View className={styles.greyColor}>
                {data.prefix.fromPosName} - {data.prefix.toPosName}
              </View>
            </View>
          </View>
          <View className={styles.passContainer}>
            <View className={styles.titles}>乘客信息</View>
            {passengerList.map((item, index) => {
              return (
                <View
                  className={cx('itemContainer', {
                    last: passengerList.length - 1 === index
                  })}
                  key={index}
                >
                  <View className={cx('flex', 'flexContainer')}>
                    <View>
                      {item.nickname} <Text className={styles.importText}>成人票</Text>
                    </View>
                    <View>
                      {data.record.text} ￥{data.record.price}
                    </View>
                  </View>
                  <View className={cx('flex', 'flexContainer')}>
                    <View className={styles.greyColor}>{item.uniqueId}</View>
                    <View>{item.type}</View>
                  </View>
                </View>
              )
            })}
          </View>
          <View className={styles.passContainer}>
            <View className={styles.titles}>已购产品</View>
            <View className={cx('flex', 'flexContainer')}>
              <View className={styles.greyColor}>接送车券 x1</View>
              <View>已购买</View>
            </View>
            <View className={cx('flex', 'flexContainer')}>
              <View className={styles.greyColor}>极速出行 x1</View>
              <View>已购买</View>
            </View>
          </View>
          <View className={styles.passContainer}>
            <View className={styles.titles}>订单信息</View>
            <View className={cx('flex', 'flexContainer')}>
              <View className={styles.greyColor}>订单号</View>
              <View>{data.order_code}</View>
            </View>
            <View className={cx('flex', 'flexContainer')}>
              <View className={styles.greyColor}>下单时间</View>
              <View>{dateTZConvertString(data.createTime)}</View>
            </View>
          </View>
        </View>
      </Block>
    )
  }
}

const mapStateToProps = state => ({
  planeState: state.plane,
  trainState: state.train,
  busState: state.bus
})

export default connect(mapStateToProps)(Order)
