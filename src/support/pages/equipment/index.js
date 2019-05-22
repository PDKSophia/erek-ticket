/**
 * 设备显示页面
 *
 * @summary
 * @author PDK
 *
 * Created at     : 2019-05-22
 * Last modified  : 2019-05-22
 */
import Taro, { Component } from '@tarojs/taro'
import { View, Text } from '@tarojs/components'
import classnames from 'classnames/bind'
import { wxGetSystemInfo } from '@service/wechat'
import styles from './index.module.css'

const cx = classnames.bind(styles)

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

class Equipment extends Component {
  config = {
    navigationBarTitleText: '用户设备'
  }

  state = {
    systemInfo: {},
    systemNetWork: {}
  }
  async componentWillMount() {
    var values = await Promise.all([wxGetSystemInfo(), Taro.getNetworkType()])
    this.setState({
      systemInfo: { ...values[0] },
      systemNetWork: { ...values[1] }
    })
  }
  render() {
    const { systemInfo, systemNetWork } = this.state
    return (
      <View className={styles.container}>
        <View className={cx('title', 'text')}>您当前设备信息如下</View>
        <View className={styles.list}>
          <View className={cx('cell', 'text')}>
            <Text className={styles.label}>网络类型</Text>
            <Text>{networkMap[systemNetWork.networkType]}</Text>
          </View>
          {Object.keys(systemInfo).map((item, index) => {
            return (
              <View className={cx('cell', 'text')} key={index}>
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
