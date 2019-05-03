/**
 *  个人中心页飞机票 / 火车票 / 大巴票 页面
 *
 * @summary
 * @author PDK
 *
 * Created at     : 2019-02-24
 * Last modified  : 2019-05-03
 */
import Taro, { Component } from '@tarojs/taro'
import { Block } from '@tarojs/components'
import PlaneList from '@components/PlanOrderList/PlaneList'
import TrainList from '@components/PlanOrderList/TrainList'
import BusList from '@components/PlanOrderList/BusList'
import MovieOrderList from '@components/MovieOrderList'

class Order extends Component {
  state = {
    fromType: 'plane'
  }

  config = {
    navigationBarTitleText: '我的订单',
    navigationBarBackgroundColor: '#fecf03'
  }

  componentWillMount() {
    const { type } = this.$router.params
    this.setState({
      fromType: type
    })
  }

  render() {
    const { fromType } = this.state
    let queComponent = null
    try {
      if (fromType === 'movie') {
        queComponent = <MovieOrderList />
      } else if (fromType === 'plane') {
        queComponent = <PlaneList />
      } else if (fromType === 'train') {
        queComponent = <TrainList />
      } else if (fromType === 'bus') {
        queComponent = <BusList />
      } else {
        queComponent = null
      }
    } catch (err) {}
    return <Block>{queComponent}</Block>
  }
}

export default Order
