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
import { View, Image } from '@tarojs/components'
import { connect } from '@tarojs/redux'
import { fetchTodoMovieInfo } from '../../store/actions/movie'
import { dealMovieToOrderTicket } from '../../store/actions/global'
import './index.scss'

class Introduce extends Component {
  static propTypes  = {
    currentMovie: PropTypes.object, // 当前点击的电影
    phoneSystem: PropTypes.object, // 手机设备
    getMovieDetail: PropTypes.func // 电影详情
  }

  static defaultProps = {
    headObj: {},
    entry: [],
    movieList: [],
    currentMovie: {}
  }

  state = {
    showSelectCinema: false,
    tiggerCinema: {
      cinemaID: -1,
      name: '选择影院',
      online: []
    }
  }

  componentWillMount () {
    Taro.setNavigationBarTitle({
      title: this.props.currentMovie.name
    })
  }
  
  chooseCinema = () => {
    let itemlist = []
    for (let i = 0; i < this.props.currentMovie.cinemaList.length; i++) {
      itemlist.push(this.props.currentMovie.cinemaList[i].name)
    }
    Taro.showActionSheet({
      itemList: itemlist
    }).then((res) => {
      let tiggerCurrentCinema = itemlist[res.tapIndex]
      for (let i = 0; i < this.props.currentMovie.cinemaList.length; i++) {
        if (this.props.currentMovie.cinemaList[i].name === tiggerCurrentCinema) {
          let tiggerCinemaOnline = this.props.currentMovie.cinemaList[i].online
          this.setState({
            tiggerCinema: {
              cinemaID: this.props.currentMovie.cinemaList[i].cinemaID,
              name: this.props.currentMovie.cinemaList[i].name,
              online: tiggerCinemaOnline
            }
          })
        }
      }
    }).catch((err) => {
      console.log(err.errMsg)
    })
  }

  handleTicketOrder = () => {
    if (this.state.tiggerCinema.cinemaID === -1) {
      Taro.showToast({
        title: '请先选择影院',
        icon: 'none',
        duration: 1500
      })
      this.setState({
        showSelectCinema: true
      })
    } else {
      console.log('pay money')
      let orderObj = JSON.parse(JSON.stringify(this.props.currentMovie))
      orderObj['uniqueID'] = this.props.currentMovie.cinemaList[0].uniqueID
      orderObj['cinemaID'] = this.state.tiggerCinema.cinemaID
      orderObj['cinemaName'] = this.state.tiggerCinema.name
      orderObj['online'] = this.state.tiggerCinema.online
      delete orderObj['cinemaList']
      this.props.saveOrderTicket(orderObj)
      Taro.navigateTo({
        url: '/pages/seat/index'
      })
    }
  }

  render () {
    return (
      <View>
        <View className='bg-filter'>
          <View className='bg-mask'>
            <Image src={this.props.currentMovie.picture} className='bg-image' alt='加载中' />
          </View>
          <View className='movie-image'>
            <Image src={this.props.currentMovie.picture} className='avatar-image' alt='加载中' />
          </View>
        </View>
        <View className='introduce'>
          <View className='intro-flex-box'>
            <View className='cell-left'>
              <View className='pro_title'>{this.props.currentMovie.name}</View>
              <View className='movie-introduce'>
                <View>年份 : {this.props.currentMovie.produceTime}</View>
                <View>类型 : {this.props.currentMovie.type}</View>
                <View>导演 : {this.props.currentMovie.director}</View>
              </View>
            </View>
            <View className='cell-right'>
              <View className='square'>
                <View className='score'>豆瓣评分</View>
                <View className='get_score'>{this.props.currentMovie.score}</View>
                <View className='talk'>238123人</View>
              </View>
            </View>
          </View>
          <View className='summary'>
            <View className='intro_title'>简介</View>
            <View className='summary_content'>{this.props.currentMovie.desc}</View>
          </View>
          {this.state.showSelectCinema&&<View className='fixed_select-box' onClick={this.chooseCinema}>{this.state.tiggerCinema.name}</View>}
        </View>
        <View className='order-ticket' onClick={this.handleTicketOrder}>特惠购票</View>
      </View>
    )
  }
}

const mapStateToProps = (state) => {
  let currentMovie = state.movie.currentMovie
  let phoneSystem = state.global.phoneSystem
  return {
    currentMovie,
    phoneSystem
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    getMovieDetail: (jsondata) => {
      dispatch(fetchTodoMovieInfo(jsondata))
    },
    saveOrderTicket: (order) => {
      dispatch(dealMovieToOrderTicket(order))
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Introduce)


