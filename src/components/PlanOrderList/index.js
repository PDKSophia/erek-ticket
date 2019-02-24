/**
 * 订单列表页面
 *
 * @summary
 * @author PDK
 *
 * Created at     : 2019-02-24
 * Last modified  : 2019-02-24
 */
import Taro, { Component } from '@tarojs/taro'
import { View, Block } from '@tarojs/components'
import PropTypes from 'prop-types'
import classnames from 'classnames'
import './index.scss'

class PlanOrderList extends Component {
  static propTypes = {
    fromType: PropTypes.string
  }

  static defaultProps = {
    fromType: 'plane'
  }

  state = {
    currentTab: 0 // tab的切换
  }
  componentWillMount() {}

  handleSwitchTab = e => {
    let that = this
    if (that.state.currentTab == e.target.dataset.current) {
      return false
    } else {
      that.setState({
        currentTab: e.target.dataset.current
      })
    }
  }

  render() {
    return (
      <Block>
        <View className='planlist-container'>
          <View className='planlist-tab'>
            <View
              className={classnames('tab-list', {
                active: this.state.currentTab == 0
              })}
              data-current='0'
              onClick={this.handleSwitchTab}
            >
              全部
            </View>
            <View
              className={classnames('tab-list', {
                active: this.state.currentTab == 1
              })}
              data-current='1'
              onClick={this.handleSwitchTab}
            >
              已完成
            </View>
            <View
              className={classnames('tab-list', {
                active: this.state.currentTab == 2
              })}
              data-current='1'
              onClick={this.handleSwitchTab}
            >
              待出行
            </View>
            <View
              className={classnames('tab-list', {
                active: this.state.currentTab == 3
              })}
              data-current='2'
              onClick={this.handleSwitchTab}
            >
              退款单
            </View>
          </View>
        </View>
      </Block>
    )
  }
}

export default PlanOrderList
