/**
 * 某一电影院 页面
 *
 * @summary
 * @author PDK
 *
 * Created at     : 2018-09-07
 * Last modified  : 2018-09-07
 */
import Taro, { Component } from '@tarojs/taro'
import PropTypes from 'prop-types'
import { View, Image, Text } from '@tarojs/components'
import { connect } from '@tarojs/redux'
import './index.scss'
import { dealCinemaToOrderTicket } from '../../store/actions/global'
import CinemaImage from '../../assets/cinema.jpeg'

class One extends Component {
  config = {
    navigationBarTitleText: '影院专区'
  }

  static propTypes = {
    phoneSystem: PropTypes.object, // 设备信息
    saveOrderTicket: PropTypes.func, // 保存当前的订单
    currentCinema: PropTypes.array // 当前影院
  }
  static defaultProps = {
    currentCinema: {
      onlineMovie: []
    }
  }

  state = {
    tiggerMovie: {
      name: '',
      type: '',
      score: 0,
      director: ''
    }
  }
  componentWillMount () {
    Taro.setNavigationBarTitle({
      title: this.props.currentCinema.name
    })
  }

  handleTiggerMovie = (movie) => {
    let newMovieObj = Object.assign({}, movie)
    newMovieObj['cinemaID'] = this.props.currentCinema.cinemaID
    newMovieObj['cinemaName'] = this.props.currentCinema.name
    this.setState({
      tiggerMovie: newMovieObj
    })
  }

  handleOrderTicket = () => {
    this.props.saveOrderTicket(this.state.tiggerMovie)
    Taro.navigateTo({
      url: '/pages/seat/index'
    })
  }
  componentDidMount () {
    this.handleTiggerMovie(this.props.currentCinema.onlineMovie[0])
  }

  render () {
    let transWidth = 0
    switch (this.props.phoneSystem.windowWidth) {
      case 375:
      transWidth = 105
      break
      case 320:
      transWidth = 89
      break
      case 360:
      transWidth = 101.5
      break
      default:
      transWidth = 115
      break
    }
    let overWidth = this.props.currentCinema.onlineMovie.length * transWidth
    return (
      <View className='one-cinema'>
        <View className='bg_one_cinema'>
          <View className='bg-cinema_image'>
            <Image  className='cinema_phone' src={CinemaImage} alt='影院照片' />
          </View>
          <View className='bg-cinema_content'>
            <View className='normal-text' style={{ fontSize: '15px' }}>{this.props.currentCinema.name}</View>
            <View className='normal-text'>{this.props.currentCinema.location}</View>
          </View>
        </View>
        <View className='movie-box'>
          <View className='scroll-x_movies'>
            <View className='cover-box' style={{ width: `${overWidth}px` }}>
              {this.props.currentCinema.onlineMovie.map((online, index) => {
                return <Image key={index}
                  className='cover-cell'
                  src={online.picture}
                  onClick={this.handleTiggerMovie.bind(this, online)} 
                />
              })}
            </View>
          </View>
        </View>
        <View className='tigger-current_movie'>
          <View style={{ fontSize: '22px', marginBottom: '10px' }}>{this.state.tiggerMovie.name}</View>
          <View>{this.state.tiggerMovie.type}</View>
          <View>评分 : <Text style={{ color: '#faaf00' }}>{this.state.tiggerMovie.score}</Text> 分</View>
          <View>导演 : {this.state.tiggerMovie.director}</View>
        </View>
        <View className='order-ticket' onClick={this.handleOrderTicket}>立即购票</View>
      </View>
    )
  }
}

const mapStateToProps = (state) => {
  let currentCinema = state.movie.currentCinema
  let phoneSystem = state.global.phoneSystem
  return {
    currentCinema,
    phoneSystem
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    saveOrderTicket: (order) => {
      dispatch(dealCinemaToOrderTicket(order))
    }
  }
}
  
export default connect(mapStateToProps, mapDispatchToProps)(One)
