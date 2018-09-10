import Taro, { Component } from '@tarojs/taro'
import { View, Image } from '@tarojs/components'
import './index.scss'

import IndexUrl from '../../assets/index.png'
import MovieUrl from '../../assets/movie.png'
import UserUrl from '../../assets/user.png'

class Footer extends Component {
  static defaultProps = {
    footer: []
  }

  state = {
    footers: [
      {
        iconPath: IndexUrl,
        text: '首页',
        pathUrl: 'index/index'
      },
      {
        iconPath: MovieUrl,
        text: '电影',
        pathUrl: 'movie/index'
      },
      {
        iconPath: UserUrl,
        text: '个人中心',
        pathUrl: 'user/index'
      },
    ]
  }

  handleChangeUrl = (_url) => {
    Taro.navigateTo({
        url: `/pages/${_url}`
      })
  }
  render () {
    return (
      <View className='footer'>
      {this.state.footers.map((fot, index) => {
          return <View className='flex-cell' key={index} onClick={this.handleChangeUrl.bind(this, fot.pathUrl)}>
            <Image className='iconPath' src={fot.iconPath} />
            <View className='footer-text'>{fot.text}</View>
           </View>
      })}
      </View>
    )
  }
}

export default Footer
