/**
 * Grid 九宫格
 *
 * @summary
 * @author PDK
 *
 * Created at     : 2018-09-04
 * Last modified  : 2018-09-04
 */
import Taro, { Component } from '@tarojs/taro'
import { View, Image } from '@tarojs/components'
import './index.scss'

import LikeUrl from '../../assets/add.png'
import WalletUrl from '../../assets/wallet.png'
import RemarkUrl from '../../assets/remark.png'
import OrderUrl from '../../assets/order.png'
import CodeUrl from '../../assets/code.png'
import SettingUrl from '../../assets/setting.png'

class Grid extends Component {
  static defaultProps = {
    footer: []
  }

  state = {
    gridArr: [
      {
        iconPath: LikeUrl,
        text: '我的收藏',
        pathUrl: ''
      },
      {
        iconPath: WalletUrl,
        text: '我的钱包',
        pathUrl: 'wallet'
      },
      {
        iconPath: RemarkUrl,
        text: '我的评论',
        pathUrl: ''
      },
      {
        iconPath: OrderUrl,
        text: '我的订单',
        pathUrl: ''
      },
      {
        iconPath: CodeUrl,
        text: '我的二维码',
        pathUrl: 'ticketcode'
      },
      {
        iconPath: SettingUrl,
        text: '设置',
        pathUrl: ''
      }
    ]
  }

  handleChangeUrl = (_url) => {
    if (_url !== 'ticketcode' && _url !== 'wallet') {
      Taro.showToast({
        title: '该专区正开发中',
        duration: 2000,
        icon: 'none'
      })
    } else {
      Taro.navigateTo({
        url: `/pages/${_url}/index`
      })
    }
  }
  render () {
    return (
      <View className='grid-box'>
      {this.state.gridArr.map((fot, index) => {
          return <View className='flex-cell' key={index} onClick={this.handleChangeUrl.bind(this, fot.pathUrl)}>
            <Image className='iconPath' src={fot.iconPath} />
            <View className='footer-text'>{fot.text}</View>
           </View>
      })}
      </View>
    )
  }
}

export default Grid
