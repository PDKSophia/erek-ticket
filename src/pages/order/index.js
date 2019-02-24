/**
 * 飞机票 / 火车票 / 大巴票 页面
 *
 * @summary
 * @author PDK
 *
 * Created at     : 2019-02-24
 * Last modified  : 2019-02-24
 */
import Taro, { Component } from '@tarojs/taro'
import { Block } from '@tarojs/components'
import PlanOrderList from '@components/PlanOrderList'

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
    return (
      <Block>
        <PlanOrderList fromType={fromType} />
      </Block>
    )
  }
}

export default Order
