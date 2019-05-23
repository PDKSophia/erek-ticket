/**
 * 添加乘客人页面
 *
 * @summary
 * @author PDK
 *
 * Created at     : 2019-05-23
 * Last modified  : 2019-05-23
 */
import Taro, { Component } from '@tarojs/taro'
import { Block, View, Text, Image } from '@tarojs/components'
import { connect } from '@tarojs/redux'
import { actions as planeActions } from '@redux/plane'
import { actions as trainActions } from '@redux/train'
import { actions as busActions } from '@redux/bus'
import { actions as userActions } from '@redux/user'
import { showLoading, hideLoading, createPassengerId } from '@utils/utils'
import MainButton from '@components/MainButton'
import classnames from 'classnames/bind'
import styles from './index.module.css'

const cx = classnames.bind(styles)

class Passenger extends Component {
  config = {
    navigationBarTitleText: '添加乘客',
    navigationBarBackgroundColor: '#fecf03'
  }

  state = {
    fromType: 'plane',
    currentIndex: -1,
    orderPassList: []
  }

  componentWillMount() {
    try {
      const { fromType, index } = this.$router.params
      const { orderPassengerList } = this.props
      this.setState({
        fromType: fromType,
        currentIndex: index,
        orderPassList: [...orderPassengerList]
      })
    } catch (err) {
      console.log(err)
    }
  }

  componentWillReceiveProps(nextProps) {
    this.setState({
      orderPassList: [...nextProps.orderPassengerList]
    })
  }

  handleToPassengerList = () => {
    Taro.navigateTo({
      url: `/columnist/pages/passengerlist/index`
    })
  }

  handleDeletePassenger = async index => {
    const { dispatch } = this.props
    await dispatch(userActions.deletePassengerItem(index))
  }

  handleClickReserve = async () => {
    const { dispatch, orderPassengerList } = this.props
    const { fromType } = this.state
    const data = this.$router.preload.curData
    const ticket = this.$router.preload.curTicket
    let payload = {
      typeId: data.id,
      description: data.name,
      prefix: JSON.stringify({
        startDay: data.startDay,
        endDay: data.endDay,
        startDate: data.startDate,
        endDate: data.endDate,
        fromCityName: data.prefix.fromCityName,
        toCityName: data.prefix.toCityName,
        fromPosName: data.prefix.fromPosName,
        toPosName: data.prefix.toPosName,
        passengerList: [...orderPassengerList]
      })
    }
    Taro.showModal({
      title: '易行小程序提示您',
      content: '你是否要购买此票?',
      success: async function(res) {
        if (res.confirm) {
          showLoading('请稍后')
          switch (fromType) {
            case 'plane':
              payload.type = 'plane'
              payload.record = JSON.stringify(ticket)
              await dispatch(planeActions.createOrderReserveAsync(payload))
              break
            case 'train':
              payload.type = 'train'
              payload.record = JSON.stringify(ticket)
              await dispatch(trainActions.createOrderReserveAsync(payload))
              break
            case 'bus':
              payload.type = 'bus'
              payload.record = JSON.stringify({
                text: '硬座',
                price: data.price,
                count: data.count,
                sell: data.sell,
                surplus: data.surplus
              })
              await dispatch(busActions.createOrderReserveAsync(payload))
              break
            default:
              console.log('no actions')
              break
          }
          hideLoading()
          Taro.navigateTo({
            url: `/columnist/pages/order/index?fromType=${fromType}`
          })
        } else {
          console.log('取消')
        }
      }
    })
  }

  render() {
    const data = this.$router.preload.curData
    const { fromType, orderPassList } = this.state
    return (
      <Block>
        {fromType === 'bus' ? (
          <View className={styles.container}>
            <View className={styles.gradient}>
              <View className={styles.content}>
                <View>
                  {data.startDay}日 {data.startDate}出发
                  <Text className={styles.expect}>
                    (预计{data.endDay}日 {data.endDate}到达)
                  </Text>
                </View>
                <View>
                  {data.prefix.fromPosName}-{data.prefix.toPosName}
                </View>
                <View className={styles.provider}>😊销售供应商: 海南海口易行团队提供</View>
              </View>
              <View className={styles.actions}>
                <View className={styles.tabs}>退改签规则</View>
                <View className={styles.tabs}>儿童/婴儿可购买</View>
                <View className={styles.tabs}>行李及购票须知</View>
              </View>
            </View>
            <View className={styles.createPassenger} onClick={this.handleToPassengerList}>
              + 添加乘客
            </View>
            <View className={styles.passengerList}>
              {orderPassList.map((item, index) => {
                return (
                  <View
                    className={cx('passenger', {
                      ' last ': orderPassList.length - 1 === index
                    })}
                    key={index}
                  >
                    <View className={styles.flexPassenger}>
                      <View className={styles.nickname}>{item.nickname}</View>
                    </View>
                    <View className={styles.flexPassenger}>
                      <View className={styles.idcard}>
                        {' '}
                        {item.type} {item.uniqueId}
                      </View>
                      <View className={styles.delete} onClick={() => this.handleDeletePassenger(index)}>
                        删除
                      </View>
                    </View>
                  </View>
                )
              })}
            </View>
            {orderPassList.length === 0 ? (
              <View className={styles.button}>
                <MainButton text='下单购买' color='secondary' size='normal' width='75%' />
              </View>
            ) : (
              <View className={styles.button}>
                <MainButton
                  text='下单购买'
                  color='primary'
                  size='normal'
                  width='75%'
                  onHandleClick={this.handleClickReserve}
                />
              </View>
            )}
          </View>
        ) : (
          <View>
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
              <View className={styles.createPassenger} onClick={this.handleToPassengerList}>
                + 添加乘客
              </View>
              <View className={styles.passengerList}>
                {orderPassList.map((item, index) => {
                  return (
                    <View
                      className={cx('passenger', {
                        last: orderPassList.length - 1 === index
                      })}
                      key={index}
                    >
                      <View className={styles.flexPassenger}>
                        <View className={styles.nickname}>{item.nickname}</View>
                      </View>
                      <View className={styles.flexPassenger}>
                        <View className={styles.idcard}>
                          {' '}
                          {item.type} {item.uniqueId}
                        </View>
                        <View className={styles.delete} onClick={() => this.handleDeletePassenger(index)}>
                          删除
                        </View>
                      </View>
                    </View>
                  )
                })}
              </View>
              {orderPassList.length === 0 ? (
                <View className={styles.button}>
                  <MainButton text='下单购买' color='secondary' size='normal' width='75%' />
                </View>
              ) : (
                <View className={styles.button}>
                  <MainButton
                    text='下单购买'
                    color='primary'
                    size='normal'
                    width='75%'
                    onHandleClick={this.handleClickReserve}
                  />
                </View>
              )}
            </View>
          </View>
        )}
      </Block>
    )
  }
}

const mapStateToProps = ({ user }) => ({
  ...user
})

export default connect(mapStateToProps)(Passenger)
