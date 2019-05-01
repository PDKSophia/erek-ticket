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
      'pages/detail/index',
      'pages/schedule/index',
      'pages/order/index',
      'pages/user/index',
      'pages/wallet/index'
    ],
    subPackages: [
      //分包
      {
        root: 'columnist/', // 飞机 、火车、大巴、电影票等专栏
        pages: [
          'pages/plane/index',
          'pages/train/index',
          'pages/bus/index',
          'pages/search/index',
          'pages/detail/index',
          'pages/line/index',
          'pages/entrance/index',
          'pages/cinema/index',
          'pages/movie/index',
          'pages/city/index'
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
      // selectedColor: '#fecf03',
      backgroundColor: '#f5f5f5',
      list: [
        {
          pagePath: 'pages/index/index',
          iconPath: 'assets/icon/index.png',
          selectedIconPath: 'assets/icon/index.png',
          text: '首页'
        },
        {
          pagePath: 'pages/schedule/index',
          iconPath: 'assets/icon/schedule.png',
          selectedIconPath: 'assets/icon/schedule.png',
          text: '行程'
        },
        {
          pagePath: 'pages/user/index',
          iconPath: 'assets/icon/user.png',
          selectedIconPath: 'assets/icon/user.png',
          text: '个人中心'
        }
      ]
    },
    networkTimeout: {
      "request": 10000,
      "downloadFile": 10000
    },
    debug: true,
    permission: {
      "scope.userLocation": {
        "desc": "易行小程序需要获取你当前的位置"
      }
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

  componentDidShow() { }

  componentDidHide() { }

  componentCatchError() { }

  render() {
    return (
      <Provider store={store}>
        <Index />
      </Provider>
    )
  }
}

Taro.render(<App />, document.getElementById('app'))
