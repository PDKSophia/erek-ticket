import Taro, { Component } from '@tarojs/taro'
import '@tarojs/async-await'
import { Provider } from '@tarojs/redux'

import Index from './pages/index'

import configStore from './redux'

import './app.scss'

const store = configStore()

class App extends Component {
  config = {
    pages: [
      'pages/index/index',
      // 'pages/movie/index',
      // 'pages/movie/introduce',
      // 'pages/cinema/index',
      // 'pages/cinema/one',
      // 'pages/seat/index',
      // 'pages/seat/roborder',
      'pages/user/index',
      'pages/wallet/index',
      'pages/order/index'
    ],
    subPackages: [
      //分包
      {
        root: 'columnist/', // 飞机 、火车、大巴、电影票等专栏
        pages: [
          'pages/plane/index'
          // 'pages/review/index',
          // 'pages/extend/index'
        ]
      },
      {
        root: 'support/', // 其他支撑功能的分包
        pages: ['pages/setting/index', 'pages/equipment/index']
      }
    ],
    window: {
      backgroundTextStyle: 'light',
      navigationBarBackgroundColor: '#fecf03',
      navigationBarTitleText: 'WeChat',
      navigationBarTextStyle: 'white'
    },
    tabBar: {
      selectedColor: '#fecf03',
      backgroundColor: '#f5f5f5',
      list: [
        {
          pagePath: 'pages/index/index',
          iconPath: 'assets/index.png',
          selectedIconPath: 'assets/index.png',
          text: '首页'
        },
        // {
        //   pagePath: 'pages/movie/index',
        //   iconPath: 'assets/movie.png',
        //   selectedIconPath: 'assets/movie.png',
        //   text: '电影'
        // },
        // {
        //   pagePath: 'pages/cinema/index',
        //   iconPath: 'assets/cinema.png',
        //   selectedIconPath: 'assets/cinema.png',
        //   text: '影院'
        // },
        {
          pagePath: 'pages/user/index',
          iconPath: 'assets/user.png',
          selectedIconPath: 'assets/user.png',
          text: '个人中心'
        }
      ]
    }
  }

  async componentDidMount() {
    try {
      const sysInfo = Taro.getSystemInfoSync() // 获取设备信息
      Taro.setStorageSync('sysInfo', sysInfo)
    } catch (err) {
      console.log(err)
    }
  }

  componentDidShow() {}

  componentDidHide() {}

  componentCatchError() {}

  render() {
    return (
      <Provider store={store}>
        <Index />
      </Provider>
    )
  }
}

Taro.render(<App />, document.getElementById('app'))
