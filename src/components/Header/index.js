import Taro, { Component } from '@tarojs/taro'
import PropTypes from 'prop-types'
import { View } from '@tarojs/components'
import './index.scss'

class Header extends Component {
  static propTypes = {
    headObj: PropTypes.object // 头部内容
  }
  config = {
    navigationBarTitleText: '首页'
  }
    
  render () {
    return (
      <View>
        <View className='bg-box'>
          <View className='flex-h h-title'>{this.props.headObj.title}</View>
          <View className='flex-h h-content'>{this.props.headObj.content}</View>
          <View className='flex-h h-summary'>{this.props.headObj.summary}</View>
        </View>
      </View>
    )
  }
}

export default Header
