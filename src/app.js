import Taro, { Component } from '@tarojs/taro'
import '@tarojs/async-await'
import { Provider } from '@tarojs/redux'

import Index from './pages/index'

import configStore from './store'


import './app.scss'

const store = configStore()

class App extends Component {
  config = {
    pages: [
      'pages/index/index',
      'pages/movie/index',
      'pages/movie/introduce',
      'pages/cinema/index',
      'pages/cinema/one',
      'pages/seat/index',
      'pages/seat/roborder',
      'pages/user/index',
      'pages/wallet/index',
      'pages/ticketcode/index'
    ],
    window: {
      backgroundTextStyle: 'light',
      navigationBarBackgroundColor: '#3c3c3c',
      navigationBarTitleText: 'WeChat',
      navigationBarTextStyle : '#ffffff'
    },
    tabBar: {
      selectedColor: '#3c3c3c',
      backgroundColor: '#f5f5f5',
      list: [
        {
          pagePath: 'pages/index/index',
          iconPath: 'assets/index.png',
          selectedIconPath: 'assets/index.png',
          text: '首页'
        },
        {
          pagePath: 'pages/movie/index',
          iconPath: 'assets/movie.png',
          selectedIconPath: 'assets/movie.png',
          text: '电影'
        },
        {
          pagePath: 'pages/cinema/index',
          iconPath: 'assets/cinema.png',
          selectedIconPath: 'assets/cinema.png',
          text: '影院'
        },
        {
          pagePath: 'pages/user/index',
          iconPath: 'assets/user.png',
          selectedIconPath: 'assets/user.png',
          text: '个人中心'
        }
      ]
    }
  }

  componentDidMount () {}

  componentDidShow () {}

  componentDidHide () {}

  componentCatchError () {}

  render () {
    return (
      <Provider store={store}>
        <Index />
      </Provider>
    )
  }
}

Taro.render(<App />, document.getElementById('app'))
