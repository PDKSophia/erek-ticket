/**
 * Grid 九宫格
 *
 * @summary
 * @author PDK
 *
 * Created at     : 2019-02-18
 * Last modified  : 2019-02-18
 */
import Taro, { Component } from '@tarojs/taro'
import { View, Image } from '@tarojs/components'
import './index.scss'

import PlaneIcon from '../../assets/planeIcon.png'
import TrainIcon from '../../assets/trainIcon.png'
import BusIcon from '../../assets/busIcon.png'
import MovieIcon from '../../assets/movieIcon.png'
import WalletIcon from '../../assets/walletIcon.png'
import SettingIcon from '../../assets/settingIcon.png'

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
    } else {
      Taro.navigateTo({
        url: `/pages/${item.pathUrl}/index`
      })
    }
  }
  render() {
    return (
      <View className='grid-box'>
        {this.state.gridArr.map((item, index) => {
          return (
            <View className='flex-cell' key={index} onClick={this.handleChangeUrl.bind(this, item)}>
              <Image className='iconPath' src={item.iconPath} />
              <View className='footer-text'>{item.text}</View>
            </View>
          )
        })}
      </View>
    )
  }
}

export default UserGrid
