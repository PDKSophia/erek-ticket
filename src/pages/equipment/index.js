import Taro, { Component } from '@tarojs/taro'
import { View, Text } from '@tarojs/components'
import './index.scss'

const infoStatusMap = {
  brand: '手机品牌',
  model: '手机型号',
  pixelRatio: '设备像素比',
  screenWidth: '屏幕宽度',
  screenHeight: '屏幕高度',
  language: '微信设置的语言',
  version: '微信版本号',
  system: '操作系统版本',
  platform: '客户端平台',
  fontSizeSetting: '用户字体大小',
  statusBarHeight: '状态栏高度',
  SDKVersion: '客户端基础库版本',
  benchmarkLevel: '性能等级',
  windowWidth: '可使用窗口宽度',
  windowHeight: '可使用窗口高度'
}
const networkMap = {
  wifi: 'wifi网络',
  '2g': '2g网络',
  '3g': '3g网络',
  '4g': '4g网络',
  unknown: '未知网络',
  none: '无网络'
}

const infoText = [
  'brand',
  'model',
  'version',
  'system',
  'SDKVersion',
  'pixelRatio',
  'screenHeight',
  'screenWidth',
  'windowHeight',
  'windowWidth',
  'platform',
  'fontSizeSetting',
  'benchmarkLevel'
]

class Equipment extends Component {
  config = {
    navigationBarTitleText: '手机设备信息',
    navigationBarBackgroundColor: '#fecf03'
  }

  state = {
    systemInfo: {},
    systemNetWork: {}
  }

  componentDidMount() {
    Taro.getSystemInfo().then(res => {
      this.setState({
        systemInfo: { ...res }
      })
    })
    Taro.getNetworkType().then(res => {
      this.setState({
        systemNetWork: { ...res }
      })
    })
  }

  render() {
    const { systemInfo, systemNetWork } = this.state
    return (
      <View className='equipment-container'>
        <View className='equipment-title'>
          <Text className='text'>您当前设备信息如下</Text>
        </View>
        <View className='girl-container'>
          <View className='cell-container'>
            <Text className='label'>网络类型</Text>
            <Text>{networkMap[systemNetWork.networkType]}</Text>
          </View>
          {infoText.map((item, index) => {
            return (
              <View className='cell-container' key={index}>
                <Text className='label'>{infoStatusMap[item]}</Text>
                <Text>{systemInfo[item]}</Text>
              </View>
            )
          })}
        </View>
      </View>
    )
  }
}

export default Equipment
