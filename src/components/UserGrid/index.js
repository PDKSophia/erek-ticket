/**
 * Grid 九宫格
 *
 * @summary
 * @author PDK
 *
 * Created at     : 2019-02-18
 * Last modified  : 2019-02-28
 */
import Taro, { Component } from '@tarojs/taro'
import { View, Image } from '@tarojs/components'
import PlaneIcon from '@assets/icon/planeIcon.png'
import TrainIcon from '@assets/icon/trainIcon.png'
import BusIcon from '@assets/icon/busIcon.png'
import MovieIcon from '@assets/icon/movieIcon.png'
import WalletIcon from '@assets/icon/walletIcon.png'
import SettingIcon from '@assets/icon/settingIcon.png'
import styles from './index.module.css'

class UserGrid extends Component {
  static defaultProps = {
    footer: []
  }

  state = {
    gridArr: [
      {
        iconPath: PlaneIcon,
        text: '飞机票',
        pathUrl: 'plane'
      },
      {
        iconPath: TrainIcon,
        text: '火车票',
        pathUrl: 'train'
      },
      {
        iconPath: BusIcon,
        text: '大巴票',
        pathUrl: 'bus'
      },
      {
        iconPath: MovieIcon,
        text: '电影票',
        pathUrl: 'movie'
      },
      {
        iconPath: WalletIcon,
        text: '我的钱包',
        pathUrl: 'wallet'
      },
      {
        iconPath: SettingIcon,
        text: '设置',
        pathUrl: 'setting'
      }
    ]
  }

  handleChangeUrl = item => {
    if (item.pathUrl !== 'setting' && item.pathUrl !== 'wallet') {
      Taro.navigateTo({
        url: `/pages/order/index?type=${item.pathUrl}&title=${item.text}订单`
      })
    } else if (item.pathUrl === 'setting') {
      Taro.navigateTo({
        url: `/support/pages/${item.pathUrl}/index`
      })
    } else {
      Taro.navigateTo({
        url: `/pages/${item.pathUrl}/index`
      })
    }
  }
  render() {
    return (
      <View className={styles.container}>
        {this.state.gridArr.map((item, index) => {
          return (
            <View className={styles.cell} key={index} onClick={this.handleChangeUrl.bind(this, item)}>
              <Image className={styles.icon} src={item.iconPath} />
              <View className={styles.text}>{item.text}</View>
            </View>
          )
        })}
      </View>
    )
  }
}

export default UserGrid
