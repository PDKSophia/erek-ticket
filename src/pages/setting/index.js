import Taro, { Component } from '@tarojs/taro'
import { View, Image, Text } from '@tarojs/components'
import MainButton from '../../components/MainButton'
import logoIcon from '../../assets/code.jpeg'
import config from '../../../package.json'

import './index.scss'
// const __version__ = '1.0.0' // 每一次发布版本需要来更新

class Setting extends Component {
  config = {
    navigationBarTitleText: '设置',
    navigationBarBackgroundColor: '#fecf03'
  }

  handleClickEquipment = () => {
    Taro.navigateTo({
      url: '/pages/equipment/index'
    })
  }

  handleClick = () => {
    Taro.setStorageSync('authToken', '')
    Taro.reLaunch({
      url: '/pages/index/index'
    })
  }

  render() {
    return (
      <View className='about'>
        <View className='img-container'>
          <Image className='image' src={logoIcon} />
        </View>
        <View className='content'>
          <Text className='text'>Erek-Ticket</Text>
        </View>
        <View className='version'>
          <Text className='text'>{`v${config.version}`}</Text>
        </View>
        <View className='about-container'>
          <MainButton text='关于 Erek-Ticket' type='review' size='normal' />
        </View>
        <View className='equipment-container'>
          <MainButton text='获取手机设备信息' type='extend' size='normal' onClick={this.handleClickEquipment} />
        </View>
        <View className='clear-container'>
          <MainButton text='清理数据' type='begin' size='normal' onClick={this.handleClick} />
        </View>
      </View>
    )
  }
}

export default Setting
