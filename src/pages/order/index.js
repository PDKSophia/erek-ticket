/**
 *  个人中心页飞机票 / 火车票 / 大巴票 页面
 *
 * @summary
 * @author PDK
 *
 * Created at     : 2019-02-24
 * Last modified  : 2019-05-05
 */
import Taro, { Component } from '@tarojs/taro'
import { Block } from '@tarojs/components'
import { connect } from '@tarojs/redux'
import { actions as planeActions } from '@redux/plane'
import { actions as trainActions } from '@redux/train'
import { actions as busActions } from '@redux/bus'
import PlaneList from '@components/PlanOrderList/PlaneList'
import TrainList from '@components/PlanOrderList/TrainList'
import BusList from '@components/PlanOrderList/BusList'
import MovieOrderList from '@components/MovieOrderList'

class Order extends Component {
  state = {
    fromType: 'plane',
    orderList: [] // 订单列表
  }

  config = {
    navigationBarTitleText: '我的订单',
    navigationBarBackgroundColor: '#fecf03'
  }

  async componentWillMount() {
    const { type } = this.$router.params
    const { dispatch, planeState, trainState, busState } = this.props
    this.setState({
      fromType: type
    })
    if (type === 'plane') {
      await dispatch(planeActions.retrieveOrderPlaneAsync())
      this.setState({
        orderList: [...planeState.orderList]
      })
    } else if (type === 'train') {
      await dispatch(trainActions.retrieveOrderTrainAsync())
      this.setState({
        orderList: [...trainState.orderList]
      })
    } else if (type === 'bus') {
      await dispatch(busActions.retrieveOrderBusAsync())
      this.setState({
        orderList: [...busState.orderList]
      })
    } else {
      console.log('no list')
    }
  }

  shouldComponentUpdate(nextProps) {
    console.log('plane-list 的下一次', nextProps)
  }

  render() {
    const { fromType, orderList } = this.state
    const { planeState, trainState, busState } = this.props
    console.log('应该有数据的吧: ', orderList)
    let queComponent = null
    try {
      if (fromType === 'movie') {
        queComponent = <MovieOrderList />
      } else if (fromType === 'plane') {
        queComponent = <PlaneList orderList={planeState.orderList} />
      } else if (fromType === 'train') {
        queComponent = <TrainList orderList={trainState.orderList} />
      } else if (fromType === 'bus') {
        queComponent = <BusList orderList={busState.orderList} />
      } else {
        queComponent = null
      }
    } catch (err) {}
    return <Block>{queComponent}</Block>
  }
}

const mapStateToProps = state => ({
  planeState: state.plane,
  trainState: state.train,
  busState: state.bus
})

export default connect(mapStateToProps)(Order)
