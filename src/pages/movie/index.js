/**
 * 电影
 *
 * @summary
 * @author PDK
 *
 * Created at     : 2018-09-04
 * Last modified  : 2018-09-04
 */
import Taro, { Component } from '@tarojs/taro'
import PropTypes from 'prop-types'
import { View, Swiper, SwiperItem, ScrollView } from '@tarojs/components'
import { connect } from '@tarojs/redux'
import { fetchDouBanMoviList, tiggerSaveCurrentMovie } from '../../store/actions/movie'
import MovieItem from '../../components/MovieItem'
import './index.scss'

class Movie extends Component {
  static propTypes  = {
    getMovieList: PropTypes.func, // 获取豆瓣电影接口
    isFetchMovieList: PropTypes.bool, // 是否请求完数据接口
    movieList: PropTypes.array, // 正在热映数据
    phoneSystem: PropTypes.object, // 设备信息
    saveTiggerMovie: PropTypes.func // 保存当前点击的电影
  }

  static defaultProps = {
    headObj: {},
    entry: [],
    movieList: []
  }

  config = {
    navigationBarTitleText: '电影专区'
  }

  state = {
    currentTab: 0, // tab的切换
    scrollY: true
  }

  componentDidMount () {
    if (process.env.NODE_ENV !== 'development') {
      if (!this.props.isFetchMovieList) {
        Taro.showLoading({
          title: '获取电影列表',
          mask: true
        })
      }
    }
    let _this = this

    if (process.env.NODE_ENV !== 'development') {
      _this.props.getMovieList()  // 正式上线时，需要发送真实请求
    }
  }

  handleSwitchTab = (e) => {
    let that = this
    if (that.state.currentTab == e.target.dataset.current) {
      return false
    } else {
      that.setState({
        currentTab: e.target.dataset.current
      })
    }
  }

  handleCurrentswiper = (e) => {
    this.setState({
      currentTab: e.detail.current
    })
  }

  handleTiggerMovie = (jsondata) => {
    this.props.saveTiggerMovie(jsondata)
  }
  render () {
    let transHeight = 0
    switch (this.props.phoneSystem.windowWidth) {
      case 375:
      transHeight = 121
      break
      case 320:
      transHeight = 102
      break
      case 360:
      transHeight = 115
      break
      default:
      transHeight = 132
      break
    }
    if (process.env.NODE_ENV !== 'development') {
      if (this.props.isFetchMovieList) {
        Taro.hideLoading()
      }
    }
    const swiperHeight = this.props.movieList.length * transHeight
    return (
      <View className='movie'>
        <View className='tab'>
          <View className={['tab-list', this.state.currentTab==0 && "active"].join(' ')} data-current='0' onClick={this.handleSwitchTab}>正在热映</View>
          <View className={['tab-list', this.state.currentTab==1 && "active"].join(' ')} data-current='1' onClick={this.handleSwitchTab}>即将上映</View>
        </View>

        <Swiper
          current={this.state.currentTab}
          className='swiper-box'
          duration='300'
          style={{ clientHeight: `${this.props.phoneSystem.windowHeight}px`, height: `${swiperHeight}px` }}
          onChange={this.handleCurrentswiper}
        >
          <SwiperItem className='swiper-content'>
            <ScrollView scrollY={this.state.scrollY} style={{ clientHeight: `${this.props.phoneSystem.windowHeight}px` }}>
              <View className='movieNowOn'>
              {this.props.movieList.map((item, index) => {
                return <MovieItem movieItems={item} key={index} onHandleTiggerMovie={this.handleTiggerMovie} />
              })}
              </View>
            </ScrollView>
          </SwiperItem>
          <SwiperItem className='swiper-content'>
            <ScrollView scrollY={this.state.scrollY} style={{ clientHeight: `${this.state.winHeight}px` }}>
              <View className='movie-future-on'>
              {this.props.movieList.map((item, index) => {
                return <MovieItem movieItems={item} key={index} onHandleTiggerMovie={this.handleTiggerMovie} />
              })}
              </View>
            </ScrollView>
          </SwiperItem>
        </Swiper>
      </View>
    )
  }
}

const mapStateToProps = (state) => {
  let isFetchMovieList = state.movie.isFetchMovieList
  let movieList = state.movie.movieList
  let phoneSystem = state.global.phoneSystem
  return {
    isFetchMovieList,
    movieList,
    phoneSystem
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    getMovieList: () => {
      dispatch(fetchDouBanMoviList())
    },
    saveTiggerMovie: (jsondata) => {
      dispatch(tiggerSaveCurrentMovie(jsondata))
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Movie)

