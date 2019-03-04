/**
 * 设置页面
 *
 * @summary
 * @author PDK
 *
 * Created at     : 2019-02-19
 * Last modified  : 2019-02-28
 */
import Taro, { Component } from '@tarojs/taro'
import { View, Image } from '@tarojs/components'
import MainButton from '@components/MainButton'
import classnames from 'classnames/bind'
import logoIcon from '@assets/code.jpeg'
import styles from './index.module.css'
import config from '../../../../package.json'

const cx = classnames.bind(styles)

class About extends Component {
  config = {
    navigationBarTitleText: '设置页面'
  }
  state = {}
  handleClickEquipment = () => {
    Taro.navigateTo({
      url: '/support/pages/equipment/index'
    })
  }
  handleClickUserInfo = () => {
    console.log('')
  }
  handleClickClearData = () => {
    Taro.setStorageSync('authToken', '')
    Taro.reLaunch({
      url: '/pages/index/index'
    })
  }
  render() {
    return (
      <View className={styles.about}>
        <Image className={styles['bg-image']} src={logoIcon} />
        <View className={cx('content', 'text')}>易行小程序</View>
        <View className={cx('version', 'text')}>{`v${config.version}`}</View>
        <View className={cx('btnContainer')}>
          <MainButton
            text='获取手机设备信息'
            color='secondary'
            size='normal'
            onHandleClick={this.handleClickEquipment}
          />
          <MainButton text='获取用户信息' color='secondary' size='normal' onHandleClick={this.handleClickUserInfo} />
          <MainButton text='清理数据' color='primary' size='normal' onHandleClick={this.handleClickClearData} />
        </View>
      </View>
    )
  }
}

export default About
